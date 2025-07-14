<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"   uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>문제 목록 - Java CodeZone</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/problem/problems.css">

</head>
<style>
.nav-problem {
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
            <h1 class="page-title">Java 문제 목록</h1>
            <p class="page-subtitle">다양한 Java 문제를 통해 실력을 향상시켜보세요</p>
        </div>

    

        <!-- 필터 섹션 -->
        <section class="filter-section">
        	<form method="get" action="problempage.do">			    
			    <input type="hidden" name="user_id" value="1" />
		            <div class="filter-container">
		                <div class="filter-group">
		                    <label for="difficulty">난이도</label>
		                    <select id="difficulty" name="difficulty_id">
		                        <option value="">전체</option>
		                        <option value="1">입문</option>
		                        <option value="2">기초</option>
		                        <option value="3">중급</option>
		                        <option value="4">고급</option>
		                    </select>
		                </div>
		                <div class="filter-group">
		                    <label for="category">카테고리</label>
		                    <select id="category" name="category_id">
		                        <option value="">전체</option>
		                        <option value="1">변수와 타입</option>
		                        <option value="2">조건문</option>
		                        <option value="3">반복문</option>
		                        <option value="4">배열</option>
		                        <option value="5">메소드</option>
		                        <option value="6">클래스</option>
		                    </select>
		                </div>
		                <div class="filter-group">
		                    <label for="search">검색</label>
		                    <input type="text" id="search" name="search" placeholder="문제 제목 검색...">
		                </div>
		            </div>
		            <div class="filter-actions">
		                <button class="custom-btn custom-btn-secondary">
		                    필터 초기화
		                </button>
		                <button class="custom-btn custom-btn-primary">
		                    검색
		                </button>
		            </div>
		      </form>
        </section>

        <!-- 문제 리스트 -->
        <section class="problems-container">
            <div class="problems-header">
                <div class="problems-count">총 ${problemCount}개 문제</div>
                <form method="get" action="problempage.do">
				    <div class="sort-selector">
				        <label for="sort">정렬:</label>
				        <select name="sort" id="sort" onchange="this.form.submit()">
				        	<option value="all" <c:if test="${sort == 'all'}">selected</c:if>>전체</option>
				            <option value="created" <c:if test="${sort == 'created'}">selected</c:if>>최신순</option>
				            <option value="title" <c:if test="${sort == 'title'}">selected</c:if>>제목순</option>
				            <option value="difficulty" <c:if test="${sort == 'difficulty'}">selected</c:if>>난이도순</option>
				        </select>
				    </div>
				
				    <!-- 기존 조건 유지용 hidden 필드 -->
				    <input type="hidden" name="category_id" value="${param.category_id}" />
				    <input type="hidden" name="difficulty_id" value="${param.difficulty_id}" />
				    <input type="hidden" name="search" value="${param.search}" />
				    <input type="hidden" name="page" value="${currentPage}" />
				    <input type="hidden" name="pageSize" value="${pageSize}" />
				    <input type="hidden" name="user_id" value="${param.user_id}" />
				</form>
            </div>

            <table class="problems-table">
                <thead>
                    <tr>
                        <th>제목</th>
                        <th>난이도</th>
                        <th>카테고리</th>
                        <th>시도횟수</th>
                    </tr>
                </thead>  
                <tbody>       
			        <c:forEach var="p" items="${problemList}" varStatus="status" >
			          <tr onclick="location.href='problemdetailpage.do?problem_id=${p.problem_id}'">
						  <td class="problem-title">${p.title}</td>
						  <td><span class="difficulty-badge difficulty-${difficultyList[status.index].difficultyName }">${difficultyList[status.index].difficultyName }</span></td>
						  
						  <td><span class="category-tag">${categoryList[status.index].categoryName}</span></td>
						  <td class="success-rate">
						    <span>${problemPlayCount[status.index ]}회</span>
						  </td>
					  </tr>
			        </c:forEach>
    			</tbody>
            </table>

            <!-- 페이지네이션 -->  
            
            <div class="pagination">
				  <c:if test="${currentPage > 1}">
				    <a href="problempage.do?page=${currentPage - 1}&pageSize=${pageSize}&sort=${sort}">이전</a>
				  </c:if>
				
				  <c:forEach var="i" begin="1" end="${totalPages}">
				    <a href="problempage.do?page=${i}&pageSize=${pageSize}&sort=${sort}" class="${i == currentPage ? 'active' : ''}">
				      ${i}
				    </a>
				  </c:forEach>
				
				  <c:if test="${currentPage < totalPages}">
				    <a href="problempage.do?page=${currentPage + 1}&pageSize=${pageSize}&sort=${sort}">다음</a>
				  </c:if>
			</div>
        </section>
    </div>
</body>
</html>