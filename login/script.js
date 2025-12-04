  /* Alternância Login <-> Register com animação */
        const container = document.getElementById("container");
        document.getElementById("showRegister").onclick = () => {
            container.classList.add("active");
        };
        document.getElementById("showLogin").onclick = () => {
            container.classList.remove("active");
        };

        /* ------------------ BOLINHAS FLUTUANTES COM REPELÊNCIA ------------------ */
        const canvas = document.getElementById("ballsCanvas");
        const ctx = canvas.getContext("2d");
        let w, h;

        function resizeCanvas() {
            w = canvas.width = canvas.offsetWidth;
            h = canvas.height = canvas.offsetHeight;
        }
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        class Ball {
            constructor() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.radius = 6 + Math.random() * 8;
                this.color = "rgba(255,255,255,0.15)";
                this.vx = (Math.random() - 0.5) * 1.2;
                this.vy = (Math.random() - 0.5) * 1.2;
                this.originalRadius = this.radius;
            }

            update(balls, mouse) {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > w) this.vx *= -1;
                if (this.y < 0 || this.y > h) this.vy *= -1;

                // Repelência entre bolinhas
                balls.forEach(ball => {
                    if (ball === this) return;
                    const dx = this.x - ball.x;
                    const dy = this.y - ball.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < this.radius + ball.radius + 20) {
                        const force = 0.04;
                        this.vx += (dx / dist) * force;
                        this.vy += (dy / dist) * force;
                    }
                });

                // Interação com o mouse
                if (mouse.x && mouse.y) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < 100) {
                        const force = 0.1;
                        this.vx += (dx / dist) * force;
                        this.vy += (dy / dist) * force;
                        this.radius = this.originalRadius * 1.5;
                    } else {
                        this.radius = this.originalRadius;
                    }
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        const balls = [];
        for (let i = 0; i < 22; i++) balls.push(new Ball());

        // Mouse interaction
        const mouse = { x: null, y: null };
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        canvas.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        function animate() {
            ctx.clearRect(0, 0, w, h);

            balls.forEach(b => {
                b.update(balls, mouse);
                b.draw();
            });

            requestAnimationFrame(animate);
        }

        animate();

        /* ------------------ VALIDAÇÃO DE FORMULÁRIOS ------------------ */
        // Toggle de visibilidade de senha
        document.querySelectorAll('.password-toggle').forEach(toggle => {
            toggle.addEventListener('click', function() {
                const input = this.parentElement.querySelector('input');
                if (input.type === 'password') {
                    input.type = 'text';
                    this.classList.remove('fa-eye');
                    this.classList.add('fa-eye-slash');
                } else {
                    input.type = 'password';
                    this.classList.remove('fa-eye-slash');
                    this.classList.add('fa-eye');
                }
            });
        });

        // Validação de email
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        // Validação de senha
        function validatePassword(password) {
            return password.length >= 6;
        }

      document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault(); // impede envio automático

    const email = document.getElementById("loginEmail");
    const password = document.getElementById("loginPassword");

    let valid = true;

    // Validar email
    if (!validateEmail(email.value)) {
        email.parentElement.classList.add("error");
        email.parentElement.querySelector(".validation-message").textContent =
            "Por favor, insira um email válido";
        valid = false;
    }

    // Validar senha
    if (!validatePassword(password.value)) {
        password.parentElement.classList.add("error");
        password.parentElement.querySelector(".validation-message").textContent =
            "A senha deve ter pelo menos 6 caracteres";
        valid = false;
    }

    // Se houver erro, não envia
    if (!valid) return;

    // Tudo certo — efeito rápido e envia
    document.getElementById("loginBtn").classList.add("btn-loading");

    this.submit(); // envia para o PHP imediatamente
});

document.getElementById("registerForm").addEventListener("submit", function (e) {

    e.preventDefault(); // impedir envio padrão

    const name = document.getElementById("registerName");
    const email = document.getElementById("registerEmail");
    const gender = document.getElementById("registerGender");
    const password = document.getElementById("registerPassword");

    let valid = true;

    // Validar nome
    if (name.value.trim().length < 3) {
        name.parentElement.classList.add("error");
        name.parentElement.querySelector(".validation-message").textContent =
            "O nome deve ter no mínimo 3 caracteres";
        valid = false;
    } else {
        name.parentElement.classList.remove("error");
        name.parentElement.classList.add("success");
    }

    // Validar email
    if (!validateEmail(email.value)) {
        email.parentElement.classList.add("error");
        email.parentElement.querySelector(".validation-message").textContent =
            "Insira um email válido";
        valid = false;
    } else {
        email.parentElement.classList.remove("error");
        email.parentElement.classList.add("success");
    }

    // Validar género
    if (gender.value === "") {
        gender.parentElement.classList.add("error");
        gender.parentElement.querySelector(".validation-message").textContent =
            "Seleciona o gênero";
        valid = false;
    } else {
        gender.parentElement.classList.remove("error");
        gender.parentElement.classList.add("success");
    }

    // Validar senha
    if (!validatePassword(password.value)) {
        password.parentElement.classList.add("error");
        password.parentElement.querySelector(".validation-message").textContent =
            "A senha deve ter pelo menos 6 caracteres";
        valid = false;
    } else {
        password.parentElement.classList.remove("error");
        password.parentElement.classList.add("success");
    }

    // Se houver erro, NÃO envia
    if (!valid) return;

    // Tudo certo — efeito rápido e envia
    document.getElementById("registerBtn").classList.add("btn-loading");

    this.submit(); // envia para o PHP
});
