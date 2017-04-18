/**
 * Created by keqinli on 4/17/17.
 */

"use strict";

var MongoClient = require("mongodb").MongoClient;
var db_err_msg = "Database Error";
var db_err_statuscode = 400;
var success_statuscode = 200;
//var url = "mongodb://root:1234@ds137730.mlab.com:37730/esnsv7";

class PostIncidentDBoper{
    /*
            Insert An Incident Into DB
     */
    InsertIncident(username, info, postTime, url, callback){

        MongoClient.connect(url, function (err, db){
            if (err) {
                //console.log("Error:"+ err);
                callback(400, db_err_msg);// DB Error. Here error of connecting to db
            }
            else {
                var isSafe = info["safe"];
                var isInjured = info["injure"];
                var severity = info["severity"];
                var emergencyType = info["emergencyType"];
                var content = info["content"];
                var address = info["address"];
                var phonenumber = info["phonenumber"];
                let IncidentInstance = new Incident(username, isSafe, isInjured, severity, emergencyType, postTime, content, address, phonenumber);
                IncidentInstance.insertIncident(db,function (results, err) {
                    console.log(err);
                    callback(success_statuscode, null);
                });
                db.close();
            }
        });
    }

    /*
        load all incidents
        return content, postTime
     */
    LoadIncident(username, url, callback){

        MongoClient.connect(url, function (err, db){
            if (err) {
                callback(db_err_statuscode, db_err_msg);
            }// DB Error. Here error of connecting to db
            else {
                let IncidentInstance = new Incident(username, "", "", "", "", "", "", "", "");
                IncidentInstance.loadAllIncidents(db, function(content1, err){
                    console.log(err);
                    callback(success_statuscode, content1);
                    db.close();
                });
            }
        });
    }
    /*
        load an incident content
     */
    LoadIncidentContent(username, postTime, url, callback){
        MongoClient.connect(url, function (err, db){
            if (err) {
                callback(db_err_statuscode, db_err_msg);
            }// DB Error. Here error of connecting to db
            else {
                let IncidentInstance = new Incident(username, "", "", "", "", "postTime", "", "", "");
                IncidentInstance.loadIncidentContent(db, function(results, err){
                    console.log(err);
                    callback(success_statuscode, results);
                    db.close();
                });
            }
        });
    }

    /*
        Update an incident
        first load incident then update
     */
    UpdateIncident(username, info, postTime, url, callback){
        MongoClient.connect(url, function (err, db){
            if (err) {
                //console.log("Error:"+ err);
                callback(400, db_err_msg);// DB Error. Here error of connecting to db
            }
            else {
                var isSafe = info["safe"];
                var isInjured = info["injure"];
                var severity = info["severity"];
                var emergencyType = info["emergencyType"];
                var content = info["content"];
                var address = info["address"];
                var phonenumber = info["phonenumber"];
                var incidentTime = info["incidentTime"];
                let IncidentInstance = new Incident(username, isSafe, isInjured, severity, emergencyType, postTime, content, address, phonenumber);
                IncidentInstance.updateIncident(db, incidentTime, function (results, err) {
                    console.log(err);
                    callback(success_statuscode, null);
                    db.close();
                });

            }
        });
    }

}

let pidboper = new PostIncidentDBoper();

module.exports = {
    InsertIncident : pidboper.InsertIncident,
    LoadIncident : pidboper.LoadIncident,
    LoadIncidentContent: pidboper.LoadIncidentContent,
    UpdateIncident : pidboper.UpdateIncident
};
