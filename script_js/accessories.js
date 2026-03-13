   gsap.registerPlugin(ScrollTrigger);

        document.addEventListener("DOMContentLoaded", () => {
            // 1. Initial Page Load Animations
            gsap.from(".hero-content", { y: 40, opacity: 0, duration: 0.8, ease: "power3.out" });
            gsap.from(".sidebar", { x: -30, opacity: 0, duration: 0.6, ease: "power2.out", delay: 0.2 });

            // 2. Product Load (ScrollTrigger) - Runs ONLY ONCE to avoid disturbing filtering
            ScrollTrigger.create({
                trigger: ".product-grid",
                start: "top 85%",
                once: true,
                animation: gsap.from(".product-card", {
                    y: 40, opacity: 0, duration: 0.5, stagger: 0.1, ease: "power2.out"
                })
            });

            // 3. Image Hover
            const productCards = document.querySelectorAll(".product-card");
            productCards.forEach(card => {
                const image = card.querySelector(".product-image");
                card.addEventListener("mouseenter", () => {
                    gsap.to(image, { scale: 1.08, duration: 0.5, ease: "power2.out", overwrite: "auto" });
                });
                card.addEventListener("mouseleave", () => {
                    gsap.to(image, { scale: 1, duration: 0.5, ease: "power2.out", overwrite: "auto" });
                });
            });

          
           // 4. Category Filtering (Flawless Transitions)
const filterButtons = document.querySelectorAll('.category-list li');
const productGrid = document.getElementById('product-grid');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Prevent clicking if animation is currently running
        if (gsap.isTweening(".product-card")) return;

        const filterValue = button.getAttribute('data-filter');

        // UI: Update Active Class
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Select all cards
        const allCards = document.querySelectorAll('.product-card');
        
        // Phase 1: Animate all visible cards out
        gsap.to(allCards, {
            opacity: 0,
            y: 20,
            scale: 0.95,
            duration: 0.3,
            stagger: 0.02,
            onComplete: () => {
                // Phase 2: Hide all, then show only matching
                allCards.forEach(card => {
                    card.style.display = 'none';
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'flex';
                    }
                });

                // Phase 3: Animate matching cards in
                const matchingCards = document.querySelectorAll(`.product-card[style*="display: flex"]`);
                
                if (matchingCards.length > 0) {
                    gsap.fromTo(matchingCards, 
                        { opacity: 0, y: 20, scale: 0.95 },
                        { 
                            opacity: 1, 
                            y: 0, 
                            scale: 1, 
                            duration: 0.4, 
                            stagger: 0.05, 
                            ease: "power2.out" 
                        }
                    );
                }
                
                // Refresh ScrollTrigger so positions are recalculated
                ScrollTrigger.refresh();
            }
        });
    });
});

            /* =========================================
            NAVBAR SCRIPT LOGIC
            ========================================= */
            gsap.from(".navbar", { y: -100, opacity: 0, duration: 1, ease: "power3.out", delay: 0.2 });

            const navItems = document.querySelectorAll('.has-dropdown');
            navItems.forEach(item => {
                const dropdown = item.querySelector('.dropdown');
                item.addEventListener('mouseenter', () => {
                    if(window.innerWidth > 1024) {
                        gsap.to(dropdown, { opacity: 1, visibility: 'visible', y: 10, duration: 0.3, ease: "power2.out", pointerEvents: 'all', overwrite: true });
                    }
                });
                item.addEventListener('mouseleave', () => {
                    if(window.innerWidth > 1024) {
                        gsap.to(dropdown, { opacity: 0, visibility: 'hidden', y: 0, duration: 0.2, ease: "power2.in", pointerEvents: 'none', overwrite: true });
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
                    gsap.fromTo(links, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power3.out", overwrite: true });
                    gsap.to(menuToggle.children[0], { y: 8, rotation: 45, duration: 0.3, overwrite: true });
                    gsap.to(menuToggle.children[1], { opacity: 0, duration: 0.3, overwrite: true });
                    gsap.to(menuToggle.children[2], { y: -8, rotation: -45, duration: 0.3, overwrite: true });
                } else {
                    gsap.to(links, { 
                        y: -20, opacity: 0, duration: 0.3, stagger: 0.02, ease: "power2.in", overwrite: true,
                        onComplete: () => { navLinks.classList.remove('mobile-active'); gsap.set(links, { clearProps: "all" }); }
                    });
                    gsap.to(menuToggle.children[0], { y: 0, rotation: 0, duration: 0.3, overwrite: true });
                    gsap.to(menuToggle.children[1], { opacity: 1, duration: 0.3, overwrite: true });
                    gsap.to(menuToggle.children[2], { y: 0, rotation: 0, duration: 0.3, overwrite: true });
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
            FOOTER SCRIPT LOGIC
            ========================================= */
            const footerTl = gsap.timeline({
                scrollTrigger: { trigger: ".site-footer", start: "top 85%", toggleActions: "play none none reverse" }
            });

            footerTl.to(".footer-accent-line", { scaleX: 1, duration: 0.8, ease: "power3.inOut" })
                    .to(".footer-col", { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out" }, "-=0.4")
                    .to(".footer-bottom", { opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.2");
        });

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