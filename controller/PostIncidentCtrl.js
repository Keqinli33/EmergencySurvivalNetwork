/**
 * Created by keqinli on 4/17/17.
 */
"use strict";

var dboper = require("../models/PostIncidentDBoper.js");
var DBConfig = require("./DBConfig");
let dbconfig = new DBConfig();
var url = dbconfig.getURL();
//var db_err_msg = "Database Error";
//var db_err_statuscode = 400;
var success_statuscode = 200;

class PostIncidentCtrl{
    /*
            Add an incident
     */
    AddIncident(req, res){
        var username = req.params.user;
        var info = req.body;
        // var isSafe = info["safe"];
        // var isInjured = info["injure"];
        // var severity = info["severity"];
        // var emergencyType = info["emergencyType"];
        dboper.InsertIncident(username, info, Date.now(), url, function(status, results){
            if (status == 200) {
                // console.log("Error:"+ err);
                res.json({success: 1, suc_msg: "Success"});
            } else {
                res.json({success:0, err_type: 1, err_msg:results});
            }
        });
    }

    LoadAllIncidents(req, res){
        var username = req.params.user;
        //var info = req.body;
        dboper.LoadIncident(username, url, function(status, content1){
            if (status == 200) {
                // console.log("Error:"+ err);
                res.json({success: 1, "data1":content1});
            } else {
                res.json({success:0, err_type: 1, err_msg:"Load Incidents Wrong"});
            }
        });

    }

    LoadIncidentContent(req, res){
        var username = req.params.user;
        var postTime = req.params.postTime;

        dboper.LoadIncidentContent(username, postTime, url, function(status, results){
            if (status == 200) {
                // console.log("Error:"+ err);
                res.json({success: 1, data:results});
            } else {
                res.json({success:0, err_type: 1, err_msg:"Load Incidents Wrong"});
            }
        });
    }


    UpdateIncident(req, res){
        var username = req.params.user;
        var info = req.body;
        dboper.UpdateIncident(username, info, Date.now(), url, function(status, results){
            if (status == 200) {
                // console.log("Error:"+ err);
                res.json({success: 1, suc_msg: "Success"});
            } else {
                res.json({success:0, err_type: 1, err_msg:results});
            }
        });
    }

}

let pic = new PostIncidentCtrl();

module.exports = {
    AddIncident : pic.AddIncident,
    LoadAllIncidents : pic.LoadAllIncidents,
    LoadIncidentContent: pic.LoadIncidentContent,
    UpdateIncident : pic.UpdateIncident
};
