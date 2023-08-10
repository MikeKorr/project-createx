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
    email: formRequest.emailInp.value,
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
const additionalCode = 3;
const numberPlace = 5;
const phoneDelete = -1;

const phoneMask = (event) => {
  const { target, keyCode, type } = event;
  const matrix = "+7 (___) ___-__-__";
  let i = 0;
  const def = matrix.replace(/\D/g, "");
  const val = target.value.replace(/\D/g, "");
  let newValue = matrix.replace(/[_\d]/g, (a) =>
    i < val.length ? val[i++] || def[i] : a
  );
  i = newValue.indexOf("_");
  if (i !== phoneDelete) {
    i < numberPlace && (i = additionalCode);
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

//валидация
const spanRad = document.getElementById("radErr");
function errorRadioInputs() {
  radioInput.forEach((input) => {
    if (!input.checked) {
      spanRad.textContent = input.validationMessage;
    } else {
      spanRad.textContent = "";
    }
  });
}

function showError(input, errorMessage) {
  const spanId = `error-${input.id}`;
  const errorField = document.getElementById(spanId);
  errorField.textContent = errorMessage;
  input.classList.add("input__invalid");
}

function hideError(input) {
  const spanId = `error-${input.id}`;
  const errorField = document.getElementById(spanId);
  errorField.textContent = "";
  input.classList.remove("input__invalid");
}

function checkValid(input) {
  if (input.validity.valid) {
    hideError(input);
  } else {
    showError(input, input.validationMessage);
  }
}

function enableButton(submitButton) {
  submitButton.disabled = false;
}

function disableButton(submitButton) {
  submitButton.disabled = true;
}

function checkValidForm(submitButton, form) {
  if (form.checkValidity()) {
    enableButton(submitButton);
  } else {
    disableButton(submitButton);
  }
}

function setEventListeners(form, settings) {
  const inputLists = form.querySelectorAll(settings.inputSelector);
  const submitButton = form.querySelector(settings.buttonSaveSelector);
  checkValidForm(submitButton, formRequest);
  inputLists.forEach(function (input) {
    input.addEventListener("focusout", () => {
      checkValid(input);
      errorRadioInputs();
    });
    input.addEventListener("input", function () {
      checkValid(input);
      checkValidForm(submitButton, formRequest);
      errorRadioInputs();
    });
  });
}

function enableValidation(settings) {
  const formLists = document.querySelectorAll(settings.formSelector);
  formLists.forEach(function (form) {
    setEventListeners(form, settings);
  });
}

const validationSettings = {
  formSelector: ".contact__form",
  inputSelector: ".form-input",
  buttonSaveSelector: ".contact__request",
};

enableValidation(validationSettings);
