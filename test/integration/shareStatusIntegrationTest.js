/**
 * Created by keqinli on 3/20/17.
 */

'use strict';

var expect = require('expect.js');
//var request = require('supertest');
var express = require('express');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var express = require('express');

//var ShareStatusCtrl = require('../controller/ShareStatusCtrl');
// var dboper = require("../../models/ShareStatusDBoper");
// var createoper = require("../../models/User.js");
var error_url = "mongodb://root:123@ds137730.mlab.com:37730/esns";

//var app = express();
//var app = require("../../app");
var myapp = require('../../app.js');
var request = require('supertest').agent(myapp.listen());


//var url = 'mongodb://root:1234@ds137730.mlab.com:37730/esnsv7';//url = 'mongodb://root:1234@ds135690.mlab.com:35690/esntest';
var TestDBConfig = require("../TestDBConfig");
let dbconfig = new TestDBConfig();
var url = dbconfig.getURL();

//using server not app to listening port 5000
//var server = request.agent("https://quiet-peak-31270.herokuapp.com");
// var server = request.agent("http://localhost:5000");


suite('Share Status Tests', function(){
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
            //done();
        });
        done();

    });

    //after all tests, close mongodb
    suiteTeardown('Close DB for Test', function(done){
        //testDB.collection("MESSAGES").drop();
        //testDB.collection("announcement").drop();
        //testDB.collection("USERS").drop();

        testDB.close();
        done();
    });

    test('Creating share status through restful api', function(done){
        //request(app).get('/announcement').expect("Content-type",/json/)
        request.post('/signup')
            .send({"username": "keqin", "password": "1234"})
            .expect(200, function(err, res){
                if(err) return done(err);
                else {
                    expect(res.body.success).to.equal(1);
                    done();
                }
            });

    });

    test('Getting Share Status Through RESTful Api', function(done){
        //request(app).get('/announcement').expect("Content-type",/json/)
        request.get('/userstatus/:username')
            .send({"username": "keqin"})
            .expect(200, function(err, res){
                if(err) return done(err);
                else {

                    expect(res.body.success).to.equal(1);

                    done();
                }

            });

    });

    test('Changing Share Status Through RESTful Api', function(done){
        //request(app).get('/announcement').expect("Content-type",/json/)
        request.post('/userstatus')
            .send({"username": "keqin", "emergencystatus": "OK"})
            .expect(200, function(err, res){
                if(err) return done(err);
                else {
                    // console.log("here" + res.body.suc_msg);
                    expect(res.body.suc_msg).to.equal("Success");

                    done();
                }

            });

    });
});
