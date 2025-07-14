<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<script type="text/javascript">
document.addEventListener("DOMContentLoaded", function () {
    const box = document.getElementById("loginErrorBox");
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");

    if (error === "1" && box) {
        box.textContent = "❌ 로그인에 실패했습니다. 다시 시도해주세요.";
        box.style.display = "block";
        box.classList.add("active");
    }
});
</script>


<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>로그인 - 404</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/user/login.css">
</head>
<body>
    <div class="auth-container">
        <div class="auth-content">
       <!--  <div class="alert-message">로그인에 실패했습니다...</div> -->
            <div class="logo-section">
                <a href="mainpage.do" class="logo">
                    404
                </a>
                <div class="logo-subtitle">코딩 실력을 향상시키는 가장 좋은 방법</div>
            </div>

            <div class="tab-container">
                <div class="tab active" data-tab="login">로그인</div>
                <div class="tab" data-tab="register">회원가입</div>
            </div>

            <div class="form-container">
            <div id="loginErrorBox" class="alert-message error-box" style="display: none;"></div>
            
                <form id="loginForm" action="login.do" method="post">
                    <div class="form-group">
                        <label for="loginUsername">아이디</label>
                        <input type="text" id="loginUsername" name="username" required>
                        <div class="error-message" id="loginUsernameError"></div>
                    </div>

                    <div class="form-group">
                        <label for="loginPassword">비밀번호</label>
                        <input type="password" id="loginPassword" name="password" required>
                        <div class="error-message" id="loginPasswordError"></div>
                    </div>

                    <button type="submit" class="submit-btn">로그인</button>
                    
                    <div class="divider">
                        <span>또는</span>
                    </div>
                    
                    <a href="${pageContext.request.contextPath}/oauth2/authorization/google" class="social-btn google">
                        <svg class="social-icon" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        <span>Google로 계속하기</span>
                    </a>
                </form>


            </div>
        </div>
    </div>
    <script src="${pageContext.request.contextPath}/js/user/login.js"></script>
</body>
</html> 