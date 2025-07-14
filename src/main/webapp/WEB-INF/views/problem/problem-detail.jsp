<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>문제 상세 - 404</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/problem/problem-detail.css">
</head>
<body>
    <!-- 헤더 -->
    <header class="header">
        <div class="nav-container">
            <a href="mainpage.do" class="logo">
                404
            </a>
            <div class="breadcrumb">
                <a href="mainpage.do">홈</a>
                &gt;
                <a href="problempage.do">문제 목록</a>
                &gt;
                <span>${oneProblemInfo.title}</span>
            </div>
            
        </div>
    </header>

    <!-- 메인 컨테이너 -->
    <div class="main-container">
        <!-- 왼쪽 패널 - 문제 설명 -->
        <div class="problem-panel">
            <div class="problem-header">
                <h1 class="problem-title">${oneProblemInfo.title}</h1>
                
                <div class="problem-meta">
                    <div class="meta-item">
                        <span class="difficulty-badge difficulty-${oneProblemDif.difficultyName}">${oneProblemDif.difficultyName}</span>
                    </div>
                    <div class="meta-item">
                        <span class="category-tag">${oneProblemCat.categoryName}</span>
                    </div>
                </div>
            </div>

            <div class="problem-content">
                <h3>📝 문제 설명</h3>
                <p>${oneProblemInfo.description}</p>
                
                <h3>📤 정답예시</h3>
                <p>다음과 같이 정확히 출력해야 합니다:</p>
                <div class="code-example">${oneProblemInfo.correct_answer}</div>
                
                <h3>💡 힌트</h3>
                <p>${oneProblemInfo.hint}</p>
            </div>
        </div>

        <!-- 코드 제출용 숨겨진 폼 -->
        <form id="codeSubmitForm" action="problemresult.do" method="post" style="display: none;">
            <input type="hidden" name="problem_id" value="${oneProblemInfo.problem_id}">
            <input type="hidden" name="submittedCode" id="hiddenCodeInput" value="">
            <input type="hidden" name="executionResult" id="hiddenResultInput" value="">
            <!-- 검증 결과 전달 (true: 정답, false: 오답) -->
            <input type="hidden" name="isCorrect" id="hiddenIsCorrect" value="false">
            <!-- 카테고리 정보 전달을 위한 hidden input 수정 -->
            <input type="hidden" id="problemCategory" value="${oneProblemCat.categoryName}">
            <input type="hidden" id="problemCategoryId" value="${oneProblemInfo.category_id}">
            <!-- 정답 비교를 위한 예상 정답 전달 -->
            <input type="hidden" id="expectedAnswer" value="${oneProblemInfo.correct_answer}">
        </form>

        <!-- 오른쪽 패널 - 코드 에디터 -->
        <div class="code-panel">
            <div class="code-header">
                <div class="language-info">
                    <span>Java</span>
                </div>
                <div class="code-actions">
                    <button class="btn btn-info" onclick="runCode()">
                        실행
                    </button>
                    <button class="btn btn-success" onclick="submitCode()">
                        제출
                    </button>
                    <button class="btn btn-primary" onclick="resetCode()">
                        초기화
                    </button>
                </div>
            </div>

            <div class="code-editor">
                <div id="monaco-editor"></div>
                <div class="editor-loading" id="editorLoading">
                    Monaco Editor 로딩 중...
                </div>
            </div>

            <div class="result-panel" id="resultPanel">
                <div class="result-header">
                    <h4>실행 결과</h4>
                    <span class="result-status" id="resultStatus">준비됨</span>
                </div>
                <div class="result-content" id="resultContent">코드를 실행하면 결과가 여기에 나타납니다.</div>
            </div>
        </div>
    </div>

    <script>
        // Monaco Editor 초기화 (캐시 우회)
        window.require = { paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.41.0/min/vs' } };
        console.log('Monaco Editor 경로 설정 완료');
    </script>
    <script src="https://cdn.jsdelivr.net/npm/monaco-editor@0.41.0/min/vs/loader.js"></script>
    <script>
        // 스크립트 로딩 완료 확인
        console.log('Monaco Editor loader 스크립트 로드 완료');
        console.log('require 객체:', typeof require);
        console.log('monaco 객체:', typeof monaco);
    </script>
    <script src="${pageContext.request.contextPath}/js/problem/problem-detail.js?v=<%= System.currentTimeMillis() %>"></script>


</body>
</html> 