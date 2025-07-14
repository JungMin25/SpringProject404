// 로딩 화면 애니메이션
setTimeout(() => {
    document.getElementById('loadingScreen').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('loadingScreen').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
        document.getElementById('mainContent').style.opacity = '1';
        createParticles();
    }, 500);
}, 2000);

// 파티클 생성
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particlesContainer.appendChild(particle);
    }
}

// 플로팅 코드 애니메이션
document.addEventListener('DOMContentLoaded', () => {
    const codes = document.querySelectorAll('.floating-code');
    codes.forEach((code, index) => {
        code.style.animationDelay = (index * 0.5) + 's';
    });
});
