<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>문제 등록 - 404</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/problem/problem_insert.css">
    <style>
        .form-input, .form-select, .form-textarea {
            width: 100%;
            padding: 0.8rem;
            background: rgba(26, 26, 46, 0.8);
            border: 2px solid rgba(100, 255, 218, 0.3);
            border-radius: 8px;
            color: #e0e0e0;
            font-size: 1rem;
            margin-bottom: 1rem;
            font-family: inherit;
        }
        .form-input:focus, .form-select:focus, .form-textarea:focus {
            outline: none;
            border-color: #64ffda;
        }
        .form-label {
            color: #e0e0e0;
            font-weight: 600;
            margin-bottom: 0.5rem;
            display: block;
        }
        .required { color: #e74c3c; }
        .form-group { margin-bottom: 1.5rem; }
        .hint-input-group { 
            border: 1px solid rgba(100, 255, 218, 0.2);
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 1rem;
            background: rgba(26, 26, 46, 0.3);
        }
        .hint-header {
            font-weight: 600;
            color: #64ffda;
            margin-bottom: 0.5rem;
        }
        .preview-content {
            background: rgba(26, 26, 46, 0.5);
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 1rem;
        }
        .preview-title {
            color: #64ffda;
            font-size: 1.2rem;
            font-weight: bold;
            margin-bottom: 1rem;
        }
        .code-example {
            background: rgba(15, 15, 25, 0.9);
            padding: 1rem;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            border-left: 4px solid #64ffda;
            margin: 0.5rem 0;
            color: #e0e0e0;
        }
        .explanation-text {
            color: #b0b0b0;
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
        }
    </style>
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
                <a href="adminmypage.do">관리자 페이지</a>
                &gt;
                <span>새 문제 등록</span>
            </div>
        </div>
    </header>

    <!-- 메인 컨테이너 -->
    <div class="main-container">
        <!-- 왼쪽 패널 - 문제 등록 폼 -->
        <div class="problem-panel">
            <div class="problem-header">
                <h1 class="problem-title">📝 새 문제 등록</h1>
                <div class="problem-meta">
                    <div class="meta-item">
                        <span>새로운 Java 프로그래밍 문제를 등록하세요</span>
                    </div>
                </div>
            </div>

            <form id="problemForm" action="probleminsert.do" method="post">
                <div class="problem-content">
                    <div class="form-group">
                        <label class="form-label">문제 제목 <span class="required">*</span></label>
                        <input type="text" id="problemTitle" name="title" class="form-input" placeholder="문제 제목을 입력하세요" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label">카테고리 <span class="required">*</span></label>
                        <select id="problemCategory" name="category_id" class="form-select" required>
                            <option value="">카테고리를 선택하세요</option>
                            <option value="1">변수와 타입</option>
                            <option value="2">조건문</option>
                            <option value="3">반복문</option>
                            <option value="4">배열</option>
                            <option value="5">메소드</option>
                            <option value="6">클래스와 객체</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label">난이도 <span class="required">*</span></label>
                        <select id="problemDifficulty" name="difficulty_id" class="form-select" required>
                            <option value="">난이도를 선택하세요</option>
                            <option value="1">입문</option>
                            <option value="2">기초</option>
                            <option value="3">중급</option>
                            <option value="4">고급</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label">문제 설명 <span class="required">*</span></label>
                        <textarea id="problemDescription" name="description" class="form-textarea" rows="8" placeholder="문제에 대한 상세한 설명을 입력하세요" required></textarea>
                    </div>

                    <div class="form-group">
                        <label class="form-label">정답 코드 <span class="required">*</span></label>
                        <div class="explanation-text">학생들이 작성해야 하는 완전한 Java 코드를 입력하세요</div>
                        <textarea id="problemAnswerCode" name="correct_answer_code" class="form-textarea" rows="15" placeholder="정답 Java 코드를 작성하세요&#10;예: public static void main(String[] args) {&#10;    System.out.println(&quot;Hello World&quot;);&#10;}" required></textarea>
                    </div>

                    <div class="form-group">
                        <label class="form-label">정답 결과 <span class="required">*</span></label>
                        <div class="explanation-text">위 정답 코드를 실행했을 때 출력되는 결과를 입력하세요</div>
                        <textarea id="problemAnswer" name="correct_answer" class="form-textarea" rows="3" placeholder="정답 코드 실행 결과를 입력하세요&#10;예: Hello World" required></textarea>
                    </div>

                    <div class="form-group">
                        <label class="form-label">해설 <span class="required">*</span></label>
                        <textarea id="problemExplanation" name="explanation" class="form-textarea" rows="6" placeholder="문제에 대한 상세한 해설을 작성하세요" required></textarea>
                    </div>

                    <div class="form-group">
                        <label class="form-label">힌트</label>
                        <textarea id="problemHint" name="hint" class="form-textarea" rows="4" placeholder="문제 해결을 위한 힌트를 입력하세요"></textarea>
                        <small style="color: #b0b0b0; font-size: 0.85rem; margin-top: 0.5rem; display: block;">
                            💡 학습자가 어려워할 수 있는 부분에 대한 도움말을 작성해주세요.
                        </small>
                    </div>
                </div>

                    <div class="form-group">
                        <div style="text-align: center; margin-top: 2rem;">
                            <input type="submit" value="📝 문제 등록하기" class="btn btn-success" style="padding: 1rem 2rem; font-size: 1.1rem;">
                            <button type="button" class="btn btn-secondary" onclick="resetForm()" style="padding: 1rem 2rem; font-size: 1.1rem; margin-left: 1rem;">
                                🔄 초기화
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>


    </div>

    <script src="${pageContext.request.contextPath}/js/problem/problem_insert.js"></script>
</body>
</html> 