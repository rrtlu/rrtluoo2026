class Book {
    title: string;
    author: string;
    isBorrowed: boolean;

    constructor(title: string, author: string) {
        this.title = title;
        this.author = author;
        this.isBorrowed = false;
    }

    borrow(): void {
        if (!this.isBorrowed) {
            this.isBorrowed = true;
            console.log(`${this.title} has been borrowed.`);
        } else {
            console.log(`${this.title} is already borrowed.`);
        }
    }

    returnBook(): void {
        this.isBorrowed = false;
        console.log(`${this.title} has been returned.`);
    }

    getInfo(): string {
        return `${this.title} by ${this.author} | Borrowed: ${this.isBorrowed}`;
    }
}


class Library {
    books: Book[];

    constructor() {
        this.books = [];
    }

    addBook(book: Book): void {
        this.books.push(book);
        console.log(`Book "${book.title}" added to library.`);
    }

    listBooks(): void {
        console.log("Library books:");
        this.books.forEach(book => {
            console.log(book.getInfo());
        });
    }
}

// Create library
const myLibrary = new Library();

// Create book objects
const book1 = new Book("1984", "George Orwell");
const book2 = new Book("The Hobbit", "J.R.R. Tolkien");

// Add books to library
myLibrary.addBook(book1);
myLibrary.addBook(book2);

// Show books
myLibrary.listBooks();

// Borrow a book
book1.borrow();

// Show updated info
myLibrary.listBooks();

// Return book
book1.returnBook();

// Show final state
myLibrary.listBooks();
//created with the help of an AI