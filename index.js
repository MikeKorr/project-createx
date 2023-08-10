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
const inputPhone = document.getElementById("telInp");

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

const initPhoneMask = (event) => {
  const { target, keyCode, type } = event;
  const phoneMask = "+7 (___) ___-__-__";
  let index = 0;
  const def = phoneMask.replace(/\D/g, "");
  const val = target.value.replace(/\D/g, "");
  let newValue = phoneMask.replace(/[_\d]/g, (a) =>
    index < val.length ? val[index++] || def[index] : a
  );
  index = newValue.indexOf("_");
  if (index !== phoneDelete) {
    index < numberPlace && (index = additionalCode);
    newValue = newValue.slice(0, index);
  }
  let reg = phoneMask
    .substring(0, target.value.length)
    .replace(/_+/g, (a) => `\\d{1,${a.length}}`)
    .replace(/[+()]/g, "\\$&");
  reg = new RegExp(`^${reg}$`);
  const isDigitInterval = keyCode > KEY_SLASH && keyCode < KEY_COLON;
  if (!reg.test(target.value) || target.value.length < 5 || isDigitInterval) {
    target.value = newValue;
  }
  if (type === "blur" && target.value.length < 5) target.value = "";
};

if (inputPhone.type === "tel") {
  inputPhone.addEventListener("input", initPhoneMask);
  inputPhone.addEventListener("focus", initPhoneMask);
  inputPhone.addEventListener("blur", initPhoneMask);
  inputPhone.addEventListener("keydown", initPhoneMask);
}

buttonSubscribe.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(footerForm.footerInput.value);
});

//валидация

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

function validateInput(input) {
  input.validity.valid
    ? hideError(input)
    : showError(input, input.validationMessage);
}

function enableButton(submitButton) {
  submitButton.disabled = false;
}

function disableButton(submitButton) {
  submitButton.disabled = true;
}

function setEventListeners(form, settings) {
  const inputList = form.querySelectorAll(settings.inputSelector);

  inputList.forEach(function (input) {
    input.addEventListener("focusout", () => {
      validateInput(input);
    });
    input.addEventListener("input", function () {
      validateInput(input);
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

buttonSendRequest.addEventListener("click", (e) => {
  e.preventDefault();
  const submitButton = formRequest.querySelector(
    validationSettings.buttonSaveSelector
  );
  const isValidForm = formRequest.checkValidity();
  isValidForm ? enableButton(submitButton) : disableButton(submitButton);
  const inputLists = formRequest.querySelectorAll(
    validationSettings.inputSelector
  );
  inputLists.forEach((input) => validateInput(input));
  if (buttonAgreement.checked && isValidForm) {
    getContactUsFormData();
  }
});
