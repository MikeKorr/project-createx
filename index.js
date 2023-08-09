const formRequest = document.getElementById("formInputs");
const buttonSendRequest = document.querySelector(".contact__request");
const radioInput = formRequest.querySelectorAll('input[name="method"]');
const selectorInputs = formRequest.querySelectorAll('option[name="Design"]');
const selectorDesign = document.getElementById("select-box");
const buttonAgreement = formRequest.querySelector(".contact__button-check");
const workMenuLink = document.getElementById("work");
const contactMenuLink = document.getElementById("contacts");
const officesPageLocation = document.getElementById("offices");
const contactPageLocation = document.getElementById("cont");
const buttonGoToTop = document.getElementById("gtt");
const headerPageLocation = document.getElementById("header");
const footerForm = document.getElementById("footerForm");
const buttonSubscribe = document.querySelector(".footer__sub");
const menuButton = document.querySelector(".header__burger-btn");
const menuLinks = document.querySelector(".header__links");
const inputPhone = document.getElementById("tel");

menuButton.addEventListener("click", () => {
  menuLinks.classList.toggle("header__links-open");
});

workMenuLink.addEventListener("click", () => {
  officesPageLocation.scrollIntoView({ behavior: "smooth" });
});

contactMenuLink.addEventListener("click", () => {
  contactPageLocation.scrollIntoView({ behavior: "smooth" });
});

buttonGoToTop.addEventListener("click", () => {
  headerPageLocation.scrollIntoView({ behavior: "smooth" });
});

buttonSendRequest.disabled = true;
buttonAgreement.addEventListener("click", () => {
  if (buttonAgreement.checked) {
    buttonSendRequest.disabled = false;
  } else if (!buttonAgreement.checked) buttonSendRequest.disabled = true;
});

buttonSendRequest.addEventListener("click", (e) => {
  e.preventDefault();
  if (buttonAgreement.checked) {
    getContactUsFormData();
  }
});

function getContactUsFormData() {
  console.log({
    name: formRequest.name.value,
    phone: inputPhone.value,
    email: formRequest.email.value,
    design: formRequest.selectDesign.value,
    location: formRequest.selectLocation.value,
    message: formRequest.message.value,
    method: getRadioInput(),
  });
}

function getRadioInput() {
  return Array.from(radioInput)
    .filter((e) => e.checked)
    .map((item) => item.value);
}

const KEY_SLASH = 47;
const KEY_COLON = 58;

const phoneMask = (event) => {
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
    (keyCode > KEY_SLASH && keyCode < KEY_COLON)
  ) {
    target.value = newValue;
  }
  if (type === "blur" && target.value.length < 5) target.value = "";
};

if (inputPhone.type === "tel") {
  inputPhone.addEventListener("input", phoneMask);
  inputPhone.addEventListener("focus", phoneMask);
  inputPhone.addEventListener("blur", phoneMask);
  inputPhone.addEventListener("keydown", phoneMask);
}

buttonSubscribe.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(footerForm.footerInput.value);
});
