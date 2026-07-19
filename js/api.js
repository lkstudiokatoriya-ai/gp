/* ===========================================================
   Polytechnic Hub - api.js
   Version : 1.0
   Author  : LK STUDY STUDIO
   =========================================================== */

"use strict";

/* ==============================
   API Configuration
============================== */

const API = {

    // Change this later if you use your own backend
    BASE_URL: "",

    ATTENDANCE: "/attendance",

    REGISTER: "/register",

    HISTORY: "/history"

};


/* ==============================
   Common API Headers
============================== */

const API_HEADERS = {
    "Content-Type": "application/json"
};


/* ==============================
   Common Request Function
============================== */

async function apiRequest(url, method = "GET", body = null) {

    try {

        const options = {
            method,
            headers: API_HEADERS
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(API.BASE_URL + url, options);

        if (!response.ok) {
            throw new Error("Server Error");
        }

        return await response.json();

    } catch (error) {

        console.error("API Error:", error);

        return {
            success: false,
            message: error.message
        };

    }

}


/* ==============================
   Save Student Information
============================== */

async function registerStudent(studentData) {

    return await apiRequest(

        API.REGISTER,

        "POST",

        studentData

    );

}


/* ==============================
   Save Attendance
============================== */

async function submitAttendance(attendanceData) {

    return await apiRequest(

        API.ATTENDANCE,

        "POST",

        attendanceData

    );

}


/* ==============================
   Get Attendance History
============================== */

async function getAttendanceHistory(studentId) {

    return await apiRequest(

        API.HISTORY +

        "?studentId=" +

        studentId

    );

}
/* ==============================
   Upload Selfie
============================== */

async function uploadSelfie(studentId, selfieBase64) {

    return await apiRequest(

        "/upload/selfie",

        "POST",

        {
            studentId,
            selfie: selfieBase64
        }

    );

}


/* ==============================
   Upload College Photo
============================== */

async function uploadCollegePhoto(studentId, photoBase64) {

    return await apiRequest(

        "/upload/college",

        "POST",

        {
            studentId,
            photo: photoBase64
        }

    );

}


/* ==============================
   Save Location
============================== */

async function saveLocation(studentId, latitude, longitude) {

    return await apiRequest(

        "/location",

        "POST",

        {
            studentId,
            latitude,
            longitude
        }

    );

}


/* ==============================
   Verify Location
============================== */

async function verifyLocation(latitude, longitude) {

    return await apiRequest(

        "/location/verify",

        "POST",

        {
            latitude,
            longitude
        }

    );

}
/* ==============================
   Get Student Profile
============================== */

async function getStudentProfile(studentId) {

    return await apiRequest(

        "/student/profile",

        "GET"

    );

}


/* ==============================
   Update Student Profile
============================== */

async function updateStudentProfile(studentData) {

    return await apiRequest(

        "/student/update",

        "PUT",

        studentData

    );

}


/* ==============================
   Check Today's Attendance
============================== */

async function checkTodayAttendance(studentId) {

    return await apiRequest(

        "/attendance/today?studentId=" + studentId,

        "GET"

    );

}


/* ==============================
   Delete Attendance
============================== */

async function deleteAttendance(attendanceId) {

    return await apiRequest(

        "/attendance/delete",

        "DELETE",

        {
            attendanceId
        }

    );

}


/* ==============================
   Get Attendance Details
============================== */

async function getAttendanceDetails(attendanceId) {

    return await apiRequest(

        "/attendance/details?id=" + attendanceId,

        "GET"

    );

}
/* ==============================
   Get Attendance Statistics
============================== */

async function getAttendanceStats(studentId) {

    return await apiRequest(

        "/attendance/stats?studentId=" + studentId,

        "GET"

    );

}


/* ==============================
   Check Server Status
============================== */

async function checkServerStatus() {

    return await apiRequest(

        "/status",

        "GET"

    );

}


/* ==============================
   Upload Attendance Record
============================== */

async function uploadAttendanceRecord(data) {

    return await apiRequest(

        "/attendance/upload",

        "POST",

        data

    );

}


/* ==============================
   Logout Student
============================== */

async function logoutStudent() {

    return await apiRequest(

        "/logout",

        "POST"

    );

}


/* ==============================
   Export API
============================== */

window.API = API;

window.registerStudent = registerStudent;
window.submitAttendance = submitAttendance;
window.getAttendanceHistory = getAttendanceHistory;
window.uploadSelfie = uploadSelfie;
window.uploadCollegePhoto = uploadCollegePhoto;
window.saveLocation = saveLocation;
window.verifyLocation = verifyLocation;
window.getStudentProfile = getStudentProfile;
window.updateStudentProfile = updateStudentProfile;
window.checkTodayAttendance = checkTodayAttendance;
window.deleteAttendance = deleteAttendance;
window.getAttendanceDetails = getAttendanceDetails;
window.getAttendanceStats = getAttendanceStats;
window.checkServerStatus = checkServerStatus;
window.uploadAttendanceRecord = uploadAttendanceRecord;
window.logoutStudent = logoutStudent;

