// DOM이 로드되면 실행
document.addEventListener('DOMContentLoaded', function() {
    setupFormValidation();
    setupEditorFunctions();
});

// 폼 검증 설정
function setupFormValidation() {
    try {
        const titleInput = document.getElementById('title');
        const contentTextarea = document.getElementById('content');

        if (titleInput) {
            titleInput.addEventListener('input', updateCharCount);
        }

        if (contentTextarea) {
            contentTextarea.addEventListener('input', updateCharCount);
            // Tab 키로 들여쓰기 지원
            contentTextarea.addEventListener('keydown', handleTab);
        }

        // 폼 제출 이벤트
        const form = document.getElementById('postForm');
        if (form) {
            form.addEventListener('submit', handleFormSubmit);
        }
    } catch (error) {
        console.error('폼 검증 설정 중 오류가 발생했습니다:', error);
    }
}

// 문자 수 카운터 업데이트
function updateCharCount(event) {
    try {
        const input = event.target;
        const currentLength = input.value.length;
        const maxLength = input.maxLength;
        
        const charCountElement = input.parentElement.querySelector('.char-count');
        if (charCountElement) {
            charCountElement.textContent = `${currentLength} / ${maxLength}`;
            
            // 문자수에 따른 색상 변경
            if (currentLength > maxLength * 0.9) {
                charCountElement.style.color = '#ff6b6b';
            } else if (currentLength > maxLength * 0.7) {
                charCountElement.style.color = '#ffa726';
            } else {
                charCountElement.style.color = '#64ffda';
            }
        }
    } catch (error) {
        console.error('문자 수 업데이트 중 오류가 발생했습니다:', error);
    }
}

// Tab 키 처리 (들여쓰기)
function handleTab(event) {
    try {
        if (event.key === 'Tab') {
            event.preventDefault();
            
            const textarea = event.target;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            
            // Tab 문자 삽입
            const value = textarea.value;
            textarea.value = value.substring(0, start) + '\t' + value.substring(end);
            
            // 커서 위치 조정
            textarea.selectionStart = textarea.selectionEnd = start + 1;
        }
    } catch (error) {
        console.error('Tab 키 처리 중 오류가 발생했습니다:', error);
    }
}

// 에디터 기능 설정
function setupEditorFunctions() {
    try {
        // 에디터 기능은 유지 (코드 에디터 관련 기능)
        console.log('에디터 기능이 초기화되었습니다.');
    } catch (error) {
        console.error('에디터 기능 설정 중 오류가 발생했습니다:', error);
    }
}

// 텍스트 포맷팅 (굵게, 기울임)
function formatText(format) {
    try {
        const textarea = document.getElementById('content');
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        
        let formattedText = '';
        
        switch(format) {
            case 'bold':
                formattedText = `**${selectedText}**`;
                break;
            case 'italic':
                formattedText = `*${selectedText}*`;
                break;
        }
        
        textarea.value = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end);
        
        // 커서 위치 조정
        const newCursorPos = start + formattedText.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
        textarea.focus();
        
        // 문자 수 업데이트
        updateCharCount({target: textarea});
    } catch (error) {
        console.error('텍스트 포맷팅 중 오류가 발생했습니다:', error);
    }
}

// 코드 블록 삽입
function insertCode() {
    try {
        const textarea = document.getElementById('content');
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        
        const codeBlock = `\`\`\`java\n${selectedText}\n\`\`\``;
        
        textarea.value = textarea.value.substring(0, start) + codeBlock + textarea.value.substring(end);
        
        // 커서를 코드 블록 안으로 이동
        const newCursorPos = start + '```java\n'.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos + selectedText.length);
        textarea.focus();
        
        // 문자 수 업데이트
        updateCharCount({target: textarea});
    } catch (error) {
        console.error('코드 블록 삽입 중 오류가 발생했습니다:', error);
    }
}

// 링크 삽입
function insertLink() {
    try {
        const textarea = document.getElementById('content');
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        
        const linkText = selectedText || '링크 텍스트';
        const linkMarkdown = `[${linkText}](URL을 입력하세요)`;
        
        textarea.value = textarea.value.substring(0, start) + linkMarkdown + textarea.value.substring(end);
        
        // 커서 위치 조정
        const urlStart = start + linkText.length + 3; // [링크텍스트]( 까지
        const urlEnd = urlStart + 'URL을 입력하세요'.length;
        textarea.setSelectionRange(urlStart, urlEnd);
        textarea.focus();
        
        // 문자 수 업데이트
        updateCharCount({target: textarea});
    } catch (error) {
        console.error('링크 삽입 중 오류가 발생했습니다:', error);
    }
}

// 목록 삽입
function insertList() {
    try {
        const textarea = document.getElementById('content');
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        
        let listText = '';
        if (selectedText) {
            const lines = selectedText.split('\n');
            listText = lines.map(line => line.trim() ? `- ${line.trim()}` : '').join('\n');
        } else {
            listText = '- 목록 항목 1\n- 목록 항목 2\n- 목록 항목 3';
        }
        
        textarea.value = textarea.value.substring(0, start) + listText + textarea.value.substring(end);
        
        // 커서 위치 조정
        const newCursorPos = start + listText.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
        textarea.focus();
        
        // 문자 수 업데이트
        updateCharCount({target: textarea});
    } catch (error) {
        console.error('목록 삽입 중 오류가 발생했습니다:', error);
    }
}

// 폼 제출 처리
function handleFormSubmit(event) {
    try {
        event.preventDefault();
        
        const category = document.getElementById('category').value;
        const title = document.getElementById('title').value.trim();
        const content = document.getElementById('content').value.trim();
        
        // 기본 검증
        if (!category) {
            alert('카테고리를 선택해주세요.');
            return;
        }
        
        if (!title) {
            alert('제목을 입력해주세요.');
            return;
        }
        
        if (!content) {
            alert('내용을 입력해주세요.');
            return;
        }
        
        // 백엔드로 데이터 전송 예정
        console.log('게시글 등록 데이터:', { category, title, content });
        alert('게시글이 등록되었습니다.');
        
    } catch (error) {
        console.error('폼 제출 중 오류가 발생했습니다:', error);
        alert('게시글 등록 중 오류가 발생했습니다.');
    }
}

// 폼 초기화
function resetForm() {
    try {
        if (confirm('작성 중인 내용을 모두 지우시겠습니까?')) {
            document.getElementById('postForm').reset();
            
            // 문자 수 카운터 초기화
            const charCounts = document.querySelectorAll('.char-count');
            charCounts.forEach(counter => {
                if (counter.textContent.includes('/')) {
                    const maxLength = counter.textContent.split('/')[1].trim();
                    counter.textContent = `0 / ${maxLength}`;
                    counter.style.color = '#64ffda';
                }
            });
        }
    } catch (error) {
        console.error('폼 초기화 중 오류가 발생했습니다:', error);
    }
}
