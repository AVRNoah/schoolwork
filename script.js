// Validate Form
function validateForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;
    
    clearErrors();
    
    var isValid = true;
    
    if (name == "") {
        showError("name", "Name is required");
        isValid = false;
    }
    
    if (email == "") {
        showError("email", "Email is required");
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError("email", "Please enter a valid email");
        isValid = false;
    }
    
    if (subject == "") {
        showError("subject", "Subject is required");
        isValid = false;
    }
    
    if (message == "") {
        showError("message", "Message is required");
        isValid = false;
    } else if (message.length < 10) {
        showError("message", "Message must be at least 10 characters");
        isValid = false;
    }
    
    if (isValid) {
        alert("Thank you! Your message has been sent.");
        document.getElementById("contact-form").reset();
    }
    
    return false;
}

function isValidEmail(email) {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function showError(fieldId, message) {
    var field = document.getElementById(fieldId);
    var error = document.createElement("p");
    error.className = "error-msg";
    error.textContent = message;
    field.parentNode.appendChild(error);
    field.style.borderColor = "red";
}

function clearErrors() {
    var errors = document.querySelectorAll(".error-msg");
    for (var i = 0; i < errors.length; i++) {
        errors[i].remove();
    }
    
    var inputs = document.querySelectorAll("input, textarea");
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].style.borderColor = "";
    }
}

// Gallery
function openGallery(title, content) {
    var modal = document.getElementById("gallery-modal");
    var modalTitle = document.getElementById("modal-title");
    var modalContent = document.getElementById("modal-content");
    
    modalTitle.textContent = title;
    modalContent.textContent = content;
    modal.style.display = "block";
}

function closeGallery() {
    var modal = document.getElementById("gallery-modal");
    modal.style.display = "none";
}

window.onclick = function(event) {
    var modal = document.getElementById("gallery-modal");
    if (modal && event.target == modal) {
        modal.style.display = "none";
    }
}

// FAQ
function toggleFAQ(faqId) {
    var faqAnswer = document.getElementById(faqId);
    
    var allAnswers = document.querySelectorAll(".faq-answer");
    for (var i = 0; i < allAnswers.length; i++) {
        if (allAnswers[i].id !== faqId) {
            allAnswers[i].style.display = "none";
        }
    }
    
    if (faqAnswer.style.display === "none" || faqAnswer.style.display === "") {
        faqAnswer.style.display = "block";
    } else {
        faqAnswer.style.display = "none";
    }
}
