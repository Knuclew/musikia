// Tema değiştirme fonksiyonu
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Kullanıcının tercih ettiği temayı localStorage'dan al
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-theme');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else if (currentTheme === 'light') {
    body.classList.remove('dark-theme');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
} else if (prefersDarkScheme.matches) {
    body.classList.add('dark-theme');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Tema değiştirme olayı
themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    }
});

// Özellik kartları için animasyon
const cards = document.querySelectorAll('.feature-card');
const animateCards = () => {
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.opacity = '0';
        card.style.animation = 'fadeIn 0.5s ease-out forwards';
    });
};

// Scroll animasyonu için IntersectionObserver
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Animasyon için elementleri gözlemle
document.querySelectorAll('.feature-card, .hero-content, .hero-image, .download-area').forEach(el => {
    observer.observe(el);
});

// Smooth scroll için
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

// GitHub'dan son sürüm bilgisini al
const fetchLatestVersion = async () => {
    try {
        const response = await fetch('https://api.github.com/repos/Knuclew/musikia/releases/latest');
        const data = await response.json();
        if (data.tag_name) {
            document.querySelector('.version-badge strong').textContent = data.tag_name;
        }
    } catch (error) {
        console.error('Sürüm bilgisi alınamadı:', error);
    }
};

// İndirme butonları için analitik takibi
const downloadBtn = document.querySelector('.download-btn');
if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
        // Google Analytics veya başka bir analitik servisi eklenebilir
        console.log('APK indirme başlatıldı');
    });
}

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    animateCards();
    fetchLatestVersion();
    
    // Floating notalar için rastgele hareket
    const notes = document.querySelectorAll('.floating-note-1, .floating-note-2');
    notes.forEach(note => {
        const randomDelay = Math.random() * 2;
        note.style.animationDelay = `${randomDelay}s`;
    });
});

// Mobil Menü
const navLinks = document.querySelector('.nav-links');
const menuButton = document.createElement('button');
menuButton.className = 'menu-button';
menuButton.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('nav').appendChild(menuButton);

menuButton.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuButton.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Mobil menüyü kapatma
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-links') && !e.target.closest('.menu-button')) {
        navLinks.classList.remove('active');
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    }
});
