import "@babel/polyfill";
import "./cart";
import "./order";
import "./checkout";
import "./payment";
import { showAlert, alertType } from "./alert";

const receiptBtn = document.getElementById("receipt-download-btn");

if (receiptBtn) {
  receiptBtn.addEventListener("click", function () {
    showAlert(
      "Download will start in a moment, you can also check your mail for the receipt",
      alertType[2]
    );
  });
}
