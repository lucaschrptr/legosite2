/**
 * ============================================
 * BrickShop - JavaScript
 * ============================================
 * Ce fichier contient :
 * - Navigation mobile (menu hamburger)
 * - Scroll fluide vers les sections
 * - Animation d'apparition des cartes produits
 * - Effets au scroll sur le header
 * ============================================
 */

document.addEventListener('DOMContentLoaded', function () {

    // ========== ÉLÉMENTS DOM ==========
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');
    const productCards = document.querySelectorAll('.product-card');

    // ========== MENU MOBILE ==========
    /**
     * Gestion du menu hamburger pour mobile
     */
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function () {
            menuToggle.classList.toggle('active');
            navList.classList.toggle('active');
        });

        // Fermer le menu quand on clique sur un lien
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                menuToggle.classList.remove('active');
                navList.classList.remove('active');
            });
        });

        // Fermer le menu si on clique en dehors
        document.addEventListener('click', function (e) {
            if (!menuToggle.contains(e.target) && !navList.contains(e.target)) {
                menuToggle.classList.remove('active');
                navList.classList.remove('active');
            }
        });
    }

    // ========== SCROLL FLUIDE ==========
    /**
     * Active le scroll fluide vers les sections
     * quand on clique sur les liens de navigation
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

    // ========== ANIMATION DES CARTES PRODUITS ==========
    /**
     * Intersection Observer pour animer les cartes
     * quand elles entrent dans le viewport
     */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Déclenche quand 15% de la carte est visible
    };

    const cardObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry, index) {
            if (entry.isIntersecting) {
                // Ajouter un délai progressif pour chaque carte
                const card = entry.target;
                const delay = Array.from(productCards).indexOf(card) * 100;

                setTimeout(function () {
                    card.classList.add('visible');
                }, delay);

                // Ne plus observer cette carte
                observer.unobserve(card);
            }
        });
    }, observerOptions);

    // Observer toutes les cartes produits
    productCards.forEach(function (card) {
        cardObserver.observe(card);
    });

    // ========== EFFET HEADER AU SCROLL ==========
    /**
     * Change l'apparence du header quand on scroll
     */
    let lastScrollY = window.scrollY;

    function handleHeaderScroll() {
        const currentScrollY = window.scrollY;

        if (header) {
            // Ajouter une ombre plus prononcée après un certain scroll
            if (currentScrollY > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
            }
        }

        lastScrollY = currentScrollY;
    }

    // Écouter l'événement scroll avec throttle pour les performances
    let scrollTimeout;
    window.addEventListener('scroll', function () {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(handleHeaderScroll);
    });

    // ========== ANIMATION DU BOUTON WHATSAPP ==========
    /**
     * Fait apparaître le bouton WhatsApp après un court délai
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

    // ========== LIEN ACTIF DANS LA NAVIGATION ==========
    /**
     * Met à jour le lien actif dans la navigation
     * en fonction de la section visible
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

    // ========== INITIALISATION ==========
    // Déclencher une première vérification au chargement
    handleHeaderScroll();
    updateActiveLink();

    console.log('🧱 BrickShop - Site chargé avec succès !');

});

/**
 * ============================================
 * PERSONNALISATION AVANCÉE
 * ============================================
 *
 * Pour ajouter des produits dynamiquement via JavaScript,
 * vous pouvez utiliser le code suivant :
 *
 * const produits = [
 *     {
 *         titre: "Nom du produit",
 *         description: "Description courte",
 *         prix: "99,99 €",
 *         image: "url-de-limage.jpg",
 *         badge: "Nouveau" // optionnel
 *     }
 * ];
 *
 * Puis créer les cartes avec une boucle forEach.
 * Voir la documentation dans claude.md pour plus de détails.
 * ============================================
 */
