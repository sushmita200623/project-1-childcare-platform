/* ================================
   LITTLE STEPS FRONTEND JAVASCRIPT
================================ */


/* LOGIN */

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (email && password) {

            localStorage.setItem("littleStepsUser", email);

            alert("Login successful! Welcome to Little Steps.");

            window.location.href = "dashboard.html";
        }
    });
}


function demoLogin() {

    localStorage.setItem(
        "littleStepsUser",
        "demo@littlesteps.com"
    );

    window.location.href = "dashboard.html";
}


/* LOGOUT */

function logout() {

    localStorage.removeItem("littleStepsUser");

    alert("You have been logged out.");

    window.location.href = "index.html";
}


/* CAREGIVER SEARCH */

function searchCaregivers() {

    const searchInput =
        document.getElementById("caregiverSearch");

    if (!searchInput) return;

    const search =
        searchInput.value.toLowerCase();

    const cards =
        document.querySelectorAll(".caregiver-card");

    cards.forEach(card => {

        const name =
            card.dataset.name.toLowerCase();

        const service =
            card.dataset.service.toLowerCase();

        if (
            name.includes(search) ||
            service.includes(search)
        ) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}


/* CAREGIVER FILTER */

function filterCaregivers() {

    const ratingFilter =
        document.getElementById("ratingFilter");

    const serviceFilter =
        document.getElementById("serviceFilter");

    if (!ratingFilter || !serviceFilter) return;

    const rating =
        ratingFilter.value;

    const service =
        serviceFilter.value;

    const cards =
        document.querySelectorAll(".caregiver-card");

    cards.forEach(card => {

        const cardRating =
            parseFloat(card.dataset.rating);

        const cardServices =
            card.dataset.service;

        const ratingMatch =
            rating === "all" ||
            cardRating >= parseFloat(rating);

        const serviceMatch =
            service === "all" ||
            cardServices.includes(service);

        if (ratingMatch && serviceMatch) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}


/* CHILD PROFILE */

const childForm =
    document.getElementById("childForm");

if (childForm) {

    childForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const childName =
                document.getElementById("childName").value;

            const childAge =
                document.getElementById("childAge").value;

            const allergies =
                document.getElementById("allergies").value;

            const instructions =
                document.getElementById("instructions").value;

            const childData = {
                name: childName,
                age: childAge,
                allergies: allergies,
                instructions: instructions
            };

            localStorage.setItem(
                "childProfile",
                JSON.stringify(childData)
            );

            document.getElementById(
                "childMessage"
            ).textContent =
                "✓ Child profile saved successfully!";
        }
    );
}


/* BOOKING */

const bookingForm =
    document.getElementById("bookingForm");

if (bookingForm) {

    const caregiver =
        document.getElementById("caregiver");

    const service =
        document.getElementById("service");

    const startTime =
        document.getElementById("startTime");

    const endTime =
        document.getElementById("endTime");

    function updateBookingSummary() {

        const rate =
            parseInt(caregiver.value);

        const caregiverName =
            caregiver.options[
                caregiver.selectedIndex
            ].text.split(" - ")[0];

        document.getElementById(
            "summaryCaregiver"
        ).textContent = caregiverName;

        document.getElementById(
            "summaryRate"
        ).textContent = "₹" + rate;

        document.getElementById(
            "summaryService"
        ).textContent = service.value;

        let hours = 1;

        if (startTime.value && endTime.value) {

            const start =
                startTime.value.split(":");

            const end =
                endTime.value.split(":");

            const startMinutes =
                parseInt(start[0]) * 60 +
                parseInt(start[1]);

            const endMinutes =
                parseInt(end[0]) * 60 +
                parseInt(end[1]);

            if (endMinutes > startMinutes) {

                hours =
                    (endMinutes - startMinutes) / 60;

                hours =
                    Math.ceil(hours);
            }
        }

        const total =
            rate * hours;

        document.getElementById(
            "summaryHours"
        ).textContent = hours;

        document.getElementById(
            "summaryTotal"
        ).textContent = "₹" + total;
    }

    caregiver.addEventListener(
        "change",
        updateBookingSummary
    );

    service.addEventListener(
        "change",
        updateBookingSummary
    );

    startTime.addEventListener(
        "change",
        updateBookingSummary
    );

    endTime.addEventListener(
        "change",
        updateBookingSummary
    );

    bookingForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const booking = {

                child:
                    document.getElementById(
                        "bookingChild"
                    ).value,

                caregiver:
                    caregiver.options[
                        caregiver.selectedIndex
                    ].text.split(" - ")[0],

                date:
                    document.getElementById(
                        "bookingDate"
                    ).value,

                start:
                    startTime.value,

                end:
                    endTime.value,

                service:
                    service.value,

                notes:
                    document.getElementById(
                        "bookingNotes"
                    ).value
            };

            localStorage.setItem(
                "latestBooking",
                JSON.stringify(booking)
            );

            alert(
                "Booking details saved! Moving to payment."
            );

            window.location.href = "payment.html";
        }
    );

    updateBookingSummary();
}


/* PAYMENT */

function makePayment() {

    const selectedPayment =
        document.querySelector(
            'input[name="payment"]:checked'
        );

    if (!selectedPayment) {

        alert("Please select a payment method.");

        return;
    }

    localStorage.setItem(
        "paymentStatus",
        "Paid"
    );

    localStorage.setItem(
        "paymentMethod",
        selectedPayment.value
    );

    alert(
        "✓ Demo payment successful!\nYour booking is confirmed."
    );

    window.location.href =
        "care-status.html";
}


/* CAREGIVER CONTACT */

function contactCaregiver() {

    alert(
        "📞 Demo Call\n\nConnecting with Priya Sharma..."
    );
}


/* SOS */

function activateSOS() {

    const message =
        document.getElementById("sosMessage");

    if (!message) return;

    const confirmation =
        confirm(
            "Are you sure you want to activate Emergency SOS?"
        );

    if (confirmation) {

        localStorage.setItem(
            "emergencyStatus",
            "ACTIVE"
        );

        message.innerHTML =
            "🚨 SOS ACTIVATED! Emergency contacts have been notified in this demo.";

        message.style.background = "#ffe2e2";
        message.style.padding = "15px";
        message.style.borderRadius = "10px";
    }
}


/* EMERGENCY CALL */

function callDemo(name) {

    alert(
        "📞 Demo Call\n\nCalling " +
        name +
        "..."
    );
}


/* REVIEWS */

let selectedRating = 0;

function selectStar(rating) {

    selectedRating = rating;

    const stars =
        document.querySelectorAll(
            "#starRating span"
        );

    stars.forEach((star, index) => {

        if (index < rating) {
            star.classList.add("active");
        } else {
            star.classList.remove("active");
        }
    });

    document.getElementById(
        "ratingText"
    ).textContent =
        rating + " out of 5 stars selected";
}


function submitReview() {

    const review =
        document.getElementById(
            "reviewText"
        ).value;

    const message =
        document.getElementById(
            "reviewMessage"
        );

    if (selectedRating === 0) {

        message.textContent =
            "Please select a rating.";

        message.style.color = "red";

        return;
    }

    if (!review.trim()) {

        message.textContent =
            "Please write a review.";

        message.style.color = "red";

        return;
    }

    localStorage.setItem(
        "latestReview",
        JSON.stringify({
            rating: selectedRating,
            review: review
        })
    );

    message.textContent =
        "✓ Thank you! Your review has been submitted.";

    message.style.color = "green";

    document.getElementById(
        "reviewText"
    ).value = "";
}


/* ADMIN */

function resolveAlerts() {

    alert(
        "✓ Emergency alerts marked as resolved in this demo."
    );
}


/* SET DEFAULT BOOKING DATE */

const bookingDate =
    document.getElementById("bookingDate");

if (bookingDate) {

    const today =
        new Date().toISOString().split("T")[0];

    bookingDate.min = today;
}


/* LOAD SAVED CHILD PROFILE */

const savedChild =
    localStorage.getItem("childProfile");

if (savedChild) {

    try {

        const data =
            JSON.parse(savedChild);

        const childName =
            document.getElementById("childName");

        const childAge =
            document.getElementById("childAge");

        if (childName && data.name) {
            childName.value = data.name;
        }

        if (childAge && data.age) {
            childAge.value = data.age;
        }

    } catch (error) {

        console.log(
            "Unable to load child profile."
        );
    }
}