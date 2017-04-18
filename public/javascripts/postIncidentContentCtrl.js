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
            
        });
    }

}
