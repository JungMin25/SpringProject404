<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>문제 결과 - 404</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/problem/problem_result.css">
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
                <span>문제 결과</span>
            </div>

        </div>
    </header>

    <!-- 메인 컨테이너 -->
    <div class="main-container">
        <!-- 결과 헤더 -->
        <div class="result-header">
            <div class="result-status ${problemSubDTO.is_correct ? 'correct' : 'incorrect'}">
                <div class="status-icon">
                    ${problemSubDTO.is_correct ? '✅' : '❌'}
                </div>
                <h1 class="status-title">
                    ${problemSubDTO.is_correct ? '정답입니다!' : '다시 도전해보세요!'}
                </h1>
                <p class="status-subtitle">
                    ${problemSubDTO.is_correct ? '축하합니다! 문제를 성공적으로 해결하셨습니다.' : '아쉽게도 틀렸습니다. 힌트를 확인하고 다시 시도해보세요.'}
                </p>
            </div>
        </div>

        <!-- 결과 콘텐츠 -->
        <div class="result-content">
            <!-- 왼쪽 패널 - 문제 정보 및 제출 코드 -->
            <div class="problem-panel">
                <!-- 문제 정보 -->
                <div class="problem-info-card">
                    <div class="card-header">
                        <h3>📝 문제 정보</h3>
                    </div>
                    <div class="card-content">
                        <div class="problem-title">${oneProblemInfo.title}</div>
                        <div class="problem-meta">
                            <span class="difficulty-badge difficulty-${oneProblemDif.difficultyName}">${oneProblemDif.difficultyName}</span>
                            <span class="category-tag">${oneProblemCat.categoryName}</span>
                        </div>
                    </div>
                </div>

                <!-- 제출한 코드 -->
                <div class="submission-card">
                    <div class="card-header">
                        <h3>💻 제출한 코드</h3>
                    </div>
                    <div class="card-content">
                        <div class="code-editor">
                            <pre><code>${submittedCode}</code></pre>
                        </div>
                    </div>
                </div>

                <!-- 정답 코드 (정답인 경우에만 표시) -->
                <div class="answer-card" style="display: ${problemSubDTO.is_correct ? 'block' : 'none'}">
                    <div class="card-header">
                        <h3>🎯 정답 코드</h3>
                    </div>
                    <div class="card-content">
                        <div class="code-editor">
                            <pre><code>${oneProblemInfo.correct_answer}</code></pre>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 오른쪽 패널 - 힌트 및 경험치 -->
            <div class="result-panel">
                <!-- 경험치 카드 -->
                <div class="experience-card">
                    <div class="card-header">
                        <h3>⭐ 경험치</h3>
                    </div>
                    <div class="card-content">
                        <div class="exp-info">
                            <div class="exp-gained ${problemSubDTO.is_correct ? 'gained' : 'no-gain'}">
                                <div class="exp-number">+${problemSubDTO.is_correct ? problemSubDTO.attempt_count : 0}</div>
                                <div class="exp-label">${problemSubDTO.is_correct ? '획득한 경험치' : ''}</div>
                            </div>
                            <div class="exp-current">
                                <div class="exp-number">${userVO.experience_points}</div>
                                <div class="exp-label">현재 경험치</div>
                            </div>
                            <div class="current-grade-info">
                                <div class="exp-number" style="background-color: ${gradeVO.grade_color}; color: white; border-radius: 3px; padding: 5px 7px; font-size: 0.8em;">
                                    ${gradeVO.grade_name}
                                </div>
                                <div class="exp-label" style="font-size: 0.9em;">현재 등급</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 힌트 카드 -->
                <div class="hint-card">
                    <div class="card-header">
                        <h3>💡 힌트</h3>
                        <button class="btn-hint" onclick="toggleHint()">힌트 보기</button>
                    </div>
                    <div class="card-content">
                        <div class="hint-content" id="hintContent" style="display: none;">
                            <div class="hint-text">${oneProblemInfo.hint}</div>
                        </div>
                        <div class="hint-placeholder" id="hintPlaceholder">
                            <p>💭 힌트를 보고 싶다면 위의 버튼을 클릭하세요!</p>
                        </div>
                    </div>
                </div>

                <!-- 해설 카드 (정답인 경우에만 표시) -->
                <div class="explanation-card" style="display: ${problemSubDTO.is_correct ? 'block' : 'none'}">
                    <div class="card-header">
                        <h3>📚 해설</h3>
                    </div>
                    <div class="card-content">
                        <div class="explanation-text">${oneProblemInfo.explanation}</div>
                    </div>
                </div>

                <!-- 액션 버튼 -->

            </div>
        </div>


    </div>

    <script src="${pageContext.request.contextPath}/js/problem/problem_result.js"></script>
</body>
</html>
