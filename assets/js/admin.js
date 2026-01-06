/**
 * admin.js
 * Logic for Admin Dashboard and Management
 */


const Admin = {
    currentTab: 'borrowed',

    init() {
        // Dashboard Init
        if (document.getElementById('dashboardTableBody')) {
            this.switchTab('borrowed');
            this.setupDashboardEvents();
        }
    },

    setupDashboardEvents() {
        const search = document.getElementById('dashboardSearch');
        if (search) {
            search.addEventListener('input', (e) => {
                const term = e.target.value;
                if (this.currentTab === 'borrowed') this.renderBorrowedBooks(term);
                else this.renderOverdueBorrowers(term);
            });
        }
    },

    switchTab(tab) {
        this.currentTab = tab;

        // Update Buttons
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        if (tab === 'borrowed') document.getElementById('tabBorrowed').classList.add('active');
        else document.getElementById('tabOverdue').classList.add('active');

        // Render
        if (tab === 'borrowed') {
            this.renderBorrowedBooks();
        } else {
            this.renderOverdueBorrowers();
        }
    },

    renderBorrowedBooks(searchTerm = '') {
        const tbody = document.getElementById('dashboardTableBody');
        if (!tbody) return;

        const transactions = db.getTransactions().filter(t => t.status === 'Active' || t.status === 'Borrowed');
        const books = db.getBooks();
        const users = db.getUsers();

        // Filter by Search (ID)
        const data = transactions.filter(t => t.id.toString().includes(searchTerm) || t.userId.toString().includes(searchTerm));

        tbody.innerHTML = data.map(t => {
            const book = books.find(b => b.id === t.bookId) || { title: 'Unknown' };
            const user = users.find(u => u.id === t.userId) || { name: 'Unknown' };

            // Format Dates
            const issueDate = new Date(t.issueDate).toLocaleString();
            const dueDate = t.dueDate;

            return `
                <tr>
                    <td>${String(t.id).padStart(3, '0')}</td>
                    <td>${t.userId}</td>
                    <td>001 Books</td> <!-- Mocking amount since transaction is 1 book usually -->
                    <td>${dueDate}</td>
                    <td>${issueDate}</td>
                    <td>
                        <button class="action-icon-btn" onclick="adminReturnBook(${t.id}, ${t.userId})" title="Mark returned">
                             <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/> <!-- Checkmark for return -->
                            </svg>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    },

    renderOverdueBorrowers(searchTerm = '') {
        const tbody = document.getElementById('dashboardTableBody');
        if (!tbody) return;

        const transactions = db.getTransactions().filter(t => {
            const isOverdue = new Date(t.dueDate) < new Date() && t.status !== 'Returned';
            return isOverdue;
        });

        // Filter
        const data = transactions.filter(t => t.id.toString().includes(searchTerm) || t.userId.toString().includes(searchTerm));

        tbody.innerHTML = data.map(t => {
            const issueDate = new Date(t.issueDate).toLocaleString();

            return `
                <tr>
                    <td>${String(t.id).padStart(3, '0')}</td>
                    <td>${t.userId}</td>
                    <td style="color: red;">Overdue</td>
                    <td>${t.dueDate}</td>
                    <td>${issueDate}</td>
                    <td>
                        <button class="action-icon-btn" title="Notify">
                             <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
                            </svg>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    },

    // BOOKS MANAGEMENT
    renderBooks(searchTerm = '') {
        const tbody = document.getElementById('booksTableBody');
        if (!tbody) return;

        const books = db.getBooks();
        const filtered = books.filter(b =>
            b.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        tbody.innerHTML = filtered.map(b => `
            <tr>
                <td style="color: #666;">${b.id}</td>
                <td style="font-weight: 500;">${b.title}</td>
                <td>${b.category}</td> <!-- Type -->
                <td>English</td> <!-- Static Language mocked -->
                <td>${b.status}</td>
                <td>
                    <button class="action-icon-btn" onclick="openBookModal(${b.id})" title="Edit book">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                    </button>
                    <button class="action-icon-btn" onclick="deleteBook(${b.id})" title="Delete book">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                    </button>
                     <button class="action-icon-btn" onclick="viewBook(${b.id})" title="View details">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                    </button>
                </td>
            </tr>
        `).join('');
    },

    setupBookEvents() {
        const searchInput = document.getElementById('bookSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.renderBooks(e.target.value);
            });
        }

        const bookForm = document.getElementById('bookForm');
        if (bookForm) {
            bookForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleBookSubmit();
            });
        }
    },

    handleBookSubmit() {
        // Updated for new modal fields
        const id = document.getElementById('bookId').value;
        const title = document.getElementById('bookTitle').value;
        const language = document.getElementById('bookLanguage').value;
        const type = document.getElementById('bookType').value;
        const quantity = parseInt(document.getElementById('bookQuantity').value);

        // Map to DB structure (filling gaps)
        const bookData = {
            title,
            category: type, // Map type to category
            author: 'Unknown', // Not in new modal, default
            isbn: '000-000', // Default
            location: 'General',
            copies: quantity,
            added: new Date().toISOString().split('T')[0]
        };

        if (id) {
            const existing = db.getBooks().find(b => b.id == id);
            const updated = { ...existing, ...bookData };
            // Update status
            if (updated.copies > 0) updated.status = 'Available';
            else updated.status = 'Borrowed'; // or Out of Stock

            db.updateBook(updated);
        } else {
            db.addBook(bookData);
        }

        closeBookModal();
        this.renderBooks();
    },

    // USER MANAGEMENT
    renderUsers() {
        const tbody = document.getElementById('usersTableBody');
        if (!tbody) return;

        const users = db.getUsers().filter(u => u.role === 'user');

        // Needed columns: ID, Name, Email, Username, Action
        tbody.innerHTML = users.map(u => `
            <tr>
                <td>${u.id}</td>
                <td>${u.name}</td>
                <td>${u.email}</td>
                <td>${u.email.split('@')[0]}</td> <!-- Username mock -->
                <td>
                    <button class="action-icon-btn" onclick="viewUserTransactions(${u.id})">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                    </button>
                    <button class="action-icon-btn">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                    </button>
                </td>
            </tr>
        `).join('');
    },

    // ... Helper functions (transactions) ...
    renderUserTransactions(userId) {
        // Kept for modal usage
        const container = document.getElementById('userActiveBooks');
        if (!container) return;

        const transactions = db.getTransactions().filter(t => t.userId === userId && (t.status === 'Active' || t.status === 'Reserved'));
        const books = db.getBooks();

        if (transactions.length === 0) {
            container.innerHTML = '<p class="text-muted text-center">No active loans or reservations.</p>';
            return;
        }

        container.innerHTML = `<table class="table">
            <thead>
                <tr>
                    <th>Book</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                ${transactions.map(t => {
            const book = books.find(b => b.id === t.bookId) || {};
            return `
                        <tr>
                            <td>${book.title}</td>
                            <td><span class="badge ${t.status === 'Reserved' ? 'badge-info' : 'badge-warning'}">${t.status}</span></td>
                            <td>
                                <button class="btn btn-primary" onclick="adminReturnBook(${t.id}, ${userId})" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;">
                                    ${t.status === 'Reserved' ? 'Mark Issued' : 'Mark Returned'}
                                </button>
                            </td>
                        </tr>
                    `;
        }).join('')}
            </tbody>
        </table>`;
    }
};

// Global Helpers (Win)
window.openBookModal = function (bookId = null) {
    const modal = document.getElementById('bookModal');
    const title = document.getElementById('modalTitle');
    const form = document.getElementById('bookForm');

    modal.classList.add('open');

    if (bookId) {
        title.textContent = 'Update Book';
        const book = db.getBooks().find(b => b.id === bookId);
        if (book) {
            document.getElementById('bookId').value = book.id;
            // Populate new fields logic
            // Note: form IDs in book.html need to match what we assume here.
            // I'll update book.html to match these IDs: bookTitle, bookLanguage, bookType, bookQuantity
            if (document.getElementById('bookTitle')) document.getElementById('bookTitle').value = book.title;
            if (document.getElementById('bookType')) document.getElementById('bookType').value = book.category;
            if (document.getElementById('bookLanguage')) document.getElementById('bookLanguage').value = 'English';
            if (document.getElementById('bookQuantity')) document.getElementById('bookQuantity').value = book.copies;
        }
    } else {
        title.textContent = 'Add Book';
        form.reset();
        document.getElementById('bookId').value = '';
    }
};

window.closeBookModal = function () {
    const modal = document.getElementById('bookModal');
    modal.classList.remove('open');
};

window.deleteBook = function (id) {
    // Constraint: Check active transactions
    const transactions = db.getTransactions();
    const active = transactions.some(t => t.bookId === id && (t.status === 'Active' || t.status === 'Reserved'));

    if (active) {
        showToast('Cannot delete book with active transactions.', 'error');
        return;
    }

    showConfirm('Are you sure you want to delete this book?', () => {
        db.deleteBook(id);
        Admin.renderBooks();
        showToast('Book deleted successfully', 'success');
    });
};

window.viewUserTransactions = function (userId) {
    const modal = document.getElementById('userModal');
    if (modal) {
        modal.classList.add('open');
        Admin.renderUserTransactions(userId);
    }
}

window.closeUserModal = function () {
    const modal = document.getElementById('userModal');
    if (modal) modal.classList.remove('open');
}

window.adminReturnBook = function (transId, userId) {
    let transactions = db.getTransactions();
    let trans = transactions.find(t => t.id === transId);

    if (trans) {
        if (trans.status === 'Reserved') {
            showConfirm('Confirm issuing this book?', () => {
                trans.status = 'Active';
                trans.issueDate = new Date().toISOString().split('T')[0];
                localStorage.setItem('lss_transactions', JSON.stringify(transactions));

                showToast('Book issued successfully', 'success');
                if (Admin.currentTab === 'borrowed') Admin.renderBorrowedBooks();
                if (document.getElementById('userModal')?.classList.contains('open')) Admin.renderUserTransactions(userId);
            });
        } else {
            showConfirm('Confirm receiving this book?', () => {
                trans.status = 'Returned';
                trans.returnDate = new Date().toISOString().split('T')[0];

                const books = db.getBooks();
                const book = books.find(b => b.id === trans.bookId);
                if (book) {
                    book.status = 'Available';
                    book.copies++;
                    db.updateBook(book);
                }
                localStorage.setItem('lss_transactions', JSON.stringify(transactions));

                showToast('Book marked as returned', 'success');
                if (Admin.currentTab === 'borrowed') Admin.renderBorrowedBooks();
                if (document.getElementById('userModal')?.classList.contains('open')) Admin.renderUserTransactions(userId);
            });
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('/admin/')) {
        Admin.init();

        if (window.location.pathname.includes('books.html')) {
            Admin.renderBooks();
            Admin.setupBookEvents();
        }
        if (window.location.pathname.includes('users.html')) {
            Admin.renderUsers();
        }
    }
});
