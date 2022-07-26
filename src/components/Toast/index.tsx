import { FC } from "react";
import { useTransition } from "react-spring";

import { useToast } from "../../hooks/toast";

import "./styles.css";
import { ToastItem } from "./ToastItem";

export interface IToastProps {
  id: string;
  title: string;
  type: "error" | "success" | "info";
  message?: string;
}

const Toast: FC = () => {
  const { toasts } = useToast();
  const toastWithAnimation = useTransition(toasts, (toast) => toast.id, {
    from: { right: "-380px" },
    enter: { right: "0" },
    leave: { right: "-380px" },
  });

  if (toasts) {
    return (
      <div className="toast_container">
        {toastWithAnimation.map(({ item, key, props }) => (
          <ToastItem
            key={key}
            title={item.title}
            type={item.type}
            message={item.message}
            id={item.id}
            animatedStyles={props}
          />
        ))}
      </div>
    );
  }

  return <div />;
};

export { Toast };
