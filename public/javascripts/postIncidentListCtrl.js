/**
 * Created by keqinli on 4/17/17.
 */

app.controller("postIncidentListCtrl", function($window, $scope, $rootScope, $http, mySocket) {


    $scope.showDirectory = function () {
            $http({
                method:"get",
                url:"/incident/list/" +$scope.userClass["username"]
            }).success(function(rep) {
                $scope.contents = res.data2;
                $scope.postTimes = res.data2;
                console.log(res);
            });
    };

    // in directory, open private chat
    $scope.openUpdate = function (postTime) {
        $scope.userClass["postTime"] = postTime;
        $rootScope.$emit("openPrivateChat");
        // $http({
        //     method:"get",
        //     url:"/incident/content/" + $scope.userClass["username"] + "/" + postTime
        // }).success(function(rep){
        //     $
        // });
    };

}