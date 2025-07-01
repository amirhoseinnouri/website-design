document.addEventListener('DOMContentLoaded', function() {
    // --- Mobile Menu (Sandwich Bar) Functionality ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');

    // Function to open the mobile menu
    function openMobileMenu() {
        mobileMenu.classList.remove('translate-x-full'); // Slides menu into view
        mobileMenu.classList.add('translate-x-0');
        menuOverlay.classList.remove('hidden'); // Shows overlay
        setTimeout(() => menuOverlay.classList.add('opacity-50'), 10); // Fades in overlay
        document.body.style.overflow = 'hidden'; // Prevents scrolling on the body when menu is open
    }

    // Function to close the mobile menu
    function closeMobileMenu() {
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('translate-x-full'); // Slides menu out of view
        menuOverlay.classList.remove('opacity-50'); // Fades out overlay
        setTimeout(() => menuOverlay.classList.add('hidden'), 300); // Hides overlay after transition
        document.body.style.overflow = ''; // Restores body scrolling
    }

    // Event listeners for mobile menu interactions
    mobileMenuButton.addEventListener('click', openMobileMenu); // Open menu on hamburger click
    closeMobileMenuButton.addEventListener('click', closeMobileMenu); // Close menu on 'X' click
    menuOverlay.addEventListener('click', closeMobileMenu); // Close menu when clicking on the overlay

    // Close menu when a link inside it is clicked (and scroll to section)
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // --- Smooth Scrolling for all internal anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default jump behavior

            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth' // Smooth scroll effect
            });
        });
    });

    // --- "Back to Top" Button Functionality ---
    // Create the button dynamically
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v14"></path>
        </svg>
    `;
    backToTopButton.id = 'back-to-top';
    backToTopButton.className = 'fixed bottom-8 right-8 bg-primary text-white p-3 rounded-full shadow-lg opacity-0 transition-opacity duration-300 z-50'; // Tailwind classes for styling and initial hidden state
    document.body.appendChild(backToTopButton); // Add button to the body

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // If scrolled more than 300px
            backToTopButton.classList.add('opacity-100'); // Make it visible
        } else {
            backToTopButton.classList.remove('opacity-100'); // Hide it
        }
    });

    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scroll to the top
        });
    });

    // --- Scroll-Reveal Animations ---
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

    const observerOptions = {
        root: null, // viewport as the root
        rootMargin: '0px',
        threshold: 0.1 // 10% of element visible to trigger
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, observerOptions);

    scrollRevealElements.forEach(element => {
        observer.observe(element);
    });
});

// Function to show the full menu when the cover is clicked
function showFullMenu() {
    const menuCover = document.getElementById('menu-cover');
    const fullMenuOptions = document.getElementById('full-menu-options');

    if (menuCover && fullMenuOptions) {
        menuCover.classList.add('hidden'); // Hide the cover card
        fullMenuOptions.classList.remove('hidden'); // Show the full grid of menu options

        // Optional: Scroll down to the revealed menu if it's below the viewport
        fullMenuOptions.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Keep your existing openMenuModal and closeMenuModal functions as they are.
// ... (your existing JS code for mobile menu, smooth scrolling, etc.)