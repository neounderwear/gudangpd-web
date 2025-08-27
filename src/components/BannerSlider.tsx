import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../Firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectCreative, Parallax } from "swiper/modules";

const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);
const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

interface Banner {
  id: string;
  name: string;
  photoUrl: string;
  link?: string;
  isActive: boolean;
}

const SkeletonLoader: React.FC = () => (
  <div className="w-full max-w-7xl mx-auto py-12 px-4">
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gray-200">
      <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </div>
  </div>
);

const BannerSlider: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const q = query(collection(db, "banners"), where("isActive", "==", true));
        const querySnapshot = await getDocs(q);
        const bannersData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Banner);
        setBanners(bannersData);
      } catch (err) {
        console.error("Error fetching banners: ", err);
        setError("Gagal memuat banner. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  if (loading) return <SkeletonLoader />;

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 bg-red-50 text-red-700 rounded-2xl w-full max-w-7xl mx-auto py-12 px-4">
        <p>{error}</p>
      </div>
    );
  }

  if (banners.length === 0) return null;

  return (
    <section className="w-full bg-brand-light py-12">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="relative group">
          <Swiper
            style={
              {
                "--swiper-pagination-color": "#3d2c1d",
                "--swiper-pagination-progressbar-size": "6px",
                "--swiper-navigation-color": "#FFFFFF",
              } as React.CSSProperties
            }
            modules={[Autoplay, Pagination, Navigation, EffectCreative, Parallax]}
            grabCursor={true}
            effect={"creative"}
            creativeEffect={{
              prev: {
                shadow: true,
                translate: ["-20%", 0, -1],
              },
              next: {
                translate: ["100%", 0, 0],
              },
            }}
            parallax={true}
            speed={1000}
            loop={banners.length > 1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ type: "progressbar", clickable: true }}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            className="w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl"
          >
            {banners.map((banner) => (
              <SwiperSlide key={banner.id}>
                <div className="absolute inset-0 h-full w-full" data-swiper-parallax="-23%">
                  <a href={banner.link || "#"} target={banner.link ? "_blank" : "_self"} rel="noopener noreferrer" className="block w-full h-full">
                    <img src={banner.photoUrl} alt={banner.name} className="w-full h-full object-cover scale-125" />
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="swiper-button-prev-custom absolute top-1/2 left-3 md:left-5 -translate-y-1/2 z-10 cursor-pointer p-3 bg-white/10 backdrop-blur-sm rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-white/20 hover:scale-110 active:scale-100">
            <ChevronLeftIcon className="w-6 h-6 md:w-8 md:h-8" />
          </div>
          <div className="swiper-button-next-custom absolute top-1/2 right-3 md:right-5 -translate-y-1/2 z-10 cursor-pointer p-3 bg-white/10 backdrop-blur-sm rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-white/20 hover:scale-110 active:scale-100">
            <ChevronRightIcon className="w-6 h-6 md:w-8 md:h-8" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSlider;
