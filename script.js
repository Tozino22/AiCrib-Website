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
});
