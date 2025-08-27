import React from "react";
import { Link } from "react-router-dom";
import { type Product } from "../types/product";

interface ProductCardProps {
  product: Product;
}

const formatCurrency = (price: number) => {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const displayPrice = product.discountPrice || product.retailPrice;
  const originalPrice = product.discountPrice ? product.retailPrice : null;

  return (
    <Link to={`/produk/${product.id}`} className="group relative block rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden bg-white">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-100">
        <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-brand-secondary line-clamp-2 min-h-[3rem]">{product.name}</h3>
        <div className="mt-2 flex-y items-baseline justify-between">
          <p className="text-xl font-bold text-brand-secondary">{formatCurrency(displayPrice)}</p>
          {originalPrice && <p className="ml-2 text-sm text-gray-400 line-through">{formatCurrency(originalPrice)}</p>}
        </div>
        {product.discountPrice && <div className="absolute top-2 left-2 bg-brand-primary text-white text-xs font-bold px-2 py-1 rounded">Diskon!</div>}
      </div>
    </Link>
  );
};

export default ProductCard;
