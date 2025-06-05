// Background Canvas Animation
const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const numParticles = 80;
const maxDistance = 100;

class Particle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.vx *= -1;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.vy *= -1;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const colors = ['#f61c69', '#c0155c', 'rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)'];
    for (let i = 0; i < numParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 2 + 1;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, radius, color));
    }
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(246, 28, 105, ${1 - (distance / maxDistance)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}

// Sidebar Functionality
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menu-toggle');
const closeSidebar = document.getElementById('close-sidebar');
const navLinks = sidebar.querySelectorAll('a');

function toggleSidebar() {
    sidebar.classList.toggle('-translate-x-full');
}

menuToggle.addEventListener('click', toggleSidebar);
closeSidebar.addEventListener('click', toggleSidebar);

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        toggleSidebar();
    });
});

// Event listeners for canvas
window.addEventListener('resize', resizeCanvas);
window.onload = function() {
    resizeCanvas();
    animate();
}
