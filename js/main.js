// Улучшенные интерактивные элементы для сайта

document.addEventListener('DOMContentLoaded', function() {
    // Анимация для карточек при наведении
    const cards = document.querySelectorAll('.highlight-card, .blog-post, .poetry-item, .book-item, .project-item, .contact-method, .activity-item, .comment');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Плавные переходы для кнопок
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Улучшенная навигация
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.2s ease';
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Обновление статуса аутентификации
    updateAuthStatus();
});

// Функция обновления статуса аутентификации (расширена)
function updateAuthStatus() {
    const authStatus = document.getElementById('authStatus');
    const userNameDisplay = document.getElementById('userNameDisplay');
    const authLink = document.getElementById('authLink');
    
    if (authStatus) {
        const currentUser = getCurrentUser();
        
        if (currentUser) {
            userNameDisplay.textContent = currentUser.username;
            authLink.textContent = 'Выйти';
            authLink.href = '#';
            authLink.onclick = function(e) {
                e.preventDefault();
                logout();
            };
        } else {
            userNameDisplay.textContent = 'Гость';
            authLink.textContent = 'Войти';
            authLink.href = 'auth/login.html';
        }
    }
}

// Функции из других файлов
function getCurrentUser() {
    const user = localStorage.getItem('emily_website_current_user');
    return user ? JSON.parse(user) : null;
}

function logout() {
    localStorage.setItem('emily_website_current_user', JSON.stringify(null));
    window.location.href = 'index.html';
}
