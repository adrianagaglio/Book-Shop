const url = "https://striveschool-api.herokuapp.com/books/";

const parameters = new URLSearchParams(location.search);
const asin = parameters.get("asin");

const getBook = function () {
  fetch(url + asin)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error();
      }
    })
    .then((book) => {
      console.log(book);
      showBookDetails(book);
    })
    .catch((error) => console.log("ERRORE", error));
};

const showBookDetails = (book) => {
  document.querySelector("h1").innerText = `${book.title}`;
  const bookDetails = document.querySelector("#bookDetails");
  bookDetails.innerHTML = `
    <div class="col-3">
    <img class="w-fixed-300 flex-grow-0" src="${book.img}" alt="${book.title}" />
    </div>
    <div class="col-9">
    <p>Category: <a href="#" class="text-decoration-none text-cocoabrown fw-medium">${book.category}</a></p>
    <h4>Description:</h4>
    <p>lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Donec convallis, nunc vel fringilla lobortis, mauris ipsum facilisis ex, at elementum ligula nisi</p>


    </div>`;
};

getBook();
cartList();
