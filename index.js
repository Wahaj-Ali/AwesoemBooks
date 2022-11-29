class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
        this.bookId = Math.random();
        
    }
}

class awesomeBook {
    constructor() {
        this.BookDetail = [];
    }

    addBook(newBook) {
        this.BookDetail.push(newBook);
        localStorage.setItem('Books', JSON.stringify(this.BookDetail));
        showBook(newBook);
    }

    delBook(bookId) {
        const bookTitle = document.getElementById(bookId);
        bookTitle.remove();
        this.BookDetail = this.BookDetail.filter((bookObj) => bookObj.bookId !== bookId);
        localStorage.setItem('Books', JSON.stringify(this.BookDetail));
    }
}

const Books = new awesomeBook();

function getBookData() {
    const bookTitle = document.getElementById('book-title');
    const authorName = document.getElementById('book-author');
    const anotherBook = new Book(bookTitle.value, authorName.value);
    bookTitle.value = '';
    authorName.value = '';
    return anotherBook;
}

function showBook(bookObj) {
    const bookSection = document.getElementById('book-section');
    const newBook = document.createElement('div');
    newBook.setAttribute('id', bookObj.bookId);
    newBook.innerHTML = `<p>${bookObj.title}</p>
                        <p>${bookObj.author}</p>`;
    const deleteBook = document.createElement('button');
    deleteBook.innerHTML = 'Delete';
    deleteBook.addEventListener('click', () => Books.delBook(bookObj.bookId));
    const hr = document.createElement('hr');
    newBook.appendChild(deleteBook);
    newBook.appendChild(hr);
    bookSection.appendChild(newBook);
}

const addButton = document.getElementById('add-book');
addButton.addEventListener('click', () => {
    const newBook = getBookData();
    Books.addBook(newBook);
});