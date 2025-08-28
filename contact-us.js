// Mobile Menu Toggle
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

// Scroll Animation for Sections
const sections = document.querySelectorAll('section');

// Initialize section animations immediately to prevent flash of unstyled content
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
});

// Set up intersection observer for animation on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Start observing sections after they've been styled
setTimeout(() => {
    sections.forEach(section => {
        observer.observe(section);
    });
}, 100);

// Contact Cards Hover Effect
const contactCards = document.querySelectorAll('.contact-card');
contactCards.forEach(card => {
    const icon = card.querySelector('.icon');
    if (icon) {
        card.addEventListener('mouseover', () => {
            card.style.transform = 'translateY(-5px)';
            icon.style.transform = 'scale(1.2)';
            icon.style.color = '#FF6600';
        });

        card.addEventListener('mouseout', () => {
            card.style.transform = 'translateY(0)';
            icon.style.transform = 'scale(1)';
            icon.style.color = '#004AAD';
        });
    }
});

// FAQ Accordion
const accordionItems = document.querySelectorAll('.accordion-item');
accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    
    if (header) {
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all accordions
            accordionItems.forEach(accItem => {
                accItem.classList.remove('active');
                const icon = accItem.querySelector('.toggle-icon i');
                if (icon) {
                    icon.className = 'fas fa-plus';
                }
            });
            
            // Open the clicked one if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                const icon = item.querySelector('.toggle-icon i');
                if (icon) {
                    icon.className = 'fas fa-minus';
                }
            }
        });
    }
});

// Form Validation and Submission
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Basic validation
        if (!name || !email || !phone || !subject || !message) {
            showFormStatus('Please fill all the fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormStatus('Please enter a valid email address', 'error');
            return;
        }
        
        // Phone validation
        const phoneRegex = /^[0-9]{10,12}$/;
        if (!phoneRegex.test(phone.replace(/[^0-9]/g, ''))) {
            showFormStatus('Please enter a valid phone number', 'error');
            return;
        }
        
        // Simulate form submission
        showFormStatus('Sending your message...', 'info');
        
        // Here you would normally send the data to your server
        // For demo purposes, we'll just simulate a successful submission after a delay
        setTimeout(() => {
            showFormStatus('Your message has been sent successfully!', 'success');
            contactForm.reset();
        }, 1500);
    });
}

function showFormStatus(message, type) {
    if (formStatus) {
        formStatus.textContent = message;
        formStatus.className = 'form-status ' + type;
        
        // Hide the status message after 5 seconds for success messages
        if (type === 'success') {
            setTimeout(() => {
                formStatus.className = 'form-status';
            }, 5000);
        }
    }
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return; // Skip empty hrefs
        
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
});

// Active Navigation Link based on Scroll Position
const navLinks = document.querySelectorAll('.main-nav a');
const navSections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    let currentPos = window.pageYOffset;
    
    navSections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (currentPos >= sectionTop && currentPos < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && href.includes(current)) {
            link.classList.add('active');
        }
    });
});

// Parallax Effect for Banner
const banner = document.querySelector('.contact-banner');
if (banner) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        banner.style.backgroundPositionY = -(scrolled * 0.3) + 'px';
    });
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations for sections with a slight delay between them
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 150);
    });
    
    // Expand first accordion item by default
    const firstAccordion = document.querySelector('.accordion-item');
    if (firstAccordion) {
        firstAccordion.classList.add('active');
        const icon = firstAccordion.querySelector('.toggle-icon i');
        if (icon) {
            icon.className = 'fas fa-minus';
        }
    }
    
    // Add form status styles
    if (formStatus) {
        formStatus.innerHTML = `
            <div class="info">Feel free to contact us for any inquiries or support needs.</div>
        `;
        formStatus.className = 'form-status';
    }
});
