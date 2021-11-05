export function validateField(identifier, message) {
  const input = document.getElementById(`${identifier}-input`);
  const label = document.getElementById(`${identifier}-label`);
  if (label) {
    const errorMessage = `<span id="form-error" class="text-right text-xs text-red-500 ml-auto">${message}</span>`;
    if (label.childNodes.length >= 2) {
      label.removeChild(label.lastElementChild);
    }
    label.insertAdjacentHTML("beforeend", errorMessage);
  }
}
