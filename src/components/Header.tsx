import React, { useState, useEffect } from "react";
import { clsx } from "clsx";

const AnimatedMenuIcon: React.FC<{ isOpen: boolean; className?: string }> = ({ isOpen, className }) => (
  <div className={clsx("relative h-6 w-6 transform transition-transform duration-500 ease-in-out", className)}>
    <span className={clsx("absolute block h-0.5 w-full bg-current transform transition-all duration-300 ease-in-out", isOpen ? "top-2.5 rotate-45" : "top-1")}></span>
    <span className={clsx("absolute top-2.5 block h-0.5 w-full bg-current transition-opacity duration-300 ease-in-out", isOpen ? "opacity-0" : "opacity-100")}></span>
    <span className={clsx("absolute block h-0.5 w-full bg-current transform transition-all duration-300 ease-in-out", isOpen ? "top-2.5 -rotate-45" : "top-[19px]")}></span>
  </div>
);

interface NavLinkProps {
  href: string;
  isActive?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, isActive, children, onClick }) => (
  <a href={href} className="group relative py-2 text-lg md:text-base transition-colors duration-300 hover:text-white" onClick={onClick}>
    <span className={clsx("transition-colors", isActive ? "text-brand-secondary" : "text-brand-secondary")}>{children}</span>
    <span
      className={clsx("absolute bottom-0 left-0 block h-0.5 w-full bg-brand-secondary transition-transform duration-300 ease-out", { "scale-x-100": isActive, "scale-x-0 group-hover:scale-x-100": !isActive })}
      style={{ transformOrigin: "center" }}
    />
  </a>
);

const Logo: React.FC = () => <div className=" px-4 py-2 text-xl font-bold text-brand-secondary tracking-widest shadow-sm">Gudang Pakaian Dalam</div>;

export interface NavItem {
  label: string;
  id: string;
}

interface HeaderProps {
  navItems: NavItem[];
  activeSection: string;
}

const Header: React.FC<HeaderProps> = ({ navItems, activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-brand-primary/80 text-brand-secondary font-outfit shadow-lg backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto flex items-center justify-between p-4">
        <a href="#hero">
          <Logo />
        </a>

        <nav className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => (
            <NavLink key={item.id} href={`#${item.id}`} isActive={activeSection === item.id}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="relative z-50 text-brand-secondary focus:outline-none" aria-expanded={isMenuOpen} aria-label="Toggle menu">
            <AnimatedMenuIcon isOpen={isMenuOpen} />
          </button>
        </div>
      </div>

      <div className={clsx("absolute top-full left-0 grid w-full overflow-hidden bg-brand-primary/95 backdrop-blur-xl transition-all duration-500 ease-in-out md:hidden", isMenuOpen ? "grid-rows-[1fr] shadow-xl" : "grid-rows-[0fr]")}>
        <nav className="flex min-h-0 flex-col items-center space-y-4 p-8">
          {navItems.map((item, index) => (
            <div key={item.id} className={clsx("transform transition-all duration-300", isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0")} style={{ transitionDelay: `${100 + index * 50}ms` }}>
              <NavLink href={`#${item.id}`} isActive={activeSection === item.id} onClick={handleNavLinkClick}>
                {item.label}
              </NavLink>
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
