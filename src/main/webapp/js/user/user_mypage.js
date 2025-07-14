// 탭 전환 함수
function switchTab(tabName) {
    console.log('switchTab called with:', tabName); // 디버깅용
    
    // 모든 탭 내용 숨기기
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // 모든 탭 버튼 비활성화
    document.querySelectorAll('.tab').forEach(button => {
        button.classList.remove('active');
    });	 
    
    // 선택된 탭 내용 표시
    const selectedContent = document.getElementById(tabName);
    if (selectedContent) {
        selectedContent.classList.add('active');
        console.log('Added active to content:', tabName); // 디버깅용
    }
    
    // 선택된 탭 버튼 활성화
    const selectedTab = document.querySelector(`.tab[onclick="switchTab('${tabName}')"]`);
    if (selectedTab) {
        selectedTab.classList.add('active');
        console.log('Added active to tab:', tabName); // 디버깅용
    }
}

// 문제 보기
function viewProblem(problemId) {
    window.location.href = `${pageContext.request.contextPath}/views/html/problem/problem_detail.jsp?id=${problemId}`;
}

// 게시글 수정
function editPost(postId) {
    window.location.href = `${pageContext.request.contextPath}/views/html/board/board_update.jsp?id=${postId}`;
}

// 게시글 삭제
function deletePost(postId) {
    if (confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
        // TODO: 서버에 삭제 요청 보내기
        alert('게시글이 삭제되었습니다.');
        location.reload();
    }
}

// 프로필 업데이트
function updateProfile(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // 유효성 검사
    const username = formData.get('username');
    const email = formData.get('email');
    
    if (!username || !email) {
        alert('필수 항목을 모두 입력해주세요.');
        return;
    }
    
    // TODO: 서버에 프로필 업데이트 요청 보내기
    alert('프로필이 업데이트되었습니다.');
}

// 로그아웃
function logout() {
    if (confirm('정말로 로그아웃 하시겠습니까?')) {
        // TODO: 서버에 로그아웃 요청 보내기
        window.location.href = `${pageContext.request.contextPath}/views/html/user/login.jsp`;
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 기본적으로 첫 번째 탭 활성화
    switchTab('activity');
}); 