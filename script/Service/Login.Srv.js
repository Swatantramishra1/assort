app.service('ULoginService', ['$http', '$q', '$httpParamSerializer', function ($http, $q, $httpParamSerializer) {
    var deferObject,
    LoginUser = {

        getPromise: function (Email, Password,Type) {
            let returnValue;
           
            var promise = $http.get(API_Login_All + Email + "/" + Password + "/" + Type),
                  deferObject = deferObject || $q.defer();

            promise.then(
              // OnSuccess function
              function (answer) {
                  // This code will only run if we have a successful promise.
                  deferObject.resolve(answer);
              },
              // OnFailure function
              function (reason) {
                  // This code will only run if we have a failed promise.
                  deferObject.reject(reason);
              });

            return deferObject.promise;
        }
    };
    Sendemailotp = {

        getPromise: function (Email, Otp) {
            let returnValue;

            var promise = $http.get(API_Forgotpassword + Email + "/" + Otp ),
                  deferObject = deferObject || $q.defer();

            promise.then(
              // OnSuccess function
              function (answer) {
                  // This code will only run if we have a successful promise.
                  deferObject.resolve(answer);
              },
              // OnFailure function
              function (reason) {
                  // This code will only run if we have a failed promise.
                  deferObject.reject(reason);
              });

            return deferObject.promise;
        }
    };
    UpdatePassword = {

        getPromise: function (Email, Password) {
            let returnValue;

            var promise = $http.get(API_UpdatePassword + Email + "/" + Password),
                  deferObject = deferObject || $q.defer();

            promise.then(
              // OnSuccess function
              function (answer) {
                  // This code will only run if we have a successful promise.
                  deferObject.resolve(answer);
              },
              // OnFailure function
              function (reason) {
                  // This code will only run if we have a failed promise.
                  deferObject.reject(reason);
              });

            return deferObject.promise;
        }
    };
    Register = {

        PostPromise: function (PostData) {
            deferObject = deferObject || $q.defer();
            $.ajax({
                url: API_UserRegistration,
                dataType: 'json',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify(PostData),
                processData: false,
                async: false,
                success: function (data, textStatus, jQxhr) {
                    deferObject.resolve(data);
                },
                error: function (jqXhr, textStatus, errorThrown) {
                    deferObject.reject(errorThrown);
                }
            });
            return deferObject.promise;
        }

    };
    return {
        LoginUser: LoginUser,
        Register: Register,
        UpdatePassword: UpdatePassword,
        Sendemailotp: Sendemailotp
    }

}]);