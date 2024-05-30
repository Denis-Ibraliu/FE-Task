import React, { InputHTMLAttributes } from "react";

interface FormItemProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FormItem: React.FC<FormItemProps> = ({
  label,
  error,
  children,
  ...rest
}) => {
  return (
    <div className="formItem">
      <label>{label}</label>
      <input {...rest} />
      {error && <div className="errorMessage">{error}</div>}
    </div>
  );
};

export default FormItem;
