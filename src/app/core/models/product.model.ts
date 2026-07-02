// ==========================================
// Product & Category Models
// ==========================================

export interface Category {
  id: string;
  name: string;
  icon: string;       // Material icon name
  color: string;      // Color accent for the category
  order: number;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  price: number;
  description: string;
  image: string;       // Material icon name (legacy)
  imageUrl?: string;   // URL de imagen del producto
  available: boolean;
  createdAt: Date;
}
