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

// Service Card Hover Effects
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    const icon = card.querySelector('.service-icon');
    if (icon) {
        card.addEventListener('mouseover', () => {
            card.style.transform = 'translateY(-10px)';
            icon.style.transform = 'rotateY(180deg)';
        });

        card.addEventListener('mouseout', () => {
            card.style.transform = 'translateY(0)';
            icon.style.transform = 'rotateY(0)';
        });
    }
});

// Why Choose Us Box Hover Effects
const whyBoxes = document.querySelectorAll('.why-box');
whyBoxes.forEach(box => {
    const icon = box.querySelector('.why-icon');
    if (icon) {
        box.addEventListener('mouseover', () => {
            box.style.transform = 'translateY(-10px)';
            icon.style.color = 'var(--accent-color)';
            icon.style.transform = 'scale(1.1)';
        });

        box.addEventListener('mouseout', () => {
            box.style.transform = 'translateY(0)';
            icon.style.color = 'var(--primary-color)';
            icon.style.transform = 'scale(1)';
        });
    }
});

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

// Parallax Effect for CTA Section
const ctaSection = document.querySelector('.cta-section');
if (ctaSection) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const position = ctaSection.offsetTop;
        
        if (scrolled > position - window.innerHeight && scrolled < position + ctaSection.offsetHeight) {
            ctaSection.style.backgroundPositionY = (scrolled - position) * 0.5 + 'px';
        }
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations for sections with a slight delay between them
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 150);
    });
    
    // Preload service card images
    const serviceCardLarge = document.querySelectorAll('.service-card-large');
    serviceCardLarge.forEach((card, index) => {
        // Add entrance animation with staggered delay
        card.style.opacity = '0';
        card.style.transform = 'translateX(50px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, 300 + (index * 200));
    });
    
    // Add counter animation to stats
    const statValues = document.querySelectorAll('.stat-value');
    
    statValues.forEach(statValue => {
        const targetValue = statValue.textContent;
        let startValue = 0;
        let duration = 2000; // 2 seconds
        let animateValues = 0;
        
        if (targetValue.includes('+')) {
            animateValues = parseInt(targetValue);
            
            const counterAnimation = setInterval(() => {
                startValue += Math.ceil(animateValues / (duration / 20));
                
                if (startValue >= animateValues) {
                    statValue.textContent = targetValue;
                    clearInterval(counterAnimation);
                } else {
                    statValue.textContent = startValue + '+';
                }
            }, 20);
        }
    });
    
    // Add review button functionality
    const reviewBtn = document.querySelector('.review-btn');
    if (reviewBtn) {
        reviewBtn.addEventListener('click', function() {
            alert('Thank you for your interest! The review form will be available soon.');
        });
    }
});
