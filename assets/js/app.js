/**
 * app.js
 * Global logic shared across the application
 */

// Global state
const App = {
    currentUser: db.getCurrentUser(),

    init() {
        this.checkAuth();
        this.setupSidebar();
        this.updateProfile();
    },

    checkAuth() {
        // If we are NOT on index and NOT on login, and NO user -> redirect to index
        const path = window.location.pathname;
        const isPublic = path.endsWith('index.html') || path === '/' || path.endsWith('BookWroom/');

        if (!isPublic && !this.currentUser) {
            window.location.href = '../index.html';
        }
    },

    setupSidebar() {
        const toggleBtn = document.getElementById('sidebarToggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                const sidebar = document.querySelector('.sidebar');
                if (sidebar) sidebar.classList.toggle('open');
            });
        }

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            const sidebar = document.querySelector('.sidebar');
            const toggle = document.getElementById('sidebarToggle');
            if (window.innerWidth <= 768 && sidebar && sidebar.classList.contains('open')) {
                if (!sidebar.contains(e.target) && e.target !== toggle && (!toggle || !toggle.contains(e.target))) {
                    sidebar.classList.remove('open');
                }
            }
        });

        // Logout
        const logoutLinks = document.querySelectorAll('a[onclick="handleLogout()"]');
        logoutLinks.forEach(link => {
            // keep inline, add robust listener too
            link.addEventListener('click', (e) => {
                e.preventDefault();
                handleLogout();
            });
        });
    },

    updateProfile() {
        const nameEls = document.querySelectorAll('.user-name-display');
        const roleEls = document.querySelectorAll('.user-role-display');
        const avatarEls = document.querySelectorAll('.user-avatar-display');

        if (this.currentUser) {
            nameEls.forEach(el => el.textContent = this.currentUser.name);
            roleEls.forEach(el => el.textContent = this.currentUser.role.toUpperCase());
            avatarEls.forEach(el => el.textContent = this.currentUser.avatar);
        }
    },

    formatDate(dateStr) {
        if (!dateStr) return 'N/A';
        return new Date(dateStr).toLocaleDateString();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
