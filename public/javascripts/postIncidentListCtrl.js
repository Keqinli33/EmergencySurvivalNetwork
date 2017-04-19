/**
 * Created by keqinli on 4/17/17.
 */

app.controller("postIncidentListCtrl", function($window, $scope, $rootScope, $http, mySocket) {

    var openIncidentDirectory = function() {
        console.log("here == in post incident list content1");
            $http({
                method: "get",
                url: "/incident/list/" + $scope.userClass["username"]
            }).success(function (rep) {
                console.log("here == in post incident list content2");
                // var res = [];
                // for(var i=0; i<rep.data1.length; i++){
                //     var temp = rep.data1[i] + " @ " + rep.data2[i];
                //     res.
                // }
                $scope.contents = rep.data1;
                //$scope.postTimes = rep.data2;
                //console.log(res);
            });
    }

    $scope.showDirectory = function () {
        $http({
            method: "get",
            url: "/incident/list/" + $scope.userClass["username"]
        }).success(function (rep) {
            // var res = [];
            // for(var i=0; i<rep.data1.length; i++){
            //     var temp = rep.data1[i] + " @ " + rep.data2[i];
            //     res.
            // }
            $scope.contents = rep.data1;
            //$scope.postTimes = rep.data2;
            console.log(res);
        });
    };

    // in directory, open private chat
    $scope.openUpdate = function (postTime) {
        $scope.userClass["postTime"] = postTime;
        $rootScope.$emit("openIncidentContent");
        $scope.showList["postIncidentContent"]=true;
        $scope.showList["postIncidentList"]=false;
        $scope.showList["postIncidentUpdateContent"]=true; //wait
        // $http({
        //     method:"get",
        //     url:"/incident/content/" + $scope.userClass["username"] + "/" + postTime
        // }).success(function(rep){
        //     $
        // });
    };

    $rootScope.$on("openIncidentDirectory", function() {
        //$scope.privateChatSender = $scope.userClass["privateChatSender"];
        openIncidentDirectory();
    });

});