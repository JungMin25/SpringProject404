let editor; // 모나코 에디터 인스턴스
let isEditorReady = false; // 에디터 준비 상태

// 페이지 로드 완료 후 모나코 에디터 초기화
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 로드 완료, 모나코 에디터 초기화 시작');
    initializeMonacoEditor();
});

// 모나코 에디터 초기화 함수
function initializeMonacoEditor() {
    console.log('모나코 에디터 초기화 시작');
    
    // 로딩 메시지 표시
    const loadingElement = document.getElementById('editorLoading');
    if (loadingElement) {
        loadingElement.style.display = 'block';
    }
    
    // 에디터 컨테이너 확인
    const editorContainer = document.getElementById('monaco-editor');
    if (!editorContainer) {
        console.error('에디터 컨테이너를 찾을 수 없습니다.');
        return;
    }
    
    // require가 로드될 때까지 대기
    function waitForRequire() {
        if (typeof require !== 'undefined') {
            console.log('require 객체 확인됨, 에디터 생성 시작');
            createEditor();
        } else {
            console.log('require 객체 대기 중...');
            setTimeout(waitForRequire, 100);
        }
    }
    
    waitForRequire();
}

// 에디터 생성 함수
function createEditor() {
    try {
        require(['vs/editor/editor.main'], function () {
            console.log('Monaco Editor 모듈 로드 완료');
            
            // Java 언어 등록 및 자동완성 설정
            monaco.languages.register({ id: 'java' });
            
            // Java 자동완성 제공자 등록
            monaco.languages.registerCompletionItemProvider('java', {
                provideCompletionItems: function(model, position) {
                    const suggestions = [
                        {
                            label: 'System.out.println',
                            kind: monaco.languages.CompletionItemKind.Method,
                            insertText: 'System.out.println(${1:"Hello World"});',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'Prints a line to the console'
                        },
                        {
                            label: 'System.out.print',
                            kind: monaco.languages.CompletionItemKind.Method,
                            insertText: 'System.out.print(${1:"Hello"});',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'Prints to the console without newline'
                        },
                        {
                            label: 'public static void main',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'public static void main(String[] args) {\n\t${1:// Your code here}\n}',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'Main method'
                        },
                        {
                            label: 'Scanner',
                            kind: monaco.languages.CompletionItemKind.Class,
                            insertText: 'Scanner ${1:scanner} = new Scanner(System.in);',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'Creates a new Scanner for input'
                        },
                        {
                            label: 'String',
                            kind: monaco.languages.CompletionItemKind.Class,
                            insertText: 'String ${1:str} = "${2:value}";',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'String variable declaration'
                        },
                        {
                            label: 'int',
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            insertText: 'int ${1:number} = ${2:0};',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'Integer variable declaration'
                        },
                        {
                            label: 'for',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'for (int ${1:i} = 0; ${1:i} < ${2:length}; ${1:i}++) {\n\t${3:// code}\n}',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'For loop'
                        },
                        {
                            label: 'if',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'if (${1:condition}) {\n\t${2:// code}\n}',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'If statement'
                        }
                    ];
                    return { suggestions: suggestions };
                }
            });
            
            // 기본 Java 코드 템플릿
            const defaultCode = `public class Main {
    public static void main(String[] args) {
        // 여기에 코드를 작성하세요
        
    }
}`;
            
            // 에디터 생성
            editor = monaco.editor.create(document.getElementById('monaco-editor'), {
                value: defaultCode,
                language: 'java',
                theme: 'vs-dark',
                fontSize: 14,
                automaticLayout: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                lineNumbers: 'on',
                roundedSelection: false,
                cursorStyle: 'line',
                selectOnLineNumbers: true,
                // 자동완성 설정
                suggest: {
                    enableExtensions: true,
                    filterGraceful: true,
                    snippetsPreventQuickSuggestions: false,
                    showKeywords: true,
                    showSnippets: true,
                    showClasses: true,
                    showMethods: true
                },
                quickSuggestions: {
                    other: true,
                    comments: false,
                    strings: false
                },
                parameterHints: {
                    enabled: true
                },
                acceptSuggestionOnCommitCharacter: true,
                acceptSuggestionOnEnter: 'on',
                suggestOnTriggerCharacters: true
            });
            
            // 에디터 준비 완료
            isEditorReady = true;
            console.log('Monaco Editor 생성 완료');
            
            // 로딩 메시지 숨기기
            const loadingElement = document.getElementById('editorLoading');
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }
            
            // 자동완성 트리거 이벤트 추가
            editor.onKeyDown(function(e) {
                // Ctrl+Space로 자동완성
                if (e.keyCode === monaco.KeyCode.Space && e.ctrlKey) {
                    e.preventDefault();
                    editor.trigger('', 'editor.action.triggerSuggest', {});
                }
                // 점(.) 입력 시 자동완성
                if (e.keyCode === monaco.KeyCode.Period) {
                    setTimeout(() => {
                        editor.trigger('', 'editor.action.triggerSuggest', {});
                    }, 100);
                }
            });
            
            // 에디터 리사이즈 이벤트 리스너 추가
            window.addEventListener('resize', function() {
                if (editor) {
                    editor.layout();
                }
            });
            
        });
    } catch (error) {
        console.error('Monaco Editor 초기화 중 오류:', error);
        
        // 에러 메시지 표시
        const loadingElement = document.getElementById('editorLoading');
        if (loadingElement) {
            loadingElement.innerHTML = '에디터 로딩에 실패했습니다. 페이지를 새로고침해주세요.';
            loadingElement.style.color = '#e74c3c';
        }
    }
}

// 코드 실행 함수 (2단계, 3단계 검증 포함)
function runCode() {
    if (!isEditorReady || !editor) {
        alert('에디터가 아직 준비되지 않았습니다. 잠시 후 다시 시도해주세요.');
        return;
    }
    
    const code = editor.getValue();
    console.log('실행할 코드:', code);
    
    // 결과 패널 보이기
    const resultPanel = document.getElementById('resultPanel');
    const resultStatus = document.getElementById('resultStatus');
    const resultContent = document.getElementById('resultContent');
    
    if (resultPanel) {
        resultPanel.style.opacity = '1';
        resultPanel.style.visibility = 'visible';
    }
    
    if (resultStatus && resultContent) {
        resultStatus.textContent = '검증 중...';
        resultStatus.className = 'result-status running';
        
        setTimeout(() => {
            const problemCategory = getCurrentProblemCategory();
            
            // 2단계: 키워드 검증
            const validator = new CodeValidator();
            const keywordResult = validator.validateCode(code, problemCategory);
            
            if (!keywordResult.validationPassed) {
                // 키워드 검증 실패 시에도 제출 가능하게 설정
                const hiddenIsCorrect = document.getElementById('hiddenIsCorrect');
                const hiddenResultInput = document.getElementById('hiddenResultInput');
                
                if (hiddenIsCorrect) {
                    hiddenIsCorrect.value = 'false'; // 오답으로 설정
                }
                if (hiddenResultInput) {
                    hiddenResultInput.value = 'keyword_validation_failed'; // 실행 결과 표시
                }
                
                resultContent.innerHTML = `
                    
                    <div style="background: #1a1a2e; padding: 10px; border-radius: 4px; font-family: monospace; color: #e0e0e0;">
                    <div style="display:flex; width : 70%;">
                    	<div style="width:17.5%;">
                        	<strong style="white-space: nowrap;">권장사항:</strong><br>
                        </div>
                        <div style="width:80%; ">
                        	<pre style=" color: #e74c3c;">${keywordResult.reason}</pre>
                        </div>
                    </div>
                        <br>
                    <div style="display:flex;">
                    	<div style="width:11%;">
                        	<strong style="white-space: nowrap;">💡 제안:</strong>
                        </div>
                        <div style="width:70%;">
                        	<pre style="color: #64ffda;">${keywordResult.suggestion}</pre>
                        </div>
                    </div>
                        <br>
                    <div style="display:flex;">
                    	<div style="width:11%;">
                        	<strong style="white-space: nowrap;">📝 참고:</strong><br>
                        </div>
                        <div style="width:70%;">
                        	<pre style="color: #f39c12;">현재 상태로도 제출 가능합니다. 결과는 제출 후 확인하세요.</pre>
                        </div>
                    </div>    
                    </div>
                `;
                resultStatus.textContent = '권장사항 확인 필요';
                resultStatus.className = 'result-status error';
                return;
            }
            
            // 3단계: 구조 분석
            const structureAnalyzer = new CodeStructureAnalyzer();
            const structureResult = structureAnalyzer.analyzeCodeStructure(code, problemCategory);
            
            if (!structureResult.passed.passed) {
                // 구조 분석 실패 시에도 제출 가능하게 설정
                const hiddenIsCorrect = document.getElementById('hiddenIsCorrect');
                const hiddenResultInput = document.getElementById('hiddenResultInput');
                
                if (hiddenIsCorrect) {
                    hiddenIsCorrect.value = 'false'; // 오답으로 설정
                }
                if (hiddenResultInput) {
                    hiddenResultInput.value = 'structure_analysis_failed'; // 실행 결과 표시
                }
                
                resultContent.innerHTML = `
                    <div style="color: #e74c3c; margin-bottom: 10px;">⚠️ 코드 구조 개선 권장</div>
                    <div style="background: #1a1a2e; padding: 10px; border-radius: 4px; font-family: monospace; color: #e0e0e0;">
                        <div style="margin-bottom: 10px;">
                            <strong>점수:</strong><br>
                            <span style="color: #64ffda;">키워드 점수: ${keywordResult.keywordScore}점</span><br>
                            <span style="color: #64ffda;">구조 점수: ${structureResult.passed.score}점</span>
                        </div>
                        <strong>💡 개선 제안:</strong><br>
                        <ul style="margin: 0; color: #64ffda;">
                            ${structureResult.suggestions.map(s => `<li>${s}</li>`).join('')}
                        </ul>
                        <br>
                        <strong>📝 참고:</strong><br>
                        <span style="color: #f39c12;">현재 상태로도 제출 가능합니다. 결과는 제출 후 확인하세요.</span>
                    </div>
                `;
                resultStatus.textContent = '개선 권장';
                resultStatus.className = 'result-status error';
                return;
            }
            
            // 코드 실행
            resultStatus.textContent = '실행 중...';
            
            try {
                const javaEngine = new JavaExecutionEngine();
                const executionResult = javaEngine.execute(code);
                const output = executionResult.output;
                
                console.log('🚀 통합 검증 및 실행 완료:', executionResult);
                
                // 4단계: 정답 비교 검증
                const expectedAnswer = document.getElementById('expectedAnswer')?.value?.trim() || '';
                const actualOutput = output.trim();
                
                console.log(`🎯 정답 비교 - 예상: "${expectedAnswer}", 실제: "${actualOutput}"`);
                
                const isCorrectAnswer = actualOutput === expectedAnswer;
                
                // 검증 결과를 hidden input에 저장 (항상)
                const hiddenIsCorrect = document.getElementById('hiddenIsCorrect');
                const hiddenResultInput = document.getElementById('hiddenResultInput');
                
                if (hiddenIsCorrect) {
                    hiddenIsCorrect.value = isCorrectAnswer ? 'true' : 'false';
                }
                if (hiddenResultInput) {
                    hiddenResultInput.value = actualOutput; // 실행 결과 항상 저장
                }
                
                // 정답 여부와 관계없이 실행 결과만 표시 (정답 여부는 제출 후에만 공개)
                resultContent.innerHTML = `
         
                   <div style="background: #1a1a2e; padding: 10px; border-radius: 6px; font-family: monospace; color: #e0e0e0; width: 100%; display: block;">

    <!-- 점수 정보 -->
    <div style="margin-bottom: 10px;">       
        <div style="display: flex; align-items: center; margin-bottom: 2px;">
            <strong style="min-width: 120px;">키워드 점수:</strong>
            <span style="color: #64ffda;">${keywordResult.keywordScore}점</span>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 2px;">
            <strong style="min-width: 120px;">구조 점수:</strong>
            <span style="color: #64ffda;">${structureResult.passed.score}점</span>
        </div>
        <div style="display: flex; align-items: center;">
            <strong style="min-width: 120px;">종합 점수:</strong>
            <span style="color: #2ecc71;">${Math.round((keywordResult.keywordScore + structureResult.passed.score) / 2)}점</span>
        </div>
    </div>

    <!-- 사용된 키워드 -->
    ${keywordResult.usedKeywords && keywordResult.usedKeywords.length > 0 ? `
    <div style="margin-bottom: 10px; display: flex; align-items: center;">
        <strong style="min-width: 120px; white-space: nowrap;">📋 사용된 키워드:</strong>
        <span style="color: #64ffda;">&nbsp;${keywordResult.usedKeywords.join(', ')}</span>
    </div>` : ''}

    <!-- 실행 결과 -->
    <div style="margin-bottom: 10px; display: flex; align-items: flex-start;">
        <strong style="min-width: 50px; white-space: nowrap;">📤 실행 결과:</strong>
        <pre style="margin: 0; color: #64ffda;">&nbsp;${actualOutput || '(출력 없음)'}</pre>
    </div>

    <!-- 상태 -->
    <div style="margin-bottom: 10px; display: flex; align-items: center;">
        <strong style="width: 15%;" white-space: nowrap;>📝 상태:</strong>
        <span style="color: #f39c12;">&nbsp;제출 준비 완료</span>
    </div>

<!-- 개선 제안 -->
${structureResult.suggestions && structureResult.suggestions.length > 0 ? `
<div style="margin-bottom: 10px; display: flex; align-items: center;">
    <div style="min-width: 40px; white-space: nowrap;">💡 개선 제안:</div>
    <div style="color: #64ffda; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1;">
       &nbsp;${structureResult.suggestions.join(', ')}
    </div>
</div>` : ''}



    <!-- 참고 -->
    <div style="padding: 8px; background: #2c3e50; border-radius: 4px; display: flex; align-items: center;">
        <strong style="width: 15%;">💡 참고:</strong>
        <span style="color: #f39c12;">&nbsp;정답 여부는 제출 후 결과 페이지에서 확인할 수 있습니다.</span>
    </div>
</div>

                `;
                resultStatus.textContent = '실행 완료';
                resultStatus.className = 'result-status success';
                
            } catch (error) {
                // 실행 오류 시에도 제출 가능하게 설정
                const hiddenIsCorrect = document.getElementById('hiddenIsCorrect');
                const hiddenResultInput = document.getElementById('hiddenResultInput');
                
                if (hiddenIsCorrect) {
                    hiddenIsCorrect.value = 'false'; // 오답으로 설정
                }
                if (hiddenResultInput) {
                    hiddenResultInput.value = 'execution_error'; // 실행 오류 표시
                }
                
                resultContent.innerHTML = `
                    <div style="color: #e74c3c; margin-bottom: 10px;">⚠️ 실행 중 오류 발생</div>
                    <div style="background: #1a1a2e; padding: 10px; border-radius: 4px; font-family: monospace; color: #e74c3c;">
                        ${error.message}
                        <br><br>
                        <strong>📝 참고:</strong><br>
                        <span style="color: #f39c12;">코드를 수정하거나 현재 상태로도 제출 가능합니다. 결과는 제출 후 확인하세요.</span>
                    </div>
                `;
                resultStatus.textContent = '실행 오류';
                resultStatus.className = 'result-status error';
            }
        }, 1500); // 실행 시간 시뮬레이션
    }
}

// 코드 제출 함수 (항상 제출 가능)
function submitCode() {
    if (!isEditorReady || !editor) {
        alert('에디터가 아직 준비되지 않았습니다. 잠시 후 다시 시도해주세요.');
        return;
    }
    
    // 코드 실행 여부 확인 (실행 결과가 있는지만 확인)
    const hiddenResultInput = document.getElementById('hiddenResultInput');
    const hiddenIsCorrect = document.getElementById('hiddenIsCorrect');
    
    if (!hiddenResultInput || hiddenResultInput.value === '') {
        alert('먼저 코드를 실행해주세요. "실행" 버튼을 클릭한 후 제출해주세요.');
        return;
    }
    
    // 제출 확인 (정답 여부 숨김)
    if (!confirm('코드를 제출하시겠습니까?\n제출 후 결과 페이지에서 정답 여부를 확인할 수 있습니다.')) {
        return;
    }
    
    try {
        // 1. 모나코 에디터에서 현재 코드 값 가져오기
        const currentCode = editor.getValue();
        
        // 2. 코드가 비어있는지 확인
        if (!currentCode.trim()) {
            alert('코드를 입력해주세요.');
            return;
        }
        
        console.log('제출할 코드:', currentCode);
        console.log('검증 상태:', hiddenResultInput.value ? '검증 통과' : '검증 실패');
        
        // 3. 숨겨진 input 필드에 코드 값 설정 (실행 결과 대신 코드 내용 전달)
        const hiddenCodeInput = document.getElementById('hiddenCodeInput');
        if (hiddenCodeInput) {
            hiddenCodeInput.value = currentCode;  // 코드 에디터의 내용을 전달
        } else {
            console.error('숨겨진 코드 입력 필드를 찾을 수 없습니다.');
            alert('제출 중 오류가 발생했습니다.');
            return;
        }
        
        // 4. 실행 결과 필드는 검증 통과 확인용으로만 사용
        // (실제 제출 시에는 hiddenCodeInput에 저장된 코드 내용이 전달됨)
        
        // 5. 폼 제출
        const submitForm = document.getElementById('codeSubmitForm');
        if (submitForm) {
            console.log('폼 제출 시작 - 코드 내용 전달');
            submitForm.submit();
        } else {
            console.error('제출 폼을 찾을 수 없습니다.');
            alert('제출 중 오류가 발생했습니다.');
        }
        
    } catch (error) {
        console.error('코드 제출 중 오류:', error);
        alert('코드 제출 중 오류가 발생했습니다.');
    }
}

// 코드 초기화 함수
function resetCode() {
    if (!isEditorReady || !editor) {
        alert('에디터가 아직 준비되지 않았습니다. 잠시 후 다시 시도해주세요.');
        return;
    }
    
    if (confirm('코드를 초기화하시겠습니까? 작성한 내용이 모두 삭제됩니다.')) {
        const defaultCode = `public class Main {
    public static void main(String[] args) {
        // 여기에 코드를 작성하세요
        
    }
}`;
        
        editor.setValue(defaultCode);
        editor.setPosition({ lineNumber: 3, column: 9 }); // 커서를 주석 뒤로 이동
        
        // 결과 패널 및 실행 결과 초기화
        const resultStatus = document.getElementById('resultStatus');
        const resultContent = document.getElementById('resultContent');
        const hiddenResultInput = document.getElementById('hiddenResultInput');
        
        if (resultStatus && resultContent) {
            resultStatus.textContent = '준비됨';
            resultStatus.className = 'result-status ready';
            resultContent.textContent = '코드를 실행하면 결과가 여기에 나타납니다.';
        }
        
        // 실행 결과도 초기화
        if (hiddenResultInput) {
            hiddenResultInput.value = "";
        }
        
        console.log('코드가 초기화되었습니다.');
    }
}

// 에러 처리 함수
window.addEventListener('error', function(e) {
    console.error('JavaScript 에러:', e.error);
});

// 페이지 언로드 시 정리
window.addEventListener('beforeunload', function() {
    if (editor) {
        editor.dispose();
    }
});

// 기존 함수들
function switchTab(tabName) {
    // 모든 탭 컨텐츠 숨기기
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // 모든 탭 버튼 비활성화
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    // 선택된 탭 컨텐츠 표시
    document.getElementById(tabName).classList.add('active');

    // 선택된 탭 버튼 활성화
    event.target.classList.add('active');
}

function logout() {
    if (confirm('로그아웃 하시겠습니까?')) {
        // 로그아웃 처리
        window.location.href = 'login.jsp';
    }
}

function viewProblemDetail(problemId) {
    // 문제 상세보기 페이지로 이동
    window.location.href = `problem-detail.jsp?id=${problemId}`;
}

function viewExamDetail(examId) {
    // 시험 상세보기 페이지로 이동
    window.location.href = `exam-detail.jsp?id=${examId}`;
}

// ========================= 고급 Java 실행 엔진 =========================

class JavaExecutionEngine {
    constructor() {
        this.variables = new Map();
        this.output = '';
        this.scope = 'global';
        this.classes = new Map(); // 클래스 정의 저장
        this.objects = new Map(); // 생성된 객체 저장
    }

    execute(code) {
        try {
            console.log('🔍 Java 코드 파싱 시작:', code);
            
            // 1. 토크나이저 - 코드를 토큰으로 분해
            const tokens = this.tokenize(code);
            console.log('📋 토큰 분해 결과:', tokens);

            // 2. 파서 - 토큰을 명령으로 변환
            const statements = this.parse(tokens);
            console.log('🌲 구문 분석 결과:', statements);

            // 3. 실행기 - 명령을 순차 실행
            this.executeStatements(statements);
            
            return {
                success: true,
                output: this.output,
                variables: Object.fromEntries(this.variables),
                message: 'Java 코드 실행 완료'
            };
        } catch (error) {
            console.error('❌ Java 실행 엔진 오류:', error);
            return {
                success: false,
                output: '',
                variables: {},
                error: error.message
            };
        }
    }

    // 토크나이저: 코드를 의미 있는 토큰으로 분해
    tokenize(code) {
        const tokens = [];
        
        // 1. 먼저 클래스 정의들을 파싱
        this.parseClasses(code);
        
        // 2. main 메소드 내부 코드만 추출
        const mainBodyMatch = code.match(/public\s+static\s+void\s+main\s*\([^)]*\)\s*\{([\s\S]*?)\}/);
        if (!mainBodyMatch) {
            throw new Error('main 메소드를 찾을 수 없습니다');
        }
        
        let mainBody = mainBodyMatch[1];
        
        // 주석 제거
        mainBody = mainBody.replace(/\/\/[^\n]*/g, '').replace(/\/\*[\s\S]*?\*\//g, '');
        
        // 라인별로 분리하여 처리
        const lines = mainBody.split('\n').map(line => line.trim()).filter(line => line);
        
        for (const line of lines) {
            if (line) {
                tokens.push(this.parseStatement(line));
            }
        }
        
        return tokens.filter(token => token !== null);
    }

    // 클래스 정의 파싱
    parseClasses(code) {
        // 클래스 정의 패턴 매칭
        const classRegex = /public\s+class\s+(\w+)\s*\{([\s\S]*?)\n\}/g;
        let match;
        
        while ((match = classRegex.exec(code)) !== null) {
            const className = match[1];
            const classBody = match[2];
            
            // 클래스 내 메서드들 파싱
            const methods = this.parseClassMethods(classBody);
            
            this.classes.set(className, {
                name: className,
                methods: methods
            });
            
            console.log(`📋 클래스 파싱 완료: ${className}`, methods);
        }
    }

    // 클래스 내 메서드 파싱
    parseClassMethods(classBody) {
        const methods = new Map();
        
        // 메서드 정의 패턴 매칭 (public void methodName() { ... })
        const methodRegex = /(public|private|protected)?\s*(void|int|String|boolean|double|float)\s+(\w+)\s*\([^)]*\)\s*\{([\s\S]*?)\}/g;
        let match;
        
        while ((match = methodRegex.exec(classBody)) !== null) {
            const visibility = match[1] || 'public';
            const returnType = match[2];
            const methodName = match[3];
            const methodBody = match[4];
            
            // 메서드 내부 코드 파싱
            const statements = this.parseMethodBody(methodBody);
            
            methods.set(methodName, {
                name: methodName,
                visibility: visibility,
                returnType: returnType,
                statements: statements
            });
            
            console.log(`📝 메서드 파싱: ${methodName}`, statements);
        }
        
        return methods;
    }

    // 메서드 내부 코드 파싱
    parseMethodBody(methodBody) {
        const statements = [];
        
        // 주석 제거
        methodBody = methodBody.replace(/\/\/[^\n]*/g, '').replace(/\/\*[\s\S]*?\*\//g, '');
        
        // if-else 블록을 먼저 처리
        methodBody = this.preprocessIfElseBlocks(methodBody);
        
        // 라인별로 분리하여 처리
        const lines = methodBody.split('\n').map(line => line.trim()).filter(line => line);
        
        for (const line of lines) {
            if (line && line !== '{' && line !== '}') {
                const stmt = this.parseStatement(line);
                if (stmt) {
                    statements.push(stmt);
                }
            }
        }
        
        return statements;
    }

    // if-else 블록을 전처리하여 단일 문장으로 변환
    preprocessIfElseBlocks(code) {
        // 더 유연한 if-else 블록 처리
        let result = code;
        
        // 개행과 공백을 고려한 정규식
        const ifElsePattern = /if\s*\([^)]+\)\s*\{[^}]*\}\s*else\s*\{[^}]*\}/gs;
        
        result = result.replace(ifElsePattern, (match) => {
            // if 조건 추출
            const conditionMatch = match.match(/if\s*\(([^)]+)\)/);
            const condition = conditionMatch ? conditionMatch[1].trim() : '';
            
            // if 블록 내용 추출
            const ifBodyMatch = match.match(/if\s*\([^)]+\)\s*\{([^}]*)\}/);
            const ifBody = ifBodyMatch ? ifBodyMatch[1].trim() : '';
            
            // else 블록 내용 추출
            const elseBodyMatch = match.match(/else\s*\{([^}]*)\}/);
            const elseBody = elseBodyMatch ? elseBodyMatch[1].trim() : '';
            
            console.log('🔍 if-else 블록 발견:', { condition, ifBody, elseBody });
            
            return `__IF_ELSE__${condition}__IF_BODY__${ifBody}__ELSE_BODY__${elseBody}__END__`;
        });
        
        return result;
    }

    // 개별 문장 파싱
    parseStatement(statement) {
        const trimmed = statement.trim();
        
        if (!trimmed || trimmed === '{' || trimmed === '}') {
            return null;
        }

        // Scanner 객체 생성: Scanner scanner = new Scanner(System.in);
        const scannerMatch = trimmed.match(/^Scanner\s+(\w+)\s*=\s*new\s+Scanner\s*\(\s*System\.in\s*\)\s*;$/);
        if (scannerMatch) {
            return {
                type: 'SCANNER_CREATION',
                variableName: scannerMatch[1]
            };
        }

        // Scanner 입력: int x = scanner.nextInt();
        const scannerInputMatch = trimmed.match(/^(int|String|double|float)\s+(\w+)\s*=\s*(\w+)\.(nextInt|nextLine|next|nextDouble|nextFloat)\s*\(\s*\)\s*;$/);
        if (scannerInputMatch) {
            return {
                type: 'SCANNER_INPUT',
                dataType: scannerInputMatch[1],
                variableName: scannerInputMatch[2],
                scannerName: scannerInputMatch[3],
                inputMethod: scannerInputMatch[4]
            };
        }

        // 배열 선언: int[] arr = new int[size];
        const arrayDeclarationMatch = trimmed.match(/^(int|String|double|float|boolean|char)\[\]\s+(\w+)\s*=\s*new\s+(int|String|double|float|boolean|char)\[(.+)\]\s*;$/);
        if (arrayDeclarationMatch) {
            return {
                type: 'ARRAY_DECLARATION',
                dataType: arrayDeclarationMatch[1],
                name: arrayDeclarationMatch[2],
                size: this.parseExpression(arrayDeclarationMatch[4].trim())
            };
        }

        // 배열 초기화: int[] arr = {1, 2, 3};
        const arrayInitMatch = trimmed.match(/^(int|String|double|float|boolean|char)\[\]\s+(\w+)\s*=\s*\{(.+)\}\s*;$/);
        if (arrayInitMatch) {
            return {
                type: 'ARRAY_INITIALIZATION',
                dataType: arrayInitMatch[1],
                name: arrayInitMatch[2],
                values: arrayInitMatch[3].split(',').map(v => this.parseValue(v.trim()))
            };
        }

        // 증감 연산자: i++, ++i, i--, --i
        const incrementMatch = trimmed.match(/^(\+\+(\w+)|(\w+)\+\+|--(\w+)|(\w+)--);$/);
        if (incrementMatch) {
            let variable, operator, isPrefix;
            if (incrementMatch[2]) { // ++i
                variable = incrementMatch[2];
                operator = '++';
                isPrefix = true;
            } else if (incrementMatch[3]) { // i++
                variable = incrementMatch[3];
                operator = '++';
                isPrefix = false;
            } else if (incrementMatch[4]) { // --i
                variable = incrementMatch[4];
                operator = '--';
                isPrefix = true;
            } else if (incrementMatch[5]) { // i--
                variable = incrementMatch[5];
                operator = '--';
                isPrefix = false;
            }
            return {
                type: 'INCREMENT_STATEMENT',
                variable: variable,
                operator: operator,
                isPrefix: isPrefix
            };
        }

        // 객체 생성과 변수 할당: ClassName var = new ClassName();
        const objectCreationMatch = trimmed.match(/^(\w+)\s+(\w+)\s*=\s*new\s+(\w+)\s*\(\s*\)\s*;$/);
        if (objectCreationMatch) {
            return {
                type: 'OBJECT_CREATION',
                className: objectCreationMatch[1],
                variableName: objectCreationMatch[2],
                constructorClass: objectCreationMatch[3]
            };
        }

        // 메서드 호출 (매개변수 있음): object.method(param1, param2);
        const methodCallWithParamsMatch = trimmed.match(/^(\w+)\.(\w+)\s*\((.+)\)\s*;$/);
        if (methodCallWithParamsMatch) {
            const params = methodCallWithParamsMatch[3].split(',').map(p => this.parseExpression(p.trim()));
            return {
                type: 'METHOD_CALL',
                objectName: methodCallWithParamsMatch[1],
                methodName: methodCallWithParamsMatch[2],
                parameters: params
            };
        }

        // 메서드 호출 (매개변수 없음): object.method();
        const methodCallMatch = trimmed.match(/^(\w+)\.(\w+)\s*\(\s*\)\s*;$/);
        if (methodCallMatch) {
            return {
                type: 'METHOD_CALL',
                objectName: methodCallMatch[1],
                methodName: methodCallMatch[2],
                parameters: []
            };
        }

        // 변수 선언: int name; 또는 String name;
        const varDeclarationMatch = trimmed.match(/^(int|String|double|float|boolean|char|long|short|byte)\s+(\w+)\s*;$/);
        if (varDeclarationMatch) {
            return {
                type: 'VARIABLE_DECLARATION',
                dataType: varDeclarationMatch[1],
                name: varDeclarationMatch[2]
            };
        }

        // 변수 선언과 초기화: int name = value; 또는 String name = "value";
        const varInitMatch = trimmed.match(/^(int|String|double|float|boolean|char|long|short|byte)\s+(\w+)\s*=\s*(.+);$/);
        if (varInitMatch) {
            return {
                type: 'VARIABLE_INITIALIZATION',
                dataType: varInitMatch[1],
                name: varInitMatch[2],
                value: this.parseValue(varInitMatch[3].trim())
            };
        }

        // 변수 할당: name = value;
        const assignmentMatch = trimmed.match(/^(\w+)\s*=\s*(.+);$/);
        if (assignmentMatch) {
            return {
                type: 'ASSIGNMENT',
                name: assignmentMatch[1],
                value: this.parseValue(assignmentMatch[2].trim())
            };
        }

        // 전처리된 if-else 블록: __IF_ELSE__condition__IF_BODY__ifStatements__ELSE_BODY__elseStatements__END__
        const ifElseBlockMatch = trimmed.match(/^__IF_ELSE__(.+?)__IF_BODY__(.+?)__ELSE_BODY__(.+?)__END__$/);
        if (ifElseBlockMatch) {
            const condition = ifElseBlockMatch[1].trim();
            const ifBody = ifElseBlockMatch[2].trim();
            const elseBody = ifElseBlockMatch[3].trim();
            
            // if와 else 블록의 문장들을 파싱
            const ifStatements = [];
            const elseStatements = [];
            
            if (ifBody) {
                const ifLines = ifBody.split(';').filter(line => line.trim());
                for (const line of ifLines) {
                    const stmt = this.parseStatement(line.trim() + ';');
                    if (stmt) {
                        ifStatements.push(stmt);
                    }
                }
            }
            
            if (elseBody) {
                const elseLines = elseBody.split(';').filter(line => line.trim());
                for (const line of elseLines) {
                    const stmt = this.parseStatement(line.trim() + ';');
                    if (stmt) {
                        elseStatements.push(stmt);
                    }
                }
            }
            
            return {
                type: 'IF_ELSE_BLOCK',
                condition: this.parseExpression(condition),
                ifStatements: ifStatements,
                elseStatements: elseStatements
            };
        }

        // System.out.print 또는 System.out.println
        const printMatch = trimmed.match(/^System\.out\.(print|println)\s*\((.+)\);$/);
        if (printMatch) {
            return {
                type: 'PRINT',
                method: printMatch[1],
                argument: this.parseExpression(printMatch[2].trim())
            };
        }

        console.warn('⚠️ 인식되지 않은 구문:', trimmed);
        return null;
    }

    // 값 파싱 (문자열, 숫자, 변수 등)
    parseValue(valueStr) {
        const trimmed = valueStr.trim();
        
        // 문자열 리터럴
        if (trimmed.match(/^".*"$/)) {
            return {
                type: 'STRING_LITERAL',
                value: trimmed.slice(1, -1)
            };
        }
        
        // 문자 리터럴
        if (trimmed.match(/^'.'$/)) {
            return {
                type: 'CHAR_LITERAL',
                value: trimmed.slice(1, -1)
            };
        }
        
        // 정수 리터럴
        if (trimmed.match(/^-?\d+[lL]?$/)) {
            return {
                type: 'NUMBER_LITERAL',
                value: parseInt(trimmed.replace(/[lL]$/, ''))
            };
        }
        
        // 실수 리터럴
        if (trimmed.match(/^-?\d+\.\d+[fFdD]?$/)) {
            return {
                type: 'NUMBER_LITERAL',
                value: parseFloat(trimmed.replace(/[fFdD]$/, ''))
            };
        }
        
        // 불린 리터럴
        if (trimmed === 'true' || trimmed === 'false') {
            return {
                type: 'BOOLEAN_LITERAL',
                value: trimmed === 'true'
            };
        }
        
        // null 리터럴
        if (trimmed === 'null') {
            return {
                type: 'NULL_LITERAL',
                value: null
            };
        }
        
        // 배열 접근: arr[index]
        const arrayAccessMatch = trimmed.match(/^(\w+)\[(.+)\]$/);
        if (arrayAccessMatch) {
            return {
                type: 'ARRAY_ACCESS',
                arrayName: arrayAccessMatch[1],
                index: this.parseExpression(arrayAccessMatch[2])
            };
        }
        
        // Math 메서드: Math.abs(x), Math.max(a, b)
        const mathMethodMatch = trimmed.match(/^Math\.(\w+)\s*\(([^)]*)\)$/);
        if (mathMethodMatch) {
            const params = mathMethodMatch[2].trim() ? 
                mathMethodMatch[2].split(',').map(p => this.parseExpression(p.trim())) : [];
            return {
                type: 'METHOD_RESULT',
                objectName: 'Math',
                methodName: mathMethodMatch[1],
                parameters: params
            };
        }
        
        // 변수 참조
        if (trimmed.match(/^\w+$/)) {
            return {
                type: 'VARIABLE',
                name: trimmed
            };
        }
        
        // 표현식 처리
        if (this.containsOperator(trimmed)) {
            return this.parseExpression(trimmed);
        }
        
        throw new Error(`인식할 수 없는 값: ${trimmed}`);
    }

    // 연산자 포함 여부 확인
    containsOperator(str) {
        const operators = ['+', '-', '*', '/', '%', '==', '!=', '<', '>', '<=', '>=', '&&', '||', '!'];
        return operators.some(op => str.includes(op));
    }

    // 표현식 파싱 (연산, 문자열 연결 등)
    parseExpression(expr) {
        const trimmed = expr.trim();
        
        // 괄호로 둘러싸인 표현식
        if (trimmed.startsWith('(') && trimmed.endsWith(')')) {
            return this.parseExpression(trimmed.slice(1, -1));
        }
        
        // 논리 연산자 (우선순위가 낮음)
        for (const op of ['||', '&&']) {
            const parts = this.splitExpression(trimmed, op);
            if (parts.length > 1) {
                return {
                    type: 'BINARY_EXPRESSION',
                    operator: op,
                    left: this.parseExpression(parts[0]),
                    right: this.parseExpression(parts[1])
                };
            }
        }
        
        // 비교 연산자
        for (const op of ['==', '!=', '<=', '>=', '<', '>']) {
            const parts = this.splitExpression(trimmed, op);
            if (parts.length > 1) {
                return {
                    type: 'BINARY_EXPRESSION',
                    operator: op,
                    left: this.parseExpression(parts[0]),
                    right: this.parseExpression(parts[1])
                };
            }
        }
        
        // 산술 연산자 (덧셈, 뺄셈)
        for (const op of ['+', '-']) {
            const parts = this.splitExpression(trimmed, op);
            if (parts.length > 1) {
                return {
                    type: 'BINARY_EXPRESSION',
                    operator: op,
                    left: this.parseExpression(parts[0]),
                    right: this.parseExpression(parts[1])
                };
            }
        }
        
        // 산술 연산자 (곱셈, 나눗셈, 나머지)
        for (const op of ['*', '/', '%']) {
            const parts = this.splitExpression(trimmed, op);
            if (parts.length > 1) {
                return {
                    type: 'BINARY_EXPRESSION',
                    operator: op,
                    left: this.parseExpression(parts[0]),
                    right: this.parseExpression(parts[1])
                };
            }
        }
        
        // 삼항 연산자 (condition ? trueValue : falseValue)
        const ternaryMatch = trimmed.match(/^(.+?)\s*\?\s*(.+?)\s*:\s*(.+)$/);
        if (ternaryMatch) {
            return {
                type: 'TERNARY_EXPRESSION',
                condition: this.parseExpression(ternaryMatch[1].trim()),
                trueValue: this.parseExpression(ternaryMatch[2].trim()),
                falseValue: this.parseExpression(ternaryMatch[3].trim())
            };
        }

        // 단항 연산자 (!expr, -expr)
        if (trimmed.startsWith('!')) {
            return {
                type: 'UNARY_EXPRESSION',
                operator: '!',
                operand: this.parseExpression(trimmed.slice(1))
            };
        }
        
        if (trimmed.startsWith('-') && trimmed.length > 1 && isNaN(trimmed)) {
            return {
                type: 'UNARY_EXPRESSION',
                operator: '-',
                operand: this.parseExpression(trimmed.slice(1))
            };
        }
        
        // 단순 값인 경우
        return this.parseValue(trimmed);
    }

    // 표현식을 연산자로 분리 (괄호 고려)
    splitExpression(expr, operator) {
        let level = 0;
        let inString = false;
        let inChar = false;
        
        for (let i = 0; i <= expr.length - operator.length; i++) {
            const char = expr[i];
            const substr = expr.substring(i, i + operator.length);
            
            if (char === '"' && !inChar) {
                inString = !inString;
            } else if (char === "'" && !inString) {
                inChar = !inChar;
            } else if (!inString && !inChar) {
                if (char === '(') {
                    level++;
                } else if (char === ')') {
                    level--;
                } else if (substr === operator && level === 0) {
                    return [
                        expr.substring(0, i).trim(),
                        expr.substring(i + operator.length).trim()
                    ];
                }
            }
        }
        
        return [expr.trim()];
    }

    // 구문 분석된 토큰들을 문장으로 그룹화
    parse(tokens) {
        return tokens;
    }

    // 명령문들 실행
    executeStatements(statements) {
        for (const stmt of statements) {
            this.executeStatement(stmt);
        }
    }

    // 개별 명령문 실행
    executeStatement(stmt) {
        console.log('⚡ 실행 중:', stmt);
        
        switch (stmt.type) {
            case 'VARIABLE_DECLARATION':
                this.declareVariable(stmt);
                break;
                
            case 'VARIABLE_INITIALIZATION':
                this.initializeVariable(stmt);
                break;
                
            case 'ASSIGNMENT':
                this.assignVariable(stmt);
                break;
                
            case 'PRINT':
                this.executePrint(stmt);
                break;
                
            case 'OBJECT_CREATION':
                this.createObject(stmt);
                break;
                
            case 'METHOD_CALL':
                this.callMethod(stmt);
                break;
                
            case 'SCANNER_CREATION':
                this.createScanner(stmt);
                break;
                
            case 'SCANNER_INPUT':
                this.handleScannerInput(stmt);
                break;
                
            case 'ARRAY_DECLARATION':
                this.declareArray(stmt);
                break;
                
            case 'ARRAY_INITIALIZATION':
                this.initializeArray(stmt);
                break;
                
            case 'INCREMENT_STATEMENT':
                this.executeIncrement(stmt);
                break;
                
            case 'IF_ELSE_BLOCK':
                this.executeIfElseBlock(stmt);
                break;
                
            default:
                console.warn('⚠️ 지원되지 않는 명령문:', stmt.type);
        }
    }

    // 변수 선언
    declareVariable(stmt) {
        const defaultValue = this.getDefaultValue(stmt.dataType);
        this.variables.set(stmt.name, defaultValue);
        console.log(`📝 변수 선언: ${stmt.name} (${stmt.dataType}) = ${defaultValue}`);
    }

    // 변수 초기화
    initializeVariable(stmt) {
        const value = this.evaluateValue(stmt.value);
        this.variables.set(stmt.name, value);
        console.log(`📝 변수 초기화: ${stmt.name} (${stmt.dataType}) = ${value}`);
    }

    // 변수 할당
    assignVariable(stmt) {
        if (!this.variables.has(stmt.name)) {
            throw new Error(`변수 '${stmt.name}'이 선언되지 않았습니다`);
        }
        
        const value = this.evaluateValue(stmt.value);
        this.variables.set(stmt.name, value);
        console.log(`✏️ 변수 할당: ${stmt.name} = ${value}`);
    }

    // 출력 실행
    executePrint(stmt) {
        const value = this.evaluateExpression(stmt.argument);
        const stringValue = String(value);
        
        if (stmt.method === 'println') {
            this.output += stringValue + '\n';
        } else {
            this.output += stringValue;
        }
        
        console.log(`🖨️ 출력: "${stringValue}"`);
    }

    // 객체 생성
    createObject(stmt) {
        const className = stmt.constructorClass;
        
        if (!this.classes.has(className)) {
            throw new Error(`클래스 '${className}'을 찾을 수 없습니다`);
        }
        
        // 객체 인스턴스 생성
        const objectInstance = {
            className: className,
            classDefinition: this.classes.get(className)
        };
        
        // 변수에 객체 저장
        this.variables.set(stmt.variableName, objectInstance);
        this.objects.set(stmt.variableName, objectInstance);
        
        console.log(`🏗️ 객체 생성: ${stmt.variableName} = new ${className}()`);
    }

    // 메서드 호출
    callMethod(stmt) {
        const objectName = stmt.objectName;
        const methodName = stmt.methodName;
        const parameters = stmt.parameters || [];
        
        // 객체 존재 확인
        if (!this.objects.has(objectName)) {
            throw new Error(`객체 '${objectName}'이 정의되지 않았습니다`);
        }
        
        const objectInstance = this.objects.get(objectName);
        const classDefinition = objectInstance.classDefinition;
        
        // 메서드 존재 확인
        if (!classDefinition.methods.has(methodName)) {
            throw new Error(`메서드 '${methodName}'을 클래스 '${objectInstance.className}'에서 찾을 수 없습니다`);
        }
        
        const method = classDefinition.methods.get(methodName);
        
        console.log(`🔧 메서드 호출: ${objectName}.${methodName}(${parameters.map(p => this.evaluateExpression(p)).join(', ')})`);
        
        // 메서드 내부 코드 실행
        for (const statement of method.statements) {
            this.executeStatement(statement);
        }
    }

    // Scanner 생성
    createScanner(stmt) {
        this.variables.set(stmt.variableName, {
            type: 'Scanner',
            value: 'Scanner_Instance'
        });
        console.log(`📥 Scanner 생성: ${stmt.variableName}`);
    }

    // Scanner 입력 처리
    handleScannerInput(stmt) {
        // 시뮬레이션된 입력값들
        const mockInputs = ['5', 'Hello', '2.5', 'Java', '10', '15'];
        const inputIndex = this.variables.get('__inputIndex__') || 0;
        
        let value;
        switch (stmt.inputMethod) {
            case 'nextInt':
                value = parseInt(mockInputs[inputIndex % mockInputs.length]) || 0;
                break;
            case 'nextDouble':
            case 'nextFloat':
                value = parseFloat(mockInputs[inputIndex % mockInputs.length]) || 0.0;
                break;
            case 'nextLine':
            case 'next':
            default:
                value = mockInputs[inputIndex % mockInputs.length] || '';
                break;
        }
        
        this.variables.set(stmt.variableName, value);
        this.variables.set('__inputIndex__', inputIndex + 1);
        
        console.log(`📥 Scanner 입력: ${stmt.variableName} = ${value} (${stmt.inputMethod})`);
    }

    // 배열 선언
    declareArray(stmt) {
        const size = this.evaluateExpression(stmt.size);
        const array = new Array(parseInt(size)).fill(this.getDefaultValue(stmt.dataType));
        
        this.variables.set(stmt.name, {
            type: 'array',
            dataType: stmt.dataType,
            value: array
        });
        
        console.log(`📋 배열 선언: ${stmt.dataType}[] ${stmt.name} = new ${stmt.dataType}[${size}]`);
    }

    // 배열 초기화
    initializeArray(stmt) {
        const values = stmt.values.map(v => this.evaluateValue(v));
        
        this.variables.set(stmt.name, {
            type: 'array',
            dataType: stmt.dataType,
            value: values
        });
        
        console.log(`📋 배열 초기화: ${stmt.dataType}[] ${stmt.name} = {${values.join(', ')}}`);
    }

    // 증감 연산자 실행
    executeIncrement(stmt) {
        const variable = stmt.variable;
        const operator = stmt.operator;
        const isPrefix = stmt.isPrefix;
        
        if (!this.variables.has(variable)) {
            throw new Error(`변수 '${variable}'이 정의되지 않았습니다`);
        }
        
        const currentValue = this.variables.get(variable);
        const newValue = operator === '++' ? currentValue + 1 : currentValue - 1;
        
        this.variables.set(variable, newValue);
        console.log(`🔢 증감 연산: ${isPrefix ? operator + variable : variable + operator} (${currentValue} → ${newValue})`);
    }

    // if-else 블록 실행
    executeIfElseBlock(stmt) {
        const conditionResult = this.evaluateExpression(stmt.condition);
        
        console.log(`🔀 조건문 실행: if (${JSON.stringify(stmt.condition)}) → ${conditionResult}`);
        
        if (conditionResult) {
            // 조건이 true이면 if 블록 실행
            console.log('✅ if 블록 실행');
            for (const ifStmt of stmt.ifStatements) {
                this.executeStatement(ifStmt);
            }
        } else {
            // 조건이 false이면 else 블록 실행
            console.log('❌ else 블록 실행');
            for (const elseStmt of stmt.elseStatements) {
                this.executeStatement(elseStmt);
            }
        }
    }

    // 값 평가
    evaluateValue(valueObj) {
        switch (valueObj.type) {
            case 'STRING_LITERAL':
                return valueObj.value;
                
            case 'NUMBER_LITERAL':
                return valueObj.value;
                
            case 'BOOLEAN_LITERAL':
                return valueObj.value;
                
            case 'CHAR_LITERAL':
                return valueObj.value;
                
            case 'NULL_LITERAL':
                return null;
                
            case 'VARIABLE':
                if (!this.variables.has(valueObj.name)) {
                    throw new Error(`변수 '${valueObj.name}'이 정의되지 않았습니다`);
                }
                const varValue = this.variables.get(valueObj.name);
                return typeof varValue === 'object' && varValue.type === 'array' ? varValue.value : varValue;
                
            case 'ARRAY_ACCESS':
            case 'METHOD_RESULT':
            case 'BINARY_EXPRESSION':
            case 'UNARY_EXPRESSION':
                return this.evaluateExpression(valueObj);
                
            default:
                throw new Error(`알 수 없는 값 타입: ${valueObj.type}`);
        }
    }

    // 표현식 평가
    evaluateExpression(expr) {
        if (expr.type === 'BINARY_EXPRESSION') {
            const left = this.evaluateExpression(expr.left);
            const right = this.evaluateExpression(expr.right);
            
            switch (expr.operator) {
                // 산술 연산자
                case '+':
                    // 문자열이 포함된 경우 문자열 연결, 아니면 숫자 덧셈
                    if (typeof left === 'string' || typeof right === 'string') {
                        return String(left) + String(right);
                    }
                    return Number(left) + Number(right);
                case '-':
                    return Number(left) - Number(right);
                case '*':
                    return Number(left) * Number(right);
                case '/':
                    if (Number(right) === 0) {
                        throw new Error('0으로 나눌 수 없습니다');
                    }
                    return Number(left) / Number(right);
                case '%':
                    return Number(left) % Number(right);
                    
                // 비교 연산자
                case '==':
                    return left == right;
                case '!=':
                    return left != right;
                case '<':
                    return Number(left) < Number(right);
                case '>':
                    return Number(left) > Number(right);
                case '<=':
                    return Number(left) <= Number(right);
                case '>=':
                    return Number(left) >= Number(right);
                    
                // 논리 연산자
                case '&&':
                    return Boolean(left) && Boolean(right);
                case '||':
                    return Boolean(left) || Boolean(right);
                    
                default:
                    throw new Error(`지원되지 않는 연산자: ${expr.operator}`);
            }
        }
        
        if (expr.type === 'UNARY_EXPRESSION') {
            const operand = this.evaluateExpression(expr.operand);
            
            switch (expr.operator) {
                case '!':
                    return !Boolean(operand);
                case '-':
                    return -Number(operand);
                case '+':
                    return +Number(operand);
                default:
                    throw new Error(`지원되지 않는 단항 연산자: ${expr.operator}`);
            }
        }
        
        // 삼항 연산자 평가
        if (expr.type === 'TERNARY_EXPRESSION') {
            const condition = this.evaluateExpression(expr.condition);
            console.log(`🔀 삼항 연산자: ${JSON.stringify(expr.condition)} → ${condition}`);
            
            if (condition) {
                return this.evaluateExpression(expr.trueValue);
            } else {
                return this.evaluateExpression(expr.falseValue);
            }
        }
        
        // Math 메서드 처리
        if (expr.type === 'METHOD_RESULT' && expr.objectName === 'Math') {
            const params = expr.parameters.map(p => this.evaluateExpression(p));
            switch (expr.methodName) {
                case 'abs':
                    return Math.abs(params[0]);
                case 'max':
                    return Math.max(params[0], params[1]);
                case 'min':
                    return Math.min(params[0], params[1]);
                case 'pow':
                    return Math.pow(params[0], params[1]);
                case 'sqrt':
                    return Math.sqrt(params[0]);
                case 'random':
                    return Math.random();
                default:
                    throw new Error(`Math.${expr.methodName} 메서드는 지원되지 않습니다`);
            }
        }
        
        // 배열 접근 처리
        if (expr.type === 'ARRAY_ACCESS') {
            const arrayName = expr.arrayName;
            const index = this.evaluateExpression(expr.index);
            
            if (!this.variables.has(arrayName)) {
                throw new Error(`배열 '${arrayName}'이 정의되지 않았습니다`);
            }
            
            const array = this.variables.get(arrayName);
            if (array.type !== 'array') {
                throw new Error(`'${arrayName}'은 배열이 아닙니다`);
            }
            
            const idx = parseInt(index);
            if (idx < 0 || idx >= array.value.length) {
                throw new Error(`배열 인덱스 ${idx}가 범위를 벗어났습니다`);
            }
            
            return array.value[idx];
        }
        
        return this.evaluateValue(expr);
    }

    // 데이터 타입별 기본값
    getDefaultValue(dataType) {
        switch (dataType) {
            case 'int':
            case 'long':
            case 'short':
            case 'byte':
                return 0;
            case 'double':
            case 'float':
                return 0.0;
            case 'String':
                return "";
            case 'boolean':
                return false;
            case 'char':
                return '\0';
            default:
                return null;
        }
    }
}

// ========================= 2단계: 키워드 검증 시스템 =========================

// 문제 카테고리별 필수 키워드 매핑
const REQUIRED_KEYWORDS = {
    "변수와 타입": {
        required: ["int|String", "="], // 변수 타입과 할당 연산자만 확인
        optional: ["double", "boolean", "char"],
        forbidden: [
            "System\\.out\\.print.*\\(.*[\"\']홍길동[\"\'].*\\)", // 직접 "홍길동" 출력 금지
            "System\\.out\\.print.*\\(.*[\"\']25[\"\'].*\\)", // 직접 "25" 출력 금지
            "System\\.out\\.print.*\\(.*25.*\\)(?!.*\\w+\\s*=)", // 변수 없이 숫자 직접 출력 금지
            "System\\.out\\.print.*\\(.*[\"\'].*[\"\'].*\\)(?!.*\\w+\\s*=)" // 변수 없이 문자열 직접 출력 금지
        ],
        minKeywordCount: 1,
        customValidation: true // 추가 검증 필요
    },
    "조건문": {
        required: ["if", "else"],
        optional: ["else if", "switch", "case"],
        forbidden: ["System\\.out\\.print.*\\(.*짝수.*\\)", "System\\.out\\.print.*\\(.*월요일.*\\)"],
        minKeywordCount: 1
    },
    "반복문": {
        required: ["for", "while"],
        optional: ["do", "break", "continue"],
        forbidden: ["System\\.out\\.print.*\\(.*1.*2.*3.*\\)"],
        minKeywordCount: 1
    },
    "배열": {
        required: ["\\[\\]", "new", "length"],
        optional: ["Arrays", "sort"],
        forbidden: ["System\\.out\\.print.*\\(.*1.*2.*3.*4.*5.*\\)"],
        minKeywordCount: 2
    },
    "메소드": {
        required: ["public", "static", "void", "return"],
        optional: ["private", "protected"],
        forbidden: ["System\\.out\\.print.*\\(.*7.*\\)", "System\\.out\\.print.*\\(.*Hello Java.*\\)"],
        minKeywordCount: 2
    },
    "클래스와 객체": {
        required: ["class", "new", "\\."],
        optional: ["constructor", "this"],
        forbidden: ["System\\.out\\.print.*\\(.*시동.*\\)", "System\\.out\\.print.*\\(.*자바.*\\)"],
        minKeywordCount: 2
    }
};

// 키워드 검증 클래스
class CodeValidator {
    constructor() {
        this.validationResults = {
            hasRequiredKeywords: false,
            missingKeywords: [],
            forbiddenKeywords: [],
            keywordScore: 0,
            validationPassed: false
        };
    }
    
    validateCode(code, problemCategory) {
        console.log(`🔍 키워드 검증 시작 - 카테고리: ${problemCategory}`);
        
        const rules = REQUIRED_KEYWORDS[problemCategory];
        if (!rules) {
            console.warn(`⚠️ 카테고리 '${problemCategory}'에 대한 검증 규칙이 없습니다.`);
            // 검증 규칙이 없어도 기본적인 체크는 수행
            return { 
                validationPassed: false, 
                reason: `지원하지 않는 카테고리입니다: ${problemCategory}`, 
                suggestion: "문제 카테고리를 확인해주세요.",
                keywordScore: 0 
            };
        }
        
        // 1. 금지 키워드 검사
        const forbiddenFound = this.checkForbiddenKeywords(code, rules.forbidden);
        if (forbiddenFound.length > 0) {
            return {
                validationPassed: false,
                reason: `금지된 코드 패턴 발견: 직접 정답을 출력하고 있습니다`,
                suggestion: "문제의 요구사항에 맞는 코드를 작성해주세요. 단순히 정답만 출력하지 마세요.",
                keywordScore: 0
            };
        }
        
        // 2. 카테고리별 특화 검증
        if (rules.customValidation && problemCategory === "변수와 타입") {
            const customResult = this.validateVariableCategory(code);
            if (!customResult.passed) {
                return {
                    validationPassed: false,
                    reason: customResult.reason,
                    suggestion: customResult.suggestion,
                    keywordScore: 0
                };
            }
        }
        
        // 3. 필수 키워드 검사
        const requiredCheck = this.checkRequiredKeywords(code, rules.required);
        if (requiredCheck.missing.length > 0) {
            return {
                validationPassed: false,
                reason: `필수 키워드 누락: ${requiredCheck.missing.join(', ')}`,
                suggestion: this.getSuggestionForCategory(problemCategory, requiredCheck.missing),
                keywordScore: 30
            };
        }
        
        // 4. 키워드 점수 계산
        const keywordScore = this.calculateKeywordScore(code, rules);
        
        return {
            validationPassed: true,
            keywordScore: keywordScore,
            usedKeywords: requiredCheck.found,
            reason: "키워드 검증 통과"
        };
    }
    
    // 변수와 타입 카테고리 특화 검증
    validateVariableCategory(code) {
        console.log('🔍 변수와 타입 특화 검증 시작');
        
        // 문제 설명에서 요구되는 타입 추출
        const problemDescription = this.getProblemDescription();
        const requiredType = this.extractRequiredDataType(problemDescription);
        
        console.log('📋 문제 요구 타입:', requiredType);
        
        // 1. 기본 변수 선언 및 할당 확인
        const hasStringDeclaration = /String\s+\w+/.test(code);
        const hasIntDeclaration = /int\s+\w+/.test(code);
        const hasAssignment = /\w+\s*=\s*/.test(code);
        
        if (!hasStringDeclaration && !hasIntDeclaration) {
            return {
                passed: false,
                reason: "변수 선언이 없습니다",
                suggestion: "변수를 선언해주세요. 예: int age; 또는 String name;"
            };
        }
        
        if (!hasAssignment) {
            return {
                passed: false,
                reason: "할당 연산자(=)가 없습니다",
                suggestion: "변수에 값을 할당해주세요. 예: age = 25; 또는 name = \"홍길동\";"
            };
        }
        
        // 2. 요구된 타입 검증 (핵심 추가)
        if (requiredType) {
            const typeValidation = this.validateRequiredDataType(code, requiredType);
            if (!typeValidation.passed) {
                return typeValidation;
            }
        }
        
        // 3. 선언된 변수명 추출 (개선된 방식)
        const variableNames = [];
        
        // String 변수들
        const stringMatches = code.matchAll(/String\s+(\w+)/g);
        for (const match of stringMatches) {
            variableNames.push(match[1]);
        }
        
        // int 변수들
        const intMatches = code.matchAll(/int\s+(\w+)/g);
        for (const match of intMatches) {
            variableNames.push(match[1]);
        }
        
        console.log('선언된 변수들:', variableNames);
        
        // 4. 변수 사용 확인 (출력문에서 변수를 사용하는지)
        const printStatements = code.match(/System\.out\.print.*?\([^)]+\)/g) || [];
        let usesVariable = false;
        
        for (const printStmt of printStatements) {
            for (const varName of variableNames) {
                // 변수명이 출력문에 있고, 문자열 리터럴이 아닌 경우
                if (printStmt.includes(varName) && !printStmt.includes(`"${varName}"`)) {
                    usesVariable = true;
                    console.log(`✅ 변수 ${varName} 사용 확인됨:`, printStmt);
                    break;
                }
            }
            if (usesVariable) break;
        }
        
        if (variableNames.length > 0 && !usesVariable) {
            return {
                passed: false,
                reason: "선언한 변수를 사용하지 않고 있습니다",
                suggestion: "선언한 변수를 System.out.print()에서 사용해주세요. 예: System.out.print(age); 또는 System.out.print(name);"
            };
        }
        
        // 5. 직접 값 출력 체크 (변수 사용 없이 리터럴만 출력하는 경우)
        for (const printStmt of printStatements) {
            // 숫자나 문자열 리터럴을 직접 출력하는지 확인
            if (/System\.out\.print.*\(\s*["'].*["']\s*\)/.test(printStmt) && !usesVariable) {
                return {
                    passed: false,
                    reason: "변수를 사용하지 않고 직접 값을 출력하고 있습니다",
                    suggestion: "변수를 선언하고 그 변수를 사용해서 출력해주세요."
                };
            }
            
            if (/System\.out\.print.*\(\s*\d+\s*\)/.test(printStmt) && !usesVariable) {
                return {
                    passed: false,
                    reason: "변수를 사용하지 않고 직접 숫자를 출력하고 있습니다",
                    suggestion: "숫자를 변수에 저장한 후 그 변수를 사용해서 출력해주세요."
                };
            }
        }
        
        console.log('✅ 변수와 타입 검증 통과');
        return { passed: true };
    }
    
    // 문제 설명 가져오기
    getProblemDescription() {
        try {
            // JSP에서 문제 설명을 가져오기 (DOM에서 추출)
            const descElement = document.querySelector('.problem-content p');
            return descElement ? descElement.textContent.toLowerCase() : '';
        } catch (error) {
            console.error('문제 설명 가져오기 실패:', error);
            return '';
        }
    }
    
    // 문제 설명에서 요구되는 데이터 타입 추출
    extractRequiredDataType(description) {
        if (!description) return null;
        
        // 다양한 패턴으로 요구 타입 검출
        const typePatterns = {
            'int': [
                /정수형?\s*변수/,
                /int\s+타입/,
                /정수\s+타입/,
                /정수를?\s*선언/,
                /int\s*변수/
            ],
            'String': [
                /문자열?\s*변수/,
                /String\s+타입/,
                /문자열\s+타입/,
                /문자열을?\s*선언/,
                /String\s*변수/,
                /문자열?\s*타입/
            ],
            'double': [
                /실수형?\s*변수/,
                /double\s+타입/,
                /실수\s+타입/,
                /실수를?\s*선언/,
                /double\s*변수/
            ],
            'boolean': [
                /불린?\s*변수/,
                /boolean\s+타입/,
                /논리\s+타입/,
                /참거짓\s*변수/,
                /boolean\s*변수/
            ]
        };
        
        for (const [type, patterns] of Object.entries(typePatterns)) {
            for (const pattern of patterns) {
                if (pattern.test(description)) {
                    console.log(`🎯 요구 타입 감지: ${type} (패턴: ${pattern})`);
                    return type;
                }
            }
        }
        
        return null; // 특정 타입 요구사항이 없는 경우
    }
    
    // 요구된 데이터 타입 검증
    validateRequiredDataType(code, requiredType) {
        console.log(`🔍 요구 타입 검증: ${requiredType}`);
        
        // 실제 사용된 타입들 추출
        const usedTypes = this.extractUsedDataTypes(code);
        console.log('📋 사용된 타입들:', usedTypes);
        
        // 요구된 타입이 사용되었는지 확인
        if (!usedTypes.includes(requiredType)) {
            const typeNames = {
                'int': '정수형(int)',
                'String': '문자열(String)', 
                'double': '실수형(double)',
                'boolean': '불린(boolean)'
            };
            
            return {
                passed: false,
                reason: `문제에서 요구하는 ${typeNames[requiredType]} 타입을 사용하지 않았습니다`,
                suggestion: `${requiredType} 타입의 변수를 선언해주세요. 예: ${requiredType} variableName;`
            };
        }
        
        // 잘못된 타입 사용 확인 (예: 정수형 요구했는데 String 사용)
        const conflictingTypes = usedTypes.filter(type => type !== requiredType);
        if (conflictingTypes.length > 0 && requiredType !== 'String') {
            // String은 유연하게 허용하되, 다른 타입들은 엄격하게 검증
            const wrongTypeNames = conflictingTypes.map(type => {
                const names = {
                    'int': '정수형(int)',
                    'String': '문자열(String)', 
                    'double': '실수형(double)',
                    'boolean': '불린(boolean)'
                };
                return names[type] || type;
            });
            
            return {
                passed: false,
                reason: `문제에서 ${requiredType} 타입을 요구했지만 ${wrongTypeNames.join(', ')} 타입을 사용했습니다`,
                suggestion: `${requiredType} 타입만 사용해주세요. 예: ${requiredType} variableName;`
            };
        }
        
        return { passed: true };
    }
    
    // 코드에서 사용된 데이터 타입 추출
    extractUsedDataTypes(code) {
        const types = [];
        
        // 각 타입별 변수 선언 패턴 확인
        const typePatterns = {
            'int': /\bint\s+\w+/g,
            'String': /\bString\s+\w+/g,
            'double': /\bdouble\s+\w+/g,
            'float': /\bfloat\s+\w+/g,
            'boolean': /\bboolean\s+\w+/g,
            'char': /\bchar\s+\w+/g,
            'long': /\blong\s+\w+/g
        };
        
        for (const [type, pattern] of Object.entries(typePatterns)) {
            if (pattern.test(code)) {
                types.push(type);
            }
        }
        
        return types;
    }
    
    checkForbiddenKeywords(code, forbiddenList) {
        const found = [];
        for (const forbidden of forbiddenList) {
            const regex = new RegExp(forbidden, 'gi');
            if (regex.test(code)) {
                found.push(forbidden);
            }
        }
        return found;
    }
    
    checkRequiredKeywords(code, requiredList) {
        const found = [];
        const missing = [];
        
        for (const keyword of requiredList) {
            const regex = new RegExp(keyword, 'gi');
            if (regex.test(code)) {
                found.push(keyword);
            } else {
                missing.push(keyword);
            }
        }
        
        return { found, missing };
    }
    
    calculateKeywordScore(code, rules) {
        let score = 0;
        
        // 필수 키워드 점수
        for (const keyword of rules.required) {
            const regex = new RegExp(keyword, 'gi');
            if (regex.test(code)) {
                score += 10;
            }
        }
        
        // 선택 키워드 점수
        for (const keyword of rules.optional) {
            const regex = new RegExp(keyword, 'gi');
            if (regex.test(code)) {
                score += 5;
            }
        }
        
        return Math.min(score, 100);
    }
    
    getSuggestionForCategory(category, missingKeywords) {
        const suggestions = {
            "변수와 타입": "변수 선언(int, String)과 할당 연산자(=)를 사용해주세요. 예: String name = \"홍길동\";",
            "조건문": "if, else 키워드를 사용한 조건문을 작성해주세요",
            "반복문": "for 또는 while 키워드를 사용한 반복문을 작성해주세요",
            "배열": "배열 선언([])과 new 키워드를 사용해주세요",
            "메소드": "public, static 키워드를 사용한 메소드를 작성해주세요",
            "클래스와 객체": "class 키워드와 new 키워드를 사용해주세요"
        };
        
        return suggestions[category] || "필수 키워드를 사용해주세요";
    }
}

// ========================= 3단계: 코드 구조 분석 시스템 =========================

// 코드 구조 분석기 클래스
class CodeStructureAnalyzer {
    constructor() {
        this.analysisResults = {
            complexity: 0,
            structureScore: 0,
            variableUsage: {},
            controlFlow: {},
            codeQuality: {},
            suggestions: []
        };
    }
    
    analyzeCodeStructure(code, problemCategory) {
        console.log(`🔍 코드 구조 분석 시작 - 카테고리: ${problemCategory}`);
        
        // 1. 구조 분석
        const structureAnalysis = this.analyzeStructure(code);
        
        // 2. 복잡도 분석
        const complexityAnalysis = this.analyzeComplexity(code);
        
        // 3. 변수 사용 패턴 분석
        const variableAnalysis = this.analyzeVariables(code);
        
        // 4. 코드 품질 평가
        const qualityAnalysis = this.analyzeCodeQuality(code);
        
        // 5. 카테고리별 특화 분석
        const categoryAnalysis = this.analyzeCategorySpecific(code, problemCategory);
        
        return {
            passed: this.calculateOverallScore(structureAnalysis, complexityAnalysis, variableAnalysis, qualityAnalysis, categoryAnalysis),
            details: {
                structure: structureAnalysis,
                complexity: complexityAnalysis,
                variables: variableAnalysis,
                quality: qualityAnalysis,
                category: categoryAnalysis
            },
            suggestions: this.generateSuggestions(structureAnalysis, complexityAnalysis, variableAnalysis, qualityAnalysis)
        };
    }
    
    analyzeStructure(code) {
        const structure = {
            hasMainMethod: false,
            hasProperBraces: false,
            nestedLevels: 0,
            score: 0
        };
        
        structure.hasMainMethod = /public\s+static\s+void\s+main\s*\(\s*String\s*\[\s*\]\s*\w+\s*\)/.test(code);
        structure.hasProperBraces = this.checkBraceMatching(code);
        structure.nestedLevels = this.calculateNestingLevel(code);
        
        let score = 0;
        if (structure.hasMainMethod) score += 30;
        if (structure.hasProperBraces) score += 30;
        if (structure.nestedLevels <= 3) score += 20;
        else score += Math.max(0, 20 - (structure.nestedLevels - 3) * 5);
        
        structure.score = score;
        return structure;
    }
    
    analyzeComplexity(code) {
        const complexity = {
            lineCount: 0,
            cyclomaticComplexity: 1,
            score: 0
        };
        
        complexity.lineCount = code.split('\n').filter(line => line.trim().length > 0).length;
        
        const conditionCount = (code.match(/\b(if|else\s+if|switch|case)\b/g) || []).length;
        const loopCount = (code.match(/\b(for|while|do)\b/g) || []).length;
        complexity.cyclomaticComplexity = 1 + conditionCount + loopCount;
        
        let score = 100;
        if (complexity.cyclomaticComplexity > 10) score -= 20;
        if (complexity.lineCount > 50) score -= 10;
        
        complexity.score = Math.max(0, score);
        return complexity;
    }
    
    analyzeVariables(code) {
        const variables = {
            declared: [],
            namingConvention: true,
            score: 0
        };
        
        const declarationPattern = /\b(int|double|float|long|short|byte|char|boolean|String)\s+([a-zA-Z_][a-zA-Z0-9_]*)/g;
        let match;
        while ((match = declarationPattern.exec(code)) !== null) {
            variables.declared.push({
                type: match[1],
                name: match[2]
            });
        }
        
        variables.namingConvention = variables.declared.every(v => 
            /^[a-z][a-zA-Z0-9]*$/.test(v.name) && v.name.length > 1
        );
        
        variables.score = variables.namingConvention ? 80 : 60;
        return variables;
    }
    
    analyzeCodeQuality(code) {
        const quality = {
            hasComments: false,
            commentRatio: 0,
            score: 0
        };
        
        const comments = code.match(/(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g) || [];
        quality.hasComments = comments.length > 0;
        
        const codeLines = code.split('\n').filter(line => line.trim().length > 0).length;
        quality.commentRatio = comments.length / Math.max(codeLines, 1);
        
        quality.score = quality.hasComments ? 80 : 60;
        return quality;
    }
    
    analyzeCategorySpecific(code, category) {
        const categoryAnalysis = {
            categoryScore: 0,
            specificIssues: [],
            recommendations: []
        };
        
        switch (category) {
            case "조건문":
                categoryAnalysis.categoryScore = this.analyzeConditionalCategory(code);
                break;
            case "반복문":
                categoryAnalysis.categoryScore = this.analyzeLoopCategory(code);
                break;
            case "배열":
                categoryAnalysis.categoryScore = this.analyzeArrayCategory(code);
                break;
            default:
                categoryAnalysis.categoryScore = 80;
        }
        
        return categoryAnalysis;
    }
    
    analyzeConditionalCategory(code) {
        let score = 100;
        
        if (!/if\s*\([^)]+\)\s*\{/.test(code)) {
            score -= 30;
        }
        
        if (!/[><=!]+/.test(code)) {
            score -= 20;
        }
        
        return Math.max(0, score);
    }
    
    analyzeLoopCategory(code) {
        let score = 100;
        
        if (!/for\s*\([^)]*\)\s*\{/.test(code) && !/while\s*\([^)]*\)\s*\{/.test(code)) {
            score -= 40;
        }
        
        if (!/\+\+|\-\-/.test(code)) {
            score -= 20;
        }
        
        return Math.max(0, score);
    }
    
    analyzeArrayCategory(code) {
        let score = 100;
        
        if (!/\w+\[\]/.test(code)) {
            score -= 30;
        }
        
        if (!/new\s+\w+\[/.test(code)) {
            score -= 30;
        }
        
        if (!/\w+\.length/.test(code)) {
            score -= 20;
        }
        
        return Math.max(0, score);
    }
    
    checkBraceMatching(code) {
        let braceCount = 0;
        for (const char of code) {
            if (char === '{') braceCount++;
            if (char === '}') braceCount--;
            if (braceCount < 0) return false;
        }
        return braceCount === 0;
    }
    
    calculateNestingLevel(code) {
        let maxLevel = 0;
        let currentLevel = 0;
        
        for (const char of code) {
            if (char === '{') {
                currentLevel++;
                maxLevel = Math.max(maxLevel, currentLevel);
            }
            if (char === '}') {
                currentLevel--;
            }
        }
        
        return maxLevel;
    }
    
    calculateOverallScore(structure, complexity, variables, quality, category) {
        const totalScore = (structure.score * 0.3) + (complexity.score * 0.25) + 
                          (variables.score * 0.2) + (quality.score * 0.15) + 
                          (category.categoryScore * 0.1);
        
        return {
            passed: totalScore >= 60,
            score: Math.round(totalScore),
            breakdown: {
                structure: structure.score,
                complexity: complexity.score,
                variables: variables.score,
                quality: quality.score,
                category: category.categoryScore
            }
        };
    }
    
    generateSuggestions(structure, complexity, variables, quality) {
        const suggestions = [];
        
        if (structure.score < 70) {
            suggestions.push("코드 구조를 개선해주세요 (메인 메서드, 중괄호 매칭 등)");
        }
        
        if (complexity.cyclomaticComplexity > 5) {
            suggestions.push("코드 복잡도를 줄여주세요");
        }
        
        if (!variables.namingConvention) {
            suggestions.push("변수 이름을 camelCase 규칙에 맞게 작성해주세요");
        }
        
        if (!quality.hasComments) {
            suggestions.push("코드에 주석을 추가하여 이해를 돕도록 해주세요");
        }
        
        return suggestions;
    }
}

// 현재 문제 카테고리 가져오기 함수
function getCurrentProblemCategory() {
    console.log('🔍 카테고리 정보 확인 중...');
    
    // 1. 우선 hidden input에서 카테고리명 직접 읽기
    const categoryElement = document.getElementById('problemCategory');
    if (categoryElement && categoryElement.value) {
        console.log('✅ 카테고리 찾음 (hidden input):', categoryElement.value);
        return categoryElement.value.trim();
    }
    
    // 2. 카테고리 ID로 매핑해서 찾기
    const categoryIdElement = document.getElementById('problemCategoryId');
    if (categoryIdElement && categoryIdElement.value) {
        const categoryId = parseInt(categoryIdElement.value);
        const categoryMapping = {
            1: "변수와 타입",
            2: "조건문", 
            3: "반복문",
            4: "배열",
            5: "메소드",
            6: "클래스와 객체",
            7: "상속",
            8: "예외처리"
        };
        
        const mappedCategory = categoryMapping[categoryId];
        if (mappedCategory) {
            console.log('✅ 카테고리 찾음 (ID 매핑):', mappedCategory);
            return mappedCategory;
        }
    }
    
    // 3. JSP에서 전달된 카테고리 정보 찾기 (백업)
    const scripts = document.querySelectorAll('script');
    for (const script of scripts) {
        const content = script.textContent || script.innerHTML;
        if (content.includes('problemCategory')) {
            const match = content.match(/problemCategory.*?["']([^"']+)["']/);
            if (match) {
                console.log('✅ 카테고리 찾음 (스크립트):', match[1]);
                return match[1];
            }
        }
    }
    
    // 4. 페이지에서 직접 읽어오기 (최종 백업)
    const metaItems = document.querySelectorAll('.meta-item .category-tag');
    if (metaItems.length > 0) {
        const categoryText = metaItems[0].textContent.trim();
        if (categoryText) {
            console.log('✅ 카테고리 찾음 (DOM):', categoryText);
            return categoryText;
        }
    }
    
    console.warn('⚠️ 카테고리 정보를 찾을 수 없습니다. 기본값 사용');
    return '기본'; // 카테고리를 찾지 못한 경우에만 기본값 반환
}