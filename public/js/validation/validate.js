const validateForm = (form, next) => {
  const wm = new WeakMap();
  const fields = Array.from(form.getElementsByClassName("form-group"));

  fields.forEach(element => {
    const input = element.getElementsByClassName("form-control")[0];
    let isValid = true;
    switch (input.type) {
      case "text":
      case "textarea":
      case "tel": {
        isValid = checkText(input, validationCallback);
        break;
      }
      case "email": {
        isValid = checkEmail(input, validationCallback);
        break;
      }
      case "select-one": {
        isValid = checkSelect(input, validationCallback);
        break;
      }
      case "password": {
        isValid = checkPasswords(input, fields, validationCallback);
        break;
      }
      default: {
        isValid = true;
        break;
      }
    }
    wm.set(input, isValid);
    input.classList.add(isValid ? "is-valid" : "is-invalid");
  });

  const formIsValid = fields.reduce((valid, field) => {
    const element = field.getElementsByClassName("form-control")[0];
    return valid && wm.get(element);
  }, true);

  form.classList.add("was-validated");

  if (formIsValid) {
    if (next) {
      next();
      form.classList.remove("was-validated");
      fields.forEach(field => {
        field
          .getElementsByClassName("form-control")[0]
          .classList.remove("is-valid", "is-invalid");
      });
    } else return null;
  } else return formIsValid;
};

const checkText = (element, cb) => {
  const fieldName = element.labels[0].innerHTML;

  const {
    valid,
    valueMissing,
    tooShort,
    tooLong,
    patternMismatch
  } = element.validity;

  let errorMessage = null;

  if (patternMismatch)
    errorMessage = `${fieldName.toTitleCase()} is not in correct format.`;
  if (tooShort || tooLong)
    errorMessage = `Length of ${fieldName.toTitleCase()} must be between ${
      element.minLength
    } and ${element.maxLength}`;
  if (valueMissing) errorMessage = `Please enter ${fieldName.toLowerCase()}.`;

  return cb(errorMessage, valid, element);
};

const checkEmail = (element, cb) => {
  const fieldName = element.labels[0].innerHTML;

  const {
    valid,
    typeMismatch,
    patternMismatch,
    valueMissing
  } = element.validity;

  let errorMessage = null;

  if (typeMismatch || patternMismatch) {
    errorMessage = "Please enter a valid email address.";
  }
  if (valueMissing) {
    errorMessage = `Please enter ${fieldName}.`;
  }

  return cb(errorMessage, valid, element);
};

const checkSelect = (element, cb) => {
  const isValid = element.selectedIndex > 0;

  const { valid } = element.validity;

  let errorMessage = null;

  if (!valid) errorMessage = "Please select an option.";

  return cb(errorMessage, isValid, element);
};

const checkPasswords = (element, fields, cb) => {
  const passwords = fields
    .map(field => {
      return field.getElementsByClassName("form-control")[0];
    })
    .reduce((passwords, element) => {
      if (element.type === "password") passwords.push(element);
      return passwords;
    }, []);

  let errorMessage = null;
  let isValid = true;

  const { valid, tooShort, tooLong, valueMissing } = element.validity;

  if (passwords.length == 1) {
    if (tooShort || tooLong)
      errorMessage = `Password must be between ${element.minLength} and ${element.maxLength}`;
    if (valueMissing) errorMessage = "You have to enter a password.";
  } else if (passwords.length == 2) {
    if (element == passwords[0]) {
      if (tooShort || tooLong)
        errorMessage = `Password must be between ${element.minLength} and ${element.maxLength}`;
      if (valueMissing) errorMessage = "You have to enter a password.";
    } else if (element == passwords[1]) {
      const isMatched = passwords[0].value === passwords[1].value;

      if (valueMissing) errorMessage = "You have to confirm a password";
      if (!isMatched) errorMessage = "Passwords do not match.";

      isValid = valid && isMatched;
    }
  }
  return cb(errorMessage, isValid, element);
};

const validationCallback = (error, valid, element) => {
  if (!valid) {
    const parent = element.parentNode;
    const display = parent.getElementsByClassName("invalid-feedback")[0];
    display.innerHTML = error;
  }

  return valid;
};
