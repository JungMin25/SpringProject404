<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>게시판 - 404</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/board/board.css">
    <script src="${pageContext.request.contextPath}/js/board/board.js"></script>
    <style>
    .search-input::placeholder {
      color: #888;
      opacity: 1;
    }
    </style>
</head>
<style>
.nav-board {
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
            <h1 class="page-title">💬 커뮤니티</h1>
            <p class="page-subtitle">Java 학습에 대한 궁금증을 나누고 소통해보세요</p>
        </div>

        <!-- 카테고리 탭 -->
        <div class="board-section">
            <div class="section-header" style="display: flex; justify-content: space-between; align-items: center; gap: 10px;">
                <div class="category-tabs">
                    <form method="get" action="boardpage.do" style="display: flex; gap: 4px;">
                        <button type="submit" name="category_id" value="" class="category-tab${empty param.category_id ? ' active' : ''}">전체</button>
                        <button type="submit" name="category_id" value="1" class="category-tab${param.category_id == '1' ? ' active' : ''}">Q&amp;A</button>
                        <button type="submit" name="category_id" value="2" class="category-tab${param.category_id == '2' ? ' active' : ''}">팁 &amp; 노하우</button>
                        <button type="submit" name="category_id" value="3" class="category-tab${param.category_id == '3' ? ' active' : ''}">스터디</button>
                        <button type="submit" name="category_id" value="4" class="category-tab${param.category_id == '4' ? ' active' : ''}">자유</button>
                    </form>
                </div>
                <form method="get" action="boardpage.do" style="display: flex; align-items: center; gap: 4px;">
                    <input type="text" class="search-input" name="search" value="${param.search}" placeholder="게시글 검색..." style="border: 1px solid rgba(100, 255, 218, 0.3); background: rgba(26, 26, 46, 0.8) !important; color: #e0e0e0; padding: 6px 18px; border-radius: 4px; font-size: 1rem; height: 38px; min-width: 180px; box-sizing: border-box;"/>
                    <button type="submit" class="btn btn-primary search-btn">검색</button>
                    <c:if test="${not empty param.category_id}">
                        <input type="hidden" name="category_id" value="${param.category_id}" />
                    </c:if>
                </form>
                <a href="boardinsert.do" class="btn btn-primary" style="margin-left:auto;" onclick="return checkBoardLogin();">
                    글쓰기
                </a>
            </div>

            <!-- 게시글 목록 -->
            <div class="board-list">
                <div class="board-header">
                    <div class="col-category">카테고리</div>
                    <div class="col-title">제목</div>
                    <div class="col-author">작성자</div>
                    <div class="col-date">작성일</div>
                    <div class="col-views">조회</div>
                </div>
                <!-- 게시글 개수 및 페이지 정보 표시 -->
                <div class="board-info" style="margin: 10px 20PX; color: #888;">
                    총 <b>${totalCount}</b>개 게시글 / <b>${currentPage}</b>페이지 (페이지당 <b>${pageSize}</b>개)
                </div>

                <!-- 일반 게시글들 동적 출력 -->
                <c:forEach var="post" items="${postList}" varStatus="status">
                    <div class="board-item">
                        <div class="col-category">
                            <c:set var="categoryClass" value="" />
                            <c:choose>
                                <c:when test="${postCatList[status.index].category_name == 'Q&A'}">
                                    <c:set var="categoryClass" value="qna" />
                                </c:when>
                                <c:when test="${postCatList[status.index].category_name == '팁&노하우' || postCatList[status.index].category_name == '팁 & 노하우'}">
                                    <c:set var="categoryClass" value="tips" />
                                </c:when>
                                <c:when test="${postCatList[status.index].category_name == '스터디'}">
                                    <c:set var="categoryClass" value="study" />
                                </c:when>
                                <c:when test="${postCatList[status.index].category_name == '자유'}">
                                    <c:set var="categoryClass" value="free" />
                                </c:when>
                                <c:otherwise>
                                    <c:set var="categoryClass" value="notice" />
                                </c:otherwise>
                            </c:choose>
                            <span class="category-badge ${categoryClass}">
                                ${postCatList[status.index].category_name}
                            </span>
                        </div>
                        <div class="col-title">
                            <a href="boarddetailpage.do?post_id=${post.post_id}" class="title-link">
                                <span class="title-text">${post.title}</span>
                                <span class="comment-count">[${post.post_comment_count}]</span>
                            </a>
                        </div>
                        <div class="col-author">
                            ${postUserList[status.index].nickname}
                        </div>
                        <div class="col-date">
                            ${post.created_at}
                        </div>
                        <div class="col-views">${post.view_count}</div>
                    </div>
                </c:forEach>
            </div>

            <!-- 페이지네이션 -->
            <div class="pagination" style="display: flex; justify-content: center; align-items: center; gap: 4px; margin-top: 20px;">
                <c:forEach var="i" begin="1" end="${totalPages}">
                    <a class="page-btn${i == currentPage ? ' active' : ''}" href="?page=${i}">${i}</a>
                </c:forEach>
            </div>
        </div>
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
    function checkBoardLogin() {
        if (typeof isLoggedIn !== 'undefined' && !isLoggedIn) {
            alert('로그인 해주세요.');
            return false;
        }
        location.href = 'boardinsertpage.do';
        return false;
    }
    </script>
</body>
</html>
