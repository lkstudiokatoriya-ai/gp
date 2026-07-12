/* ==========================================================
   Polytechnic Hub
   File : js/app.js
   Part 1/2
========================================================== */

"use strict";

/* ==========================================================
   Global Variables
========================================================== */

const App = {

    name: "Polytechnic Hub",

    version: "1.0.0",

    isOnline: navigator.onLine,

    currentTheme: localStorage.getItem("theme") || "light"

};

/* ==========================================================
   DOM Ready
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeApp();

});

/* ==========================================================
   Initialize Application
========================================================== */

function initializeApp() {

    initializeLoader();

    initializeTheme();

    initializeSidebar();

    initializeSearch();

    initializeNotification();

    initializePopup();

    initializeBannerSlider();

    initializeScrollButton();

    initializeNetworkStatus();

    initializeTooltips();

    initializeLazyImages();

    console.log(App.name + " Started");

}

/* ==========================================================
   Loader
========================================================== */

function initializeLoader() {

    const loader = document.getElementById("appLoader");

    if (!loader) return;

    let progress = 0;

    const bar = document.getElementById("loaderProgressBar");

    const percentage = document.getElementById("loaderPercentage");

    const timer = setInterval(() => {

        progress++;

        if (bar) {

            bar.style.width = progress + "%";

        }

        if (percentage) {

            percentage.textContent = progress + "%";

        }

        if (progress >= 100) {

            clearInterval(timer);

            loader.style.display = "none";

        }

    }, 15);

}

/* ==========================================================
   Theme
========================================================== */

function initializeTheme() {

    document.body.setAttribute(

        "data-theme",

        App.currentTheme

    );

    const button = document.getElementById("themeButton");

    if (!button) return;

    button.addEventListener("click", toggleTheme);

}

function toggleTheme() {

    App.currentTheme =

        App.currentTheme === "light"

        ? "dark"

        : "light";

    document.body.setAttribute(

        "data-theme",

        App.currentTheme

    );

    localStorage.setItem(

        "theme",

        App.currentTheme

    );

}

/* ==========================================================
   Sidebar
========================================================== */

function initializeSidebar() {

    const sidebar = document.getElementById("sidebar");

    const menu = document.getElementById("menuButton");

    const close = document.getElementById("closeSidebar");

    const overlay = document.getElementById("sidebarOverlay");

    if (menu && sidebar) {

        menu.onclick = () => {

            sidebar.classList.add("active");

            if (overlay) {

                overlay.style.display = "block";

            }

        };

    }

    if (close) {

        close.onclick = closeSidebar;

    }

    if (overlay) {

        overlay.onclick = closeSidebar;

    }

}

function closeSidebar() {

    const sidebar = document.getElementById("sidebar");

    const overlay = document.getElementById("sidebarOverlay");

    if (sidebar) {

        sidebar.classList.remove("active");

    }

    if (overlay) {

        overlay.style.display = "none";

    }

}

/* ==========================================================
   Search
========================================================== */

function initializeSearch() {

    const form = document.getElementById("searchForm");

    if (!form) return;

    form.addEventListener("submit", searchContent);

}

function searchContent(event) {

    event.preventDefault();

    const input = document.getElementById("searchInput");

    if (!input) return;

    const keyword = input.value.trim();

    if (keyword === "") {

        showToast("warning", "Enter something to search.");

        return;

    }

    console.log("Searching:", keyword);

}

/* ==========================================================
   Notification
========================================================== */

function initializeNotification() {

    const button =

        document.getElementById(

            "notificationButton"

        );

    if (!button) return;

    button.onclick = () => {

        const panel =

            document.getElementById(

                "notificationPanel"

            );

        if (panel) {

            panel.classList.toggle("active");

        }

    };

}
/* ==========================================================
   Polytechnic Hub
   File : js/app.js
   Part 2/2
========================================================== */

"use strict";

/* ==========================================================
   Popup
========================================================== */

function initializePopup() {

    const popup = document.getElementById("popupContainer");

    if (!popup) return;

    if (localStorage.getItem("hidePopup") === "true") {

        popup.style.display = "none";

        return;

    }

    setTimeout(() => {

        popup.style.display = "flex";

    }, 2000);

    const closeButton = document.getElementById("closePopup");

    if (closeButton) {

        closeButton.onclick = closePopup;

    }

}

function closePopup() {

    const popup = document.getElementById("popupContainer");

    if (popup) {

        popup.style.display = "none";

    }

    const remember = document.getElementById("dontShowPopup");

    if (remember && remember.checked) {

        localStorage.setItem(

            "hidePopup",

            "true"

        );

    }

}

/* ==========================================================
   Banner Slider
========================================================== */

function initializeBannerSlider() {

    const slides = document.querySelectorAll(".slide");

    if (!slides.length) return;

    let index = 0;

    setInterval(() => {

        slides[index].classList.remove("active");

        index++;

        if (index >= slides.length) {

            index = 0;

        }

        slides[index].classList.add("active");

    }, 4000);

}

/* ==========================================================
   Scroll Button
========================================================== */

function initializeScrollButton() {

    window.addEventListener("scroll", () => {

        const button = document.getElementById("scrollTopButton");

        if (!button) return;

        if (window.scrollY > 400) {

            button.style.display = "flex";

        } else {

            button.style.display = "none";

        }

    });

}

/* ==========================================================
   Network Status
========================================================== */

function initializeNetworkStatus() {

    window.addEventListener("online", () => {

        App.isOnline = true;

        showToast(

            "success",

            "Internet Connected"

        );

    });

    window.addEventListener("offline", () => {

        App.isOnline = false;

        showToast(

            "error",

            "You are Offline"

        );

    });

}

/* ==========================================================
   Lazy Images
========================================================== */

function initializeLazyImages() {

    const images =

        document.querySelectorAll("img[data-src]");

    if (!images.length) return;

    const observer =

        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const image = entry.target;

                    image.src = image.dataset.src;

                    image.removeAttribute("data-src");

                    observer.unobserve(image);

                }

            });

        });

    images.forEach(image => {

        observer.observe(image);

    });

}

/* ==========================================================
   Tooltips
========================================================== */

function initializeTooltips() {

    const elements =

        document.querySelectorAll("[title]");

    elements.forEach(element => {

        element.addEventListener("mouseenter", () => {

            console.log(

                element.getAttribute("title")

            );

        });

    });

}

/* ==========================================================
   Toast
========================================================== */

function showToast(type, message) {

    const toast =

        document.getElementById(

            type + "Toast"

        );

    if (!toast) return;

    const text =

        document.getElementById(

            type + "ToastMessage"

        );

    if (text) {

        text.textContent = message;

    }

    toast.style.display = "flex";

    setTimeout(() => {

        toast.style.display = "none";

    }, 3000);

}

/* ==========================================================
   Helpers
========================================================== */

function $(selector) {

    return document.querySelector(selector);

}

function $$(selector) {

    return document.querySelectorAll(selector);

}

function goTo(url) {

    window.location.href = url;

}

function reloadPage() {

    location.reload();

}

/* ==========================================================
   App Ready
========================================================== */

window.App = App;

console.log(

    "Polytechnic Hub JavaScript Loaded Successfully"

);
