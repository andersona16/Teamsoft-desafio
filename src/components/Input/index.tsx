import { ComponentType, FC, InputHTMLAttributes } from "react";

import "./styles.css";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  name?: string;
  type?: string;
  height?: string;
  width?: string;
  children?: string;
  title?: string;
}

const Input: FC<IInputProps> = ({ height, width, children, placeholder }) => {
  return (
    <div className="container">
      <label>{children}</label>
      <input style={{ height, width }} placeholder={placeholder} />
    </div>
  );
};

export { Input };
