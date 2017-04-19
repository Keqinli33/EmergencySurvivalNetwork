/**
 * Created by keqinli on 4/19/17.
 */

app.controller("postIncidentListAllCtrl", function($window, $scope, $rootScope, $http, mySocket) {

    // var openIncidentDirectory = function() {
    //     console.log("here == in post incident list content1");
    //     $http({
    //         method: "get",
    //         url: "/incident/list/" + $scope.userClass["username"]
    //     }).success(function (rep) {
    //         console.log("here == in post incident list content2");
    //         // var res = [];
    //         // for(var i=0; i<rep.data1.length; i++){
    //         //     var temp = rep.data1[i] + " @ " + rep.data2[i];
    //         //     res.
    //         // }
    //         $scope.contents = rep.data1;
    //         //$scope.postTimes = rep.data2;
    //         //console.log(res);
    //     });
    // }
    /*
        get all incidents todo
     */
    var openAllIncidentDirectory = function() {
        // console.log("here == in post incident list content1");
        $http({
            method: "get",
            url: "/incident/alllist"
        }).success(function (rep) {
            console.log("here == in post incident list content2");
            // var res = [];
            // for(var i=0; i<rep.data1.length; i++){
            //     var temp = rep.data1[i] + " @ " + rep.data2[i];
            //     res.
            // }
            $scope.allcontents = rep.data1; //todo
            //$scope.contents = rep.data1;
            //$scope.postTimes = rep.data2;
            //console.log(res);
        });
    }

    // $scope.showDirectory = function () {
    //     $http({
    //         method: "get",
    //         url: "/incident/list/" + $scope.userClass["username"]
    //     }).success(function (rep) {
    //         // var res = [];
    //         // for(var i=0; i<rep.data1.length; i++){
    //         //     var temp = rep.data1[i] + " @ " + rep.data2[i];
    //         //     res.
    //         // }
    //         $scope.contents = rep.data1;
    //         //$scope.postTimes = rep.data2;
    //         console.log(res);
    //     });
    // };

    mySocket.on("Post Incident", function() {
        if($scope.showList["postIncidentListAll"] ==true){
            openAllIncidentDirectory();  //todo
        }
    });

    // mySocket.on("Update Incident", function() {
    //     if($scope.showList["postIncidentListAll"] ==true){
    //         openAllIncidentDirectory();  //todo
    //     }
    // });

    // // in directory, open private chat
    // $scope.openUpdate = function (postTime) {
    //     $scope.userClass["postTime"] = postTime;
    //     $rootScope.$emit("openIncidentContent");
    //     $scope.showList["postIncidentContent"]=true;
    //     $scope.showList["postIncidentList"]=false;
    //     $scope.showList["postIncidentUpdateContent"]=true; //wait
    //     // $http({
    //     //     method:"get",
    //     //     url:"/incident/content/" + $scope.userClass["username"] + "/" + postTime
    //     // }).success(function(rep){
    //     //     $
    //     // });
    // };

    $rootScope.$on("openIncidentAllDirectory", function() {
        //$scope.privateChatSender = $scope.userClass["privateChatSender"];
        openAllIncidentDirectory();
    });

});