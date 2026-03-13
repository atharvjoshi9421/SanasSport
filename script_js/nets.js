  
        gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {

    // 2. Initial Page Load Animations
    const tl = gsap.timeline();
    
    tl.from(".hero-content", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    })
    .from(".sidebar", {
        x: -30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
    }, "-=0.4");

    // 3. Staggered Product Load (ScrollTrigger)
    gsap.from(".product-card", {
        scrollTrigger: {
            trigger: ".product-grid",
            start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
    });

    // 4. Image Hover Scale Effect
    const productCards = document.querySelectorAll(".product-card");
    productCards.forEach(card => {
        const image = card.querySelector(".product-image");
        card.addEventListener("mouseenter", () => {
            gsap.to(image, { scale: 1.08, duration: 0.5, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
            gsap.to(image, { scale: 1, duration: 0.5, ease: "power2.out" });
        });
    });

    // 5. Category Filtering Logic with GSAP Animation
    const filterButtons = document.querySelectorAll('.category-list li');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update Active State on Sidebar
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // Fade out current products
            gsap.to(".product-card", {
                opacity: 0,
                y: 20,
                duration: 0.3,
                stagger: 0.05,
                onComplete: () => {
                    // Hide/Show logic
                    productCards.forEach(card => {
                        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                            card.style.display = 'flex'; // Show matching
                        } else {
                            card.style.display = 'none'; // Hide non-matching
                        }
                    });

                    // Refresh ScrollTrigger to recalculate heights
                    ScrollTrigger.refresh();

                    // Fade in new products
                    gsap.to(".product-card[style*='display: flex']", {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        stagger: 0.1,
                        ease: "power2.out"
                    });
                }
            });
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

