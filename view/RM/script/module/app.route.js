/// <reference path="../../View/Home.html" />

app.config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/Index");
    //
    // Now set up the states
    $stateProvider
        .state('Index', {
            url: "/Index",
            templateUrl: "../RM/View/Home.html",
            controller: "ClientsCtrl"
        })
        .state('agreement', {
            url: "/agreement",
            templateUrl: "../RM/View/other.html",
            controller: "ClientsCtrl"
        })
        .state('showIssue', {
            url: "/showIssue",
            templateUrl: "../RM/View/showIssue.html",
            controller: "ClientsCtrl"
        })

    .state('addCard', {
            url: "/addCard",
            templateUrl: "../RM/View/addCard.html",
            controller: "ClientsCtrl"
        })
        .state('showProfile', {
            url: "/showProfile",
            templateUrl: "../RM/View/showProfile.html",
            controller: "ClientsCtrl"
        })
        .state('showjob', {
            url: "/showjob",
            templateUrl: "../RM/View/showjob.html",
            controller: "ClientsCtrl"
        })


});
app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

app.directive('ngFiles', ['$parse', function($parse) {

    function fn_link(scope, element, attrs) {
        var onChange = $parse(attrs.ngFiles);
        element.on('change', function(event) {
            onChange(scope, { $files: event.target.files });
        });
    };

    return {
        link: fn_link
    }
}]);

app.directive('fileModel', ['$parse', function($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function() {
                scope.$apply(function() {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

app.service('fileUpload', ['$http', function($http) {
    this.uploadFileToUrl = function(file, uploadUrl) {
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
            .success(function(data) {
                console.log(data);
            })
            .error(function() {});
    }
}]);