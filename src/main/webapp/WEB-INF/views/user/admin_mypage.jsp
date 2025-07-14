<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="java.util.*" %>
<%@ page import="com.spring.project.dto.user.*" %>
<%@ page import="com.spring.project.dto.post.*" %>
<%@ page import="com.spring.project.dto.problem.*" %>
<%@ page import="com.spring.project.dto.exam.*" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>관리자 마이페이지 - 404</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/user/admin_mypage.css">
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
                <span>관리자 페이지</span>
            </div>
        </div>
    </header>

    <!-- 메인 컨테이너 -->
    <div class="main-container">
        <!-- 대시보드 요약 -->
        <div class="dashboard-summary">
            <div class="summary-card">
                <div class="summary-icon">👥</div>
                <div class="summary-content">
                    <h3>전체 사용자</h3>
                    <p class="summary-number">${totalUserCount != null ? totalUserCount : 0}</p>
                </div>
            </div>
            <div class="summary-card">
                <div class="summary-icon">📝</div>
                <div class="summary-content">
                    <h3>전체 게시글</h3>
                    <p class="summary-number">${totalPostCount != null ? totalPostCount : 0}</p>
                </div>
            </div>
        </div>

        <!-- 탭 메뉴 -->
        <div class="tab-container">
            <div class="tab active" onclick="switchTab('board', this)">게시글 관리</div>
            <div class="tab" onclick="switchTab('users', this)">사용자 관리</div>
            <div class="tab" onclick="switchTab('problems', this)">문제 관리</div>
            <div class="tab" onclick="switchTab('exams', this)">시험 관리</div>
        </div>

        <!-- 탭 컨텐츠 -->
        <div class="content-area">
            <!-- 게시글 관리 탭 -->
            <div class="tab-content active" id="board">
                <div class="section-card">
                    <div class="section-header">
                        <h3>게시글 관리</h3>
                    </div>
                    
                    <div class="board-table">
                        <div class="table-header">
                            <span>제목</span>
                            <span>카테고리</span>
                            <span>작업</span>
                        </div>
                        <c:forEach var="post" items="${getAllUserPostList}" varStatus="status">
                            <div class="table-row board-row">
                                <span>${post.title}</span>
                                <span class="category-tag" style="color: ${getAllUserPostCategoryList[status.index].category_color != null ? getAllUserPostCategoryList[status.index].category_color : '#64ffda'}">
                                    ${getAllUserPostCategoryList[status.index].category_name}
                                </span>
                                <div class="action-column">
                                    <a href="deleteBoardPost.do?post_id=${post.post_id}" 
                                       class="btn btn-sm btn-danger" onclick="return confirm('정말로 이 게시글을 삭제하시겠습니까?');">삭제</a>
                                </div>
                            </div>
                        </c:forEach>
                    </div>
                </div>
            </div>

            <!-- 사용자 관리 탭 -->
            <div class="tab-content" id="users">
                <div class="section-card">
                    <div class="section-header">
                        <h3>사용자 관리</h3>
                    </div>
                    
                    <div class="users-table">
                        <div class="table-header">
                            <span>닉네임</span>
                            <span>등급</span>
                            <span>시도한 문제</span>
                            <span>해결한 문제</span>
                            <span>정답률</span>
                            <span>가입일</span>
                        </div>
                        <c:forEach var="user" items="${getAllUserInfoList}" varStatus="status">
                            <div class="table-row">
                                <span>${user.nickname}</span>
                                <span class="grade-badge" style="background-color: ${getAllUserGradeList[status.index].grade_color != null ? getAllUserGradeList[status.index].grade_color : '#64ffda'}">${getAllUserGradeList[status.index].grade_name}</span>
                                <span>${getAllUserSubList[status.index].total_submissions != null ? getAllUserSubList[status.index].total_submissions : 0}</span>
                                <span>${getAllUserSubList[status.index].correct_submissions != null ? getAllUserSubList[status.index].correct_submissions : 0}</span>
                                <span>${getAllUserSubList[status.index].correct_rate != 0 ? getAllUserSubList[status.index].correct_rate : 0}%</span>
                                <span>${user.created_at != null ? user.created_at.substring(0, 10) : ''}</span>
                            </div>
                        </c:forEach>
                    </div>
                </div>
            </div>

            <!-- 문제 관리 탭 -->
            <div class="tab-content" id="problems">
                <div class="section-card">
                    <div class="section-header">
                        <h3>문제 관리</h3>
                        <div class="section-actions">
                            <a href="probleminsertpage.do" class="btn btn-primary">새 문제 등록</a>
                        </div>
                    </div>
                    
                    <div class="problems-table">
                        <div class="table-header">
                            <span>제목</span>
                            <span>카테고리</span>
                            <span>난이도</span>
                            <span>작업</span>
                        </div>
                        <c:forEach var="problem" items="${getAllProblemList}" varStatus="status">
                            <div class="table-row problem-row">
                                <span>${problem.title}</span>
                                <span>${getAllProblemCategoryList[status.index].categoryName}</span>
                                <span class="difficulty-badge difficulty-${getAllProblemLevelList[status.index].difficultyName}">${getAllProblemLevelList[status.index].difficultyName}</span>
                                <div class="action-buttons">
                                    <a href="problemupdatepage.do?problem_id=${problem.problem_id}" class="btn btn-sm btn-warning">수정</a>
                                    <a href="deleteProblem.do?problem_id=${problem.problem_id }"class="btn btn-sm btn-danger">삭제</a>
                                </div>
                            </div>
                        </c:forEach>
                    </div>
                </div>
            </div>

            <!-- 시험 관리 탭 -->
            <div class="tab-content" id="exams">
                <!-- 시험 통계 -->
               

                <div class="section-card">
                    <div class="section-header">
                        <h3>시험 관리</h3>
                        <div class="section-actions">
                            <a href="examinsertpage.do" class="btn btn-primary">새 시험 등록</a>
                        </div>
                    </div>
                    
                    <div class="exam-table">
                        <div class="table-header">
                            <span>시험 리스트</span>
                        </div>
                        <div class="exam-body">
                            <c:forEach var="exam" items="${getAllExamList}">
                                <div class="exam-item">
                                    <div class="exam-name">${exam.exam_title}</div>
                                    <div class="exam-buttons">
                                        <a href="examdelete.do?exam_id=${exam.exam_id}" class="btn btn-sm btn-danger" onclick="return confirm('정말로 이 시험을 삭제하시겠습니까?');">삭제</a>
                                    </div>
                                </div>
                            </c:forEach>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="${pageContext.request.contextPath}/js/user/admin_mypage.js"></script>
</body>
</html> 
