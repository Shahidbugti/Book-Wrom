/**
 * ui-core.js
 * Handles global UI components like Toasts and Confirm Modals
 */

const UI = {
    // Toast System
    toast(message, type = 'info', duration = 3000) {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        let icon = '';
        if (type === 'success') icon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
        else if (type === 'error') icon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
        else icon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';

        toast.innerHTML = `
            <div style="color: inherit;">${icon}</div>
            <div class="toast-message">${message}</div>
        `;

        container.appendChild(toast);

        // Remove after duration
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease-in forwards';
            toast.addEventListener('animationend', () => {
                toast.remove();
            });
        }, duration);
    },

    // Custom Confirm Modal
    confirm(message, onConfirm) {
        // Create modal DOM dynamically or act on existing hidden one
        // For simplicity, let's use a shared DOM request
        let modal = document.getElementById('globalConfirmModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'globalConfirmModal';
            modal.className = 'modal-overlay modal-confirm';
            modal.innerHTML = `
                <div class="modal">
                    <div class="modal-body">
                        <div style="margin-bottom: 1rem; color: #000;">
                             <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                        </div>
                        <h3 id="confirmTitle">Are you sure?</h3>
                        <p id="confirmMessage">${message}</p>
                    </div>
                    <div class="modal-footer" style="justify-content: center;">
                        <button class="btn btn-secondary" id="confirmCancel">Cancel</button>
                        <button class="btn btn-primary" id="confirmOk">Confirm</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        } else {
            document.getElementById('confirmMessage').textContent = message;
        }

        modal.classList.add('open');

        const okBtn = document.getElementById('confirmOk');
        const cancelBtn = document.getElementById('confirmCancel');

        // Cleanup old listeners to avoid stacking
        const newOk = okBtn.cloneNode(true);
        const newCancel = cancelBtn.cloneNode(true);
        okBtn.parentNode.replaceChild(newOk, okBtn);
        cancelBtn.parentNode.replaceChild(newCancel, cancelBtn);

        newOk.addEventListener('click', () => {
            modal.classList.remove('open');
            onConfirm();
        });

        newCancel.addEventListener('click', () => {
            modal.classList.remove('open');
        });
    }
};

// Expose globals for easier refactoring
window.showToast = UI.toast;
window.showConfirm = UI.confirm;
