export const alertType = ["success", "error", "info"];

const successBtn = document.getElementById("btn-success");
const errorBtn = document.getElementById("btn-error");
const hideBtn = document.getElementById("btn-hide");

const pendingTimeout = [];

export function showAlert(message, type) {
  if (pendingTimeout.length) {
    window.clearTimeout(pendingTimeout[0]);
    pendingTimeout.length = 0;
  }
  hideAlert();
  const alertBox = `<div
      id="alert-box"
      class="
        animate__animated animate__slideInUp animate__faster
        rounded-md
        fixed
        bottom-5
        right-5
        border-l-8
        border-${
          type === alertType[0]
            ? "green"
            : type === alertType[1]
            ? "red"
            : "yellow"
        }-500
        bg-gray-800
        text-white
        p-10
        py-5
      "
    >
      <p class="text-sm">${message}</p>
    </div>`;

  document.querySelector("body").insertAdjacentHTML("afterbegin", alertBox);

  const oberver = window.setTimeout(hideAlert, 4000);
  pendingTimeout.push(oberver);
}

export function hideAlert() {
  const alertBox = document.getElementById("alert-box");
  if (alertBox) {
    alertBox.parentElement.removeChild(alertBox);
  }
}
