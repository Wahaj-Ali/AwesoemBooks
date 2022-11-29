class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
        this.bookId = Math.floor(Math.random() * 10);
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

    var divs = document.getElementsByTagName('div');
    for (var i = 0; i < divs.length; i++) {
        if (i % 2 === 0 ) {
            divs[i].style.background = greyColor();
        }
        else {
            divs[i].style.background = whiteColor();
        }
    }

    newBook.setAttribute('class', "books");
    newBook.setAttribute('id', bookObj.bookId);
    newBook.innerHTML = `<p>"${bookObj.title}" by ${bookObj.author}</p>`;
    const deleteBook = document.createElement('button');
    deleteBook.setAttribute('class', "remmove-btn")
    deleteBook.innerHTML = 'Remove';
    deleteBook.addEventListener('click', () => Books.delBook(bookObj.bookId));
    newBook.appendChild(deleteBook);
    bookSection.appendChild(newBook);
}

function greyColor() {
    var color = '#d7d7d7de';
    return color;
}

function whiteColor() {
    var wColor = '#fff'
    return wColor;
}

const addButton = document.getElementById('add-book');
addButton.addEventListener('click', () => {
    const newBook = getBookData();
    Books.addBook(newBook);
});