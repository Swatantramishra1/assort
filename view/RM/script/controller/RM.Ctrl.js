app.controller('ClientsCtrl', ['$scope', '$rootScope', '$localStorage', '$timeout', '$interval', '$filter', '$state', 'JobService', '$http',
    function ($scope, $rootScope, $localStorage, $timeout, $interval, $filter, $state, JobService, $http) {

        $localStorage.userData = JSON.parse(localStorage.getItem("data"));
        $scope.rooData = {
            clientDash: ''
        }
        $scope.Excel = function () {
            $scope.isLoader = true;
            var Datafiles = document.getElementById("doc111");
            var fd = new FormData();
            //Take the first selected file
            fd.append("file", Datafiles.files[0]);
            fd.append("clientID", $scope.other.ID);
            fd.append("docsType", $scope.other.docsType);

            $http.post(API_uploadClientDocs + $scope.other.ID + "/" + $scope.other.docsType + "/" + $scope.other.docName, fd, {
                withCredentials: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity
            })
                .success(function (data, status) {
                    swal("Success", "Document has been successfully uploaded !", "success");
                    $scope.isLoader = false;
                })
                .catch(function (response) {
                    $scope.isLoader = false;
                    swal("Success", "Document has been successfully uploaded !", "success");
                    //  $rootScope.UploadMessage = "File Uploaded Successfully";
                });
        }
        $scope.ExcelExport = function (event) {


            var input = event.target;
            var reader = new FileReader();
            reader.onload = function () {
                var fileData = reader.result;
                var wb = XLSX.read(fileData, { type: 'binary' });
                let tempRes = [];
                wb.SheetNames.forEach(function (sheetName) {
                    rowObj = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
                    rowObj = { [sheetName]: rowObj }
                    tempRes.push(rowObj);
                })
                console.log(tempRes)
                $scope.rooData.clientDash = JSON.stringify(tempRes);
            };
            reader.readAsBinaryString(input.files[0]);
        };
        $scope.addClienDashBoard = function (event) {
            let request = {
                "request": {
                    ClientID: $scope.addCard.ClientID,
                    ClientDash: $scope.rooData.clientDash
                }
            }
            var getClientDash = JobService.InsertClientDash.PostPromise(request);
            getClientDash.then(
                // OnSuccess function
                function (answer) {

                    if (answer.addClientDashboardResult.ResponseCode == 0) {
                        alert(answer.addClientDashboardResult.Result)

                    }

                },
                // OnFailure function
                function (reason) {

                }
            );
            // reader.readAsBinaryString(input.files[0]);
            // var Datafiles = document.getElementById("cardFilesDoc");
            // var url = "https://investorfundafile.blob.core.windows.net/investorfunda/auxBsXIs1gg_PJ8uMwPV1Qg_Copy of Inox Master May'18.xlsx";
            // var oReq = new XMLHttpRequest();
            // oReq.open("GET", url, true);
            // oReq.responseType = "arraybuffer";

            // oReq.onload = function (e) {
            //     var arraybuffer = oReq.response;

            //     /* convert data to binary string */
            //     var data = new Uint8Array(arraybuffer);
            //     var arr = new Array();
            //     for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            //     var bstr = arr.join("");

            //     /* Call XLSX */
            //     var workbook = XLSX.read(bstr, { type: "binary" });

            //     /* DO SOMETHING WITH workbook HERE */
            //     var first_sheet_name = workbook.SheetNames[0];
            //     /* Get worksheet */
            //     var worksheet = workbook.Sheets[first_sheet_name];
            //     console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
            // }

            // oReq.send();
        }

        $scope.addCardToCard = function () {
            $scope.cards.push({
                cardText: "",
                cardContent: ""
            })
        }

        $scope.deleteCardToCard = function (index) {
            $scope.cards.splice(index, 1);
        }

        $scope.docsType = [{
            "val": "NoOfEmployee",
            data: "No. of employees"
        },
        {
            "val": "Locations",
            data: "Locations"
        },
        {
            "val": "NoOfEmployeeCoveredInPF",
            data: "No. of employees covered in PF/ESIC"
        },
        {
            "val": "HealthReport",
            data: "Health Report"
        },
        {
            "val": "ExitsResigns",
            data: "Exits/Resigns"
        },
        {
            "val": "CLRAStatus",
            data: "CLRA Status"
        },
        {
            "val": " OpenPositionsShared",
            data: " Open positions shared"
        },
        {
            "val": "Joinees",
            data: "Joinees"
        },
        {
            "val": "Offers",
            data: "Offers"
        },
        {
            "val": "Invoices",
            data: "Invoices"
        }

        ]

        $scope.other = {
            ID: "",
            NoOfEmpl: "",
            Location: "",
            NoOfEmplPF_ESIC: "",
            HealthRpt: "",
            Exits: "",
            CLRA_Status: "",
            open_positions_share: "",
            Joinees: "",
            Invoices: "",
            Agreements_Dates: "",
            docsType: ''
        }

        $rootScope.dashboard_data = {
            start_count: '0',
            open_count: '0'
        }
        var getRmList = JobService.getRmList.getPromise($localStorage.userData.UR_ID);
        getRmList.then(
            // OnSuccess function
            function (answer) {

                if (answer.data.GetRelationshipManagerResult.ResponseCode == 0) {


                    $scope.getRelationshipManager = answer.data.GetRelationshipManagerResult.Result;
                    console.log($scope.getRelationshipManager)


                }

            },
            // OnFailure function
            function (reason) {

            }
        );
        if ($state.current.name === 'Index') {
            var getDashBoard = JobService.getDashBoard.getPromise($localStorage.userData.UR_ID, '1');
            getDashBoard.then(
                // OnSuccess function
                function (answer) {

                    if (answer.data.GetDashBoardResult.ResponseCode == 0) {

                        if (answer.data.GetDashBoardResult.Result.length > 0) {

                            $rootScope.dashboard_data.open_count = answer.data.GetDashBoardResult.Result[0].NoOfEscalaion;
                            $rootScope.dashboard_data.start_count = answer.data.GetDashBoardResult.Result[1].NoOfEscalaion;

                        } else {
                            $rootScope.dashboard_data = {
                                start_count: '0',
                                open_count: '0'
                            }
                        }


                    }

                },
                // OnFailure function
                function (reason) {

                }
            );
        }
        if ($state.current.name == 'agreement') {
            // $rootScope.addClient = null;
            // $scope.isLoader = true;

            var clientList = JobService.clientList.getPromise('0');
            clientList.then(
                // OnSuccess function
                function (answer) {

                    if (answer.data.GetclientListResult.ResponseCode == 0) {

                        $scope.isLoader = false;
                        $scope.clientlists = answer.data.GetclientListResult.Result;

                    } else {
                        $scope.ErrorMessage = answer.data.GetclientListResult.ResponseMessage;

                    }

                },
                // OnFailure function
                function (reason) {
                    swal("Error", "Some thing went wrong. Please try again !", "error");
                }
            );
        }
        $scope.other_submit = function () {
            $scope.isLoader = true;
            var postData = {
                "request": $scope.other
            }
            var AddOtherDetails = JobService.AddOtherDetails.PostPromise(postData);
            AddOtherDetails.then(
                // OnSuccess function
                function (answer) {
                    $scope.isLoader = false;
                    swal("Success", "Added others successfully !", "success");
                    if (answer.data.GetLocationResult.ResponseCode == 0) {


                        $rootScope.GetLocationResultLists = answer.data.GetLocationResult.Result;

                    } else {
                        $scope.ErrorMessage = answer.data.GetLocationResult.ResponseMessage;

                    }

                },
                // OnFailure function
                function (reason) {
                    swal("Error", "Some thing went wrong. Please try again !", "error");
                }
            );
        }
        if ($state.current.name === 'showIssue') {
            $scope.isLoader = true;
            var getissueList = JobService.getRmissueList.getPromise($localStorage.userData.UR_ID);
            getissueList.then(
                // OnSuccess function
                function (answer) {
                    $scope.isLoader = false;
                    if (answer.data.GetIssueViaRmListResult.ResponseCode == 0) {


                        $scope.IssueList = answer.data.GetIssueViaRmListResult.Result;

                    } else {
                        $scope.ErrorMessage = answer.data.GetIssueViaRmListResult.ResponseMessage;

                    }

                },
                // OnFailure function
                function (reason) {

                }
            );
        }

        $scope.updateIssueStatus = function (item, status, index) {
            $scope.isLoader = true;
            var UpdateIssueStatus = JobService.UpdateIssueStatus.PostPromise(item.IssueID, status, index);
            UpdateIssueStatus.then(
                // OnSuccess function
                function (answer) {

                    swal("Success", "Status updated successfully  !", "success");
                    $scope.isLoader = false;
                    $scope.IssueList[index].IssuState = status;

                },
                // OnFailure function
                function (reason) {

                }
            );
        }
        if ($state.current.name === 'addCard') {
            var clientList = JobService.clientList.getPromise('0');
            clientList.then(
                // OnSuccess function
                function (answer) {

                    if (answer.data.GetclientListResult.ResponseCode == 0) {


                        $scope.clientlists = answer.data.GetclientListResult.Result;

                    } else {
                        $scope.ErrorMessage = answer.data.GetclientListResult.ResponseMessage;

                    }

                },
                // OnFailure function
                function (reason) {
                    swal("Error", "Some thing went wrong. Please try again !", "error");
                }
            );




        }

        $rootScope.getCards = function () {

            var getClientCard = JobService.getClientCard.getPromise($scope.addCard.ClientID);
            getClientCard.then(
                // OnSuccess function
                function (answer) {

                    if (answer.data.GetCardClientResult.ResponseCode == 0) {

                        $scope.cards = [];


                        if (answer.data.GetCardClientResult.Result.length == 0) {
                            $scope.cards = [{
                                cardText: "",
                                cardContent: ""
                            }]
                        } else {
                            $scope.cards = JSON.parse(answer.data.GetCardClientResult.Result[0].Text1);
                        }



                    } else {
                        $scope.ErrorMessage = answer.data.GetCompanyResult.ResponseMessage;

                    }

                },
                // OnFailure function
                function (reason) {

                }
            );
        }
        $scope.showIssueDetails = function (item) {
            $scope.issueDetails = item;
        }
        $rootScope.Logout = function () {

            window.location.href = '/Index.html';
            localStorage.clear();
            //window.open("/Index.html")
        }
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


        $scope.addCardsId = {
            ClientID: ''
        }
        $scope.addCard = {
            ClientID: '',
            Label1: '',
            Label2: '',
            Label3: '',
            Label4: '',
            Text1: '',
            Text2: '',
            Text3: '',
            Text4: '',
        }



        $scope.addCardClient = function () {

            $scope.addCard.Text1 = JSON.stringify($scope.cards)

            var postData = {
                "request": $scope.addCard
            }
            var addClient = JobService.addCardClient.PostPromise(postData);
            addClient.then(
                // OnSuccess function
                function (answer) {
                    $scope.isLoader = false;
                    swal("Success", "Added Card successfully !", "success");


                },
                // OnFailure function
                function (reason) {
                    swal("Error", "Some thing went wrong. Please try again !", "error");
                }
            );

        }
        $scope.SubmitJob = function () {
            $scope.isLoader = true;
            // $scope.testSkills = [];
            // for (var i = 0; i < $rootScope.job.SkillsList.length; i++) {
            //     $scope.testSkills.push({
            //         "Assort_skillID": $rootScope.job.SkillsList[i]
            //     });

            // }

            // console.log($scope.testSkills);
            // console.log($rootScope.job);
            // delete $rootScope.job.SkillsList;
            // $rootScope.job.SkillsList = [{ Assort_skillID: "2" }];
            delete $rootScope.job.educationID;


            $rootScope.job.IsPostedByClient = null;
            // $rootScope.job.LocationID = $rootScope.job.LocationID.join(',');
            console.log($rootScope.job);
            var postData = {
                "request": $rootScope.job
            }
            var createJob = JobService.createJob.PostPromise(postData);
            createJob.then(
                // OnSuccess function
                function (answer) {
                    $scope.isLoader = false;
                    swal("Success", "job posted successfully !", "success");
                    if (answer.data.GetLocationResult.ResponseCode == 0) {


                        $rootScope.GetLocationResultLists = answer.data.GetLocationResult.Result;

                    } else {
                        $scope.ErrorMessage = answer.data.GetLocationResult.ResponseMessage;

                    }

                },
                // OnFailure function
                function (reason) {
                    swal("Error", "Some thing went wrong. Please try again !", "error");
                }
            );

        }



    }
]);