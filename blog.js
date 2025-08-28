// Wait for DOM to be fully loaded before initializing anything
document.addEventListener("DOMContentLoaded", () => {
    // Initialize all components and functionality
    initMobileMenu();
    animateBlogPosts();
    setupSmoothScroll();
    setupFixedHeader();
    setupBlogImageHover();
    setupFixedHeaderStyle();
    setupLazyLoadingImages();
    setupBetterImageLoading();
    setupAlternatingPosts();
    detectImageOrientation();
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

// Updated animation for alternating layout
function animateBlogPosts() {
    const blogPosts = document.querySelectorAll('.blog-post');
    
    if (!blogPosts.length) return;
    
    blogPosts.forEach((post, index) => {
        post.style.opacity = '0';
        
        // Different animation based on odd/even position
        if (window.innerWidth > 767) {
            if (index % 2 === 0) {
                // Odd posts (1st, 3rd, 5th...) - slide from left
                post.style.transform = 'translateX(-30px)';
            } else {
                // Even posts (2nd, 4th, 6th...) - slide from right
                post.style.transform = 'translateX(30px)';
            }
        } else {
            // Mobile view - all slide up
            post.style.transform = 'translateY(30px)';
        }
        
        post.style.transition = 'all 0.6s ease-out';
        post.style.transitionDelay = `${index * 0.12}s`;
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translate(0)';
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    blogPosts.forEach(post => {
        observer.observe(post);
    });
}

// Smooth Scroll for Anchor Links
function setupSmoothScroll() {
    const mobileMenu = document.querySelector('.mobile-menu');
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
            document.body.style.paddingTop = '0';
        }
    });
}

// Blog Image Hover Effect
function setupBlogImageHover() {
    const blogImages = document.querySelectorAll('.blog-image');
    
    blogImages.forEach(image => {
        const img = image.querySelector('img');
        if (!img) return;
        
        // Add transition to all images 
        img.style.transition = 'transform 0.3s ease-out';
        
        image.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.05)';
        });
        
        image.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });
}

// Add fixed header style
function setupFixedHeaderStyle() {
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
        
        .blog-post {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .blog-post:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
    `;
    document.head.appendChild(style);
}

// Setup better image loading and optimization
function setupBetterImageLoading() {
    const blogImages = document.querySelectorAll('.blog-image');
    
    blogImages.forEach(imageContainer => {
        const img = imageContainer.querySelector('img');
        if (!img) return;
        
        // Mark when image is loaded
        function markAsLoaded() {
            imageContainer.classList.add('loaded');
            img.style.opacity = '1';
        }
        
        // Initial state for image
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        // Check if already loaded
        if (img.complete) {
            markAsLoaded();
        } else {
            // Add load event
            img.addEventListener('load', markAsLoaded);
            
            // Add error handling
            img.addEventListener('error', () => {
                // Replace with fallback image on error
                img.src = 'img/placeholder.jpg';
                img.alt = 'Image could not be loaded';
                markAsLoaded();
            });
        }
    });
}

// Replace the existing setupLazyLoadingImages function with our improved version
function setupLazyLoadingImages() {
    setupBetterImageLoading();
    
    // Use IntersectionObserver for true lazy loading
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const container = entry.target;
                    const img = container.querySelector('img');
                    
                    if (img && img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    
                    imageObserver.unobserve(container);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });
        
        document.querySelectorAll('.blog-image').forEach(container => {
            imageObserver.observe(container);
        });
    }
}

// Modified alternating posts function
function setupAlternatingPosts() {
    const blogPosts = document.querySelectorAll('.blog-post');
    
    blogPosts.forEach((post, index) => {
        // Add position indicator
        post.setAttribute('data-post-number', index + 1);
        
        // Add class based on even/odd position
        if (index % 2 === 0) {
            post.classList.add('post-odd');
        } else {
            post.classList.add('post-even');
        }
        
        // Better hover transitions
        post.addEventListener('mouseenter', () => {
            post.style.transform = 'translateY(-10px)';
            post.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
            
            // Extra effect for image on hover
            const img = post.querySelector('.blog-image img');
            if (img) {
                img.style.transform = 'scale(1.1)';
            }
        });
        
        post.addEventListener('mouseleave', () => {
            post.style.transform = 'translateY(0)';
            post.style.boxShadow = index % 2 === 0 ? 
                '-5px 5px 15px rgba(0, 0, 0, 0.05)' : 
                '5px 5px 15px rgba(0, 0, 0, 0.05)';
            
            // Reset image on mouse leave
            const img = post.querySelector('.blog-image img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });
}

// Function to detect image orientation and adjust fit
function detectImageOrientation() {
    const blogImages = document.querySelectorAll('.blog-image img');
    
    blogImages.forEach(img => {
        // When image loads
        img.onload = function() {
            const container = this.parentElement;
            
            // Compare image dimensions
            if (this.naturalWidth > this.naturalHeight) {
                // Landscape image
                container.classList.add('landscape');
            } else {
                // Portrait image
                container.classList.add('portrait');
            }
            
            // If image is very wide or very tall
            const ratio = this.naturalWidth / this.naturalHeight;
            if (ratio > 2) {
                // Very wide image
                container.classList.add('very-wide');
            } else if (ratio < 0.5) {
                // Very tall image
                container.classList.add('very-tall');
            }
        };
        
        // Run immediately if already loaded
        if (img.complete) {
            img.onload();
        }
    });
}
