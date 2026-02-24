// script.js

// 1. Canvas Arka Plan (Her zamanki gibi)
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let heartColor = "255, 77, 109";

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', initCanvas);
initCanvas();

class Particle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
        ctx.fillStyle = `rgba(${heartColor}, ${Math.random()})`;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
    }
}

for(let i=0; i<100; i++) particles.push(new Particle());

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}
animate();

// 2. Akış Mantığı
const messages = [
    "Seninle geçen her saniye çok kıymetli.",
    "Dünyanın en şanslı yazılımcısı benim...",
    "Kodlarımdaki tek bug senin eksikliğin :)",
    "Seni seviyorum!"
];

let messageIndex = 0;
const btn = document.getElementById('changeMsgBtn');
const textElement = document.getElementById('message');

btn.addEventListener('click', function() {
    if (messageIndex < messages.length - 1) {
        // Mesajları sırayla döndürür
        messageIndex++;
        textElement.textContent = messages[messageIndex];
    } else {
        // SON AŞAMA: Her şeyi temizle ve pembeye geç
        document.getElementById('intro-section').style.display = 'none'; // İlk bölümü TAMAMEN yok et
        document.body.style.background = "#ffb3c1"; // Arka planı pembeye boya
        heartColor = "255, 255, 255"; // Kalpleri beyaza çevir (görünürlük için)

        const letterPage = document.getElementById('letter-page');
        letterPage.style.display = 'flex'; // Zarfı ekrana getir

        // Zarf tıklama olayı
        // script.js içindeki zarf tıklama olayını şu şekilde kontrol et:
document.getElementById('envelope').onclick = function() {
    this.style.display = 'none'; // Zarfı tamamen kaldır
    const letter = document.getElementById('letter');
    
    // Mektubu görünür yap ve animasyonu başlat
    letter.classList.remove('hidden'); // Eğer HTML'de hidden varsa kaldır
    
    // Tarayıcının değişikliği algılaması için çok kısa bir süre tanı
    setTimeout(() => {
        letter.classList.add('open'); 
        document.getElementById('loveSong').play(); 
    }, 50);
};
    }
});