app.controller("AuthCtrl", ["$scope", "$rootScope", "$localStorage", "$timeout", "$interval", "$filter", "$state", "ULoginService", "JobService", "$sce", "$http", function(e, t, o, s, n, r, a, i, g, l, u) {
    e.UType = "0", e.Login = { login: !0, Registration: !1, ForgotPassword: !1 }, e.Forgot = { IsSendEmail: !1, IsSendOtp: !1, IsSendEmailBtn: !1 }, e.Login.login = !0, e.showRegistration = function() { e.Login = { login: !1, Registration: !0, ForgotPassword: !1 }, e.Register.otpReg = !1 }, e.showLogin = function() { e.Login = { login: !0, Registration: !1, ForgotPassword: !1 } }, e.recoverPassword = function() {
        e.RandomNumber = Math.floor(1e5 + 9e5 * Math.random());
        var t = i.Sendemailotp.getPromise(e.Forgot.Email, e.RandomNumber);
        t.then(function(t) { alert("Otp sent to your email id. Please check it"), e.Forgot = { IsSendEmail: !0, IsSendEmailBtn: !0, Email: e.Forgot.Email } }, function(e) {})
    }, e.showForgotPassword = function() { e.Login = { login: !1, Registration: !1, ForgotPassword: !0 } }, e.user = { username: "", password: "" }, e.Login_All = function() {
        if ("admin@gmail.com" == e.user.username && "admin" == e.user.password) window.open("view/Admin/index.html#/Index", "_self");
        else {
            var s = i.LoginUser.getPromise(e.user.username, e.user.password, e.UType);
            s.then(function(s) { 0 == s.data.GetLoginResult.ResponseCode ? "1" == e.UType ? (localStorage.setItem("data", JSON.stringify(s.data.GetLoginResult.Result)), o.userData = s.data.GetLoginResult.Result, window.open("view/Client/index.html#/Index", "_self")) : "2" == e.UType ? (localStorage.setItem("data", JSON.stringify(s.data.GetLoginResult.Result)), o.userData = s.data.GetLoginResult.Result, window.open("view/RM/index.html#/Index", "_self")) : (t.userData = s.data.GetLoginResult.Result, o.userData = s.data.GetLoginResult.Result, t.LoginStatus = !0, o.LoginStatusLocal = !0, o.JobApplyStatus ? a.go(o.CurrentStatusOfPage) : a.go("Profile")) : (alert("Email and Password are not correct. please enter correct one"), e.ErrorMessage = s.data.GetLoginResult.ResponseMessage) }, function(t) { alert("Some thing went wrong. please enter correct one"), e.ErrorMessage = answer.data.GetLoginResult.ResponseMessage })
        }
    }, e.Register = { FirstName: "", LastName: "", Email: "", Password: "", mobileno: "", otpReg: !1 }, e.otpbtn = "GET OTP", e.RegistrationFun = function() {
        var t = { request: { UR_First_Name: e.Register.FirstName, UR_Last_Name: e.Register.LastName, UR_Email: e.Register.Email, UR_Mobile: e.Register.mobileno, UR_Password: e.Register.Password } },
            o = i.Register.PostPromise(t);
        o.then(function(t) { "0" == t.UserRegistrationResult.ResponseCode ? (e.Login = { login: !0, Registration: !1, ForgotPassword: !1 }, alert("Thanks for registering with us"), e.ErrorMessage = t.UserRegistrationResult.ResponseMessage) : (alert("This mobile number is already registered with us please try with other one !"), e.Login = { login: !0, Registration: !1, ForgotPassword: !1 }) }, function(t) { e.Login = { login: !0, Registration: !1, ForgotPassword: !1 }, alert("Successfully Registered"), e.ErrorMessage = answer.UserRegistrationResult.ResponseMessage })
    }, e.sendOtp = function() {
        if (e.sendedOTP) e.checkOtp();
        else {
            e.RandomNumber = Math.floor(1e5 + 9e5 * Math.random());
            var t = "Your OTP to complete the registration process for AssortStaffing is " + e.RandomNumber,
                o = "http://sms6.routesms.com:8080/bulksms/bulksms?username=assortstaffing&password=avfcYYhb&type=0&dlr=1&destination=" + e.Register.mobileno + "&source=ASSORT&message=" + t;
            u.post(o).success(function(t) { e.sendedOTP = !0, e.getOtpBtn = !0, e.otpbtn = "Verify OTP" }).error(function(t) { e.sendedOTP = !0, e.getOtpBtn = !0, e.otpbtn = "Verify OTP" })
        }
    }, e.checkOtp = function() { e.RandomNumber == e.Mobileotp ? (e.Register.otpReg = !0, e.sendedOTP = !1, e.RegistrationFun()) : (alert("OTP does not match, please enter correct one"), e.Mobileotp = "") }, t.logout = function() { t.LoginStatus = !1, a.go("Index") }, e.count = 0, e.changePassword = function() {
        if (0 == e.count) e.RandomNumber == e.Mobileotp ? (++e.count, e.Forgot = { IsSendOtp: !0, IsSendEmailBtn: !0 }) : alert("Please enter currect one time password.");
        else {
            var t = i.UpdatePassword.getPromise(e.Forgot.Email, e.Forgot.ConfirmPass);
            t.then(function(t) { 0 == t.data.ForgotpasswordResult.ResponseCode ? (alert("Password changed succesfully"), e.count = 0, e.Login = { login: !0, Registration: !1, ForgotPassword: !1 }) : alert(t.data.ForgotpasswordResult.ResponseMessage) }, function(e) { alert("Some thing wemt wrong!") })
        }
    }, e.CheckAsClients = function() { "0" == e.UType ? e.UType = "1" : e.UType = "0" }, e.CheckAsRM = function() { "0" == e.UType ? e.UType = "2" : e.UType = "0" }
}]);