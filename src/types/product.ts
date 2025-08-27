export interface Product {
  id: string;
  name: string;
  images: string[];
  description: string;
  retailPrice: number;
  discountPrice?: number;
  variants: Array<{
    type: string;
    values: Array<{
      sku: string;
      value: string;
      stock: number;
    }>;
  }>;
  category: string;
  brand: string;
}
