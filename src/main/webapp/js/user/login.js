// login.js - 로그인 페이지 스크립트

document.addEventListener('DOMContentLoaded', function() {
    // 탭 클릭 이벤트 처리
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabType = this.getAttribute('data-tab');
            
            if (tabType === 'register') {
                // 회원가입 탭 클릭 시 회원가입 페이지로 이동
                window.location.href = 'registerpage.do';
            }
            // 로그인 탭은 현재 페이지이므로 아무 작업 없음
        });
    });
}); 