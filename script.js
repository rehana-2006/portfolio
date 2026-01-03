document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.getElementById('contact-form');

    // --- 1. Mobile Menu Toggle ---
    // This allows the hamburger icon to open/close the menu on mobile devices
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // --- 2. Navbar Scroll Effect ---
    // Changes navbar background when scrolling down
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Trigger other scroll-based functions
        highlightActiveLink();
        revealOnScroll();
    });

    // --- 3. Smooth Scrolling ---
    // Smoothly scrolls to the section when a nav link is clicked
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 4. Active Link Highlighting ---
    // Highlights the navbar link corresponding to the current section
    function highlightActiveLink() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // --- 5. Scroll Animations (Reveal on Scroll) ---
    // Adds 'visible' class to elements as they come into view
    // Note: You need CSS for .fade-in, .fade-in-up to work with .visible
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.fade-in, .fade-in-up');
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('visible');
            }
        });
    }

    // Initial check for animations on load
    revealOnScroll();

    // --- 6. Form Validation ---
    // Simple validation for the contact form
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Get form inputs
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            const formStatus = document.getElementById('form-status');

            // Reset errors
            document.querySelectorAll('.error-message').forEach(error => error.textContent = '');
            formStatus.textContent = '';
            formStatus.className = 'form-status';

            // Validate Name
            if (name.value.trim() === '') {
                document.getElementById('name-error').textContent = 'Name is required';
                isValid = false;
            }

            // Validate Email
            if (email.value.trim() === '') {
                document.getElementById('email-error').textContent = 'Email is required';
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                document.getElementById('email-error').textContent = 'Please enter a valid email';
                isValid = false;
            }

            // Validate Subject
            if (subject.value.trim() === '') {
                document.getElementById('subject-error').textContent = 'Subject is required';
                isValid = false;
            }

            // Validate Message
            if (message.value.trim() === '') {
                document.getElementById('message-error').textContent = 'Message is required';
                isValid = false;
            }

            if (isValid) {
                // Simulate form submission
                const btnSubmit = contactForm.querySelector('.btn-submit');
                const originalText = btnSubmit.innerHTML;

                btnSubmit.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
                btnSubmit.disabled = true;

                // Simulate API call with timeout
                setTimeout(() => {
                    alert('Message sent successfully!');
                    formStatus.textContent = 'Message sent successfully!';
                    formStatus.classList.add('success');
                    contactForm.reset();

                    btnSubmit.innerHTML = originalText;
                    btnSubmit.disabled = false;

                    // Clear success message after 3 seconds
                    setTimeout(() => {
                        formStatus.textContent = '';
                        formStatus.classList.remove('success');
                    }, 3000);
                }, 1500);
            }
        });
    }

    // Helper function to validate email regex
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});
