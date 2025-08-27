import React, { useState, useRef, useEffect } from "react";
import Header, { type NavItem } from "../components/Header";
import Hero from "../components/Hero";
import BannerSlider from "../components/BannerSlider";
import AboutUs from "../components/AboutUs";
import Brands from "../components/Brands";
import ProductCatalog from "../components/Catalog";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contacts";
import Footer from "../components/Footer";

const navItems: NavItem[] = [
  { id: "hero", label: "Beranda" },
  { id: "about", label: "Tentang Kami" },
  { id: "brands", label: "Merek" },
  { id: "catalog", label: "Katalog" },
  { id: "testimonials", label: "Testimoni" },
  { id: "contact", label: "Kontak kami" },
];

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("hero");

  const sectionRefs = {
    hero: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
    brands: useRef<HTMLElement>(null),
    catalog: useRef<HTMLElement>(null),
    testimonials: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.4,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const refs = Object.values(sectionRefs);
    refs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      refs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-brand-light">
      <Header navItems={navItems} activeSection={activeSection} />

      <main>
        <Hero id="hero" innerRef={sectionRefs.hero} />
        <BannerSlider />
        <AboutUs id="about" innerRef={sectionRefs.about} />
        <Brands id="brands" innerRef={sectionRefs.brands} />
        <ProductCatalog id="catalog" innerRef={sectionRefs.catalog} />
        <Testimonials id="testimonials" innerRef={sectionRefs.testimonials} />
        <Contact id="contact" innerRef={sectionRefs.contact} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
