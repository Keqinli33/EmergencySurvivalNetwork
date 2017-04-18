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
            var datas = [];
            results.forEach(function(result){
                var data = {};
                data["username"] = result.username;
                data["content"] = result.content;
                data["postTime"] = result.postTime;
                datas.push(data);
            });
            callback(datas, null);
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
