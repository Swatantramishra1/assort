app.controller('ClientsCtrl', ['$scope', '$rootScope', '$localStorage', '$timeout', '$interval', '$filter', '$state', 'JobService', '$sce',
    function($scope, $rootScope, $localStorage, $timeout, $interval, $filter, $state, JobService, $sce) {
        $scope.isLoader = true;
        $scope.userDataCommon = JSON.parse(localStorage.getItem("data"));

        $scope.addCard = {
            ClientID: '',
            Label1: 'Card1',
            Label2: 'Card2',
            Label3: 'Card3',
            Label4: 'Card4',
            Text1: '',
            Text2: '',
            Text3: '',
            Text4: '',
        }


        var getClientCard = JobService.getClientCard.getPromise($scope.userDataCommon.UR_ID);
        getClientCard.then(
            // OnSuccess function
            function(answer) {

                if (answer.data.GetCardClientResult.ResponseCode == 0) {


                    $scope.addCard = JSON.parse(answer.data.GetCardClientResult.Result[0].Text1);

                } else {
                    $scope.ErrorMessage = answer.data.GetCompanyResult.ResponseMessage;

                }

            },
            // OnFailure function
            function(reason) {

            }
        );



        $scope.loaddata = function() {
            var getSkillsCategoryList = JobService.getSkillsCategory.getPromise();
            getSkillsCategoryList.then(
                // OnSuccess function
                function(answer) {

                    if (answer.data.GetSkillsCategoryResult.ResponseCode == 0) {


                        $scope.getSkillsCategoryLists = answer.data.GetSkillsCategoryResult.Result;

                    } else {
                        $scope.ErrorMessage = answer.data.GetSkillsCategoryResult.ResponseMessage;

                    }

                },
                // OnFailure function
                function(reason) {

                }
            );






            var getCompanyList = JobService.getCompanyList.getPromise();
            getCompanyList.then(
                // OnSuccess function
                function(answer) {

                    if (answer.data.GetCompanyResult.ResponseCode == 0) {


                        $scope.getCompanyLists = answer.data.GetCompanyResult.Result;

                    } else {
                        $scope.ErrorMessage = answer.data.GetCompanyResult.ResponseMessage;

                    }

                },
                // OnFailure function
                function(reason) {

                }
            );
            var getSkillsNameList = JobService.getSkillsName.getPromise();
            getSkillsNameList.then(
                // OnSuccess function
                function(answer) {

                    if (answer.data.GetSkillsNameResult.ResponseCode == 0) {


                        $scope.getSkillsNameLists = answer.data.GetSkillsNameResult.Result;

                    } else {
                        $scope.ErrorMessage = answer.data.GetSkillsNameResult.ResponseMessage;

                    }

                },
                // OnFailure function
                function(reason) {

                }
            );
            var getIndustryList = JobService.getIndustryList.getPromise();
            getIndustryList.then(
                // OnSuccess function
                function(answer) {

                    if (answer.data.GetIndustryListResult.ResponseCode == 0) {


                        $scope.getIndustryLists = answer.data.GetIndustryListResult.Result;

                    } else {
                        $scope.ErrorMessage = answer.data.GetIndustryListResult.ResponseMessage;

                    }

                },
                // OnFailure function
                function(reason) {

                }
            );
            var getJobLocationList = JobService.getJobLocation.getPromise();
            getJobLocationList.then(
                // OnSuccess function
                function(answer) {

                    if (answer.data.GetLocationResult.ResponseCode == 0) {


                        $scope.GetLocationResultLists = answer.data.GetLocationResult.Result;

                    } else {
                        $scope.ErrorMessage = answer.data.GetLocationResult.ResponseMessage;

                    }

                },
                // OnFailure function
                function(reason) {

                }
            );
        };

        if ($state.current.url == "/other" || $state.current.name == "other") {
            var getOtherDetails = JobService.getOtherDetails.getPromise($scope.userDataCommon.UR_ID);
            getOtherDetails.then(
                // OnSuccess function
                function(answer) {

                    if (answer.data.GetOtherDetailsResult.ResponseCode == 0) {

                        if (answer.data.GetOtherDetailsResult.Result.length > 0)
                            $rootScope.Other = answer.data.GetOtherDetailsResult.Result[0];
                        else {
                            $rootScope.Other = {
                                NoOfEmpl: "",
                                Location: "",
                                NoOfEmplPF_ESIC: "",
                                HealthRpt: "",
                                Exits: "",
                                CLRA_Status: "",
                                open_positions_share: "",
                                Joinees: "",
                                Invoices: "",
                                Agreements_Dates: ""
                            }
                        }
                    } else {
                        $scope.ErrorMessage = answer.data.GetOtherDetailsResult.ResponseMessage;

                    }

                },
                // OnFailure function
                function(reason) {
                    swal("Error", "Some thing went wrong. Please try again !", "error");
                }
            );
        }

        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        }
        if ($state.current.url == "/Addjob" || $state.current.name == "Addjob") {
            if ($localStorage.forEditStatus) {
                $localStorage.forEditStatus = false;
                console.log($rootScope.job)
            } else {
                $rootScope.job = {
                    JobID: '',
                    Job_Title: '',
                    CompanyID: '',
                    Job_Description: '',
                    Job_PostedBy: '',
                    Job_Type: '',
                    Job_Exp_Min: '',
                    Job_Exp_Max: '',
                    Job_Sal_Min: '',
                    Job_Sal_Max: '',
                    LocationID: '',
                    IndustryID: '',
                    educationID: '',
                    SkillsList: []
                }
            }


        }
        if ($state.current.url == "/Showjob" || $state.current.name == "Showjob") {

            var getJobListClientByID = JobService.getJobListClientByID.getPromise($scope.userDataCommon.UR_ID);
            getJobListClientByID.then(
                // OnSuccess function
                function(answer) {
                    $scope.isLoader = false;
                    if (answer.data.GetJobClientListResult.ResponseCode == 0) {

                        $scope.joblists = answer.data.GetJobClientListResult.Result;

                    } else {
                        $scope.ErrorMessage = answer.data.GetJobClientListResult.ResponseMessage;

                    }

                },
                // OnFailure function
                function(reason) {

                }
            );
            $scope.loaddata();
        }
        $scope.agremturl = "";
        $scope.IssueCreate = {
            IssueID: uniqueid(),
            IssuState: "OPEN",
            EventType: "CREATE",
            IsReminder: 1,
            IssueAttachmentUrl: '',
            ClientID: $scope.userDataCommon.UR_ID,
            IssuedTo: '',
            IssueSubject: '',
            IssueBody: ''

        }
        if (($state.current.url == '/Profile' || $state.current.name == 'Profile') || ($state.current.url == '/agrementview' || $state.current.name == 'agrementview')) {
            $scope.userData = JSON.parse(localStorage.getItem('data'));
            var clientList = JobService.clientList.getPromise($scope.userDataCommon.UR_ID);
            clientList.then(
                // OnSuccess function
                function(answer) {
                    $scope.isLoader = false;
                    if (answer.data.GetclientListResult.ResponseCode == 0) {



                        $scope.addClient = answer.data.GetclientListResult.Result[0];
                        $scope.agremturl = "http://docs.google.com/gview?url=" + $scope.addClient.ClientagrementUrl + "&embedded=true";
                    } else {
                        $scope.ErrorMessage = answer.data.GetclientListResult.ResponseMessage;

                    }

                },
                // OnFailure function
                function(reason) {

                }
            );
            var getRmList = JobService.getRmList.getPromise();
            getRmList.then(
                // OnSuccess function
                function(answer) {
                    if (answer.data.GetRelationshipManagerResult.ResponseCode == 0) {
                        $scope.getRelationshipManager = answer.data.GetRelationshipManagerResult.Result;
                    }

                },
                // OnFailure function
                function(reason) {

                }
            );
        }

        if ($state.current.url == '/showIssue' || $state.current.name == 'showIssue') {
            var getissueList = JobService.getissueByClient.getPromise($scope.userDataCommon.UR_ID);
            getissueList.then(
                // OnSuccess function
                function(answer) {
                    $scope.isLoader = false;
                    if (answer.data.GetIssueByClientResult.ResponseCode == 0) {


                        $scope.IssueList = answer.data.GetIssueByClientResult.Result;

                    } else {
                        $scope.ErrorMessage = answer.data.GetIssueByClientResult.ResponseMessage;

                    }

                },
                // OnFailure function
                function(reason) {

                }
            );
        }

        if ($state.current.url == '/showDocs' || $state.current.name == 'showDocs') {
            var getDocList = JobService.getDocList.getPromise($scope.userDataCommon.UR_ID);
            getDocList.then(
                // OnSuccess function
                function(answer) {
                    $scope.isLoader = false;
                    if (answer.data.GetDocsListResult.ResponseCode == 0) {


                        $scope.docsList = answer.data.GetDocsListResult.Result;

                    } else {
                        $scope.ErrorMessage = answer.data.GetDocsListResult.ResponseMessage;

                    }

                },
                // OnFailure function
                function(reason) {

                }
            );
        }

        $scope.showIssueDetails = function(item) {
            $scope.issueDetails = item;
        }

        $scope.getClientDetails = function() {
            var clientList = JobService.clientList.getPromise($scope.userDataCommon.UR_ID);
            clientList.then(
                // OnSuccess function
                function(answer) {
                    $scope.isLoader = false;

                    if (answer.data.GetclientListResult.ResponseCode == 0) {



                        for (var a = 0; a < answer.data.GetclientListResult.Result.length; a++) {
                            answer.data.GetclientListResult.Result[a].Assort_EndContractDate = new Date(answer.data.GetclientListResult.Result[a].Assort_EndContractDate);
                            answer.data.GetclientListResult.Result[a].Assort_StartContractDate = new Date(answer.data.GetclientListResult.Result[a].Assort_StartContractDate);

                        }
                        $scope.clientlists = answer.data.GetclientListResult.Result;
                        console.log($scope.clientlists);
                        $scope.getRmDetails($scope.clientlists[0].Assort_ClientContactID)

                    } else {
                        $scope.ErrorMessage = answer.data.GetclientListResult.ResponseMessage;

                    }

                },
                // OnFailure function
                function(reason) {

                }
            );
        }
        $scope.getClientDetails();
        $scope.getRmDetails = function(RMID) {
            $scope.isLoader = true;

            var getRmList = JobService.getRmList.getPromise(RMID);
            getRmList.then(
                // OnSuccess function
                function(answer) {
                    $scope.isLoader = false;

                    if (answer.data.GetRelationshipManagerResult.ResponseCode == 0) {


                        $scope.getRelationshipManager = answer.data.GetRelationshipManagerResult.Result;
                        $scope.IssueCreate.IssuedTo = $scope.getRelationshipManager[0].Assort_ClientEmail;


                    }

                },
                // OnFailure function
                function(reason) {

                }
            );
        }
        $scope.showjobs = function(joblist) {

            var Industryindex = $scope.getIndustryLists.map((cur, ind) => { if (cur.JobID == joblist.jobID) return ind }).filter((item) => {
                return item != undefined
            })
            var Locationindex = $scope.GetLocationResultLists.map((cur, ind) => { if (cur.JobID == joblist.jobID) return ind }).filter((item) => {
                return item != undefined
            })
            var Skillsindex = $scope.getSkillsCategoryLists.map((cur, ind) => { if (cur.JobID == joblist.jobID) return ind }).filter((item) => {
                return item != undefined
            })

            console.log("new id", joblist);
            $rootScope.job = joblist;
            $rootScope.job.JobID = joblist.JobID;


            $rootScope.job.IndustryID = $scope.getIndustryLists[Industryindex[0]].IndustryID;
            $rootScope.job.LocationID = $scope.GetLocationResultLists[Locationindex[0]].LocationID;
            console.log($scope.job);
            $state.go('Addjob');
            $localStorage.forEditStatus = true;
        }
        if ($state.current.url == '/Addjob' || $state.current.name == 'Addjob') {


            $scope.loaddata();

        }



        $scope.numberExp = 20;
        $scope.getNumberAsArray = function(number) {
            return new Array(number);
        }
        $scope.SubmitJob = function() {
            $scope.isLoader = true;

            $rootScope.job.LocationID = $rootScope.job.LocationID.join(',');
            $rootScope.job.SkillsList = $rootScope.job.SkillsList.join(',');

            $rootScope.job.CompanyID = ""
            $rootScope.job.IsPostedByClient = $scope.userDataCommon.UR_ID;
            console.log($rootScope.job);
            var postData = {
                "request": $rootScope.job
            }
            var createJob = JobService.createJob.PostPromise(postData);
            createJob.then(
                // OnSuccess function
                function(answer) {
                    $scope.isLoader = false;
                    swal("Success", "job created successfully  !", "success");
                    if (answer.data.GetLocationResult.ResponseCode == 0) {


                        $scope.GetLocationResultLists = answer.data.GetLocationResult.Result;

                    } else {
                        $scope.ErrorMessage = answer.data.GetLocationResult.ResponseMessage;

                    }

                },
                // OnFailure function
                function(reason) {

                }
            );

        }
        $scope.createIssue = function() {
            $scope.isLoader = true;
            $scope.IssueCreate.ClientEmailID = $scope.clientlists[0].Assort_ClientEmail;
            var postData = { "request": $scope.IssueCreate }
            var createUpdateIssue = JobService.createUpdateIssue.PostPromise(postData);
            createUpdateIssue.then(
                // OnSuccess function
                function(answer) {
                    $scope.isLoader = false;
                    swal("Success", "Issue created succesfully and sent email to your relationship manager  !", "success");


                },
                // OnFailure function
                function(reason) {

                }
            );
        }
        $rootScope.Logout = function() {

            window.location.href = '/Index.html';
            localStorage.clear();
            //window.open("/Index.html")
        }

        function uniqueid() {
            // always start with a letter (for DOM friendlyness)
            var idstr = String.fromCharCode(Math.floor((Math.random() * 25) + 65));
            do {
                // between numbers and characters (48 is 0 and 90 is Z (42-48 = 90)
                var ascicode = Math.floor((Math.random() * 42) + 48);
                if (ascicode < 58 || ascicode > 64) {
                    // exclude all chars between : (58) and @ (64)
                    idstr += String.fromCharCode(ascicode);
                }
            } while (idstr.length < 32);

            return (idstr);
        }

        $scope.updateIssueStatus = function(item, status, index) {
            $scope.isLoader = true;
            var UpdateIssueStatus = JobService.UpdateIssueStatus.PostPromise(item.IssueID, status, index);
            UpdateIssueStatus.then(
                // OnSuccess function
                function(answer) {
                    swal("Success", "Status updated successfully !", "success");

                    $scope.isLoader = false;
                    $scope.IssueList[index].IssuState = status;

                },
                // OnFailure function
                function(reason) {

                }
            );
        }
    }
]);