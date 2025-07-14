<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>게시글 상세보기 - Java CodeZone</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/board/board_detail.css">
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
                <a href="boardpage.do">커뮤니티</a>
                &gt;
                <span>게시글 상세보기</span>
            </div>

        </div>
    </header>

    <!-- 메인 컨테이너 -->
    <div class="main-container">
        <!-- 게시글 내용 -->
        <div class="post-container">
            <div class="post-header">
                <div class="post-meta">
                    <span class="category-badge" style="background-color:${onePostCat.category_color}">${onePostCat.category_name}</span>
                    <h1 class="post-title">${OnePostInfo.title}</h1>
                </div>
                <div class="post-info">
                    <div class="author-info">
                        <div class="author-avatar">👤</div>
                        <div class="author-details">
                            <div class="author-name">${onePostUser.nickname}</div>
                            <div class="post-date">${OnePostInfo.created_at}</div>
                        </div>
                    </div>
                    <div class="post-stats">
                        <span class="stat-item">조회 ${OnePostInfo.view_count}</span>
                    </div>
                </div>
            </div>
            <div class="post-content">
                <div class="content-body">
                    <p>${OnePostInfo.content}</p>
                </div>
                <div class="post-actions">
                    <c:if test="${sessionUser eq true}">
                        <div class="post-management" id="postManagement">
                            <form method="post" action="boardupdatepage.do" style="display:inline;">
                                <input type="hidden" name="post_id" value="${OnePostInfo.post_id}" />
                                <input type="submit" class="btn btn-warning" value="수정" />
                            </form>
                            <form method="post" action="deletePost.do" style="display:inline;">
                                <input type="hidden" name="post_id" value="${OnePostInfo.post_id}" />
                                <input type="submit" class="btn btn-danger" value="삭제" />
                            </form>
                        </div>
                    </c:if>
                </div>
            </div>
        </div>

        <!-- 댓글 섹션 -->
        <div class="comments-section">
            <div class="comments-header">
                <h3>댓글</h3>
            </div>
            <!-- 댓글 작성 -->
            <div class="comment-form" id="commentForm">
                <form method="post" action="insertComment.do">
                    <div class="form-header">
                        <div class="user-avatar">👤</div>
                        <div class="form-title">댓글 작성</div>
                    </div>
                    <div class="form-body">
                        <textarea class="comment-input" name="content" placeholder="댓글을 작성해주세요..." rows="3"></textarea>
                        <input type="hidden" name="post_id" value="${OnePostInfo.post_id}" />
                        <div class="form-actions">
                            <input type="submit" class="btn btn-primary" value="댓글 등록" />
                        </div>
                    </div>
                </form>
            </div>
            <!-- 댓글 목록 -->
            <div class="comments-list">
                <c:forEach var="comment" items="${postCommentList}" varStatus="status">
                <div class="comment-item">
                    <div class="comment-header">
                        <div class="comment-author">
                            <div class="author-avatar">👤</div>
                            <div class="author-details">
                                <div class="author-name">${postCommentUserList[status.index].nickname}</div>
                                <div class="comment-date">${comment.created_at}</div>
                            </div>
                        </div>
                    </div>
                    <div class="comment-content">
                        <p>${comment.content}</p>
                          <!-- ✅ 삭제 버튼 조건 추가 -->
                <c:if test="${not empty loginUser and loginUser.user_id == comment.user_id}">
                    <form method="post" action="deleteComment.do" style="display:inline; float:right; margin-left:10px;">
                    	<input type="hidden" name="post_id" value="${OnePostInfo.post_id}" />
                        <input type="hidden" name="comment_id" value="${comment.comment_id}" />
                        <button type="submit" class="btn btn-danger btn-xs" style="font-size:0.7rem; padding:2px 10px; height:24px; min-width:40px;">삭제</button>
                    </form>
                </c:if>
                    </div>
                </div>
                </c:forEach>
            </div>
        </div>
    </div>

    <script src="${pageContext.request.contextPath}/js/board/board_detail.js"></script>
</body>
</html>
