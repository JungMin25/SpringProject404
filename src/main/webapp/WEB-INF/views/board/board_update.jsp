<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>게시글 수정 - Java CodeZone</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/board/board_update.css">
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
                <span>게시글 수정</span>
            </div>

        </div>
    </header>

    <!-- 메인 컨테이너 -->
    <div class="main-container">
        <div class="form-container">
            <div class="form-header">
                <h1 class="form-title">✏️ 게시글 수정</h1>
                <p class="form-subtitle">작성하신 게시글을 수정할 수 있습니다</p>
            </div>

            <form class="post-form" id="postForm" method="post" action="updatePost.do">
                <!-- 카테고리 선택 -->
                <div class="form-group">
                    <label for="category" class="form-label">
                        <span class="label-text">카테고리</span>
                        <span class="required">*</span>
                    </label>
                    <select id="category" name="category_id" class="form-select" required>
                        <option value="">카테고리를 선택해주세요</option>
                        <option value="1" ${OnePostInfo.category_id == 1 ? 'selected' : ''}>Q&amp;A</option>
                        <option value="2" ${OnePostInfo.category_id == 2 ? 'selected' : ''}>팁 &amp; 노하우</option>
                        <option value="3" ${OnePostInfo.category_id == 3 ? 'selected' : ''}>스터디</option>
                        <option value="4" ${OnePostInfo.category_id == 4 ? 'selected' : ''}>자유</option>
                    </select>
                </div>

                <!-- 제목 입력 -->
                <div class="form-group">
                    <label for="title" class="form-label">
                        <span class="label-text">제목</span>
                        <span class="required">*</span>
                    </label>
                    <input type="text" id="title" name="title" class="form-input" 
                           placeholder="제목을 입력해주세요" maxlength="100" required
                           value="${OnePostInfo.title}">
                    <div class="input-helper">
                        <span class="char-count">${fn:length(OnePostInfo.title)} / 100</span>
                    </div>
                </div>

                <!-- 내용 입력 -->
                <div class="form-group">
                    <label for="content" class="form-label">
                        <span class="label-text">내용</span>
                        <span class="required">*</span>
                    </label>
                    
                    <textarea id="content" name="content" class="form-textarea" 
                              placeholder="내용을 입력해주세요. Markdown 문법을 사용할 수 있습니다." 
                              rows="15" required>${OnePostInfo.content}</textarea>
                    
                    <div class="input-helper">
                        <span class="char-count">${fn:length(OnePostInfo.content)} / 5000</span>
                    </div>
                </div>

                <!-- 폼 액션 -->
                <div class="form-actions">
                    <div class="action-buttons">
                        <button type="button" class="btn btn-secondary" onclick="goBackToPost()">
                            취소
                        </button>
                        <input type="hidden" name="post_id" value="${OnePostInfo.post_id}" />
                        <input type="submit" name="update" value="수정 완료" class="btn btn-primary" />
                    </div>
                </div>
            </form>
        </div>

        <!-- 수정 안내 -->
        <div class="edit-notice">
            <h3>📝 게시글 수정 안내</h3>
            <div class="notice-content">
                <div class="notice-item">
                    <h4>수정 권한</h4>
                    <p>본인이 작성한 게시글만 수정할 수 있습니다.</p>
                </div>
                <div class="notice-item">
                    <h4>주의사항</h4>
                    <p>많은 댓글이 달린 게시글의 경우 내용을 크게 변경하지 않는 것을 권장합니다.</p>
                </div>
            </div>
        </div>
    </div>

    <script src="/js/board/board_update.js"></script>
</body>
</html>
