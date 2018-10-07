app.controller('CandidateCtrl', ['$scope', '$rootScope', '$localStorage', '$timeout', '$interval', '$filter', '$state', 'JobService', '$http', 'fileReader',
    function($scope, $rootScope, $localStorage, $timeout, $interval, $filter, $state, JobService, $http, fileReader) {

        $scope.ViewPageVal = {
            profileView: true,
            appliedJob: false
        }
        if ($rootScope.userData.Candidate_Image == null || $rootScope.userData.Candidate_Image == '') {
            $rootScope.userData.Candidate_Image = 'https://s-media-cache-ak0.pinimg.com/736x/12/6b/fe/126bfedacf729bb5ed6c1520d91b5e67--korra-avatar-team-avatar.jpg';
        }

        $rootScope.logout = function() {
            $rootScope.LoginStatus = false;
            $localStorage.LoginStatusLocal = false;
        }

        $scope.Submit = function() {
            var postData = {
                "request": $rootScope.userData
            }
            var addCompany = JobService.UpdateUser.PostPromise(postData);
            addCompany.then(
                // OnSuccess function
                function(answer) {
                    swal("Success", "Update Profile successfully !", "success");



                },
                // OnFailure function
                function(reason) {

                }
            );
        }
        $scope.showJobView = function(JobID) {
            $localStorage.jobViewID = JobID;
            $state.go("Job/View");
        }
        $scope.ViewContent = function(param) {
            if (param === 'Profile') {
                $scope.ViewPageVal = {
                    profileView: true,
                    appliedJob: false,
                    uploadResume: false
                }
            } else if (param === 'appliedJob') {
                $scope.ViewPageVal = {
                    profileView: false,
                    appliedJob: true,
                    uploadResume: false
                }
            } else {
                $scope.ViewPageVal = {
                    profileView: false,
                    appliedJob: false,
                    uploadResume: true
                }
            }
        }
        $scope.UploadImage = function() {

            $('#imgupload').trigger('click');
        }
        $scope.uploadImageFile = function() {
            alert('hhhj');
        }
        $scope.uploadFile = function() {
            console.log(fileReader)
            var filename = event.target.files[0].name;
            //  $scope.userData.CandidateImage = event.target.value;
            var reader = new FileReader();
            fileReader.readAsDataUrl($scope.file, $scope)
                .then(function(result) {
                    $rootScope.userData.Candidate_Image = result;
                });

            var fd = new FormData();
            //Take the first selected file
            fd.append("file", $scope.file);

            $http.post(API_UpdateCandidateImage + "/" + $localStorage.userData.UR_ID, fd, {
                    withCredentials: true,
                    headers: { 'Content-Type': undefined },
                    transformRequest: angular.identity
                })
                .success(function(data, status) {


                    swal("Success", "File has been successfully uploaded !", "success");

                })
                .catch(function(response) {
                    swal("Success", "File has been successfully uploaded !", "success");
                    // $rootScope.UploadMessage = "File Uploaded Successfully";
                });
        };
        var showJobs = JobService.getAppliedJobListByID.getPromise($localStorage.userData.UR_ID);
        showJobs.then(
            // OnSuccess function
            function(answer) {
                $scope.getApplieJobList = answer.data.GetAppliedJobListByIDResult.Result.getAppliedJobs;


            },
            // OnFailure function
            function(reason) {

            }
        );

        $scope.uploadresume = function() {

            var Datafiles = document.getElementById("resume");
            var fd = new FormData();
            //Take the first selected file
            fd.append("file", Datafiles.files[0]);

            $http.post(API_UpdateCandidateResume + "/" + $localStorage.userData.UR_ID, fd, {
                    withCredentials: true,
                    headers: { 'Content-Type': undefined },
                    transformRequest: angular.identity
                })
                .success(function(data, status) {


                    swal("Success", "Resume has been successfully uploaded !", "success");

                })
                .catch(function(response) {
                    swal("Success", "Resume has been successfully uploaded !", "success");
                    // $rootScope.UploadMessage = "File Uploaded Successfully";
                });
        }

    }
]);

app.directive('customOnChange', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var onChangeFunc = scope.$eval(attrs.customOnChange);
            element.bind('change', onChangeFunc);
        }
    };
});
app.directive("ngFileSelect", function() {

    return {
        link: function($scope, el) {

            el.bind("change", function(e) {

                $scope.file = (e.srcElement || e.target).files[0];
                $scope.uploadFile();
            })

        }

    }


})
var fileReader = function($q, $log) {

    var onLoad = function(reader, deferred, scope) {
        return function() {
            scope.$apply(function() {
                deferred.resolve(reader.result);
            });
        };
    };

    var onError = function(reader, deferred, scope) {
        return function() {
            scope.$apply(function() {
                deferred.reject(reader.result);
            });
        };
    };

    var onProgress = function(reader, scope) {
        return function(event) {
            scope.$broadcast("fileProgress", {
                total: event.total,
                loaded: event.loaded
            });
        };
    };

    var getReader = function(deferred, scope) {
        var reader = new FileReader();
        reader.onload = onLoad(reader, deferred, scope);
        reader.onerror = onError(reader, deferred, scope);
        reader.onprogress = onProgress(reader, scope);
        return reader;
    };

    var readAsDataURL = function(file, scope) {
        var deferred = $q.defer();

        var reader = getReader(deferred, scope);
        reader.readAsDataURL(file);

        return deferred.promise;
    };

    return {
        readAsDataUrl: readAsDataURL
    };
};

app.factory("fileReader", ["$q", "$log", fileReader]);