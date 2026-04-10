document.addEventListener('DOMContentLoaded', () => {

    // ===== SCROLL ANIMATIONS =====
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    setTimeout(() => {
        const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-right');
        animatedElements.forEach(el => observer.observe(el));
    }, 100);


    // ===== ACTIVE NAV TRACKING =====
    const sections = document.querySelectorAll('section[id], header[id]');
    const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navItems.forEach(a => a.classList.remove('active-nav'));
                const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
                if (active) active.classList.add('active-nav');
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

    sections.forEach(section => sectionObserver.observe(section));


    // ===== CONTACT FORM SIMULATION =====
    const form        = document.getElementById('contactForm');
    const submitBtn   = document.getElementById('contactSubmitBtn');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name  = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();

            if (!name || !email) {
                if (!name)  document.getElementById('contactName').style.borderBottomColor  = 'red';
                if (!email) document.getElementById('contactEmail').style.borderBottomColor = 'red';
                return;
            }

            // Simulate submission
            submitBtn.disabled = true;
            submitBtn.textContent = 'INITIALIZING...';

            setTimeout(() => {
                form.querySelectorAll('input, select, textarea').forEach(el => {
                    el.value = '';
                    el.style.borderBottomColor = '';
                });
                submitBtn.textContent = 'SUCCESS';
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'INITIALIZE CONTACT';
                }, 2000);
            }, 1200);
        });

        // Clear error on input
        form.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', () => {
                input.style.borderBottomColor = '';
            });
        });
    }

    // --- AI CHATBOT LOGIC ---
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotPanel = document.getElementById('chatbotPanel');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatMessages = document.getElementById('chatMessages');

    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', () => {
            chatbotPanel.classList.toggle('active');
        });

        chatbotClose.addEventListener('click', () => {
            chatbotPanel.classList.remove('active');
        });

        const sendMessage = () => {
            const text = chatInput.value.trim();
            if (!text) return;

            // Add user message
            const userMsg = document.createElement('div');
            userMsg.className = 'message user-msg';
            userMsg.textContent = text;
            chatMessages.appendChild(userMsg);
            chatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Simulate Advisor response
            setTimeout(() => {
                const advisorBtn = document.createElement('div');
                advisorBtn.className = 'message advisor-msg';
                advisorBtn.textContent = "Thank you for reaching out. A specialized AI Governance Advisor is reviewing your request regarding '" + text + "'. Would you like to schedule a deep-dive call?";
                chatMessages.appendChild(advisorBtn);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        };

        chatSend.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    // --- MOBILE MENU LOGIC ---
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinksPane = document.getElementById('navLinks');

    if (mobileMenuToggle && navLinksPane) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinksPane.classList.toggle('active');
            mobileMenuToggle.textContent = navLinksPane.classList.contains('active') ? '✕' : '☰';
        });

        // Auto-close on link click
        navLinksPane.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinksPane.classList.remove('active');
                mobileMenuToggle.textContent = '☰';
            });
        });
    }
    // --- HERO CANVAS ANIMATION ---
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        let signals = [];

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = document.getElementById('hero').offsetHeight || window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 3 + 1.5;
                this.glow = 0;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                if (this.glow > 0) this.glow -= 0.05;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(14, 165, 233, ${0.4 + this.glow})`;
                ctx.fill();
                
                if (this.glow > 0) {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(20, 184, 166, ${this.glow * 0.3})`;
                    ctx.fill();
                }
            }
        }

        class Signal {
            constructor(p1, p2) {
                this.p1 = p1;
                this.p2 = p2;
                this.t = 0;
                this.speed = 0.01 + Math.random() * 0.02;
            }
            update() {
                this.t += this.speed;
                if (this.t >= 1) return false;
                return true;
            }
            draw() {
                const x = this.p1.x + (this.p2.x - this.p1.x) * this.t;
                const y = this.p1.y + (this.p2.y - this.p1.y) * this.t;
                
                ctx.beginPath();
                ctx.arc(x, y, 2.5, 0, Math.PI * 2);
                ctx.fillStyle = '#14b8a6';
                ctx.fill();
                
                // Trail
                ctx.beginPath();
                ctx.moveTo(this.p1.x + (this.p2.x - this.p1.x) * (this.t - 0.1), this.p1.y + (this.p2.y - this.p1.y) * (this.t - 0.1));
                ctx.lineTo(x, y);
                ctx.strokeStyle = '#14b8a6';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        }

        const particleCount = window.innerWidth < 768 ? 40 : 100;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        let mouse = { x: null, y: null };
        const heroSection = document.getElementById('hero');
        
        if (heroSection) {
            heroSection.addEventListener('mousemove', (e) => {
                const rect = canvas.getBoundingClientRect();
                mouse.x = e.clientX - rect.left;
                mouse.y = e.clientY - rect.top;
            });
            heroSection.addEventListener('mouseleave', () => {
                mouse.x = null;
                mouse.y = null;
            });
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                p.update();
                p.draw();

                // Mouse influence
                if (mouse.x != null) {
                    const dx = mouse.x - p.x;
                    const dy = mouse.y - p.y;
                    const d = Math.sqrt(dx*dx + dy*dy);
                    if (d < 150) {
                        p.x += dx * 0.01;
                        p.y += dy * 0.01;
                        p.glow = 0.5;
                    }
                }
            });

            for (let i = 0; i < particles.length; i++) {
                let connections = 0;
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 160) {
                        connections++;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(14, 165, 233, ${0.25 - distance / 640})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                        
                        // Occasionally spawn a signal
                        if (Math.random() < 0.001 && signals.length < 50) {
                            signals.push(new Signal(particles[i], particles[j]));
                        }
                    }
                }
            }

            signals = signals.filter(s => {
                const alive = s.update();
                if (alive) s.draw();
                return alive;
            });

            requestAnimationFrame(animate);
        }
        animate();
    }
});
