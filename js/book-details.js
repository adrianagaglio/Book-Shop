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
    <p >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Donec convallis, nunc vel fringilla lobortis, mauris ipsum facilisis ex, at elementum ligula nisi</p>
    <h4 class="mb-5 fw-bold fs-3">Prezzo: <span>${book.price}</span>$</h4>
    <button class="btn btn-cocoabrown text-raisinblack" onclick="addToCart()">Aggiungi al carrello</button>
    </div>`;
};

const addToCart = () => {
  const img = document.querySelector("#bookDetails img").src;
  const title = document.querySelector("h1").innerHTML;
  const price = document.querySelector("h4 span").innerHTML;
  const btn = `<button class="btn btn-saffron text-raisinblack align-self-end ms-auto"><i class="bi bi-trash3"></i></button>`;
  const bookObj = new CartItem(img, title, price, btn);
  cart.push(bookObj);
  cartShow();
  localStorage.setItem("cart", JSON.stringify(cart));
  cartList();
};

getBook();
cartList();
