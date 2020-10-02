//Book class
class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        }
}

//UI and it's methods
class UI{
    addBooktoUI(book){
        const list = document.querySelector('tbody');
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a><i class="fa fa-remove remove-item"></i></a></td>`;
        list.appendChild(row);
    }
    clearForm(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
    showMessage(msg,className){
        const form = document.querySelector('#book-form');
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.textContent = msg;
        document.querySelector('.container').insertBefore(div,form);
        setTimeout(function(){
            const deleteItem = document.querySelector('.alert');
            deleteItem.remove();
        },3000);
    }
    deleteBook(target){
        if(target.classList.contains('remove-item')){
            target.parentElement.parentElement.parentElement.remove();
        }
    }
}

//Class Store for Local Storage purpose
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')==null)
        {
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static displayBooks(){
        let books = Store.getBooks();
        books.forEach(function(book){
            const ui = new UI;
            ui.addBooktoUI(book);
        });
    }

    static addBook(book){
        let books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }

    static removeBook(isbn){
        let books = Store.getBooks();
        books.forEach(function(book,index){
            if(book.isbn == isbn){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}
//Events
document.addEventListener('DOMContentLoaded',Store.displayBooks())

document.querySelector('#book-form').addEventListener('submit',function(e){
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //Instatiate UI
    const ui = new UI();


    if(title == '' || author == '' || isbn == ''){
        //Show error message
        ui.showMessage('Fill all the fields','error')
    }
    else{
        //Instatiate Book
        const book = new Book(title, author, isbn);
        
        //Add book to UI
        ui.addBooktoUI(book);

        //Add book to LS
        Store.addBook(book);
        //Clear input field
        ui.clearForm();

         //showMessage
        ui.showMessage('Book Added Successfully!!!','success');
        e.preventDefault();
    }

    e.preventDefault();    
});

document.querySelector('table').addEventListener('click',function(e){
  
    //Instatiate UI
  const ui = new UI();

  //delete Book
  ui.deleteBook(e.target);

  //delete from LS
  Store.removeBook(e.target.parentElement.parentElement.previousElementSibling.textContent)
  //showMessage
  ui.showMessage('Book Removed Successfully!!!','success');

});

