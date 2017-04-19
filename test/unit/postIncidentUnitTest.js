/**
 * Created by keqinli on 4/19/17.
 */

'use strict';

var expect = require('expect.js');
var request = require('supertest');
var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var express = require('express');
var dboper = require("../../models/PostIncidentDBoper");

var app = express();
var error_url = "mongodb://root:123@ds137730.mlab.com:37730/esns";


//var url = 'mongodb://root:1234@ds137730.mlab.com:37730/esnsv7';//url = 'mongodb://root:1234@ds135690.mlab.com:35690/esntest';
var TestDBConfig = require("../TestDBConfig");
let dbconfig = new TestDBConfig();
var url = dbconfig.getURL();
//using server not app to listening port 5000
var server = request.agent("https://quiet-peak-31270.herokuapp.com");
// var server = request.agent(HOST);

suite('Post Incidents Unit Tests', function(){
    this.timeout(15000);
    var testDB = {};

    //before all tests, init mongodb
    suiteSetup('Init A DB for Test', function(done){
        MongoClient.connect(url, function(err, db) {

            if (err) {
                console("Database erro");
            }
            else {
                testDB = db;
            }
            done();
        });
        //done();

    });

    //after all tests, close mongodb
    suiteTeardown('Close DB for Test', function(done){
        //testDB.collection("MESSAGES").drop();
        //testDB.collection("announcement").drop();
        //testDB.collection("USERS").drop();
        testDB.close();
        done();
    });

    test('Testing InsertIncident And LoadIncident List Function', function(done){
        var fakeInfo = {
            "username": "keqin",
            "safe": "Yes",
            "injure": "No",
            "severity": "2",
            "emergencyType": "public emergency",
            "content": "There is fire",
            "address": "12 afsdf",
            "phonenumber": "1235331"
        }
        var date = Date.now();
        dboper.InsertIncident("keqin", fakeInfo, date, url, function(status1, results1){
            expect(status1).to.equal(200);
            dboper.LoadIncident("keqin",url, function (status2, results2) {
                expect(status2).to.equal(200);
                expect(results2[results2.length-1]["postTime"]).to.equal(date);
                //expect(results2[results2.length-1]["announcement"]).to.equal("testing announcement function in Unit Test");
                done();
            });
        });
    });

    test('Testing LoadIncidentContent  Function', function(done){
        var fakeInfo = {
            "username": "keqin",
            "safe": "Yes",
            "injure": "No",
            "severity": "2",
            "emergencyType": "public emergency",
            "content": "There is fire",
            "address": "12 afsdf",
            "phonenumber": "1235331"
        }
        var date = Date.now();
        dboper.InsertIncident("keqin", fakeInfo, date, url, function(status1, results1){
            expect(status1).to.equal(200);
            dboper.LoadIncidentContent("keqin", date, url, function (status2, results2) {
                expect(status2).to.equal(200);
                expect(results2[0]["postTime"]).to.equal(date);
                expect(results2[0]["content"]).to.equal("There is fire");
                //expect(results2[results2.length-1]["announcement"]).to.equal("testing announcement function in Unit Test");
                done();
            });
        });
    });

    test('Testing LoadIncidentAll List Function', function(done){
        var fakeInfo = {
            "username": "keqin",
            "safe": "Yes",
            "injure": "No",
            "severity": "2",
            "emergencyType": "public emergency",
            "content": "There is fire",
            "address": "12 afsdf",
            "phonenumber": "1235331"
        }
        var date = Date.now();
        dboper.InsertIncident("keqin", fakeInfo, date, url, function(status1, results1){
            expect(status1).to.equal(200);
            dboper.LoadIncidentAll(url, function (status2, results2) {
                expect(status2).to.equal(200);
                expect(results2[results2.length-1]["postTime"]).to.equal(date);
                //expect(results2[results2.length-1]["announcement"]).to.equal("testing announcement function in Unit Test");
                done();
            });
        });
    });

    test('Testing UpdateIncident List Function', function(done){
        var fakeInfo = {
            "username": "keqin",
            "safe": "Yes",
            "injure": "No",
            "severity": "2",
            "emergencyType": "public emergency",
            "content": "There is fire",
            "address": "12 afsdf",
            "phonenumber": "1235331"
        }

        var fakeInfo2 = {
            "username": "keqin",
            "safe": "Yes",
            "injure": "Yes",
            "severity": "1",
            "emergencyType": "public emergency",
            "content": "Safe Now",
            "address": "12 afsdf",
            "phonenumber": "1235331"
        }
        var date = Date.now();
        dboper.InsertIncident("keqin", fakeInfo, date, url, function(status1, results1){
            expect(status1).to.equal(200);
            var date2=Date.now();
            dboper.UpdateIncident("keqin", date, fakeInfo, date2, url, function (status2, results2) {
                expect(status2).to.equal(200);
                //expect(results2[results2.length-1]["postTime"]).to.equal(date);
                //expect(results2[results2.length-1]["announcement"]).to.equal("testing announcement function in Unit Test");
                dboper.LoadIncidentContent("keqin", date2, url, function (status3, results3) {
                    expect(status3).to.equal(200);
                    expect(results3[0]["postTime"]).to.equal(date2);
                    done();
                });
            });
        });
    });


});
