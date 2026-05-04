// Wait for page to load before running scripts
document.addEventListener("DOMContentLoaded", function() {

    // --- FORM VALIDATION ---
    var contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();
            validateForm();
        });
    }

    // --- FAQ SETUP ---
    var faqButtons = document.querySelectorAll(".faq-question");
    for (var i = 0; i < faqButtons.length; i++) {
        faqButtons[i].addEventListener("click", function() {
            var answerId = this.getAttribute("data-target");
            toggleFAQ(answerId, this);
        });

        // Allow keyboard Enter and Space to toggle FAQ
        faqButtons[i].addEventListener("keydown", function(event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                var answerId = this.getAttribute("data-target");
                toggleFAQ(answerId, this);
            }
        });
    }

    // --- GALLERY SETUP ---
    var galleryItems = document.querySelectorAll(".gallery-item");
    for (var i = 0; i < galleryItems.length; i++) {
        galleryItems[i].addEventListener("click", function() {
            var title = this.getAttribute("data-title");
            var desc = this.getAttribute("data-description");
            openGallery(title, desc);
        });

        // Allow keyboard activation for gallery items
        galleryItems[i].addEventListener("keydown", function(event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                var title = this.getAttribute("data-title");
                var desc = this.getAttribute("data-description");
                openGallery(title, desc);
            }
        });
    }

    // --- MODAL CLOSE BUTTON ---
    var closeBtn = document.querySelector(".close");
    if (closeBtn) {
        closeBtn.addEventListener("click", function() {
            closeGallery();
        });
    }

    // Close modal when clicking outside of it
    var modal = document.getElementById("gallery-modal");
    if (modal) {
        modal.addEventListener("click", function(event) {
            if (event.target === modal) {
                closeGallery();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            closeGallery();
        }
    });

    // --- DYNAMIC PAGE GREETING ---
    var introSection = document.querySelector(".intro h2");
    if (introSection) {
        var hour = new Date().getHours();
        var greeting = "Welcome to DevFlow";
        if (hour < 12) {
            greeting = "Good Morning! Welcome to DevFlow";
        } else if (hour < 18) {
            greeting = "Good Afternoon! Welcome to DevFlow";
        } else {
            greeting = "Good Evening! Welcome to DevFlow";
        }
        introSection.textContent = greeting;
    }

    // --- DYNAMIC YEAR IN FOOTER ---
    var footerYear = document.querySelector(".footer p");
    if (footerYear) {
        var currentYear = new Date().getFullYear();
        footerYear.innerHTML = "&copy; " + currentYear + " DevFlow. All rights reserved.";
    }

});

// Form validation function
function validateForm() {
    var nameField = document.getElementById("name");
    var emailField = document.getElementById("email");
    var subjectField = document.getElementById("subject");
    var messageField = document.getElementById("message");

    // Clear old errors first
    clearErrors();

    var isValid = true;

    // Check name
    if (nameField.value.trim() === "") {
        showError(nameField, "Name is required");
        isValid = false;
    }

    // Check email
    if (emailField.value.trim() === "") {
        showError(emailField, "Email is required");
        isValid = false;
    } else if (!isValidEmail(emailField.value.trim())) {
        showError(emailField, "Please enter a valid email address");
        isValid = false;
    }

    // Check subject
    if (subjectField.value.trim() === "") {
        showError(subjectField, "Subject is required");
        isValid = false;
    }

    // Check message
    if (messageField.value.trim() === "") {
        showError(messageField, "Message is required");
        isValid = false;
    } else if (messageField.value.trim().length < 10) {
        showError(messageField, "Message must be at least 10 characters");
        isValid = false;
    }

    // If everything passes, show success
    if (isValid) {
        var form = document.getElementById("contact-form");
        var successMsg = document.createElement("p");
        successMsg.id = "success-msg";
        successMsg.textContent = "Thank you! Your message has been sent successfully.";
        successMsg.style.color = "green";
        successMsg.style.fontWeight = "bold";
        successMsg.style.marginTop = "15px";
        form.parentNode.insertBefore(successMsg, form.nextSibling);

        form.reset();

        // Remove success message after 4 seconds
        setTimeout(function() {
            var msg = document.getElementById("success-msg");
            if (msg) {
                msg.remove();
            }
        }, 4000);
    }
}

// Check if email format is valid
function isValidEmail(email) {
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

// Show error message below a field
function showError(field, message) {
    var errorP = document.createElement("p");
    errorP.className = "error-msg";
    errorP.textContent = message;
    field.parentNode.appendChild(errorP);
    field.style.borderColor = "red";
    field.setAttribute("aria-invalid", "true");
}

// Clear all error messages from the form
function clearErrors() {
    var oldErrors = document.querySelectorAll(".error-msg");
    for (var i = 0; i < oldErrors.length; i++) {
        oldErrors[i].remove();
    }

    var fields = document.querySelectorAll("#contact-form input, #contact-form textarea");
    for (var i = 0; i < fields.length; i++) {
        fields[i].style.borderColor = "";
        fields[i].removeAttribute("aria-invalid");
    }

    // Remove old success message if there is one
    var oldSuccess = document.getElementById("success-msg");
    if (oldSuccess) {
        oldSuccess.remove();
    }
}

// Open the gallery modal and display info
function openGallery(title, description) {
    var modal = document.getElementById("gallery-modal");
    var modalTitle = document.getElementById("modal-title");
    var modalDesc = document.getElementById("modal-description");

    if (modal && modalTitle && modalDesc) {
        modalTitle.textContent = title;
        modalDesc.textContent = description;
        modal.style.display = "block";
        modal.setAttribute("aria-hidden", "false");

        // Move focus to the close button for accessibility
        var closeBtn = document.querySelector(".close");
        if (closeBtn) {
            closeBtn.focus();
        }
    }
}

// Close the gallery modal
function closeGallery() {
    var modal = document.getElementById("gallery-modal");
    if (modal) {
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
    }
}

// Toggle FAQ answer visibility
function toggleFAQ(faqId, button) {
    var targetAnswer = document.getElementById(faqId);
    if (!targetAnswer) return;

    var allAnswers = document.querySelectorAll(".faq-answer");
    var allButtons = document.querySelectorAll(".faq-question");

    // Close all other answers
    for (var i = 0; i < allAnswers.length; i++) {
        if (allAnswers[i].id !== faqId) {
            allAnswers[i].style.display = "none";
            allButtons[i].setAttribute("aria-expanded", "false");
        }
    }

    // Toggle the clicked one
    if (targetAnswer.style.display === "block") {
        targetAnswer.style.display = "none";
        button.setAttribute("aria-expanded", "false");
    } else {
        targetAnswer.style.display = "block";
        button.setAttribute("aria-expanded", "true");
    }
}
