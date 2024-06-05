import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  text: string;
  buttonType?: "primary" | "secondary";
}

function Button(props: ButtonProps) {
  const { icon, text, className = "", ...rest } = props;

  return (
    <button
      role="button"
      className={`button-base-style ${className}`}
      {...rest}
    >
      {icon ? <div className="button-inner-icon">{icon}</div> : null}
      <div className="button-inner-text">{text}</div>
    </button>
  );
}

export default Button;
