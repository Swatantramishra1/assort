app.config(function(t, e) { e.otherwise("/Index"), t.state("Index", { url: "/Index", templateUrl: "../../view/home.html", controller: "CommonCtrl" }).state("USA", { url: "/USA", templateUrl: "../../view/uderconstruction.html", controller: "CommonCtrl" }).state("team", { url: "/team", templateUrl: "../../view/team.html", controller: "CommonCtrl" }).state("news", { url: "/news", templateUrl: "../../view/news.html", controller: "CommonCtrl" }).state("MidelEast", { url: "/MidelEast", templateUrl: "../../view/uderconstruction.html", controller: "CommonCtrl" }).state("Contact", { url: "/Contact", templateUrl: "../../view/contact.html", controller: "CommonCtrl" }).state("RecruitmentStaffing", { url: "/RecruitmentStaffing", templateUrl: "../../view/RecruitmentProcess.html", controller: "CommonCtrl" }).state("About", { url: "/About", templateUrl: "../../view/aboutus.html", controller: "CommonCtrl" }).state("Payroll", { url: "/Payroll", templateUrl: "../../view/PayrollOutSorcing.html", controller: "CommonCtrl" }).state("SearchSelection", { url: "/SearchSelection", templateUrl: "../../view/searchAndSelection.html", controller: "CommonCtrl" }).state("TempStaffing", { url: "/TempStaffing", templateUrl: "../../view/temporaryStaffing.html", controller: "CommonCtrl" }).state("LoginRes", { url: "/LoginRes:from", templateUrl: "../../view/login/login.html", controller: "AuthCtrl" }).state("Blog", { url: "/Blog", templateUrl: "../../view/blog.html", controller: "CommonCtrl" }).state("Profile", { url: "/Profile", templateUrl: "../../Admin/Index.html", controller: "CandidateCtrl" }).state("Job", { url: "/Job", templateUrl: "../../view/job/jobListing.html", controller: "CommonCtrl" }).state("itStaffing", { url: "/itStaffing", templateUrl: "../../view/itStaffing.html", controller: "CommonCtrl" }).state("Job/View", { url: "/Job/View", templateUrl: "../../view/job/jobview.html", controller: "CommonCtrl" }).state("Admin/view", { url: "/Admin/view", templateUrl: "../../view/Admin/View/Home.html", controller: "CommonCtrl" }) }), app.config(["$httpProvider", function(t) { t.defaults.useXDomain = !0, delete t.defaults.headers.common["X-Requested-With"] }]), app.directive("ngFiles", ["$parse", function(t) {
    function e(e, l, o) {
        var r = t(o.ngFiles);
        l.on("change", function(t) { r(e, { $files: t.target.files }) })
    }
    return { link: e }
}]), app.directive("fileModel", ["$parse", function(t) {
    return {
        restrict: "A",
        link: function(e, l, o) {
            var r = t(o.fileModel),
                n = r.assign;
            l.bind("change", function() { e.$apply(function() { n(e, l[0].files[0]) }) })
        }
    }
}]), app.service("fileUpload", ["$http", function(t) {
    this.uploadFileToUrl = function(e, l) {
        var o = new FormData;
        o.append("file", e), t.post(l, o, { transformRequest: angular.identity, headers: { "Content-Type": void 0 } }).success(function(t) { console.log(t) }).error(function() {})
    }
}]);