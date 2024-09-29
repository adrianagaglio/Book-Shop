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

const booksWrapper = document.getElementById("booksWrapper");
const showBooks = (array) => {
  array.forEach((book) => {
    const bookCol = document.createElement("div");
    bookCol.className = "col";
    bookCol.innerHTML = `<div class="card h-100 shadow-sm">
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
    booksWrapper.appendChild(bookCol);
  });

  // gestisco gli elementi
  const addToCartButtons = document.querySelectorAll(".buttons > button:nth-of-type(1)");
  const removeButtons = document.querySelectorAll(".buttons > button:nth-of-type(2)");
  const books = document.querySelectorAll(".col");

  books.forEach((book, i) => {
    removeButtons[i].addEventListener("click", () => {
      array.splice(i, 1);
      book.remove();
    });
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

const cartList = () => {
  cart = [];
  const tempArray = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [];
  cart.push(...tempArray);
  const badge = document.querySelector(".navbar-toggler span");
  badge.innerText = cart.length;
  const itemList = document.getElementById("itemList");
  itemList.innerHTML = "";
  let cartTotal = 0;
  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cartItem", "d-flex", "p-2", "mb-3", "border", "border-0", "border-bottom");
    cartItem.innerHTML = `
    <img class="thumb" src="${item.img}" alt="${item.title}"/>
    <div class="d-flex flex-column flex-grow-1 px-2 py-1">
    <h5 class="fs-7 mb-3">${item.title}</h5>
    <div class="d-flex justify-content-between align-items-center">
    <span class="fs-5">Price: <b>${parseFloat(item.price).toFixed(2)}</b>$</span>${item.btn}
    </div>`;
    itemList.appendChild(cartItem);
    cartTotal += parseFloat(item.price);
    const total = document.getElementById("total");
    total.innerHTML = "";
    total.innerHTML = `
    <p class="mb-0">Cart total:</p>
    <p class="mb-0 fw-medium fs-5">${cartTotal.toFixed(2)}$</p>
    `;
  });
  const removeFromCart = document.querySelectorAll("#itemList button");
  const cartItem = document.querySelectorAll(".cartItem");
  removeFromCart.forEach((btn, i) => {
    btn.onclick = () => {
      const item = cartItem[i].querySelector("h5").innerHTML;
      const counter = cart.findIndex((cartItem) => cartItem.title === item);
      cartTotal -= parseFloat(cart[counter].price);

      total.innerHTML = "";
      total.innerHTML = `
      <p class="mb-0">Cart total:</p>
      <p class="mb-0 fw-medium fs-5">${cartTotal.toFixed(2)}$</p>
      `;
      cart.splice(counter, 1);
      cartItem[i].remove();
      badge.innerText = cart.length;
      localStorage.setItem("cart", JSON.stringify(cart));
    };
  });
};

// mostra il carrello quando viene aggiunto un nuovo prodotto
const cartShow = () => {
  const cartShow = document.querySelector(".offcanvas");
  cartShow.classList.add("show", "bg-light");
  cartShow.setAttribute("aria-modal", true);
  cartShow.setAttribute("role", "dialog");
  document.querySelector("body").style = "overflow: hidden; padding-right: 17px;";
  document.querySelector("body").setAttribute("data-bs-overflow", "hidden");
  document.querySelector("body").setAttribute("data-bs-padding-right", "17px");
  const backdrop = document.createElement("div");
  backdrop.classList.add("offcanvas-backdrop", "fade", "show");
  cartShow.after(backdrop);
  backdrop.onclick = (e) => {
    cartShow.classList.remove("show", "bg-light");
    cartShow.removeAttribute("aria-modal");
    cartShow.removeAttribute("role");
    document.querySelector("body").style = "";
    document.querySelector("body").removeAttribute("data-bs-overflow");
    document.querySelector("body").removeAttribute("data-bs-padding-right");
    backdrop.remove();
  };
};

getBooks();
cartList();
