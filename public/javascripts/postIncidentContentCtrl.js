/**
 * Created by keqinli on 4/17/17.
 */

app.controller("postIncidentContentCtrl", function ($window, $scope, $rootScope, $http, mySocket) {
    var postIncident = function() {
        console.log("here == in post incident content1");
        $scope.submitIncident = function () {
            console.log("here == in post incident content1");
            var incident_data = {
                username: $scope.userClass["username"],
                safe: $scope.isSafe,
                injure: $scope.isInjured,
                severity: $scope.severity,
                emergencyType: $scope.emergencyType,
                content: $scope.content,
                address: $scope.address,
                phonenumber: $scope.phonenumber
            };

            // var socketdata = {
            //     username: $scope.userClass["username"],
            //     content: $scope.content,
            //     address: $scope.address
            // };

            $http({
                method: "post",
                url: "/incident/" + $scope.userClass["username"],
                data: incident_data
            }).success(function (rep) {
                $scope.isSafe = "";
                $scope.isInjured = "";
                $scope.severity = "";
                $scope.emergencyType = "";
                $scope.content = "";
                $scope.address = "";
                $scope.phonenumber = "";
                mySocket.emit("Post Incident");
                //$scope.announcement_content = "";
                if (rep.success == 1) {
                    console.log("Post An Incident Success!");
                }
                else {
                    console.log("Unexpected error in post incident");
                }
            });
            $rootScope.$emit("openIncidentDirectory");
        }

    }

    $scope.submitIncident = function () {
        var incident_data = {
            username: $scope.userClass["username"],
            safe: $scope.isSafe,
            injure: $scope.isInjured,
            severity: $scope.severity,
            emergencyType: $scope.emergencyType,
            content: $scope.content,
            address: $scope.address,
            phonenumber: $scope.phonenumber
        };
        // var socketdata = {
        //     username: $scope.userClass["username"],
        //     content: $scope.content,
        //     address: $scope.address
        // };

        if($scope.content !=null ) {
            $http({
                method: "post",
                url: "/incident/" + $scope.userClass["username"],
                data: incident_data
            }).success(function (rep) {
                $scope.isSafe = "";
                $scope.isInjured = "";
                $scope.severity = "";
                $scope.emergencyType = "";
                $scope.content = "";
                $scope.address = "";
                $scope.phonenumber = "";
                mySocket.emit("Post Incident");
                //$scope.announcement_content = "";
                if (rep.success == 1) {
                    console.log("Post An Incident Success!");
                }
                else {
                    console.log("Unexpected error in post incident");
                }
            });
            $rootScope.$emit("openIncidentDirectory");
            $scope.showList["postIncidentContent"] = false;
            $scope.showList["postIncidentList"] = true;
        }
        else{
            alert("Didn't fill in information. ");
        }
    }

    $scope.updateIncidentContent = function(){
        var incident_data = {
            username: $scope.userClass["username"],
            safe: $scope.isSafe,
            injure: $scope.isInjured,
            severity: $scope.severity,
            emergencyType: $scope.emergencyType,
            content: $scope.content,
            address: $scope.address,
            phonenumber: $scope.phonenumber
        };
        // var socketdata = {
        //     username: $scope.userClass["username"],
        //     content: $scope.content,
        //     address: $scope.address
        // };

        $http({
            method: "post",
            url: "/incident/content/" + $scope.userClass["username"] + "/" + $scope.userClass["postTime"],
            data: incident_data
        }).success(function (rep) {
            $scope.isSafe = "";
            $scope.isInjured = "";
            $scope.severity = "";
            $scope.emergencyType = "";
            $scope.content = "";
            $scope.address = "";
            $scope.phonenumber = ""; //here todo
            console.log("here == in post incident content2");
            mySocket.emit("Post Incident");
            //$scope.announcement_content = "";
            if (rep.success == 1) {
                console.log("Post An Incident Success!");
            }
            else {
                console.log("Unexpected error in post incident");
            }
        });
        //$rootScope.$emit("openIncidentDirectory");
        $scope.showList["postIncidentContent"]=false;
        $scope.showList["postIncidentList"]=true;
        $scope.showList["postIncidentUpdateContent"]=false;
        $rootScope.$emit("openIncidentDirectory");
    }

    var getIncidentContent = function(){
        $http({
            method:"get",
            url:"/incident/content/" + $scope.userClass["username"] + "/" + $scope.userClass["postTime"]
        }).success(function(rep){
            var info = rep.data;
            //content should have these fields
                //$scope.userClass["username"]=
            //console.log(info["isSafe"]);
            console.log(info);
            if(info.length !==0) {
                //console.log(info[0]["isSafe"]);
                $scope.isSafe = info[0]["isSafe"];
                $scope.isInjured = info[0]["isInjured"];
                $scope.severity = info[0]["severity"];
                $scope.emergencyType = info[0]["emergencyType"];
                $scope.content = info[0]["content"];
                $scope.address = info[0]["address"];
                $scope.phonenumber = info[0]["phonenumber"];
            }
            else {
                console.log("content 0");
                $scope.isSafe = "";
                $scope.isInjured = "";
                $scope.severity = "";
                $scope.emergencyType = "";
                $scope.content = "";
                $scope.address = "";
                $scope.phonenumber = "";
            }
        });
        // $scope.showList["postIncidentContent"]=false;
        // $scope.showList["postIncidentList"]=true;
        // $scope.showList["postIncidentUpdateContent"]=false;
        //$rootScope.$emit("openIncidentDirectory");
    }

    $rootScope.$on("updateIncidentContent", function() {
        //$scope.privateChatSender = $scope.userClass["privateChatSender"];
        getIncidentContent();
    });

    // $rootScope.$on("openIncidentContent", function() {
    //     //$scope.privateChatSender = $scope.userClass["privateChatSender"];
    //     getIncidentContent();
    // });

});
