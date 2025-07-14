// DOM이 로드되면 실행
document.addEventListener('DOMContentLoaded', function() {
    checkPostAuthor();
    setupEventListeners();
});

// 게시글 작성자 확인 (수정/삭제 버튼 표시용)
function checkPostAuthor() {
    try {
        const user = localStorage.getItem('user');
        const postManagement = document.getElementById('postManagement');
        
        if (user && postManagement) {
            const userData = JSON.parse(user);
            // TODO: 실제로는 서버에서 게시글 작성자 정보를 가져와서 비교
            const isAuthor = userData.nickname === '자바초보'; // 임시 로직
            
            if (isAuthor) {
                postManagement.style.display = 'flex';
            }
        }
    } catch (error) {
        console.error('게시글 작성자 확인 중 오류가 발생했습니다:', error);
    }
}

// 이벤트 리스너 설정
function setupEventListeners() {
    try {
        const commentInput = document.querySelector('.comment-input');
        const sortSelect = document.querySelector('.sort-select');
        
        if (sortSelect) {
            sortSelect.addEventListener('change', handleSortChange);
        }
        
        if (commentInput) {
            commentInput.addEventListener('input', handleCommentInputChange);
        }
    } catch (error) {
        console.error('이벤트 리스너 설정 중 오류가 발생했습니다:', error);
    }
}

// 댓글 정렬 변경 처리
function handleSortChange(event) {
    try {
        const sortType = event.target.value;
        console.log('댓글 정렬 변경:', sortType);
        // 백엔드에서 정렬된 댓글 목록을 가져올 예정
    } catch (error) {
        console.error('댓글 정렬 변경 중 오류가 발생했습니다:', error);
    }
}

// 댓글 입력 변경 처리
function handleCommentInputChange(event) {
    try {
        const input = event.target;
        const submitBtn = document.querySelector('.form-actions .btn-primary');
        
        if (submitBtn) {
            // 댓글 내용이 있으면 버튼 활성화
            submitBtn.disabled = input.value.trim() === '';
        }
    } catch (error) {
        console.error('댓글 입력 처리 중 오류가 발생했습니다:', error);
    }
}

// 댓글 작성
function submitComment() {
    try {
        const user = localStorage.getItem('user');
        if (!user) {
            alert('로그인이 필요합니다.');
            return;
        }
        
        const commentInput = document.querySelector('.comment-input');
        const content = commentInput.value.trim();
        
        if (!content) {
            alert('댓글 내용을 입력해주세요.');
            return;
        }
        
        // TODO: 댓글 등록 API 호출
        console.log('댓글 등록:', content);
        
        // 임시: 등록 완료 처리
        alert('댓글이 등록되었습니다.');
        commentInput.value = '';
        
    } catch (error) {
        console.error('댓글 작성 중 오류가 발생했습니다:', error);
        alert('댓글 작성 중 오류가 발생했습니다.');
    }
}

// 댓글 더보기
function loadMoreComments() {
    try {
        console.log('댓글 더보기');
        // TODO: 댓글 더보기 API 호출
    } catch (error) {
        console.error('댓글 더보기 중 오류가 발생했습니다:', error);
    }
}

// 게시글 수정
function editPost() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('id') || '1';
        window.location.href = `board_update.jsp?id=${postId}`;
    } catch (error) {
        console.error('게시글 수정 페이지 이동 중 오류가 발생했습니다:', error);
    }
}

// 게시글 삭제
function deletePost() {
    try {
        if (confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
            // TODO: 게시글 삭제 API 호출
            console.log('게시글 삭제');
            alert('게시글이 삭제되었습니다.');
            window.location.href = 'board.jsp';
        }
    } catch (error) {
        console.error('게시글 삭제 중 오류가 발생했습니다:', error);
        alert('게시글 삭제 중 오류가 발생했습니다.');
    }
}

// 댓글 정렬
function sortComments(sortType) {
    // TODO: 댓글 정렬 로직 구현
    console.log('댓글 정렬:', sortType);
}

// 댓글 목록 렌더링
function renderComments(comments) {
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = comments.map(comment => `
        <div class="comment-item">
            <div class="comment-header">
                <div class="comment-author">
                    <div class="author-avatar">${comment.authorAvatar || '👤'}</div>
                    <div class="author-details">
                        <div class="author-name">${comment.authorName}</div>
                        <div class="comment-date">${comment.date}</div>
                    </div>
                </div>
            </div>
            <div class="comment-content">
                ${comment.content}
            </div>
        </div>
    `).join('');
}
