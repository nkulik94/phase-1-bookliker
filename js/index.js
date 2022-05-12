document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(bookList => bookList.map(book => renderBookList(book)))
});

function renderBookList(book) {
    const li = document.createElement('li')
    li.textContent = book.title
    document.getElementById('list').appendChild(li)
    li.addEventListener('click', () => renderBookInfo(book))
}

function renderBookInfo(book) {
    if (document.getElementById('show-panel').children.length > 0) {
        document.getElementById('show-panel').children[0].remove()
    }
    const details = document.createElement('div')
    details.id = 'book-info'
    details.innerHTML = `
        <img src="${book.img_url}" alt="book cover">
        <p>${book.description}</p>
        <p>Liked by:</p>
            <ul id="like-list">
            </ul>
        <button>Like</button
    `
    document.getElementById('show-panel').appendChild(details)
    function listLike(user) {
        const li = document.createElement('li')
        li.textContent = user.username
        document.getElementById('like-list').appendChild(li)
    }
    book.users.map(user => listLike(user))
}