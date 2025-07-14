<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>마이페이지 - Java CodeZone</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/user/user-mypage.css">
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
                <span>마이페이지</span>
            </div>
        </div>
    </header>

    <!-- 메인 컨테이너 -->
    <div class="main-container">
        <!-- 프로필 섹션 -->
        <div class="profile-section">
            <div class="profile-card">

                <div class="profile-info">
                    <h2 class="username">${sessionUser.nickname}</h2>
                    
                    <!-- 등급 및 경험치 -->
                    <div class="rank-section">
                        <div class="rank-badge">
                            <img src="${pageContext.request.contextPath}${sessionUserGrade.grade_icon}" alt="${sessionUserGrade.grade_name}" class="grade-icon">
                            <div class="rank-info">
                                <span class="rank-title" style="color: ${sessionUserGrade.grade_color};">${sessionUserGrade.grade_name}</span>
                                <span class="rank-points">${sessionUser.experience_points} XP</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="user-stats">
                        <div class="stat-item">
                            <span class="stat-number">${sessionUserSub.total_submissions}</span>
                            <span class="stat-label">총 시도한 문제</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">${sessionUserSub.correct_submissions}</span>
                            <span class="stat-label">맞춘 문제</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">${sessionUserSub.correct_rate}%</span>
                            <span class="stat-label">정답률</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 탭 메뉴 -->
        <div class="tab-container">
            <div class="tab" onclick="switchTab('activity')">활동 내역</div>
            <div class="tab" onclick="switchTab('solved')">해결한 문제</div>
            <div class="tab" onclick="switchTab('posts')">내 게시글</div>
            <div class="tab" onclick="switchTab('settings')">설정</div>
        </div>

        <!-- 탭 컨텐츠 -->
        <div class="content-area">
            <!-- 활동 내역 탭 -->
            <div class="tab-content" id="activity">
                <div class="section-card">
                    <h3>최근 활동</h3>
                    <div class="activity-list">
                        <c:forEach var="problem" items="${sessionProblemTitle}" varStatus="status">
                            <div class="activity-item">
                                <div class="activity-content">
                                    <p><strong>${problem.title}</strong></p>
                                    <p>${sessionProblemIsCorrect[status.index].is_correct ? '정답' : '오답'}</p>
                                </div>
                            </div>
                        </c:forEach>
                    </div>
                </div>
            </div>

            <!-- 해결한 문제 탭 -->
            <div class="tab-content" id="solved">
                <div class="section-card">
                    <div class="section-header">
                        <h3>해결한 문제</h3>
                       
                    </div>
                    <div class="activity-list">
                        <c:forEach var="problem" items="${sessionProblemTitle}" varStatus="status">
                            <c:if test="${sessionProblemIsCorrect[status.index].is_correct}">
                                <div class="activity-item" onclick="viewProblem(${problem.problem_id})">
                                    <div class="activity-icon success">✓</div>
                                    <div class="activity-content">
                                        <p><strong>${problem.title}</strong></p>
                                        <span class="difficulty-badge difficulty-${sessionProblemDifficulty[status.index].difficultyName}">${sessionProblemDifficulty[status.index].difficultyName}</span>
                                        <span class="category-tag">${sessionProblemCategory[status.index].categoryName}</span>
                                        
                                    </div>
                                </div>
                            </c:if>
                        </c:forEach>
                    </div>
                </div>
            </div>

            <!-- 내 게시글 탭 -->
            <div class="tab-content" id="posts">
                <div class="section-card">
                    <div class="section-header">
                        <h3>내가 작성한 게시글</h3>
                    </div>
                    <div class="activity-list">
                        <c:forEach var="post" items="${sessionPostTitle}" varStatus="status">
                            <div class="activity-item">
                                <div class="activity-icon post">📝</div>
                                <div class="activity-content">
                                    <p><strong>${post.title}</strong></p>
                                    <span class="category-tag">${sessionPostCategory[status.index].category_name}</span>
                                    <div class="post-actions">
                                        <a href="boardupdatepage.do?post_id=${post.post_id}" class="btn btn-sm btn-outline">수정</a>
                                        <a href="deletePostMy.do?post_id=${post.post_id}" class="btn btn-sm btn-danger" onclick="return confirm('정말로 삭제하시겠습니까?');">삭제</a>
                                    </div>
                                </div>
                            </div>
                        </c:forEach>
                    </div>
                </div>
            </div>

            <!-- 설정 탭 -->
            <div class="tab-content" id="settings">
                <div class="section-card">
                    <h3>계정 설정</h3>
                    <div class="settings-form-row" style="display: flex; gap: 20px;">
                        <form class="settings-form" action="userupdate.do" method="post" style="flex:1;">
                            <div class="form-group">
                                <label>닉네임</label>
                                <input type="text" name="nickname" value="${sessionUser.nickname}" class="form-input" required>
                            </div>
                            <button type="submit" class="btn btn-primary btn-sm" style="width:25%; margin-left:0; display:flex; justify-content:center; align-items:center;">닉네임 변경</button>
                        </form>
                        <form class="settings-form" action="userupdate.do" method="post" style="flex:1;">
                            <div class="form-group">
                                <label>변경할 비밀번호</label>
                                <input type="password" name="password" placeholder="변경할 비밀번호" class="form-input">
                            </div>
                            <button type="submit" class="btn btn-primary btn-sm" style="width:25%; margin-left:0; display:flex; justify-content:center; align-items:center;">비밀번호 변경</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="${pageContext.request.contextPath}/js/user/user_mypage.js?v=1.2"></script>
</body>
</html> 