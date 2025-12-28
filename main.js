// ==========================================
// MOBILE MENU FUNCTIONALITY
// ==========================================
const menuIcon = document.getElementById('menuIcon');
const mobileMenu = document.getElementById('mobileMenu');
const menuClose = document.getElementById('menuClose');

// Open mobile menu
if (menuIcon) {
  menuIcon.addEventListener('click', () => {
    mobileMenu.classList.add('active');
  });
}

// Close mobile menu
if (menuClose) {
  menuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
  });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (mobileMenu && mobileMenu.classList.contains('active')) {
    if (!mobileMenu.contains(e.target) && !menuIcon.contains(e.target)) {
      mobileMenu.classList.remove('active');
    }
  }
});

// Close menu when clicking on a link
const mobileMenuLinks = document.querySelectorAll('.mobile-menu nav a');
mobileMenuLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
  });
});

// ==========================================
// THREE.JS 3D BACKGROUND ANIMATION
// ==========================================
const canvas = document.getElementById('canvas3d');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
camera.position.z = 50;

// Create particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1500;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 100;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.15,
  color: 0xe36515,
  transparent: true,
  opacity: 0.6,
  blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Create geometric shapes
const geometries = [
  new THREE.TetrahedronGeometry(2),
  new THREE.OctahedronGeometry(2),
  new THREE.IcosahedronGeometry(2)
];

const material = new THREE.MeshPhongMaterial({
  color: 0xe36515,
  wireframe: true,
  transparent: true,
  opacity: 0.3
});

const shapes = [];
for(let i = 0; i < 8; i++) {
  const geometry = geometries[Math.floor(Math.random() * geometries.length)];
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = (Math.random() - 0.5) * 80;
  mesh.position.y = (Math.random() - 0.5) * 80;
  mesh.position.z = (Math.random() - 0.5) * 50;
  mesh.rotation.x = Math.random() * Math.PI;
  mesh.rotation.y = Math.random() * Math.PI;
  shapes.push(mesh);
  scene.add(mesh);
}

// Lighting
const light = new THREE.PointLight(0xe36515, 1, 100);
light.position.set(0, 0, 50);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// Mouse interaction
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate particles
  particlesMesh.rotation.y += 0.001;
  particlesMesh.rotation.x += 0.0005;

  // Rotate shapes
  shapes.forEach((shape, index) => {
    shape.rotation.x += 0.005 + index * 0.001;
    shape.rotation.y += 0.005 + index * 0.001;
  });

  // Mouse parallax effect
  camera.position.x = mouseX * 5;
  camera.position.y = mouseY * 5;
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Apply scroll animations to elements
document.querySelectorAll('.content-card, .team-card, .image-card-3d').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ==========================================
// HEADER SCROLL EFFECT
// ==========================================
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  // Add shadow when scrolled
  if (currentScroll > 50) {
    header.style.boxShadow = '0 8px 30px rgba(227, 101, 21, 0.2)';
  } else {
    header.style.boxShadow = '0 4px 20px rgba(227, 101, 21, 0.1)';
  }
  
  lastScroll = currentScroll;
});

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================
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

// ==========================================
// LOGO CLICK TO SCROLL TO TOP
// ==========================================
const logo = document.querySelector('.logo h1');
if (logo) {
  logo.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ==========================================
// IMAGE LOADING ANIMATION
// ==========================================
const images = document.querySelectorAll('.image-card-3d img');
images.forEach(img => {
  img.addEventListener('load', () => {
    img.parentElement.classList.add('loaded');
  });
});

// ==========================================
// PARALLAX SCROLL EFFECT FOR HERO
// ==========================================
const heroContent = document.querySelector('.hero-content');
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  if (heroContent) {
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    heroContent.style.opacity = 1 - (scrolled / 600);
  }
});

// ==========================================
// TEAM MEMBER STAGGER ANIMATION
// ==========================================
const teamMembers = document.querySelectorAll('.team-member');
teamMembers.forEach((member, index) => {
  member.style.opacity = '0';
  member.style.transform = 'translateX(-20px)';
  member.style.transition = `all 0.5s ease ${index * 0.1}s`;
});

const teamObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const members = entry.target.querySelectorAll('.team-member');
      members.forEach(member => {
        member.style.opacity = '1';
        member.style.transform = 'translateX(0)';
      });
    }
  });
}, { threshold: 0.3 });

const teamCard = document.querySelector('.team-card');
if (teamCard) {
  teamObserver.observe(teamCard);
}

// ==========================================
// BUTTON RIPPLE EFFECT
// ==========================================
const learnMoreBtn = document.querySelector('.learn-more-btn');
if (learnMoreBtn) {
  learnMoreBtn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
}

// ==========================================
// COMPANY CARDS HOVER PAUSE
// ==========================================
const companiesList = document.querySelector('.companies-list');
const companyCards = document.querySelectorAll('.company');

companyCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    companiesList.style.animationPlayState = 'paused';
  });
  
  card.addEventListener('mouseleave', () => {
    companiesList.style.animationPlayState = 'running';
  });
});

// ==========================================
// FOOTER LINK ANIMATION
// ==========================================
const footerLinks = document.querySelectorAll('.footer-section a');
footerLinks.forEach(link => {
  link.addEventListener('mouseenter', function() {
    this.style.transition = 'all 0.3s ease';
  });
});

// ==========================================
// SCROLL TO TOP BUTTON (Optional - Hidden by default)
// ==========================================
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e36515, #ff7f3f);
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(227, 101, 21, 0.3);
  z-index: 999;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 500) {
    scrollToTopBtn.style.opacity = '1';
    scrollToTopBtn.style.visibility = 'visible';
  } else {
    scrollToTopBtn.style.opacity = '0';
    scrollToTopBtn.style.visibility = 'hidden';
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

scrollToTopBtn.addEventListener('mouseenter', () => {
  scrollToTopBtn.style.transform = 'scale(1.1) translateY(-5px)';
  scrollToTopBtn.style.boxShadow = '0 8px 25px rgba(227, 101, 21, 0.5)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
  scrollToTopBtn.style.transform = 'scale(1) translateY(0)';
  scrollToTopBtn.style.boxShadow = '0 4px 15px rgba(227, 101, 21, 0.3)';
});

// ==========================================
// CONSOLE LOG - READY MESSAGE
// ==========================================
console.log('%c Q-SUCCEED-CNY Website Loaded! ', 'background: #e36515; color: #fff; font-size: 16px; padding: 10px;');
console.log('%c Powered by Three.js 3D Graphics ', 'background: #0a1152; color: #fff; font-size: 12px; padding: 5px;');