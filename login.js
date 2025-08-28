// Wait for DOM to be fully loaded before initializing anything
document.addEventListener("DOMContentLoaded", () => {
    // Initialize all animations and functionality
    initMobileMenu();
    initFormValidation();
    initPasswordToggle();
    initButtonEffects();
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

// Form Validation
function initFormValidation() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Reset errors
            usernameError.textContent = '';
            passwordError.textContent = '';
            usernameInput.classList.remove('shake');
            passwordInput.classList.remove('shake');

            // Validate username
            if (!usernameInput.value.trim()) {
                usernameError.textContent = 'Username is required';
                usernameInput.classList.add('shake');
                isValid = false;
            } else if (usernameInput.value.trim().length < 4) {
                usernameError.textContent = 'Username must be at least 4 characters';
                usernameInput.classList.add('shake');
                isValid = false;
            }

            // Validate password
            if (!passwordInput.value) {
                passwordError.textContent = 'Password is required';
                passwordInput.classList.add('shake');
                isValid = false;
            } else if (passwordInput.value.length < 6) {
                passwordError.textContent = 'Password must be at least 6 characters';
                passwordInput.classList.add('shake');
                isValid = false;
            }

            // If valid, simulate form submission
            if (isValid) {
                simulateFormSubmission();
            }
        });

        // Add input event listeners for real-time validation
        usernameInput.addEventListener('input', () => {
            usernameError.textContent = '';
        });

        passwordInput.addEventListener('input', () => {
            passwordError.textContent = '';
        });
    }
}

// Simulate Form Submission with Loading Effect
function simulateFormSubmission() {
    const loginBtn = document.querySelector('.login-btn-submit');
    const btnText = loginBtn.querySelector('.btn-text');
    
    loginBtn.classList.add('loading');
    btnText.textContent = 'Logging in...';
    
    // Simulate API call with setTimeout
    setTimeout(() => {
        loginBtn.classList.remove('loading');
        btnText.textContent = 'Login Successful!';
        
        // Redirect after successful login
        setTimeout(() => {
            window.location.href = 'index.html';  // Change to dashboard URL when ready
        }, 1000);
    }, 2000);
}

// Password Toggle Visibility
function initPasswordToggle() {
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle eye icon
            togglePassword.querySelector('i').classList.toggle('fa-eye');
            togglePassword.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }
}

// Button Hover and Click Effects
function initButtonEffects() {
    const buttons = document.querySelectorAll('.login-btn-submit, .social-btn');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            createRippleEffect(button);
        });
    });
}

// Create Ripple Effect on Button
function createRippleEffect(button) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${0}px`;
    ripple.style.top = `${0}px`;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);  // Match animation duration
}

// Extra Animations for Enhanced UX
function initAnimations() {
    // Animate feature icons on hover
    const featureItems = document.querySelectorAll('.feature-item');
    
    featureItems.forEach(item => {
        const icon = item.querySelector('.feature-icon i');
        
        item.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2)';
        });
        
        item.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1)';
        });
    });
    
    // Login card styling (static, no mouse movement effect)
    const loginCard = document.querySelector('.login-card');
    
    if (loginCard) {
        loginCard.style.transform = 'translateY(-5px)';
    }
    
    // Add pulse animation to register link
    const registerLink = document.querySelector('.register-link');
    
    if (registerLink) {
        setInterval(() => {
            registerLink.style.transform = 'scale(1.05)';
            setTimeout(() => {
                registerLink.style.transform = 'scale(1)';
            }, 500);
        }, 5000);  // Pulse every 5 seconds
    }
}

// Add dynamic styling for ripple effect
const style = document.createElement('style');
style.textContent = `
    .login-btn-submit, .social-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .login-card {
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style); 