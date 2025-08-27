import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { type Product } from "../types/product";
import { clsx } from "clsx";

const formatCurrency = (price: number) => {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);
};

const ProductDetailSkeleton = () => (
  <div className="bg-brand-light min-h-screen font-outfit animate-pulse">
    <header className="bg-white/80 backdrop-blur-sm shadow-sm py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-[40px]"></div>
    </header>
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
        <div>
          <div className="aspect-w-1 aspect-h-1 w-full rounded-lg bg-gray-300"></div>
          <div className="mt-4 grid grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="aspect-w-1 aspect-h-1 w-full rounded-md bg-gray-300"></div>
            ))}
          </div>
        </div>
        <div className="space-y-6 pt-4">
          <div className="h-10 w-full bg-gray-300 rounded"></div>
          <div className="h-8 w-1/2 bg-gray-300 rounded"></div>
          <div className="h-16 w-full bg-gray-200 rounded"></div>
          <div className="mt-8 space-y-2">
            <div className="h-5 w-1/4 bg-gray-300 rounded"></div>
            <div className="h-16 w-full bg-gray-200 rounded"></div>
          </div>
          <div className="h-12 w-full bg-gray-400 rounded-lg mt-8"></div>
        </div>
      </div>
    </main>
  </div>
);

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      window.scrollTo(0, 0);
      try {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const productData = { id: docSnap.id, ...docSnap.data() } as Product;
          setProduct(productData);
          if (productData.images && productData.images.length > 0) {
            setSelectedImage(productData.images[0]);
          }
          const availableVariants = productData.variants[0]?.values.filter((v) => v.stock > 0);
          if (availableVariants?.length === 1) {
            setSelectedVariant(availableVariants[0].value);
          }
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) return <ProductDetailSkeleton />;
  if (!product)
    return (
      <div className="text-center py-20 bg-brand-light min-h-screen">
        <h2 className="text-2xl font-bold text-brand-secondary">Produk tidak ditemukan.</h2>
        <Link to="/katalog" className="mt-4 inline-block text-brand-primary hover:underline">
          Kembali ke Katalog
        </Link>
      </div>
    );

  const displayPrice = product.discountPrice || product.retailPrice;
  const originalPrice = product.discountPrice ? product.retailPrice : null;
  const waNumber = "6281210132385";
  let waMessage = `Halo Gudang Pakaian Dalam, saya tertarik dengan produk ${product.name}`;
  if (selectedVariant) {
    waMessage += `\nukuran: *${selectedVariant}*`;
  }
  waMessage += "\n\nApakah masih tersedia?";
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="bg-brand-light min-h-screen font-outfit text-brand-secondary">
      <header className="sticky top-0 z-20 bg-brand-primary backdrop-blur-sm shadow-sm ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
          <Link to="/katalog" className="flex items-center text-brand-secondary hover:text-brand-secondary group transition-colors">
            <span className="p-2 -ml-2 rounded-full group-hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </span>
            <h1 className="ml-1 text-xl font-bold tracking-tight text-brand-secondary">Detail Produk</h1>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
          <div className="flex flex-col-reverse sm:flex-col">
            <div className="mt-4 sm:mt-0 sm:mb-4 grid grid-cols-5 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={clsx(
                    "aspect-w-1 aspect-h-1 w-full rounded-md overflow-hidden bg-gray-100 focus:outline-none ring-2 ring-offset-2 transition-all",
                    selectedImage === image ? "ring-brand-primary" : "ring-transparent hover:opacity-80"
                  )}
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} className="h-full w-full object-cover object-center" />
                </button>
              ))}
            </div>
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100 shadow-lg">
              <img key={selectedImage} src={selectedImage} alt={product.name} className="h-full w-full object-cover object-center animate-fade-in" />
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{product.name}</h1>
            <div className="mt-4 flex items-baseline space-x-3">
              <p className="text-3xl tracking-tight text-brand-secondary font-bold">{formatCurrency(displayPrice)}</p>
              {originalPrice && <p className="text-xl text-gray-400 line-through">{formatCurrency(originalPrice)}</p>}
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6">
              <h3 className="text-md font-semibold text-gray-900">{product.variants[0]?.type || "Varian"}</h3>
              <div className="mt-3 flex flex-wrap gap-3">
                {product.variants[0]?.values.map((variant) => (
                  <button
                    key={variant.sku}
                    onClick={() => setSelectedVariant(variant.value)}
                    disabled={variant.stock === 0}
                    className={clsx(
                      "px-5 py-2 border rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary",
                      selectedVariant === variant.value ? "bg-brand-secondary text-white border-brand-secondary" : "bg-white text-gray-900 border-gray-300",
                      variant.stock === 0 ? "bg-gray-100 text-gray-400 cursor-not-allowed line-through" : "hover:bg-gray-50"
                    )}
                  >
                    {variant.value}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 border-t border-gray-200">
              <button onClick={() => setIsDescriptionOpen(!isDescriptionOpen)} className="flex justify-between items-center w-full pt-6 text-left">
                <h3 className="text-md font-semibold text-gray-900">Deskripsi</h3>
                <svg xmlns="http://www.w3.org/2000/svg" className={clsx("h-5 w-5 transition-transform", isDescriptionOpen && "rotate-180")} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className={clsx("grid overflow-hidden transition-all duration-500 ease-in-out", isDescriptionOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                <div className="overflow-hidden">
                  <p className="pt-3 pb-6 text-base text-gray-600 whitespace-pre-wrap leading-relaxed">{product.description}</p>
                </div>
              </div>
            </div>

            <a
              href={selectedVariant ? waLink : "#"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => !selectedVariant && e.preventDefault()}
              className={clsx(
                "mt-8 w-full rounded-lg px-8 py-4 text-base font-bold text-white shadow-lg transition-all text-center flex items-center justify-center gap-3",
                !selectedVariant ? "bg-gray-400 cursor-not-allowed" : "bg-brand-secondary hover:bg-brand-secondary/90 hover:-translate-y-0.5"
              )}
            >
              {selectedVariant ? "Hubungi via WhatsApp" : "Pilih Ukuran Dahulu"}
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetailPage;
