/**
 * auth.js
 * Handles login and session management
 */

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    // Check if user is already logged in
    const currentUser = db.getCurrentUser();
    if (currentUser) {
        // Redirect based on role if trying to access login page
        if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('BookWroom/')) {
            redirectUser(currentUser);
        }
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            // validation visual reset
            emailInput.style.borderColor = 'var(--border-color)';
            passwordInput.style.borderColor = 'var(--border-color)';

            if (!email || !password) {
                showToast('Please fill in all fields', 'error');
                if (!email) emailInput.style.borderColor = 'var(--danger-color)';
                if (!password) passwordInput.style.borderColor = 'var(--danger-color)';
                return;
            }

            const result = db.login(email, password);

            if (result.success) {
                showToast('Login successful! Redirecting...', 'success');
                setTimeout(() => {
                    redirectUser(result.user);
                }, 800);
            } else {
                showToast(result.message, 'error');
                loginForm.classList.add('shake');
                setTimeout(() => loginForm.classList.remove('shake'), 500);
            }
        });
    }
});

function redirectUser(user) {
    if (user.role === 'admin') {
        window.location.href = 'admin/dashboard.html';
    } else {
        window.location.href = 'user/dashboard.html';
    }
}

function handleLogout() {
    showConfirm('Are you sure you want to logout?', () => {
        db.logout();
        window.location.href = '../index.html';
    });
}
window.handleLogout = handleLogout;
