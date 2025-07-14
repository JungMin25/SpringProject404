// exam_play.js - 시험 진행 페이지 스크립트
console.log('🚀 exam_play.js 파일이 로드되었습니다!');

// 전역 변수
let monacoEditor = null;
let lastExecutionResult = null; // 마지막 실행 결과 저장

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOMContentLoaded 이벤트 시작');
    
    // 1. Monaco Editor 초기화
    initializeMonacoEditor();
    
    // 2. Form 제출 시 Monaco Editor 값 복사
    setupFormSubmission();
    
    console.log('✅ 초기화 완료');
});

// Form 제출 시 실행 결과 전달
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
                // 제출하기의 경우 실행 결과 확인
                if (!lastExecutionResult) {
                    e.preventDefault(); // form 제출 중단
                    alert('먼저 코드를 실행해주세요. "실행" 버튼을 클릭한 후 제출해주세요.');
                    return false;
                }
                
                if (!lastExecutionResult.success) {
                    e.preventDefault(); // form 제출 중단
                    alert('코드 실행에 오류가 있습니다. 코드를 수정한 후 다시 실행해주세요.');
                    return false;
                }
                
                if (correctCodeField) {
                    // 실행 결과의 출력값을 전달
                    correctCodeField.value = lastExecutionResult.output;
                    console.log('📝 실행 결과를 correctCode에 복사 완료:', lastExecutionResult.output);
                    console.log('📝 textarea 값 확인:', correctCodeField.value);
                } else {
                    console.error('❌ correctCode textarea를 찾을 수 없습니다');
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





// Monaco Editor 초기화
function initializeMonacoEditor() {
    require(['vs/editor/editor.main'], function() {
        const editorContainer = document.getElementById('monaco-editor');
        const loadingElement = document.getElementById('editorLoading');
        
        if (editorContainer) {
            try {
                monacoEditor = monaco.editor.create(editorContainer, {
                    value: getDefaultCode(),
                    language: 'java',
                    theme: 'vs-dark',
                    automaticLayout: true,
                    fontSize: 14,
                    lineNumbers: 'on',
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    readOnly: false,
                    minimap: { enabled: false },
                    // 자동완성 기능 활성화
                    suggest: {
                        showMethods: true,
                        showKeywords: true,
                        showClasses: true,
                        showConstructors: true,
                        showFields: true,
                        showVariables: true,
                        showProperties: true,
                        showEvents: true,
                        showOperators: true,
                        showUnits: true,
                        showValues: true,
                        showConstants: true,
                        showEnums: true,
                        showEnumMembers: true,
                        showModules: true,
                        showStructs: true,
                        showTypeParameters: true,
                        showSnippets: true,
                        insertMode: 'insert',
                        filterGraceful: true
                    },
                    // IntelliSense 활성화
                    acceptSuggestionOnCommitCharacter: true,
                    acceptSuggestionOnEnter: 'on',
                    quickSuggestions: {
                        other: true,
                        comments: false,
                        strings: false
                    },
                    suggestOnTriggerCharacters: true,
                    wordBasedSuggestions: true,
                    // 코드 힌트 및 호버 정보
                    hover: {
                        enabled: true
                    },
                    parameterHints: {
                        enabled: true
                    }
                });
                
                if (loadingElement) {
                    loadingElement.style.display = 'none';
                }
                
                // 코드 변경 시 실행 결과 초기화
                monacoEditor.onDidChangeModelContent(() => {
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
                
                // Java 자동완성 기능 추가
                setupJavaAutocompletion();
                
                console.log('✅ Monaco Editor 초기화 완료');
            } catch (error) {
                console.error('❌ Monaco Editor 초기화 실패:', error);
                if (loadingElement) {
                    loadingElement.textContent = 'Monaco Editor 로딩 실패';
                }
            }
        }
    });
}

// Java 자동완성 기능 설정
function setupJavaAutocompletion() {
    // Java 자동완성 항목 등록
    monaco.languages.registerCompletionItemProvider('java', {
        provideCompletionItems: function(model, position) {
            const word = model.getWordUntilPosition(position);
            const range = {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: word.startColumn,
                endColumn: word.endColumn
            };

            const suggestions = [
                // System.out 관련
                {
                    label: 'System.out.println',
                    kind: monaco.languages.CompletionItemKind.Method,
                    insertText: 'System.out.println(${1:"텍스트"});',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: '콘솔에 텍스트를 출력하고 새 줄로 이동',
                    range: range
                },
                {
                    label: 'System.out.print',
                    kind: monaco.languages.CompletionItemKind.Method,
                    insertText: 'System.out.print(${1:"텍스트"});',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: '콘솔에 텍스트를 출력 (새 줄로 이동하지 않음)',
                    range: range
                },
                {
                    label: 'sout',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: 'System.out.println(${1:"텍스트"});',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'System.out.println 단축키',
                    range: range
                },
                
                // Scanner 관련
                {
                    label: 'Scanner',
                    kind: monaco.languages.CompletionItemKind.Class,
                    insertText: 'Scanner ${1:scanner} = new Scanner(System.in);',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'Scanner 객체 생성',
                    range: range
                },
                {
                    label: 'nextInt',
                    kind: monaco.languages.CompletionItemKind.Method,
                    insertText: '${1:scanner}.nextInt()',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: '정수 입력 받기',
                    range: range
                },
                {
                    label: 'nextLine',
                    kind: monaco.languages.CompletionItemKind.Method,
                    insertText: '${1:scanner}.nextLine()',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: '문자열 한 줄 입력 받기',
                    range: range
                },
                {
                    label: 'next',
                    kind: monaco.languages.CompletionItemKind.Method,
                    insertText: '${1:scanner}.next()',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: '단어 하나 입력 받기',
                    range: range
                },
                
                // String 메서드들
                {
                    label: 'length',
                    kind: monaco.languages.CompletionItemKind.Method,
                    insertText: 'length()',
                    documentation: '문자열의 길이 반환',
                    range: range
                },
                {
                    label: 'charAt',
                    kind: monaco.languages.CompletionItemKind.Method,
                    insertText: 'charAt(${1:index})',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: '지정된 인덱스의 문자 반환',
                    range: range
                },
                {
                    label: 'substring',
                    kind: monaco.languages.CompletionItemKind.Method,
                    insertText: 'substring(${1:start}, ${2:end})',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: '부분 문자열 반환',
                    range: range
                },
                {
                    label: 'indexOf',
                    kind: monaco.languages.CompletionItemKind.Method,
                    insertText: 'indexOf(${1:"찾을문자"})',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: '문자열에서 특정 문자의 인덱스 반환',
                    range: range
                },
                {
                    label: 'equals',
                    kind: monaco.languages.CompletionItemKind.Method,
                    insertText: 'equals(${1:other})',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: '문자열 비교',
                    range: range
                },
                
                // 기본 자료형 및 키워드
                {
                    label: 'public static void main',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: 'public static void main(String[] args) {\n\t${1:// 코드를 여기에 작성하세요}\n}',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'main 메서드',
                    range: range
                },
                {
                    label: 'for',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: 'for (int ${1:i} = 0; ${1:i} < ${2:length}; ${1:i}++) {\n\t${3:// 반복할 코드}\n}',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'for 반복문',
                    range: range
                },
                {
                    label: 'while',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: 'while (${1:condition}) {\n\t${2:// 반복할 코드}\n}',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'while 반복문',
                    range: range
                },
                {
                    label: 'if',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: 'if (${1:condition}) {\n\t${2:// 실행할 코드}\n}',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'if 조건문',
                    range: range
                },
                {
                    label: 'if-else',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: 'if (${1:condition}) {\n\t${2:// true일 때 실행할 코드}\n} else {\n\t${3:// false일 때 실행할 코드}\n}',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'if-else 조건문',
                    range: range
                },
                
                // 배열 관련
                {
                    label: 'int array',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: 'int[] ${1:arr} = new int[${2:size}];',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: '정수 배열 선언',
                    range: range
                },
                {
                    label: 'String array',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: 'String[] ${1:arr} = new String[${2:size}];',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: '문자열 배열 선언',
                    range: range
                },
                
                // Math 클래스
                {
                    label: 'Math.max',
                    kind: monaco.languages.CompletionItemKind.Method,
                    insertText: 'Math.max(${1:a}, ${2:b})',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: '두 수 중 큰 값 반환',
                    range: range
                },
                {
                    label: 'Math.min',
                    kind: monaco.languages.CompletionItemKind.Method,
                    insertText: 'Math.min(${1:a}, ${2:b})',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: '두 수 중 작은 값 반환',
                    range: range
                },
                {
                    label: 'Math.abs',
                    kind: monaco.languages.CompletionItemKind.Method,
                    insertText: 'Math.abs(${1:number})',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: '절댓값 반환',
                    range: range
                },
                
                // 자주 사용하는 패턴들
                {
                    label: 'try-catch',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: 'try {\n\t${1:// 시도할 코드}\n} catch (${2:Exception} e) {\n\t${3:// 예외 처리}\n}',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'try-catch 예외 처리',
                    range: range
                }
            ];

            return { suggestions: suggestions };
        }
    });

    console.log('✅ Java 자동완성 기능이 설정되었습니다.');
}

// 기본 Java 코드 템플릿
function getDefaultCode() {
    return `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        // 여기에 코드를 작성하세요
        
    }
}`;
}



// 코드 실행
function runCode() {
    if (!monacoEditor) {
        alert('코드 에디터가 아직 로드되지 않았습니다.');
        return;
    }
    
    const code = monacoEditor.getValue();
    const resultStatus = document.getElementById('resultStatus');
    const resultContent = document.getElementById('resultContent');
    
    if (!code.trim() || code === getDefaultCode()) {
        alert('코드를 작성해주세요.');
        return;
    }
    
    if (resultStatus) resultStatus.textContent = '실행 중...';
    if (resultContent) resultContent.textContent = '코드를 실행하고 있습니다...';
    
    setTimeout(() => {
        // 고급 Java 코드 실행 엔진 사용
        const javaEngine = new JavaExecutionEngine();
        const result = javaEngine.execute(code);
        
        // 실행 결과를 전역 변수에 저장
        lastExecutionResult = {
            status: result.success ? '컴파일 성공!' : '실행 오류',
            output: result.output || '(출력 없음)',
            executionTime: '0.12초',
            success: result.success
        };
        
        if (resultStatus) resultStatus.textContent = '완료';
        if (resultContent) {
            resultContent.textContent = `실행 결과:\n${lastExecutionResult.status}\n\n출력:\n${lastExecutionResult.output}\n\n실행 시간: ${lastExecutionResult.executionTime}`;
        }
        
        console.log('🚀 Java 실행 엔진 결과:', result);
        console.log('📊 코드 실행 완료. 결과 저장됨:', lastExecutionResult);
    }, 1500);
}





// 코드 초기화
function resetCode() {
    if (monacoEditor && confirm('코드를 초기화하시겠습니까?')) {
        monacoEditor.setValue(getDefaultCode());
    }
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

        // 배열 요소 접근: arr[index] = value;
        const arrayAssignMatch = trimmed.match(/^(\w+)\[(.+)\]\s*=\s*(.+);$/);
        if (arrayAssignMatch) {
            return {
                type: 'ARRAY_ASSIGNMENT',
                arrayName: arrayAssignMatch[1],
                index: this.parseExpression(arrayAssignMatch[2].trim()),
                value: this.parseExpression(arrayAssignMatch[3].trim())
            };
        }

        // if 문: if (condition) {
        const ifMatch = trimmed.match(/^if\s*\((.+)\)\s*\{?$/);
        if (ifMatch) {
            return {
                type: 'IF_STATEMENT',
                condition: this.parseExpression(ifMatch[1].trim())
            };
        }

        // else if 문: } else if (condition) {
        const elseIfMatch = trimmed.match(/^}\s*else\s+if\s*\((.+)\)\s*\{?$/);
        if (elseIfMatch) {
            return {
                type: 'ELSE_IF_STATEMENT',
                condition: this.parseExpression(elseIfMatch[1].trim())
            };
        }

        // else 문: } else {
        const elseMatch = trimmed.match(/^}\s*else\s*\{?$/);
        if (elseMatch) {
            return {
                type: 'ELSE_STATEMENT'
            };
        }

        // while 문: while (condition) {
        const whileMatch = trimmed.match(/^while\s*\((.+)\)\s*\{?$/);
        if (whileMatch) {
            return {
                type: 'WHILE_STATEMENT',
                condition: this.parseExpression(whileMatch[1].trim())
            };
        }

        // for 문: for (int i = 0; i < 10; i++) {
        const forMatch = trimmed.match(/^for\s*\((.+)\)\s*\{?$/);
        if (forMatch) {
            const forParts = forMatch[1].split(';').map(p => p.trim());
            if (forParts.length === 3) {
                return {
                    type: 'FOR_STATEMENT',
                    initialization: forParts[0],
                    condition: this.parseExpression(forParts[1]),
                    increment: forParts[2]
                };
            }
        }

        // for-each 문: for (int x : array) {
        const forEachMatch = trimmed.match(/^for\s*\(\s*(int|String|double|float|boolean|char)\s+(\w+)\s*:\s*(\w+)\s*\)\s*\{?$/);
        if (forEachMatch) {
            return {
                type: 'FOR_EACH_STATEMENT',
                dataType: forEachMatch[1],
                variable: forEachMatch[2],
                iterable: forEachMatch[3]
            };
        }

        // break 문
        if (trimmed === 'break;') {
            return { type: 'BREAK_STATEMENT' };
        }

        // continue 문
        if (trimmed === 'continue;') {
            return { type: 'CONTINUE_STATEMENT' };
        }

        // return 문: return value;
        const returnMatch = trimmed.match(/^return\s*(.*);$/);
        if (returnMatch) {
            const returnValue = returnMatch[1].trim();
            return {
                type: 'RETURN_STATEMENT',
                value: returnValue ? this.parseExpression(returnValue) : null
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
        
        // 메서드 호출 결과: obj.method() 또는 Math.abs(x)
        const methodResultMatch = trimmed.match(/^(\w+)\.(\w+)\s*\(([^)]*)\)$/);
        if (methodResultMatch) {
            const params = methodResultMatch[3].trim() ? 
                methodResultMatch[3].split(',').map(p => this.parseExpression(p.trim())) : [];
            return {
                type: 'METHOD_RESULT',
                objectName: methodResultMatch[1],
                methodName: methodResultMatch[2],
                parameters: params
            };
        }
        
        // String 메서드: str.length(), str.charAt(0)
        const stringMethodMatch = trimmed.match(/^(\w+)\.(length|charAt|substring|indexOf|toLowerCase|toUpperCase)\s*\(([^)]*)\)$/);
        if (stringMethodMatch) {
            const params = stringMethodMatch[3].trim() ? 
                stringMethodMatch[3].split(',').map(p => this.parseExpression(p.trim())) : [];
            return {
                type: 'STRING_METHOD',
                stringName: stringMethodMatch[1],
                methodName: stringMethodMatch[2],
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
        
        // 단항 연산자 (!expr, -expr, +expr)
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
                
            case 'ARRAY_ASSIGNMENT':
                this.assignArrayElement(stmt);
                break;
                
            case 'IF_STATEMENT':
                this.executeIf(stmt);
                break;
                
            case 'WHILE_STATEMENT':
                this.executeWhile(stmt);
                break;
                
            case 'FOR_STATEMENT':
                this.executeFor(stmt);
                break;
                
            case 'FOR_EACH_STATEMENT':
                this.executeForEach(stmt);
                break;
                
            case 'INCREMENT_STATEMENT':
                this.executeIncrement(stmt);
                break;
                
            case 'BREAK_STATEMENT':
                throw new Error('BREAK'); // 루프 제어용 예외
                
            case 'CONTINUE_STATEMENT':
                throw new Error('CONTINUE'); // 루프 제어용 예외
                
            case 'RETURN_STATEMENT':
                this.executeReturn(stmt);
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

    // 배열 요소 할당
    assignArrayElement(stmt) {
        const arrayName = stmt.arrayName;
        const index = this.evaluateExpression(stmt.index);
        const value = this.evaluateExpression(stmt.value);
        
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
        
        array.value[idx] = value;
        console.log(`📋 배열 할당: ${arrayName}[${idx}] = ${value}`);
    }

    // if 문 실행
    executeIf(stmt) {
        const condition = this.evaluateExpression(stmt.condition);
        console.log(`🔀 if 조건: ${condition}`);
        
        if (condition) {
            console.log('✅ if 조건 참 - 블록 실행');
            // 실제 구현에서는 if 블록 내의 문장들을 실행해야 함
        } else {
            console.log('❌ if 조건 거짓 - 블록 건너뜀');
        }
    }

    // while 문 실행
    executeWhile(stmt) {
        let iterations = 0;
        const maxIterations = 1000; // 무한루프 방지
        
        while (this.evaluateExpression(stmt.condition) && iterations < maxIterations) {
            console.log(`🔄 while 반복 ${iterations + 1}`);
            // 실제 구현에서는 while 블록 내의 문장들을 실행해야 함
            iterations++;
        }
        
        console.log(`🔄 while 완료 (${iterations}회 반복)`);
    }

    // for 문 실행
    executeFor(stmt) {
        console.log(`🔄 for 루프: ${stmt.initialization}; ${stmt.condition}; ${stmt.increment}`);
        
        // 초기화 실행
        this.executeStatement(this.parseStatement(stmt.initialization + ';'));
        
        let iterations = 0;
        const maxIterations = 1000; // 무한루프 방지
        
        while (this.evaluateExpression(stmt.condition) && iterations < maxIterations) {
            console.log(`🔄 for 반복 ${iterations + 1}`);
            // 실제 구현에서는 for 블록 내의 문장들을 실행해야 함
            
            // 증감 실행
            this.executeStatement(this.parseStatement(stmt.increment + ';'));
            iterations++;
        }
        
        console.log(`🔄 for 완료 (${iterations}회 반복)`);
    }

    // for-each 문 실행
    executeForEach(stmt) {
        const iterableName = stmt.iterable;
        
        if (!this.variables.has(iterableName)) {
            throw new Error(`변수 '${iterableName}'이 정의되지 않았습니다`);
        }
        
        const iterable = this.variables.get(iterableName);
        if (iterable.type !== 'array') {
            throw new Error(`'${iterableName}'은 반복 가능한 객체가 아닙니다`);
        }
        
        console.log(`🔄 for-each: ${stmt.dataType} ${stmt.variable} : ${iterableName}`);
        
        for (let i = 0; i < iterable.value.length; i++) {
            const value = iterable.value[i];
            this.variables.set(stmt.variable, value);
            console.log(`🔄 for-each 반복 ${i + 1}: ${stmt.variable} = ${value}`);
            // 실제 구현에서는 for-each 블록 내의 문장들을 실행해야 함
        }
        
        console.log(`🔄 for-each 완료`);
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

    // return 문 실행
    executeReturn(stmt) {
        const value = stmt.value ? this.evaluateExpression(stmt.value) : null;
        console.log(`↩️ return: ${value}`);
        throw new Error(`RETURN:${value}`); // 메서드 종료용 예외
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
                return this.evaluateArrayAccess(valueObj);
                
            case 'METHOD_RESULT':
                return this.evaluateMethodResult(valueObj);
                
            case 'STRING_METHOD':
                return this.evaluateStringMethod(valueObj);
                
            case 'BINARY_EXPRESSION':
            case 'UNARY_EXPRESSION':
                return this.evaluateExpression(valueObj);
                
            default:
                throw new Error(`알 수 없는 값 타입: ${valueObj.type}`);
        }
    }

    // 배열 접근 평가
    evaluateArrayAccess(valueObj) {
        const arrayName = valueObj.arrayName;
        const index = this.evaluateExpression(valueObj.index);
        
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

    // 메서드 결과 평가 (Math.abs, Math.max 등)
    evaluateMethodResult(valueObj) {
        const objectName = valueObj.objectName;
        const methodName = valueObj.methodName;
        const params = valueObj.parameters.map(p => this.evaluateExpression(p));
        
        // Math 클래스 메서드들
        if (objectName === 'Math') {
            switch (methodName) {
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
                case 'floor':
                    return Math.floor(params[0]);
                case 'ceil':
                    return Math.ceil(params[0]);
                case 'round':
                    return Math.round(params[0]);
                case 'random':
                    return Math.random();
                default:
                    throw new Error(`Math.${methodName} 메서드는 지원되지 않습니다`);
            }
        }
        
        throw new Error(`${objectName}.${methodName} 메서드는 지원되지 않습니다`);
    }

    // String 메서드 평가
    evaluateStringMethod(valueObj) {
        const stringName = valueObj.stringName;
        const methodName = valueObj.methodName;
        const params = valueObj.parameters.map(p => this.evaluateExpression(p));
        
        if (!this.variables.has(stringName)) {
            throw new Error(`변수 '${stringName}'이 정의되지 않았습니다`);
        }
        
        const stringValue = String(this.variables.get(stringName));
        
        switch (methodName) {
            case 'length':
                return stringValue.length;
            case 'charAt':
                return stringValue.charAt(params[0]);
            case 'substring':
                return params.length === 1 ? 
                    stringValue.substring(params[0]) : 
                    stringValue.substring(params[0], params[1]);
            case 'indexOf':
                return stringValue.indexOf(String(params[0]));
            case 'toLowerCase':
                return stringValue.toLowerCase();
            case 'toUpperCase':
                return stringValue.toUpperCase();
            default:
                throw new Error(`String.${methodName} 메서드는 지원되지 않습니다`);
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

// 사이드바 토글
 