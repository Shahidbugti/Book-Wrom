/**
 * mock-data.js
 * Handles data seeding and localStorage abstractions
 */

const DB_KEYS = {
    USERS: 'lss_users',
    BOOKS: 'lss_books',
    TRANSACTIONS: 'lss_transactions',
    BRANCHES: 'lss_branches',
    CURRENT_USER: 'lss_current_user'
};

// Initial Seed Data
const defaultUsers = [
    { id: 1, name: 'Admin Librari', email: 'admin@lss.com', password: 'admin', role: 'admin', avatar: 'AL' },
    { id: 2, name: 'Student One', email: 'student@lss.com', password: 'user', role: 'user', avatar: 'S1', borrowed: 0, reserved: 0 },
    { id: 3, name: 'Faculty Two', email: 'faculty@lss.com', password: 'user', role: 'user', avatar: 'F2', borrowed: 1, reserved: 0 }
];

const defaultBooks = [
    { id: 101, title: 'Clean Code', author: 'Robert C. Martin', category: 'Technology', isbn: '9780132350884', status: 'Available', copies: 5, location: 'A-12', added: '2023-01-10' },
    { id: 102, title: 'Introduction to Algorithms', author: 'Cormen, Leiserson', category: 'Education', isbn: '9780262033848', status: 'Borrowed', copies: 0, location: 'B-05', added: '2023-02-15' },
    { id: 103, title: 'Design of Everyday Things', author: 'Don Norman', category: 'Design', isbn: '9780465050659', status: 'Available', copies: 3, location: 'C-01', added: '2023-03-20' },
    { id: 104, title: 'JavaScript: The Good Parts', author: 'Douglas Crockford', category: 'Technology', isbn: '9780596517748', status: 'Reserved', copies: 1, location: 'A-15', added: '2023-05-10' },
    { id: 105, title: 'Refactoring', author: 'Martin Fowler', category: 'Technology', isbn: '9780134757599', status: 'Available', copies: 2, location: 'A-13', added: '2023-06-01' },
    { id: 106, title: 'Atomic Habits', author: 'James Clear', category: 'Literature', isbn: '9780735211292', status: 'Available', copies: 4, location: 'D-02', added: '2023-07-15' },
    { id: 107, title: 'Deep Work', author: 'Cal Newport', category: 'Education', isbn: '9781455586691', status: 'Available', copies: 3, location: 'E-08', added: '2023-08-05' },
    { id: 108, title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Science', isbn: '9780553380163', status: 'Available', copies: 2, location: 'S-11', added: '2023-09-02' },
    { id: 109, title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Literature', isbn: '9780061120084', status: 'Borrowed', copies: 0, location: 'L-04', added: '2023-09-22' },
    { id: 110, title: 'The Pragmatic Programmer', author: 'Andrew Hunt', category: 'Technology', isbn: '9780201616224', status: 'Available', copies: 3, location: 'A-20', added: '2023-10-12' },
    { id: 111, title: 'Don Quixote', author: 'Miguel de Cervantes', category: 'Literature', isbn: '9780060934347', status: 'Available', copies: 1, location: 'L-07', added: '2023-11-05' }
];

const defaultBranches = [
    { id: 'BR001', name: 'Main Library', address: '123 Library St, Central City', phone: '+1 234 567 890', manager: 'John Doe' },
    { id: 'BR002', name: 'Westside Branch', address: '456 West Ave, Westside', phone: '+1 987 654 321', manager: 'Jane Smith' },
    { id: 'BR003', name: 'Eastside Annex', address: '789 East Blvd, Eastside', phone: '+1 555 123 456', manager: 'Bob Jones' }
];

const transactionHistory = [
    { id: 501, userId: 3, bookId: 102, issueDate: '2023-10-01', returnDate: null, status: 'Active', dueDate: '2023-10-15' }
];

class DataManager {
    constructor() {
        this.init();
    }

    init() {
        if (!localStorage.getItem(DB_KEYS.USERS)) {
            localStorage.setItem(DB_KEYS.USERS, JSON.stringify(defaultUsers));
        }
        if (!localStorage.getItem(DB_KEYS.BOOKS)) {
            localStorage.setItem(DB_KEYS.BOOKS, JSON.stringify(defaultBooks));
        }
        if (!localStorage.getItem(DB_KEYS.BRANCHES)) {
            localStorage.setItem(DB_KEYS.BRANCHES, JSON.stringify(defaultBranches));
        }
        if (!localStorage.getItem(DB_KEYS.TRANSACTIONS)) {
            localStorage.setItem(DB_KEYS.TRANSACTIONS, JSON.stringify(transactionHistory));
        }
    }

    // Generic Getters
    getUsers() { return JSON.parse(localStorage.getItem(DB_KEYS.USERS) || '[]'); }
    getBooks() { return JSON.parse(localStorage.getItem(DB_KEYS.BOOKS) || '[]'); }
    getBranches() { return JSON.parse(localStorage.getItem(DB_KEYS.BRANCHES) || '[]'); }
    getTransactions() { return JSON.parse(localStorage.getItem(DB_KEYS.TRANSACTIONS) || '[]'); }
    getCurrentUser() { return JSON.parse(localStorage.getItem(DB_KEYS.CURRENT_USER) || 'null'); }

    // Logic
    login(email, password) {
        const users = this.getUsers();
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            localStorage.setItem(DB_KEYS.CURRENT_USER, JSON.stringify(user));
            return { success: true, user };
        }
        return { success: false, message: 'Invalid credentials' };
    }

    logout() {
        localStorage.removeItem(DB_KEYS.CURRENT_USER);
    }

    // Branch Management
    addBranch(branch) {
        const branches = this.getBranches();
        branch.id = branch.id || 'BR' + Date.now().toString().slice(-3);
        branches.push(branch);
        localStorage.setItem(DB_KEYS.BRANCHES, JSON.stringify(branches));
        return branch;
    }

    updateBranch(updatedBranch) {
        let branches = this.getBranches();
        branches = branches.map(b => b.id === updatedBranch.id ? updatedBranch : b);
        localStorage.setItem(DB_KEYS.BRANCHES, JSON.stringify(branches));
    }

    deleteBranch(id) {
        let branches = this.getBranches();
        branches = branches.filter(b => b.id !== id);
        localStorage.setItem(DB_KEYS.BRANCHES, JSON.stringify(branches));
    }

    // Book Management
    addBook(book) {
        const books = this.getBooks();
        book.id = Date.now(); // Simple ID gen
        book.status = book.copies > 0 ? 'Available' : 'Out of Stock';
        books.push(book);
        localStorage.setItem(DB_KEYS.BOOKS, JSON.stringify(books));
        return book;
    }

    updateBook(updatedBook) {
        let books = this.getBooks();
        books = books.map(b => b.id === updatedBook.id ? updatedBook : b);
        localStorage.setItem(DB_KEYS.BOOKS, JSON.stringify(books));
    }

    deleteBook(id) {
        let books = this.getBooks();
        books = books.filter(b => b.id !== id);
        localStorage.setItem(DB_KEYS.BOOKS, JSON.stringify(books));
    }
}

const db = new DataManager();
