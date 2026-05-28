document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Custom Cursor Follower
    const cursor = document.getElementById('customCursor');
    const cursorDot = document.getElementById('customCursorDot');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Instant position for the inner dot
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    // Lag effect for outer cursor circle
    function animateCursor() {
        let dx = mouseX - cursorX;
        let dy = mouseY - cursorY;
        
        cursorX += dx * 0.15;
        cursorY += dy * 0.15;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects on interactive elements
    const hoverElements = document.querySelectorAll('a, button, input, textarea, .project-card, .achievement-card, .certification-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
        });
    });

    // 3. Cinematic Preloader
    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('progressBar');
    const statusText = document.getElementById('statusText');
    
    const loadingStates = [
        { progress: 15, text: "Configuring Core Variables..." },
        { progress: 40, text: "Compiling Cyber-Mesh Matrix..." },
        { progress: 65, text: "Establishing Neural Network Hook..." },
        { progress: 85, text: "Parsing Cloud Infrastructure..." },
        { progress: 100, text: "Systems Nominal. Launching..." }
    ];

    let stateIdx = 0;
    function updateLoader() {
        if (stateIdx < loadingStates.length) {
            const state = loadingStates[stateIdx];
            progressBar.style.width = state.progress + '%';
            statusText.textContent = state.text;
            
            stateIdx++;
            setTimeout(updateLoader, 300 + Math.random() * 200);
        } else {
            // Dismiss preloader
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => preloader.remove(), 800);
        }
    }
    setTimeout(updateLoader, 100);

    // 4. Interactive Particle Canvas Background
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    let particleCount = 60;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.radius = Math.random() * 1.5 + 0.5;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
            if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

            // React to mouse proximity
            let dx = mouseX - this.x;
            let dy = mouseY - this.y;
            let dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 120) {
                // Gentle push away
                this.x -= dx * 0.01;
                this.y -= dy * 0.01;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(6, 182, 212, 0.2)';
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        particleCount = Math.min(50, Math.floor(window.innerWidth / 25));
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    initParticles();

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw links between nearby particles
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let dist = Math.sqrt(dx*dx + dy*dy);

                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    // Fade color based on distance
                    ctx.strokeStyle = `rgba(6, 182, 212, ${0.06 * (1 - dist/100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
            
            // Draw link to mouse if close
            let dx = particles[i].x - mouseX;
            let dy = particles[i].y - mouseY;
            let dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 120) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouseX, mouseY);
                ctx.strokeStyle = `rgba(139, 92, 246, ${0.05 * (1 - dist/120)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // 5. Typewriter Effect
    const typewriter = document.getElementById('typewriter');
    const words = [
        "AI-Powered Applications.",
        "Full-Stack Web Architectures.",
        "Cloud Computing Frameworks.",
        "Modern Digital Solutions."
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriter.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeDelay = 50;
        } else {
            typewriter.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeDelay = 120;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeDelay = 1800; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeDelay = 400; // Pause before starting next word
        }

        setTimeout(type, typeDelay);
    }
    setTimeout(type, 1000);

    // 6. Header Scroll Style Toggle
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 7. Mobile Navigation Control
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuCloseBtn = document.getElementById('mobileMenuCloseBtn');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    function toggleMobileMenu(open) {
        if (open) {
            mobileMenu.classList.add('open');
        } else {
            mobileMenu.classList.remove('open');
        }
    }

    mobileMenuBtn.addEventListener('click', () => toggleMobileMenu(true));
    mobileMenuCloseBtn.addEventListener('click', () => toggleMobileMenu(false));
    mobileLinks.forEach(link => link.addEventListener('click', () => toggleMobileMenu(false)));

    // 8. Projects Portfolio Filter
    const filterBtns = document.querySelectorAll('.project-filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active style from all buttons
            filterBtns.forEach(b => {
                b.classList.remove('active');
            });
            // Add active style to selected button
            btn.classList.add('active');

            const filterVal = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterVal === 'all' || category === filterVal) {
                    card.style.display = 'flex';
                    // Reset scale and opacity smoothly
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    // Delay display none to finish fadeout transition
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 9. Generate GitHub Contribution Pipeline UI
    const gridContributions = document.querySelector('.grid-contributions');
    if (gridContributions) {
        // Create 175 contribution squares (5 rows x 35 columns)
        const totalBlocks = 175;
        for (let i = 0; i < totalBlocks; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot-contribution');
            
            // Randomize levels to simulate organic coding activity
            const rand = Math.random();
            if (rand > 0.85) {
                dot.classList.add('level-4');
            } else if (rand > 0.7) {
                dot.classList.add('level-3');
            } else if (rand > 0.5) {
                dot.classList.add('level-2');
            } else if (rand > 0.25) {
                dot.classList.add('level-1');
            }
            gridContributions.appendChild(dot);
        }
    }

    // 10. Scroll Reveal Animations (Intersection Observer)
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal-element').forEach(el => {
        revealObserver.observe(el);
    });

    // 11. Dynamic Year Update
    const yearSpan = document.getElementById('footerYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 12. Contact Form Submission (Active Email Webhook via FormSubmit)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const submitSpan = submitBtn.querySelector('span');
            const submitIconWrapper = submitBtn.querySelector('.submit-icon-wrapper');
            
            // Visual loading state
            submitSpan.textContent = "Transmitting Message...";
            submitBtn.style.opacity = '0.7';
            submitBtn.style.pointerEvents = 'none';
            if (submitIconWrapper && typeof lucide !== 'undefined') {
                submitIconWrapper.innerHTML = '<i data-lucide="loader-2" class="animate-spin" style="width: 18px; height: 18px;"></i>';
                lucide.createIcons();
            }

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            fetch("https://formsubmit.co/ajax/s.suresh9159329346@gmail.com", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                // Success visual state
                submitSpan.textContent = "Connection Secured!";
                submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                if (submitIconWrapper && typeof lucide !== 'undefined') {
                    submitIconWrapper.innerHTML = '<i data-lucide="check-circle" style="width: 18px; height: 18px;"></i>';
                    lucide.createIcons();
                }
                
                alert("Thank you! Your message was sent successfully to Suresh S.");
                contactForm.reset();
                
                // Restore button state
                setTimeout(() => {
                    submitSpan.textContent = "Send Message";
                    submitBtn.style.background = '';
                    submitBtn.style.opacity = '1';
                    submitBtn.style.pointerEvents = 'auto';
                    if (submitIconWrapper && typeof lucide !== 'undefined') {
                        submitIconWrapper.innerHTML = '<i data-lucide="send" style="width: 18px; height: 18px;"></i>';
                        lucide.createIcons();
                    }
                }, 3000);
            })
            .catch(error => {
                console.error("Submission error:", error);
                submitSpan.textContent = "Transmission Failed";
                submitBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
                if (submitIconWrapper && typeof lucide !== 'undefined') {
                    submitIconWrapper.innerHTML = '<i data-lucide="alert-circle" style="width: 18px; height: 18px;"></i>';
                    lucide.createIcons();
                }
                alert("Oops! There was a problem transmitting your message. Please verify network status and try again.");
                
                // Restore button state
                setTimeout(() => {
                    submitSpan.textContent = "Send Message";
                    submitBtn.style.background = '';
                    submitBtn.style.opacity = '1';
                    submitBtn.style.pointerEvents = 'auto';
                    if (submitIconWrapper && typeof lucide !== 'undefined') {
                        submitIconWrapper.innerHTML = '<i data-lucide="send" style="width: 18px; height: 18px;"></i>';
                        lucide.createIcons();
                    }
                }, 3000);
            });
        });
    }
});
