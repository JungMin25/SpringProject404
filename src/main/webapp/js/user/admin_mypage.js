function switchTab(tabName, element) {
    // 모든 탭 컨텐츠 숨기기
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // 모든 탭 버튼 비활성화
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    // 선택된 탭 컨텐츠 표시
    document.getElementById(tabName).classList.add('active');

    // 선택된 탭 버튼 활성화
    element.classList.add('active');
}

function logout() {
    if (confirm('로그아웃 하시겠습니까?')) {
        // 로그아웃 처리
        window.location.href = 'login.jsp';
    }
}

function viewBoardDetail(postId) {
    // 게시글 상세보기 페이지로 이동
    window.location.href = `board_detail.jsp?id=${postId}`;
}

function deleteBoardPost(postId) {
    if (confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
        // 게시글 삭제 처리
        console.log('게시글 삭제:', postId);
        // TODO: 실제 삭제 API 호출
    }
}

function viewProblemDetail(problemId) {
    // 문제 상세보기 페이지로 이동
    window.location.href = `problem-detail.jsp?id=${problemId}`;
}

function viewExamDetail(examId) {
    // 시험 상세보기 페이지로 이동
    window.location.href = `exam-detail.jsp?id=${examId}`;
}

// 페이지 로드 후 버튼 가운데 정렬 강제 적용
document.addEventListener('DOMContentLoaded', function() {
    // 모든 시험 테이블의 action-buttons을 가운데 정렬
    const examTable = document.querySelector('.exam-table');
    if (examTable) {
        const actionButtons = examTable.querySelectorAll('.action-buttons');
        actionButtons.forEach(container => {
            container.style.display = 'flex';
            container.style.justifyContent = 'center';
            container.style.alignItems = 'center';
            container.style.textAlign = 'center';
            
            const buttons = container.querySelectorAll('button');
            buttons.forEach(button => {
                button.style.margin = '0 auto';
                button.style.display = 'block';
            });
        });
    }
    
    // 강제로 스타일 재적용 (1초 후)
    setTimeout(() => {
        const examButtons = document.querySelectorAll('.exam-table .action-buttons button');
        examButtons.forEach(button => {
            button.style.setProperty('margin', '0 auto', 'important');
            button.style.setProperty('display', 'block', 'important');
            button.style.setProperty('position', 'relative', 'important');
            button.style.setProperty('left', '50%', 'important');
            button.style.setProperty('transform', 'translateX(-50%)', 'important');
        });
    }, 1000);
}); 