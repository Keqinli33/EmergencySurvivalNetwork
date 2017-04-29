app.controller("ProfileManagementCtrl", function($window, $scope, $rootScope, $http, mySocket) {
    var getProfileDetails = function() {
        $http({
            method:"get",
            url:"/profile/" + $scope.profile["profileusername"],
            //data: {username: $scope.userClass["username"]}
        }).success(function(rep){
            if(rep.data) {
                $scope.newusername = rep.data.newusername;
                $scope.password = rep.data.password;
                $scope.accountstatus = rep.data.accountstatus;
                $scope.privilegelevel = rep.data.privilegelevel;
            }
            else {
                console.log("Error in retrieving data");
            }
        });
    };

    $rootScope.$on("openProfile", function() {
        console.log("In openprofile");
        for (var item in $scope.showList) {
            $scope.showList[item] = false;
        }
        getProfileDetails();
        console.log("setting profileManagement to true");
        $scope.showList["profileManagement"] = true;

    });

    $scope.updateProfileDetails = function() {
        var params = {
            profileusername:$scope.profile["profileusername"],
            newusername:$scope.newusername,
            password:$scope.password,
            accountstatus:$scope.accountstatus,
            privilegelevel:$scope.privilegelevel
        };

        $http({
            method:"post",
            url:"/profile",
            data: params
        }).success(function(rep) {
            if (rep.success == 1) {
                alert("Updated your profile!");
            }
            else {
                console.log("Unexpected error in updating profile");
                alert("Error in updating profile");
            }
        });
    };
});
