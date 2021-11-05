import axios from "axios";
import { showAlert, alertType } from "./alert";
import { validateField } from "./validator";

const paymentButton = document.getElementById("payment-button");
const fullName = document.getElementById("fullName-input");
const cardNumber = document.getElementById("cardNumber-input");
const expiryDate = document.getElementById("expiryDate-input");
const cvv = document.getElementById("cvv-input");

function clearErrorNotification() {
  const obj = {
    fullName: "",
    cardNumber: "",
    cvv: "",
    expiryDate: "",
  };
  Object.keys(obj).map((el) => {
    validateField(el, obj[el]);
  });
}

if (paymentButton) {
  paymentButton.addEventListener("click", async function () {
    const formData = {
      fullName: fullName.value,
      cardNumber: cardNumber.value,
      expiryDate: expiryDate.value,
      cvv: cvv.value,
      orderId: paymentButton.dataset.order,
    };

    const res = await axios.post("/payment-confirmation", formData);

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
    console.log(res.data);
    window.setTimeout(() => {
      localStorage.removeItem("cart-products");
      location.assign(`/success/${res.data.receipt}`);
    }, 1500);
  });
}
