/// <reference path="../../view/Admin/View/Home.html" />
/// <reference path="../../view/job/jobListing.html" />
/// <reference path="../../view/login/login.html" />
/// <reference path="../../view/home.html" />
/// <reference path="../../view/home.html" />
/// <reference path="../../Admin/Index.html" />
app.config(function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/Index");
    //
    // Now set up the states
    $stateProvider
      .state('Index', {
          url: "/Index",
          templateUrl: "../../view/home.html",
          controller: "CommonCtrl"
      })
      .state('USA', {
          url: "/USA",
          templateUrl: "../../view/uderconstruction.html",
          controller: "CommonCtrl"
      })
        .state('team', {
            url: "/team",
            templateUrl: "../../view/team.html",
            controller: "CommonCtrl"
        })
        .state('news', {
            url: "/news",
            templateUrl: "../../view/news.html",
            controller: "CommonCtrl"
        })
      .state('MidelEast', {
          url: "/MidelEast",
          templateUrl: "../../view/uderconstruction.html",
          controller: "CommonCtrl"
      })
    .state('Contact', {
        url: "/Contact",
        templateUrl: "../../view/contact.html",
        controller: "CommonCtrl"
    })
    .state('RecruitmentStaffing', {
        url: "/RecruitmentStaffing",
        templateUrl: "../../view/RecruitmentProcess.html",
        controller: "CommonCtrl"
    })
    .state('About', {
        url: "/About",
        templateUrl: "../../view/aboutus.html",
        controller: "CommonCtrl"
    })
      .state('Payroll', {
          url: "/Payroll",
          templateUrl: "../../view/PayrollOutSorcing.html",
          controller: "CommonCtrl"
      })
    .state('SearchSelection', {
        url: "/SearchSelection",
        templateUrl: "../../view/searchAndSelection.html",
        controller: "CommonCtrl"
    })
    .state('TempStaffing', {
        url: "/TempStaffing",
        templateUrl: "../../view/temporaryStaffing.html",
        controller: "CommonCtrl"
    })
.state('LoginRes', {
    url: "/LoginRes:from",
    templateUrl: "../../view/login/login.html",
    controller: "AuthCtrl"
})
    .state('Blog', {
        url: "/Blog",
        templateUrl: "../../view/blog.html",
        controller: "CommonCtrl"
    })

    .state('Profile', {
        url: "/Profile",
        templateUrl: "../../Admin/Index.html",
        controller: "CandidateCtrl"
    })
     .state('Job', {
         url: "/Job",
         templateUrl: "../../view/job/jobListing.html",
         controller: "CommonCtrl"
     })
        .state('itStaffing', {
            url: "/itStaffing",
            templateUrl: "../../view/itStaffing.html",
            controller: "CommonCtrl"
        })
        .state('Job/View', {
            url: "/Job/View",
            templateUrl: "../../view/job/jobview.html",
            controller: "CommonCtrl"
        })
    .state('Admin/view', {
        url: "/Admin/view",
        templateUrl: "../../view/Admin/View/Home.html",
        controller: "CommonCtrl"
    })
   
});
app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);

app.directive('ngFiles', ['$parse', function ($parse) {

    function fn_link(scope, element, attrs) {
        var onChange = $parse(attrs.ngFiles);
        element.on('change', function (event) {
            onChange(scope, { $files: event.target.files });
        });
    };

    return {
        link: fn_link
    }
}]);

app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

app.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function (file, uploadUrl) {
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
        .success(function (data) {
            console.log(data);
        })
        .error(function () {
        });
    }
}]);