<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Java CodeZone - 코딩 기출문제 플랫폼</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/index.css?v=<%= System.currentTimeMillis() %>">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="loading-screen" id="loadingScreen">
        <div class="loader">
            <div class="code-animation">
                <span class="bracket">{</span>
                <span class="code-text">404</span>
                <span class="bracket">}</span>
            </div>
            <p class="loading-text">코딩의 세계로 진입 중...</p>
        </div>
    </div>

    <div class="main-content" id="mainContent" style="display: none;">
        <div class="background-animation">
            <div class="floating-code code-1">System.out.println("Hello World");</div>
            <div class="floating-code code-2">for(int i=0; i&lt;10; i++)</div>
            <div class="floating-code code-3">public class Main</div>
            <div class="floating-code code-4">if(condition == true)</div>
            <div class="floating-code code-5">ArrayList&lt;String&gt; list</div>
        </div>

        <div class="container">
            <div class="welcome-section">
                <div class="logo-section">
                    <h1 class="logo">404</h1>
                    <div class="logo-subtitle">CodeZone</div>
                </div>
                
                <div class="welcome-content">
                    <h2 class="welcome-title">Java 마스터의 여정을 시작하세요</h2>
                    <p class="welcome-description">
                        체계적인 학습과 실전 경험으로<br>
                        당신의 Java 실력을 한 단계 끌어올리세요
                    </p>
                    
                    <div class="features">
                        <div class="feature-item">
                            <div class="feature-icon">📚</div>
                            <span>다양한 기출문제</span>
                        </div>
                        <div class="feature-item">
                            <div class="feature-icon">🎯</div>
                            <span>난이도별 맞춤 학습</span>
                        </div>
                        <div class="feature-item">
                            <div class="feature-icon">🏆</div>
                            <span>실시간 랭킹 시스템</span>
                        </div>
                        <div class="feature-item">
                            <div class="feature-icon">💬</div>
                            <span>활발한 커뮤니티</span>
                        </div>
                    </div>
                    
                    <div class="action-buttons">
                        <a href="mainpage.do" class="btn-primary">
                            <span>지금 시작하기</span>
                            <div class="btn-arrow">→</div>
                        </a>
                    </div>
                </div>
            </div>
            

        </div>
                                                                                                                                                                                                                                                          
        <div class="particles" id="particles"></div>
    </div>

    <script src="${pageContext.request.contextPath}/index.js?v=<%= System.currentTimeMillis() %>"></script>
</body>
</html>