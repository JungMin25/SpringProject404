// index.js - 메인 페이지 스크립트

// 로그인 상태 체크
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
});

function checkLoginStatus() {
    // 로컬 스토리지에서 로그인 정보 확인
    const loginData = localStorage.getItem('loginData');
    const loggedOut = document.getElementById('loggedOut');
    const loggedIn = document.getElementById('loggedIn');
    const userNickname = document.getElementById('userNickname');

    if (loginData) {
        const userData = JSON.parse(loginData);
        // 로그인 상태
        loggedOut.style.display = 'none';
        loggedIn.style.display = 'flex';
        userNickname.textContent = userData.nickname + '님';
    } else {
        // 로그아웃 상태
        loggedOut.style.display = 'block';
        loggedIn.style.display = 'none';
    }
}

function logout() {
    // 로컬 스토리지에서 로그인 정보 제거
    localStorage.removeItem('loginData');
    localStorage.removeItem('userProgress');
    alert('로그아웃되었습니다.');
    checkLoginStatus();
} 