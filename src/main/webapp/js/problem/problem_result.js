// 힌트 토글 기능
function toggleHint() {
    const hintContent = document.getElementById('hintContent');
    const hintPlaceholder = document.getElementById('hintPlaceholder');
    const hintButton = document.querySelector('.btn-hint');
    
    if (hintContent.style.display === 'none') {
        // 힌트 보이기
        hintContent.style.display = 'block';
        hintPlaceholder.style.display = 'none';
        hintButton.textContent = '힌트 숨기기';
        hintButton.style.background = 'rgba(231, 76, 60, 0.8)';
        
        // 애니메이션 효과
        hintContent.style.opacity = '0';
        hintContent.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            hintContent.style.opacity = '1';
            hintContent.style.transform = 'translateY(0)';
        }, 10);
        
    } else {
        // 힌트 숨기기
        hintContent.style.opacity = '0';
        hintContent.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            hintContent.style.display = 'none';
            hintPlaceholder.style.display = 'block';
            hintButton.textContent = '힌트 보기';
            hintButton.style.background = 'rgba(243, 156, 18, 0.8)';
        }, 300);
    }
}

// 페이지 로드 시 애니메이션 효과
document.addEventListener('DOMContentLoaded', function() {
    // 결과 헤더 애니메이션
    const resultHeader = document.querySelector('.result-header');
    if (resultHeader) {
        resultHeader.style.opacity = '0';
        resultHeader.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            resultHeader.style.transition = 'all 0.6s ease';
            resultHeader.style.opacity = '1';
            resultHeader.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // 카드들 순차 애니메이션
    const cards = document.querySelectorAll('.problem-info-card, .submission-card, .answer-card, .experience-card, .hint-card, .explanation-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });
    
    // 경험치 프로그레스 바 애니메이션
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        const originalWidth = progressFill.style.width;
        progressFill.style.width = '0%';
        
        setTimeout(() => {
            progressFill.style.width = originalWidth;
        }, 1000);
    }
    
    // 통계 카드 애니메이션
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsSection.style.opacity = '0';
        statsSection.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            statsSection.style.transition = 'all 0.6s ease';
            statsSection.style.opacity = '1';
            statsSection.style.transform = 'translateY(0)';
        }, 800);
    }
});

// 결과 상태에 따른 추가 효과
function initializeResultEffects() {
    const resultStatus = document.querySelector('.result-status');
    
    if (resultStatus) {
        if (resultStatus.classList.contains('correct')) {
            // 정답 시 축하 효과
            createConfetti();
        } else {
            // 오답 시 재도전 버튼 강조
            const retryButton = document.querySelector('.btn-primary');
            if (retryButton) {
                setInterval(() => {
                    retryButton.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        retryButton.style.transform = 'scale(1)';
                    }, 200);
                }, 3000);
            }
        }
    }
}

// 간단한 축하 효과 (정답 시)
function createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '9999';
    document.body.appendChild(confettiContainer);
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = `hsl(${Math.random() * 360}, 100%, 70%)`;
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.animation = `confettiFall ${2 + Math.random() * 3}s linear forwards`;
        
        confettiContainer.appendChild(confetti);
    }
    
    // 축하 효과 제거
    setTimeout(() => {
        document.body.removeChild(confettiContainer);
    }, 5000);
}

// CSS 애니메이션을 동적으로 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .hint-content {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    .btn:hover {
        transform: translateY(-2px);
    }
    
    .card-header {
        transition: background 0.3s ease;
    }
    
    .card-header:hover {
        background: rgba(26, 26, 46, 1);
    }
`;
document.head.appendChild(style);

// 페이지 로드 완료 후 효과 초기화
window.addEventListener('load', function() {
    initializeResultEffects();
});

// 뒤로가기 버튼 확인
window.addEventListener('beforeunload', function(e) {
    // 사용자가 실수로 페이지를 떠나는 것을 방지하지 않음
    // 필요시 여기에 확인 로직 추가 가능
});

// 키보드 단축키
document.addEventListener('keydown', function(e) {
    // 'H' 키로 힌트 토글
    if (e.key === 'h' || e.key === 'H') {
        if (!e.ctrlKey && !e.altKey && !e.shiftKey) {
            toggleHint();
        }
    }
    
    // 'R' 키로 다시 도전하기
    if (e.key === 'r' || e.key === 'R') {
        if (!e.ctrlKey && !e.altKey && !e.shiftKey) {
            const retryButton = document.querySelector('.btn-primary');
            if (retryButton) {
                retryButton.click();
            }
        }
    }
    
    // ESC 키로 문제 목록으로
    if (e.key === 'Escape') {
        const listButton = document.querySelector('.btn-secondary');
        if (listButton) {
            listButton.click();
        }
    }
});

// 모바일 터치 지원
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function() {}, {passive: true});
}
