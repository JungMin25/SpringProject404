


// 애니메이션 효과
setTimeout(() => {
    const scoreElement = document.querySelector('.score-number');
    if (scoreElement) {
        scoreElement.style.animation = 'countUp 2s ease-out';
    }
}, 500); 