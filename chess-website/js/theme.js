// Theme Toggle Functionality
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('themeIcon');
    const themeToggle = document.getElementById('themeToggle');
    
    if (!themeIcon || !themeToggle) return;
    
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        themeIcon.textContent = '🌙';
        themeToggle.classList.remove('btn-outline-dark');
        themeToggle.classList.add('btn-outline-light');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-theme');
        themeIcon.textContent = '☀️';
        themeToggle.classList.remove('btn-outline-light');
        themeToggle.classList.add('btn-outline-dark');
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.getElementById('themeIcon');
    const themeToggle = document.getElementById('themeToggle');
    
    if (!themeIcon || !themeToggle) return;
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.textContent = '☀️';
        themeToggle.classList.remove('btn-outline-light');
        themeToggle.classList.add('btn-outline-dark');
    } else {
        themeIcon.textContent = '🌙';
        themeToggle.classList.remove('btn-outline-dark');
        themeToggle.classList.add('btn-outline-light');
    }
});
