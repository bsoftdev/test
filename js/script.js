
        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const themeToggleMobile = document.getElementById('themeToggleMobile');
        const body = document.body;
        
        // Check for saved theme preference or default to dark mode
        const currentTheme = localStorage.getItem('theme') || 'dark';
        if (currentTheme === 'light') {
            body.classList.add('light-mode');
            updateThemeIcons('light');
        } else {
            updateThemeIcons('dark');
        }

        function updateThemeIcons(theme) {
            const icons = document.querySelectorAll('.theme-toggle i');
            icons.forEach(icon => {
                if (theme === 'light') {
                    icon.className = 'fas fa-sun';
                } else {
                    icon.className = 'fas fa-moon';
                }
            });
        }

        function toggleTheme() {
            body.classList.toggle('light-mode');
            
            // Save theme preference
            const theme = body.classList.contains('light-mode') ? 'light' : 'dark';
            localStorage.setItem('theme', theme);
            
            // Update icons
            updateThemeIcons(theme);
            
            // Add rotation animation
            themeToggle.style.transform = 'rotate(360deg)';
            themeToggleMobile.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                themeToggle.style.transform = '';
                themeToggleMobile.style.transform = '';
            }, 400);
        }

        themeToggle.addEventListener('click', toggleTheme);
        themeToggleMobile.addEventListener('click', toggleTheme);

        // Chatbot Button
        const chatbotBtn = document.getElementById('chatbotBtn');
        chatbotBtn.addEventListener('click', function() {
            alert('Chatbot será aberto em breve!');
            // Aqui você pode implementar a lógica para abrir o chatbot
        });

        // Mobile Navigation Active State
        const mobileNavItems = document.querySelectorAll('.nav-mobile-item');
        
        mobileNavItems.forEach(item => {
            item.addEventListener('click', function(e) {
                if (!this.classList.contains('theme-toggle')) {
                    mobileNavItems.forEach(nav => nav.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });

        // Desktop Navigation Active State
        const desktopNavItems = document.querySelectorAll('.nav-link');
        
        desktopNavItems.forEach(item => {
            item.addEventListener('click', function(e) {
                desktopNavItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            const isLight = body.classList.contains('light-mode');
            
            if (window.scrollY > 50) {
                if (isLight) {
                    header.style.background = 'rgba(255, 255, 255, 1)';
                } else {
                    header.style.background = 'rgba(26, 35, 50, 1)';
                }
                header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
            } else {
                if (isLight) {
                    header.style.background = 'rgba(255, 255, 255, 0.95)';
                } else {
                    header.style.background = 'rgba(26, 35, 50, 0.95)';
                }
                header.style.boxShadow = 'none';
            }
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });