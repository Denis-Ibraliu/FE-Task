import { FormValues } from "./types";

export const validateForm = (formValues: FormValues) => {
  let hasError = false;
  let errorValues = {
    fullName: "",
    username: "",
    email: "",
    phoneNr: "",
    address: "",
    city: "",
    zipCode: "",
  };

  Object.entries(formValues).forEach(([key, value]) => {
    switch (key as keyof FormValues) {
      case "fullName":
        const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        if (!formValues.fullName) {
          errorValues.fullName = "Full Name is required";
          hasError = true;
        } else if (!nameRegex.test(value)) {
          errorValues.fullName = "Invalid full name format";
          hasError = true;
        }
        break;
      case "username":
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        if (!value) {
          errorValues.username = "Username is required";
          hasError = true;
        } else if (!usernameRegex.test(value)) {
          errorValues.username = "Invalid username format";
          hasError = true;
        }
        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          errorValues.email = "Email is required";
          hasError = true;
        } else if (!emailRegex.test(value)) {
          errorValues.email = "Invalid Email format";
          hasError = true;
        }
        break;
      case "phoneNr":
        const phoneNrRegex = /^\+?[0-9]{8,}$/;
        if (!value) {
          errorValues.phoneNr = "Phone number is required";
          hasError = true;
        } else if (!phoneNrRegex.test(value)) {
          errorValues.phoneNr = "Invalid phone number format";
          hasError = true;
        }
        break;
      case "address":
        if (!value) {
          errorValues.address = "Address is required";
          hasError = true;
        }
        break;
      case "city":
        if (!value) {
          errorValues.city = "City is required";
          hasError = true;
        }
        break;
      case "zipCode":
        const zipCodeRegex = /^\d{4}(?:[-\s]\d{4})?$/;
        if (!value) {
          errorValues.zipCode = "Zip Code is required";
          hasError = true;
        } else if (!zipCodeRegex.test(value)) {
          errorValues.zipCode = "Invalid zip code format";
          hasError = true;
        }
        break;
    }
  });

  return { hasError, errorValues };
};
