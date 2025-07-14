<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>시험 종료 - Java CodeZone</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/exam/exam_finish.css">
</head>
<body>
    <!-- 헤더 -->
    <header class="header">
        <div class="nav-container">
            <a href="../index.jsp" class="logo">
                404
            </a>
            <div class="exam-info">
                <span class="exam-title">Java 기초 시험 - 결과</span>
            </div>
            <div class="nav-actions">
                <button class="btn btn-info" onclick="location.href='mainpage.do'">
                    홈으로
                </button>
            </div>
        </div>
    </header>

    <!-- 메인 컨테이너 -->
    <div class="main-container">
        <!-- 결과 요약 -->
        <div class="result-summary">
            <div class="score-card">
                <div class="score-header">
                    <h1>🎉 시험 완료!</h1>
                    <p>수고하셨습니다. 시험 결과를 확인해보세요.</p>
                </div>
                <div class="score-display">
                    <div class="total-score">
                        <span class="score-number" id="correctRate">
                            <c:out value="${examSubDTO.correct_persent}"/>
                        </span>
                        <span class="score-unit">%</span>
                    </div>
                    <div class="score-grade" id="passResult">
                        <c:choose>
                            <c:when test="${examSubDTO.is_passed}">합격</c:when>
                            <c:otherwise>불합격</c:otherwise>
                        </c:choose>
                    </div>
                </div>
                <div class="score-breakdown">
                    <div class="breakdown-item">
                        <span class="label">합격 기준</span>
                        <span class="value">70% 이상</span>
                    </div>
                    <div class="breakdown-item">
                        <span class="label">최종 결과</span>
                        <span class="value" id="finalResult">
                            <c:choose>
                                <c:when test="${examSubDTO.is_passed}">합격</c:when>
                                <c:otherwise>불합격</c:otherwise>
                            </c:choose>
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 문제별 결과 -->
        <div class="results-detail">
            <div class="detail-header">
                <h2>📊 문제별 상세 결과</h2>
            </div>

            <div class="results-list" id="resultsList">
                <c:forEach var="problem" items="${problemList}" varStatus="status">
                    <c:set var="category" value="${categoryList[status.index]}"/>
                    <c:set var="difficulty" value="${difList[status.index]}"/>
                    <c:set var="answerDetail" value="${examAnsDetailList[status.index]}"/>
                    <div class="result-item ${answerDetail.is_correct ? 'correct' : 'wrong'}" data-status="${answerDetail.is_correct ? 'correct' : 'wrong'}">
                        <div class="result-header">
                            <div class="question-info">
                                <span class="question-number">${status.index + 1}</span>
                                <div class="question-details">
                                    <h3><c:out value="${problem.title}"/></h3>
                                    <div class="question-meta">
                                        <span class="difficulty-badge">${difficulty.difficultyName}</span>
                                        <span class="category-tag">${category.categoryName}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="result-status">
                                <div class="status-icon ${answerDetail.is_correct ? 'correct' : 'wrong'}">
                                    <c:choose>
                                        <c:when test="${answerDetail.is_correct}">✓</c:when>
                                        <c:otherwise>✗</c:otherwise>
                                    </c:choose>
                                </div>
                                <div class="status-text">
                                    <span class="status-label ${answerDetail.is_correct ? 'correct' : 'wrong'}">
                                        <c:choose>
                                            <c:when test="${answerDetail.is_correct}">정답</c:when>
                                            <c:otherwise>오답</c:otherwise>
                                        </c:choose>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="result-content">
                            <c:choose>
                                <c:when test="${answerDetail.is_correct}">
                                    <div class="user-answer">
                                        <h4>제출한 답안</h4>
                                        <pre class="code-block"><c:out value="${answerDetail.submitted_answer}"/></pre>
                                    </div>
                                    <div class="explanation">
                                        <h4>💡 해설</h4>
                                        <div>
                                            <p><c:out value="${problem.explanation}"/></p>
                                        </div>
                                    </div>
                                </c:when>
                                <c:otherwise>
                                    <div class="answer-comparison">
                                        <div class="user-answer">
                                            <h4>제출한 답안</h4>
                                            <pre class="code-block wrong"><c:out value="${answerDetail.submitted_answer}"/></pre>
                                        </div>
                                        <div class="correct-answer">
                                            <h4>정답 코드</h4>
                                            <pre class="code-block correct"><c:out value="${problem.correct_answer}"/></pre>
                                        </div>
                                    </div>
                                    <div class="explanation">
                                        <h4>💡 해설</h4>
                                        <div>
                                            <p><c:out value="${problem.explanation}"/></p>
                                        </div>
                                    </div>
                                </c:otherwise>
                            </c:choose>
                        </div>
                    </div>
                </c:forEach>
            </div>
        </div>
    </div>

    <script src="${pageContext.request.contextPath}/js/exam/exam_finish.js"></script>
</body>
</html>
