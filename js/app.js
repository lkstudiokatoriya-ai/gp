/* ==========================================================
   Polytechnic Hub
   File : js/app.js
   Part : 1
   ========================================================== */

"use strict";

/* ===========================================
   Global Variables
=========================================== */

let student = {};

let attendance = {};

let currentLocation = null;

let selfieImage = null;

let collegeImage = null;

let frontStream = null;

let backStream = null;

let locationVerified = false;

let selfieVerified = false;

let collegeVerified = false;


/* ===========================================
   App Initialize
=========================================== */

document.addEventListener("DOMContentLoaded", initApp);

function initApp() {

    loadStudent();

    bindEvents();

    console.log("Application Started");

}


/* ===========================================
   Bind Events
=========================================== */

function bindEvents() {

    const registerBtn = document.getElementById("registerBtn");

    if (registerBtn) {

        registerBtn.addEventListener("click", saveStudent);

    }

}


/* ===========================================
   Save Student
=========================================== */

function saveStudent() {

    student = {

        name: document.getElementById("studentName").value.trim(),

        roll: document.getElementById("rollNumber").value.trim(),

        registration: document.getElementById("registrationNumber").value.trim(),

        semester: document.getElementById("semester").value,

        branch: document.getElementById("branch").value,

        college: "Government Polytechnic Banka"

    };

    localStorage.setItem(

        "student",

        JSON.stringify(student)

    );

    alert("Registration Successful");

}


/* ===========================================
   Load Student
=========================================== */

function loadStudent() {

    const data = localStorage.getItem("student");

    if (!data) return;

    student = JSON.parse(data);

}


/* ===========================================
   Check Registration
=========================================== */

function isRegistered() {

    return (

        student.name &&

        student.roll &&

        student.registration

    );

}


/* ===========================================
   Start Attendance
=========================================== */

function startAttendance() {

    if (!isRegistered()) {

        alert("Please Register First");

        return;

    }

    requestLocation();

}
/* ===========================================
   Request Location Permission
=========================================== */

function requestLocation() {

    if (!navigator.geolocation) {

        alert("Location is not supported.");

        return;

    }

    navigator.geolocation.getCurrentPosition(

        locationSuccess,

        locationError,

        {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
        }

    );

}


/* ===========================================
   Location Success
=========================================== */

function locationSuccess(position) {

    currentLocation = {

        latitude: position.coords.latitude,

        longitude: position.coords.longitude,

        accuracy: position.coords.accuracy

    };

    verifyCollegeLocation();

}


/* ===========================================
   Location Error
=========================================== */

function locationError(error) {

    switch (error.code) {

        case error.PERMISSION_DENIED:

            alert("Location Permission Denied");

            break;

        case error.POSITION_UNAVAILABLE:

            alert("Location Unavailable");

            break;

        case error.TIMEOUT:

            alert("Location Request Timeout");

            break;

        default:

            alert("Unable to Get Location");

    }

}


/* ===========================================
   Verify College Location
=========================================== */

async function verifyCollegeLocation() {

    const result = await verifyLocation(

        currentLocation.latitude,

        currentLocation.longitude

    );

    if (!result.success) {

        alert("You are outside Government Polytechnic Banka.");

        return;

    }

    locationVerified = true;

    startFrontCamera();

}
/* ===========================================
   Start Front Camera
=========================================== */

async function startFrontCamera() {

    try {

        frontStream = await navigator.mediaDevices.getUserMedia({

            video: {

                facingMode: "user",

                width: { ideal: 1280 },

                height: { ideal: 720 }

            },

            audio: false

        });

        const video = document.getElementById("frontCamera");

        video.srcObject = frontStream;

        video.play();

    } catch (error) {

        alert("Unable to Open Front Camera");

        console.error(error);

    }

}


/* ===========================================
   Capture Selfie
=========================================== */

function captureSelfie() {

    const video = document.getElementById("frontCamera");

    const canvas = document.getElementById("selfieCanvas");

    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;

    canvas.height = video.videoHeight;

    ctx.drawImage(

        video,

        0,

        0,

        canvas.width,

        canvas.height

    );

    selfieImage = canvas.toDataURL("image/jpeg", 0.95);

    selfieVerified = true;

    stopFrontCamera();

    startBackCamera();

}


/* ===========================================
   Stop Front Camera
=========================================== */

function stopFrontCamera() {

    if (!frontStream) return;

    frontStream.getTracks().forEach(track => track.stop());

    frontStream = null;

}
/* ===========================================
   Start Back Camera
=========================================== */

async function startBackCamera() {

    try {

        backStream = await navigator.mediaDevices.getUserMedia({

            video: {

                facingMode: {

                    ideal: "environment"

                },

                width: {

                    ideal: 1920

                },

                height: {

                    ideal: 1080

                }

            },

            audio: false

        });

        const video = document.getElementById("backCamera");

        video.srcObject = backStream;

        await video.play();

    } catch (error) {

        alert("Unable to Open Back Camera");

        console.error(error);

    }

}


/* ===========================================
   Capture College Photo
=========================================== */

function captureCollegePhoto() {

    const video = document.getElementById("backCamera");

    const canvas = document.getElementById("collegeCanvas");

    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;

    canvas.height = video.videoHeight;

    ctx.drawImage(

        video,

        0,

        0,

        canvas.width,

        canvas.height

    );

    collegeImage = canvas.toDataURL(

        "image/jpeg",

        0.95

    );

    collegeVerified = true;

    stopBackCamera();

    submitAttendanceData();

}


/* ===========================================
   Stop Back Camera
=========================================== */

function stopBackCamera() {

    if (!backStream) return;

    backStream.getTracks().forEach(track => track.stop());

    backStream = null;

}
/* ===========================================
   Submit Attendance
=========================================== */

async function submitAttendanceData() {

    if (!locationVerified) {

        alert("Location Verification Required");

        return;

    }

    if (!selfieVerified) {

        alert("Selfie Required");

        return;

    }

    if (!collegeVerified) {

        alert("College Photo Required");

        return;

    }

    attendance = {

        student: student,

        location: currentLocation,

        selfie: selfieImage,

        collegePhoto: collegeImage,

        date: new Date().toLocaleDateString(),

        time: new Date().toLocaleTimeString(),

        timestamp: Date.now()

    };

    const response = await submitAttendance(attendance);

    if (response.success) {

        saveAttendanceHistory(attendance);

        alert("Attendance Submitted Successfully");

    } else {

        alert(response.message || "Attendance Submission Failed");

    }

}


/* ===========================================
   Save Attendance History
=========================================== */

function saveAttendanceHistory(record) {

    let history = JSON.parse(

        localStorage.getItem("attendanceHistory")

    ) || [];

    history.unshift(record);

    localStorage.setItem(

        "attendanceHistory",

        JSON.stringify(history)

    );

}


/* ===========================================
   Get Attendance History
=========================================== */

function getAttendanceHistoryLocal() {

    return JSON.parse(

        localStorage.getItem("attendanceHistory")

    ) || [];

}
/* ===========================================
   Reset Attendance Session
=========================================== */

function resetAttendanceSession() {

    currentLocation = null;

    selfieImage = null;

    collegeImage = null;

    locationVerified = false;

    selfieVerified = false;

    collegeVerified = false;

}


/* ===========================================
   Preview Selfie
=========================================== */

function previewSelfie() {

    const img = document.getElementById("selfiePreview");

    if (!img || !selfieImage) return;

    img.src = selfieImage;

}


/* ===========================================
   Preview College Photo
=========================================== */

function previewCollegePhoto() {

    const img = document.getElementById("collegePreview");

    if (!img || !collegeImage) return;

    img.src = collegeImage;

}


/* ===========================================
   Remove Selfie
=========================================== */

function removeSelfie() {

    selfieImage = null;

    selfieVerified = false;

}


/* ===========================================
   Remove College Photo
=========================================== */

function removeCollegePhoto() {

    collegeImage = null;

    collegeVerified = false;

}


/* ===========================================
   Logout
=========================================== */

function logout() {

    localStorage.removeItem("student");

    localStorage.removeItem("attendanceHistory");

    location.reload();

}


/* ===========================================
   End of app.js
=========================================== */

console.log("app.js Loaded Successfully");
