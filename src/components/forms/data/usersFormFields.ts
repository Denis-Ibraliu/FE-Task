import { InputProps } from "../../ui-components/Input";

const usersFormFields: InputProps[] = [
  {
    field: "name",
    label: "Full Name",
    placeholder: "Full Name",
    validator(input) {
      if (input.length < 5) {
        return false;
      }

      return true;
    },
    errorMessage: "Min. length is 5",
  },
  {
    field: "address",
    label: "Address",
    placeholder: "Address",
  },
  {
    field: "username",
    label: "Username",
    placeholder: "Username",
  },
  {
    field: "city",
    label: "City",
    placeholder: "City",
  },
  {
    field: "email",
    label: "Email",
    placeholder: "Email",
    validationRule: "email",
    errorMessage: "Input is not a valid email",
  },
  {
    field: "zipcode",
    label: "Zip Code",
    placeholder: "Zip Code",
    validator(input: string) {
      if (!input) {
        return false;
      }

      if (!isNaN(+input)) {
        return input.length <= 5;
      } else {
        return input.match(/\d{5}-\d{4}/g)?.[0] === input;
      }
    },
    errorMessage: "Zip code in not valid",
  },
  {
    field: "phone",
    label: "Phone Nr",
    validationRule: "phone",
    placeholder: "Phone Nr",
    errorMessage: "Phone nr is not valid",
  },
];

export default usersFormFields;
