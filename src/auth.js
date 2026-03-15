// Auth Logic (Login/Signup/Logout)
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            // 관리자 계정 테스트용 (실제 구현 시 API 연동 필요)
            if (email === 'master@dragoncc.com' && password === 'dhills7788') {
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('userRole', 'admin');
                alert('관리자 계정으로 로그인되었습니다.');
                window.location.href = 'dashboard.html';
            } else {
                // 일반 사용자 로그인 시뮬레이션
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('userRole', 'user');
                alert('로그인되었습니다!');
                window.location.href = 'index.html';
            }
        });
    }

    // 로그아웃 처리 유틸리티 (필요 시 호출)
    window.logout = () => {
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('userRole');
        window.location.href = 'index.html';
    };
});
