import React, { ButtonHTMLAttributes } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconPath?: string;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  iconPath,
  className,
  children,
  ...rest
}) => {
  return (
    <button {...rest} className={`buttonStyle ${className}`}>
      {iconPath && <img src={iconPath} alt="icon" />}
      {children && children}
    </button>
  );
};

export default IconButton;
