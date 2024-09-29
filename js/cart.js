// gestisco lista prodotti nel carrello
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

  // rimuove un prodotto dal carrello
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
