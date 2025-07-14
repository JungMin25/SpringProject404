// DOM이 로드되면 실행
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    setupEventListeners();
});

// 로그인 상태 확인
function checkLoginStatus() {
    try {
        const user = localStorage.getItem('user');
        const userSection = document.getElementById('userSection');
        const loggedOut = document.getElementById('loggedOut');
        const loggedIn = document.getElementById('loggedIn');
        const userNickname = document.getElementById('userNickname');

        if (!userSection || !loggedOut || !loggedIn || !userNickname) {
            console.warn('사용자 인터페이스 요소를 찾을 수 없습니다.');
            return;
        }

        if (user) {
            const userData = JSON.parse(user);
            userNickname.textContent = userData.nickname || '사용자님';
            loggedOut.style.display = 'none';
            loggedIn.style.display = 'flex';
        } else {
            loggedOut.style.display = 'flex';
            loggedIn.style.display = 'none';
        }
    } catch (error) {
        console.error('로그인 상태 확인 중 오류가 발생했습니다:', error);
    }
}

// 이벤트 리스너 설정
function setupEventListeners() {
    try {
        // 검색 관련 이벤트 리스너 제거
    } catch (error) {
        console.error('이벤트 리스너 설정 중 오류가 발생했습니다:', error);
    }
}

// 로그아웃
function logout() {
    if (confirm('정말로 로그아웃 하시겠습니까?')) {
        // TODO: 로그아웃 API 호출
        console.log('로그아웃');
        
        // 임시: 로그아웃 처리
        document.getElementById('loggedIn').style.display = 'none';
        document.getElementById('loggedOut').style.display = 'flex';
    }
}

// 게시글 검색
function searchPosts(keyword) {
    // TODO: 검색 API 호출
    console.log('검색어:', keyword);
}
