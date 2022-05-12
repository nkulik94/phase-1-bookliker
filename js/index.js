let currentUser
document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(users => logIn(users))
    fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(bookList => bookList.map(book => renderBookList(book)))
});

function logIn(users) {
    return currentUser = users[Math.floor(Math.random() * users.length)]
}

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
        <button id="like-${book.id}"></button
    `
    document.getElementById('show-panel').appendChild(details)
    function listLike(user) {
        const li = document.createElement('li')
        li.textContent = user.username
        li.className = 'like-list'
        document.getElementById('like-list').appendChild(li)
    }
    const button = document.getElementById(`like-${book.id}`)
    book.users.map(user => listLike(user))
    book.users.find(user => user.username === currentUser.username) === undefined ? button.textContent = 'Like' : button.textContent = 'Unlike'
    button.addEventListener('click', () => {
        button.textContent === 'Like' ? likeBook(book) : unLikeBook(book)
    })
}

function likeBook(book) {
    book.users.push(currentUser)
    handlePatch(book)
}

function unLikeBook(book) {
    const length = book.users.length
    for (let i = 0; i < length; i++) {
        if (book.users[i].username === currentUser.username) {
            book.users.splice(i, 1)
        }
    }
    handlePatch(book)
}

function handlePatch(book) {
    const body = {
        users: book.users
    }
    const configObj = {
        method: 'PATCH',
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(body)
    }
    fetch(`http://localhost:3000/books/${book.id}`, configObj)
    .then(res => res.json())
    .then(() => renderBookInfo(book))
}