         /* =========================================
            NAVBAR SCRIPT LOGIC
            ========================================= */
        gsap.from(".navbar", { y: -100, opacity: 0, duration: 1, ease: "power3.out", delay: 0.2 });

        const navItems = document.querySelectorAll('.has-dropdown');
        navItems.forEach(item => {
            const dropdown = item.querySelector('.dropdown');
            item.addEventListener('mouseenter', () => {
                if(window.innerWidth > 1024) {
                    gsap.killTweensOf(dropdown);
                    gsap.to(dropdown, { opacity: 1, visibility: 'visible', y: 10, duration: 0.3, ease: "power2.out", pointerEvents: 'all' });
                }
            });
            item.addEventListener('mouseleave', () => {
                if(window.innerWidth > 1024) {
                    gsap.killTweensOf(dropdown);
                    gsap.to(dropdown, { opacity: 0, visibility: 'hidden', y: 0, duration: 0.2, ease: "power2.in", pointerEvents: 'none' });
                }
            });
        });

        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        const links = document.querySelectorAll('.nav-item');
        let isMenuOpen = false;

        menuToggle.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            if(isMenuOpen) {
                navLinks.classList.add('mobile-active');
                gsap.fromTo(links, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power3.out" });
                gsap.to(menuToggle.children[0], { y: 8, rotation: 45, duration: 0.3 });
                gsap.to(menuToggle.children[1], { opacity: 0, duration: 0.3 });
                gsap.to(menuToggle.children[2], { y: -8, rotation: -45, duration: 0.3 });
            } else {
                gsap.to(links, { 
                    y: -20, opacity: 0, duration: 0.3, stagger: 0.02, ease: "power2.in",
                    onComplete: () => { navLinks.classList.remove('mobile-active'); gsap.set(links, { clearProps: "all" }); }
                });
                gsap.to(menuToggle.children[0], { y: 0, rotation: 0, duration: 0.3 });
                gsap.to(menuToggle.children[1], { opacity: 1, duration: 0.3 });
                gsap.to(menuToggle.children[2], { y: 0, rotation: 0, duration: 0.3 });
            }
        });

                 navItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.dropdown');
    
    link.addEventListener('click', (e) => {
        if(window.innerWidth <= 1024) {
            // Check if this specific dropdown is already open
            const isOpen = dropdown.style.display === 'grid' || dropdown.style.display === 'block';
            
            // If it is NOT open, prevent navigation and open the dropdown first
            if(!isOpen) {
                e.preventDefault(); 
                
                // Close all other dropdowns
                document.querySelectorAll('.dropdown').forEach(d => { 
                    d.style.display = 'none'; 
                    gsap.set(d, { opacity: 0, visibility: 'hidden', pointerEvents: 'none' });
                });

                // Open the clicked one
                dropdown.style.display = dropdown.classList.contains('wide') ? 'grid' : 'block';
                gsap.fromTo(dropdown, 
                    { height: 0, opacity: 0 }, 
                    { 
                        height: "auto", 
                        opacity: 1, 
                        visibility: 'visible',
                        pointerEvents: 'all',
                        duration: 0.4, 
                        ease: "power2.out", 
                        overwrite: true 
                    }
                );
            }
            // If it IS already open, we skip e.preventDefault().
            // The browser will naturally navigate to the link (e.g., href="nets.html").
        }
    });
});

        /* =========================================
           HERO SLIDER SCRIPT LOGIC
           ========================================= */
        const slides = document.querySelectorAll('.slide');
        const nextBtn = document.querySelector('.next');
        const prevBtn = document.querySelector('.prev');
        let current = 0;
        let isAnimating = false;

        function initInitialSlide() {
            const slide = slides[0];
            const title = slide.querySelectorAll('.slide-title');
            const desc = slide.querySelector('.slide-desc');
            const btn = slide.querySelector('.btn');
            const bg = slide.querySelector('.slide-bg');

            gsap.set(title, { y: '100%' });
            gsap.set([desc, btn], { opacity: 0, y: 30 });
            gsap.set(bg, { scale: 1.15 });

            const tl = gsap.timeline();
            tl.to(bg, { scale: 1, duration: 2.5, ease: "power2.out" })
              .to(title, { y: '0%', duration: 1, stagger: 0.15, ease: "power4.out" }, "-=2")
              .to(desc, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=1.4")
              .to(btn, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=1.2");
        }

        function changeSlide(direction) {
            if (isAnimating) return;
            isAnimating = true;

            const outSlide = slides[current];
            const outTitle = outSlide.querySelectorAll('.slide-title');
            const outDesc = outSlide.querySelector('.slide-desc');
            const outBtn = outSlide.querySelector('.btn');

            if (direction === 'next') { current = (current + 1) % slides.length; } 
            else { current = (current - 1 + slides.length) % slides.length; }

            const inSlide = slides[current];
            const inTitle = inSlide.querySelectorAll('.slide-title');
            const inDesc = inSlide.querySelector('.slide-desc');
            const inBtn = inSlide.querySelector('.btn');
            const inBg = inSlide.querySelector('.slide-bg');

            gsap.set(inSlide, { zIndex: 2, opacity: 1, visibility: 'visible' });
            gsap.set(outSlide, { zIndex: 1 });
            gsap.set(inTitle, { y: '100%' });
            gsap.set([inDesc, inBtn], { opacity: 0, y: 30 });
            gsap.set(inBg, { scale: 1.15 });

            const tl = gsap.timeline({ onComplete: () => { gsap.set(outSlide, { opacity: 0, visibility: 'hidden' }); isAnimating = false; } });

            tl.to([outTitle, outDesc, outBtn], { opacity: 0, y: -30, duration: 0.6, stagger: 0.05, ease: "power2.in" })
              .to(inBg, { scale: 1, duration: 2.5, ease: "power2.out" }, "-=0.2")
              .to(inTitle, { y: '0%', duration: 1, stagger: 0.15, ease: "power4.out" }, "-=2")
              .to(inDesc, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=1.4")
              .to(inBtn, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=1.2");
        }

        nextBtn.addEventListener('click', () => changeSlide('next'));
        prevBtn.addEventListener('click', () => changeSlide('prev'));
        window.addEventListener('DOMContentLoaded', initInitialSlide);

        /* =========================================
           CATEGORIES SCROLL SCRIPT LOGIC
           ========================================= */
        gsap.registerPlugin(ScrollTrigger);

        gsap.from(".categories-section .section-title", {
            scrollTrigger: { trigger: ".categories-section", start: "top 80%", toggleActions: "play none none none" },
            y: 50, opacity: 0, duration: 1, ease: "power3.out"
        });

        gsap.to(".category-card", {
            scrollTrigger: { trigger: ".bento-grid", start: "top 85%", toggleActions: "play none none reverse" },
            y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out"
        });

        /* =========================================
           RECOMMENDED CAROUSEL SCRIPT LOGIC
           ========================================= */
        const carouselTrack = document.getElementById('productTrack');
        const recPrevBtn = document.querySelector('.prev-btn');
        const recNextBtn = document.querySelector('.next-btn');

        const scrollAmount = () => carouselTrack.querySelector('.product-card').offsetWidth + 30;

        recNextBtn.addEventListener('click', () => { carouselTrack.scrollBy({ left: scrollAmount(), behavior: 'smooth' }); });
        recPrevBtn.addEventListener('click', () => { carouselTrack.scrollBy({ left: -scrollAmount(), behavior: 'smooth' }); });

        gsap.from(".recommended-section .section-title", {
            scrollTrigger: { trigger: ".recommended-section", start: "top 80%", toggleActions: "play none none none" },
            y: 50, opacity: 0, duration: 1, ease: "power3.out"
        });

        gsap.from(".carousel-controls", {
            scrollTrigger: { trigger: ".recommended-section", start: "top 80%", toggleActions: "play none none none" },
            x: 50, opacity: 0, duration: 1, delay: 0.2, ease: "power3.out"
        });

        gsap.to(".product-card", {
            scrollTrigger: { trigger: ".carousel-track", start: "top 85%", toggleActions: "play none none reverse" },
            x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out"
        });

        /* =========================================
           SHOP BY CONTENT SCRIPT LOGIC
           ========================================= */
        gsap.from(".content-title", {
            scrollTrigger: { trigger: ".shop-content-section", start: "top 80%", toggleActions: "play none none none" },
            y: 50, opacity: 0, duration: 1, ease: "power3.out"
        });

        gsap.to(".gallery-panel", {
            scrollTrigger: { trigger: ".content-gallery", start: "top 85%", toggleActions: "play none none reverse" },
            y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out"
        });

        gsap.to(".view-all-content", {
            scrollTrigger: { trigger: ".content-gallery", start: "top 60%", toggleActions: "play none none reverse" },
            opacity: 1, y: -10, duration: 1, delay: 0.6, ease: "power3.out"
        });

        /* =========================================
           PREMIUM DEALERS SCRIPT LOGIC
           ========================================= */
        gsap.from(".dealers-title", {
            scrollTrigger: { trigger: ".dealers-section", start: "top 85%", toggleActions: "play none none none" },
            y: 30, opacity: 0, duration: 0.8, ease: "power3.out"
        });

        gsap.from(".dealers-subtitle", {
            scrollTrigger: { trigger: ".dealers-section", start: "top 85%", toggleActions: "play none none none" },
            y: 20, opacity: 0, duration: 0.8, delay: 0.2, ease: "power3.out"
        });

        gsap.from(".marquee-container", {
            scrollTrigger: { trigger: ".dealers-section", start: "top 80%", toggleActions: "play none none none" },
            y: 50, opacity: 0, duration: 1, delay: 0.3, ease: "power3.out"
        });

        let marqueeTween = gsap.to("#dealerTrack", {
            xPercent: -50, ease: "none", duration: 35, repeat: -1
        });

        const marqueeContainer = document.querySelector('.marquee-container');
        marqueeContainer.addEventListener('mouseenter', () => { gsap.to(marqueeTween, { timeScale: 0, duration: 0.5 }); });
        marqueeContainer.addEventListener('mouseleave', () => { gsap.to(marqueeTween, { timeScale: 1, duration: 0.5 }); });

        /* =========================================
           CHAMPIONS SECTION SCRIPT LOGIC
           ========================================= */
        gsap.to(".champ-line", {
            scrollTrigger: { trigger: ".champions-section", start: "top 75%", toggleActions: "play none none reverse" },
            y: "0%", duration: 1, stagger: 0.15, ease: "power4.out"
        });

        gsap.to(".champ-btn", {
            scrollTrigger: { trigger: ".champions-section", start: "top 70%", toggleActions: "play none none reverse" },
            y: "0%", duration: 0.8, delay: 0.5, ease: "power3.out"
        });

        gsap.to("#champBg", {
            scrollTrigger: { trigger: ".champions-section", start: "top bottom", end: "bottom top", scrub: true },
            y: "15%", scale: 1.1, ease: "none"
        });

         gsap.registerPlugin(ScrollTrigger);

        // A playful, bouncy pop-up effect
        gsap.from(".trust-card", {
            scrollTrigger: {
                trigger: ".trust-section",
                start: "top 85%", 
                toggleActions: "play none none reverse"
            },
            y: 80,               // Start lower
            scale: 0.8,          // Start slightly smaller
            rotation: 5,         // Start slightly tilted
            opacity: 0,          
            duration: 1.2,       
            stagger: 0.15,       
            ease: "back.out(1.7)", // Gives it a pronounced elastic bounce
            clearProps: "all"    // Clears GSAP styles after animation so hover states work perfectly
        });

        /* =========================================
           FOOTER SCRIPT LOGIC
           ========================================= */
        const footerTl = gsap.timeline({
            scrollTrigger: { trigger: ".site-footer", start: "top 85%", toggleActions: "play none none reverse" }
        });

        footerTl.to(".footer-accent-line", { scaleX: 1, duration: 0.8, ease: "power3.inOut" })
                .to(".footer-col", { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out" }, "-=0.4")
                .to(".footer-bottom", { opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.2");

        /* =========================================
           THEME TOGGLE & LOCAL STORAGE LOGIC (NEW CODE)
           ========================================= */
        const themeToggleBtn = document.getElementById('themeToggleBtn');

        // 1. Check local storage when the page loads
        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.add('light-theme');
            themeToggleBtn.innerHTML = '🌙'; 
        }

        // 2. Toggle theme and save choice to local storage
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            
            if (document.body.classList.contains('light-theme')) {
                themeToggleBtn.innerHTML = '🌙'; 
                localStorage.setItem('theme', 'light'); // Save to memory
            } else {
                themeToggleBtn.innerHTML = '☀️'; 
                localStorage.setItem('theme', 'dark');  // Save to memory
            }
        });

        function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // This creates the sliding effect
    });
}

function scrollToBottom() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
}