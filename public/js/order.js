const cartContainer = document.getElementById("cart-items");

import { _cartmarkup } from "./_markup";

const localCartItems = JSON.parse(localStorage.getItem("cart-products")) || {
  cart: [],
};

const currentCartItems = localCartItems.cart;

function renderCartItems(userCart) {
  if (userCart.length > 0) {
    cartContainer.innerHTML = null;
  }
  userCart.forEach((el) => {
    let element = _cartmarkup;
    element = element.replace("%CART_PHOTO%", el.photo);
    element = element.replace("%CART_PRICE%", `$ ${el.price}`);
    element = element.replace("%CART_TITLE%", el.title);
    element = element.replaceAll("%CART_ID%", el.id);
    element = element.replace("%CART_QUANTITY%", el.quantity);
    cartContainer.insertAdjacentHTML("beforeend", element);
  });
}

if (cartContainer) {
  renderCartItems(currentCartItems);

  cartContainer.addEventListener("click", (e) => {
    if (e.target.dataset.type === "minus" || e.target.dataset.type === "plus") {
      console.log(e.target.dataset.id);

      currentCartItems.forEach((el) => {
        if (el.id === e.target.dataset.id) {
          if (e.target.dataset.type === "minus") {
            el.quantity = el.quantity >= 1 ? el.quantity - 1 : 0;
          } else el.quantity = el.quantity + 1;
        }
      });
      localStorage.setItem(
        "cart-products",
        JSON.stringify({ cart: currentCartItems })
      );
      renderCartItems(currentCartItems);
    }
  });
}
