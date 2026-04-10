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
        const isTeeHay = document.body.classList.contains('teehay-page');
        const themeColor = isTeeHay ? '184, 146, 46' : '14, 165, 233'; // Gold vs Blue
        const signalColor = isTeeHay ? '#b8922e' : '#14b8a6'; // Gold vs Teal
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
            constructor(isHub = false) {
                this.isHub = isHub;
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * (isHub ? 0.2 : 0.6);
                this.vy = (Math.random() - 0.5) * (isHub ? 0.2 : 0.6);
                this.z = Math.random() * 2; // Depth layer
                this.radius = isHub ? (Math.random() * 5 + 5) : (Math.random() * 2 + 1);
                this.baseOpacity = isHub ? 0.8 : 0.4;
                this.pulse = Math.random() * Math.PI * 2;
                this.connections = [];
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Border bounce
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
                
                this.pulse += 0.03;
            }
            draw() {
                const s = 1 + Math.sin(this.pulse) * 0.2;
                const opacity = this.baseOpacity / (this.z + 1);
                
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius * s, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${themeColor}, ${opacity})`;
                ctx.fill();

                if (this.isHub) {
                    // Neuron glow
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.radius * 3 * s, 0, Math.PI * 2);
                    const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 3 * s);
                    grad.addColorStop(0, `rgba(${isTeeHay ? '226, 201, 126' : '20, 184, 166'}, ${opacity * 0.4})`);
                    grad.addColorStop(1, 'transparent');
                    ctx.fillStyle = grad;
                    ctx.fill();
                }
            }
        }

        class Signal {
            constructor(p1, p2) {
                this.p1 = p1;
                this.p2 = p2;
                this.t = 0;
                this.speed = (0.015 + Math.random() * 0.03) / (p1.z + 1);
            }
            update() {
                this.t += this.speed;
                return this.t < 1;
            }
            draw() {
                const x = this.p1.x + (this.p2.x - this.p1.x) * this.t;
                const y = this.p1.y + (this.p2.y - this.p1.y) * this.t;
                const opacity = 1 / (this.p1.z + 1);
                
                ctx.beginPath();
                ctx.arc(x, y, 2.5 * opacity, 0, Math.PI * 2);
                ctx.fillStyle = signalColor;
                ctx.fill();
                
                // Connection trace
                ctx.beginPath();
                ctx.moveTo(this.p1.x, this.p1.y);
                ctx.lineTo(x, y);
                ctx.strokeStyle = `rgba(${isTeeHay ? '184, 146, 46' : '20, 184, 166'}, ${0.4 * opacity})`;
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }
        }

        const particleCount = window.innerWidth < 768 ? 40 : 120;
        const hubsCount = 8;
        
        for (let i = 0; i < hubsCount; i++) particles.push(new Particle(true));
        for (let i = 0; i < particleCount; i++) particles.push(new Particle(false));

        let mouse = { x: null, y: null };
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            heroSection.addEventListener('mousemove', (e) => {
                const rect = canvas.getBoundingClientRect();
                mouse.x = e.clientX - rect.left;
                mouse.y = e.clientY - rect.top;
            });
            heroSection.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            // Update & Draw Particles
            particles.forEach(p => {
                p.update();
                if (mouse.x && Math.sqrt((mouse.x - p.x)**2 + (mouse.y - p.y)**2) < 200) {
                    p.x += (mouse.x - p.x) * 0.02;
                    p.y += (mouse.y - p.y) * 0.02;
                }
                p.draw();
            });

            // Handle Connections
            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const distance = Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2);
                    const maxDist = (p1.isHub || p2.isHub) ? 250 : 150;

                    if (distance < maxDist) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        // Optional: Bezier curves to hubs for "neural" feel
                        if (p1.isHub || p2.isHub) {
                           const midX = (p1.x + p2.x) / 2 + (Math.sin(p1.pulse) * 20);
                           const midY = (p1.y + p2.y) / 2 + (Math.cos(p2.pulse) * 20);
                           ctx.quadraticCurveTo(midX, midY, p2.x, p2.y);
                        } else {
                           ctx.lineTo(p2.x, p2.y);
                        }
                        
                        const opacity = (1 - distance / maxDist) * 0.3 / (p1.z + 1);
                        ctx.strokeStyle = `rgba(${themeColor}, ${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();

                        if (Math.random() < 0.003 && signals.length < 60) {
                            signals.push(new Signal(p1, p2));
                        }
                    }
                }
            }

            // Synaptic firings
            signals = signals.filter(s => {
                const active = s.update();
                if (active) s.draw();
                return active;
            });

            requestAnimationFrame(animate);
        }
        animate();
    }
});
