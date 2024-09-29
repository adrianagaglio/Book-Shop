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
    <div class="mb-5 d-flex align-items-center justify-content-between">
      <h4 class="mb-0 fw-bold fs-3">Prezzo: <span>${book.price}</span>$</h4>
      <p class="mb-0 fst-italic">Asin: <span id="asin">${book.asin}</span></p>
    </div>
    <button class="btn btn-cocoabrown text-raisinblack" onclick="addToCart()">Aggiungi al carrello</button>
    </div>`;
};

const addToCart = () => {
  const img = document.querySelector("#bookDetails img").src;
  const title = document.querySelector("h1").innerHTML;
  const price = document.querySelector("h4 span").innerHTML;
  const asin = document.getElementById("asin").innerHTML;
  const bookObj = new CartItem(img, title, price, asin, 1);
  const exist = cart.some((item) => item.asin === bookObj.asin);
  if (!exist) {
    cart.push(bookObj);
  } else {
    const index = cart.findIndex((item) => item.asin === bookObj.asin);
    cart[index].qty++;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  cartList();
  cartShow();
};

getBook();
cartList();
