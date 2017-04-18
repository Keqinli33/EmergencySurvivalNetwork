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
        this.collection.find({"username": this.username}).toArray(function (err, results) {
            var datas1 = [];
            var datas2 = [];
            results.forEach(function(result){
                var data1 = {};
                var data2 = {};
                //data["username"] = result.username;
                data1["content"] = data1.content;
                data2["postTime"] = data2.postTime;
                datas1.push(data1);
                datas2.push(data2);
            });
            callback(datas1, datas2, null);
        });
    }

    /*
        load an incident content
     */
    loadIncidentContent(db, callback){
        this.collection = db.collection("INCIDENTS");
        this.collection.find({"username": this.username, "postTime": this.postTime}).toArray(function (err, results) {
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
            callback(datas1, null);
        });
    }

    /*
        update an incident
     */
    updateIncident(db, incidentTime, callback){
        this.collection = db.collection("INCIDENTS");
        this.collection.update({"username": username, "postTime": incidentTime}, {$set: {"isSafe": this.isSafe, "isInjured":this.isInjured, "severity":this.severity, "emergencyType":this.emergencyType, "postTime": this.postTime, "content": this.content, "address":this.address, "phonenumber":this.phonenumber}}, function (err, results) {
            console.log(err);
            callback(results, null);
           // db.close();
        });
    }
}

module.exports = Incident;