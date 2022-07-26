import { useContextSelector } from 'use-context-selector';

import { IToastProps } from '../components/Toast/';

import { ToastContext } from '../contexts/interfaces/toast';

interface IToastContext {
  toasts: IToastProps[];
  addToast(data: Omit<IToastProps, 'id'>): void;
  removeToast(id: string): void;
}

export function useToast(): IToastContext {
  const addToast = useContextSelector(
    ToastContext,
    toastContext => toastContext.addToast,
  );
  const removeToast = useContextSelector(
    ToastContext,
    toastContext => toastContext.removeToast,
  );
  const toasts = useContextSelector(
    ToastContext,
    toastContext => toastContext.toasts,
  );

  return {
    addToast,
    removeToast,
    toasts,
  };
}
