<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>시험 생성 - Java CodeZone</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/exam/exam_insert.css">
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
                <a href="adminmypage.do">관리자 페이지</a>
                &gt;
                <span>새 시험 등록</span>
            </div>
        </div>
    </header>

    <!-- 메인 컨테이너 -->
    <div class="main-container">
        <!-- 페이지 헤더 -->
        <div class="page-header">
            <h1 class="page-title">📝 새 시험 등록</h1>
            <p class="page-subtitle">새로운 모의고사를 등록하고 문제를 구성하세요</p>
        </div>

        <!-- 시험 등록 폼 -->
        <div class="form-container">
            <form id="examForm" method="post" action="examinsert.do" onsubmit="return validateProblems();">
                <!-- 기본 정보 섹션 -->
                <div class="form-section">
                    <h2 class="section-title">📋 기본 정보</h2>
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="examTitle" class="form-label">시험 제목 <span class="required">*</span></label>
                            <input type="text" id="examTitle" name="exam_title" class="form-input" placeholder="시험 제목을 입력하세요" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="examDescription" class="form-label">시험 설명</label>
                            <textarea id="examDescription" name="description" class="form-textarea" placeholder="시험에 대한 설명을 입력하세요" rows="3"></textarea>
                        </div>
                    </div>
                </div>

                <!-- 문제 선택 섹션 -->
                <div class="form-section">
                    <h2 class="section-title">🎯 문제 선택</h2>
                    
                    <!-- 선택된 문제 수 표시 -->
                    <div class="filter-container">
                        <div class="selected-count">
                            <span id="selectedCount">선택된 문제: 0개</span>
                        </div>
                    </div>

                    <!-- 문제 목록 -->
                    <div class="problems-container">
                        <div class="problems-header">
                        </div>
                        
                        <div class="problems-list">
                            <c:forEach var="problem" items="${problemInfoList}" varStatus="status">
                                <div class="problem-item">
                                    <input type="checkbox" id="problem_${status.index}" name="selectedProblems" value="${problem.problem_id}">
                                    <label for="problem_${status.index}" class="problem-label">
                                        <div class="problem-info">
                                            <span class="problem-title"><c:out value="${problem.title}"/></span>
                                        </div>
                                    </label>
                                </div>
                            </c:forEach>
                        </div>
                    </div>
                </div>

                <!-- 버튼 섹션 -->
                <div class="form-actions">
                    <input type="submit" class="btn btn-primary" value="시험 등록" />
                </div>
            </form>
        </div>
    </div>

    <script src="${pageContext.request.contextPath}/js/exam/exam_insert.js"></script>
</body>
</html> 