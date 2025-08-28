// Wait for DOM to be fully loaded before initializing anything
document.addEventListener("DOMContentLoaded", () => {
    // Initialize all functionalities
    initMobileMenu();
    initFormSteps();
    initFormValidation();
    initFileUploads();
    initAnimations();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');

    if (mobileMenuToggle && mobileMenu && mobileMenuClose) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
}

// Multi-step Form Navigation
function initFormSteps() {
    const formSteps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const progressBar = document.getElementById('progressBar');
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');
    
    if (!formSteps.length || !progressSteps.length) return;

    // Update progress bar
    function updateProgressBar(currentStep) {
        const stepPercentage = ((currentStep - 1) / (progressSteps.length - 1)) * 100;
        progressBar.style.width = `${stepPercentage}%`;
        
        // Update step status
        progressSteps.forEach((step, index) => {
            if (index + 1 < currentStep) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else if (index + 1 === currentStep) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active', 'completed');
            }
        });
    }

    // Go to specific step
    function goToStep(currentStep, targetStep) {
        if (targetStep < 1 || targetStep > formSteps.length) return;
        
        // Hide current step with animation
        formSteps[currentStep - 1].classList.add('fade-out');
        
        setTimeout(() => {
            // Hide all steps
            formSteps.forEach(step => {
                step.classList.remove('active', 'fade-in', 'fade-out');
            });
            
            // Show target step with animation
            formSteps[targetStep - 1].classList.add('active', 'fade-in');
            
            // Update progress
            updateProgressBar(targetStep);
            
            // Scroll to top of form
            document.querySelector('.register-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    }

    // Initialize progress bar
    updateProgressBar(1);

    // Next button functionality
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            const currentStep = parseInt(button.closest('.form-step').getAttribute('data-step'));
            const targetStep = parseInt(button.getAttribute('data-next'));
            
            // If it's the final submit button
            if (button.classList.contains('submit-btn')) {
                if (validateStep(currentStep)) {
                    // Simulate form submission
                    simulateFormSubmission(button);
                    setTimeout(() => {
                        goToStep(currentStep, targetStep);
                        simulateCompletionData();
                    }, 1500);
                }
            } else {
                // Regular next button - validate before proceeding
                if (validateStep(currentStep)) {
                    goToStep(currentStep, targetStep);
                }
            }
        });
    });

    // Previous button functionality
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            const currentStep = parseInt(button.closest('.form-step').getAttribute('data-step'));
            const targetStep = parseInt(button.getAttribute('data-prev'));
            goToStep(currentStep, targetStep);
        });
    });

    // Step progress click functionality - direct navigation
    progressSteps.forEach(step => {
        step.addEventListener('click', () => {
            // Only allow clicking to already completed steps
            if (step.classList.contains('completed')) {
                const targetStep = parseInt(step.getAttribute('data-step'));
                const currentStep = document.querySelector('.form-step.active').getAttribute('data-step');
                goToStep(parseInt(currentStep), targetStep);
            }
        });
    });
}

// Form Validation Functions
function initFormValidation() {
    const form = document.getElementById('registrationForm');
    
    if (!form) return;
    
    // Add input event listeners to clear errors on type
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const errorSpan = document.getElementById(`${input.id}Error`);
            if (errorSpan) {
                errorSpan.textContent = '';
                input.classList.remove('error-input');
            }
        });
    });
}

// Validate Step Based on Current Step Number
function validateStep(stepNumber) {
    switch(stepNumber) {
        case 1:
            return validatePersonalInfo();
        case 2:
            return validateDocuments();
        case 3:
            return validateBusinessDetails();
        default:
            return true;
    }
}

// Validate Personal Information (Step 1)
function validatePersonalInfo() {
    let isValid = true;
    
    // First Name Validation
    const firstName = document.getElementById('firstName');
    const firstNameError = document.getElementById('firstNameError');
    if (!firstName.value.trim()) {
        firstNameError.textContent = 'First name is required';
        firstName.classList.add('error-input', 'shake');
        isValid = false;
    } else if (firstName.value.trim().length < 2) {
        firstNameError.textContent = 'First name must be at least 2 characters';
        firstName.classList.add('error-input', 'shake');
        isValid = false;
    }
    
    // Last Name Validation
    const lastName = document.getElementById('lastName');
    const lastNameError = document.getElementById('lastNameError');
    if (!lastName.value.trim()) {
        lastNameError.textContent = 'Last name is required';
        lastName.classList.add('error-input', 'shake');
        isValid = false;
    }
    
    // Email Validation
    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        emailError.textContent = 'Email address is required';
        email.classList.add('error-input', 'shake');
        isValid = false;
    } else if (!emailPattern.test(email.value.trim())) {
        emailError.textContent = 'Please enter a valid email address';
        email.classList.add('error-input', 'shake');
        isValid = false;
    }
    
    // Phone Validation
    const phone = document.getElementById('phone');
    const phoneError = document.getElementById('phoneError');
    const phonePattern = /^[0-9]{10}$/;
    if (!phone.value.trim()) {
        phoneError.textContent = 'Phone number is required';
        phone.classList.add('error-input', 'shake');
        isValid = false;
    } else if (!phonePattern.test(phone.value.trim())) {
        phoneError.textContent = 'Please enter a valid 10-digit phone number';
        phone.classList.add('error-input', 'shake');
        isValid = false;
    }
    
    // Date of Birth Validation
    const dob = document.getElementById('dob');
    const dobError = document.getElementById('dobError');
    if (!dob.value) {
        dobError.textContent = 'Date of birth is required';
        dob.classList.add('error-input', 'shake');
        isValid = false;
    } else {
        // Check if user is at least 18 years old
        const dobDate = new Date(dob.value);
        const now = new Date();
        const eighteenYearsAgo = new Date(now.getFullYear() - 18, now.getMonth(), now.getDate());
        
        if (dobDate > eighteenYearsAgo) {
            dobError.textContent = 'You must be at least 18 years old';
            dob.classList.add('error-input', 'shake');
            isValid = false;
        }
    }
    
    // Gender Validation
    const gender = document.getElementById('gender');
    const genderError = document.getElementById('genderError');
    if (!gender.value) {
        genderError.textContent = 'Please select your gender';
        gender.classList.add('error-input', 'shake');
        isValid = false;
    }
    
    // Remove shake animation after it completes
    setTimeout(() => {
        document.querySelectorAll('.shake').forEach(element => {
            element.classList.remove('shake');
        });
    }, 500);
    
    return isValid;
}

// Validate Documents (Step 2)
function validateDocuments() {
    let isValid = true;
    
    // Aadhaar Validation
    const aadhaar = document.getElementById('aadhaar');
    const aadhaarError = document.getElementById('aadhaarError');
    if (!aadhaar.files || !aadhaar.files[0]) {
        aadhaarError.textContent = 'Aadhaar card is required';
        aadhaar.closest('.file-upload').classList.add('error-input', 'shake');
        isValid = false;
    } else if (aadhaar.files[0].size > 5 * 1024 * 1024) { // 5MB limit
        aadhaarError.textContent = 'File size should not exceed 5MB';
        aadhaar.closest('.file-upload').classList.add('error-input', 'shake');
        isValid = false;
    }
    
    // PAN Validation
    const pan = document.getElementById('pan');
    const panError = document.getElementById('panError');
    if (!pan.files || !pan.files[0]) {
        panError.textContent = 'PAN card is required';
        pan.closest('.file-upload').classList.add('error-input', 'shake');
        isValid = false;
    } else if (pan.files[0].size > 5 * 1024 * 1024) { // 5MB limit
        panError.textContent = 'File size should not exceed 5MB';
        pan.closest('.file-upload').classList.add('error-input', 'shake');
        isValid = false;
    }
    
    // Passport Photo Validation
    const passportPhoto = document.getElementById('passportPhoto');
    const passportPhotoError = document.getElementById('passportPhotoError');
    if (!passportPhoto.files || !passportPhoto.files[0]) {
        passportPhotoError.textContent = 'Passport photo is required';
        passportPhoto.closest('.file-upload').classList.add('error-input', 'shake');
        isValid = false;
    } else if (passportPhoto.files[0].size > 5 * 1024 * 1024) { // 5MB limit
        passportPhotoError.textContent = 'File size should not exceed 5MB';
        passportPhoto.closest('.file-upload').classList.add('error-input', 'shake');
        isValid = false;
    }
    
    // Remove shake animation after it completes
    setTimeout(() => {
        document.querySelectorAll('.shake').forEach(element => {
            element.classList.remove('shake');
        });
    }, 500);
    
    return isValid;
}

// Validate Business Details (Step 3)
function validateBusinessDetails() {
    let isValid = true;
    
    // Business Name Validation
    const businessName = document.getElementById('businessName');
    const businessNameError = document.getElementById('businessNameError');
    if (!businessName.value.trim()) {
        businessNameError.textContent = 'Business name is required';
        businessName.classList.add('error-input', 'shake');
        isValid = false;
    }
    
    // Business Type Validation
    const businessType = document.getElementById('businessType');
    const businessTypeError = document.getElementById('businessTypeError');
    if (!businessType.value) {
        businessTypeError.textContent = 'Please select business type';
        businessType.classList.add('error-input', 'shake');
        isValid = false;
    }
    
    // Address Validation
    const address = document.getElementById('address');
    const addressError = document.getElementById('addressError');
    if (!address.value.trim()) {
        addressError.textContent = 'Business address is required';
        address.classList.add('error-input', 'shake');
        isValid = false;
    }
    
    // City Validation
    const city = document.getElementById('city');
    const cityError = document.getElementById('cityError');
    if (!city.value.trim()) {
        cityError.textContent = 'City is required';
        city.classList.add('error-input', 'shake');
        isValid = false;
    }
    
    // State Validation
    const state = document.getElementById('state');
    const stateError = document.getElementById('stateError');
    if (!state.value) {
        stateError.textContent = 'Please select your state';
        state.classList.add('error-input', 'shake');
        isValid = false;
    }
    
    // PIN Code Validation
    const pincode = document.getElementById('pincode');
    const pincodeError = document.getElementById('pincodeError');
    const pincodePattern = /^[0-9]{6}$/;
    if (!pincode.value.trim()) {
        pincodeError.textContent = 'PIN code is required';
        pincode.classList.add('error-input', 'shake');
        isValid = false;
    } else if (!pincodePattern.test(pincode.value.trim())) {
        pincodeError.textContent = 'Please enter a valid 6-digit PIN code';
        pincode.classList.add('error-input', 'shake');
        isValid = false;
    }
    
    // GST Validation (optional) - Validate format if provided
    const gst = document.getElementById('gst');
    const gstError = document.getElementById('gstError');
    const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    if (gst.value.trim() && !gstPattern.test(gst.value.trim())) {
        gstError.textContent = 'Please enter a valid GST number';
        gst.classList.add('error-input', 'shake');
        isValid = false;
    }
    
    // Terms Validation
    const terms = document.getElementById('terms');
    const termsError = document.getElementById('termsError');
    if (!terms.checked) {
        termsError.textContent = 'You must agree to the terms and conditions';
        terms.classList.add('error-input', 'shake');
        isValid = false;
    }
    
    // Remove shake animation after it completes
    setTimeout(() => {
        document.querySelectorAll('.shake').forEach(element => {
            element.classList.remove('shake');
        });
    }, 500);
    
    return isValid;
}

// Initialize File Upload Custom UI
function initFileUploads() {
    const fileInputs = document.querySelectorAll('input[type="file"]');
    
    fileInputs.forEach(input => {
        const fileUploadLabel = input.nextElementSibling;
        const fileName = fileUploadLabel.nextElementSibling;
        
        input.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                fileName.textContent = this.files[0].name;
                
                // Add the "has-file" class to the file upload container
                this.closest('.file-upload').classList.add('has-file');
                
                // Remove error styling if any
                this.closest('.file-upload').classList.remove('error-input');
                const errorSpan = document.getElementById(`${this.id}Error`);
                if (errorSpan) {
                    errorSpan.textContent = '';
                }
            } else {
                fileName.textContent = 'No file chosen';
                this.closest('.file-upload').classList.remove('has-file');
            }
        });
        
        // Styling for the file upload label
        fileUploadLabel.addEventListener('mouseenter', () => {
            fileUploadLabel.style.backgroundColor = '#004AAD';
            fileUploadLabel.style.color = 'white';
        });
        
        fileUploadLabel.addEventListener('mouseleave', () => {
            fileUploadLabel.style.backgroundColor = '#f8f9fa';
            fileUploadLabel.style.color = '#333';
        });
    });
}

// Simulate Form Submission
function simulateFormSubmission(button) {
    // Create loading effect
    const btnText = button.querySelector('.btn-text');
    const originalText = btnText.textContent;
    
    button.disabled = true;
    button.classList.add('loading');
    btnText.textContent = 'Processing...';
    
    // Simulate API call delay
    setTimeout(() => {
        button.classList.remove('loading');
        btnText.textContent = originalText;
        button.disabled = false;
    }, 1500);
}

// Generate Completion Data
function simulateCompletionData() {
    // Generate random application ID
    const applicationId = document.getElementById('applicationId');
    const randomId = 'CSC' + Math.floor(100000000 + Math.random() * 900000000);
    applicationId.textContent = randomId;
    
    // Set current date for submission
    const submissionDate = document.getElementById('submissionDate');
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    submissionDate.textContent = now.toLocaleDateString('en-US', options);
    
    // Animate completion icon
    const completionIcon = document.querySelector('.completion-icon i');
    completionIcon.style.transform = 'scale(0)';
    
    setTimeout(() => {
        completionIcon.style.transition = 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        completionIcon.style.transform = 'scale(1.2)';
        
        setTimeout(() => {
            completionIcon.style.transform = 'scale(1)';
        }, 200);
    }, 300);
}

// Animations and UI Enhancements
function initAnimations() {
    // Add floating animation on hover to buttons
    const buttons = document.querySelectorAll('.next-btn, .prev-btn, .submit-btn, .home-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px)';
            button.style.boxShadow = '0 7px 14px rgba(0, 0, 0, 0.1)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Add growing underline effect to terms links
    const termsLinks = document.querySelectorAll('.terms-link');
    
    termsLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.textDecoration = 'none';
            link.style.backgroundImage = 'linear-gradient(0deg, #004AAD 0%, #004AAD 100%)';
            link.style.backgroundRepeat = 'no-repeat';
            link.style.backgroundSize = '100% 2px';
            link.style.backgroundPosition = '0 100%';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.backgroundSize = '0% 2px';
        });
    });
    
    // Add shimmer effect to progress steps when completed
    const progressSteps = document.querySelectorAll('.progress-step');
    
    function addShimmer(step) {
        if (step.classList.contains('completed')) {
            step.classList.add('shimmer');
            setTimeout(() => {
                step.classList.remove('shimmer');
            }, 1000);
        }
    }
    
    // Add shimmer on first load
    setTimeout(() => {
        progressSteps.forEach(addShimmer);
    }, 500);
    
    // Add shimmer when a step becomes completed
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target.classList.contains('completed') && 
                mutation.oldValue && !mutation.oldValue.includes('completed')) {
                addShimmer(mutation.target);
            }
        });
    });
    
    progressSteps.forEach(step => {
        observer.observe(step, { 
            attributes: true,
            attributeFilter: ['class'],
            attributeOldValue: true
        });
    });
}

// Add required CSS for animations
const style = document.createElement('style');
style.textContent = `
    /* Step transitions */
    .form-step {
        display: none;
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    .form-step.active {
        display: block;
        opacity: 1;
        transform: translateY(0);
    }
    
    .form-step.fade-in {
        animation: fadeIn 0.5s forwards;
    }
    
    .form-step.fade-out {
        animation: fadeOut 0.3s forwards;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
    
    /* Error animation */
    .error-input {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.25) !important;
    }
    
    @keyframes shake {
        0%, 100% {transform: translateX(0);}
        10%, 30%, 50%, 70%, 90% {transform: translateX(-5px);}
        20%, 40%, 60%, 80% {transform: translateX(5px);}
    }
    
    .shake {
        animation: shake 0.5s ease-in-out;
    }
    
    /* Shimmer effect */
    .shimmer {
        position: relative;
        overflow: hidden;
    }
    
    .shimmer::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
        animation: shimmer 1s ease;
    }
    
    @keyframes shimmer {
        to {
            left: 100%;
        }
    }
    
    /* Loading button */
    .next-btn.loading .btn-text, .submit-btn.loading .btn-text {
        visibility: hidden;
    }
    
    .next-btn.loading::after, .submit-btn.loading::after {
        content: "";
        position: absolute;
        width: 20px;
        height: 20px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 1s linear infinite;
        top: calc(50% - 10px);
        left: calc(50% - 10px);
    }
    
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
    
    /* File upload animation */
    .file-upload.has-file .file-upload-label {
        background-color: #28a745 !important;
        color: white !important;
    }
    
    .file-upload.has-file .file-upload-label i {
        transform: rotate(180deg);
    }
`;
document.head.appendChild(style); 