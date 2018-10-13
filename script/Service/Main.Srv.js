app.service('JobService', ['$http', '$q', '$httpParamSerializer', function ($http, $q, $httpParamSerializer) {
    var deferObject,
        getJobList = {

            getPromise: function () {
                let returnValue;

                var promise = $http.get(API_GetJobList),
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
    getDocList = {

        getPromise: function (id) {
            let returnValue;

            var promise = $http.get(API_GetDocsList + id),
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
    getClientDash = {

        getPromise: function (ClientID) {
            let returnValue;

            var promise = $http.get(API_getClientDash + ClientID),
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
    deleteJob = {

        getPromise: function (jobID) {
            let returnValue;

            var promise = $http.get(API_DeleteJob + jobID),
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
    deleteClient = {

        getPromise: function (ID) {
            let returnValue;

            var promise = $http.delete(API_deleteClient + ID),
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
    actDeactOperClient = {

        getPromise: function (ClID, Status) {
            let returnValue;

            var promise = $http.get(API_ActDeactOperClient + ClID + "/" + Status),
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
    deleteRm = {

        deletePromise: function (RMID) {
            let returnValue;

            var promise = $http.delete(API_DeleteRM + RMID),
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
    getCompanyList = {

        getPromise: function () {
            let returnValue;

            var promise = $http.get(API_GetCompany),
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
    clientList = {

        getPromise: function (ID) {
            let returnValue;

            var promise = $http.get(API_GetclientList + ID),
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
    getRmList = {

        getPromise: function (RmID) {
            let returnValue;

            var promise = $http.get(API_GetRelationshipManager + '/' + RmID),
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
    getissueList = {

        getPromise: function (IssueID) {
            let returnValue;

            var promise = $http.get(API_GetIssue + '/' + IssueID),
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
    getissueByClient = {

        getPromise: function (IssueID) {
            let returnValue;

            var promise = $http.get(API_GetIssueByClient + IssueID),
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
    getClientCard = {

        getPromise: function (ClientID) {
            let returnValue;

            var promise = $http.get(API_GetCardClient + ClientID),
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
    getRmissueList = {

        getPromise: function (IssueID) {
            let returnValue;

            var promise = $http.get(API_GetIssueViaRmList + '/' + IssueID),
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
    getUserList = {

        getPromise: function () {
            let returnValue;

            var promise = $http.get(API_GetUserList),
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
    getJobLocation = {

        getPromise: function () {
            let returnValue;

            var promise = $http.get(API_GetLocation),
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
    getShortlitedCandidateList = {

        getPromise: function () {
            let returnValue;

            var promise = $http.get(API_ShortlitedCandidateList),
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
    getSkillsCategory = {

        getPromise: function () {
            let returnValue;

            var promise = $http.get(API_GetSkillsCategory),
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
    getSkillsName = {

        getPromise: function () {
            let returnValue;

            var promise = $http.get(API_GetSkillsName),
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
    getIndustryList = {

        getPromise: function () {
            let returnValue;

            var promise = $http.get(API_GetIndustryList),
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
    getJobListByID = {

        getPromise: function (jobID) {
            let returnValue;

            var promise = $http.get(API_GetJobListByID + jobID),
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
    getJobListClientByID = {

        getPromise: function (ClientID) {
            let returnValue;

            var promise = $http.get(API_GetJobClientList + ClientID),
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

    getDashBoard = {

        getPromise: function (ID, Type) {
            let returnValue;

            var promise = $http.get(API_GetDashBoard + ID + "/" + Type),
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

    getOtherDetails = {

        getPromise: function (ID) {
            let returnValue;

            var promise = $http.get(API_GetOtherDetails + ID),
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
    getUserDetailsByID = {

        getPromise: function (UserID) {
            let returnValue;

            var promise = $http.get(API_GetUserDetailsByID + UserID),
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
    getAppliedJobListByID = {

        getPromise: function (jobID) {
            let returnValue;

            var promise = $http.get(API_GetAppliedJobListByID + jobID),
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
    GetIssueRep = {

        PostPromise: function (PostData) {

            deferObject = deferObject || $q.defer();
            $.ajax({
                url: API_GetIssueRep,
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
    createJob = {

        PostPromise: function (PostData) {
            console.log("Data", PostData);
            for (var i = 0; i < PostData.request.SkillsList.length; i++) {
                delete PostData.request.SkillsList["$$hashKey"];

            }
            console.log("refineData", PostData);
            deferObject = deferObject || $q.defer();
            $.ajax({
                url: API_CreateJob,
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
    addNewsAndMedia = {

        PostPromise: function (PostData) {

            deferObject = deferObject || $q.defer();
            $.ajax({
                url: API_addNewsAndMedia,
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
    addCardClient = {

        PostPromise: function (PostData) {

            deferObject = deferObject || $q.defer();
            $.ajax({
                url: API_AddCardClient,
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
    createUpdateIssue = {

        PostPromise: function (PostData) {

            deferObject = deferObject || $q.defer();
            $.ajax({
                url: API_CreateUpdateIssu,
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
    addLocation = {

        PostPromise: function (PostData) {

            deferObject = deferObject || $q.defer();
            $.ajax({
                url: API_AddLocation,
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
    addIndustry = {

        PostPromise: function (PostData) {

            deferObject = deferObject || $q.defer();
            $.ajax({
                url: API_AddIndustry,
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
    addSkillCategoryName = {

        PostPromise: function (PostData) {

            deferObject = deferObject || $q.defer();
            $.ajax({
                url: API_AddSkillCategoryName,
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
    addSkillName = {

        PostPromise: function (PostData) {

            deferObject = deferObject || $q.defer();
            $.ajax({
                url: API_AddSkillName,
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
    addRM = {

        PostPromise: function (PostData) {

            deferObject = deferObject || $q.defer();
            $.ajax({
                url: API_AddRelationshipManager,
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
    addCompany = {

        PostPromise: function (PostData) {

            deferObject = deferObject || $q.defer();
            $.ajax({
                url: API_AddCompany,
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
    UpdateUser = {

        PostPromise: function (PostData) {

            deferObject = deferObject || $q.defer();
            $.ajax({
                url: API_UpdateUserDetails,
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
    AddOtherDetails = {

        PostPromise: function (PostData) {

            deferObject = deferObject || $q.defer();
            $.ajax({
                url: API_AddOtherDetails,
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
    UpdateIssueStatus = {

        PostPromise: function (IssueID, Status) {
            let PostData = {
                IssueStatus: {
                    IssueID: IssueID,
                    Status: Status
                }
            }
            deferObject = deferObject || $q.defer();
            $.ajax({
                url: API_UpdateIssueStatus,
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
    ApplyJob = {

        PostPromise: function (CandidateID, JobID) {

            deferObject = deferObject || $q.defer();
            $.ajax({
                url: API_ApplyJob + CandidateID + '/' + JobID,
                dataType: 'json',
                type: 'post',
                contentType: 'application/json',
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
    InsertClientDash = {

        PostPromise: function (PostData) {

            deferObject = deferObject || $q.defer();
            $.ajax({
                url: API_addClientDashboard,
                dataType: 'json',
                type: 'post',
                data: JSON.stringify(PostData),
                contentType: 'application/json',
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
    AddClients = {

        PostPromise: function (PostData) {
            deferObject = deferObject || $q.defer();
            $.ajax({
                url: API_AddClient,
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
    AddShortListedCand = {

        PostPromise: function (PostData) {
            deferObject = deferObject || $q.defer();
            $.ajax({
                url: API_InsertShortListedCandidate,
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
        getJobList: getJobList,
        getJobLocation: getJobLocation,
        getSkillsCategory: getSkillsCategory,
        getSkillsName: getSkillsName,
        getIndustryList: getIndustryList,
        createJob: createJob,
        getJobListByID: getJobListByID,
        addLocation: addLocation,
        addIndustry: addIndustry,
        addSkillCategoryName: addSkillCategoryName,
        addSkillName: addSkillName,
        addCompany: addCompany,
        UpdateUser: UpdateUser,
        getUserList: getUserList,
        ApplyJob: ApplyJob,
        getAppliedJobListByID: getAppliedJobListByID,
        AddClients: AddClients,
        clientList: clientList,
        AddShortListedCand: AddShortListedCand,
        getShortlitedCandidateList: getShortlitedCandidateList,
        getUserDetailsByID: getUserDetailsByID,
        getRmList: getRmList,
        addRM: addRM,
        createUpdateIssue: createUpdateIssue,
        getissueList: getissueList,
        getRmissueList: getRmissueList,
        UpdateIssueStatus: UpdateIssueStatus,
        getCompanyList: getCompanyList,
        getJobListClientByID: getJobListClientByID,
        getissueByClient: getissueByClient,
        deleteJob: deleteJob,
        deleteRm: deleteRm,
        deleteClient: deleteClient,
        getDashBoard: getDashBoard,
        getOtherDetails: getOtherDetails,
        AddOtherDetails: AddOtherDetails,
        GetIssueRep: GetIssueRep,
        actDeactOperClient: actDeactOperClient,
        getDocList: getDocList,
        addCardClient: addCardClient,
        getClientCard: getClientCard,
        getClientDash: getClientDash,
        InsertClientDash: InsertClientDash,
        addNewsAndMedia: addNewsAndMedia
    }

}]);