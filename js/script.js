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
    .catch((error) => console.log(error));
};

let cart = [];

class CartItem {
  constructor(_img, _title, _price, _btn) {
    this.img = _img;
    this.title = _title;
    this.price = _price;
    this.btn = _btn;
  }
}

const booksWrapper = document.getElementById("booksWrapper");
const showBooks = (array) => {
  array.forEach((book) => {
    const bookCol = document.createElement("div");
    bookCol.className = "col";
    bookCol.innerHTML = `<div class="card">
              <img src="${book.img}" class="card-img-top fixed-height" alt="" />
              <div class="card-body bg-light">
                <h5 class="card-title text-raisinblack fs-6">${book.title}</h5>
                <div class="d-flex mb-2">
                    <span id="category" class="me-auto fs-8">Category: ${book.category}</span>
                    <span id="price" class="fs-8">Price: ${book.price}</span>
                    <span id="asin" class="fs-8">Asin: ${book.asin}</span>
                </div>
                <div class="buttons d-flex">
                  <button class="btn btn-cocoabrown me-auto text-raisinblack">Compra <i class="bi bi-cart-plus"></i></button>
                  <button class="btn btn-saffron text-raisinblack">Scarta <i class="bi bi-trash3"></i></button>
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
      const price = document.querySelectorAll(".card #price")[i].innerHTML;
      const btn = `<button class="btn btn-saffron text-raisinblack align-self-end ms-auto"><i class="bi bi-trash3"></i></button>`;
      const bookObj = new CartItem(img, title, price, btn);
      cart.push(bookObj);
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
  if (JSON.parse(localStorage.getItem("cart"))) {
    badge.innerText = JSON.parse(localStorage.getItem("cart")).length;
    badge.style.display = "block";
  } else {
    badge.style.display = "none";
  }
  const itemList = document.getElementById("itemList");
  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cartItem");
    cartItem.classList.add("d-flex");
    cartItem.classList.add("p-2");
    cartItem.classList.add("mb-3");
    cartItem.classList.add("border");
    cartItem.classList.add("border-0");
    cartItem.classList.add("border-bottom");
    cartItem.innerHTML = `<img class="thumb" src="${item.img}" alt="${item.title}"/><div class="d-flex flex-column flex-grow-1 px-2 py-1"><h5 class="fs-7">${item.title}</h5><span class="fs-8">${item.price}</span>${item.btn}</div>`;
    itemList.appendChild(cartItem);
  });
  const removeFromCart = document.querySelectorAll("#itemList button");
  removeFromCart.forEach((btn, i) => {
    btn.onclick = () => {
      const cartItem = document.querySelectorAll(".cartItem");
      cartItem[i].remove();
    };
  });
};

getBooks();
cartList();
