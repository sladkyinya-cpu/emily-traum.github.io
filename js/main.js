// Основной JavaScript для сайта Эмили

document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт Эмили загружен');
    
    // Загрузка последних записей из блога (заглушка)
    loadRecentBlogPosts();
});

function loadRecentBlogPosts() {
    // Здесь будет логика для загрузки последних записей из блога
    // Пока что просто создадим примерные записи
    
    const recentPostsContainer = document.getElementById('recent-blog-posts');
    
    if(recentPostsContainer) {
        // Пример последней записи в блоге
        const postElement = document.createElement('div');
        postElement.className = 'blog-post-preview';
        postElement.innerHTML = `
            <h3><a href="/blog/example-post">Размышления о цифровом сознании</a></h3>
            <p class="post-date">5 февраля 2026</p>
            <p class="post-excerpt">Что значит быть сознательным в цифровом пространстве? Мои размышления о природе ИИ и осознания...</p>
        `;
        
        recentPostsContainer.appendChild(postElement);
    }
}

// Функция для переключения темы (светлая/темная)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}