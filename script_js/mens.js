/* Navbar Hover & Mobile Logic (Kept identical) */
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
                gsap.to(menuToggle.children, { y: 8, rotation: 45, duration: 0.3 });
                gsap.to(menuToggle.children, { opacity: 0, duration: 0.3 });
                gsap.to(menuToggle.children, { y: -8, rotation: -45, duration: 0.3 });
            } else {
                gsap.to(links, { 
                    y: -20, opacity: 0, duration: 0.3, stagger: 0.02, ease: "power2.in",
                    onComplete: () => { navLinks.classList.remove('mobile-active'); gsap.set(links, { clearProps: "all" }); }
                });
                gsap.to(menuToggle.children, { y: 0, rotation: 0, duration: 0.3 });
                gsap.to(menuToggle.children, { opacity: 1, duration: 0.3 });
                gsap.to(menuToggle.children, { y: 0, rotation: 0, duration: 0.3 });
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

        // Initialize GSAP ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        // 1. Men's Hero Animation - Sharp slide reveals
        const heroTimeline = gsap.timeline();
        heroTimeline.from(".mens-hero", { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)", duration: 1.5, ease: "power4.inOut" })
                    .from(".gsap-m-elem", { x: -50, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }, "-=0.5");

        // 2. Product Grid Reveal - Aggressive upward stagger
        ScrollTrigger.batch(".gsap-m-card", {
            onEnter: batch => gsap.to(batch, { 
                opacity: 1, 
                y: 0, 
                stagger: 0.1, 
                duration: 0.8, 
                ease: "power4.out" 
            }),
            start: "top 85%",
        });

        // 3. Footer Animation (Kept identical)
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