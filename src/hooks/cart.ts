import { useContextSelector } from 'use-context-selector';
import { ICartContext, CartContext } from '../contexts/cart';

export function useCart(): ICartContext {
  const addItem = useContextSelector(
    CartContext,
    cartContext => cartContext.addItem,
  );
  const removeItem = useContextSelector(
    CartContext,
    cartContext => cartContext.removeItem,
  );
  const items = useContextSelector(
    CartContext,
    cartContext => cartContext.items,
  );
  const alert = useContextSelector(
    CartContext,
    cartContext => cartContext.alert,
  );
  const removeAlert = useContextSelector(
    CartContext,
    cartContext => cartContext.removeAlert,
  );

  return {
    addItem,
    removeItem,
    items,
    alert,
    removeAlert,
  };
}
