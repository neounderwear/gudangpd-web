import React from "react";
import { useInView } from "react-intersection-observer";
import { clsx } from "clsx";

import testimony1 from "../assets/testimonials/testimony-1.png";
import testimony2 from "../assets/testimonials/testimony-2.png";
import testimony3 from "../assets/testimonials/testimony-3.png";
import testimony4 from "../assets/testimonials/testimony-4.png";
import testimony5 from "../assets/testimonials/testimony-5.png";
import testimony6 from "../assets/testimonials/testimony-6.png";
import testimony7 from "../assets/testimonials/testimony-7.png";
import testimony8 from "../assets/testimonials/testimony-8.png";
import testimony9 from "../assets/testimonials/testimony-9.png";
import testimony10 from "../assets/testimonials/testimony-10.png";

const testimonialsData = [
  { id: 1, imageUrl: testimony1, alt: "Testimoni Pelanggan 1" },
  { id: 2, imageUrl: testimony2, alt: "Testimoni Pelanggan 2" },
  { id: 3, imageUrl: testimony3, alt: "Testimoni Pelanggan 3" },
  { id: 4, imageUrl: testimony4, alt: "Testimoni Pelanggan 4" },
  { id: 5, imageUrl: testimony5, alt: "Testimoni Pelanggan 5" },
  { id: 6, imageUrl: testimony6, alt: "Testimoni Pelanggan 6" },
  { id: 7, imageUrl: testimony7, alt: "Testimoni Pelanggan 7" },
  { id: 8, imageUrl: testimony8, alt: "Testimoni Pelanggan 8" },
  { id: 9, imageUrl: testimony9, alt: "Testimoni Pelanggan 9" },
  { id: 10, imageUrl: testimony10, alt: "Testimoni Pelanggan 10" },
];

interface TestimonialsProps {
  id: string;
  innerRef: React.Ref<HTMLElement>;
}

const Testimonials: React.FC<TestimonialsProps> = ({ id, innerRef }) => {
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

  const duplicatedTestimonials = [...testimonialsData, ...testimonialsData];

  return (
    <section ref={setRefs} id={id} className="bg-brand-light py-20 md:py-28 font-outfit overflow-hidden">
      <div className="container mx-auto">
        <div className={clsx("text-center mb-12 md:mb-16 transition-all duration-700", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-secondary">Testimoni Pelanggan</h2>
          <p className="text-lg text-brand-secondary/80 mt-2">Apa kata mereka yang sudah berbelanja di Gudang Pakaian Dalam.</p>
        </div>
      </div>

      <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <div className="flex animate-marquee whitespace-nowrap group hover:[animation-play-state:paused]">
          {duplicatedTestimonials.map((testimonial, index) => (
            <div key={index} className="mx-4 flex-shrink-0">
              <div className="w-[500px] h-[400px] rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <img src={testimonial.imageUrl} alt={testimonial.alt} className="w-full h-full object-cover rounded-2xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
