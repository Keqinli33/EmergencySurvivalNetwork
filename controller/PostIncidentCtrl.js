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
        dboper.InsertIncident(username, info, Date.now(), url, function(err, results){
            if (err) {
                // console.log("Error:"+ err);
                res.json({success:0, err_type: 1, err_msg:results});
            } else {
                res.json({success: 1, suc_msg: "Success"});
            }
        });
    }

    LoadAllIncidents(req, res){
        var username = req.params.user;
        //var info = req.body;
        dboper.LoadIncident(username, url, function(err, results){
            if (err) {
                // console.log("Error:"+ err);
                res.json({success:0, err_type: 1, err_msg:results});
            } else {
                res.json({success: 1, suc_msg: "Success"});
            }
        });

    }

    UpdateIncident(req, res){
        var username = req.params.user;
        var info = req.body;
        dboper.UpdateIncident(username, info, Date.now(), url, function(err, results){
            if (err) {
                // console.log("Error:"+ err);
                res.json({success:0, err_type: 1, err_msg:results});
            } else {
                res.json({success: 1, suc_msg: "Success"});
            }
        });
    }

}
