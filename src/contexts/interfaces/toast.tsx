import { FC, useCallback, useState } from "react";
import { v4 } from "uuid";
import { createContext } from "use-context-selector";

import { IToastProps } from "../../components/Toast";

interface IToastContext {
  toasts: IToastProps[];
  addToast(data: Omit<IToastProps, "id">): void;
  removeToast(id: string): void;
}

export const ToastContext = createContext<IToastContext>({} as IToastContext);

export const ToastProvider: FC = ({ children }) => {
  const [toasts, setToasts] = useState<IToastProps[]>([]);

  const addToast = useCallback(({ title, type, message }: IToastProps) => {
    const newToast = {
      id: v4(),
      title,
      type,
      message,
    };

    setToasts((oldState) => {
      return [...oldState, newToast];
    });
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((oldState) => {
      const updatedToasts = oldState.filter((toast) => toast.id !== id);

      return updatedToasts;
    });
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast, toasts }}>
      {children}
    </ToastContext.Provider>
  );
};
