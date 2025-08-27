import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { clsx } from "clsx";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../Firebase";
import { type Product } from "../types/product";
import ProductCard from "../components/ProductCard";

// const formatCurrency = (price: number) => {
//   return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);
// };

const ProductGridSkeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 animate-pulse">
    {Array.from({ length: 15 }).map((_, i) => (
      <div key={i} className="rounded-lg shadow-sm overflow-hidden bg-gray-200 h-80 flex flex-col">
        <div className="w-full h-2/3 bg-gray-300"></div>
        <div className="p-4 flex-grow flex flex-col justify-between">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    ))}
  </div>
);

const ProductCatalogPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name-asc");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productsCollection = collection(db, "products");
        const q = query(productsCollection, orderBy("name", "asc"));
        const querySnapshot = await getDocs(q);
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setProducts(productsData);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Gagal memuat produk. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (searchTerm) {
      result = result.filter(
        (product) =>
          (product.name ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
          (product.description ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
          (product.brand ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
          (product.category ?? "").toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortOption) {
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-asc":
        result.sort((a, b) => (a.discountPrice || a.retailPrice) - (b.discountPrice || b.retailPrice));
        break;
      case "price-desc":
        result.sort((a, b) => (b.discountPrice || b.retailPrice) - (a.discountPrice || a.retailPrice));
        break;
      default:
        break;
    }

    return result;
  }, [products, searchTerm, sortOption]);

  return (
    <div className="bg-brand-light min-h-screen font-outfit text-brand-secondary">
      <header className="sticky top-0 z-20 bg-brand-primary backdrop-blur-sm shadow-sm py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center">
            <Link to="/" className="text-brand-secondary hover:text-gray-900 p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="ml-2 text-xl md:text-2xl font-bold tracking-tight text-brand-secondary">Katalog Produk</h1>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative" ref={sortRef}>
              <button
                type="button"
                className="inline-flex justify-center items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                onClick={() => setIsSortOpen(!isSortOpen)}
              >
                Sort
                <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </button>
              {isSortOpen && (
                <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <button
                      type="button"
                      onClick={() => {
                        setSortOption("name-asc");
                        setIsSortOpen(false);
                      }}
                      className={clsx("block px-4 py-2 text-sm w-full text-left", sortOption === "name-asc" ? "bg-brand-primary text-white" : "text-gray-700 hover:bg-gray-100")}
                    >
                      Nama A-Z
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSortOption("name-desc");
                        setIsSortOpen(false);
                      }}
                      className={clsx("block px-4 py-2 text-sm w-full text-left", sortOption === "name-desc" ? "bg-brand-primary text-white" : "text-gray-700 hover:bg-gray-100")}
                    >
                      Nama Z-A
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSortOption("price-asc");
                        setIsSortOpen(false);
                      }}
                      className={clsx("block px-4 py-2 text-sm w-full text-left", sortOption === "price-asc" ? "bg-brand-primary text-white" : "text-gray-700 hover:bg-gray-100")}
                    >
                      Harga Termurah
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSortOption("price-desc");
                        setIsSortOpen(false);
                      }}
                      className={clsx("block px-4 py-2 text-sm w-full text-left", sortOption === "price-desc" ? "bg-brand-primary text-white" : "text-gray-700 hover:bg-gray-100")}
                    >
                      Harga Termahal
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="relative flex-grow sm:flex-grow-0">
              <input
                type="text"
                placeholder="Cari produk..."
                className="w-full sm:w-60 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all pr-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button type="button" onClick={() => setSearchTerm("")} className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          </form>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {loading ? (
          <ProductGridSkeleton />
        ) : error ? (
          <div className="text-center py-20 text-red-600 text-lg">{error}</div>
        ) : filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-600 text-lg">Tidak ada produk yang cocok dengan pencarian Anda.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductCatalogPage;
