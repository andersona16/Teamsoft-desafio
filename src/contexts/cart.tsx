import { FC, ReactNode, useCallback, useState } from "react";
import { createContext } from 'use-context-selector';

interface IIngredient {
  id: number;
  name: string;
  value: number;
  quantity: number;
}

interface ICartItem {
  id: string;
  name: string;
  ingredients: Array<IIngredient>;
}

interface IAlert extends ICartItem {
  type: 'info' | 'danger';
}

export interface ICartContext {
  addItem(item: ICartItem | ICartItem[]): Promise<void>;
  removeItem(itemId: string): Promise<void>;
  removeAlert(): void;
  items: Array<ICartItem>;
  alert?: IAlert;
}

interface ICartContextProvider {
  children?: ReactNode;
}

export const CartContext = createContext<ICartContext>({} as ICartContext);

export const CartContextProvider: FC<ICartContextProvider> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Array<ICartItem>>([]);
  const [alert, setAlert] = useState<IAlert>();

  const removeAlert = useCallback(() => {
    setAlert(undefined);
  }, []);

  const handleAddItemsToCart = useCallback(async (item: ICartItem | ICartItem[]) => {
    if (Array.isArray(item)) {
      setCartItems(oldState => [...oldState, ...item]);
      const firstItem = item[0];
      setAlert({
        id: firstItem.id,
        name: firstItem.name,
        type: 'info',
        ingredients: firstItem.ingredients
      });
      return;
    }

    setCartItems(oldState => [...oldState, item]);
    setAlert({
      id: item.id,
      name: item.name,
      type: 'info',
      ingredients: item.ingredients
    });
  }, []);

  const handleRemoveItemsToCart = useCallback(async (itemId: string) => {
    setCartItems(oldState => {
      return oldState.filter(item => item.id !== itemId);
    });
  }, []);

  return (
    <CartContext.Provider
      value={{
        addItem: handleAddItemsToCart,
        removeItem: handleRemoveItemsToCart,
        items: cartItems,
        alert,
        removeAlert,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
