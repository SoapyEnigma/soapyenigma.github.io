/**
 * Show Ur Tees - Main JavaScript
 * ================================
 *
 * TABLE OF CONTENTS:
 * 1. DOM Ready Handler
 * 2. Mobile Navigation
 * 3. Header Scroll Effect
 * 4. Gallery Filtering
 * 5. Lightbox
 * 6. FAQ Accordion
 * 7. Contact Form Handling
 * 8. Smooth Scroll
 * 9. Lazy Loading Images
 * 10. Year in Footer
 * 11. Utility Functions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initMobileNav();
    initHeaderScroll();
    initGalleryFilter();
    initLightbox();
    initFaqAccordion();
    initContactForm();
    initSmoothScroll();
    initLazyLoading();
    updateFooterYear();
});

/* ============================================
   2. MOBILE NAVIGATION
   ============================================ */
function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navToggle || !navMenu) return;

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* ============================================
   3. HEADER SCROLL EFFECT
   ============================================ */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;

    function handleScroll() {
        const currentScroll = window.pageYOffset;

        // Add shadow on scroll
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }

    // Throttle scroll event
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial check
    handleScroll();
}

/* ============================================
   4. GALLERY FILTERING
   ============================================ */
function initGalleryFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const noResults = document.querySelector('.gallery-no-results');

    if (!filterBtns.length || !galleryItems.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;
            let visibleCount = 0;

            // Filter items
            galleryItems.forEach(item => {
                const category = item.dataset.category;
                const shouldShow = filter === 'all' || category === filter;

                if (shouldShow) {
                    item.classList.remove('hidden');
                    item.style.display = '';
                    visibleCount++;
                } else {
                    item.classList.add('hidden');
                    item.style.display = 'none';
                }
            });

            // Show/hide no results message
            if (noResults) {
                noResults.style.display = visibleCount === 0 ? 'block' : 'none';
            }
        });
    });
}

/* ============================================
   5. LIGHTBOX
   ============================================ */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (!lightbox || !galleryItems.length) return;

    let currentIndex = 0;
    let visibleItems = [];

    // Update visible items (for filtering support)
    function updateVisibleItems() {
        visibleItems = Array.from(galleryItems).filter(
            item => !item.classList.contains('hidden')
        );
    }

    // Open lightbox
    function openLightbox(index) {
        updateVisibleItems();
        currentIndex = index;
        showImage(currentIndex);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Show image at index
    function showImage(index) {
        if (visibleItems.length === 0) return;

        const item = visibleItems[index];
        const img = item.querySelector('img');
        const overlay = item.querySelector('.gallery-overlay');
        const title = overlay ? overlay.querySelector('h3') : null;
        const desc = overlay ? overlay.querySelector('p') : null;

        if (img && lightboxImage) {
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
        }

        if (lightboxTitle) {
            lightboxTitle.textContent = title ? title.textContent : '';
        }

        if (lightboxDescription) {
            lightboxDescription.textContent = desc ? desc.textContent : '';
        }
    }

    // Navigate to previous/next
    function showPrev() {
        currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
        showImage(currentIndex);
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % visibleItems.length;
        showImage(currentIndex);
    }

    // Event listeners for gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            updateVisibleItems();
            const visibleIndex = visibleItems.indexOf(item);
            if (visibleIndex !== -1) {
                openLightbox(visibleIndex);
            }
        });
    });

    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    // Navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', showPrev);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', showNext);
    }

    // Close on backdrop click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrev();
                break;
            case 'ArrowRight':
                showNext();
                break;
        }
    });
}

/* ============================================
   6. FAQ ACCORDION
   ============================================ */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    if (!faqItems.length) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        if (question) {
            question.addEventListener('click', function() {
                // Close other items (optional - for single-open accordion)
                const isActive = item.classList.contains('active');

                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });

                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

/* ============================================
   7. CONTACT FORM HANDLING
   ============================================ */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success');

    if (!form) return;

    form.addEventListener('submit', function(e) {
        // Basic validation
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });

        // Email validation
        const emailField = form.querySelector('input[type="email"]');
        if (emailField && emailField.value) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailField.value)) {
                isValid = false;
                emailField.classList.add('error');
            }
        }

        if (!isValid) {
            e.preventDefault();
            return;
        }

        // If using Formspree or similar, let the form submit normally
        // For demo purposes, show success message
        // In production, remove this block and let form submit to your backend

        // Check if form action is still placeholder
        const formAction = form.getAttribute('action');
        if (formAction && formAction.includes('YOUR_FORMSPREE_ID')) {
            e.preventDefault();

            // Demo mode - show success message
            form.style.display = 'none';
            if (successMessage) {
                successMessage.style.display = 'block';
            }

            console.log('Form submitted (demo mode)');
            console.log('Form data:', new FormData(form));
        }
    });

    // Remove error class on input
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });

    // Set minimum date for deadline picker
    const deadlineInput = form.querySelector('input[type="date"]');
    if (deadlineInput) {
        const today = new Date().toISOString().split('T')[0];
        deadlineInput.setAttribute('min', today);
    }
}

/* ============================================
   8. SMOOTH SCROLL
   ============================================ */
function initSmoothScroll() {
    // Handle anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();

                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   9. LAZY LOADING IMAGES
   ============================================ */
function initLazyLoading() {
    // Native lazy loading is supported in most browsers
    // This adds intersection observer for older browsers

    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading supported
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    } else {
        // Fallback for older browsers
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                        }
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px'
            });

            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback: load all images
            lazyImages.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            });
        }
    }
}

/* ============================================
   10. YEAR IN FOOTER
   ============================================ */
function updateFooterYear() {
    const yearElements = document.querySelectorAll('#year');
    const currentYear = new Date().getFullYear();

    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
}

/* ============================================
   11. UTILITY FUNCTIONS
   ============================================ */

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Animate elements on scroll (optional enhancement)
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');

    if (!animatedElements.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

// Export functions for external use if needed
window.ShowUrTees = {
    initMobileNav,
    initHeaderScroll,
    initGalleryFilter,
    initLightbox,
    initFaqAccordion,
    initContactForm,
    debounce,
    throttle
};
