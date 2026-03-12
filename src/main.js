// Main Interactivity
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reservationForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('예약 문의가 접수되었습니다. 담당자가 곧 연락드리겠습니다.');
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
