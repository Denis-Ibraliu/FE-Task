import validator from "validator";

export function emailValidator(input: string): boolean {
  if (!input) {
    return false;
  }

  return validator.isEmail(input);
}

export function passwordValidator(input: string): boolean {
  return validator.isStrongPassword(input);
}

export function phoneValidator(input: string): boolean {
  return validator.isMobilePhone(input);
}

export function webValidator(input: string) {
  return validator.isURL(input);
}

export function numberValidator(input: string) {
  return !isNaN(+input);
}
