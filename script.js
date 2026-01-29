/**
 * ============================================
 * BrickShop - JavaScript
 * ============================================
 * This file contains:
 * - Mobile navigation (hamburger menu)
 * - Smooth scrolling to sections
 * - Product cards fade-in animation
 * - Header scroll effects
 * ============================================
 */

document.addEventListener('DOMContentLoaded', function () {

    // ========== DOM ELEMENTS ==========
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');
    const productCards = document.querySelectorAll('.product-card');

    // ========== MOBILE MENU ==========
    /**
     * Hamburger menu toggle for mobile
     */
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function () {
            menuToggle.classList.toggle('active');
            navList.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                menuToggle.classList.remove('active');
                navList.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!menuToggle.contains(e.target) && !navList.contains(e.target)) {
                menuToggle.classList.remove('active');
                navList.classList.remove('active');
            }
        });
    }

    // ========== SMOOTH SCROLLING ==========
    /**
     * Enable smooth scrolling to sections
     * when clicking navigation links
     */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== PRODUCT CARDS ANIMATION ==========
    /**
     * Intersection Observer to animate cards
     * when they enter the viewport
     */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Triggers when 15% of the card is visible
    };

    const cardObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry, index) {
            if (entry.isIntersecting) {
                // Add progressive delay for each card
                const card = entry.target;
                const delay = Array.from(productCards).indexOf(card) * 100;

                setTimeout(function () {
                    card.classList.add('visible');
                }, delay);

                // Stop observing this card
                observer.unobserve(card);
            }
        });
    }, observerOptions);

    // Observe all product cards
    productCards.forEach(function (card) {
        cardObserver.observe(card);
    });

    // ========== HEADER SCROLL EFFECT ==========
    /**
     * Changes header appearance on scroll
     */
    let lastScrollY = window.scrollY;

    function handleHeaderScroll() {
        const currentScrollY = window.scrollY;

        if (header) {
            // Add stronger shadow after certain scroll
            if (currentScrollY > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
            }
        }

        lastScrollY = currentScrollY;
    }

    // Listen to scroll event with throttle for performance
    let scrollTimeout;
    window.addEventListener('scroll', function () {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(handleHeaderScroll);
    });

    // ========== WHATSAPP BUTTON ANIMATION ==========
    /**
     * Makes the WhatsApp button appear after a short delay
     */
    const whatsappButton = document.querySelector('.whatsapp-float');
    if (whatsappButton) {
        whatsappButton.style.opacity = '0';
        whatsappButton.style.transform = 'scale(0.5)';

        setTimeout(function () {
            whatsappButton.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            whatsappButton.style.opacity = '1';
            whatsappButton.style.transform = 'scale(1)';
        }, 1000);
    }

    // ========== ACTIVE NAVIGATION LINK ==========
    /**
     * Updates the active link in navigation
     * based on the visible section
     */
    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
        const scrollY = window.scrollY;
        const headerHeight = header ? header.offsetHeight : 0;

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', function () {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(function () {
            handleHeaderScroll();
            updateActiveLink();
        });
    });

    // ========== INITIALIZATION ==========
    // Trigger first check on load
    handleHeaderScroll();
    updateActiveLink();

    console.log('🧱 BrickShop - Site loaded successfully!');

});

/**
 * ============================================
 * ADVANCED CUSTOMIZATION
 * ============================================
 *
 * To add products dynamically via JavaScript,
 * you can use the following code:
 *
 * const products = [
 *     {
 *         title: "Product Name",
 *         description: "Short description",
 *         price: "$99.99",
 *         image: "images/products/product-name.jpg",
 *         badge: "New" // optional
 *     }
 * ];
 *
 * Then create the cards with a forEach loop.
 * See the documentation in claude.md for more details.
 * ============================================
 */
