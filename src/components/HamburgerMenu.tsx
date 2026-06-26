import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };

    // Delay binding listener to prevent closing instantly on the hamburger click
    const timer = setTimeout(() => {
      window.addEventListener("click", handleOutsideClick);
    }, 0);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const links = [
    { name: "HOME", href: "/" },
    { name: "ABOUT", href: "/about/" },
    { name: "ITEMS", href: "/items" },
    { name: "CONTACT US", href: "/contact/" },
  ];

  return (
    <div className="lg:hidden block">
      {/* Hamburger Toggle Button */}
      <button
        onClick={toggleMenu}
        aria-label="Open Menu"
        className="fixed top-6 right-6 z-40 p-2.5 rounded-full border border-white/20 bg-black/60 backdrop-blur-md text-white hover:text-gold hover:border-gold transition-all duration-300 active:scale-95 flex items-center justify-center outline-none cursor-pointer"
        style={{ minWidth: "48px", minHeight: "48px" }}
      >
        <Menu className="w-6 h-6 text-white" />
      </button>

      {/* Slide-over Full Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-lg flex justify-end"
          >
            <motion.div
              ref={menuRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-[320px] h-full bg-[#051327] border-l border-white/10 p-8 flex flex-col justify-between relative shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={closeMenu}
                aria-label="Close Menu"
                className="absolute top-6 right-6 p-2 rounded-full border border-white/10 hover:border-gold hover:text-gold text-white/70 transition-all duration-300 cursor-pointer outline-none flex items-center justify-center"
                style={{ minWidth: "48px", minHeight: "48px" }}
              >
                <X className="w-6 h-6" />
              </button>

              {/* Logo / Header in Drawer */}
              <div className="mt-8 flex items-center gap-3">
                <img
                  src="/image-269@2x.png"
                  alt="Logo"
                  className="h-10 w-auto object-contain"
                />
                <span className="font-heading text-lg font-bold tracking-wider text-white">
                  SHAGUN FASHION
                </span>
              </div>

              {/* Menu Links */}
              <nav className="flex flex-col gap-6 my-auto text-left">
                {links.map((link, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                  >
                    {link.href.startsWith("/") && !link.href.endsWith("/") ? (
                      <Link
                        to={link.href}
                        onClick={closeMenu}
                        className="font-heading text-2xl tracking-[0.15em] text-white hover:text-gold transition-colors duration-300 py-2 block border-b border-white/5 active:text-gold"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        onClick={closeMenu}
                        className="font-heading text-2xl tracking-[0.15em] text-white hover:text-gold transition-colors duration-300 py-2 block border-b border-white/5 active:text-gold"
                      >
                        {link.name}
                      </a>
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* Drawer Footer */}
              <div className="text-xs text-white/40 font-mono tracking-wider">
                &copy; {new Date().getFullYear()} SHAGUN FASHION
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
