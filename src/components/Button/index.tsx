import React, { ButtonHTMLAttributes, ComponentType, forwardRef } from "react";
import { IconBaseProps } from "react-icons";

import "./styles.css";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ComponentType<IconBaseProps>;
  children?: React.ReactNode;
  height?: string;
  onClick?: () => void;
  width?: string;
}

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  ({ icon: Icon, height, width, children, onClick }, ref) => {
    return (
      <button
        className="ButtonCustom"
        onClick={onClick}
        style={{
          height,
          width,
        }}
      >
        <>
          {Icon && (
            <Icon
              size={24}
              style={
                Icon && !children ? { marginRight: 0 } : { marginRight: 8 }
              }
            />
          )}
          {children}
        </>
      </button>
    );
  }
);

export default Button;
