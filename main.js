const addBtn = document.querySelector('#add-btn');
const addForm = document.querySelector('.add-form');
const closeBtn = document.querySelector('.close-btn');
const cards = document.querySelector('.cards');
const addBook = document.querySelector('#add-book');
// const searchBar = document.querySelector('#search-bar');
const searchInput = document.querySelector('#search');

const booksKey = 'Books';

const books = [];

const cart = [];

window.addEventListener('load', () => {
    books.push(...getFromLocalStorage());
    displayCards(books);
});

// Open Add form Pop-up
addBtn.addEventListener('click', () => {
    addForm.style.display = 'grid';
});

// Close Add form Pop-up
closeBtn.addEventListener('click', () => {
    addForm.style.display = 'none';
});

addBook.addEventListener('submit', addNewBook);

searchInput.addEventListener('keyup', (e) => {
    const searchText = e.target.value.toLowerCase();

    const filteredBooks = books.filter(
        (book) =>
            book.title.toLowerCase().includes(searchText) ||
            book.author.toLowerCase().includes(searchText)
    );

    console.log(filteredBooks);
    displayCards(filteredBooks);
});

// searchBar.addEventListener('submit', searchABook);

// Search function
// function searchABook(e) {
//     e.preventDefault();

//     const searchText = e.target.querySelector('#search');
//     if (searchText.value === '') {
//         displayCards(books);
//         return;
//     }
//     console.log(searchText.value);
//     console.log(books);
//     const book = books.filter(
//         (book) =>
//             book.title.toLowerCase() === searchText.value.toLowerCase() ||
//             book.author.toLowerCase() === searchText.value.toLowerCase()
//     );

//     if (book.length === 0) {
//         cards.innerHTML = `<p>Sorry</p>`;
//     } else {
//         displayCards(book);
//     }

//     console.log(book);
// }

function saveToLocalStorage(books) {
    localStorage.setItem(booksKey, JSON.stringify(books));
}

function getFromLocalStorage() {
    return JSON.parse(localStorage.getItem(booksKey));
}

const displayCards = (books) => {
    cards.innerHTML = '';
    books.map((book) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `<img
                            src="./images/book-cover.jpg"
                            alt="book illustration"
                        />
                        <div class="info">
                            <div class="book-info">
                                <h2 id="name">${book.title}</h2>
                                <p id="author">${book.author}</p>
                            </div>
                            <h2 id="price">$${book.price}</h2>
                        </div>
                        <a href="#" id="add-to-cart" class="btn">add to cart</a>`;
        cards.append(card);
    });
};

function addNewBook(e) {
    e.preventDefault();
    const title = e.target.querySelector('#title');
    const author = e.target.querySelector('#author');
    const price = e.target.querySelector('#price');
    const quantity = e.target.querySelector('#quantity');

    const newBook = [
        {
            id: books.length + 1,
            title: title.value,
            author: author.value,
            price: parseFloat(price.value).toFixed(2),
            quantity: parseInt(quantity.value),
        },
    ];

    books.push(...newBook);
    saveToLocalStorage(books);
    displayCards(newBook);

    title.value = '';
    author.value = '';
    price.value = '';
    quantity.value = '';
    addForm.style.display = 'none';
}
