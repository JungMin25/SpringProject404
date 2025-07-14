<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>시험 - 404</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/exam/exam.css">
    <script src="${pageContext.request.contextPath}/js/exam/exam.js"></script>
</head>
<style>
.nav-exam {
    color: #64ffda !important;
    background-color: rgba(100, 255, 218, 0.15);
    border-radius: 10px;
    padding: 6px 6px;
}
</style>
<body>
    <%@ include file="../common/header.jsp" %>

    <!-- 메인 컨테이너 -->
    <div class="main-container">
        <!-- 페이지 헤더 -->
        <div class="page-header">
            <h1 class="page-title">📝 모의고사</h1>
            <p class="page-subtitle">실전 감각을 기를 수 있는 다양한 모의고사를 준비했습니다</p>
        </div>

        <!-- 시험 통계 -->
        <div class="exam-stats">
            <div class="stat-card">
                <div class="stat-number">${examSubCountDTO.total_submissions}</div>
                <div class="stat-label">시험 제출 횟수</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${examSubCountDTO.passed_count}</div>
                <div class="stat-label">합격한 시험 수</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${examSubCountDTO.pass_rate_percent}%</div>
                <div class="stat-label">합격률</div>
            </div>
        </div>

        <!-- 모의고사 목록 -->
        <section class="exam-section">
            <h2 class="section-title">📚 모의고사 목록</h2>
            
            <div class="exam-grid">
                <c:forEach var="exam" items="${examTitleList}">
                    <div class="exam-card">
                        <div class="exam-header">
                            <h3 class="exam-title">${exam.exam_title}</h3>
                        </div>
                        <a href="examplaypage.do?exam_id=${exam.exam_id}" class="exam-start-btn" onclick="return checkLogin();">시험 시작</a>
                    </div>
                </c:forEach>
            </div>
        </section>

    </div>

    <c:choose>
        <c:when test="${not empty sessionScope.userSession}">
            <script>var isLoggedIn = true;</script>
        </c:when>
        <c:otherwise>
            <script>var isLoggedIn = false;</script>
        </c:otherwise>
    </c:choose>
    
    <script>
    // 쿼리 파라미터에 loginRequired가 있으면 alert
    (function() {
        const params = new URLSearchParams(window.location.search);
        if (params.get('loginRequired') === 'true') {
            alert('로그인을 해주세요.');
        }
    })();
    </script>

</body>
</html> 