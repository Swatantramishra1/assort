/// <reference path="../../view/job/jobListing.html" />
// Host Name & Urls

//For Locals
//var ServerName = "http://localhost:51176/Service/";

//For Hosting
var ServerName = "http://assortvikash.azurewebsites.net/Service/";



//**************************Service Start Fom here****************************//

//Service Name

var Service_Common = "InvestorFundaServices.svc/";


// Service Method Name

var API_Login_All = ServerName + Service_Common + "Login/";
var API_getClientDash = ServerName + Service_Common + "getClientDashListDVal1/";
var API_addClientDashboard = ServerName + Service_Common + "addClientDashboard";
var API_UpdatePassword = ServerName + Service_Common + "UpdatePassword/";
var API_UserRegistration = ServerName + Service_Common + "UserRegistration";
var API_GetJobList = ServerName + Service_Common + "GetJobList";
var API_GetLocation = ServerName + Service_Common + "GetLocation";
var API_GetSkillsCategory = ServerName + Service_Common + "GetSkillsCategory";
var API_GetSkillsName = ServerName + Service_Common + "GetSkillsName";
var API_GetIndustryList = ServerName + Service_Common + "GetIndustryList";
var API_CreateJob = ServerName + Service_Common + "CreateJob";
var API_AddLocation = ServerName + Service_Common + "AddLocation";
var API_AddCompany = ServerName + Service_Common + "AddCompany";
var API_UpdateUserDetails = ServerName + Service_Common + "UpdateUserDetails";
var API_GetJobListByID = ServerName + Service_Common + "GetJobListByID/";
var API_GetUserList = ServerName + Service_Common + "GetUserList";
var API_GetAppliedJobListByID = ServerName + Service_Common + "GetAppliedJobListByID/";
var API_ApplyJob = ServerName + Service_Common + 'ApplyJob/';
var API_AddClient = ServerName + Service_Common + 'AddClient';
var API_GetclientList = ServerName + Service_Common + 'GetclientList/';
var API_InsertShortListedCandidate = ServerName + Service_Common + 'InsertShortListedCandidate';
var API_ShortlitedCandidateList = ServerName + Service_Common + 'ShortlitedCandidateList';
var API_GetUserDetailsByID = ServerName + Service_Common + 'GetUserDetailsByID/';
var API_GetRelationshipManager = ServerName + Service_Common + 'GetRelationshipManager';
var API_AddRelationshipManager = ServerName + Service_Common + 'AddRelationshipManager';
var API_CreateUpdateIssu = ServerName + Service_Common + 'CreateUpdateIssu';
var API_GetIssue = ServerName + Service_Common + 'GetIssue';
var API_GetIssueByClient = ServerName + Service_Common + 'GetIssueByClient/';
var API_GetIssueViaRmList = ServerName + Service_Common + 'GetIssueViaRmList';
var API_UpdateIssueStatus = ServerName + Service_Common + 'UpdateIssueStatus';
var API_UpdateCandidateResume = ServerName + Service_Common + 'UpdateCandidateResume/';
var API_AddIndustry = ServerName + Service_Common + 'AddIndustry';
var API_AddSkillCategoryName = ServerName + Service_Common + 'AddSkillCategoryName';
var API_AddSkillName = ServerName + Service_Common + 'AddSkillName';
var API_UpdateCandidateImage = ServerName + Service_Common + 'UpdateCandidateImage/';
var API_UpdateClientAgrement = ServerName + Service_Common + 'UpdateClientAgrement/';
var API_GetCompany = ServerName + Service_Common + 'GetCompany';
var API_GetJobClientList = ServerName + Service_Common + 'GetJobClientList/';
var API_uploadCandidateList = ServerName + Service_Common + 'uploadCandidateList/';
var API_uploadClientDocs = ServerName + Service_Common + 'uploadClientDocs/';
var API_GetDocsList = ServerName + Service_Common + 'GetDocsList/';

var API_Forgotpassword = ServerName + Service_Common + 'Forgotpassword/';
var API_GetJobAutoComplete = ServerName + Service_Common + 'GetJobAutoComplete/';
var API_DeleteJob = ServerName + Service_Common + 'DeleteJob/';
var API_DeleteRM = ServerName + Service_Common + 'deleteRM/';
var API_GetDashBoard = ServerName + Service_Common + 'GetDashBoard/';
var API_GetOtherDetails = ServerName + Service_Common + 'GetOtherDetails/';
var API_AddOtherDetails = ServerName + Service_Common + 'AddOtherDetails';
var API_GetIssueRep = ServerName + Service_Common + 'GetIssueRep';
var API_ActDeactOperClient = ServerName + Service_Common + 'ActDeactOperClient/';


var API_GetCardClient = ServerName + Service_Common + 'GetCardClient/';
var API_AddCardClient = ServerName + Service_Common + 'AddCardClient';
var API_deleteClient = ServerName + Service_Common + 'deleteClient/';
var messageJson = {
    info: "information",
    success: "success",
    error: "error",
    loadingData: "Loading Data...",
    Fetchedsuccess: "Fetched data successfully...",
    FetchedError: "Some thing went wrong..."

}