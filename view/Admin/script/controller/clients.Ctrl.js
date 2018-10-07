app.controller('ClientsCtrl', ['$scope', '$rootScope', '$localStorage', '$timeout', '$interval', '$filter', '$state', 'JobService', '$http',
    function($scope, $rootScope, $localStorage, $timeout, $interval, $filter, $state, JobService, $http) {

        if (!$rootScope.showClientStatus) {
            $rootScope.addClient = {
                Assort_ClientID: '0',
                Assort_ClientName: '',
                Assort_ClientUserID: '',
                Assort_ClientPassword: '',
                Assort_StartContractDate: '',
                Assort_EndContractDate: '',
                Assort_AveragemarkupForIntelligence: '',
                Assort_Temporarystaffing: '',
                Assort_Reasonforchangeisuue: '',
                Assort_TotalstafftooutsourceRecruit: '',
                Assort_TotalstafftooutsourceOutsource: '',
                Assort_MinSalary: '',
                Assort_MaxSal: '',
                Assort_JobDescription: '',
                Assort_Paymenttermforpermanentplacementsignof: '',
                Assort_InsuranceCoverage: '',
                industry: '',
                turn_over: '',
                client_website: '',
                client_linkedin: '',
                permaBuiseness13: '',
                terms_of_payment_forSharing: '',
                replacement_period: '',
                cash_and_carry: '',
                upfront: '',
                complince: '',
                Assort_ClientContactPersonName: '',
                Assort_ClientEmail: '',
                Assort_ClientPNumber: '',
                Assort_ClientManagerName: '',
                Assort_ClientContactID: '',
                Assort_CurrentlyOutsourcedAgency1: '',
                Assort_CurrentlyOutsourcedAgency2: '',
                Assort_CurrentlyOutsourcedAgency3: '',
                Assort_CurrentlyOutsourcedAgency4: '',
                Assort_CurrentlyOutsourcedAgency5: ''
            };
        } else {
            $rootScope.showClientStatus = false;
        }
        $scope.formatDate = function(date) {
            var dateOut = new Date(date);
            return dateOut;
        };
        $scope.isLoader = false;
        $scope.SubmitAddClient = function() {
            $scope.isLoader = true;

            if ($scope.clientForm.$valid) {


                var PostDataReq = {
                    "request": $rootScope.addClient
                }

                var askForPromise = JobService.AddClients.PostPromise(PostDataReq);
                askForPromise.then(
                    // OnSuccess function
                    function(answer) {
                        $scope.isLoader = false;
                        if ($rootScope.addClient.Assort_ClientID == '0') {
                            swal("Success", "Added successfully client details !", "success");

                        } else {
                            swal("Success", "Updated successfully client details !", "success");

                        }


                    },
                    // OnFailure function
                    function(reason) {

                    }
                )

            } else {
                $scope.isLoader = false;
                swal("Error", "Please Enter Required Details !", "error");
            }
        };
        if ($state.current.name == 'ShowClients') {
            $rootScope.addClient = null;
            $scope.isLoader = true;
            var clientList = JobService.clientList.getPromise('0');
            clientList.then(
                // OnSuccess function
                function(answer) {

                    if (answer.data.GetclientListResult.ResponseCode == 0) {

                        $scope.isLoader = false;
                        $scope.clientlists = answer.data.GetclientListResult.Result;

                    } else {
                        $scope.ErrorMessage = answer.data.GetclientListResult.ResponseMessage;

                    }

                },
                // OnFailure function
                function(reason) {
                    swal("Error", "Some thing went wrong. Please try again !", "error");
                }
            );
        }
        if (($state.current.name === 'AddClients')) {
            $scope.isLoader = true;
            var getRmList = JobService.getRmList.getPromise('0');
            getRmList.then(
                // OnSuccess function
                function(answer) {
                    $scope.isLoader = false;
                    if (answer.data.GetRelationshipManagerResult.ResponseCode == 0) {


                        $scope.getRelationshipManager = answer.data.GetRelationshipManagerResult.Result;



                    }

                },
                // OnFailure function
                function(reason) {
                    swal("Error", "Some thing went wrong. Please try again !", "error");
                }
            );
        }
        $scope.SubmitAgreement = function() {
            $scope.isLoader = true;
            var Datafiles = document.getElementById("doc1");
            var fd = new FormData();
            //Take the first selected file
            fd.append("file", Datafiles.files[0]);

            $http.post(API_UpdateClientAgrement + "/" + $rootScope.addClient.Assort_ClientID, fd, {
                    withCredentials: true,
                    headers: { 'Content-Type': undefined },
                    transformRequest: angular.identity
                })
                .success(function(data, status) {

                    swal("Success", "Document has been successfully uploaded  !", "success");
                    $scope.isLoader = false;
                })
                .catch(function(response) {
                    $scope.isLoader = false;
                    swal("Success", "Document has been successfully uploaded  !", "success");
                    //  $rootScope.UploadMessage = "File Uploaded Successfully";
                });
        }
        $scope.showClient = function(item) {
            $rootScope.showClientStatus = true;
            $state.go('AddClients');
            $rootScope.addClient = item;
            // $rootScope.addClient.Assort_StartContractDate = $scope.formatDate($rootScope.addClient.Assort_StartContractDate);
            // $rootScope.addClient.Assort_EndContractDate = $scope.formatDate($rootScope.addClient.Assort_EndContractDate);
        }

        $scope.deleteClient = function(ClientID, Index) {
            var deleteClient = JobService.deleteClient.getPromise(ClientID);
            deleteClient.then(
                // OnSuccess function
                function(answer) {
                    swal("Success", "Client Deleted successfully !", "success");
                },
                // OnFailure function
                function(reason) {

                }
            )
        }


        $scope.actDeactOp = function(item, param, index) {
            var ActDeactOperClient = JobService.actDeactOperClient.getPromise(item, param);
            ActDeactOperClient.then(
                // OnSuccess function
                function(answer) {
                    $scope.isLoader = false;
                    if (answer.data.ActDeactOperClientResult.ResponseCode == '0') {
                        swal("Success", "Client Updated successfully !", "success");
                        if (param == 0)
                            $scope.clientlists[index].isActive = 1;
                        else
                            $scope.clientlists[index].isActive = 0;

                        location.reload();

                    } else {
                        swal("Success", "Client Updated successfully !", "success");

                    }


                },
                // OnFailure function
                function(reason) {

                }
            )

        }
    }
]);