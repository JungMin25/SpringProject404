<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>게시글 작성 - Java CodeZone</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/board/board_insert.css">
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
                <span>게시글 작성</span>
            </div>

        </div>
    </header>

    <!-- 메인 컨테이너 -->
    <div class="main-container">
        <div class="form-container">
            <div class="form-header">
                <h1 class="form-title">✍️ 게시글 작성</h1>
                <p class="form-subtitle">Java 학습에 도움이 되는 유익한 내용을 공유해주세요</p>
            </div>

            <form class="post-form" id="postForm" action="boardinsert.do" method="post">
                <!-- 카테고리 선택 -->
                <div class="form-group">
                    <label for="category" class="form-label">
                        <span class="label-text">카테고리</span>
                        <span class="required">*</span>
                    </label>
                    <select id="category" name="category_id" class="form-select" required>
                        <option value="">카테고리를 선택해주세요</option>
                        <option value="1">Q&A</option>
                        <option value="2">팁 & 노하우</option>
                        <option value="3">스터디</option>
                        <option value="4">자유게시판</option>
                    </select>
                </div>

                <!-- 제목 입력 -->
                <div class="form-group">
                    <label for="title" class="form-label">
                        <span class="label-text">제목</span>
                        <span class="required">*</span>
                    </label>
                    <input type="text" id="title" name="title" class="form-input" 
                           placeholder="제목을 입력해주세요" maxlength="100" required>
                    <div class="input-helper">
                        <span class="char-count">0 / 100</span>
                    </div>
                </div>

                <!-- 내용 입력 -->
                <div class="form-group">
                    <label for="content" class="form-label">
                        <span class="label-text">내용</span>
                        <span class="required">*</span>
                    </label>
                    
                    <!-- 에디터 툴바 -->
                   
                    
                    <textarea id="content" name="content" class="form-textarea" 
                              placeholder="내용을 입력해주세요. Markdown 문법을 사용할 수 있습니다." 
                              rows="15" required></textarea>
                    
                    <div class="input-helper">
                        <span class="char-count">0 / 5000</span>
                        <span class="helper-text">
                            Markdown 문법 지원: **굵게**, *기울임*, `코드`, [링크](URL)
                        </span>
                    </div>
                </div>

                <!-- 폼 액션 -->
                <div class="form-actions">
                    <div class="action-buttons">
                        <input type="submit" class="btn btn-primary" value="게시글 등록" />
                    </div>
                </div>
            </form>
        </div>

        <!-- 가이드라인 -->
        <div class="guidelines">
            <h3>📋 게시글 작성 가이드라인</h3>
            <div class="guideline-content">
                <div class="guideline-section">
                    <h4>좋은 제목 작성법</h4>
                    <ul>
                        <li>구체적이고 명확한 제목을 작성해주세요</li>
                        <li>질문인 경우 어떤 부분이 궁금한지 명시해주세요</li>
                        <li>욕설, 비방, 광고성 내용은 금지됩니다</li>
                    </ul>
                </div>
                
                <div class="guideline-section">
                    <h4>내용 작성 팁</h4>
                    <ul>
                        <li>코드는 코드 블록(```)을 사용해서 입력해주세요</li>
                        <li>문제 상황과 시도해본 해결 방법을 함께 작성해주세요</li>
                        <li>다른 사람이 이해하기 쉽도록 자세히 설명해주세요</li>
                        <li>관련 에러 메시지가 있다면 함께 첨부해주세요</li>
                    </ul>
                </div>
                
                <div class="guideline-section">
                    <h4>커뮤니티 규칙</h4>
                    <ul>
                        <li>서로 존중하는 분위기를 만들어주세요</li>
                        <li>같은 내용의 중복 게시글은 자제해주세요</li>
                        <li>정확하지 않은 정보는 신중하게 공유해주세요</li>
                        <li>건설적인 피드백과 답변을 남겨주세요</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <script src="../../js/board/board_insert.js"></script>
</body>
</html>
