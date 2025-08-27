import React from "react";
import { useInView } from "react-intersection-observer";
import { clsx } from "clsx";

const ExperienceIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const QualityIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);
const DistributionIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1zM3 11h10M16 16l4-4h-2V6h-2v6h-2l4 4z" />
  </svg>
);

const features = [
  {
    Icon: ExperienceIcon,
    title: "20+ Tahun Pengalaman",
    description: "Kami telah menjadi distributor terpercaya di industri pakaian dalam selama lebih dari dua dekade.",
  },
  {
    Icon: QualityIcon,
    title: "Produk 100% Original",
    description: "Kami menjamin keaslian setiap produk yang kami tawarkan, langsung dari merek-merek ternama.",
  },
  {
    Icon: DistributionIcon,
    title: "Distribusi Nasional",
    description: "Melayani pelanggan dan mitra bisnis di seluruh penjuru Indonesia dengan layanan yang handal.",
  },
];

interface AboutUsProps {
  id: string;
  innerRef: React.Ref<HTMLElement>;
}

const AboutUs: React.FC<AboutUsProps> = ({ id, innerRef }) => {
  const aboutImageUrl = "../src/assets/hero-5.png";

  const { ref: viewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
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

  return (
    <section ref={setRefs} id={id} className="bg-brand-light py-20 md:py-32 font-outfit overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className={clsx("text-4xl md:text-5xl font-bold text-brand-secondary mb-4 transition-all duration-700", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>Penyedia Pakaian Dalam Terpercaya Anda</h2>
          <p className={clsx("text-lg text-brand-secondary/80 [text-wrap:balance] transition-all duration-700 delay-150", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
            Berkomitmen pada kualitas dan keaslian, kami hadir sebagai solusi utama untuk kebutuhan pakaian dalam multi-brand di seluruh Indonesia.
          </p>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-0">
          <div className={clsx("relative w-full max-w-lg mx-auto lg:max-w-none transition-all duration-1000", inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12")}>
            <div className="absolute -top-4 -left-4 w-full h-full bg-brand-primary/20 rounded-2xl transform rotate-[-3deg]"></div>
            <img src={aboutImageUrl} alt="Gudang Pakaian Dalam" className="relative rounded-2xl shadow-2xl w-full h-full object-cover aspect-[4/3]" />
          </div>

          <div className={clsx("relative lg:-ml-24 z-10 transition-all duration-1000 delay-200", inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12")}>
            <div className="bg-brand-light/80 backdrop-blur-md p-8 md:p-12 rounded-2xl shadow-lg">
              <p className="text-lg leading-relaxed text-brand-secondary/90 mb-8 [text-wrap:balance]">
                <strong className="text-brand-secondary">Gudang Pakaian Dalam</strong> adalah distributor resmi berbagai merek pakaian dalam berkualitas tinggi. Dengan fondasi yang dibangun di atas kepercayaan dan pengalaman, kami bangga
                menjadi mitra andalan Anda.
              </p>

              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={feature.title} className={clsx("flex items-start gap-4 transition-all duration-700", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5")} style={{ transitionDelay: `${200 + index * 150}ms` }}>
                    <div className="flex-shrink-0 bg-brand-primary/80 text-brand-secondary p-3 rounded-full">
                      <feature.Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-secondary text-lg">{feature.title}</h3>
                      <p className="text-brand-secondary/80">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
