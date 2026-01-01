/* === Функціонал Меню === */

// Функція для відкриття/закриття
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");

    // Використовуємо класи для керування станом, а CSS зробить анімацію
    if (sidebar.classList.contains("active")) {
         sidebar.style.width = "300px"; // Трохи ширше меню
    } else {
         sidebar.style.width = "0";
    }
}

// Закриття при кліку поза меню
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById("sidebar");
    const menuBtnContainer = document.querySelector('.menu-btn-container');
    
    // Перевіряємо, чи клік був не по меню і не по кнопці
    if (sidebar.classList.contains('active') && 
        !sidebar.contains(event.target) && 
        !menuBtnContainer.contains(event.target)) {
        toggleSidebar();
    }
});


/* === Перемикання вкладок === */
function openTab(tabId) {
    // 1. Знаходимо поточну активну вкладку
    const currentActive = document.querySelector(".tab-content.active");
    const newActive = document.getElementById(tabId);

    // Якщо ми вже на цій вкладці, нічого не робимо
    if (currentActive === newActive) {
        toggleSidebar();
        return;
    }

    // 2. Прибираємо клас active з поточної
    if (currentActive) {
        currentActive.classList.remove("active");
    }
    
    // 3. Додаємо клас active новій (CSS запустить анімацію)
    newActive.classList.add("active");

    // 4. Закриваємо меню
    toggleSidebar(); 
}


/* === Ініціалізація Слайдера === */
document.addEventListener('DOMContentLoaded', function() {
    var swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        loop: true,
        speed: 1000, // Швидкість перемикання слайдів (плавніше)
        
        coverflowEffect: {
            rotate: 20, // Менший кут повороту для сучаснішого вигляду
            stretch: 0,
            depth: 150,
            modifier: 1,
            slideShadows: true,
        },
        
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true, // Пауза при наведенні мишки
        },
        
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
});

/* === Ініціалізація ДРУГОГО Слайдера === */
var swiper2 = new Swiper(".secondSwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    speed: 1000, // Така ж плавна швидкість
    
    coverflowEffect: {
        rotate: 20,
        stretch: 0,
        depth: 150,
        modifier: 1,
        slideShadows: true,
    },
    
    // Можна налаштувати іншу швидкість автопрокрутки, щоб вони не рухались синхронно
    autoplay: {
        delay: 4000, // Трохи повільніше ніж перший
        disableOnInteraction: false,
    },
    
    pagination: {
        el: ".secondSwiper .swiper-pagination", // Уточнюємо, що пагінація саме для цього слайдера
        clickable: true,
    },
});

/* === ФУНКЦІОНАЛ ЛАЙТБОКСУ (Відкриття фото) === */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
// Знаходимо всі картинки всередині блоку з колажем
const galleryImages = document.querySelectorAll(".masonry-collage img");

// Додаємо подію кліку на кожне фото
galleryImages.forEach(img => {
    img.addEventListener("click", function() {
        // 1. Показуємо лайтбокс (display: flex для центрування)
        lightbox.style.display = "flex";
        
        // 2. Робимо невелику затримку для анімації opacity
        setTimeout(() => {
            lightbox.classList.add("show");
        }, 10);

        // 3. Підставляємо шлях (src) з клікнутого фото у велике фото
        lightboxImg.src = this.src;
    });
});

// Функція закриття
function closeLightbox() {
    lightbox.classList.remove("show");
    
    // Чекаємо поки пройде анімація зникнення (0.3с), потім ховаємо блок
    setTimeout(() => {
        lightbox.style.display = "none";
    }, 300);
}

// Закриття клавішею Escape (для зручності на ПК)
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeLightbox();
    }
});

/* === ГЕНЕРАТОР СНІГУ === */

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.textContent = '❄'; 
    
    // 1. Позиція
    snowflake.style.left = Math.random() * 100 + 'vw';
    
    // 2. Швидкість падіння (3 - 8 секунд)
    const duration = Math.random() * 5 + 10;
    snowflake.style.animationDuration = duration + 's';
    
    // 3. Початкова прозорість (0.3 - 0.8)
    const initialOpacity = Math.random() * 0.5 + 0.2;
    snowflake.style.opacity = initialOpacity;
    
    // 4. Розмір
    const size = Math.random() * 15 + 10 + 'px';
    snowflake.style.fontSize = size;

    document.body.appendChild(snowflake);

    // === ЛОГІКА РАНДОМНОГО ЗНИКНЕННЯ (ТАНЕННЯ) ===
    // Випадковий час, коли сніжинка почне зникати
    // Ми беремо час в межах від 0 до тривалості падіння
    const meltTime = Math.random() * (duration * 1000);

    setTimeout(() => {
        // Змінюємо прозорість на 0 (CSS transition зробить це плавно)
        snowflake.style.opacity = "0";
    }, meltTime);

    // Видаляємо елемент після завершення анімації
    setTimeout(() => {
        snowflake.remove();
    }, duration * 1000);
}

setInterval(createSnowflake, 100);