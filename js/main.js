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
    body.classList.toggle('dark-theme');
    
    // Animasyon efekti
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = '';
    }, 300);
    
    // Local storage'a kaydet
    const isDark = body.classList.contains('dark-theme');
    localStorage.setItem('dark-theme', isDark);
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

// Gelişmiş Smooth Scroll
const smoothScroll = (targetElement) => {
    const headerOffset = 80;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
};

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            smoothScroll(targetElement);
            history.pushState(null, '', targetId);
        }
    });
});

// Scroll Animation
const scrollTriggers = document.querySelectorAll('.scroll-trigger');
const observerScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '-50px'
});

scrollTriggers.forEach(trigger => observerScroll.observe(trigger));

// GitHub'dan son sürüm bilgisini al
const fetchLatestVersion = async () => {
    try {
        const response = await fetch('https://raw.githubusercontent.com/Knuclew/musikia/main/version.txt');
        const version = await response.text();
        if (version) {
            const formattedVersion = `V${version.trim()}`;
            document.querySelector('.version-badge strong').textContent = formattedVersion;
            document.querySelector('.hero-badge .version-number').textContent = formattedVersion;
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

// Easter Eggs 🥚
const easterEggs = () => {
    console.log('Easter eggs yükleniyor... 🥚');
    
    // Konami Kodu - Matrix Efekti
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Gelişmiş Matrix efekti
                const canvas = document.createElement('canvas');
                canvas.style.position = 'fixed';
                canvas.style.top = '0';
                canvas.style.left = '0';
                canvas.style.width = '100%';
                canvas.style.height = '100%';
                canvas.style.zIndex = '9999';
                document.body.appendChild(canvas);

                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                const ctx = canvas.getContext('2d');

                const katakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'.split('');
                const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                const nums = '0123456789';
                const alphabet = [...katakana, ...latin, ...nums];

                const fontSize = 16;
                const columns = canvas.width / fontSize;
                const drops = Array(Math.floor(columns)).fill(1);

                ctx.fillStyle = 'rgba(0, 0, 0, 0.95)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                const matrixEffect = () => {
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);

                    ctx.fillStyle = '#0F0';
                    ctx.font = fontSize + 'px monospace';

                    for (let i = 0; i < drops.length; i++) {
                        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
                        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                        
                        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                            drops[i] = 0;
                        }
                        drops[i]++;
                    }
                };

                const matrixInterval = setInterval(matrixEffect, 33);

                setTimeout(() => {
                    clearInterval(matrixInterval);
                    document.body.removeChild(canvas);
                }, 3000);
                
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    // Logo Sürprizi - Neon Efekti
    const logoElement = document.querySelector('.logo');
    let clickCount = 0;
    let lastClick = 0;

    if (logoElement) {
        const handleLogoClick = (e) => {
            const now = Date.now();
            if (now - lastClick < 500) {
                clickCount++;
                if (clickCount === 3) {
                    // Neon efekti
                    const colors = ['#ff0080', '#00ff00', '#0000ff', '#ff00ff', '#00ffff', '#ffff00'];
                    let colorIndex = 0;
                    
                    const logoImg = logoElement.querySelector('.logo-img');
                    const logoText = logoElement.querySelector('span');
                    
                    const neonEffect = setInterval(() => {
                        const color = colors[colorIndex];
                        if (logoText) {
                            logoText.style.textShadow = `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}`;
                            logoText.style.background = `linear-gradient(45deg, ${color}, #fff)`;
                            logoText.style.webkitBackgroundClip = 'text';
                        }
                        if (logoImg) {
                            logoImg.style.filter = `drop-shadow(0 0 5px ${color})`;
                        }
                        colorIndex = (colorIndex + 1) % colors.length;
                    }, 200);

                    // Müzik notaları yağmuru
                    console.log('Nota yağmuru başlıyor... 🎵');
                    const notes = ['♪', '♫', '♬', '♩', '♭', '♮'];
                    
                    // Önce stil ekle
                    const mainStyle = document.createElement('style');
                    mainStyle.textContent = `
                        .falling-note {
                            position: fixed;
                            z-index: 9999;
                            pointer-events: none;
                            animation-timing-function: linear;
                        }
                        @keyframes notefall {
                            0% { 
                                transform: translateY(-50px) rotate(0deg);
                                opacity: 1;
                            }
                            90% {
                                opacity: 1;
                            }
                            100% { 
                                transform: translateY(${window.innerHeight + 100}px) rotate(360deg);
                                opacity: 0;
                            }
                        }
                    `;
                    document.head.appendChild(mainStyle);

                    // Notaları yağdır
                    for (let i = 0; i < 20; i++) {
                        setTimeout(() => {
                            const note = document.createElement('div');
                            note.className = 'falling-note';
                            note.textContent = notes[Math.floor(Math.random() * notes.length)];
                            note.style.left = Math.random() * window.innerWidth + 'px';
                            note.style.fontSize = (20 + Math.random() * 20) + 'px';
                            note.style.color = colors[Math.floor(Math.random() * colors.length)];
                            note.style.animation = `notefall ${2 + Math.random() * 2}s`;
                            
                            console.log(`Nota ${i + 1} oluşturuldu:`, note.textContent);
                            document.body.appendChild(note);

                            // Animasyon bitince temizle
                            note.addEventListener('animationend', () => {
                                console.log(`Nota ${i + 1} siliniyor:`, note.textContent);
                                document.body.removeChild(note);
                            });
                        }, i * 150); // Biraz daha yavaş yağsın
                    }

                    // 5 saniye sonra stili temizle
                    setTimeout(() => {
                        console.log('Nota yağmuru temizleniyor... 🧹');
                        if (mainStyle.parentNode) {
                            document.head.removeChild(mainStyle);
                        }
                    }, 5000);

                    // Neon efektini temizle
                    setTimeout(() => {
                        clearInterval(neonEffect);
                        if (logoText) {
                            logoText.style.textShadow = '';
                            logoText.style.background = '';
                            logoText.style.webkitBackgroundClip = '';
                        }
                        if (logoImg) {
                            logoImg.style.filter = '';
                        }
                        clickCount = 0;
                        console.log('Efektler temizlendi! ✨');
                    }, 5000);
                }
            } else {
                clickCount = 1;
            }
            lastClick = now;
        };

        logoElement.addEventListener('click', handleLogoClick);
    }
};

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    console.log('Sayfa yüklendi, fonksiyonlar başlatılıyor... 🚀');
    
    animateCards();
    fetchLatestVersion();
    easterEggs();
    
    // Floating notalar için rastgele hareket
    const notes = document.querySelectorAll('.floating-note-1, .floating-note-2');
    console.log('Floating notalar bulundu:', notes.length);
    notes.forEach(note => {
        const randomDelay = Math.random() * 2;
        note.style.animationDelay = `${randomDelay}s`;
    });

    // URL'de hash varsa smooth scroll yap
    const hash = window.location.hash;
    if (hash) {
        console.log('URL hash bulundu:', hash);
        const targetElement = document.querySelector(hash);
        if (targetElement) {
            setTimeout(() => {
                smoothScroll(targetElement);
            }, 100);
        }
    }
    
    console.log('Tüm başlangıç işlemleri tamamlandı! ✨');
});

// Mouse hareket efekti (header için)
document.addEventListener('mousemove', (e) => {
    const header = document.querySelector('header');
    const { clientX, clientY } = e;
    const x = clientX / window.innerWidth;
    const y = clientY / window.innerHeight;
    
    header.style.setProperty('--mouse-x', x);
    header.style.setProperty('--mouse-y', y);
});