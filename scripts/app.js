// ============================================
// ПОЛНОЭКРАННОЕ ПОРТФОЛИО - КОМПОНЕНТНЫЙ ПОДХОД
// ============================================

(() => {
    'use strict';

    // ==========================================
    // ДАННЫЕ
    // ==========================================
    const DATA = {
        slides: [
            {
                id: 'hero',
                navLabel: 'Главная',
                render: renderHero,
            },
            {
                id: 'about',
                navLabel: 'Обо мне',
                render: renderAbout,
            },
            {
                id: 'works',
                navLabel: 'Мои работы',
                render: renderWorks,
            },
            {
                id: 'contacts',
                navLabel: 'Контакты',
                render: renderContacts,
            },
        ],

        typingRoles: [
            'Fullstack разработчик',
            'React / Node.js',
            'Python / Django',
            'DevOps инженер',
        ],

        skills: [
            { name: 'React / Next.js', percent: '95%' },
            { name: 'Node.js / Express', percent: '90%' },
            { name: 'Python / Django', percent: '88%' },
            { name: 'Docker / Kubernetes', percent: '82%' },
        ],

        projects: [
            {
                icon: 'fa-shopping-bag',
                tags: ['React', 'Node.js', 'Stripe'],
                title: 'E-commerce платформа',
                desc: 'Интернет-магазин с корзиной, оплатой и админ-панелью',
            },
            {
                icon: 'fa-chart-bar',
                tags: ['Python', 'FastAPI', 'Redis'],
                title: 'Аналитический дашборд',
                desc: 'Система сбора и визуализации метрик в реальном времени',
            },
            {
                icon: 'fa-tasks',
                tags: ['Vue.js', 'Django', 'PostgreSQL'],
                title: 'Таск-менеджер',
                desc: 'Канбан-доски, уведомления, ролевая модель доступа',
            },
            {
                icon: 'fa-server',
                tags: ['Go', 'gRPC', 'Kafka'],
                title: 'Микросервисы',
                desc: 'Высоконагруженная система обработки платежей',
            },
        ],

        socialLinks: [
            { icon: 'fa-linkedin-in', href: '#' },
            { icon: 'fa-telegram-plane', href: '#' },
            { icon: 'fa-github', href: '#' },
            { icon: 'fa-discord', href: '#' },
        ],

        contactItems: [
            { icon: 'fa-envelope', label: 'Email', value: 'kozlov.andrey@dev.ru', href: 'mailto:kozlov.andrey@dev.ru' },
            { icon: 'fa-telegram-plane', label: 'Telegram', value: '@andrey_kozlov', href: '#' },
            { icon: 'fa-github', label: 'GitHub', value: 'github.com/kozlov-dev', href: '#' },
        ],

        techIcons: ['fa-react', 'fa-node-js', 'fa-python', 'fa-docker', 'fa-database', 'fa-aws'],
    };

    // ==========================================
    // СОСТОЯНИЕ ПРИЛОЖЕНИЯ
    // ==========================================
    const state = {
        currentSlide: 0,
        isTransitioning: false,
        touchStartY: 0,
        touchDeltaY: 0,
        totalSlides: DATA.slides.length,
        typingInterval: null,
    };

    // ==========================================
    // DOM-ЭЛЕМЕНТЫ (создаются один раз)
    // ==========================================
    const app = document.getElementById('app');

    // ==========================================
    // ФУНКЦИИ РЕНДЕРИНГА КОМПОНЕНТОВ
    // ==========================================

    function renderHeader() {
        const header = document.createElement('header');
        header.className = 'header';
        header.id = 'header';

        const inner = document.createElement('div');
        inner.className = 'header-inner';

        // Логотип
        const logo = document.createElement('div');
        logo.className = 'logo';
        logo.innerHTML = `
            <span class="logo-text">Андрей Козлов</span>
            <span class="logo-dev">Fullstack Dev</span>
        `;
        logo.addEventListener('click', () => goToSlide(0));

        // Навигация
        const nav = document.createElement('nav');
        nav.className = 'main-nav';
        const ul = document.createElement('ul');
        ul.className = 'nav-list';

        DATA.slides.forEach((slide, index) => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.className = `nav-link${index === 0 ? ' active' : ''}`;
            a.textContent = slide.navLabel;
            a.href = `#${slide.id}`;
            a.setAttribute('data-slide', index);
            a.addEventListener('click', (e) => {
                e.preventDefault();
                goToSlide(index);
                closeMobileMenu();
            });
            li.appendChild(a);
            ul.appendChild(li);
        });

        nav.appendChild(ul);

        // Бургер
        const burger = document.createElement('button');
        burger.className = 'burger-menu';
        burger.id = 'burgerMenu';
        burger.setAttribute('aria-label', 'Меню');
        burger.innerHTML = `
            <span class="burger-line"></span>
            <span class="burger-line"></span>
            <span class="burger-line"></span>
        `;
        burger.addEventListener('click', toggleMobileMenu);

        inner.appendChild(logo);
        inner.appendChild(nav);
        inner.appendChild(burger);
        header.appendChild(inner);

        return header;
    }

    function renderDots() {
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slide-dots';
        dotsContainer.id = 'slideDots';

        DATA.slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = `dot${index === 0 ? ' active' : ''}`;
            dot.setAttribute('data-slide', index);
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        return dotsContainer;
    }

    function renderOrbs() {
        const fragment = document.createDocumentFragment();
        const orb1 = document.createElement('div');
        orb1.className = 'orb orb-1';
        const orb2 = document.createElement('div');
        orb2.className = 'orb orb-2';
        fragment.appendChild(orb1);
        fragment.appendChild(orb2);
        return fragment;
    }

    function renderSlideHint() {
        const hint = document.createElement('div');
        hint.className = 'slide-hint';
        hint.innerHTML = `
            <span>Листай вниз</span>
            <i class="fas fa-chevron-down"></i>
        `;
        return hint;
    }

    // ---------- СЛАЙД 1: HERO ----------
    function renderHero() {
        const slide = createSlideElement('slide-1', 'hero');

        const orbs = renderOrbs();
        slide.appendChild(orbs);

        const content = document.createElement('div');
        content.className = 'slide-content hero-content';

        content.innerHTML = `
            <p class="hero-subtitle">👋 Привет, я</p>
            <h1 class="hero-title">
                Андрей <span class="highlight">Козлов</span>
            </h1>
            <div class="typing-wrapper">
                <span class="typing-text" id="typingText"></span>
                <span class="typing-cursor">|</span>
            </div>
            <p class="hero-description">
                Создаю масштабируемые веб-приложения,<br>
                от архитектуры баз данных до анимации кнопок.
            </p>
            <button class="hero-btn" id="heroBtn">
                <span>Смотреть работы</span>
                <i class="fas fa-arrow-down"></i>
            </button>
            <div class="hero-tech-icons">
                ${DATA.techIcons.map(icon => `<i class="fab ${icon}"></i>`).join('')}
            </div>
        `;

        slide.appendChild(content);
        slide.appendChild(renderSlideHint());

        return slide;
    }

    // ---------- СЛАЙД 2: ABOUT ----------
    function renderAbout() {
        const slide = createSlideElement('slide-2', 'about');
        slide.appendChild(renderOrbs());

        const content = document.createElement('div');
        content.className = 'slide-content about-content';

        content.innerHTML = `
            <span class="section-badge">Обо мне</span>
            <h2 class="section-heading">Кто я и чем занимаюсь</h2>
            <div class="about-grid" id="aboutGrid"></div>
            <div class="skills-block" id="skillsBlock"></div>
        `;

        slide.appendChild(content);

        // Карточки "Обо мне"
        const aboutGrid = content.querySelector('#aboutGrid');
        const cards = [
            { icon: 'fa-code', title: 'Fullstack разработка', desc: 'Пишу чистый код на React, Vue, Node.js и Python. Создаю SPA, SSR и API.' },
            { icon: 'fa-cloud', title: 'DevOps & Cloud', desc: 'Docker, Kubernetes, CI/CD. Деплой на AWS, DigitalOcean, VPS.' },
            { icon: 'fa-database', title: 'Базы данных', desc: 'Проектирую PostgreSQL, MongoDB, Redis. Оптимизирую запросы.' },
        ];

        cards.forEach(card => {
            const cardEl = document.createElement('div');
            cardEl.className = 'about-card';
            cardEl.innerHTML = `
                <div class="about-card-icon"><i class="fas ${card.icon}"></i></div>
                <h3>${card.title}</h3>
                <p>${card.desc}</p>
            `;
            aboutGrid.appendChild(cardEl);
        });

        // Шкалы навыков
        const skillsBlock = content.querySelector('#skillsBlock');
        DATA.skills.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            skillItem.innerHTML = `
                <div class="skill-header">
                    <span>${skill.name}</span>
                    <span class="skill-percent">${skill.percent}</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-fill" data-width="${skill.percent}"></div>
                </div>
            `;
            skillsBlock.appendChild(skillItem);
        });

        return slide;
    }

    // ---------- СЛАЙД 3: WORKS ----------
    function renderWorks() {
        const slide = createSlideElement('slide-3', 'works');
        slide.appendChild(renderOrbs());

        const content = document.createElement('div');
        content.className = 'slide-content works-content';

        content.innerHTML = `
            <span class="section-badge">Мои работы</span>
            <h2 class="section-heading">Последние проекты</h2>
            <div class="works-grid" id="worksGrid"></div>
        `;

        slide.appendChild(content);

        const worksGrid = content.querySelector('#worksGrid');
        DATA.projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'work-card';
            card.innerHTML = `
                <div class="work-card-img">
                    <i class="fas ${project.icon}"></i>
                    <div class="work-overlay">
                        <a href="#" class="work-overlay-btn" onclick="event.preventDefault()">Смотреть</a>
                    </div>
                </div>
                <div class="work-card-body">
                    <div class="work-tags">
                        ${project.tags.map(tag => `<span class="work-tag">${tag}</span>`).join('')}
                    </div>
                    <h3>${project.title}</h3>
                    <p>${project.desc}</p>
                </div>
            `;
            worksGrid.appendChild(card);
        });

        return slide;
    }

    // ---------- СЛАЙД 4: CONTACTS ----------
    function renderContacts() {
        const slide = createSlideElement('slide-4', 'contacts');
        slide.appendChild(renderOrbs());

        const content = document.createElement('div');
        content.className = 'slide-content contacts-content';

        content.innerHTML = `
            <span class="section-badge">Контакты</span>
            <h2 class="section-heading">Свяжитесь со мной</h2>
            <div class="contacts-wrapper">
                <form class="contact-form" id="contactForm">
                    <div class="input-group">
                        <input type="text" id="name" required>
                        <label for="name">Ваше имя</label>
                    </div>
                    <div class="input-group">
                        <input type="email" id="email" required>
                        <label for="email">Email</label>
                    </div>
                    <div class="input-group">
                        <textarea id="message" rows="4" required></textarea>
                        <label for="message">Сообщение</label>
                    </div>
                    <button type="submit" class="submit-btn">
                        <span>Отправить</span>
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </form>
                <div class="contact-details" id="contactDetails"></div>
            </div>
        `;

        slide.appendChild(content);

        // Контактная информация
        const contactDetails = content.querySelector('#contactDetails');
        DATA.contactItems.forEach(item => {
            const contactCard = document.createElement('div');
            contactCard.className = 'contact-card';
            contactCard.innerHTML = `
                <div class="contact-icon-circle"><i class="fas ${item.icon}"></i></div>
                <div>
                    <span>${item.label}</span>
                    <a href="${item.href}">${item.value}</a>
                </div>
            `;
            contactDetails.appendChild(contactCard);
        });

        // Соцсети
        const socialDiv = document.createElement('div');
        socialDiv.className = 'social-links';
        DATA.socialLinks.forEach(link => {
            const a = document.createElement('a');
            a.href = link.href;
            a.innerHTML = `<i class="fab ${link.icon}"></i>`;
            socialDiv.appendChild(a);
        });
        contactDetails.appendChild(socialDiv);

        return slide;
    }

    // ==========================================
    // ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
    // ==========================================

    function createSlideElement(className, id) {
        const slide = document.createElement('section');
        slide.className = `slide ${className}`;
        slide.id = id;
        return slide;
    }

    // ==========================================
    // УПРАВЛЕНИЕ СЛАЙДАМИ
    // ==========================================

    function goToSlide(index) {
        if (state.isTransitioning) return;
        if (index < 0 || index >= state.totalSlides) return;
        if (index === state.currentSlide) return;

        state.isTransitioning = true;
        state.currentSlide = index;

        const container = document.getElementById('slidesContainer');
        if (container) {
            container.style.transform = `translateY(-${index * 100}%)`;
        }

        updateActiveIndicators();

        setTimeout(() => {
            state.isTransitioning = false;
            if (index === 1) animateSkillBars();
        }, 650);
    }

    function updateActiveIndicators() {
        // Навигация
        document.querySelectorAll('.nav-link').forEach((link, i) => {
            link.classList.toggle('active', i === state.currentSlide);
        });

        // Точки
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === state.currentSlide);
        });
    }

    function animateSkillBars() {
        const fills = document.querySelectorAll('.skill-fill');
        fills.forEach((fill, i) => {
            fill.style.width = '0';
            setTimeout(() => {
                fill.style.width = fill.getAttribute('data-width');
            }, i * 120);
        });
    }

    // ==========================================
    // МОБИЛЬНОЕ МЕНЮ
    // ==========================================

    function toggleMobileMenu() {
        const burger = document.getElementById('burgerMenu');
        const navList = document.querySelector('.nav-list');
        if (burger && navList) {
            burger.classList.toggle('active');
            navList.classList.toggle('active');
        }
    }

    function closeMobileMenu() {
        const burger = document.getElementById('burgerMenu');
        const navList = document.querySelector('.nav-list');
        if (burger) burger.classList.remove('active');
        if (navList) navList.classList.remove('active');
    }

    // ==========================================
    // ТАЙПИНГ-ЭФФЕКТ
    // ==========================================

    function startTypingAnimation() {
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingEl = document.getElementById('typingText');
        if (!typingEl) return;

        function tick() {
            const currentRole = DATA.typingRoles[roleIndex];
            if (!isDeleting) {
                typingEl.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                if (charIndex === currentRole.length) {
                    isDeleting = true;
                    state.typingInterval = setTimeout(tick, 1800);
                    return;
                }
            } else {
                typingEl.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                if (charIndex === 0) {
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % DATA.typingRoles.length;
                }
            }
            state.typingInterval = setTimeout(tick, isDeleting ? 40 : 90);
        }

        tick();
    }

    // ==========================================
    // ОБРАБОТЧИКИ СОБЫТИЙ
    // ==========================================

    function setupEventListeners() {
        // Колесо мыши
        window.addEventListener('wheel', (e) => {
            e.preventDefault();
            if (state.isTransitioning) return;
            if (e.deltaY > 15) goToSlide(state.currentSlide + 1);
            else if (e.deltaY < -15) goToSlide(state.currentSlide - 1);
        }, { passive: false });

        // Тач-события
        window.addEventListener('touchstart', (e) => {
            state.touchStartY = e.touches[0].clientY;
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
            state.touchDeltaY = e.touches[0].clientY - state.touchStartY;
        }, { passive: true });

        window.addEventListener('touchend', () => {
            if (state.isTransitioning) return;
            if (state.touchDeltaY < -40) goToSlide(state.currentSlide + 1);
            else if (state.touchDeltaY > 40) goToSlide(state.currentSlide - 1);
            state.touchDeltaY = 0;
        });

        // Клавиатура
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                goToSlide(state.currentSlide + 1);
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                goToSlide(state.currentSlide - 1);
            }
        });

        // Скролл хедера
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (header) {
                header.classList.toggle('scrolled', window.scrollY > 20);
            }
        });
    }

    function setupFormHandler() {
        // Делегирование события на весь app
        app.addEventListener('submit', (e) => {
            if (e.target.id === 'contactForm') {
                e.preventDefault();
                const btn = e.target.querySelector('.submit-btn');
                const originalHTML = btn.innerHTML;
                btn.innerHTML = '<span>Отправлено!</span><i class="fas fa-check"></i>';
                btn.classList.add('success');
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.classList.remove('success');
                    e.target.reset();
                }, 2000);
            }
        });

        // Кнопка "Смотреть работы"
        app.addEventListener('click', (e) => {
            if (e.target.closest('#heroBtn')) {
                goToSlide(2);
            }
        });
    }

    // ==========================================
    // ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ
    // ==========================================

    function init() {
        // Очищаем app
        app.innerHTML = '';

        // Рендерим хедер
        const header = renderHeader();
        app.appendChild(header);

        // Рендерим точки навигации
        const dots = renderDots();
        app.appendChild(dots);

        // Рендерим контейнер слайдов
        const slidesContainer = document.createElement('div');
        slidesContainer.className = 'slides-container';
        slidesContainer.id = 'slidesContainer';

        // Рендерим все слайды
        DATA.slides.forEach((slideDef) => {
            const slideElement = slideDef.render();
            slidesContainer.appendChild(slideElement);
        });

        app.appendChild(slidesContainer);

        // Начальная позиция
        slidesContainer.style.transform = 'translateY(0)';

        // Настраиваем обработчики
        setupEventListeners();
        setupFormHandler();

        // Запускаем анимацию печати
        startTypingAnimation();

        console.log('🚀 Портфолио Андрея Козлова загружено!');
    }

    // ==========================================
    // ЗАПУСК
    // ==========================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();