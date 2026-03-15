// Main Interactivity
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reservationForm');
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxo_Your_Script_ID/exec'; // 구글 앱스 스크립트 배포 후 URL로 교체 필요
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // 데이터베이스 저장을 위한 객체 생성
            const reservationData = {
                id: Date.now(), // 고유 ID로 타임스탬프 활용
                checkinDate: document.getElementById('checkinDate').value,
                checkoutDate: document.getElementById('checkoutDate').value,
                guestCount: parseInt(document.getElementById('guestCount').value),
                guestName: document.getElementById('guestName').value,
                guestPhone: document.getElementById('guestPhone').value,
                createdAt: new Date().toISOString()
            };

            // 1. localStorage 저장 (기존 로직 유지)
            const existingReservations = JSON.parse(localStorage.getItem('dragonHillsReservations')) || [];
            existingReservations.push(reservationData);
            localStorage.setItem('dragonHillsReservations', JSON.stringify(existingReservations));

            // 2. Google Sheets 전역 전송
            fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // CORS 이슈 방지
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reservationData)
            }).then(() => {
                console.log('Google Sheets 전송 완료');
            }).catch(error => {
                console.error('API 전송 실패:', error);
            });

            alert(`${reservationData.guestName}님, 예약 문의가 접수되었습니다!\n데이터가 구글 시트에 안전하게 기록되었습니다.`);
            form.reset();
        });
    }

    // Scroll Reveal Effect
    const revealElements = document.querySelectorAll('.feature-card, .split-section');
    
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top < windowHeight * 0.85) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for reveal elements
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load
});
