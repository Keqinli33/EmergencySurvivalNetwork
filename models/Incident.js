/**
 * Created by keqinli on 4/17/17.
 */

"use strict";

class Incident{
    /*
      constructor
     */
    constructor(username, isSafe, isInjured, severity, emergencyType, postTime, content, address, phonenumber) {
        this.username = username;
        this.isSafe = isSafe;
        this.isInjured = isInjured;
        this.severity = severity;
        this.emergencyType = emergencyType;
        this.postTime = postTime;
        this.content = content;
        this.address = address;
        this.phonenumber = phonenumber;
    }
    /*
       insert an incident into db
     */
    insertIncident(db, callback){
        this.collection = db.collection("INCIDENTS");
        this.collection.insert({
            "username": this.username,
            "isSafe": this.isSafe,
            "isInjured": this.isInjured,
            "severity": this.severity,
            "emergencyType": this.emergencyType,
            "postTime": this.postTime,
            "content": this.content,
            "address": this.address,
            "phonenumber": this.phonenumber
        }, function (err, results) {
            console.log(err);
            callback(results, null);

        });
    }

    /*
        load the history incident
     */
    loadAllIncidents(db, callback){
        this.collection = db.collection("INCIDENTS");
        console.log("mgdb  incident1");
        var username = this.username;
        this.collection.find({"username": username}).toArray(function (err, results) {
            console.log("mgdb  incident2========");
            console.log(results);
            var datas1 = [];
            //var datas2 = [];
            results.forEach(function(result){
                var data1 = {};
                //var data2 = {};
                //data["username"] = result.username;
                data1["content"] = result.content;
                data1["postTime"] = result.postTime;
                datas1.push(data1);
                //datas2.push(data2);
            });
            console.log("mgdb  incident3");
            callback(datas1, null);
        });
    }
    /*
        load all incidents list to all users
     */
    loadAllIncidentsall(db, callback){
        this.collection = db.collection("INCIDENTS");
        //console.log("mgdb  incident1");
        this.collection.find({}).toArray(function (err, results) {
            console.log("mgdb  incident2");
            var datas1 = [];
            //var datas2 = [];
            results.forEach(function(result){
                var data1 = {};
                //var data2 = {};
                data1["username"] = result.username;
                data1["content"] = result.content;
                data1["postTime"] = result.postTime;
                data1["address"] =result.address;
                datas1.push(data1);
                //datas2.push(data2);
            });
            //console.log("mgdb  incident3");
            callback(datas1, null);
        });
    }

    /*
        load an incident content
     */
    loadIncidentContent(db, callback){
        this.collection = db.collection("INCIDENTS");
        var username=this.username;
        var postTime=Number(this.postTime);
        console.log("incident ======" + typeof postTime);
        this.collection.find({"username": username, "postTime": postTime}).toArray(function (err, results) {
            var datas1 = [];
            results.forEach(function(result){
                var data1 = {};
                data1["username"] = result.username;
                data1["isSafe"] = result.isSafe;
                data1["isInjured"] = result.isInjured;
                data1["severity"] = result.severity;
                data1["emergencyType"] = result.emergencyType;
                data1["postTime"] = result.postTime;
                data1["content"] = result.content;
                data1["address"] = result.address;
                data1["phonenumber"] = result.phonenumber;
                datas1.push(data1);
            });
            console.log("datas1 " + datas1);
            callback(datas1, null);
        });
    }

    /*
        update an incident
     */
    updateIncident(db, postTime, callback){
        this.collection = db.collection("INCIDENTS");
        var username = this.username;
        postTime=Number(postTime);
        this.collection.update({"username": username, "postTime": postTime}, {$set: {"isSafe": this.isSafe, "isInjured":this.isInjured, "severity":this.severity, "emergencyType":this.emergencyType, "postTime": this.postTime, "content": this.content, "address":this.address, "phonenumber":this.phonenumber}}, function (err, results) {
            console.log(err);
            callback(results, null);
           // db.close();
        });
    }
}

module.exports = Incident;