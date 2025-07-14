<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<script>
document.addEventListener("DOMContentLoaded", function () {
    const box = document.getElementById("registerErrorBox");
    if (box && box.textContent.trim() !== "") {
        box.classList.add("active");
    }
});
</script>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>회원가입 - 404</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/user/register.css">
</head>
<body>
    <div class="auth-container">
        <div class="auth-content">
            <div class="logo-section">
                <a href="mainpage.do" class="logo">
                    404
                </a>
                <div class="logo-subtitle">코딩 실력을 향상시키는 가장 좋은 방법</div>
            </div>

            <div class="tab-container">
                <div class="tab" data-tab="login">로그인</div>
                <div class="tab active" data-tab="register">회원가입</div>
            </div>

            <div class="form-container">
            <c:if test="${not empty errorMsg}">
			    <div id="registerErrorBox" class="alert-message error-box">
			        ${errorMsg}
			    </div>
			</c:if>

            
                <form id="registerForm" action="registerpage.do" method="post">
                    <div class="form-group">
                        <label for="username">아이디</label>
                        <input type="text" id="username" name="username" required>
                        <div class="error-message" id="registerIdError"></div>
                        <div class="success-message" id="registerIdSuccess"></div>
                    </div>

                    <div class="form-group">
                        <label for="password">비밀번호</label>
                        <input type="password" id="password" name="password" required>
                        <div class="error-message" id="registerPasswordError"></div>
                    </div>

                    <div class="form-group">
                        <label for="confirmPassword">비밀번호 확인</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" required>
                        <div class="error-message" id="confirmPasswordError"></div>
                    </div>

                    

                    <div class="form-group">
                        <label for="nickname">닉네임</label>
                        <input type="text" id="nickname" name="nickname" required>
                        <div class="error-message" id="registerNicknameError"></div>
                    </div>

                    <!-- 이메일 인증 UI 추가 -->
                    <div class="form-group">
                        <label for="email">이메일</label>
                        <div class="email-verification-container">
                            <input type="email" id="email" name="email" placeholder="example@email.com" required>
                            <button type="button" id="sendEmailBtn" class="send-email-btn">인증번호 발송</button>
                        </div>
                        <div class="error-message" id="emailError"></div>
                    </div>

                    <!-- 인증번호 입력란 (인증번호 발송 후에만 노출, JS로 show/hide 처리 권장) -->
                    <div class="form-group" id="verificationCodeGroup" style="display: none;">
                        <label for="verificationCode">인증번호</label>
                        <div class="verification-container">
                            <input type="text" id="verificationCode" name="verificationCode" placeholder="6자리 숫자" maxlength="6">
                            <button type="button" id="verifyCodeBtn" class="verify-btn">인증확인</button>
                        </div>
                        <div class="error-message" id="verificationCodeError"></div>
                        <div class="success-message" id="verificationCodeSuccess"></div>
                        <!-- 타이머 디자인 (동작은 JS 필요) -->
                        <div class="timer" id="timer" style="display: none;">남은 시간: <span id="timeLeft">03:00</span></div>
                    </div>

                    <button type="submit" class="submit-btn">회원가입</button>
                </form>


            </div>
        </div>
    </div>

    <script src="${pageContext.request.contextPath}/js/user/register.js"></script>
</body>
</html> 