/**
 * Created by Jilei and Komala on 4/01/17.
 */

'use strict';

var expect = require('expect.js');
//var request = require('supertest');
var express = require('express');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var express = require('express');
var dboper = require("../models/JoinCommunityDBoper.js");
var dboper2 = require("../models/ShareStatusDBoper.js");

var app = express();


//var url = 'mongodb://root:1234@ds137730.mlab.com:37730/esnsv7';//url = 'mongodb://root:1234@ds135690.mlab.com:35690/esntest';
var DBConfig = require("../controller/DBConfig");
let dbconfig = new DBConfig();
var url = dbconfig.getURL();
var error_url = "mongodb://root:123@ds137730.mlab.com:37730/esns";

//using server not app to listening port 5000

var myapp = require('../app.js');
var request = require('supertest').agent(myapp.listen());
//var server = request.agent("http://localhost:5000");
// var server = request.agent("http://localhost:5000");

suite('Join Comunity Integration Tests', function(){
    this.timeout(15000);

    test('Login by RESTful Api', function(done) {
        request.post('/signup')
            .send({"username": "test_user_for_rest_api", password: "1234"})
            .expect(200, function(err, res) {
                request.post('/login')
                    .send({"username": "test_user_for_rest_api", password: "1234"})
                    .expect(200, function(err, res){
                        if(err) {
                            return done(err);
                        }
                        else {
                            var idx = res.body.data.indexOf("test_user_for_rest_api");
                            expect(idx).to.above(-1);
                            done();
                        }
                    });
            });
    });

    test('Signup by RESTful Api', function(done){
        dboper.RemoveUser("test_user_for_rest_api", url, function(success_statuscode, results) {
            request.post('/signup')
                .send({"username": "test_user_for_rest_api", password: "1234"})
                .expect(200, function(err, res){
                    if(err) {
                        return done(err);
                    }
                    else {
                        var idx = res.body.data.indexOf("test_user_for_rest_api");
                        expect(idx).to.above(-1);
                        done();
                    }
                });
        });
    });

    test('Userlist by RESTful Api', function(done) {
        request.post('/signup')
            .send({"username": "test_user_for_rest_api", password: "1234"})
            .expect(200, function(err, res) {
                request.get('/userlist')
                    .expect(200, function(err, res){
                        if(err) {
                            return done(err);
                        }
                        else {
                            var idx = res.body.data1.indexOf("test_user_for_rest_api");
                            if (idx < 0) {
                                idx = res.body.data2.indexOf("test_user_for_rest_api");
                            }
                            expect(idx).to.above(-1);
                            done();
                        }
                    });
            });
    });

    test('Logout by RESTful Api', function(done) {
        request.post('/signup')
            .send({"username": "test_user_for_rest_api", password: "1234"})
            .expect(200, function(err, res) {
                request.post('/logout')
                    .send({"username": "test_user_for_rest_api"})
                    .expect(200, function(err, res){
                        request.get('/userlist')
                            .expect(200, function(err, res){
                                if(err) {
                                    return done(err);
                                }
                                else {
                                    var idx = res.body.data2.indexOf("test_user_for_rest_api");
                                    expect(idx).to.above(-1);
                                    done();
                                }
                            });

                    });
            });
    });

    test("Remove User from Community", function(done){
        dboper.RemoveUser("testuser", url, function (statuscode1, content1){
            expect(statuscode1).to.equal(200);
            done();
        });
    });

    test("New User SignUp", function(done){
        dboper.AddDB("testuser", "testpwd", url, function (statuscode1, content1){
            expect(statuscode1).to.equal(200);
            dboper.Logout("testuser", url, function (statuscode2, content2){
                expect(statuscode1).to.equal(200);
            });
            done();
        });
    });

    test("Duplicate Username SignUp", function(done){
        dboper.AddDB("testuser", "testpwd", url, function (statuscode1, content1){
            expect(statuscode1).to.equal(405);
            done();
        });
    });

    test("Existing User Login and Logout", function(done){
        dboper.Login("testuser", "testpwd", url, function (statuscode1, content1){
            expect(statuscode1).to.equal(200);
            dboper.GetAllUsers(url, function(statuscode2, list1, list2){
                expect(list1.indexOf("testuser")).to.above(-1);
                expect(list2.indexOf("testuser")).to.equal(-1);
                dboper.Logout("testuser", url, function (statuscode3, content2){
                    expect(statuscode3).to.equal(200);
                    dboper.GetAllUsers(url, function(statuscode4, list1, list2){
                        expect(list1.indexOf("testuser")).to.equal(-1);
                        expect(list2.indexOf("testuser")).to.above(-1);
                    });
                });
            });
            done();
        });
    });

    test("Username and EmergencyStatus in Directory", function(done) {
        dboper.Login("testuser", "testpwd", url, function (statuscode1, content1){
            expect(statuscode1).to.equal(200);
            dboper2.Updatesharestatus("testuser", "Help", url, function(statuscode2, content2) {
                dboper.GetAllUsernameAndEmergencyStatus(url, function (statuscode3, content3) {
                    expect(statuscode3).to.equal(200);
                });
            });
            done();
        });
    });

    test("Password Incorrect Login", function(done){
        dboper.Login("testuser", "wrongpwd", url, function (statuscode, content){
            expect(statuscode).to.equal(402);
            done();
        });
    });

    test("Error while Logging In", function(done) {
        dboper.Login("testuser", "testpwd", error_url, function(statuscode, content) {
            expect(statuscode).to.equal(400);
            done();
        });
    });

    test("Error when Creating New User", function(done) {
        dboper.AddDB("testuser", "testpwd", error_url, function (statuscode, content) {
            expect(statuscode).to.equal(400);
            done();
        });
    });

    test("Error when logging out", function(done) {
        dboper.Logout("testuser", error_url, function(statuscode, content) {
            expect(statuscode).to.equal(400);
            done();
        });
    });

    test("DB Error GetAllUsers", function(done) {
        dboper.GetAllUsers(error_url, function(statuscode, content) {
            expect(statuscode).to.equal(400);
            done();
        });
    });

    test("DB Error GetAllUsernameAndEmergencyStatus", function(done) {
        dboper.GetAllUsernameAndEmergencyStatus(error_url, function(statuscode, content) {
            expect(statuscode).to.equal(400);
            done();
        });
    });

    test("DB Error GetAllUsers", function(done) {
        dboper.RemoveUser("",error_url, function(statuscode, content) {
            expect(statuscode).to.equal(400);
            done();
        });
    });
});
