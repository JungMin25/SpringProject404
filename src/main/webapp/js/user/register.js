// register.js - 회원가입 페이지 스크립트

document.addEventListener('DOMContentLoaded', function() {
    // 탭 클릭 이벤트 처리
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabType = this.getAttribute('data-tab');
            if (tabType === 'login') {
                window.location.href = 'loginpage.do';
            }
        });
    });

    // 인증 관련 요소
    const emailInput = document.getElementById('email');
    const sendEmailBtn = document.getElementById('sendEmailBtn');
    const verificationCodeGroup = document.getElementById('verificationCodeGroup');
    const verificationCodeInput = document.getElementById('verificationCode');
    const verifyCodeBtn = document.getElementById('verifyCodeBtn');
    let isEmailVerified = false;

    // 이메일 형식 검증 함수
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // 인증번호 발송 버튼 클릭
    if (sendEmailBtn) {
        sendEmailBtn.addEventListener('click', function() {
            const email = emailInput.value.trim();
            if (!email) {
                showError('emailError', '이메일을 입력하세요.');
                return;
            }
            if (!validateEmail(email)) {
                showError('emailError', '올바른 이메일 형식을 입력하세요.');
                return;
            }
            clearError('emailError');
            sendEmailBtn.disabled = true;
            sendEmailBtn.textContent = '발송 중...';

            fetch('sendEmailVerification.do', {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: `email=${encodeURIComponent(email)}`
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    showSuccess('emailError', data.message);
                    verificationCodeGroup.style.display = 'block';
                    verificationCodeInput.focus();
                } else {
                    showError('emailError', data.message);
                }
            })
            .catch(() => showError('emailError', '서버 오류가 발생했습니다.'))
            .finally(() => {
                sendEmailBtn.disabled = false;
                sendEmailBtn.textContent = '인증번호 발송';
            });
        });
    }

    // 인증번호 확인 버튼 클릭
    if (verifyCodeBtn) {
        verifyCodeBtn.addEventListener('click', function() {
            const email = emailInput.value.trim();
            const verificationCode = verificationCodeInput.value.trim();
            if (!verificationCode) {
                showError('verificationCodeError', '인증번호를 입력하세요.');
                return;
            }
            clearError('verificationCodeError');
            verifyCodeBtn.disabled = true;
            verifyCodeBtn.textContent = '확인 중...';

            fetch('verifyEmailCode.do', {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: `email=${encodeURIComponent(email)}&verificationCode=${encodeURIComponent(verificationCode)}`
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    showSuccess('verificationCodeSuccess', data.message);
                    isEmailVerified = true;
                    verificationCodeInput.disabled = true;
                    verifyCodeBtn.disabled = true;
                    verifyCodeBtn.textContent = '인증완료';
                } else {
                    showError('verificationCodeError', data.message);
                }
            })
            .catch(() => showError('verificationCodeError', '서버 오류가 발생했습니다.'))
            .finally(() => {
                if (!isEmailVerified) {
                    verifyCodeBtn.disabled = false;
                    verifyCodeBtn.textContent = '인증확인';
                }
            });
        });
    }

    // 회원가입 submit 시 인증 체크
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            if (!isEmailVerified) {
                e.preventDefault();
                showError('emailError', '이메일 인증을 완료해주세요.');
            }
        });
    }
});

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

function showSuccess(elementId, message) {
    const successElement = document.getElementById(elementId);
    if (successElement) {
        successElement.textContent = message;
        successElement.style.display = 'block';
    }
} 