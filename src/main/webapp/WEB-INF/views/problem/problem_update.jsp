<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>문제 수정 - 404</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/problem/problem_update.css">
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
                <span>문제 수정</span>
            </div>
        </div>
    </header>

    <!-- 메인 컨테이너 -->
    <div class="main-container">
        <!-- 왼쪽 패널 - 문제 수정 폼 -->
        <div class="problem-panel">
            <div class="problem-header">
                <h1 class="problem-title">✏️ 문제 수정</h1>
            </div>

            <form id="problemForm" action="problemupdate.do" method="post">
                <input type="hidden" name="problem_id" value="${oneProblemInfo.problem_id}">
                <div class="problem-content">
                    <div class="form-group">
                        <label class="form-label">문제 제목 <span class="required">*</span></label>
                        <input type="text" id="problemTitle" name="title" class="form-input" value="${oneProblemInfo.title}" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label">카테고리 <span class="required">*</span></label>
                        <select id="problemCategory" name="category_id" class="form-select" required>
                            <option value="">카테고리를 선택하세요</option>
                            <option value="1" ${oneProblemCat.categoryName == '변수와타입' ? 'selected' : ''}>변수와타입</option>
                            <option value="2" ${oneProblemCat.categoryName == '조건문' ? 'selected' : ''}>조건문</option>
                            <option value="3" ${oneProblemCat.categoryName == '반복문' ? 'selected' : ''}>반복문</option>
                            <option value="4" ${oneProblemCat.categoryName == '배열' ? 'selected' : ''}>배열</option>
                            <option value="5" ${oneProblemCat.categoryName == '메소드' ? 'selected' : ''}>메소드</option>
                            <option value="6" ${oneProblemCat.categoryName == '클래스와객체' ? 'selected' : ''}>클래스와객체</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label">난이도 <span class="required">*</span></label>
                        <select id="problemDifficulty" name="difficulty_id" class="form-select" required>
                            <option value="">난이도를 선택하세요</option>
                            <option value="1" ${oneProblemDif.difficultyName == '입문' ? 'selected' : ''}>입문</option>
                            <option value="2" ${oneProblemDif.difficultyName == '기초' ? 'selected' : ''}>기초</option>
                            <option value="3" ${oneProblemDif.difficultyName == '중급' ? 'selected' : ''}>중급</option>
                            <option value="4" ${oneProblemDif.difficultyName == '고급' ? 'selected' : ''}>고급</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label">문제 설명 <span class="required">*</span></label>
                        <textarea id="problemDescription" name="description" class="form-textarea" rows="8" required>${oneProblemInfo.description}</textarea>
                    </div>

                    <div class="form-group">
                        <label class="form-label">정답 코드 <span class="required">*</span></label>
                        <textarea id="problemAnswer" name="correct_answer" class="form-textarea" rows="15" required>${oneProblemInfo.correct_answer}</textarea>
                    </div>

                    <div class="form-group">
                        <label class="form-label">해설 <span class="required">*</span></label>
                        <textarea id="problemExplanation" name="explanation" class="form-textarea" rows="6" required>${oneProblemInfo.explanation}</textarea>
                    </div>

                    <div class="form-group">
                        <label class="form-label">힌트</label>
                        <textarea id="problemHint" name="hint" class="form-textarea" rows="4">${oneProblemInfo.hint}</textarea>
                        <small style="color: #b0b0b0; font-size: 0.85rem; margin-top: 0.5rem; display: block;">
                            💡 학습자가 어려워할 수 있는 부분에 대한 도움말을 작성해주세요.
                        </small>
                    </div>

                    <div class="form-group">
                        <div style="text-align: center; margin-top: 2rem;">
                            <input type="submit" value="✏️ 문제 수정하기" class="btn btn-success" style="padding: 1rem 2rem; font-size: 1.1rem;">
                            <button type="button" class="btn btn-secondary" onclick="resetForm()" style="padding: 1rem 2rem; font-size: 1.1rem; margin-left: 1rem;">
                                🔄 초기화
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>

        <!-- 오른쪽 패널 - 문제 정보 & 미리보기 -->
        <div class="code-panel">
            <div class="code-header">
                <div class="language-info">
                    <span>문제 정보</span>
                </div>
                <div class="code-actions">
                    <button class="btn btn-info" onclick="previewProblem()">
                        새로고침
                    </button>
                    <a href="deleteProblem.do?problem_id=${oneProblemInfo.problem_id}" class="btn btn-danger" onclick="return confirm('정말로 이 문제를 삭제하시겠습니까?');">
                        문제 삭제
                    </a>
                </div>
            </div>

            <div class="result-panel">
                <!-- 미리보기 -->
                <div class="preview-content">
                    <div class="preview-title" id="previewTitle">${oneProblemInfo.title}</div>
                    <div class="problem-meta">
                        <div class="meta-item">
                            <span class="difficulty-badge difficulty-${oneProblemDif.difficultyName}" id="previewDifficulty">${oneProblemDif.difficultyName}</span>
                        </div>
                        <div class="meta-item">
                            <span class="category-tag" id="previewCategory">${oneProblemCat.categoryName}</span>
                        </div>
                    </div>
                </div>

                <div class="preview-content">
                    <h4>📝 문제 설명</h4>
                    <div id="previewDescription">${oneProblemInfo.description}</div>
                </div>

                <div class="preview-content">
                    <h4>🎯 정답 코드</h4>
                    <div class="code-example" id="previewAnswer">${oneProblemInfo.correct_answer}</div>
                </div>

                <div class="preview-content">
                    <h4>📚 해설</h4>
                    <div id="previewExplanation">${oneProblemInfo.explanation}</div>
                </div>

                <div class="preview-content">
                    <h4>💡 힌트</h4>
                    <div id="previewHint">${oneProblemInfo.hint}</div>
                </div>
            </div>
        </div>
    </div>

    <script src="${pageContext.request.contextPath}/js/problem/problem_update.js"></script>
</body>
</html> 