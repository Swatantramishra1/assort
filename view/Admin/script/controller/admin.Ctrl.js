app.controller('CommonCtrl', ['$scope', '$rootScope', '$localStorage', '$timeout', '$interval', '$filter', '$state', 'JobService', '$http', 'textAngularManager',
    function ($scope, $rootScope, $localStorage, $timeout, $interval, $filter, $state, JobService, $http, textAngularManager) {
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
        let stringData;
        $scope.news = {
            newsDate: '',
            newsHeading: '',
            newsImgae: '',
            newsDisc: ''
        }
        $rootScope.orightml = '<h2>Try me!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><img class="ta-insert-video" ta-insert-video="http://www.youtube.com/embed/2maA1-mvicY" src="" allowfullscreen="true" width="300" frameborder="0" height="250"/></p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li>Super Easy <b>Theming</b> Options</li><li style="color: green;">Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li class="text-danger">Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE9+</li></ol><p><b>Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a> </p><h4>Supports non-latin Characters</h4><p>昮朐 魡 燚璒瘭 譾躒鑅, 皾籈譧 紵脭脧 逯郹酟 煃 瑐瑍, 踆跾踄 趡趛踠 顣飁 廞 熥獘 豥 蔰蝯蝺 廦廥彋 蕍蕧螛 溹溦 幨懅憴 妎岓岕 緁, 滍 蘹蠮 蟷蠉蟼 鱐鱍鱕, 阰刲 鞮鞢騉 烳牼翐 魡 骱 銇韎餀 媓幁惁 嵉愊惵 蛶觢, 犝獫 嶵嶯幯 縓罃蔾 魵 踄 罃蔾 獿譿躐 峷敊浭, 媓幁 黐曮禷 椵楘溍 輗 漀 摲摓 墐墆墏 捃挸栚 蛣袹跜, 岓岕 溿 斶檎檦 匢奾灱 逜郰傃</p>';
        function readFile() {

            if (this.files && this.files[0]) {

                var FR = new FileReader();

                FR.addEventListener("load", function (e) {
                    // document.getElementById("img").src       = e.target.result;
                    stringData = e.target.result;
                    // console.log(stringData);
                    document.getElementById("newsImgSelected").src = stringData;
                });

                FR.readAsDataURL(this.files[0]);
            }

        }
        try {
            document.getElementById("img_news").addEventListener("change", readFile);
        } catch (e) {

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


        $scope.getClient = function () {

            var getOtherDetails = JobService.getOtherDetails.getPromise($scope.other.ID);
            getOtherDetails.then(
                // OnSuccess function
                function (answer) {

                    if (answer.data.GetOtherDetailsResult.ResponseCode == 0) {

                        if (answer.data.GetOtherDetailsResult.Result.length > 0)
                            $scope.other = answer.data.GetOtherDetailsResult.Result[0];
                        else {
                            $scope.other = {
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
                function (reason) {
                    swal("Error", "Some thing went wrong. Please try again !", "error");
                }
            );
        }
        if ($state.current.name == 'agreement') {
            $rootScope.addClient = null;
            $scope.isLoader = true;
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



        if ($state.current.name == "Addjob") {
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
        if ($state.current.name == "AddSkill") {
            var getSkillsCategoryList = JobService.getSkillsCategory.getPromise();
            getSkillsCategoryList.then(
                // OnSuccess function
                function (answer) {

                    if (answer.data.GetSkillsCategoryResult.ResponseCode == 0) {


                        $rootScope.getSkillsCategoryLists = answer.data.GetSkillsCategoryResult.Result;

                    } else {
                        $scope.ErrorMessage = answer.data.GetSkillsCategoryResult.ResponseMessage;

                    }

                },
                // OnFailure function
                function (reason) {
                    swal("Error", "Some thing went wrong. Please try again !", "error");
                }
            );
        }
        $scope.deleteRM = function (item, index) {

            var result = confirm("Want to delete rm?");
            if (result) {
                var deleteRM = JobService.deleteRm.deletePromise(item.Assort_ClientContactID);
                deleteRM.then(
                    // OnSuccess function
                    function (answer) {

                        if (answer.data.deleteRMResult.ResponseCode == "0") {

                            $scope.getRelationshipManager.splice(index, 1);
                            swal("Success", "RM deleted successfully !", "success");

                        }

                    },
                    // OnFailure function
                    function (reason) { }
                );
            }



        }

        $scope.ShowRelationShip = function (item) {
            $scope.RmShowDetails = item;
            $scope.addRelationship = item;
        }
        $scope.addLocation = {
            LocationName: ""
        }
        $scope.add = {
            addIndustry: {
                Name: ""
            },
            addSkillCategory: {
                Name: ""
            },
            addSkillName: {
                Name: "",
                SkillCategoryID: ""
            }
        }

        $scope.addCompany = {
            CompanyName: "",
            CompanyHeadQuarter: "",
            CEO: "",
            PhoneNumber: ""
        }
        $scope.numberExp = 20;
        $scope.getNumberAsArray = function (number) {
            return new Array(number);
        }
        $scope.Skillsselected = [];
        $scope.$watch('Skillsselected', function (nowSelected) {
            $scope.job.SkillsList = [];

            if (!nowSelected) {
                return;
            }
            angular.forEach(nowSelected, function (val) {
                $scope.job.SkillsList.push({ "Assort_skillID": val.Assort_skillID.toString() });
            });
        });

        if (($state.current.name === 'Index' || $state.current.name === 'Addjob') || ($state.current.name === 'showJobAppliedCand')) {
            var getJobList = JobService.getJobList.getPromise();
            getJobList.then(
                // OnSuccess function
                function (answer) {

                    $rootScope.joblists = answer.data.GetJobListResult.Result.JobLists;
                    if (answer.data.GetJobListResult.ResponseCode == 0) {


                        $rootScope.joblists = answer.data.GetJobListResult.Result.JobLists;


                    } else {
                        $scope.ErrorMessage = answer.data.GetLoginResult.ResponseMessage;

                    }

                },
                // OnFailure function
                function (reason) {
                    swal("Error", "Some thing went wrong. Please try again !", "error");
                }
            );
            var getAppliedJobJobList = JobService.getAppliedJobListByID.getPromise('0');
            getAppliedJobJobList.then(
                // OnSuccess function
                function (answer) {

                    $scope.appliedjoblists = answer.data.GetAppliedJobListByIDResult.Result.getAppliedJobs;

                    for (var a = 0; a < $scope.appliedjoblists.length; a++) {
                        $scope.appliedjoblists[a].isHide = true;
                    }
                    // if (answer.data.GetAppliedJobListByIDResult.ResponseCode == 0) {




                    // } else {
                    //     $scope.ErrorMessage = answer.data.GetAppliedJobListByIDResult.ResponseMessage;

                    // }
                    $scope.getTotalRegistration = answer.data.GetAppliedJobListByIDResult.Result.getTotalRegistration[0].TotalRegistration;
                    $scope.getTotalJob = answer.data.GetAppliedJobListByIDResult.Result.getTotalJobs[0].TotalAppliedJob;
                },
                // OnFailure function
                function (reason) {
                    swal("Error", "Some thing went wrong. Please try again !", "error");
                }
            );

            var getJobLocationList = JobService.getJobLocation.getPromise();
            getJobLocationList.then(
                // OnSuccess function
                function (answer) {

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
            var getSkillsCategoryList = JobService.getSkillsCategory.getPromise();
            getSkillsCategoryList.then(
                // OnSuccess function
                function (answer) {

                    if (answer.data.GetSkillsCategoryResult.ResponseCode == 0) {


                        $rootScope.getSkillsCategoryLists = answer.data.GetSkillsCategoryResult.Result;

                    } else {
                        $scope.ErrorMessage = answer.data.GetSkillsCategoryResult.ResponseMessage;

                    }

                },
                // OnFailure function
                function (reason) {
                    swal("Error", "Some thing went wrong. Please try again !", "error");
                }
            );
            var getCompanyList = JobService.getCompanyList.getPromise();
            getCompanyList.then(
                // OnSuccess function
                function (answer) {

                    if (answer.data.GetCompanyResult.ResponseCode == 0) {


                        $rootScope.getCompanyLists = answer.data.GetCompanyResult.Result;

                    } else {
                        $scope.ErrorMessage = answer.data.GetCompanyResult.ResponseMessage;

                    }

                },
                // OnFailure function
                function (reason) {
                    swal("Error", "Some thing went wrong. Please try again !", "error");
                }
            );
            var getSkillsNameList = JobService.getSkillsName.getPromise();
            getSkillsNameList.then(
                // OnSuccess function
                function (answer) {

                    if (answer.data.GetSkillsNameResult.ResponseCode == 0) {



                        $rootScope.getSkillsNameLists = answer.data.GetSkillsNameResult.Result;

                    } else {
                        $scope.ErrorMessage = answer.data.GetSkillsNameResult.ResponseMessage;

                    }

                },
                // OnFailure function
                function (reason) {
                    swal("Error", "Some thing went wrong. Please try again !", "error");
                }
            );
            var getIndustryList = JobService.getIndustryList.getPromise();
            getIndustryList.then(
                // OnSuccess function
                function (answer) {

                    if (answer.data.GetIndustryListResult.ResponseCode == 0) {


                        $rootScope.getIndustryLists = answer.data.GetIndustryListResult.Result;

                    } else {
                        $scope.ErrorMessage = answer.data.GetIndustryListResult.ResponseMessage;

                    }

                },
                // OnFailure function
                function (reason) {
                    swal("Error", "Some thing went wrong. Please try again !", "error");
                }
            );
        }


        if (($state.current.name === 'ShowRm') || ($state.current.name === 'AddClients')) {
            var getRmList = JobService.getRmList.getPromise('0');
            getRmList.then(
                // OnSuccess function
                function (answer) {

                    if (answer.data.GetRelationshipManagerResult.ResponseCode == 0) {


                        $scope.getRelationshipManager = answer.data.GetRelationshipManagerResult.Result;



                    }

                },
                // OnFailure function
                function (reason) {
                    swal("Error", "Some thing went wrong. Please try again !", "error");
                }
            );
        }



        $scope.selectedObj = {};
        $scope.nationalities = [{
            "NATIONALITY_ID": 1,
            "description": "Afghan"
        },
        {
            "NATIONALITY_ID": 2,
            "description": "Andorran"
        },
        {
            "NATIONALITY_ID": 3,
            "description": "Botswanan"
        },
        {
            "NATIONALITY_ID": 4,
            "description": "Brazilian"
        },
        {
            "NATIONALITY_ID": 5,
            "description": "Canadian"
        },
        {
            "NATIONALITY_ID": 6,
            "description": "Cypriot"
        }
        ];
        console.log('test')
        $scope.ShowJddd = function () {
            console.log($scope.selectedObj);
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
            $rootScope.job.LocationID = $rootScope.job.LocationID.join(',');
            $rootScope.job.SkillsList = $rootScope.job.SkillsList.join(',');
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
        $scope.submitAddNewsData = function () {
            $scope.isLoader = true;
            $scope.news.newsImgae = stringData;
            var postData = {
                "request": $scope.news
            }
            var newsMedia = JobService.addNewsAndMedia.PostPromise(postData);
            newsMedia.then(
                // OnSuccess function
                function (answer) {
                    $scope.isLoader = false;
                    swal("Success", "news posted successfully !", "success");
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

        $scope.SubmitLocation = function () {
            $scope.isLoader = true;
            var postData = {
                "request": $scope.addLocation
            }
            var addLocation = JobService.addLocation.PostPromise(postData);
            addLocation.then(
                // OnSuccess function
                function (answer) {
                    $scope.isLoader = false;
                    swal("Success", "Location added successfully !", "success");
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

        $scope.SubmitIndustry = function () {
            $scope.isLoader = true;
            var postData = {
                "request": $scope.add.addIndustry
            }
            var addIndustry = JobService.addIndustry.PostPromise(postData);
            addIndustry.then(
                // OnSuccess function
                function (answer) {
                    $scope.isLoader = false;
                    $scope.add.addIndustry.Name = "";
                    swal("Success", "Industry added successfully !", "success");
                    if (answer.AddIndustryResult.ResponseCode == 0) {
                        swal("Success", "Industry added successfully !", "success");
                    } else {
                        swal("Error", "Some thing went wrong. Please try again !", "error");
                    }

                },
                // OnFailure function
                function (reason) {
                    swal("Error", "Some thing went wrong. Please try again !", "error");
                }
            );
        }

        $scope.SubmitSkillCategoryName = function () {
            $scope.isLoader = true;
            var postData = {
                "request": $scope.add.addSkillCategory
            }
            var addSkillCategoryName = JobService.addSkillCategoryName.PostPromise(postData);
            addSkillCategoryName.then(
                // OnSuccess function
                function (answer) {
                    $scope.isLoader = false;
                    if (answer.AddSkillCategoryNameResult.ResponseCode == 0) {
                        swal("Success", "Skill Category added successfully !", "success");
                    } else {
                        swal("Error", "Some thing went wrong. Please try again !", "error");
                    }

                },
                // OnFailure function
                function (reason) {
                    swal("Error", "Some thing went wrong. Please try again !", "error");
                }
            );
        }

        $scope.SubmitSkillName = function () {
            $scope.isLoader = true;
            var postData = {
                "request": $scope.add.addSkillName
            }
            var addSkillName = JobService.addSkillName.PostPromise(postData);
            addSkillName.then(
                // OnSuccess function
                function (answer) {
                    $scope.isLoader = false;
                    if (answer.AddSkillNameResult.ResponseCode == 0) {
                        swal("Success", "Skill added successfully !", "success");

                    } else {
                        swal("Error", "Some thing went wrong. Please try again !", "error");
                    }

                },
                // OnFailure function
                function (reason) {
                    swal("Error", "Some thing went wrong. Please try again !", "error");
                }
            );
        }

        $scope.SubmitAddRM = function () {
            $scope.isLoader = true;
            var postData = {
                "request": $scope.addRelationship
            }
            var addRM = JobService.addRM.PostPromise(postData);
            addRM.then(
                // OnSuccess function
                function (answer) {
                    $scope.isLoader = false;

                    swal("Success", answer.AddRelationshipManagerResult.Result, "success");
                    if (answer.AddRelationshipManagerResult.ResponseCode == 0) {


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
        $scope.SubmitCompany = function () {
            $scope.isLoader = true;
            var postData = {
                "request": $scope.addCompany
            }
            var addCompany = JobService.addCompany.PostPromise(postData);
            addCompany.then(
                // OnSuccess function
                function (answer) {

                    swal("Success", "Company added successfully !", "success");
                    if (answer.data.GetLocationResult.ResponseCode == 0) {

                        $scope.isLoader = false;
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

        $scope.showjobs = function (joblist) {

            var Industryindex = $rootScope.getIndustryLists.map((cur, ind) => { if (cur.JobID == joblist.jobID) return ind }).filter((item) => {
                return item != undefined
            })
            var Locationindex = $rootScope.GetLocationResultLists.map((cur, ind) => { if (cur.JobID == joblist.jobID) return ind }).filter((item) => {
                return item != undefined
            })
            var Skillsindex = $rootScope.getSkillsCategoryLists.map((cur, ind) => { if (cur.JobID == joblist.jobID) return ind }).filter((item) => {
                return item != undefined
            })

            console.log("new id", joblist);
            $rootScope.job = joblist;
            $rootScope.job.JobID = joblist.JobID;


            $rootScope.job.IndustryID = $rootScope.getIndustryLists[Industryindex[0]].IndustryID;
            $rootScope.job.LocationID = $rootScope.GetLocationResultLists[Locationindex[0]].LocationID;
            console.log($scope.job);
            $state.go('Addjob');
            $localStorage.forEditStatus = true;
        }

        $scope.deleteJob = function (jobItem, index) {
            var deleteJob = JobService.deleteJob.getPromise(jobItem.JobID);
            deleteJob.then(
                // OnSuccess function
                function (answer) {
                    swal("Success", "Job deleted successfully !", "success");

                    $rootScope.joblists.splice(index, 1);

                },
                // OnFailure function
                function (reason) {
                    swal("Error", "Some thing went wrong. Please try again !", "error");
                }
            );
        }
        $rootScope.Logout = function () {

            window.location.href = '/Index.html';
            //window.open("/Index.html")
        }

        if ($state.current.name == 'UserDetails') {
            $scope.isLoader = false;
            var getUserList = JobService.getUserList.getPromise();
            getUserList.then(
                // OnSuccess function
                function (answer) {

                    if (answer.data.GetUserListResult.ResponseCode == 0) {

                        $scope.isLoader = true;
                        $scope.userLists = answer.data.GetUserListResult.Result;

                    } else {
                        $scope.ErrorMessage = answer.data.GetUserListResult.ResponseMessage;

                    }

                },
                // OnFailure function
                function (reason) {
                    swal("Error", "Some thing went wrong. Please try again !", "error");
                }
            );
        }

        var indx = [];
        var isHideIndx = [];
        $scope.selectCondi = function (item, indexisHide) {
            var index = indx.findIndex(x => x.JobID == item.JobID);
            console.log("test", index);
            if (index == '-1') {
                isHideIndx.push(indexisHide);
                indx.push({
                    "JobID": item.JobID,
                    "CandidateID": item.CandidateID
                });
            } else {
                indx.splice(index, 1);
                isHideIndx.splice(isHideIndx.indexOf(indexisHide), 1);
            }

            console.log(indx);
        }


        $scope.selectShortCondi = function (item) {
            $scope.isLoader = true;
            var getUserDetailsByID = JobService.getUserDetailsByID.getPromise(item.CandidateID);
            getUserDetailsByID.then(
                // OnSuccess function
                function (answer) {
                    $scope.isLoader = false;
                    $rootScope.user_Details = answer.data.GetUserDetailsByIDResult.Result
                },
                // OnFailure function
                function (reason) {
                    swal("Error", "Some thing went wrong. Please try again !", "error");
                }
            );
        }
        $scope.InsertShortLited = function () {
            $scope.isLoader = true;
            var postData = {
                "ShortlistedCandidate": indx
            }
            var addShortListedCand = JobService.AddShortListedCand.PostPromise(postData);
            addShortListedCand.then(
                // OnSuccess function
                function (answer) {
                    indx = [];
                    for (var a = 0; a < isHideIndx.length; a++) {
                        $scope.appliedjoblists[a].isHide = false;
                    }
                    $scope.isLoader = false;
                    swal("Success", "successfully !", "success");
                    location.reload();

                },
                // OnFailure function
                function (reason) {
                    swal("Error", "Some thing went wrong. Please try again !", "error");
                }
            );
        }
        if ($state.current.url == '/showIssue' || $state.current.name == 'showIssue') {
            var getRmissueList = JobService.getRmissueList.getPromise('0');
            getRmissueList.then(
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
                    swal("Error", "Some thing went wrong. Please try again !", "error");
                }
            );
        }
        $scope.showIssueDetails = function (item) {
            $scope.issueDetails = item;
            $scope.issueReply = [];
            var postData = {
                "request": {
                    EmailID: item.EmailID
                }
            }
            var GetIssueRep = JobService.GetIssueRep.PostPromise(postData);
            GetIssueRep.then(
                // OnSuccess function
                function (answer) {


                    if (answer.GetIssueRepResult.ResponseCode == 0) {

                        $scope.isLoader = false;
                        $scope.issueReply = answer.GetIssueRepResult.Result;

                    } else {
                        $scope.ErrorMessage = answer.GetIssueRepResult.ResponseMessage;

                    }

                },
                // OnFailure function
                function (reason) {
                    swal("Error", "Some thing went wrong. Please try again !", "error");
                }
            );

        }
        if ($state.current.name == 'showShortlistedJob') {
            $scope.isLoader = false;
            var showShortlistedCand = JobService.getShortlitedCandidateList.getPromise();
            showShortlistedCand.then(
                // OnSuccess function
                function (answer) {

                    if (answer.data.ShortlitedCandidateListResult.ResponseCode == 0) {

                        $scope.isLoader = true;
                        $scope.GetshowShortlistedCand = answer.data.ShortlitedCandidateListResult.Result;

                    } else {
                        $scope.ErrorMessage = answer.data.ShortlitedCandidateListResult.ResponseMessage;

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