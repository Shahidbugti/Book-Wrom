/**
 * user.js
 * Logic for Student/Faculty Dashboard and Search
 */

const User = {
    init() {
        this.renderDashboard();
        this.renderReservations();
        this.setupSearch();
        this.handleHashChange();
        window.addEventListener('hashchange', () => this.handleHashChange());
    },

    handleHashChange() {
        if (window.location.hash === '#borrowed') {
            const borrowedSection = document.getElementById('borrowed');
            if (borrowedSection) {
                borrowedSection.style.display = 'block';
                borrowedSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    },
    
    renderReservations() {
        if (!document.getElementById('reservationsTableBody')) return;
        const currentUser = db.getCurrentUser();
        const transactions = db.getTransactions().filter(t => t.userId === currentUser.id && (t.status === 'Active' || t.status === 'Reserved'));
        const books = db.getBooks();
        const tbody = document.getElementById('reservationsTableBody');
        if (transactions.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted">No reservations or active loans</td></tr>`;
            return;
        }
        tbody.innerHTML = transactions.map(t => {
            const book = books.find(b => b.id === t.bookId) || {};
            const actionCell = t.status === 'Reserved' 
                ? `<button class="btn btn-danger" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;" onclick="cancelReservation(${t.id})" title="Cancel reservation">Cancel</button>`
                : `<span class="text-muted" style="font-size:0.8rem;">Issued</span>`;
            return `
                <tr>
                    <td>${String(t.id).padStart(3,'0')}</td>
                    <td>
                        <div style="font-weight:600;">${book.title || 'Unknown'}</div>
                        <div class="text-muted" style="font-size:0.75rem;">${book.author || ''}</div>
                    </td>
                    <td><span class="badge ${t.status === 'Reserved' ? 'badge-warning' : 'badge-success'}">${t.status}</span></td>
                    <td>${t.dueDate || '-'}</td>
                    <td>${actionCell}</td>
                </tr>
            `;
        }).join('');
    },

    renderDashboard() {
        if (!document.getElementById('statBorrowed')) return; // Not on dashboard

        const currentUser = db.getCurrentUser();
        const transactions = db.getTransactions().filter(t => t.userId === currentUser.id);
        const books = db.getBooks();

        const activeTransactions = transactions.filter(t => t.status === 'Active' || t.status === 'Reserved');

        // Stats
        document.getElementById('statBorrowed').textContent = activeTransactions.filter(t => t.status === 'Active').length;
        document.getElementById('statReserved').textContent = activeTransactions.filter(t => t.status === 'Reserved').length;

        // Due logic (simple mock)
        const dueCount = activeTransactions.filter(t => {
            if (!t.dueDate) return false;
            return new Date(t.dueDate) < new Date(new Date().setDate(new Date().getDate() + 3));
        }).length;
        document.getElementById('statDue').textContent = dueCount;

        // Table
        const tbody = document.getElementById('userBooksTable');
        const noBooksMsg = document.getElementById('noBooksMessage');

        if (activeTransactions.length === 0) {
            tbody.parentElement.classList.add('hidden');
            noBooksMsg.classList.remove('hidden');
        } else {
            tbody.parentElement.classList.remove('hidden');
            noBooksMsg.classList.add('hidden');

            tbody.innerHTML = activeTransactions.map(t => {
                const book = books.find(b => b.id === t.bookId);
                return `
                    <tr>
                        <td>
                            <div style="font-weight: 600;">${book.title}</div>
                            <div class="text-muted" style="font-size: 0.75rem;">${book.author}</div>
                        </td>
                        <td>${t.issueDate || '-'}</td>
                        <td>${t.dueDate || '-'}</td>
                        <td><span class="badge ${t.status === 'Active' ? 'badge-success' : 'badge-warning'}">${t.status}</span></td>
                        <td>
                            ${t.status === 'Reserved' ? `<button class="btn btn-danger" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;" onclick="cancelReservation(${t.id})">Cancel</button>` : '-'}
                        </td>
                    </tr>
                `;
            }).join('');
        }
    },

    setupSearch() {
        const searchInput = document.getElementById('globalSearch') || document.getElementById('searchInput');
        if (searchInput) {
            this.renderSearchResults(''); // Initial render

            searchInput.addEventListener('input', (e) => {
                this.renderSearchResults(e.target.value);
            });
            const subjectFilterEl = document.getElementById('filterSubject');
            const availabilityEl = document.getElementById('filterAvailability');
            if (subjectFilterEl) {
                subjectFilterEl.addEventListener('change', () => {
                    this.renderSearchResults(searchInput.value || '');
                });
            }
            if (availabilityEl) {
                availabilityEl.addEventListener('change', () => {
                    this.renderSearchResults(searchInput.value || '');
                });
            }
        }
    },

    renderSearchResults(term) {
        const container = document.getElementById('bookResults') || document.getElementById('searchResults');
        if (!container) return;

        const books = db.getBooks();
        const currentUser = db.getCurrentUser();

        const subjectFilterEl = document.getElementById('filterSubject');
        const availabilityEl = document.getElementById('filterAvailability');
        const subjectFilter = subjectFilterEl ? subjectFilterEl.value : '';
        const availabilityFilter = availabilityEl ? availabilityEl.value : '';

        // Filter
        let filtered = books.filter(b =>
            b.title.toLowerCase().includes(term.toLowerCase()) ||
            b.author.toLowerCase().includes(term.toLowerCase()) ||
            b.category.toLowerCase().includes(term.toLowerCase())
        );

        if (subjectFilter) {
            filtered = filtered.filter(b => b.category.toLowerCase() === subjectFilter.toLowerCase());
        }
        if (availabilityFilter) {
            filtered = filtered.filter(b => b.status === availabilityFilter);
        }

        if (filtered.length === 0) {
            container.innerHTML = `<div class="col-span-full text-center py-8 text-muted">No books found matching "${term}"</div>`;
            return;
        }

        container.innerHTML = filtered.map(b => {
            const isAvailable = b.status === 'Available';
            return `
                <div class="card" style="display: flex; flex-direction: column;">
                    <div style="height: 140px; background: #EEF2FF; border-radius: 8px; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; color: var(--primary-color);">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                        </svg>
                    </div>
                    <div style="flex: 1;">
                        <span class="badge badge-info mb-2">${b.category}</span>
                        <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.25rem;">${b.title}</h3>
                        <p class="text-muted mb-2">${b.author}</p>
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-muted" style="font-size: 0.8rem;">Shelf ${b.location}</span>
                            <span class="badge ${isAvailable ? 'badge-success' : 'badge-danger'}">${b.status}</span>
                        </div>
                    </div>
                    <div class="flex gap-2" style="margin-top: auto;">
                        <button class="btn btn-secondary btn-block" onclick="openBookDetails(${b.id})" title="View details about this book">
                            View Details
                        </button>
                    </div>
                    <button class="btn ${isAvailable ? 'btn-primary' : 'btn-secondary'}" 
                        style="width: 100%;" 
                        ${!isAvailable ? 'disabled' : ''}
                        onclick="reserveBook(${b.id})">
                        ${isAvailable ? 'Reserve Book' : 'Unavailable'}
                    </button>
                </div>
             `;
        }).join('');
    }
};

window.openBookDetails = function (bookId) {
    const modal = document.getElementById('bookDetailsModal');
    if (!modal) return;
    const books = db.getBooks();
    const book = books.find(b => b.id === bookId);
    if (!book) return;
    const idEl = document.getElementById('detailBookId');
    const titleEl = document.getElementById('detailBookTitle');
    const authorEl = document.getElementById('detailBookAuthor');
    const subjectEl = document.getElementById('detailBookSubject');
    const statusEl = document.getElementById('detailBookStatus');
    const locationEl = document.getElementById('detailBookLocation');
    const reserveBtn = document.getElementById('detailReserveBtn');
    if (idEl) idEl.textContent = book.id;
    if (titleEl) titleEl.textContent = book.title;
    if (authorEl) authorEl.textContent = book.author;
    if (subjectEl) subjectEl.textContent = book.category;
    if (statusEl) statusEl.textContent = book.status;
    if (locationEl) locationEl.textContent = book.location;
    if (reserveBtn) {
        reserveBtn.disabled = book.status !== 'Available';
        reserveBtn.textContent = book.status === 'Available' ? 'Reserve Book' : 'Unavailable';
        reserveBtn.onclick = () => reserveBook(book.id);
    }
    modal.classList.add('open');
};

window.closeBookDetails = function () {
    const modal = document.getElementById('bookDetailsModal');
    if (modal) modal.classList.remove('open');
};

window.reserveBook = function (bookId) {
    const currentUser = db.getCurrentUser();
    if (!currentUser) return;

    // Constraint: Check if user already has active transaction for this book
    const transactions = db.getTransactions();
    const existing = transactions.find(t => t.userId === currentUser.id && t.bookId === bookId && (t.status === 'Active' || t.status === 'Reserved'));

    if (existing) {
        showToast('You have already reserved or borrowed this book.', 'error');
        return;
    }

    // Logic to reserve
    const books = db.getBooks();
    const book = books.find(b => b.id === bookId);

    if (book && book.status === 'Available') {
        showConfirm(`Confirm reservation for "${book.title}"?`, () => {
            // Update book status
            book.status = 'Reserved';
            book.copies--;
            if (book.copies < 0) book.copies = 0;
            db.updateBook(book);

            // Create Transaction
            transactions.push({
                id: Date.now(),
                userId: currentUser.id,
                bookId: book.id,
                issueDate: null,
                dueDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0],
                status: 'Reserved'
            });
            localStorage.setItem(DB_KEYS.TRANSACTIONS, JSON.stringify(transactions));

            showToast('Book Reserved! Please pick it up within 7 days.', 'success');
            User.setupSearch();
            User.renderDashboard();
        });
    } else {
        showToast('Book is currently unavailable.', 'error');
    }
};

window.cancelReservation = function (transId) {
    showConfirm('Cancel this reservation?', () => {
        let transactions = db.getTransactions();
        const t = transactions.find(t => t.id === transId);

        if (t) {
            // Restore book
            const books = db.getBooks();
            const book = books.find(b => b.id === t.bookId);
            if (book) {
                book.status = 'Available';
                book.copies++;
                db.updateBook(book);
            }

            // Remove transaction
            transactions = transactions.filter(tr => tr.id !== transId);
            localStorage.setItem(DB_KEYS.TRANSACTIONS, JSON.stringify(transactions));

            showToast('Reservation cancelled.', 'success');
            User.renderDashboard();
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('/user/')) {
        User.init();
    }
});
