// Particle Animation for Hero Section
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) {
      console.error('Canvas element not found!');
      return;
    }
    const ctx = canvas.getContext('2d');
  
    // Set canvas size
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = document.querySelector('.hero-section').offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
  
    // Mouse position
    let mouse = { x: null, y: null };
    canvas.addEventListener('mousemove', (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    });
    // Reset mouse when leaving canvas
    canvas.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });
  
    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1; // Larger for visibility
        this.speedX = Math.random() * 0.4 - 0.2; // Slightly faster
        this.speedY = Math.random() * 0.4 - 0.2;
        this.opacity = Math.random() * 0.5 + 0.5; // Higher base opacity
      }
  
      update() {
        // Normal movement
        this.x += this.speedX;
        this.y += this.speedY;
  
        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  
        // Mouse attraction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            // Subtle attraction
            this.x += dx * 0.015;
            this.y += dy * 0.015;
            this.opacity = Math.min(this.opacity + 0.2, 1); // Brighten on hover
          }
        }
  
        // Pulsation
        this.opacity = Math.max(0.5 + Math.sin(Date.now() * 0.001 + this.x) * 0.3, 0.5);
      }
  
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${this.opacity})`;
        ctx.shadowBlur = 12; // Stronger glow
        ctx.shadowColor = '#60A5FA';
        ctx.fill();
      }
    }
  
    // Initialize particles
    const particles = [];
    const particleCount = 75; // More particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  
    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    }
  
    animate();
  });