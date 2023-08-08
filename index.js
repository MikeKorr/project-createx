const formRequest = document.getElementById("formInputs");
const buttonSend = document.querySelector(".contact__request");
const radInputs = formRequest.querySelectorAll('input[name="method"]');
const selectInputs = formRequest.querySelectorAll('option[name="Design"]');
const selectorDesign = document.getElementById("select-box");
const buttonAgr = formRequest.querySelector(".contact__button-check");
const workSelector = document.getElementById("work");
const contactsSelector = document.getElementById("contacts");
const officesLocation = document.getElementById("offices");
const contactLocation = document.getElementById("cont");
const buttonGtt = document.getElementById("gtt");
const headerLocation = document.getElementById("header");
const footerForm = document.getElementById("footerForm");
const buttonSub = document.querySelector(".footer__sub");

workSelector.addEventListener("click", () => {
  officesLocation.scrollIntoView({ behavior: "smooth" });
});

contactsSelector.addEventListener("click", () => {
  contactLocation.scrollIntoView({ behavior: "smooth" });
});

buttonGtt.addEventListener("click", () => {
  headerLocation.scrollIntoView({ behavior: "smooth" });
});

buttonSend.disabled = true;
buttonAgr.addEventListener("click", () => {
  if (buttonAgr.checked) {
    buttonSend.disabled = false;
  } else if (!buttonAgr.checked) buttonSend.disabled = true;
});

buttonSend.addEventListener("click", (e) => {
  e.preventDefault();
  if (buttonAgr.checked) {
    returnConsole();
  }
});

function returnConsole() {
  // console.log(
  //   `Анкета: ${selectRad()} Имя: ${form.name.value}, Телефон: ${
  //     form.phone.value
  //   }, Email: ${form.email.value}, Интересует: ${
  //     form.selectDesign.value
  //   }, Локация: ${form.selectLocation.value}, Сообщение: ${form.message.value}`
  // );
  // for (const [key, value] of Object.entries(inputObject)) {
  //   console.log(`${key}: ${value}`);
  // }
  // let entries = Object.entries(inputObject);
  // entries.map(([index, item]) => console.log(index, item));
}

const inputObject = {
  name: formRequest.name.value,
  phone: formRequest.phone.value,
  email: formRequest.email.value,
  design: formRequest.selectDesign.value,
  location: formRequest.selectLocation.value,
  message: formRequest.message.value,
  method: selectRad(),
};

// function saveForm(formNode) {
//   return new FormData(formNode);
// }
// console.log(saveForm(formRequest));

function selectRad() {
  return Array.from(radInputs)
    .filter((e) => e.checked)
    .map((item) => item.value);
}

const mask = (event) => {
  const { target, keyCode, type } = event;

  const pos = target.selectionStart;
  if (pos < 3) event.preventDefault();
  const matrix = "+7 (___) ___-__-__";
  let i = 0;
  const def = matrix.replace(/\D/g, "");
  const val = target.value.replace(/\D/g, "");
  let newValue = matrix.replace(/[_\d]/g, (a) =>
    i < val.length ? val[i++] || def[i] : a
  );
  i = newValue.indexOf("_");
  if (i !== -1) {
    i < 5 && (i = 3);
    newValue = newValue.slice(0, i);
  }
  let reg = matrix
    .substring(0, target.value.length)
    .replace(/_+/g, (a) => `\\d{1,${a.length}}`)
    .replace(/[+()]/g, "\\$&");
  reg = new RegExp(`^${reg}$`);
  if (
    !reg.test(target.value) ||
    target.value.length < 5 ||
    (keyCode > 47 && keyCode < 58)
  ) {
    target.value = newValue;
  }
  if (type === "blur" && target.value.length < 5) target.value = "";
};

const inputTel = document.getElementById("tel");

if (inputTel.type === "tel") {
  inputTel.addEventListener("input", mask);
  inputTel.addEventListener("focus", mask);
  inputTel.addEventListener("blur", mask);
  inputTel.addEventListener("keydown", mask);
}

buttonSub.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(footerForm.footerInput.value);
});
