document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');

    menuIcon.onclick = () => {
        menuIcon.classList.toggle('fa-xmark'); // Note: 'fa-xmark' is not in the provided HTML, assuming font-awesome provides it. If not, use 'fa-times'.
        navbar.classList.toggle('active');
    };

    // --- Active Link Scrolling & Sticky Header ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');
    const header = document.querySelector('header');

    window.onscroll = () => {
        // Sticky Header
        header.classList.toggle('sticky', window.scrollY > 100);

        // Active Link on Scroll
        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navLinks.forEach(links => {
                    links.classList.remove('active');
                    document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
                });
            }
        });
        
        // Remove toggle icon and navbar when scroll
        menuIcon.classList.remove('fa-xmark');
        navbar.classList.remove('active');
    };


    // Hide loader after 4 seconds
    window.addEventListener('load', function() {
        setTimeout(function() {
            const loader = document.querySelector('.loader-container');
            loader.style.opacity = '0';
            setTimeout(function() {
                loader.style.display = 'none';
            }, 500);
        }, 3000);
    });

    // --- Scroll Reveal Animation ---
    // Initialize ScrollReveal with some default settings
    ScrollReveal({
        // reset: true, // Uncomment to have animations repeat on scroll up
        distance: '80px',
        duration: 2000,
        delay: 200
    });

    // Animate elements with the 'top' origin
    ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
    
    // Animate elements with the 'bottom' origin
    ScrollReveal().reveal('.home-img, .education-container, .projects-box, .contact form, .experience-container', { origin: 'bottom' });

    // Animate elements with the 'left' origin
    ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });

    // Animate elements with the 'right' origin
    ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });


    // --- Typed.js for Dynamic Text ---
    const typed = new Typed('.multiple-text', {
        strings: ['Full-Stack Developer'],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        fadeOut: true
    });

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // --- Form Submission Handling ---
    const form = document.querySelector('form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Message sent successfully!');
                form.reset();
            } else {
                alert('Error sending message. Please try again.');
            }
        })
        .catch(error => {
            alert('Error sending message. Please try again.');
        });
    });

    // Scroll to top functionality
    const scrollTopBtn = document.getElementById('scroll-top');

    // Show button when user scrolls down 20px from top
    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollTopBtn.style.display = "block";
        } else {
            scrollTopBtn.style.display = "none";
        }
    };

    // Smooth scroll to top when button is clicked
    scrollTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
