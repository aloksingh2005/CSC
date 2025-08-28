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

// Service Card Animation
function animateServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (!serviceCards.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    serviceCards.forEach(card => {
        card.style.opacity = 0;
        observer.observe(card);
    });
}

// Section Title Animation
function animateSectionTitles() {
    const sectionTitles = document.querySelectorAll('.section-title');
    
    if (!sectionTitles.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    sectionTitles.forEach(title => {
        observer.observe(title);
    });
}

// Smooth Scroll for Anchor Links
function setupSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Active Navigation Link based on Scroll Position
function setupActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    if (!sections.length || !navLinks.length) return;
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Fixed Header on Scroll
function setupFixedHeader() {
    const mainHeader = document.querySelector('.main-header');
    const topBar = document.querySelector('.top-bar');
    
    if (!mainHeader || !topBar) return;
    
    const headerOffset = mainHeader.offsetTop;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > headerOffset) {
            mainHeader.classList.add('fixed');
            document.body.style.paddingTop = mainHeader.offsetHeight + 'px';
        } else {
            mainHeader.classList.remove('fixed');
            document.body.style.paddingTop = 0;
        }
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateServiceCards();
    animateSectionTitles();
    setupSmoothScroll();
    setupActiveNavLinks();
    setupFixedHeader();
    
    // Add fixed header style
    const style = document.createElement('style');
    style.textContent = `
        .main-header.fixed {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background-color: white;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            animation: slideDown 0.3s ease-out;
            z-index: 1000;
        }
        
        @keyframes slideDown {
            from {
                transform: translateY(-100%);
            }
            to {
                transform: translateY(0);
            }
        }
        
        .section-title.animated::after {
            width: 100px;
            transition: width 0.8s ease;
        }
    `;
    document.head.appendChild(style);
});
