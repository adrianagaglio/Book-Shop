let cart = [];

class CartItem {
  constructor(_img, _title, _price, _btn) {
    this.img = _img;
    this.title = _title;
    this.price = _price;
    this.btn = _btn;
  }
}

const getBooks = function () {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error();
      }
    })
    .then((books) => {
      showBooks(books);
    })
    .catch((error) => console.log("ERRORE", error));
};

// creazione card
const createCard = (book) => {
  return `<div class="card h-100 shadow-sm">
            <a href="./book-details.html?asin=${book.asin}"><img src="${book.img}" class="card-img-top h-fixed-350 fixed-height" alt="" /></a>
            <div class="card-body bg-light d-flex flex-column">
              <a class="text-decoration-none" href="./book-details.html?asin=${
                book.asin
              }"><h5 class="card-title text-raisinblack fs-6 mb-2 text-nowrap overflow-hidden" style="text-overflow:ellipsis" title="${book.title}">${
    book.title
  }</h5></a>
              <div class="d-flex flex-column mb-2">
                <div class="d-flex justify-content-between">
                    <span id="category" class="fs-6">Category: <a href="#" class="text-decoration-none fw-medium text-cocoabrown">${book.category}</a></span>
                    <span id="price" class="fs-6 fw-medium">Price: ${book.price.toFixed(2)}$</span>
                </div>
                <span id="asin" class="fs-8 text-end fst-italic">Asin: ${book.asin}</span>
              </div>
              <div class="buttons d-flex mt-auto gap-2">
                <button class="btn btn-cocoabrown text-raisinblack"><i class="bi bi-cart-plus"></i></button>
                <button class="btn btn-saffron text-raisinblack"><i class="bi bi-trash3"></i></button>
              </div>
            </div>
          </div>`;
};

const booksWrapper = document.getElementById("booksWrapper");
const showBooks = (array) => {
  array.forEach((book) => {
    const bookCol = document.createElement("div");
    bookCol.className = "col";
    bookCol.innerHTML = createCard(book);
    booksWrapper.appendChild(bookCol);
  });

  // seleziono gli elementi
  const addToCartButtons = document.querySelectorAll(".buttons > button:nth-of-type(1)");
  const removeButtons = document.querySelectorAll(".buttons > button:nth-of-type(2)");
  const books = document.querySelectorAll(".col");

  books.forEach((book, i) => {
    // rimuovi card dal DOM
    removeButtons[i].addEventListener("click", () => {
      array.splice(i, 1);
      book.remove();
    });

    // aggiungi al carrello
    addToCartButtons[i].addEventListener("click", () => {
      const img = document.querySelectorAll(".card img")[i].src;
      const title = document.querySelectorAll(".card h5")[i].innerHTML;
      const price = document.querySelectorAll(".card #price")[i].innerHTML.slice(7);
      const btn = `<button class="btn btn-saffron text-raisinblack align-self-end ms-auto"><i class="bi bi-trash3"></i></button>`;
      const bookObj = new CartItem(img, title, price, btn);
      cart.push(bookObj);
      cartShow();
      localStorage.setItem("cart", JSON.stringify(cart));
      cartList();
    });
  });
};

getBooks();
cartList();
