import { FC, useEffect, useRef } from "react";
import { FiCheckCircle, FiInfo, FiXCircle } from "react-icons/fi";
import { AnimatedValue } from "react-spring";

import { useToast } from "../../../hooks/toast";

export interface IToastProps {
  id: string;
  title: string;
  type: "error" | "success" | "info";
  message?: string;
  animatedStyles: AnimatedValue<React.CSSProperties>;
}

const iconTypes = {
  error: <FiXCircle size={25} />,
  success: <FiCheckCircle size={25} />,
  info: <FiInfo size={25} />,
};

const ToastItem: FC<IToastProps> = ({
  title,
  type,
  message,
  id,
  animatedStyles,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => removeToast(id), 6000);

    containerRef.current?.addEventListener("mouseenter", () =>
      clearInterval(timer)
    );

    containerRef.current?.addEventListener("mouseleave", () =>
      setTimeout(() => removeToast(id), 6000)
    );

    return () => clearInterval(timer);
  }, [id, removeToast]);

  return (
    <div>
      {iconTypes[type]}

      <div>
        <strong>{title}</strong>

        <p style={message ? { marginTop: 6 } : { marginTop: 0 }}>{message}</p>
      </div>

      <button
        type="button"
        onClick={() => {
          removeToast(id);
        }}
      >
        <FiXCircle size={18} />
      </button>
    </div>
  );
};

export { ToastItem };
