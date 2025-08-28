// Wait for DOM to be fully loaded before initializing anything
document.addEventListener("DOMContentLoaded", () => {
    // Initialize all animations and functionality
    initMobileMenu();
    initSectionAnimations();
    initHoverEffects();
    initScrollEvents();
    initParallaxEffects();
    initImageLoading();
    initSmoothScroll();
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

// Scroll Animation for Sections
function initSectionAnimations() {
    const sections = document.querySelectorAll('section');

    if (!sections.length) return;

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

    // Initialize section animations immediately to prevent flash of unstyled content
    sections.forEach((section, index) => {
        // Set initial styles
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        
        // Start observing and add staggered animation
        setTimeout(() => {
            observer.observe(section);
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 150);
        }, 100);
    });
}

// Initialize all hover effects
function initHoverEffects() {
    // Experience Badge Animation
    initExperienceBadgeAnimation();
    
    // Vision & Mission Box Hover Effect
    initVisionMissionHover();
    
    // Value Cards Hover Effect
    initValueCardsHover();
    
    // Team Member Cards Hover Effect
    initTeamMembersHover();
}

// Experience Badge Animation
function initExperienceBadgeAnimation() {
    const experienceBadge = document.querySelector('.experience-badge');
    if (experienceBadge) {
        experienceBadge.addEventListener('mouseover', () => {
            experienceBadge.style.transform = 'scale(1.1) rotate(5deg)';
        });

        experienceBadge.addEventListener('mouseout', () => {
            experienceBadge.style.transform = 'scale(1) rotate(0deg)';
        });
    }
}

// Vision & Mission Box Hover Effect
function initVisionMissionHover() {
    const visionBox = document.querySelector('.vision-box');
    const missionBox = document.querySelector('.mission-box');

    if (visionBox && missionBox) {
        const visionIcon = visionBox.querySelector('.icon');
        const missionIcon = missionBox.querySelector('.icon');
        
        if (visionIcon) {
            visionBox.addEventListener('mouseover', () => {
                visionBox.style.transform = 'translateY(-5px)';
                visionIcon.style.transform = 'rotate(360deg)';
                visionIcon.style.transition = 'transform 0.8s ease-in-out';
            });

            visionBox.addEventListener('mouseout', () => {
                visionBox.style.transform = 'translateY(0)';
                visionIcon.style.transform = 'rotate(0deg)';
            });
        }
        
        if (missionIcon) {
            missionBox.addEventListener('mouseover', () => {
                missionBox.style.transform = 'translateY(-5px)';
                missionIcon.style.transform = 'rotate(360deg)';
                missionIcon.style.transition = 'transform 0.8s ease-in-out';
            });

            missionBox.addEventListener('mouseout', () => {
                missionBox.style.transform = 'translateY(0)';
                missionIcon.style.transform = 'rotate(0deg)';
            });
        }
    }
}

// Value Cards Hover Effect
function initValueCardsHover() {
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach(card => {
        const icon = card.querySelector('.icon');
        if (icon) {
            card.addEventListener('mouseover', () => {
                card.style.transform = 'translateY(-5px)';
                icon.style.transform = 'scale(1.2)';
                icon.style.color = '#FF6600';
                icon.style.transition = 'all 0.3s ease-in-out';
            });

            card.addEventListener('mouseout', () => {
                card.style.transform = 'translateY(0)';
                icon.style.transform = 'scale(1)';
                icon.style.color = '#004AAD';
            });
        }
    });
}

// Team Member Cards Hover Effect
function initTeamMembersHover() {
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        const memberImg = member.querySelector('.member-image img');
        if (memberImg) {
            member.addEventListener('mouseover', () => {
                member.style.transform = 'translateY(-5px)';
                memberImg.style.transform = 'scale(1.1)';
            });

            member.addEventListener('mouseout', () => {
                member.style.transform = 'translateY(0)';
                memberImg.style.transform = 'scale(1)';
            });
        }
    });
}

// Smooth Scroll for Navigation Links
function initSmoothScroll() {
    const mobileMenu = document.querySelector('.mobile-menu');
    
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
}

// Scroll event handling
function initScrollEvents() {
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
}

// Parallax Effects
function initParallaxEffects() {
    // Parallax Effect for Banner
    const banner = document.querySelector('.about-banner');
    if (banner) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            banner.style.backgroundPositionY = -(scrolled * 0.3) + 'px';
        });
    }
}

// Handle image loading with animations
function initImageLoading() {
    // Add loading animation to team member images
    const teamImages = document.querySelectorAll('.member-image img');
    teamImages.forEach(img => {
        // Set initial style
        img.style.opacity = '0';
        img.style.transform = 'scale(0.9)';
        img.style.transition = 'all 0.5s ease';
        
        // Check if image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        } else {
            img.addEventListener('load', () => {
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
            });
        }
    });
    
    // Add loading animation for story image
    const storyImg = document.querySelector('.story-image img');
    if (storyImg) {
        storyImg.style.opacity = '0';
        storyImg.style.transition = 'opacity 0.5s ease';
        
        if (storyImg.complete) {
            storyImg.style.opacity = '1';
        } else {
            storyImg.addEventListener('load', () => {
                storyImg.style.opacity = '1';
            });
        }
    }
    
    // Add loading animation for presence map
    const mapImg = document.querySelector('.presence-map img');
    if (mapImg) {
        mapImg.style.opacity = '0';
        mapImg.style.transition = 'opacity 0.5s ease';
        
        if (mapImg.complete) {
            mapImg.style.opacity = '1';
        } else {
            mapImg.addEventListener('load', () => {
                mapImg.style.opacity = '1';
            });
        }
    }
}
