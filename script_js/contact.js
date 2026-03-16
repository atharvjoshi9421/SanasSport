        // Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

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


document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Hero Section Initial Load Animation (Fade + Slide)
    const heroTl = gsap.timeline();
    
    heroTl.from(".hero-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    })
    .from(".hero-subtitle", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.6");

    // 2. Contact Info Cards Scroll Reveal (Stagger)
    gsap.from(".info-card", {
        scrollTrigger: {
            trigger: ".contact-info-section",
            start: "top 85%", 
            toggleActions: "play none none none"
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.2)"
    });

    // 3. Form Section Scroll Reveal (Slide from left)
    gsap.from(".contact-form-container", {
        scrollTrigger: {
            trigger: ".form-map-section",
            start: "top 80%",
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    // 4. Map Section Scale-In Animation
    gsap.from(".map-container", {
        scrollTrigger: {
            trigger: ".form-map-section",
            start: "top 80%",
        },
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    // 5. Button Hover Micro-interaction (GSAP instead of CSS for more bounce)
    const submitBtn = document.getElementById("submitBtn");
    
    submitBtn.addEventListener("mouseenter", () => {
        gsap.to(submitBtn, {
            scale: 1.05,
            boxShadow: "0 10px 20px rgba(255, 69, 0, 0.3)",
            duration: 0.3,
            ease: "back.out(2)"
        });
        // Animate the icon specifically
        gsap.to(submitBtn.querySelector("i"), {
            x: 5,
            y: -5,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    submitBtn.addEventListener("mouseleave", () => {
        gsap.to(submitBtn, {
            scale: 1,
            boxShadow: "none",
            duration: 0.3,
            ease: "power2.out"
        });
        gsap.to(submitBtn.querySelector("i"), {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    // 6. Form Field Focus Animations via GSAP (Optional UI enhancement)
    const formInputs = document.querySelectorAll(".input-wrapper input, .input-wrapper textarea");
    
    formInputs.forEach(input => {
        const wrapper = input.parentElement;
        
        input.addEventListener("focus", () => {
            gsap.to(wrapper, {
                y: -3,
                duration: 0.3,
                ease: "power1.out"
            });
        });
        
        input.addEventListener("blur", () => {
            gsap.to(wrapper, {
                y: 0,
                duration: 0.3,
                ease: "power1.out"
            });
        });
    });
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