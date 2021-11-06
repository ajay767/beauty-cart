import { showAlert, alertType } from "./alert";
import { validateField } from "./validator";
import axios from "axios";

const checkoutBtn = document.getElementById("place-order-button");
const firstName = document.getElementById("firstName-input");
const lastName = document.getElementById("lastName-input");
const mobile = document.getElementById("mobile-input");
const email = document.getElementById("email-input");
const address = document.getElementById("address-input");
const city = document.getElementById("city-input");
const province = document.getElementById("province-input");

function clearErrorNotification() {
  const obj = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    province: "",
    address: "",
    city: "",
  };
  Object.keys(obj).map((el) => {
    validateField(el, obj[el]);
  });
}

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", async function () {
    const formData = {
      firstName: firstName.value,
      lastName: lastName.value,
      mobile: mobile.value,
      address: address.value,
      city: city.value,
      province: province.value,
      email: email.value,
    };
    const cartData = JSON.parse(localStorage.getItem("cart-products"));
    const request = { user: formData, cart: cartData.cart };

    const res = await axios.post("/checkout", request);

    if (!res.data.status) {
      const error = res.data.error;
      clearErrorNotification();
      if (error) {
        Object.keys(error).map((el) => {
          validateField(el, error[el]);
        });
      }
      console.log(res.data);
      showAlert(res.data.message, alertType[1]);
      return;
    }
    showAlert(res.data.message, alertType[0]);

    window.setTimeout(() => {
      location.assign(`/payment/${res.data.orderId}`);
    }, 1500);
  });
}
