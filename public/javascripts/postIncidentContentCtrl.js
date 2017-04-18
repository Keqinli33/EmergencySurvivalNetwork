/**
 * Created by keqinli on 4/17/17.
 */

app.controller("postIncidentContentCtrl", function ($window, $scope, $rootScope, $http, mySocket) {
    var postIncident = function() {
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

            $http({
                method: "post",
                url: "/incident/" + $scope.userClass["username"],
                data: incident_data
            }).success(function (rep) {
                mySocket.emit("Post An Incident", incident_data);
                //$scope.announcement_content = "";
                if (rep.success == 1) {
                    console.log("Post An Incident Success!");
                }
                else {
                    console.log("Unexpected error in post incident");
                }
            });
        }
    }

    var getIncidentContent = function(){
        $http({
            method:"get",
            url:"/incident/content/" + $scope.userClass["username"] + "/" + $scope.userClass["postTime"]
        }).success(function(rep){
            var info = rep.data;
            //content should have these fields
                //$scope.userClass["username"]=
                $scope.isSafe = info[0]["isSafe"];
                $scope.isInjured = info[0]["isInjured"];
                $scope.severity = info[0]["severity"];
                $scope.emergencyType = info[0]["emergencyType"];
                $scope.content = info[0]["content"];
                $scope.address = info[0]["address"];
                $scope.phonenumber = info[0]["phonenumber"];
        });
    }

    $rootScope.$on("openIncidentContent", function() {
        //$scope.privateChatSender = $scope.userClass["privateChatSender"];
        getIncidentContent();
    });

}
