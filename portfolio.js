
// Particles Animation
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particles-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const count = Math.floor((this.canvas.width * this.canvas.height) / 10000);
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx -= (dx / distance) * force * 0.1;
                particle.vy -= (dy / distance) * force * 0.1;
            }

            // Boundary collision
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // Damping
            particle.vx *= 0.99;
            particle.vy *= 0.99;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            this.ctx.fill();

            // Connect nearby particles
            for (let j = index + 1; j < this.particles.length; j++) {
                const other = this.particles[j];
                const dx2 = particle.x - other.x;
                const dy2 = particle.y - other.y;
                const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

                if (distance2 < 80) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance2 / 80)})`;
                    this.ctx.stroke();
                }
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system
new ParticleSystem();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in, .skill-card').forEach(el => {
    observer.observe(el);
});
/*form-handling*/
// EmailJS integration for contact form
 (function(){
    emailjs.init("Tk9TnRiPQblTzEVIg"); // from EmailJS dashboard
  })();

  document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    emailjs.sendForm("service_29vetum", "template_kgg7z0a", this)
      .then(() => {
        alert("Thank you for your message! I'll get back to you soon.");
        this.reset();
      }, (err) => {
        alert("Error: " + JSON.stringify(err));
      })
      .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
  });

// Add scroll effect to navbar
let lastScrollTop = 0;
window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const navbar = document.querySelector('.navbar');

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transform = 'translateX(-50%) translateY(-100px)';
    } else {
        navbar.style.transform = 'translateX(-50%) translateY(0)';
    }
    lastScrollTop = scrollTop;
});

// Parallax effect for hero section
window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Dynamic typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect after page load
window.addEventListener('load', function () {
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle) {
            typeWriter(heroTitle, 'Sankalp Halawai', 150);
        }
    }, 1000);
});

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Color theme changer (bonus feature)
const themes = [
    { primary: '#667eea', secondary: '#764ba2', accent: '#f093fb' },
    { primary: '#ff6b6b', secondary: '#ee5a24', accent: '#feca57' },
    { primary: '#48dbfb', secondary: '#0abde3', accent: '#00d2d3' },
    { primary: '#ff9ff3', secondary: '#f368e0', accent: '#ff3838' }
];

let currentTheme = 0;

// Add theme changer to navbar (you can uncomment this for additional functionality)
// setInterval(() => {
//     currentTheme = (currentTheme + 1) % themes.length;
//     const theme = themes[currentTheme];
//     document.documentElement.style.setProperty('--primary-color', theme.primary);
//     document.documentElement.style.setProperty('--secondary-color', theme.secondary);
//     document.documentElement.style.setProperty('--accent-color', theme.accent);
// }, 10000);
