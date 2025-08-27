import React, { useState, useEffect, useCallback } from "react";
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import { db } from "../Firebase";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { clsx } from "clsx";

interface Product {
  id: string;
  name: string;
  images: string[];
  retailPrice: number;
  discountPrice?: number;
  description: string;
  variants: Array<{ type: string; values: Array<{ value: string }> }>;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

const SkeletonCard: React.FC = () => (
  <div className="rounded-lg bg-white p-4 shadow-sm animate-pulse">
    <div className="aspect-square w-full rounded-md bg-gray-200"></div>
    <div className="mt-3 h-4 w-5/6 rounded bg-gray-200"></div>
    <div className="mt-1 h-3 w-2/5 rounded bg-gray-200"></div>
    <div className="mt-4 h-5 w-3/5 rounded bg-gray-200"></div>
    <div className="mt-1 h-3 w-1/3 rounded bg-gray-200"></div>
  </div>
);

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const hasDiscount = product.discountPrice && product.discountPrice < product.retailPrice;
  const discountPercentage = hasDiscount ? Math.round(((product.retailPrice - product.discountPrice!) / product.retailPrice) * 100) : 0;
  const sizes = product.variants
    .find((v) => v.type === "Ukuran")
    ?.values.map((val) => val.value)
    .join(" - ");

  return (
    <Link to={`/produk/${product.id}`} className="group block h-full rounded-lg bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative overflow-hidden rounded-md">
        <img src={product.images[0]} alt={product.name} className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        {hasDiscount && <span className="absolute top-3 left-3 z-10 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">-{discountPercentage}%</span>}
      </div>
      <div className="mt-4">
        <h3 className="text-base font-semibold text-brand-secondary line-clamp-2 h-12">{product.name}</h3>
        {sizes && <p className="text-sm text-gray-500 mt-1">{sizes}</p>}
        <p className="text-sm text-gray-600 mt-2 line-clamp-2 h-10">{product.description}</p>
        <div className="mt-4 flex flex-col">
          {hasDiscount && <p className="text-sm text-gray-400 line-through">{formatCurrency(product.retailPrice)}</p>}
          <p className={clsx("font-bold text-xl", hasDiscount ? "text-red-600" : "text-brand-secondary")}>{formatCurrency(hasDiscount ? product.discountPrice! : product.retailPrice)}</p>
        </div>
      </div>
    </Link>
  );
};

interface ProductCatalogProps {
  id: string;
  innerRef: React.Ref<HTMLElement>;
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({ id, innerRef }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { ref: viewRef, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const setRefs = useCallback(
    (node: HTMLElement | null) => {
      viewRef(node);
      if (typeof innerRef === "function") innerRef(node);
      else if (innerRef) innerRef.current = node;
    },
    [innerRef, viewRef]
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, "products"), where("status", "==", "active"), orderBy("createdAt", "desc"), limit(8));
        const querySnapshot = await getDocs(q);
        const productsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Product);
        setProducts(productsData);
      } catch (err) {
        console.error("Error fetching products: ", err);
        setError("Gagal memuat produk.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section ref={setRefs} id={id} className="bg-brand-light py-20 md:py-28 font-outfit">
      <div className="container mx-auto px-4">
        <div className={clsx("text-center mb-12 md:mb-16 transition-all duration-700", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-secondary">Katalog Produk</h2>
          <p className="text-lg text-brand-secondary/80 mt-2">Temukan koleksi terbaru dan terlaris kami.</p>
        </div>

        {error && <div className="text-center w-full py-10 text-red-600">{error}</div>}

        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {(loading ? [...Array(8)] : products).map((product, index) => (
            <div key={loading ? `skeleton-${index}` : product.id} className={clsx("transition-all duration-500", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5")} style={{ transitionDelay: `${index * 100}ms` }}>
              {loading ? <SkeletonCard /> : <ProductCard product={product as Product} />}
            </div>
          ))}
        </div>

        {!loading && !error && products.length > 0 && (
          <div className="mt-16 text-center">
            <Link to="/katalog" className="group inline-block bg-brand-secondary text-white font-bold py-3 px-8 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-opacity-90">
              Selengkapnya
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-2 ml-2">&rarr;</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductCatalog;
