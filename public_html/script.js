document.addEventListener('DOMContentLoaded', () => {
    
    // بخش ۱: انیمیشن برای کارت‌های محصولات
    const productCards = document.querySelectorAll('.product-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    productCards.forEach(card => observer.observe(card));

    // بخش ۲: راه‌اندازی اسلایدر افقی برای نظرات
    const swiper = new Swiper('.testimonials-slider', {
        direction: 'horizontal',
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        slidesPerView: 1,
        spaceBetween: 30,
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 40
            }
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // **جدید:** بخش ۳: نمایش ساعت و تاریخ زنده تهران
    const dateElement = document.getElementById('live-date');
    const timeElement = document.getElementById('live-time');

    const dayNames = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
    const monthNames = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

    function updateTehranTime() {
        const now = new Date();

        // دریافت ساعت به وقت تهران
        const timeString = now.toLocaleTimeString('fa-IR', {
            timeZone: 'Asia/Tehran',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        // تبدیل تاریخ میلادی به شمسی
        const gYear = now.getFullYear();
        const gMonth = now.getMonth() + 1;
        const gDay = now.getDate();
        const jDate = jalaali.toJalaali(gYear, gMonth, gDay);
        
        // دریافت روز هفته
        const dayOfWeek = dayNames[now.getDay()];

        const dateString = `${dayOfWeek}، ${jDate.jd} ${monthNames[jDate.jm - 1]} ${jDate.jy}`;

        // نمایش در صفحه
        dateElement.innerText = dateString;
        timeElement.innerText = timeString;
    }

    // هر ثانیه تابع را اجرا کن
    setInterval(updateTehranTime, 1000);

    // برای نمایش اولیه بدون تاخیر
    updateTehranTime();
});