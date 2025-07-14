// problem_insert.js - 문제 등록 페이지 스크립트 (UI 처리만)

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
    const title = document.getElementById('problemTitle').value || '문제 제목을 입력하세요';
    document.getElementById('previewTitle').textContent = title;

    // 카테고리
    const category = document.getElementById('problemCategory').value || '카테고리';
    document.getElementById('previewCategory').textContent = category;

    // 난이도
    const difficulty = document.getElementById('problemDifficulty').value || '난이도';
    const difficultyElement = document.getElementById('previewDifficulty');
    difficultyElement.textContent = difficulty;
    difficultyElement.className = `difficulty-badge difficulty-${difficulty}`;

    // 설명
    const description = document.getElementById('problemDescription').value || '문제 설명을 입력하면 여기에 미리보기가 나타납니다.';
    document.getElementById('previewDescription').textContent = description;

    // 입력/출력
    const input = document.getElementById('problemInput').value || '입력 형식을 입력하세요.';
    document.getElementById('previewInput').textContent = input;

    const output = document.getElementById('problemOutput').value || '출력 형식을 입력하세요.';
    document.getElementById('previewOutput').textContent = output;

    // 예제
    const exampleInput = document.getElementById('exampleInput').value || '(입력 예시)';
    document.getElementById('previewExampleInput').textContent = exampleInput;

    const exampleOutput = document.getElementById('exampleOutput').value || '(출력 예시)';
    document.getElementById('previewExampleOutput').textContent = exampleOutput;

    // 정답 코드
    const answer = document.getElementById('problemAnswer').value || '정답 코드를 입력하세요.';
    document.getElementById('previewAnswer').textContent = answer;
}

function submitProblem() {
    const formData = new FormData(document.getElementById('problemForm'));
    
    // 필수 필드 검증
    if (!formData.get('problemTitle') || !formData.get('problemCategory') || 
        !formData.get('problemDifficulty') || !formData.get('problemDescription') || 
        !formData.get('problemAnswer')) {
        alert('필수 항목을 모두 입력해주세요.');
        return;
    }

    // TODO: 백엔드로 문제 등록 데이터 전송
    alert(`문제가 등록되었습니다!\n제목: ${formData.get('problemTitle')}\n카테고리: ${formData.get('problemCategory')}\n난이도: ${formData.get('problemDifficulty')}`);
    window.location.href = 'admin_mypage.jsp';
}

function resetForm() {
    if (confirm('입력한 내용이 모두 사라집니다. 정말 초기화하시겠습니까?')) {
        document.getElementById('problemForm').reset();
        previewProblem();
    }
}

// 입력할 때마다 미리보기 업데이트
document.addEventListener('input', function(e) {
    if (e.target.matches('input, textarea, select')) {
        previewProblem();
    }
});

// 페이지 로드 시 미리보기 초기화
document.addEventListener('DOMContentLoaded', function() {
    previewProblem();
}); 