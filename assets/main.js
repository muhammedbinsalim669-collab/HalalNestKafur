/* global gsap, tsParticles, google */
document.addEventListener('DOMContentLoaded', () => {
  // 1) Fade-in on scroll simple observer
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up').forEach(el => io.observe(el));

  // 2) Add floating shapes to hero
  const hero = document.querySelector('.hero, .hero-inner, header, section[data-hero]');
  if (hero) {
    const container = hero.closest('section') || hero;
    for (let i=0;i<4;i++){
      const s = document.createElement('div');
      s.className = 'floating-shape';
      s.style.width = `${120 + Math.random()*240}px`;
      s.style.height = s.style.width;
      s.style.left = `${Math.random()*90}%`;
      s.style.top = `${Math.random()*70}%`;
      s.style.background = i%2 ? 'radial-gradient(circle at 30% 30%, rgba(34,211,238,0.8), rgba(22,163,74,0.2))' : 'radial-gradient(circle at 30% 30%, rgba(22,163,74,0.85), rgba(34,211,238,0.12))';
      container.appendChild(s);
      // GSAP gentle float
      if (window.gsap) {
        gsap.to(s, { y: 30 + Math.random()*40, x: (Math.random()*40)-20, duration: 6+Math.random()*6, yoyo:true, repeat:-1, ease:'sine.inOut', delay: Math.random()*2 });
      }
    }
  }

  // 3) Initialize particles in hero
  const particlesContainer = document.createElement('div');
  particlesContainer.id = 'hero-particles';
  particlesContainer.style.zIndex = '0';
  if (hero) hero.parentElement.insertBefore(particlesContainer, hero);
  if (window.tsParticles && document.getElementById('hero-particles')) {
    tsParticles.load('hero-particles', {
      fullScreen: { enable: false },
      particles: {
        number: { value: 30 },
        color: { value: ['#16a34a', '#22d3ee', '#ffffff'] },
        opacity: { value: 0.08 },
        size: { value: { min: 2, max: 8 } },
        move: { enable: true, speed: 0.6, random: true, direction: 'none', outModes: 'out' }
      },
      interactivity: { detectsOn: 'canvas', events: { onHover: { enable: true, mode: 'repulse' } } }
    });
  }

  // 4) Buttons microinteractions
  document.querySelectorAll('button, a.btn-primary, .btn-primary').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      if (window.gsap) gsap.to(btn, { scale: 1.03, duration: 0.18 });
    });
    btn.addEventListener('mouseleave', () => {
      if (window.gsap) gsap.to(btn, { scale: 1, duration: 0.18 });
    });
    btn.addEventListener('mousedown', () => {
      if (window.gsap) gsap.to(btn, { scale: 0.98, duration: 0.08 });
    });
    btn.addEventListener('mouseup', () => {
      if (window.gsap) gsap.to(btn, { scale: 1.03, duration: 0.08 });
    });
  });

  // 5) Smooth entrance for hero content
  const heroContent = document.querySelector('.hero-inner, .hero .container, .hero .hero-inner, .hero .h1');
  if (heroContent && window.gsap) {
    gsap.from(heroContent, { opacity:0, y:18, duration:1, ease:'power3.out', delay:0.2 });
  }

  // 6) Google Sign-In helper (use only after you replace CLIENT ID)
  window.initGSI = function(clientId, onCredential){
    if (!clientId) return;
    if (window.google && google.accounts && google.accounts.id) {
      google.accounts.id.initialize({
        client_id: clientId,
        callback: (res) => {
          console.log('GSI token', res?.credential);
          if (typeof onCredential === 'function') onCredential(res);
        }
      });
      const btn = document.getElementById('auth-button');
      if (btn) google.accounts.id.renderButton(btn, { theme:'outline', size:'medium' });
    }
  };

  // call initGSI automatically if the global var is present (replace below in production)
  if (window.HALALNEST_GSI_CLIENT) {
    initGSI(window.HALALNEST_GSI_CLIENT, (r)=>{ alert('Signed in (mock). Check console.') });
  }
});
