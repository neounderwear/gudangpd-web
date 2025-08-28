import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { clsx } from "clsx";
import mainImage from "../assets/hero-1.jpg";
import subImage1 from "../assets/hero-2.jpg";
import subImage2 from "../assets/hero-3.jpg";

interface HeroProps {
  id: string;
  innerRef: React.Ref<HTMLElement>;
}

const Hero: React.FC<HeroProps> = ({ id, innerRef }) => {
  const [scrollY, setScrollY] = useState(0);
  const { ref: viewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const combinedRef = (node: HTMLElement | null) => {
    if (typeof innerRef === "function") innerRef(node);
    else if (innerRef) (innerRef as React.MutableRefObject<HTMLElement | null>).current = node;
    viewRef(node);
  };

  return (
    <section id={id} ref={combinedRef} className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] bg-brand-light to-white font-outfit text-gray-800 overflow-hidden min-h-[calc(100vh-80px)] flex items-center">
      <div className="container mx-auto px-4 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
        <div className="flex flex-col justify-center text-center md:text-left">
          <h1 className={clsx("text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-brand-secondary transition-all duration-700", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5")}>Gudang Pakaian Dalam</h1>
          <p className={clsx("text-lg md:text-xl mb-8 max-w-xl mx-auto md:mx-0 text-gray-600 transition-all duration-700 delay-200", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5")}>
            Menyediakan produk original multi-brand berkualitas untuk pria, wanita, dan anak-anak di seluruh Indonesia. Produk 100% Original
          </p>
          <div className={clsx("flex flex-col sm:flex-row gap-4 max-w-md mx-auto md:mx-0 transition-all duration-700 delay-300", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5")}>
            <a target="_blank" href="https://api.whatsapp.com/send/?phone=6281210132385&text=Halo+Gudang+Pakaian+Dalam%2C+saya+mau+tanya+soal+produknya&type=phone_number&app_absent=0">
              {" "}
              <button className="px-6 py-3 bg-brand-secondary text-white font-semibold rounded-lg hover:bg-brand-primary transition-colors duration-200 shadow-md flex items-center justify-center gap-2">
                Hubungi Kami
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </a>
          </div>
        </div>

        <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full">
          <div className={clsx("absolute w-[70%] h-[80%] top-[10%] left-[15%] z-10 transition-all duration-1000", inView ? "opacity-100 scale-100" : "opacity-0 scale-90")} style={{ transform: `translateY(${scrollY * -0.1}px)` }}>
            <img src={mainImage} alt="Stok gudang pakaian dalam" className="w-full h-full object-cover rounded-3xl shadow-2xl" />
          </div>

          <div
            className={clsx("absolute w-[35%] h-[40%] top-[5%] left-0 z-20 transition-all duration-1000 delay-200", inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5")}
            style={{ transform: `translateY(${scrollY * 0.15}px)` }}
          >
            <img src={subImage1} alt="Detail produk 1" className="w-full h-full object-cover rounded-2xl shadow-lg" />
          </div>

          <div
            className={clsx("absolute w-[40%] h-[45%] bottom-[5%] right-0 z-0 transition-all duration-1000 delay-300", inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5")}
            style={{ transform: `translateY(${scrollY * 0.08}px)` }}
          >
            <img src={subImage2} alt="Detail produk 2" className="w-full h-full object-cover rounded-2xl shadow-lg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
