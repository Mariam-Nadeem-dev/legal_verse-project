/* =========================================================
   LEGAL VERSE
   Lab 04 Task 2: Dark / Light Mode
   Lab 04 Task 3: Smart Contact Form
   ========================================================= */


/* =========================================================
   TASK 2: DARK / LIGHT MODE
   ========================================================= */

const themeToggle = document.getElementById("themeToggle");

// Apply the selected theme to the website.
function setTheme(theme) {
    const isLight = theme === "light";

    document.body.classList.toggle("light-mode", isLight);

    themeToggle.textContent = isLight
        ? "☾ Dark Mode"
        : "☀ Light Mode";

    themeToggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark mode" : "Switch to light mode"
    );

    themeToggle.setAttribute("aria-pressed", String(isLight));
}

// Load the previously selected theme, if available.
const savedTheme = localStorage.getItem("legalVerseTheme");

setTheme(savedTheme === "light" ? "light" : "dark");

// Change the theme when the button is clicked.
themeToggle.addEventListener("click", function () {
    const nextTheme = document.body.classList.contains("light-mode")
        ? "dark"
        : "light";

    setTheme(nextTheme);

    // Remember the user's theme choice in this browser.
    localStorage.setItem("legalVerseTheme", nextTheme);
});


/* =========================================================
   EXISTING MOBILE NAVIGATION
   Keeps the existing menu functional.
   ========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {

        const isOpen = navMenu.classList.toggle("show");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    // Close the menu after a navigation link is selected.
    navMenu.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("show");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            menuToggle.textContent = "☰";
        });
    });
}


/* =========================================================
   TASK 3: SMART CONTACT FORM
   ========================================================= */

// Select the form and its fields.
const contactForm = document.getElementById("contactForm");

const nameInput = document.getElementById("contactName");
const emailInput = document.getElementById("contactEmail");
const messageInput = document.getElementById("contactMessage");

// Select the error-message elements.
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

// Select the character counter and form status.
const messageCounter = document.getElementById("messageCounter");
const formStatus = document.getElementById("formStatus");


// Remove an error from a field.
function clearFieldError(input, errorElement) {

    input.classList.remove("invalid");
    input.removeAttribute("aria-invalid");

    errorElement.textContent = "";
}


// Display an error for a particular field.
function showFieldError(input, errorElement, message) {

    input.classList.add("invalid");
    input.setAttribute("aria-invalid", "true");

    // textContent displays text safely.
    errorElement.textContent = message;
}


/* LIVE MESSAGE CHARACTER COUNTER */

messageInput.addEventListener("input", function () {

    const characterCount = messageInput.value.length;

    messageCounter.textContent =
        `${characterCount}/1000 characters`;

    clearFieldError(messageInput, messageError);
});


/* CLEAR NAME ERROR WHEN THE USER TYPES */

nameInput.addEventListener("input", function () {

    clearFieldError(nameInput, nameError);
});


/* CLEAR EMAIL ERROR WHEN THE USER TYPES */

emailInput.addEventListener("input", function () {

    clearFieldError(emailInput, emailError);
});


/* VALIDATE THE FORM WHEN SUBMITTED */

contactForm.addEventListener("submit", function (event) {

    // Prevent the browser from refreshing the page.
    event.preventDefault();

    // Clear previous errors and messages.
    clearFieldError(nameInput, nameError);
    clearFieldError(emailInput, emailError);
    clearFieldError(messageInput, messageError);

    formStatus.textContent = "";
    formStatus.className = "form-status";

    // Read the values and remove extra spaces at the beginning
    // and end of each value.
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    let isValid = true;


    /* NAME VALIDATION */

    if (name.length < 3) {

        showFieldError(
            nameInput,
            nameError,
            "Name must be at least 3 characters long."
        );

        isValid = false;
    }


    /* EMAIL VALIDATION */

    // The lab requires using includes() to check the email.
    if (!email.includes("@") || !email.includes(".")) {

        showFieldError(
            emailInput,
            emailError,
            "Please enter an email containing @ and a dot."
        );

        isValid = false;
    }


    /* MESSAGE VALIDATION */

    if (message.length < 10) {

        showFieldError(
            messageInput,
            messageError,
            "Message must be at least 10 characters long."
        );

        isValid = false;
    }


    /* SHOW VALIDATION ERRORS */

    if (!isValid) {

        formStatus.textContent =
            "Please correct the highlighted fields and try again.";

        formStatus.classList.add("error");

        // Move the cursor to the first field with an error.
        const firstInvalidField =
            contactForm.querySelector(".invalid");

        if (firstInvalidField) {
            firstInvalidField.focus();
        }

        return;
    }


    /* SUCCESS MESSAGE */

    formStatus.textContent =
        `Thank you, ${name}! Your form passed validation.`;

    formStatus.classList.add("success");


    // Reset the form after successful validation.
    contactForm.reset();

    // Reset the character counter.
    messageCounter.textContent = "0/1000 characters";

    // Clear any remaining field errors.
    clearFieldError(nameInput, nameError);
    clearFieldError(emailInput, emailError);
    clearFieldError(messageInput, messageError);

});
