var app = angular.module("app", ["ui.router", "ngStorage", "ngSanitize", "angular-flexslider", "ngAnimate", "autoCompleteModule"]);
app.filter("moment", [function() { return function(e, a) { var r = moment(e); return r[a].apply(r, Array.prototype.slice.call(arguments, 2)) } }]);