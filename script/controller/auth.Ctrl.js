app.controller('AuthCtrl', ['$scope', '$rootScope', '$localStorage', '$timeout', '$interval', '$filter', '$state', 'ULoginService', 'JobService', '$sce', '$http',
    function($scope, $rootScope, $localStorage, $timeout, $interval, $filter, $state, ULoginService, JobService, $sce, $http) {
        $scope.UType = '0';
        $scope.Login = {
            login: true,
            Registration: false,
            ForgotPassword: false
        };
        $scope.Forgot = {
            IsSendEmail: false,
            IsSendOtp: false,
            IsSendEmailBtn: false
        }
        $scope.Login.login = true;
        $scope.showRegistration = function() {
            $scope.Login = {
                login: false,
                Registration: true,
                ForgotPassword: false
            };
            $scope.Register.otpReg = false;
            // $scope.sendedOTP = true;
        };
        $scope.showLogin = function() {
            $scope.Login = {
                login: true,
                Registration: false,
                ForgotPassword: false
            };
        };
        $scope.recoverPassword = function() {
            $scope.RandomNumber = Math.floor(100000 + Math.random() * 900000);
            var Sendemailotp = ULoginService.Sendemailotp.getPromise($scope.Forgot.Email, $scope.RandomNumber);
            Sendemailotp.then(
                // OnSuccess function
                function(answer) {
                    swal("Success", "Otp sent to your email id. Please check it !)", "success");

                    $scope.Forgot = {
                        IsSendEmail: true,
                        IsSendEmailBtn: true,
                        Email: $scope.Forgot.Email
                    }


                },
                // OnFailure function
                function(reason) {

                    //$scope.somethingWrong = reason;
                    //$scope.error = true;
                }
            )

        }
        $scope.showForgotPassword = function() {
            $scope.Login = {
                login: false,
                Registration: false,
                ForgotPassword: true
            };
        }
        $scope.user = {
            username: "",
            password: ""
        }
        $scope.Login_All = function() {

            if ($scope.user.username == "admin@gmail.com" && $scope.user.password == "admin") {
                window.open("view/Admin/index.html#/Index", '_self')
            } else {
                var askForPromise = ULoginService.LoginUser.getPromise($scope.user.username, $scope.user.password, $scope.UType);
                askForPromise.then(
                    // OnSuccess function
                    function(answer) {

                        if (answer.data.GetLoginResult.ResponseCode == 0) {

                            if ($scope.UType == '1') {
                                localStorage.setItem('data', JSON.stringify(answer.data.GetLoginResult.Result));
                                $localStorage.userData = answer.data.GetLoginResult.Result;
                                window.open("view/Client/index.html#/Index", '_self');

                            } else if ($scope.UType == '2') {
                                localStorage.setItem('data', JSON.stringify(answer.data.GetLoginResult.Result));
                                $localStorage.userData = answer.data.GetLoginResult.Result;
                                window.open("view/RM/index.html#/Index", '_self');

                            } else {
                                $rootScope.userData = answer.data.GetLoginResult.Result;
                                $localStorage.userData = answer.data.GetLoginResult.Result;
                                $rootScope.LoginStatus = true;
                                $localStorage.LoginStatusLocal = true;
                                if ($localStorage.JobApplyStatus) {
                                    $state.go($localStorage.CurrentStatusOfPage);


                                } else {
                                    $state.go("Profile");
                                }

                            }




                        } else {
                            swal("Error", "Email and Password are not correct. please enter correct one !)", "error");


                            $scope.ErrorMessage = answer.data.GetLoginResult.ResponseMessage;


                        }

                    },
                    // OnFailure function
                    function(reason) {

                        swal("Error", "Some thing went wrong. Please try again!)", "error");
                        $scope.ErrorMessage = answer.data.GetLoginResult.ResponseMessage;
                        //$scope.somethingWrong = reason;
                        //$scope.error = true;
                    }
                )
            }



        }
        $scope.Register = {
            FirstName: '',
            LastName: '',
            Email: '',
            Password: '',
            mobileno: '',
            otpReg: false
        };
        $scope.otpbtn = "GET OTP";
        $scope.RegistrationFun = function() {

            var PostDataReq = {
                "request": {
                    "UR_First_Name": $scope.Register.FirstName,
                    "UR_Last_Name": $scope.Register.LastName,
                    "UR_Email": $scope.Register.Email,
                    "UR_Mobile": $scope.Register.mobileno,
                    "UR_Password": $scope.Register.Password
                }
            }

            var askForPromise = ULoginService.Register.PostPromise(PostDataReq);
            askForPromise.then(
                // OnSuccess function
                function(answer) {
                    if (answer.UserRegistrationResult.ResponseCode == "0") {

                        $scope.Login = {
                            login: true,
                            Registration: false,
                            ForgotPassword: false
                        };

                        swal("Succes", "Thanks for registering with us)", "success");
                        $scope.ErrorMessage = answer.UserRegistrationResult.ResponseMessage;
                    } else {
                        swal("Error", "This mobile number is already registered with us please try with other one !)", "error");

                        $scope.Login = {
                            login: true,
                            Registration: false,
                            ForgotPassword: false
                        };

                    }




                },
                // OnFailure function
                function(reason) {
                    //  HideLoader();
                    $scope.Login = {
                        login: true,
                        Registration: false,
                        ForgotPassword: false
                    };

                    swal("Succes", "Successfully Registered)", "success");
                    $scope.ErrorMessage = answer.UserRegistrationResult.ResponseMessage;
                    //$scope.somethingWrong = reason;
                    //$scope.error = true;
                }
            )




        };
        $scope.sendOtp = function() {
            if (!$scope.sendedOTP) {
                $scope.RandomNumber = Math.floor(100000 + Math.random() * 900000);
                var message = "Your OTP to complete the registration process for AssortStaffing is " + $scope.RandomNumber;
                var URL = "http://sms6.routesms.com:8080/bulksms/bulksms?username=assortstaffing&password=Admin123&type=0&dlr=1&destination=" + $scope.Register.mobileno + "&source=ASSORT&message=" + message;

                $http.post(URL)
                    .success(function(data) {
                        $scope.sendedOTP = true;
                        $scope.getOtpBtn = true;
                        $scope.otpbtn = "Verify OTP"
                    })
                    .error(function(data) {
                        $scope.sendedOTP = true;
                        $scope.getOtpBtn = true;
                        $scope.otpbtn = "Verify OTP"
                    });

            } else {
                $scope.checkOtp();
            }

        }
        $scope.checkOtp = function() {
            if ($scope.RandomNumber == $scope.Mobileotp) {
                $scope.Register.otpReg = true;
                $scope.sendedOTP = false;
                $scope.RegistrationFun();
            } else {
                // $scope.message = "OTP does not match, please enter correct one";

                swal("Error", "OTP does not match, please enter correct one)", "error");
                $scope.Mobileotp = "";
            }
        }
        $rootScope.logout = function() {
            $rootScope.LoginStatus = false;
            $state.go("Index");
        }
        $scope.count = 0;
        $scope.changePassword = function() {
            if ($scope.count == 0) {
                if ($scope.RandomNumber == $scope.Mobileotp) {
                    ++$scope.count;
                    $scope.Forgot = {
                        IsSendOtp: true,
                        IsSendEmailBtn: true
                    }
                } else {
                    swal("Error", "Please enter currect one time password.", "error");

                }

            } else {
                var askForPromise = ULoginService.UpdatePassword.getPromise($scope.Forgot.Email, $scope.Forgot.ConfirmPass);
                askForPromise.then(
                    // OnSuccess function
                    function(answer) {

                        if (answer.data.ForgotpasswordResult.ResponseCode == 0) {



                            swal("Succes", "Password changed succesfully", "success");
                            $scope.count = 0;
                            $scope.Login = {
                                login: true,
                                Registration: false,
                                ForgotPassword: false
                            };

                        } else {
                            alert(answer.data.ForgotpasswordResult.ResponseMessage)

                        }

                    },
                    // OnFailure function
                    function(reason) {
                        swal("Error", "Some thing went wrong. Please try again !", "error");
                        //$scope.somethingWrong = reason;
                        //$scope.error = true;
                    }
                )
            }

        }

        $scope.CheckAsClients = function() {

            if ($scope.UType == '0') {
                $scope.UType = '1';
            } else {
                $scope.UType = '0';
            }
        }
        $scope.CheckAsRM = function() {

            if ($scope.UType == '0') {
                $scope.UType = '2';
            } else {
                $scope.UType = '0';
            }
        }



    }
]);