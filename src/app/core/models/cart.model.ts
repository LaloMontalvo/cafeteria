// ==========================================
// Cart Model — Modelo de Carrito de Compras
// ==========================================

export interface CartItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  notes: string;
  options: string[];      // e.g. "Sin azúcar", "Leche deslactosada"
  image: string;
}

export interface CartSummary {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  itemCount: number;
}
