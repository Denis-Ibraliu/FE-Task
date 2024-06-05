import { ChangeEvent, useState, useEffect, useRef, useCallback } from "react";
import {
  emailValidator,
  numberValidator,
  passwordValidator,
  phoneValidator,
  webValidator,
} from "../../utils";

type ValidationRules = "email" | "password" | "phone" | "url" | "number";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  validationRule?: ValidationRules;
  validator?: (input: string) => boolean;
  defaultValue?: string;
  errorMessage?: string;
  onError?: () => unknown;
  field: string;
  label?: string;
  required?: boolean;
  onErrorClear?: () => unknown;
}

const defaultValidators: Record<ValidationRules, (input: string) => boolean> = {
  email: emailValidator,
  password: passwordValidator,
  phone: phoneValidator,
  url: webValidator,
  number: numberValidator,
};

function Input(props: InputProps) {
  const {
    className = "",
    onChange,
    validator,
    validationRule,
    onError,
    field,
    defaultValue,
    label,
    required = true,
    onErrorClear,
    errorMessage: proppedMessage,
    ...rest
  } = props;

  const [hasError, setHasError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const doesPass = useCallback(
    (input: string) => {
      if (validator) {
        return validator(input);
      } else if (validationRule) {
        return defaultValidators[validationRule](input);
      }

      return true;
    },
    [validator, validationRule]
  );

  useEffect(() => {
    if (defaultValue && inputRef.current) {
      inputRef.current.value = defaultValue;
      const passes = doesPass(defaultValue);
      if (!passes) {
        setHasError(true);
        onError && onError();
      }
    }
  }, [doesPass]);

  function handleChangeEvent(ev: ChangeEvent<HTMLInputElement>) {
    const input = ev.target.value;
    if (onChange) {
      onChange(ev);
    }

    if (!input && required) {
      setHasError(true);
      onError && onError();

      return;
    }

    const passes = doesPass(input);

    if (!passes !== hasError) {
      setHasError(!passes);

      if (!passes && onError) {
        onError();
      }
    }

    if (passes && onErrorClear) {
      onErrorClear();
    }
  }

  const errorMessage = proppedMessage ? proppedMessage : label + " is required";

  return (
    <div
      className={`base-input-container ${className} ${
        hasError ? "base-input-error" : ""
      }`}
    >
      {label ? (
        <label className="base-input-label" htmlFor={field}>
          {label}
        </label>
      ) : null}
      <input
        className="base-form-input"
        onChange={handleChangeEvent}
        id={field}
        name={field}
        ref={inputRef}
        {...rest}
      ></input>
      {hasError && errorMessage ? (
        <span className="input-error-message">*{errorMessage}</span>
      ) : null}
    </div>
  );
}

export default Input;
