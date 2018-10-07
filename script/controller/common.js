app.controller('CommonCtrl', ['$scope', '$rootScope', '$localStorage', '$timeout', '$interval', '$filter', '$state', 'ULoginService', 'JobService', '$sce',
    function($scope, $rootScope, $localStorage, $timeout, $interval, $filter, $state, ULoginService, JobService, $sce) {



        $rootScope.aboutUs = ` Assort Staffing, a multinational top-tier HR and recruitment company commenced it's operations in the year 2016. Assort specialises across wide variety of services, catering to all sectors and covering all functions. We are an integrated HR services company
        providing services like Direct Hire Solutions, Flexi Staffing, Payroll Process Outsourcing and RPO.`
        $scope.Timer = null;
        $scope.redirectPage = 'Index';
        $scope.slidesIndex = [
            '../../img/client/5 PAISA.jpg',
            '../../img/client/AEGON.jpg',
            '../../img/client/AJE.jpg',
            '../../img/client/INOX.jpg',
            '../../img/client/J M BAXI.jpg',
            '../../img/client/PROMAS.jpg',
            '../../img/client/RR KABEL.jpg',
            '../../img/client/STORE INDYA.jpg',
            '../../img/client/TUV.jpg',
            '../../img/client/UBM.jpg',
            '../../img/client/bitwise.jpg',
            '../../img/client/SYNCH.jpg',
            '../../img/client/tieto.jpg',
            '../../img/client/ECOM EXPRESS.jpg'
        ];
        $scope.slidesMiddle = [
            '../../img/client/middleEast/DESSERT GROUP M.jpg',
            '../../img/client/middleEast/khatim.jpg',
            '../../img/client/middleEast/MTMMM.jpg',
            '../../img/client/middleEast/NBHH.jpg'
        ];


        if ($state.current.name == "Job") {
            // $rootScope.jobSearch.title +
            $scope.search = $rootScope.jobSearch.location + $rootScope.jobSearch.experience;
        } else {
            $rootScope.jobSearch = {
                title: "",
                location: "",
                experience: ""
            }
        }
        $rootScope.showOptionOfheader = function() {
            if ($(".firstRow").hasClass('AddMargin')) {
                $(".firstRow").removeClass("AddMargin");
            } else {
                $(".firstRow").addClass("AddMargin");
            }

        };

        $rootScope.redirectClick = function(From) {
            if (From === "USA") {
                window.location.href = "http://www.radfordglobalus.com"
                    //window.location.assign("http://www.radfordglobalus.com");
            } else {
                $scope.redirectPage = From;
                if (From == "Index") {
                    $rootScope.aboutUs = ` Assort Staffing, a multinational top-tier HR and recruitment company commenced it's operations in the year 2016. Assort specialises across wide variety of services, catering to all sectors and covering all functions. We are an integrated HR services company
                    providing services like Direct Hire Solutions, Flexi Staffing, Payroll Process Outsourcing and RPO.`
                    $scope.slidesIndex = [
                        '../../img/client/5 PAISA.jpg',
                        '../../img/client/AEGON.jpg',
                        '../../img/client/AJE.jpg',
                        '../../img/client/INOX.jpg',
                        '../../img/client/J M BAXI.jpg',
                        '../../img/client/PROMAS.jpg',
                        '../../img/client/RR KABEL.jpg',
                        '../../img/client/STORE INDYA.jpg',
                        '../../img/client/TUV.jpg',
                        '../../img/client/UBM.jpg',
                        '../../img/client/bitwise.jpg',
                        '../../img/client/SYNCH.jpg',
                        '../../img/client/tieto.jpg',
                        '../../img/client/ECOM EXPRESS.jpg'
                    ];
                } else {
                    $rootScope.aboutUs = `Assort Staffing provides one-stop solutions for all the human capital needs to the industry.

                    We have proved our mettle by showcasing our proficient services coupled with diverse experience and thorough understanding of the core industry, to maintain our leadership and provide top-notch solutions in this super evolutionary environment, we maintain a strong mechanism for monitoring and forecasting the trends in the UAE market, enabling our clients to get the best of the talents and solutions.
                    
                    Assort Staffing covers all the sectors and domains, predominantly focusing on the industries like Oil and Gas, Automobile, Construction, HVAC and Hospitality.
                    
                    Our cumulative experience of 80 years in the Human Resource sector has helped us leverage our key resources, thereby accomplishing successful and effective delivering of niche talents from top to the bottom of the hierarchy.
                    
                    We are the trustworthy and reliable partners of more than 50 international clients across UAE, thus propelling us with more vigour to expand our horizon and excel in our sphere.`
                    $scope.slidesIndex = [
                        '../../img/client/middleEast/DESSERT GROUP M.jpg',
                        '../../img/client/middleEast/khatim.jpg',
                        '../../img/client/middleEast/MTMMM.jpg',
                        '../../img/client/middleEast/NBHH.jpg'
                    ];
                }
                $('.flexslider').flexslider({
                    animation: "slide",
                    animationLoop: true,
                    itemWidth: 210,
                    itemMargin: 5,
                    pauseOnAction: true, // default setting
                    after: function(slider) {
                        /* auto-restart player if paused after action */
                        if (!slider.playing) {
                            slider.play();
                        }
                    }
                });
                $state.go("Index");
                $localStorage.SetFrom = From;
                $('#myModal').modal('hide');
            }


            $scope.StopTimer();


        };

        $scope.check = function() {
            $rootScope.redirectClick($scope.redirectPage)

        }

        $scope.StartTimer = function() {
            //Set the Timer start message.
            $scope.Message = "Timer started. ";
            var count = 0;
            $scope.Timer = $interval(function() {
                count = count + 1;
                $rootScope.Message = count;
                if (count == 15) {
                    $rootScope.redirectClick('INDIA');
                }

            }, 1000);
        };

        //Timer stop function.
        $scope.StopTimer = function() {

            //Set the Timer stop message.
            $scope.Message = "Timer stopped.";

            //Cancel the Timer.
            if (angular.isDefined($scope.Timer)) {
                $interval.cancel($scope.Timer);
            }
        };

        if ($localStorage.SetFrom === undefined || $localStorage.SetFrom === "") {
            $scope.StartTimer();
            $('#myModal').modal('show');
        };




        if ($state.current.name == "Job") {

            var getJobList = JobService.getJobList.getPromise();
            getJobList.then(
                // OnSuccess function
                function(answer) {

                    if (answer.data.GetJobListResult.ResponseCode == 0) {


                        $scope.joblists = answer.data.GetJobListResult.Result.JobLists;
                        $scope.joblistsByAll = answer.data.GetJobListResult.Result.JobLists;

                        $scope.globaljobList = $.extend(true, [], answer.data.GetJobListResult.Result.JobLists);
                        $scope.jobLocationlists = $.extend(true, [], answer.data.GetJobListResult.Result.LocationLists);
                        $scope.jobSkillslists = answer.data.GetJobListResult.Result.SkillsLists;
                        $scope.jobIndustrylists = answer.data.GetJobListResult.Result.IndustryLists;
                        $scope.jobLocationFiter();
                    } else {
                        $scope.ErrorMessage = answer.data.GetLoginResult.ResponseMessage;

                    }


                },
                // OnFailure function
                function(reason) {

                }
            )
        }
        var taketempArray = [];
        $scope.jobFilterView = function(Name) {
            if (taketempArray.indexOf(Name) == -1) {
                taketempArray.push(Name);
            } else {
                taketempArray.splice(taketempArray.indexOf(Name), 1);
            }
            let result = removeDuplicates($scope.jobLocationlists, "Name");
            $scope.TempjobList = [];
            $scope.joblists = [];
            for (let i = 0; i < taketempArray.length; i++) {
                var ID = result.map(function(obj, indx) {
                    if (obj.Name == taketempArray[i])
                        return obj.LocationID
                })
                ID = ID.filter(function(elm) {
                    return elm !== undefined;
                });
                $scope.TempjobList = $scope.globaljobList.map(function(task, index, array) {

                    if (task.LocationID == ID[0])
                        return task;


                });

                $scope.TempjobList = $scope.TempjobList.filter(function(elm) {
                    return elm !== undefined;
                });
                $scope.TempjobList.forEach(function(obj) {
                    $scope.joblists.push(obj);
                })
                $scope.joblists = removeDuplicates($scope.joblists, "JobID");
            }
            if ($scope.joblists.length === 0) {
                $scope.joblists = $scope.globaljobList;
            }


        }

        $scope.jobLocationFiter = function() {
            let itemss = {};
            let filterIsDelete = $scope.joblists.filter((data => data.IsDelete == "False"));
            _.uniq(filterIsDelete.map((data => data.Job_Location))).filter((data => data != "" && isNaN(data))).forEach(function(data) {
                console.log(data)
                let item = data.split(',');
                item.forEach(function(val) {
                    itemss[val] = 0;
                })

            })
            $scope.tempLocationFilter = Object.keys(itemss).filter((data => data != "" && isNaN(data)))
                // var jobListLocation_copy = $.extend(true, [], $scope.joblists);
                // $scope.tempLocationFilter = {};
                // var storeTempJobLocation = {};
                // jobListLocation_copy.forEach(function(obj) {
                //     var key = obj.LocationID;
                //     storeTempJobLocation[key] = (storeTempJobLocation[key] || 0) + 1
                // });
                // var getAllKeys = Object.keys(storeTempJobLocation);
                // // var result = _.uniq($scope.jobLocationlists, 'Name');
                // var result = removeDuplicates($scope.jobLocationlists, "Name");
                // for (var key in storeTempJobLocation) {
                //     if (storeTempJobLocation.hasOwnProperty(key)) {
                //         result.forEach(function(obj) {
                //                 if (obj.LocationID == key) {
                //                     $scope.tempLocationFilter[obj.Name] = storeTempJobLocation[key];
                //                 }
                //             })
                //             // console.log(key + " -> " + p[key]);
                //     }
                // }
                // console.log($scope.tempLocationFilter)
                // Object.keys(obj)
        }

        function removeDuplicates(originalArray, prop) {
            var newArray = [];
            var lookupObject = {};

            for (var i in originalArray) {
                lookupObject[originalArray[i][prop]] = originalArray[i];
            }

            for (i in lookupObject) {
                newArray.push(lookupObject[i]);
            }
            return newArray;
        }
        $scope.showJobView = function(JobID) {
            $localStorage.jobViewID = JobID;
            $state.go("Job/View");
        }

        if ($state.current.name == "Job/View") {

            var askForPromise = JobService.getJobListByID.getPromise($localStorage.jobViewID);
            askForPromise.then(
                // OnSuccess function
                function(answer) {

                    if (answer.data.GetJobListByIDResult.ResponseCode == 0) {

                        $rootScope.jobDetailsInfo = answer.data.GetJobListByIDResult.Result;
                        console.log($rootScope.jobDetailsInfo);
                        var htmltext = $rootScope.jobDetailsInfo.JobLists[0].Job_Description;
                        $('#jobContent').html(htmltext);


                    } else {
                        $scope.ErrorMessage = answer.data.GetLoginResult.ResponseMessage;

                    }


                },
                // OnFailure function
                function(reason) {

                    $scope.ErrorMessage = answer.data.GetLoginResult.ResponseMessage;
                    //$scope.somethingWrong = reason;
                    //$scope.error = true;
                }
            )
        }


        $scope.apply = function() {
            console.log('pull', $localStorage.LoginStatusLocal);

            if ($localStorage.LoginStatusLocal) {

                var ApplyJob = JobService.ApplyJob.PostPromise($localStorage.userData.UR_ID, $rootScope.jobDetailsInfo.JobLists[0].JobID);
                ApplyJob.then(
                    // OnSuccess function
                    function(answer) {

                        if (answer.ApplyJobResult.ResponseCode == 0) {
                            alert(answer.ApplyJobResult.ResponseMessage);

                        } else {
                            alert(answer.ApplyJobResult.ResponseMessage);

                        }
                        $rootScope.LoginStatus = true;
                    },
                    // OnFailure function
                    function(reason) {

                    }
                )
            } else {
                $localStorage.JobApplyStatus = true;
                $localStorage.CurrentStatusOfPage = 'Job/View';
                $state.go('LoginRes', { 'from': 'JobApply' });
            }
        };

        // Onload check jobApply

        if ($localStorage.JobApplyStatus) {
            $scope.apply();
            $localStorage.JobApplyStatus = false;
        }



        $scope.autoCompleteOptions = {
            minimumChars: 1,
            dropdownWidth: '500px',
            dropdownHeight: '200px',
            data: function(term) {
                return $http.get(API_GetJobAutoComplete + "/" + term + "/0")
                    .then(function(response) {
                        // ideally filtering should be done on the server
                        console.log('data', response.data)
                        return response.data
                    });
            },
            renderItem: function(item) {
                return {
                    value: item.name,
                    label: $sce.trustAsHtml("<p class='auto-complete'>" + item.name + "</p>")
                };
            },
            itemSelected: function(e) {
                that.airport = e.item;
            }
        };

    }
]);