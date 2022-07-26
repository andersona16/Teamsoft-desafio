export interface IIngredient {
  itens: Array<{ id: number; nm_item: string; vl_item: number }>;
  group: string;
}

export interface IProduct {
  id: string;
  description: string;
  nm_product: string;
  vl_discount: number;
  vl_price: number;
  ingredients: Array<IIngredient>;
}
