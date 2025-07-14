// exam_insert.js - 시험 등록 페이지 스크립트 (UI 처리만)

// 로그아웃 함수
function logout() {
    if (confirm('로그아웃 하시겠습니까?')) {
        window.location.href = 'login.jsp';
    }
}

// 취소 함수
function cancelExam() {
    if (confirm('입력한 내용이 모두 사라집니다. 정말 취소하시겠습니까?')) {
        window.location.href = 'admin_mypage.jsp';
    }
}

// 문제 필터링 함수
function filterProblems() {
    const categoryFilter = document.getElementById('filterCategory').value;
    const difficultyFilter = document.getElementById('filterDifficulty').value;
    const problemItems = document.querySelectorAll('.problem-item');

    problemItems.forEach(item => {
        const category = item.getAttribute('data-category');
        const difficulty = item.getAttribute('data-difficulty');
        
        const categoryMatch = !categoryFilter || category === categoryFilter;
        const difficultyMatch = !difficultyFilter || difficulty === difficultyFilter;
        
        if (categoryMatch && difficultyMatch) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// 선택된 문제 개수 업데이트
function updateSelectedCount() {
    var checkedCount = document.querySelectorAll('input[name="selectedProblems"]:checked').length;
    document.getElementById('selectedCount').innerText = '선택된 문제: ' + checkedCount + '개';
}

// 각 체크박스에 change 이벤트 리스너 추가 (DOMContentLoaded 시)
document.addEventListener('DOMContentLoaded', function() {
    var checkboxes = document.querySelectorAll('input[name="selectedProblems"]');
    checkboxes.forEach(function(cb) {
        cb.addEventListener('change', function(e) {
            var checkedCount = document.querySelectorAll('input[name="selectedProblems"]:checked').length;
            if (checkedCount > 10) {
                cb.checked = false;
                alert('문제는 최대 10개까지만 선택할 수 있습니다.');
            }
            updateSelectedCount();
        });
    });
    updateSelectedCount();
});

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 문제 목록 데이터 로드
    loadProblemList();
});

// 문제 목록 데이터 로드
function loadProblemList() {
    // TODO: 서버에서 문제 목록 데이터 로드
    console.log('문제 목록 데이터 로드');
}

// 문제 추가
function addProblem(problemId) {
    // TODO: 선택한 문제를 시험에 추가
    console.log('문제 추가:', problemId);
}

// 문제 제거
function removeProblem(problemId) {
    if (confirm('이 문제를 제거하시겠습니까?')) {
        // TODO: 선택한 문제를 시험에서 제거
        console.log('문제 제거:', problemId);
    }
}

// 문제 순서 변경
function reorderProblems(problemId, direction) {
    // TODO: 선택한 문제의 순서를 위/아래로 변경
    console.log('문제 순서 변경:', problemId, direction);
}

// 시험 저장
function saveExam() {
    const examData = {
        title: document.getElementById('examTitle').value,
        description: document.getElementById('examDescription').value,
        duration: document.getElementById('examDuration').value,
        problems: getSelectedProblems()
    };
    
    // TODO: 서버에 시험 데이터 저장
    console.log('시험 저장:', examData);
}

// 선택된 문제 목록 가져오기
function getSelectedProblems() {
    // TODO: 현재 선택된 문제 목록 반환
    return [];
}

// 문제 검색
function searchProblems(keyword) {
    // TODO: 검색어에 해당하는 문제만 표시
    console.log('문제 검색:', keyword);
}

// 문제 필터링
function filterProblems(category) {
    // TODO: 선택된 카테고리에 해당하는 문제만 표시
    console.log('문제 필터링:', category);
}

// 문제 정렬
function sortProblems(criteria) {
    // TODO: 선택된 기준으로 문제 목록 정렬
    console.log('문제 정렬:', criteria);
}

// 시험 목록으로 이동
function goToExamList() {
    window.location.href = '${pageContext.request.contextPath}/views/html/exam/exam.jsp';
}

function validateProblems() {
    var checkedCount = document.querySelectorAll('input[name="selectedProblems"]:checked').length;
    if (checkedCount !== 10) {
        alert('문제는 반드시 10문제를 선택해야 합니다.');
        return false;
    }
    return true; 
} 