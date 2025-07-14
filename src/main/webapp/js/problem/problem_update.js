// problem_update.js - 문제 수정 페이지 스크립트 (UI 처리만)

function switchTab(tabName) {
    // 모든 탭 비활성화
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // 선택된 탭 활성화
    event.target.classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

function previewProblem() {
    // 제목
    const title = document.getElementById('problemTitle').value;
    document.getElementById('previewTitle').textContent = title;

    // 카테고리
    const category = document.getElementById('problemCategory').value;
    document.getElementById('previewCategory').textContent = category;

    // 난이도
    const difficulty = document.getElementById('problemDifficulty').value;
    const difficultyElement = document.getElementById('previewDifficulty');
    difficultyElement.textContent = difficulty;
    difficultyElement.className = `difficulty-badge difficulty-${difficulty}`;

    // 설명
    const description = document.getElementById('problemDescription').value;
    document.getElementById('previewDescription').textContent = description;

    // 입력/출력
    const input = document.getElementById('problemInput').value;
    document.getElementById('previewInput').textContent = input;

    const output = document.getElementById('problemOutput').value;
    document.getElementById('previewOutput').textContent = output;

    // 예시
    const exampleInput = document.getElementById('exampleInput').value;
    document.getElementById('previewExampleInput').textContent = exampleInput;

    const exampleOutput = document.getElementById('exampleOutput').value;
    document.getElementById('previewExampleOutput').textContent = exampleOutput;

    // 정답 코드
    const answer = document.getElementById('problemAnswer').value;
    document.getElementById('previewAnswer').textContent = answer;
}

function updateProblem() {
    const formData = new FormData(document.getElementById('problemForm'));
    
    // 필수 필드 검증
    if (!formData.get('problemTitle') || !formData.get('problemCategory') || 
        !formData.get('problemDifficulty') || !formData.get('problemDescription') || 
        !formData.get('problemAnswer')) {
        alert('필수 항목을 모두 입력해주세요.');
        return;
    }

    // TODO: 백엔드로 문제 수정 데이터 전송
    alert(`문제가 수정되었습니다!\n제목: ${formData.get('problemTitle')}\n카테고리: ${formData.get('problemCategory')}\n난이도: ${formData.get('problemDifficulty')}`);
    window.location.href = 'admin_mypage.jsp';
}

function deleteProblem() {
    if (confirm('이 문제를 완전히 삭제하시겠습니까?\n삭제된 문제는 복구할 수 없습니다.')) {
        if (confirm('정말로 삭제하시겠습니까? 마지막 확인입니다.')) {
            // TODO: 백엔드로 문제 삭제 요청
            alert('문제가 삭제되었습니다.');
            window.location.href = 'admin_mypage.jsp';
        }
    }
}

// 문제 데이터 로드 함수 (실제로는 서버에서 데이터를 가져옴)
function loadProblemData(problemId) {
    console.log(`Loading problem data for ID: ${problemId}`);
    // TODO: 서버에서 문제 데이터 로드
}

// 입력할 때마다 미리보기 업데이트
document.addEventListener('input', function(e) {
    if (e.target.matches('input, textarea, select')) {
        previewProblem();
    }
});

// 페이지 로드 시 미리보기 초기화 및 URL 파라미터 처리
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const problemId = urlParams.get('id');
    if (problemId) {
        const problemIdElement = document.getElementById('problemId');
        if (problemIdElement) {
            problemIdElement.textContent = problemId;
        }
        // TODO: 해당 ID의 문제 데이터를 불러오는 로직 구현
        loadProblemData(problemId);
    }
    previewProblem();
}); 