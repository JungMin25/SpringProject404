<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
.hd-header {
    background: rgba(26, 26, 46, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(100, 255, 218, 0.3);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    height: 70px;
}

.hd-nav-container {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    height: 100%;
}

.hd-logo {
    grid-column: 1;
    justify-self: start;
    font-size: 1.8rem;
    font-weight: bold;
    color: #64ffda;
    text-decoration: none;
    transition: color 0.3s ease;
}

.hd-logo:hover {
    color: #4fd3b8;
}

.hd-nav-menu {
    display: flex;
    list-style: none;
    gap: 30px;
    margin-left: 30px;
}

.hd-nav-menu a {
    text-decoration: none;
    color: #e0e0e0;
    font-weight: 500;
    transition: color 0.3s ease;
    padding: 6px 6px;
}

.hd-nav-menu a:hover {
    color: #64ffda;
}

.hd-user-section {
    grid-column: 3;
    justify-self: end;
    display: flex;
    align-items: center;
    gap: 1rem;
}

.hd-login-btn,
.hd-logout-btn {
    background: linear-gradient(135deg, #64ffda, #4fd3b8);
    color: #1a1a2e;
    border: none;
    padding: 0.5rem 1.5rem;
    border-radius: 25px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
}

.hd-login-btn:hover,
.hd-logout-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(100, 255, 218, 0.4);
}

.hd-user-nickname {
    color: #64ffda;
    font-weight: 600;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: background 0.3s ease;
}

.hd-user-nickname:hover {
    background: rgba(100, 255, 218, 0.1);
}

.hd-logged-in {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.hd-logged-out {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
}
.hd-login-btn{
	margin-right: 10px;
	width: 100px;
}

</style>
</head>
<body>
<!-- ✨ 헤더 시작 -->
<header class="hd-header">
    <div class="hd-nav-container">
        <a href="mainpage.do" class="hd-logo" >404</a>
        <nav>
            <ul class="hd-nav-menu">
                <li><a href="${pageContext.request.contextPath}/problempage.do" class="nav-problem">문제 목록</a></li>
                <li><a href="${pageContext.request.contextPath}/exampage.do" class="nav-exam">시험</a></li>
                <li><a href="${pageContext.request.contextPath}/boardpage.do" class="nav-board">커뮤니티</a></li>
            </ul>
        </nav>
        <div class="hd-user-section" id="userSection">
            <c:if test="${not empty userSession}">
                <div class="hd-logged-in" id="loggedIn">
                    <span class="hd-user-nickname" onclick="location.href='${pageContext.request.contextPath}/mypage.do?user_type=${userSession.user_type }'">
                        ${userSession.nickname}님
                    </span>
                    <button class="hd-logout-btn" onclick="location.href='${pageContext.request.contextPath}/logout.do'">로그아웃</button>
                </div>
            </c:if>
            <c:if test="${empty userSession}">
                <div class="hd-logged-out" id="loggedOut">
                    <button class="hd-login-btn" onclick="location.href='${pageContext.request.contextPath}/loginpage.do'">로그인</button>
                    <button class="hd-login-btn" onclick="location.href='${pageContext.request.contextPath}/registerpage.do'">회원가입</button>
                </div>
            </c:if>
        </div>
    </div>
</header>


</body>
</html>
