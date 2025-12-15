"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [color, setColor] = useState("transparent");
  const [textColor, setTextColor] = useState("#da640e");
  const [blurLevel, setBlurLevel] = useState(0);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const easeCurve: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

  const textVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.1, ease: easeCurve } },
  };

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        if (currentScrollY > lastScrollY.current && currentScrollY > window.innerHeight) {
          setIsScrollingUp(false);
        } else if (currentScrollY < lastScrollY.current) {
          setIsScrollingUp(true);
        }

        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });

      ticking.current = true;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 90) {
        setColor("#f3f4e480");
        setTextColor("#da640e");
        setBlurLevel(5);
      } else {
        setColor("transparent");
        setTextColor("#da640e");
        setBlurLevel(0);
      }
    };

    window.addEventListener("scroll", changeColor);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const menuVariants = {
    open: {
      opacity: 1,
      y: 0,
      display: "block",
      transition: { duration: 0.3, ease: easeCurve },
    },
    closed: {
      opacity: 0,
      y: 0,
      transition: { duration: 0.3, ease: easeCurve },
      transitionEnd: { display: "none" },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.1, ease: easeCurve } },
  };

  const links = [
    { label: "Home", href: "/" },
    {
      label: "Services",
      href: "/services",
    },
    { label: "Contact", href: "/contact" },
  ];

  const cta = { label: "Get in touch", href: "/contact" };

  return (
    <>
      <motion.div
        className={`flex flex-col justify-center items-center  ease-linear w-full h-[80px] md:h-[80px] transition-all duration-300 fixed top-0 z-50 ${isOpen ? "bg-charcoal " : "bg-cream"}`}
        animate={{ y: isScrollingUp ? 0 : -100 }}
        initial={{ y: 0 }}
        transition={{ duration: 0.3, ease: easeCurve }}
        style={{
          backgroundColor: isOpen ? "#0e1306" : color,
          backdropFilter: isOpen ? "none" : `blur(${blurLevel}px)`,
        }}
      >
        <div className="flex justify-between  md:max-w-[1450px] xl:max-w-[1450px] items-center w-full mx-auto px-3">
          <div className="flex-shrink-0">
            <motion.div initial="hidden" animate="visible" variants={textVariants}>
              <Link
                href="/"
                className="text-2xl font-[700] text-orange hover:text-orange/90"
                style={{ color: textColor }}
              >TCsBV
              </Link>
            </motion.div>
          </div>

          <div className="hidden lg:block">
            <nav className={`flex items-center gap-x-6 ${isOpen ? "text-orange" : "text-orange"}`}>
              {links.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial="hidden"
                  animate="visible"
                  variants={linkVariants}
                  transition={{ delay: 0.15 * index }}
                  className="relative group"
                >
                  <Link href={link.href} className="hover:text-orange/90 transition-colors">
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <a
                href={cta.href}
                className="ml-4 hover:bg-olive ease-linear duration-100 transition-all rounded-full bg-orange px-8 py-4 text-sm font-semibold text-cream transition hover:bg-orange/90"
              >
                {cta.label}
              </a>
            </nav>
          </div>

          <motion.div initial="hidden" animate="visible" variants={textVariants} className="lg:hidden">
            <button onClick={toggleMenu} className="focus:outline-none h-[20px] flex flex-col justify-center items-center gap-y-2">
              <div
                className={`w-10 h-[1px] rounded-full mt-[1px] transition-all duration-300 ${isOpen ? "bg-orange rotate-45 translate-y-[0.4rem]" : "bg-charcoal"}`}
              />
              <div
                className={`w-10 h-[1px] rounded-full transition-all duration-300 ${isOpen ? "bg-orange translate-x-full opacity-0" : "bg-charcoal"}`}
              />
              <div
                className={`w-10 h-[1px] rounded-full mt-[1px] transition-all duration-300 ${isOpen ? "bg-orange -rotate-45 -translate-y-[0.75rem]" : "bg-charcoal"}`}
              />
            </button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        className="lg:hidden bg-charcoal fixed top-20 left-0 w-full h-full z-30 flex items-center justify-center"
      >
        <nav className="space-y-8 text-left text-orange px-4 pt-6">
          {links.map((link, index) => (
            <motion.div
              key={link.label}
              initial="hidden"
              animate="visible"
              variants={linkVariants}
              transition={{ delay: 0.2 * index }}
              onClick={() => setIsOpen(false)}
            >
              <Link href={link.href} className="text-2xl font-[500] hover:text-gray-700 transition-colors">
                {link.label}
              </Link>
              
            </motion.div>
          ))}
          <a
            href={cta.href}
            className="inline-block rounded-full bg-orange px-5 w-full text-center text-cream py-4 text-lg font-semibold  transition hover:bg-olive"
            onClick={() => setIsOpen(false)}
          >
            {cta.label}
          </a>
        </nav>
      </motion.div>
    </>
  );
};

export default Navbar;

