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
            templateUrl: "../Admin/View/Home.html",
            controller: "CommonCtrl"
        })
        .state('agreement', {
            url: "/agreement",
            templateUrl: "../Admin/View/other.html",
            controller: "CommonCtrl"
        })
        .state('addnews', {
            url: "/addnews",
            templateUrl: "../Admin/View/addnews.html",
            controller: "CommonCtrl"
        })
    .state('showIssue', {
            url: "/showIssue",
            templateUrl: "../Admin/View/showIssue.html",
            controller: "CommonCtrl"
        })
        .state('showJobAppliedCand', {
            url: "/showJobAppliedCand",
            templateUrl: "../Admin/View/showAppliedJob.html",
            controller: "CommonCtrl"
        })
        .state('showShortlistedJob', {
            url: "/showShortlistedJob",
            templateUrl: "../Admin/View/showShortlistedCandidate.html",
            controller: "CommonCtrl"
        })
        .state('Addjob', {
            url: "/Addjob",
            templateUrl: "../Admin/View/Addjob.html",
            controller: "CommonCtrl"
        })
        .state('Showjobs', {
            url: "/Showjobs",
            templateUrl: "../Admin/View/showjob.html",
            controller: "CommonCtrl"
        })
        .state('AddLocation', {
            url: "/AddLocation",
            templateUrl: "../Admin/View/addlocation.html",
            controller: "CommonCtrl"
        })
        .state('AddCompany', {
            url: "/AddCompany",
            templateUrl: "../Admin/View/addCompany.html",
            controller: "CommonCtrl"
        })
        .state('AddIndustry', {
            url: "/AddIndustry",
            templateUrl: "../Admin/View/AddIndustry.html",
            controller: "CommonCtrl"
        })
        .state('AddSkillCategory', {
            url: "/AddSkillCategory",
            templateUrl: "../Admin/View/AddSkillCategory.html",
            controller: "CommonCtrl"
        })
        .state('AddSkill', {
            url: "/AddSkill",
            templateUrl: "../Admin/View/AddSkill.html",
            controller: "CommonCtrl"
        })
        .state('AddClients', {
            url: "/AddClients",
            templateUrl: "../Admin/View/AddClients.html",
            controller: "ClientsCtrl"
        })
        .state('AddRm', {
            url: "/AddRm",
            templateUrl: "../Admin/View/addRelationshipManager.html",
            controller: "CommonCtrl"
        })
        .state('ShowRm', {
            url: "/ShowRm",
            templateUrl: "../Admin/View/showRelationShipManager.html",
            controller: "CommonCtrl"
        })
        .state('ShowClients', {
            url: "/ShowClients",
            templateUrl: "../Admin/View/Showclient.html",
            controller: "ClientsCtrl"
        })
        .state('UserDetails', {
            url: "/UserDetails",
            templateUrl: "../Admin/View/ShowUsers.html",
            controller: "CommonCtrl"
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