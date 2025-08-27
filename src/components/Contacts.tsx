import React from "react";
import { useInView } from "react-intersection-observer";
import { clsx } from "clsx";

interface ContactProps {
  id: string;
  innerRef: React.Ref<HTMLElement>;
}

const Contact: React.FC<ContactProps> = ({ id, innerRef }) => {
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

  const whatsappUrl = `https://api.whatsapp.com/send/?phone=6281210132385&text=Halo+Gudang+Pakaian+Dalam%2C+saya+mau+tanya+soal+produknya&type=phone_number&app_absent=0`;

  return (
    <section ref={setRefs} id={id} className="bg-brand-light font-outfit">
      <div className="container mx-auto px-4 py-20 md:py-24">
        <div className={clsx("bg-brand-primary/30 rounded-2xl p-8 md:p-16 text-center transition-all duration-700 ease-out", inView ? "opacity-100 scale-100" : "opacity-0 scale-95")}>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-secondary max-w-2xl mx-auto [text-wrap:balance]">Hubungi kami untuk pemesanan atau pertanyaan lebih lanjut!</h2>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-block bg-brand-secondary text-white font-bold py-3 px-8 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-opacity-90"
          >
            Hubungi via WhatsApp
            <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-2">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
