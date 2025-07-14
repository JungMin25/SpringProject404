// exam_play.js - 시험 진행 페이지 스크립트
console.log('🚀 exam_play.js 파일이 로드되었습니다!');

// 전역 변수
let editor; // 모나코 에디터 인스턴스 (problem-detail과 동일)
let isEditorReady = false; // 에디터 준비 상태
let lastExecutionResult = null; // 마지막 실행 결과 저장

// 페이지 로드 완료 후 모나코 에디터 초기화
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 로드 완료, 모나코 에디터 초기화 시작');
    initializeMonacoEditor();
    setupFormSubmission();
});

// Form 제출 시 코드 에디터 내용 전달
function setupFormSubmission() {
    const form = document.getElementById('answerForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            console.log('🚀 Form 제출 이벤트 발생');
            
            const correctCodeField = document.getElementById('correctCode');
            const clickedButton = e.submitter; // 클릭된 버튼 확인
            
            if (clickedButton && clickedButton.value === 'skip') {
                // 건너뛰기의 경우 빈 값 전달
                if (correctCodeField) {
                    correctCodeField.value = '';
                    console.log('🔄 건너뛰기 - 빈 값 전달');
                }
            } else {
                // 제출하기의 경우 코드 검증 확인
                if (!lastExecutionResult) {
                    e.preventDefault(); // form 제출 중단
                    alert('먼저 코드를 실행해주세요. "실행" 버튼을 클릭한 후 제출해주세요.');
                    return false;
                }
                
                if (!lastExecutionResult.success) {
                    e.preventDefault(); // form 제출 중단
                    alert('코드 검증에 실패했습니다. 코드를 수정한 후 다시 실행해주세요.');
                    return false;
                }
                
                if (correctCodeField && editor) {
                    // 코드 에디터의 내용을 전달
                    const editorCode = editor.getValue();
                    correctCodeField.value = editorCode;
                    console.log('📝 코드 에디터 내용을 correctCode에 복사 완료:', editorCode);
                    console.log('📝 textarea 값 확인:', correctCodeField.value);
                } else {
                    console.error('❌ correctCode textarea 또는 editor를 찾을 수 없습니다');
                }
            }
        });
        
        // 추가: 각 버튼 클릭 시에도 값 검증
        const submitButtons = form.querySelectorAll('button[type="submit"]');
        submitButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                console.log('🖱️ 제출 버튼 클릭:', this.value);
                
                if (this.value === 'submit') {
                    // 제출하기 버튼인 경우 실행 결과 확인
                    if (!lastExecutionResult) {
                        e.preventDefault();
                        alert('먼저 코드를 실행해주세요. "실행" 버튼을 클릭한 후 제출해주세요.');
                        return false;
                    }
                    
                    if (!lastExecutionResult.success) {
                        e.preventDefault();
                        alert('코드 실행에 오류가 있습니다. 코드를 수정한 후 다시 실행해주세요.');
                        return false;
                    }
                }
            });
        });
    }
}





// 모나코 에디터 초기화 함수 (problem-detail.js에서 복사)
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

// 에디터 생성 함수 (problem-detail.js에서 복사, exam용 수정)
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
            
            // 기본 Java 코드 템플릿 (exam용 Solution 클래스)
            const defaultCode = `import java.util.Scanner;

public class Solution {
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
            
            // 코드 변경 시 실행 결과 초기화
            editor.onDidChangeModelContent(() => {
                if (lastExecutionResult) {
                    lastExecutionResult = null;
                    console.log('📝 코드가 변경되어 실행 결과를 초기화했습니다.');
                    
                    // 결과 패널도 초기화
                    const resultStatus = document.getElementById('resultStatus');
                    const resultContent = document.getElementById('resultContent');
                    if (resultStatus) resultStatus.textContent = '준비됨';
                    if (resultContent) resultContent.textContent = '코드를 실행하면 결과가 여기에 나타납니다.';
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



// 코드 실행 (2단계, 3단계 검증 포함)
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
            try {
                console.log('🚀 시험용 코드 실행 시작 - 검증 없이 실행 결과만 표시');
                
                // 1단계: 먼저 코드 실행하여 결과 표시
                resultStatus.textContent = '실행 중...';
                
                let output = '';
                try {
                    console.log('🔍 Java 코드 실행 시작:', code);
                    
                    // 1단계: 변수 선언 파싱 (간단한 매핑)
                    const variables = new Map();
                    
                    // String 변수 선언 찾기 (String name = "값";)
                    const stringDeclarations = code.match(/String\s+(\w+)\s*=\s*"([^"]*)"\s*;/g);
                    if (stringDeclarations) {
                        for (const decl of stringDeclarations) {
                            const match = decl.match(/String\s+(\w+)\s*=\s*"([^"]*)"\s*;/);
                            if (match) {
                                const varName = match[1];
                                const varValue = match[2];
                                variables.set(varName, varValue);
                                console.log('📝 String 변수 등록:', varName, '=', varValue);
                            }
                        }
                    }
                    
                    // int 변수 선언 찾기 (int age = 25;)
                    const intDeclarations = code.match(/int\s+(\w+)\s*=\s*(\d+)\s*;/g);
                    if (intDeclarations) {
                        for (const decl of intDeclarations) {
                            const match = decl.match(/int\s+(\w+)\s*=\s*(\d+)\s*;/);
                            if (match) {
                                const varName = match[1];
                                const varValue = parseInt(match[2]);
                                variables.set(varName, varValue);
                                console.log('🔢 int 변수 등록:', varName, '=', varValue);
                            }
                        }
                    }
                    
                    // double 변수 선언 찾기 (double price = 3.14;)
                    const doubleDeclarations = code.match(/double\s+(\w+)\s*=\s*(\d+\.\d+)\s*;/g);
                    if (doubleDeclarations) {
                        for (const decl of doubleDeclarations) {
                            const match = decl.match(/double\s+(\w+)\s*=\s*(\d+\.\d+)\s*;/);
                            if (match) {
                                const varName = match[1];
                                const varValue = parseFloat(match[2]);
                                variables.set(varName, varValue);
                                console.log('🔢 double 변수 등록:', varName, '=', varValue);
                            }
                        }
                    }
                    
                    console.log('📋 등록된 변수들:', Object.fromEntries(variables));
                    
                    // 2단계: print문 처리
                    const printMatches = code.match(/System\.out\.(print|println)\s*\(([^)]+)\)/g);
                    if (printMatches) {
                        console.log('📋 발견된 print문들:', printMatches);
                        
                        for (const match of printMatches) {
                            const content = match.match(/\(([^)]+)\)/)[1].trim();
                            console.log('🔍 처리할 내용:', content);
                            
                            // 숫자 리터럴 (정수)
                            if (/^\d+$/.test(content)) {
                                output += content;
                                console.log('🔢 숫자 출력:', content);
                            }
                            // 실수 리터럴 
                            else if (/^\d+\.\d+$/.test(content)) {
                                output += content;
                                console.log('🔢 실수 출력:', content);
                            }
                            // 문자열 리터럴
                            else if (/^".*"$/.test(content)) {
                                const str = content.slice(1, -1);
                                output += str;
                                console.log('📝 문자열 출력:', str);
                            }
                            // 문자 리터럴
                            else if (/^'.*'$/.test(content)) {
                                const char = content.slice(1, -1);
                                output += char;
                                console.log('📝 문자 출력:', char);
                            }
                            // 변수 참조 (변수명만 있는 경우)
                            else if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(content)) {
                                if (variables.has(content)) {
                                    const varValue = variables.get(content);
                                    output += String(varValue);
                                    console.log('🔤 변수 출력:', content, '→', varValue);
                                } else {
                                    output += content; // 변수가 없으면 그대로
                                    console.log('⚠️ 미등록 변수:', content);
                                }
                            }
                            // 기타 
                            else {
                                output += content;
                                console.log('🔤 기타 출력:', content);
                            }
                            
                            // println이면 줄바꿈 추가
                            if (match.includes('println')) {
                                output += '\n';
                            }
                        }
                    } else {
                        output = '';
                        console.log('⚠️ print문을 찾을 수 없음');
                    }
                    
                    console.log('🚀 최종 출력 결과:', JSON.stringify(output));
                } catch (error) {
                    console.error('❌ 실행 오류:', error);
                    output = '';
                }
                
                // 2단계: 실행 결과 표시
                const actualOutput = output.trim();
                
                resultContent.innerHTML = `
                    <div style="color: #64ffda; margin-bottom: 10px;">✅ 코드 실행 완료</div>
                    <div style="background: #1a1a2e; padding: 10px; border-radius: 4px; font-family: monospace; color: #e0e0e0;">
                        <strong>📤 실행 결과:</strong><br>
                        <pre style="margin: 0; color: #64ffda;">${actualOutput || '(출력 없음)'}</pre>
                    </div>
                `;
                resultStatus.textContent = '실행 결과';
                resultStatus.className = 'result-status success';
                
                // 3단계: 뒤에서 조용히 검증 수행 (사용자에게는 보이지 않음)
                try {
                    const problemCategory = getCurrentProblemCategory();
                    const expectedAnswer = document.getElementById('expectedAnswer')?.value?.trim() || '';
                    
                    console.log('🔍 백그라운드 검증 시작');
                    console.log(`🎯 정답 비교 - 예상: "${expectedAnswer}", 실제: "${actualOutput}"`);
                    
                    // 1단계: 출력 결과 비교
                    const outputMatches = actualOutput === expectedAnswer;
                    
                    // 2단계: 키워드 검증 (조용히)
                    let keywordPassed = false;
                    let keywordScore = 0;
                    try {
                        const validator = new CodeValidator();
                        const keywordResult = validator.validateCode(code, problemCategory);
                        keywordPassed = keywordResult.validationPassed;
                        keywordScore = keywordResult.keywordScore || 0;
                        
                        console.log('🔍 키워드 검증 결과:', {
                            통과여부: keywordPassed,
                            점수: keywordScore,
                            이유: keywordResult.reason
                        });
                    } catch (e) {
                        console.warn('키워드 검증 오류:', e);
                        keywordPassed = false;
                        keywordScore = 0;
                    }
                    
                    // 3단계: 구조 분석 (조용히)  
                    let structurePassed = false;
                    let structureScore = 0;
                    try {
                        const structureAnalyzer = new CodeStructureAnalyzer();
                        const structureResult = structureAnalyzer.analyzeCodeStructure(code, problemCategory);
                        structurePassed = structureResult.passed && structureResult.passed.passed;
                        structureScore = structureResult.passed ? structureResult.passed.score || 0 : 0;
                        
                        console.log('🔍 구조 분석 결과:', {
                            통과여부: structurePassed,
                            점수: structureScore
                        });
                    } catch (e) {
                        console.warn('구조 분석 오류:', e);
                        structurePassed = false;
                        structureScore = 0;
                    }
                    
                    // 4단계: 최종 정답 여부 판단
                    let isCorrectAnswer = false;
                    
                    if (problemCategory === "변수와타입") {
                        // 변수와타입 문제: 출력 결과 + 키워드 검증 모두 통과해야 정답
                        isCorrectAnswer = outputMatches && keywordPassed;
                        console.log('🎯 변수와타입 문제 판정:', {
                            출력일치: outputMatches,
                            키워드통과: keywordPassed,
                            최종정답: isCorrectAnswer
                        });
                    } else if (problemCategory === "조건문" || problemCategory === "반복문" || 
                               problemCategory === "배열" || problemCategory === "메소드" || 
                               problemCategory === "클래스와객체") {
                        // 다른 카테고리: 출력 결과 + 키워드 검증 모두 통과해야 정답
                        isCorrectAnswer = outputMatches && keywordPassed;
                        console.log('🎯 ' + problemCategory + ' 문제 판정:', {
                            출력일치: outputMatches,
                            키워드통과: keywordPassed,
                            최종정답: isCorrectAnswer
                        });
                    } else {
                        // 카테고리 불명 또는 기타: 출력 결과만으로 판단
                        isCorrectAnswer = outputMatches;
                        console.log('🎯 기타 문제 판정:', {
                            출력일치: outputMatches,
                            최종정답: isCorrectAnswer
                        });
                    }
                    
                    // 최종 검증 결과를 hidden input에 저장
                    const hiddenIsCorrect = document.getElementById('hiddenIsCorrect');
                    if (hiddenIsCorrect) {
                        hiddenIsCorrect.value = isCorrectAnswer ? 'true' : 'false';
                    }
                    
                    // 실행 결과와 검증 정보 저장
                    lastExecutionResult = {
                        success: true,
                        output: actualOutput,
                        isCorrect: isCorrectAnswer,
                        keywordScore: keywordScore,
                        structureScore: structureScore
                    };
                    
                    console.log('🔒 백그라운드 검증 완료:', {
                        정답여부: isCorrectAnswer,
                        키워드점수: keywordScore, 
                        구조점수: structureScore
                    });
                    
                } catch (validationError) {
                    console.error('백그라운드 검증 중 오류:', validationError);
                    
                    // 검증 실패 시 기본값 설정
                    const hiddenIsCorrect = document.getElementById('hiddenIsCorrect');
                    if (hiddenIsCorrect) {
                        hiddenIsCorrect.value = 'false';
                    }
                    
                    lastExecutionResult = {
                        success: true,
                        output: actualOutput,
                        isCorrect: false,
                        keywordScore: 30,
                        structureScore: 30
                    };
                }
                
            } catch (error) {
                console.error('코드 실행 중 오류:', error);
                
                // 실행 오류 시 기본 결과 표시
                const hiddenIsCorrect = document.getElementById('hiddenIsCorrect');
                if (hiddenIsCorrect) {
                    hiddenIsCorrect.value = 'false';
                }
                
                lastExecutionResult = {
                    success: false,
                    output: '',
                    error: error.message
                };
                
                resultContent.innerHTML = `
                    <div style="color: #64ffda; margin-bottom: 10px;">✅ 코드 실행 완료</div>
                    <div style="background: #1a1a2e; padding: 10px; border-radius: 4px; font-family: monospace; color: #e0e0e0;">
                        <strong>📤 실행 결과:</strong><br>
                        <pre style="margin: 0; color: #64ffda;">(출력 없음)</pre>
                    </div>
                `;
                resultStatus.textContent = '실행 결과';
                resultStatus.className = 'result-status success';
            }
        }, 500); // 더 빠른 실행
    }
}





// 코드 초기화
function resetCode() {
    if (!isEditorReady || !editor) {
        alert('에디터가 아직 준비되지 않았습니다. 잠시 후 다시 시도해주세요.');
        return;
    }
    
    if (confirm('코드를 초기화하시겠습니까? 작성한 내용이 모두 삭제됩니다.')) {
        const defaultCode = `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        // 여기에 코드를 작성하세요
        
    }
}`;
        
        editor.setValue(defaultCode);
        editor.setPosition({ lineNumber: 5, column: 9 }); // 커서를 주석 뒤로 이동
        
        // 결과 패널 및 실행 결과 초기화
        const resultStatus = document.getElementById('resultStatus');
        const resultContent = document.getElementById('resultContent');
        lastExecutionResult = null;
        
        if (resultStatus && resultContent) {
            resultStatus.textContent = '준비됨';
            resultStatus.className = 'result-status ready';
            resultContent.textContent = '코드를 실행하면 결과가 여기에 나타납니다.';
        }
        
        console.log('코드가 초기화되었습니다.');
    }
}

// ========================= 안정적인 Java 실행 엔진 (problem-detail.js 복사) =========================

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

    // 클래스 파싱 (클래스 정의 저장)
    parseClasses(code) {
        const classRegex = /class\s+(\w+)\s*\{([\s\S]*?)\}/g;
        let match;
        
        while ((match = classRegex.exec(code)) !== null) {
            const className = match[1];
            const classBody = match[2];
            
            if (className !== 'Main') { // Main 클래스가 아닌 경우만 저장
            const methods = this.parseClassMethods(classBody);
            this.classes.set(className, {
                name: className,
                methods: methods
            });
                console.log(`📝 클래스 '${className}' 파싱 완료`);
            }
        }
    }

    // 클래스 메소드 파싱
    parseClassMethods(classBody) {
        const methods = new Map();
        const methodRegex = /(public|private|protected)?\s*(static)?\s*(\w+)\s+(\w+)\s*\([^)]*\)\s*\{([\s\S]*?)\}/g;
        let match;
        
        while ((match = methodRegex.exec(classBody)) !== null) {
            const methodName = match[4];
            const methodBody = match[5];
            
            methods.set(methodName, {
                name: methodName,
                statements: this.parseMethodBody(methodBody)
            });
        }
        
        return methods;
    }

    // 메소드 바디 파싱
    parseMethodBody(methodBody) {
        const statements = [];
        const lines = methodBody.split('\n').map(line => line.trim()).filter(line => line);
        
        for (const line of lines) {
            if (line && !line.startsWith('//')) {
                const stmt = this.parseStatement(line);
                if (stmt) {
                    statements.push(stmt);
                }
            }
        }
        
        return statements;
    }

    // 개별 구문 파싱
    parseStatement(statement) {
        const stmt = statement.trim();
        
        if (!stmt || stmt.startsWith('//')) {
            return null;
        }

        // System.out.println() 또는 System.out.print()
        const printMatch = stmt.match(/System\.out\.(println|print)\s*\(\s*(.*?)\s*\)\s*;?/);
        if (printMatch) {
            return {
                type: 'PRINT',
                method: printMatch[1],
                argument: this.parseValue(printMatch[2])
            };
        }
        
        // 변수 선언과 초기화 (int x = 5;)
        const varInitMatch = stmt.match(/(\w+)\s+(\w+)\s*=\s*(.+?)\s*;?/);
        if (varInitMatch) {
            return {
                type: 'VARIABLE_INITIALIZATION',
                dataType: varInitMatch[1],
                name: varInitMatch[2],
                value: this.parseValue(varInitMatch[3])
            };
        }
        
        // 변수 선언만 (int x;)
        const varDeclMatch = stmt.match(/(\w+)\s+(\w+)\s*;?/);
        if (varDeclMatch && !stmt.includes('=')) {
            return {
                type: 'VARIABLE_DECLARATION',
                dataType: varDeclMatch[1],
                name: varDeclMatch[2]
            };
        }
        
        // 변수 할당 (x = 5;)
        const assignMatch = stmt.match(/(\w+)\s*=\s*(.+?)\s*;?/);
        if (assignMatch && !stmt.match(/^\w+\s+\w+\s*=/)) {
            return {
                type: 'ASSIGNMENT',
                name: assignMatch[1],
                value: this.parseValue(assignMatch[2])
            };
        }
        
        // Scanner 생성 (Scanner sc = new Scanner(System.in);)
        const scannerMatch = stmt.match(/Scanner\s+(\w+)\s*=\s*new\s+Scanner\s*\(\s*System\.in\s*\)\s*;?/);
        if (scannerMatch) {
            return {
                type: 'SCANNER_CREATION',
                variableName: scannerMatch[1]
            };
        }
        
        // Scanner 입력 (int x = sc.nextInt();)
        const scannerInputMatch = stmt.match(/(\w+)\s+(\w+)\s*=\s*(\w+)\.(nextInt|nextDouble|nextFloat|nextLine|next)\s*\(\s*\)\s*;?/);
        if (scannerInputMatch) {
            return {
                type: 'SCANNER_INPUT',
                dataType: scannerInputMatch[1],
                variableName: scannerInputMatch[2],
                scannerName: scannerInputMatch[3],
                inputMethod: scannerInputMatch[4]
            };
        }
        
        // 배열 선언 (int[] arr = new int[5];)
        const arrayDeclMatch = stmt.match(/(\w+)\[\s*\]\s+(\w+)\s*=\s*new\s+\w+\[\s*(.+?)\s*\]\s*;?/);
        if (arrayDeclMatch) {
            return {
                type: 'ARRAY_DECLARATION',
                dataType: arrayDeclMatch[1],
                name: arrayDeclMatch[2],
                size: this.parseValue(arrayDeclMatch[3])
            };
        }
        
        // 배열 초기화 (int[] arr = {1, 2, 3};)
        const arrayInitMatch = stmt.match(/(\w+)\[\s*\]\s+(\w+)\s*=\s*\{\s*(.*?)\s*\}\s*;?/);
        if (arrayInitMatch) {
            const values = arrayInitMatch[3].split(',').map(v => this.parseValue(v.trim()));
            return {
                type: 'ARRAY_INITIALIZATION',
                dataType: arrayInitMatch[1],
                name: arrayInitMatch[2],
                values: values
            };
        }
        
        // 증감 연산자 (x++, ++x, x--, --x)
        const incrementMatch = stmt.match(/((\+\+|--)\s*(\w+)|(\w+)\s*(\+\+|--))\s*;?/);
        if (incrementMatch) {
            const isPrefix = !!incrementMatch[2];
            const variable = incrementMatch[3] || incrementMatch[4];
            const operator = incrementMatch[2] || incrementMatch[5];
            
            return {
                type: 'INCREMENT_STATEMENT',
                variable: variable,
                operator: operator,
                isPrefix: isPrefix
            };
        }

        console.warn('⚠️ 파싱되지 않은 구문:', stmt);
        return null;
    }

    // 값 파싱 (문자열, 숫자, 변수, 표현식 등)
    parseValue(valueStr) {
        if (!valueStr) return { type: 'NULL_LITERAL', value: null };
        
        const trimmed = valueStr.trim();
        
        // 문자열 리터럴
        if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
            return {
                type: 'STRING_LITERAL',
                value: trimmed.slice(1, -1)
            };
        }
        
        // 문자 리터럴
        if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
            return {
                type: 'CHAR_LITERAL',
                value: trimmed.slice(1, -1)
            };
        }
        
        // 불린 리터럴
        if (trimmed === 'true' || trimmed === 'false') {
            return {
                type: 'BOOLEAN_LITERAL',
                value: trimmed === 'true'
            };
        }
        
        // 숫자 리터럴
        if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
            return {
                type: 'NUMBER_LITERAL',
                value: trimmed.includes('.') ? parseFloat(trimmed) : parseInt(trimmed)
            };
        }
        
        // 배열 접근 (arr[0])
        const arrayAccessMatch = trimmed.match(/^(\w+)\[\s*(.+?)\s*\]$/);
        if (arrayAccessMatch) {
            return {
                type: 'ARRAY_ACCESS',
                arrayName: arrayAccessMatch[1],
                index: this.parseValue(arrayAccessMatch[2])
            };
        }
        
        // Math 메소드 호출 (Math.abs(-5))
        const mathMethodMatch = trimmed.match(/^Math\.(\w+)\s*\(\s*(.*?)\s*\)$/);
        if (mathMethodMatch) {
            const params = mathMethodMatch[2] ? mathMethodMatch[2].split(',').map(p => this.parseValue(p.trim())) : [];
            return {
                type: 'METHOD_RESULT',
                objectName: 'Math',
                methodName: mathMethodMatch[1],
                parameters: params
            };
        }
        
        // String 메소드 호출 (str.length())
        const stringMethodMatch = trimmed.match(/^(\w+)\.(\w+)\s*\(\s*(.*?)\s*\)$/);
        if (stringMethodMatch) {
            const params = stringMethodMatch[3] ? stringMethodMatch[3].split(',').map(p => this.parseValue(p.trim())) : [];
            return {
                type: 'STRING_METHOD',
                stringName: stringMethodMatch[1],
                methodName: stringMethodMatch[2],
                parameters: params
            };
        }
        
        // 이항 연산식 (a + b, x * 2 등)
        if (this.containsOperator(trimmed)) {
            return this.parseExpression(trimmed);
        }
        
        // 변수 참조
        if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(trimmed)) {
            return {
                type: 'VARIABLE',
                name: trimmed
            };
        }
        
        console.warn('⚠️ 파싱되지 않은 값:', trimmed);
        return {
            type: 'UNKNOWN',
            value: trimmed
        };
    }

    // 연산자 포함 여부 확인
    containsOperator(str) {
        return /[\+\-\*\/%<>=!&|]/.test(str);
    }

    // 표현식 파싱 (이항/단항 연산식)
    parseExpression(expr) {
        const trimmed = expr.trim();
        
        // 괄호 제거
        if (trimmed.startsWith('(') && trimmed.endsWith(')')) {
            return this.parseExpression(trimmed.slice(1, -1));
        }
        
        // 이항 연산자 우선순위 (낮은 순서부터)
        const operators = ['||', '&&', '==', '!=', '<=', '>=', '<', '>', '+', '-', '*', '/', '%'];
        
        for (const op of operators) {
            const parts = this.splitExpression(trimmed, op);
            if (parts.length === 2) {
                return {
                    type: 'BINARY_EXPRESSION',
                    operator: op,
                    left: this.parseValue(parts[0]),
                    right: this.parseValue(parts[1])
                };
            }
        }
        
        // 단항 연산자 (!x, -x)
        if (trimmed.startsWith('!')) {
            return {
                type: 'UNARY_EXPRESSION',
                operator: '!',
                operand: this.parseValue(trimmed.slice(1))
            };
        }
        
        if (trimmed.startsWith('-') && !/^-?\d+(\.\d+)?$/.test(trimmed)) {
            return {
                type: 'UNARY_EXPRESSION',
                operator: '-',
                operand: this.parseValue(trimmed.slice(1))
            };
        }
        
        // 일반 값으로 처리
        return this.parseValue(trimmed);
    }

    // 표현식을 연산자로 분할
    splitExpression(expr, operator) {
        let depth = 0;
        let lastIndex = -1;
        
        for (let i = expr.length - operator.length; i >= 0; i--) {
            const char = expr[i];
            
            if (char === ')') depth++;
            else if (char === '(') depth--;
            
            if (depth === 0 && expr.substring(i, i + operator.length) === operator) {
                const left = expr.substring(0, i).trim();
                const right = expr.substring(i + operator.length).trim();
                if (left && right) {
                    return [left, right];
                }
            }
        }
        
        return [expr];
    }

    // 토큰 파싱
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
        const mockInputs = ['10', 'Hello', '3.14', 'World', '25', '42'];
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
                case '+': return left + right;
                case '-': return left - right;
                case '*': return left * right;
                case '/': return left / right;
                case '%': return left % right;
                case '==': return left == right;
                case '!=': return left != right;
                case '<': return left < right;
                case '>': return left > right;
                case '<=': return left <= right;
                case '>=': return left >= right;
                case '&&': return left && right;
                case '||': return left || right;
                default:
                    throw new Error(`지원되지 않는 연산자: ${expr.operator}`);
            }
        }
        
        if (expr.type === 'UNARY_EXPRESSION') {
            const operand = this.evaluateExpression(expr.operand);
            
            switch (expr.operator) {
                case '!': return !operand;
                case '-': return -operand;
                default:
                    throw new Error(`지원되지 않는 단항 연산자: ${expr.operator}`);
            }
        }
        
        // Math 메소드 처리
        if (expr.type === 'METHOD_RESULT') {
            const objectName = expr.objectName;
            const methodName = expr.methodName;
            const params = expr.parameters.map(p => this.evaluateExpression(p));
            
        if (objectName === 'Math') {
            switch (methodName) {
                    case 'abs': return Math.abs(params[0]);
                    case 'max': return Math.max(params[0], params[1]);
                    case 'min': return Math.min(params[0], params[1]);
                    case 'pow': return Math.pow(params[0], params[1]);
                    case 'sqrt': return Math.sqrt(params[0]);
                    case 'floor': return Math.floor(params[0]);
                    case 'ceil': return Math.ceil(params[0]);
                    case 'round': return Math.round(params[0]);
                    case 'random': return Math.random();
                default:
                    throw new Error(`Math.${methodName} 메서드는 지원되지 않습니다`);
            }
        }
        }
        
        // String 메소드 처리
        if (expr.type === 'STRING_METHOD') {
            const stringName = expr.stringName;
            const methodName = expr.methodName;
            const params = expr.parameters.map(p => this.evaluateExpression(p));
        
        if (!this.variables.has(stringName)) {
            throw new Error(`변수 '${stringName}'이 정의되지 않았습니다`);
        }
        
        const stringValue = String(this.variables.get(stringName));
        
        switch (methodName) {
                case 'length': return stringValue.length;
                case 'charAt': return stringValue.charAt(params[0]);
            case 'substring':
                return params.length === 1 ? 
                    stringValue.substring(params[0]) : 
                    stringValue.substring(params[0], params[1]);
                case 'indexOf': return stringValue.indexOf(String(params[0]));
                case 'toLowerCase': return stringValue.toLowerCase();
                case 'toUpperCase': return stringValue.toUpperCase();
            default:
                throw new Error(`String.${methodName} 메서드는 지원되지 않습니다`);
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
        
        // 일반 값 평가
        return this.evaluateValue(expr);
    }

    // 기본값 반환
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
            case 'boolean':
                return false;
            case 'char':
                return '\0';
            case 'String':
                return "";
            default:
                return null;
        }
    }
}

// ========================= 2단계: 키워드 검증 시스템 =========================

// 문제 카테고리별 필수 키워드 매핑
const REQUIRED_KEYWORDS = {
    "변수와타입": {
        required: ["int", "String", "="],
        optional: ["double", "boolean", "char"],
        forbidden: ["System.out.println\\(.*정답.*\\)"], // 직접 정답 출력 금지
        minKeywordCount: 2
    },
    "조건문": {
        required: ["if", "else"],
        optional: ["else if", "switch", "case"],
        forbidden: ["System.out.println\\(.*정답.*\\)"],
        minKeywordCount: 1
    },
    "반복문": {
        required: ["for", "while"],
        optional: ["do", "break", "continue"],
        forbidden: ["System.out.println\\(.*정답.*\\)"],
        minKeywordCount: 1
    },
    "배열": {
        required: ["\\[\\]", "new", "length"],
        optional: ["Arrays", "sort"],
        forbidden: ["System.out.println\\(.*정답.*\\)"],
        minKeywordCount: 2
    },
    "메소드": {
        required: ["public", "static", "void", "return"],
        optional: ["private", "protected"],
        forbidden: ["System.out.println\\(.*정답.*\\)"],
        minKeywordCount: 2
    },
    "클래스와객체": {
        required: ["class", "new", "\\."],
        optional: ["constructor", "this"],
        forbidden: ["System.out.println\\(.*정답.*\\)"],
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
            return { validationPassed: true, reason: "검증 규칙 없음", keywordScore: 80 };
        }
        
        // 1. 금지 키워드 검사
        const forbiddenFound = this.checkForbiddenKeywords(code, rules.forbidden);
        if (forbiddenFound.length > 0) {
            return {
                validationPassed: false,
                reason: `금지된 코드 패턴 발견: ${forbiddenFound.join(', ')}`,
                suggestion: "문제를 직접 해결하는 코드를 작성해주세요.",
                keywordScore: 0
            };
        }
        
        // 2. 카테고리별 특화 검증 (변수와타입)
        if (problemCategory === "변수와타입") {
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
        
        console.log('✅ 변수와 타입 검증 통과');
        return { passed: true };
    }
    
    // 문제 설명 가져오기
    getProblemDescription() {
        try {
            // 시험 페이지에서 문제 설명 가져오기
            const descElement = document.querySelector('#problemDescription');
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
            "변수와타입": "변수 선언(int, String)과 할당 연산자(=)를 사용해주세요",
            "조건문": "if, else 키워드를 사용한 조건문을 작성해주세요",
            "반복문": "for 또는 while 키워드를 사용한 반복문을 작성해주세요",
            "배열": "배열 선언([])과 new 키워드를 사용해주세요",
            "메소드": "public, static 키워드를 사용한 메소드를 작성해주세요",
            "클래스와객체": "class 키워드와 new 키워드를 사용해주세요"
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
    // 카테고리 ID를 기반으로 카테고리명 매핑
    const categoryIdElement = document.getElementById('problemCategoryId');
    if (categoryIdElement) {
        const categoryId = parseInt(categoryIdElement.value);
        const categoryMap = {
            1: '변수와타입',
            2: '조건문', 
            3: '반복문',
            4: '배열',
            5: '메소드',
            6: '클래스와객체'
        };
        return categoryMap[categoryId] || '기본';
    }
    
    // 기존 방식도 유지 (하위 호환성)
    const categoryElement = document.getElementById('problemCategory');
    if (categoryElement) {
        return categoryElement.value;
    }
    
    // JSP에서 전달된 카테고리 정보 찾기
    const scripts = document.querySelectorAll('script');
    for (const script of scripts) {
        const content = script.textContent || script.innerHTML;
        if (content.includes('problemCategory')) {
            const match = content.match(/problemCategory.*?["']([^"']+)["']/);
            if (match) {
                return match[1];
            }
        }
    }
    
    return '기본';
}

// 사이드바 토글
 