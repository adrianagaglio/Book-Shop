let cart = [];

class CartItem {
  constructor(_img, _title, _price, _asin, _qty) {
    this.img = _img;
    this.title = _title;
    this.price = _price;
    this.asin = _asin;
    this.qty = _qty;
  }
}

// aggiorno totale nel carrello
const updateCartTotal = () => {
  cartTotal = 0;
  cart.forEach((item) => {
    cartTotal += item.price * item.qty;
  });
  localStorage.setItem("cartTotal", JSON.stringify(cartTotal));
  const total = document.getElementById("total");
  total.innerHTML = "";
  total.innerHTML = `
    <p class="mb-0">Cart total:</p>
    <p class="mb-0 fw-medium fs-5">${parseFloat(JSON.parse(localStorage.getItem("cartTotal"))).toFixed(2)}$</p>
    `;
};

// gestisco lista prodotti nel carrello
const cartList = () => {
  cart = [];
  const tempArray = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [];
  cart.push(...tempArray);
  const badge = document.querySelector(".navbar-toggler span");
  badge.innerText = cart.length;
  const itemList = document.getElementById("itemList");
  itemList.innerHTML = "";
  cart.forEach((item, i) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cartItem", "d-flex", "p-2", "mb-3", "border", "border-0", "border-bottom");
    cartItem.innerHTML = `
      <img class="thumb" src="${item.img}" alt="${item.title}"/>
      <div class="d-flex flex-column flex-grow-1 px-2 py-1">
      <h5 class="fs-7 mb-3">${item.title}</h5>
      <div class="d-flex justify-content-between align-items-center gap-3">
      <span class="fs-5 me-auto">Price: <b>${parseFloat(item.price).toFixed(2)}</b>$</span>
      <span class="qty">Qty: <input class="qty w-fixed-50" type="number" min="1" value="${item.qty}" step="1"/></span>
      <button class="btn btn-saffron text-raisinblack align-self-end"><i class="bi bi-trash3"></i></button>
      </div>`;
    itemList.appendChild(cartItem);
    cartItem.querySelector("input.qty").addEventListener("change", (e) => {
      cart[i].qty = parseFloat(e.target.value);
      updateCartTotal();
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartTotal();
  });

  // rimuove un prodotto dal carrello
  const removeFromCart = document.querySelectorAll("#itemList button");
  const cartItem = document.querySelectorAll(".cartItem");
  removeFromCart.forEach((btn, i) => {
    btn.onclick = () => {
      const item = cartItem[i].querySelector("h5").innerHTML;
      const counter = cart.findIndex((cartItem) => cartItem.title === item);
      cart.splice(counter, 1);
      cartItem[i].remove();
      badge.innerText = cart.length;
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartTotal();
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

window.onload = () => {
  if (JSON.parse(localStorage.getItem("cartTotal"))) {
    updateCartTotal();
  }
};
