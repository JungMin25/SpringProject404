<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"   uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Java CodeZone - 코딩 기출문제 플랫폼</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/main/mainpage.css">
    <style>
        .dev-nav {
            background-color: #f8f9fa;
            padding: 10px;
            margin-bottom: 20px;
            border: 1px solid #dee2e6;
            border-radius: 4px;
        }
        .dev-nav h3 {
            margin: 0 0 10px 0;
            color: #dc3545;
        }
        .dev-nav .nav-section {
            margin-bottom: 15px;
        }
        .dev-nav .nav-section h4 {
            margin: 0 0 5px 0;
            color: #495057;
        }
        .dev-nav .nav-links {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        .dev-nav .nav-links a {
            padding: 5px 10px;
            background-color: #e9ecef;
            border-radius: 3px;
            text-decoration: none;
            color: #495057;
            font-size: 14px;
        }
        .dev-nav .nav-links a:hover {
            background-color: #dee2e6;
        }
    </style>
</head>
<body>
    <!-- 개발 테스트용 네비게이션 -->
    
  <!--   <div class="dev-nav">
        <h3>개발 테스트 전용 영역</h3>
        
        <div class="nav-section">
            <h4>사용자 관련</h4>
            <div class="nav-links">
                <a href="loginpage.do">로그인</a>
                <a href="registerpage.do">회원가입</a>
                <a href="usermypage.do">사용자 마이페이지</a>
                <a href="adminmypage.do">관리자 마이페이지</a>
            </div>
        </div>

        <div class="nav-section">
            <h4>문제 관련</h4>
            <div class="nav-links">
                <a href="problempage.do">문제 목록</a>
                <a href="problemdetailpage.do">문제 상세</a>
                <a href="probleminsertpage.do">문제 등록</a>
                <a href="problemupdatepage.do">문제 수정</a>
            </div>
        </div>

        <div class="nav-section">
            <h4>시험 관련</h4>
            <div class="nav-links">
                <a href="exampage.do">시험 목록</a>
                <a href="examplaypage.do">시험 진행</a>
                <a href="examfinish.do">시험 완료</a>
                <a href="examinsertpage.do">시험 등록</a>
            </div>
        </div>

        <div class="nav-section">
            <h4>게시판 관련</h4>
            <div class="nav-links">
                <a href="boardpage.do">게시판</a>
                <a href="boarddetailpage.do">게시글 상세</a>
                <a href="boardinsertpage.do">게시글 작성</a>
                <a href="boardupdatepage.do">게시글 수정</a>
            </div>
        </div>
    </div> -->

<%@ include file="../common/header.jsp" %>

    <!-- 메인 컨테이너 -->
    <div class="main-container">
        <!-- 히어로 섹션 -->
        <section class="hero-section">
            <h1 class="hero-title">Java 마스터가 되어보세요!</h1>
            <p class="hero-subtitle">체계적인 문제 풀이와 실전 경험으로 Java 실력을 향상시키세요</p>
            
            <div class="hero-stats">
                <div class="stat-item">
                    <div class="stat-number">${countProblems}</div>
                    <div class="stat-label">등록된 문제</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${countUsers}</div>
                    <div class="stat-label">활성 사용자</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${countSucProblem}</div>
                    <div class="stat-label">문제 해결</div>
                </div>
            </div>
        </section>

        <!-- 카테고리 섹션 -->
        <section>
            <h2 class="section-title">📚 학습 카테고리</h2>
            <div class="categories-grid">
             <a href="${pageContext.request.contextPath}/problempage.do?difficulty_id=&category_id=1&search=" class="category-card">
                 <h3 class="category-name">변수와 타입</h3>
                 <p class="category-desc">자바의 기본 변수 선언과 데이터 타입 학습</p>
                 <span class="category-count">${categoryProblemCount["1"]}개 문제</span>
             </a>
         
             <a href="${pageContext.request.contextPath}/problempage.do?difficulty_id=&category_id=2&search=" class="category-card">
                 <h3 class="category-name">조건문</h3>
                 <p class="category-desc">if, switch문을 활용한 조건 처리</p>
                 <span class="category-count">${categoryProblemCount["2"]}개 문제</span>
             </a>
         
             <a href="${pageContext.request.contextPath}/problempage.do?difficulty_id=&category_id=3&search=" class="category-card">
                 <h3 class="category-name">반복문</h3>
                 <p class="category-desc">for, while문을 활용한 반복 처리</p>
                 <span class="category-count">${categoryProblemCount["3"]}개 문제</span>
             </a>
         
             <a href="${pageContext.request.contextPath}/problempage.do?difficulty_id=&category_id=4&search=" class="category-card">
                 <h3 class="category-name">배열</h3>
                 <p class="category-desc">배열의 선언, 초기화, 활용</p>
                 <span class="category-count">${categoryProblemCount["4"]}개 문제</span>
             </a>
         
             <a href="${pageContext.request.contextPath}/problempage.do?&difficulty_id=&category_id=5&search=" class="category-card">
                 <h3 class="category-name">메소드</h3>
                 <p class="category-desc">메소드 정의와 호출, 매개변수와 반환값</p>
                 <span class="category-count">${categoryProblemCount["5"]}개 문제</span>
             </a>
         
             <a href="${pageContext.request.contextPath}/problempage.do?difficulty_id=&category_id=6&search=" class="category-card">
                 <h3 class="category-name">클래스와 객체</h3>
                 <p class="category-desc">객체지향 프로그래밍의 기초</p>
                 <span class="category-count">${categoryProblemCount["6"]}개 문제</span>
             </a>
         </div>
        </section>

        <!-- 난이도 섹션 -->
        <section>
          <h2 class="section-title">🎯 난이도별 학습</h2>
          <div class="difficulty-grid">
              <a class="difficulty-card beginner"
                 href="${pageContext.request.contextPath}/problempage.do?difficulty_id=1&category_id=&search=">
                  <h3 class="difficulty-name">입문</h3>
                  <p class="difficulty-reward">+10 EXP</p>
              </a>
      
              <a class="difficulty-card basic"
                 href="${pageContext.request.contextPath}/problempage.do?difficulty_id=2&category_id=&search=">
                  <h3 class="difficulty-name">기초</h3>
                  <p class="difficulty-reward">+25 EXP</p>
              </a>
      
              <a class="difficulty-card intermediate"
                 href="${pageContext.request.contextPath}/problempage.do?difficulty_id=3&category_id=&search=">
                  <h3 class="difficulty-name">중급</h3>
                  <p class="difficulty-reward">+50 EXP</p>
              </a>
      
              <a class="difficulty-card advanced"
                 href="${pageContext.request.contextPath}/problempage.do?difficulty_id=4&category_id=&search=">
                  <h3 class="difficulty-name">고급</h3>
                  <p class="difficulty-reward">+100 EXP</p>
              </a>
          </div>
      </section>
    </div>
    
    <script src="${pageContext.request.contextPath}/js/main/mainpage.js"></script>
</body>
</html> 