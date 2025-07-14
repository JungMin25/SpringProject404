<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>시험 진행 중 - Java CodeZone</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/exam/exam_play.css">
</head>
<body>
    <!-- 헤더 -->
    <header class="header">
        <div class="nav-container">
            <a href="mainpage.do" class="logo" onclick="return confirm('시험을 종료하고 나가시겠습니가?')">
                404
            </a>
            <div class="exam-info">
                <span class="exam-title">Java 기초 시험</span>
            </div>
            
        </div>
    </header>

    <!-- 진행 상황 바 - 10문제 기준 -->
    <div class="progress-container">
        <div class="progress-info">
            <span>문제 <span id="currentQuestion">${examProblemId}</span> / <span id="totalQuestions">10</span></span>
            <span class="progress-percentage" id="progressPercentage">${progressPercent}%</span>
        </div>
        <div class="progress-bar">
            <div class="progress-fill" id="progressFill" style="width: ${progressPercent}%"></div>
        </div>
    </div>

    <!-- 메인 컨테이너 -->
    <div class="main-container">
        <!-- 왼쪽 패널 - 문제 영역 -->
        <div class="problem-panel">
            <!-- 문제 네비게이션 -->
            <div class="question-nav">
                <div class="question-status">
                    <div class="status-item">
                        <span class="status-dot submitted"></span>
                    </div>
                    <div class="status-item">
                        <span class="status-dot current"></span>
                    </div>
                    <div class="status-item">
                        <span class="status-dot skipped"></span>
                    </div>
                </div>
            </div>

            <div class="problem-header">
                <h1 class="problem-title" id="problemTitle">
                    <c:choose>
                        <c:when test="${not empty problemDTO}">
                            문제 ${examProblemId}. ${problemDTO.title}
                        </c:when>
                        <c:otherwise>
                            문제 ${examProblemId}. 로딩 중...
                        </c:otherwise>
                    </c:choose>
                </h1>
            </div>

            <div class="problem-content">
                <div class="content-section">
                    <h3>📝 문제 설명</h3>
                    <p id="problemDescription">
                        <c:choose>
                            <c:when test="${not empty problemDTO}">
                                ${problemDTO.description}
                            </c:when>
                            <c:otherwise>
                                문제를 로딩하고 있습니다...
                            </c:otherwise>
                        </c:choose>
                    </p>
                </div>

                <div class="content-section">
                    <h3>📤 정답예시</h3>
                    <div class="code-block">
                        <pre><code id="exampleOutput"><c:choose>
<c:when test="${not empty problemDTO}">
${problemDTO.correct_answer}
</c:when>
<c:otherwise>
로딩 중...
</c:otherwise>
</c:choose></code></pre>
                    </div>
                </div>

                <!-- 정답 코드 섹션 (필요시에만 표시) -->
                <div class="content-section" style="display: none;" id="answerCodeSection">
                    <h3>💻 정답 코드</h3>
                    <div class="code-block">
                        <pre><code id="answerCode"><c:choose>
<c:when test="${not empty problemDTO}">
${problemDTO.correct_answer_code}
</c:when>
<c:otherwise>
로딩 중...
</c:otherwise>
</c:choose></code></pre>
                    </div>
                </div>

                <div class="content-section">
                    <h3>💡 힌트</h3>
                    <p id="problemHint">
                        <c:choose>
                            <c:when test="${not empty problemDTO}">
                                ${problemDTO.hint}
                            </c:when>
                            <c:otherwise>
                                문제를 로딩하고 있습니다...
                            </c:otherwise>
                        </c:choose>
                    </p>
                </div>
            </div>
        </div>

        <!-- 오른쪽 패널 - 코드 에디터 -->
        <div class="code-panel">
            <!-- 답안 제출 Form -->
            <form id="answerForm" action="examplaypage.do" method="post">
                <!-- Hidden Fields for Database - ExamAnswerDetailDTO 매핑 -->
                <input type="hidden" id="userId" name="user_id" value="${sessionScope.user.user_id}" />
                <input type="hidden" id="examId" name="exam_id" value="${examId}" />
                <input type="hidden" id="examProblemId" name="exam_problem_id" value="${examProblemId}" />
                <input type="hidden" id="problemId" name="problem_id" value="${not empty problemDTO ? problemDTO.problem_id : ''}" />
                <textarea id="correctCode" name="correctCode" style="display: none;"></textarea>
                <!-- 검증 결과 전달 (true: 정답, false: 오답) -->
                <input type="hidden" name="isCorrect" id="hiddenIsCorrect" value="false">
                <!-- 카테고리 정보 전달을 위한 hidden input 추가 -->
                <input type="hidden" id="problemCategoryId" value="${not empty problemDTO ? problemDTO.category_id : 1}" />
                <!-- 정답 비교를 위한 예상 정답 전달 -->
                <input type="hidden" id="expectedAnswer" value="${not empty problemDTO ? problemDTO.correct_answer : ''}" />
                
                <div class="code-header">
                    <div class="language-info">
                        <span>Java</span>
                    </div>
                    <div class="code-actions">
                        <button type="button" class="btn btn-primary" onclick="runCode()">
                            실행
                        </button>
                        <button type="submit" class="btn btn-success" name="action_type" value="submit">
                            제출하기
                        </button>
                        <button type="submit" class="btn btn-warning" name="action_type" value="skip">
                            건너뛰기
                        </button>
                    </div>
                </div>

                <!-- 코드 에디터 -->
                <div class="code-editor">
                    <div id="monaco-editor"></div>
                    <div class="editor-loading" id="editorLoading">
                        Monaco Editor 로딩 중...
                    </div>
                </div>

                <!-- 실행 결과 -->
                <div class="result-panel" id="resultPanel">
                    <div class="result-header">
                        <h4>실행 결과</h4>
                        <span class="result-status" id="resultStatus">준비됨</span>
                    </div>
                    <div class="result-content" id="resultContent">코드를 실행하면 결과가 여기에 나타납니다.</div>
                </div>
            </form>
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
    <script src="${pageContext.request.contextPath}/js/exam/exam_play.js?v=<%= System.currentTimeMillis() %>"></script>
    
    <!-- 페이지 이탈 경고창 완전 비활성화 -->
    <script>
        // 페이지 로드 완료 후 모든 beforeunload 이벤트 제거
        window.addEventListener('load', function() {
            // 기존 onbeforeunload 핸들러 제거
            window.onbeforeunload = null;
            
            // 모든 beforeunload 이벤트 리스너 제거를 위한 처리
            const originalAddEventListener = window.addEventListener;
            window.addEventListener = function(type, listener, options) {
                if (type === 'beforeunload') {
                    console.log('beforeunload 이벤트 등록 차단됨');
                    return; // beforeunload 이벤트 등록을 차단
                }
                return originalAddEventListener.call(this, type, listener, options);
            };
            
            // Monaco Editor나 다른 라이브러리에서 설정한 beforeunload 이벤트 강제 제거
            setTimeout(function() {
                window.onbeforeunload = null;
                
                // 이벤트 리스너 제거 시도
                try {
                    const events = window.getEventListeners ? window.getEventListeners(window) : null;
                    if (events && events.beforeunload) {
                        events.beforeunload.forEach(function(event) {
                            window.removeEventListener('beforeunload', event.listener);
                        });
                    }
                } catch (e) {
                    // getEventListeners는 개발자 도구에서만 사용 가능
                }
                
                console.log('✅ 페이지 이탈 경고창 완전 비활성화됨');
            }, 1000);
            
            // 추가적인 보안을 위해 주기적으로 제거
            setInterval(function() {
                window.onbeforeunload = null;
            }, 2000);
        });
        
        // beforeunload 이벤트 자체를 무력화
        Object.defineProperty(window, 'onbeforeunload', {
            set: function(fn) {
                console.log('beforeunload 설정 시도가 차단됨');
                // 아무것도 하지 않음 (설정 차단)
            },
            get: function() {
                return null;
            }
        });
    </script>

</body>
</html> 