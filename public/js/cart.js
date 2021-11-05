const productBtn = document.getElementById("product-container");
const cartBag = document.getElementById("cart-bag");
const cartItems = JSON.parse(localStorage.getItem("cart-products")) || {
  cart: [],
};
cartBag.innerText = cartItems.cart.length;

const cart = cartItems.cart;

if (productBtn) {
  productBtn.addEventListener("click", (e) => {
    if (e.target.id === "product-btn") {
      const item = {
        id: e.target.dataset.id,
        photo: e.target.dataset.photo,
        title: e.target.dataset.title,
        price: e.target.dataset.price,
        quantity: 1,
      };

      const productIds = cart.map((e) => e.id);

      if (productIds.includes(item.id)) {
        cart.splice(productIds.indexOf(item.id), 1);
        e.target.innerText = "Add to cart";
        e.target.classList =
          "w-full rounded-sm my-2 text-xs p-2 px-4 bg-green-400 text-white";
      } else {
        cart.push(item);
        e.target.classList =
          "w-full rounded-sm my-2 text-xs p-2 px-4 bg-red-400 text-white";
        e.target.innerText = "Remove";
      }

      localStorage.setItem("cart-products", JSON.stringify({ cart: cart }));
      cartBag.innerText = cart.length;
    }
  });
}

const btns = document.querySelectorAll("#product-btn");

btns.forEach((el) => {
  if (cartItems.cart.map((e) => e.id).includes(el.dataset.id)) {
    el.classList =
      "w-full rounded-sm my-2 text-xs p-2 px-4 bg-red-400 text-white";
    el.innerText = "Remove";
  }
});
