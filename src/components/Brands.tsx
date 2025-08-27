import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../Firebase";
import { useInView } from "react-intersection-observer";
import { clsx } from "clsx";

interface Brand {
  id: string;
  name: string;
  logoUrl: string;
  isActive: boolean;
}

const SkeletonLoader: React.FC = () => (
  <div className="flex animate-marquee-skeleton whitespace-nowrap">
    {[...Array(14)].map((_, i) => (
      <div key={i} className="mx-8 flex-shrink-0">
        <div className="h-24 w-24 rounded-full bg-gray-200"></div>
      </div>
    ))}
  </div>
);

interface BrandsProps {
  id: string;
  innerRef: React.Ref<HTMLElement>;
}

const Brands: React.FC<BrandsProps> = ({ id, innerRef }) => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { ref: viewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const setRefs = React.useCallback(
    (node: HTMLElement | null) => {
      viewRef(node);
      if (typeof innerRef === "function") {
        innerRef(node);
      } else if (innerRef) {
        innerRef.current = node;
      }
    },
    [innerRef, viewRef]
  );

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const q = query(collection(db, "brands"), where("isActive", "==", true), orderBy("name", "asc"));
        const querySnapshot = await getDocs(q);
        const brandsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Brand);
        setBrands(brandsData);
      } catch (err) {
        console.error("Error fetching brands: ", err);
        setError("Gagal memuat daftar merek.");
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const duplicatedBrands = [...brands, ...brands];

  return (
    <section ref={setRefs} id={id} className="bg-brand-light py-20 md:py-28 font-outfit text-brand-secondary overflow-hidden">
      <div className="container mx-auto px-4">
        <div className={clsx("text-center mb-12 md:mb-16 transition-all duration-700", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
          <h2 className="text-3xl md:text-4xl font-bold">Tersedia Berbagai Macam Merek</h2>
          <p className="text-lg text-brand-secondary/80 mt-2">Kami hanya menyediakan produk original dari merek terpercaya.</p>
        </div>
      </div>

      <div className="relative w-full">
        <div className="absolute top-0 left-0 z-10 h-full w-16 bg-gradient-to-r from-brand-light to-transparent"></div>
        <div className="absolute top-0 right-0 z-10 h-full w-16 bg-gradient-to-l from-brand-light to-transparent"></div>

        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <div className="group-hover:[animation-play-state:paused]">
            {loading ? (
              <SkeletonLoader />
            ) : error ? (
              <div className="text-center w-full py-10 text-red-600">{error}</div>
            ) : (
              <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]">
                {duplicatedBrands.map((brand, index) => (
                  <div key={`${brand.id}-${index}`} className="mx-8 flex-shrink-0 flex items-center justify-center">
                    <a className="transition-all duration-100 hover:scale-110 grayscale hover:grayscale-0 opacity-70 hover:opacity-100">
                      <img src={brand.logoUrl} alt={brand.name} className="h-24 w-auto max-w-[150px] object-contain" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;
