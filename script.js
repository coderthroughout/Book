document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value;
    if (query) {
        searchBooks(query);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const librarySection = document.getElementById('library-section');
    const myLibraryLink = document.getElementById('my-library-link');
    const libraryContainer = document.getElementById('library');

    myLibraryLink.addEventListener('click', () => {
        const savedBooks = JSON.parse(localStorage.getItem('myLibrary')) || [];
        libraryContainer.innerHTML = '';

        if (savedBooks.length === 0) {
            libraryContainer.innerHTML = '<p>Your library is empty. Add some books!</p>';
        } else {
            savedBooks.forEach(book => {
                const bookDiv = document.createElement('div');
                bookDiv.classList.add('book-item');
                bookDiv.innerHTML = `
                    <img src="${book.thumbnail}" alt="${book.title} cover">
                    <h3>${book.title}</h3>
                    <p>By: ${book.authors.join(', ')}</p>
                `;
                libraryContainer.appendChild(bookDiv);
            });
        }
    });
});

function searchBooks(query) {
    const apiKey = 'AIzaSyB7TPy6qAycFg7KD4anxjJMxtdG15tMNaA'; // Replace with your real API key
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayResults(data.items))
        .catch(error => console.error('Error fetching data:', error));
}

function displayResults(books) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';

    if (!books || books.length === 0) {
        resultsContainer.innerHTML = '<p>No books found.</p>';
        return;
    }

    books.forEach(book => {
        const bookInfo = book.volumeInfo;
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');

        const thumbnail = bookInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192?text=No+Image';
        const title = bookInfo.title || 'No Title';
        const authors = bookInfo.authors ? bookInfo.authors.join(', ') : 'Unknown Author';

        bookItem.innerHTML = `
            <img src="${thumbnail}" alt="${title}">
            <h3>${title}</h3>
            <p>by ${authors}</p>
            <button onclick="addToLibrary('${book.id}')">Add to Library</button>
        `;

        resultsContainer.appendChild(bookItem);
    });
}

function addToLibrary(bookId) {
    // Logic to add book to library (to be implemented)
    alert(`Book with ID ${bookId} added to your library!`);
} 