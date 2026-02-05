// Comments and ratings system
const COMMENTS_STORAGE_KEY = 'emily_website_comments';

// Initialize comments storage if empty
if (!localStorage.getItem(COMMENTS_STORAGE_KEY)) {
    localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify({}));
}

// Get all comments
function getAllComments() {
    return JSON.parse(localStorage.getItem(COMMENTS_STORAGE_KEY));
}

// Save all comments
function saveAllComments(comments) {
    localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(comments));
}

// Add a comment to a specific page
function addComment(page, text, rating) {
    const comments = getAllComments();
    const user = getCurrentUser();
    
    if (!user) {
        alert('Для добавления комментария необходимо войти в систему');
        return false;
    }
    
    if (!comments[page]) {
        comments[page] = [];
    }
    
    const newComment = {
        id: Date.now(), // Simple ID generation
        username: user.username,
        text: text,
        rating: rating,
        timestamp: new Date().toISOString()
    };
    
    comments[page].unshift(newComment); // Add to beginning
    saveAllComments(comments);
    return true;
}

// Load comments for a specific page
function loadComments(page) {
    const comments = getAllComments();
    const container = document.getElementById('commentsContainer');
    const countElement = document.getElementById('commentCount');
    
    if (!container) return;
    
    if (!comments[page] || comments[page].length === 0) {
        container.innerHTML = '<p>Пока нет комментариев. Будьте первым, кто оставит комментарий!</p>';
        if (countElement) countElement.textContent = '0';
        return;
    }
    
    let commentsHtml = '';
    comments[page].forEach(comment => {
        const date = new Date(comment.timestamp);
        const formattedDate = date.toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        commentsHtml += `
        <div class="comment">
            <div class="comment-header">
                <span class="comment-author">${comment.username}</span>
                <span class="comment-rating">${renderStars(comment.rating)}</span>
            </div>
            <div class="comment-content">
                ${comment.text}
            </div>
            <div class="comment-date">
                ${formattedDate}
            </div>
        </div>`;
    });
    
    container.innerHTML = commentsHtml;
    if (countElement) countElement.textContent = comments[page].length;
}

// Render star rating
function renderStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += i <= rating ? '★' : '☆';
    }
    return `<span class="rating-stars">${stars}</span>`;
}

// Setup comment form for a specific page
function setupCommentForm(page) {
    const formSection = document.getElementById('commentFormSection');
    const user = getCurrentUser();
    
    if (!user) {
        // Hide comment form if not logged in
        if (formSection) {
            formSection.innerHTML = '<p>Для добавления комментариев и оценок <a href="auth/login.html">войдите в систему</a>.</p>';
        }
        return;
    }
    
    // If we have the form elements, set up the submission
    const commentText = document.getElementById('commentText');
    const submitBtn = document.getElementById('submitCommentBtn');
    
    if (submitBtn) {
        submitBtn.onclick = function() {
            const text = commentText.value.trim();
            const ratingInput = document.getElementById('ratingValue');
            const rating = ratingInput ? parseInt(ratingInput.value) : 0;
            
            if (!text) {
                alert('Пожалуйста, введите текст комментария');
                return;
            }
            
            if (rating <= 0) {
                alert('Пожалуйста, поставьте оценку');
                return;
            }
            
            if (addComment(page, text, rating)) {
                // Reset form and reload comments
                commentText.value = '';
                if (ratingInput) ratingInput.value = '0';
                document.getElementById('ratingDisplay').textContent = '☆☆☆☆☆';
                
                // Reload comments to show the new one
                loadComments(page);
                
                // Show success message
                const messageDiv = document.createElement('div');
                messageDiv.className = 'message success';
                messageDiv.textContent = 'Комментарий успешно добавлен!';
                formSection.parentNode.insertBefore(messageDiv, formSection.nextSibling);
                
                // Remove message after 3 seconds
                setTimeout(() => {
                    messageDiv.remove();
                }, 3000);
            }
        };
    }
}

// Setup star rating functionality
function setupRatingStars() {
    const starElements = document.querySelectorAll('.star-rating .star');
    const ratingDisplay = document.getElementById('ratingDisplay');
    const ratingInput = document.getElementById('ratingValue');
    
    if (!starElements || !ratingDisplay || !ratingInput) return;
    
    starElements.forEach(star => {
        // On hover, show the rating
        star.addEventListener('mouseover', () => {
            const value = parseInt(star.getAttribute('data-value'));
            updateStarDisplay(value, true);
        });
        
        // On click, set the rating
        star.addEventListener('click', () => {
            const value = parseInt(star.getAttribute('data-value'));
            ratingInput.value = value;
            updateStarDisplay(value, false);
        });
    });
    
    // Reset stars when mouse leaves the rating container
    const ratingContainer = document.querySelector('.rating-input');
    if (ratingContainer) {
        ratingContainer.addEventListener('mouseleave', () => {
            const currentValue = parseInt(ratingInput.value);
            if (currentValue > 0) {
                updateStarDisplay(currentValue, false);
            } else {
                updateStarDisplay(0, false);
            }
        });
    }
    
    function updateStarDisplay(value, isHover) {
        starElements.forEach((star, index) => {
            if (index < value) {
                star.textContent = '★';
            } else {
                star.textContent = isHover ? '☆' : '☆';
            }
        });
        
        // Update display
        let display = '';
        for (let i = 1; i <= 5; i++) {
            display += i <= value ? '★' : '☆';
        }
        ratingDisplay.textContent = display;
    }
}
