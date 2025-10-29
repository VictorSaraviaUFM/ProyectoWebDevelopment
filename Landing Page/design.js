
document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll animation mejorada
  const navbar = document.querySelector('.navbar');

  function handleScroll() {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Efecto parallax suave
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-background');
    if (parallax) {
      parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  }

  window.addEventListener('scroll', handleScroll);

  // Theme toggle mejorado
  const toggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  // Cargar tema guardado
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    if (toggleBtn) {
      toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
      toggleBtn.title = 'Modo claro';
    }
  }

  // Toggle theme con animación
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      body.style.transition = 'all 0.5s ease';
      body.classList.toggle('dark-mode');
      
      const isDark = body.classList.contains('dark-mode');
      toggleBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
      toggleBtn.title = isDark ? 'Modo claro' : 'Modo oscuro';
      
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      
      // Efecto de transición
      toggleBtn.style.transform = 'scale(0.8)';
      setTimeout(() => {
        toggleBtn.style.transform = 'scale(1)';
      }, 150);
    });
  }

  // SALUDO DINÁMICO - FUNCIÓN CORREGIDA
  function initDynamicGreeting() {
    const greetingElement = document.getElementById('dynamic-greeting');
    const mobileGreetingElement = document.getElementById('mobile-greeting');
    
    function updateGreeting() {
      const now = new Date();
      const hour = now.getHours();
      
      let greeting, emoji;
      
      if (hour >= 5 && hour < 12) {
        greeting = "Buenos días";
        emoji = "☀️";
      } else if (hour >= 12 && hour < 18) {
        greeting = "Buenas tardes";
        emoji = "🌤️";
      } else {
        greeting = "Buenas noches";
        emoji = "🌙";
      }
      
      const timeString = now.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      
      // Desktop: con hora
      if (greetingElement) {
        greetingElement.textContent = `${emoji} ${greeting} • ${timeString}`;
      }
      
      // Móvil: solo saludo
      if (mobileGreetingElement) {
        mobileGreetingElement.textContent = `${emoji} ${greeting}`;
      }
    }
    
    // Actualizar inmediatamente
    updateGreeting();
    
    // Actualizar cada minuto
    setInterval(updateGreeting, 60000);
  }

  // Animación de números contadores
  const statCircles = document.querySelectorAll('.stat-circle');
  if (statCircles.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const circle = entry.target;
          const value = circle.getAttribute('data-value');
          animateValue(circle, 0, value, 2000);
          observer.unobserve(circle);
        }
      });
    }, { threshold: 0.5 });

    statCircles.forEach(circle => observer.observe(circle));
  }

  function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      element.textContent = value + '%';
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  // Efecto de aparición suave al hacer scroll
  const fadeElements = document.querySelectorAll('.feature-card, .tech-item, .section-header');
  
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
  });

  // Efecto de hover mejorado para tarjetas
  const cards = document.querySelectorAll('.feature-card, .tech-item');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Smooth scroll para enlaces internos
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

  // Efecto de partículas en el hero (simple)
  function createParticles() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = Math.random() * 4 + 2 + 'px';
      particle.style.height = particle.style.width;
      particle.style.background = 'rgba(255, 255, 255, 0.3)';
      particle.style.borderRadius = '50%';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animation = `floatParticle ${Math.random() * 10 + 10}s linear infinite`;
      hero.appendChild(particle);
    }
  }

  // Agregar CSS para animación de partículas
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatParticle {
      0% { transform: translateY(0) translateX(0); opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  createParticles();

  // Función para los badges de características
  function initFeatureBadges() {
    const badges = document.querySelectorAll('.feature-badge');
    badges.forEach(badge => {
      badge.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
      });
      
      badge.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
      });
    });
  }
  // FUNCIÓN DEL SALUDO - Reemplazar en design.js
function initDynamicGreeting() {
  const greetingElement = document.getElementById('dynamic-greeting');
  const mobileGreetingElement = document.getElementById('mobile-greeting');
  
  function updateGreeting() {
    const now = new Date();
    const hour = now.getHours();
    
    let greeting, emoji;
    
    if (hour >= 5 && hour < 12) {
      greeting = "Buenos días";
      emoji = "☀️";
    } else if (hour >= 12 && hour < 18) {
      greeting = "Buenas tardes";
      emoji = "🌤️";
    } else {
      greeting = "Buenas noches";
      emoji = "🌙";
    }
    
    const timeString = now.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    // Desktop: con hora
    if (greetingElement) {
      greetingElement.textContent = `${emoji} ${greeting} • ${timeString}`;
    }
    
    // Móvil: solo saludo
    if (mobileGreetingElement) {
      mobileGreetingElement.textContent = `${emoji} ${greeting}`;
    }
  }
  
  // Actualizar inmediatamente
  updateGreeting();
  
  // Actualizar cada minuto
  setInterval(updateGreeting, 60000);
}

// Y en el DOMContentLoaded, agregar esta línea:
initDynamicGreeting();

  initFeatureBadges();
});