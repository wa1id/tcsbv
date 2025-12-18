"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface NavItem {
  title: string;
  linkType: 'internal' | 'external' | 'dropdown';
  internalLink?: { slug: { current: string } };
  externalUrl?: string;
  children?: Array<{
    title: string;
    linkType: 'internal' | 'external';
    internalLink?: { slug: { current: string } };
    externalUrl?: string;
  }>;
}

interface HeaderSettings {
  navigation?: NavItem[];
  ctaButton?: {
    enabled?: boolean;
    text?: string;
    linkType?: string;
    internalLink?: { slug: { current: string } };
    externalUrl?: string;
  };
}

interface NavbarProps {
  siteSettings: {
    title: string;
    logo?: any;
  };
  headerSettings?: HeaderSettings;
}

const Navbar = ({ siteSettings, headerSettings }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [color, setColor] = useState("transparent");
  const [textColor, setTextColor] = useState("#da640e");
  const [blurLevel, setBlurLevel] = useState(0);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const dropdownVariants = {
    open: {
      opacity: 1,
      y: 0,
      display: "block",
      transition: { duration: 0.2, ease: easeCurve },
    },
    closed: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2, ease: easeCurve },
      transitionEnd: { display: "none" },
    },
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  const navigation = headerSettings?.navigation || [];

  const getHref = (item: { linkType: string; internalLink?: { slug: { current: string } }; externalUrl?: string }) => {
    if (item.linkType === 'internal' && item.internalLink?.slug?.current) {
      const slug = item.internalLink.slug.current;
      return slug === 'home' ? '/' : `/${slug}`;
    }
    if (item.linkType === 'external' && item.externalUrl) {
      return item.externalUrl;
    }
    return '#';
  };

  const cta = headerSettings?.ctaButton?.enabled !== false
    ? {
        label: headerSettings?.ctaButton?.text || "Get in touch",
        href: getHref({
          linkType: headerSettings?.ctaButton?.linkType || 'internal',
          internalLink: headerSettings?.ctaButton?.internalLink,
          externalUrl: headerSettings?.ctaButton?.externalUrl,
        }),
      }
    : { label: "Get in touch", href: "/contact" };

  return (
    <>
      <motion.div
        className={`flex flex-col justify-center items-center ease-linear w-full h-[80px] md:h-[80px] transition-all duration-300 fixed top-0 z-50 ${isOpen ? "bg-charcoal " : "bg-cream"}`}
        animate={{ y: isScrollingUp ? 0 : -100 }}
        initial={{ y: 0 }}
        transition={{ duration: 0.3, ease: easeCurve }}
        style={{
          backgroundColor: isOpen ? "#0e1306" : color,
          backdropFilter: isOpen ? "none" : `blur(${blurLevel}px)`,
        }}
      >
        <div className="flex justify-between md:max-w-[1450px] xl:max-w-[1450px] items-center w-full mx-auto px-3">
          <div className="flex-shrink-0">
            <motion.div initial="hidden" animate="visible" variants={textVariants}>
              <Link
                href="/"
                className="text-2xl font-[700] text-orange hover:text-orange/90"
                style={{ color: textColor }}
              >
                {siteSettings.title || "TCsBV"}
              </Link>
            </motion.div>
          </div>

          <div className="hidden lg:block" ref={dropdownRef}>
            <nav className={`flex items-center gap-x-6 ${isOpen ? "text-orange" : "text-orange"}`}>
              {navigation.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  animate="visible"
                  variants={linkVariants}
                  transition={{ delay: 0.15 * index }}
                  className="relative"
                >
                  {item.linkType === 'dropdown' && item.children && item.children.length > 0 ? (
                    <>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === item.title ? null : item.title)}
                        onMouseEnter={() => setOpenDropdown(item.title)}
                        className="hover:text-orange/90 transition-colors flex items-center gap-1"
                      >
                        {item.title}
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${openDropdown === item.title ? "rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <motion.div
                        initial="closed"
                        animate={openDropdown === item.title ? "open" : "closed"}
                        variants={dropdownVariants}
                        onMouseLeave={() => setOpenDropdown(null)}
                        className="absolute top-full left-0 mt-2 w-48 bg-cream rounded-lg shadow-lg border border-orange/20 overflow-hidden z-50"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.title}
                            href={getHref(child)}
                            className="block px-4 py-2 text-sm text-charcoal hover:bg-orange/10 hover:text-orange transition-colors"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {child.title}
                          </Link>
                        ))}
                      </motion.div>
                    </>
                  ) : (
                    <Link href={getHref(item)} className="hover:text-orange/90 transition-colors">
                      {item.title}
                    </Link>
                  )}
                </motion.div>
              ))}
              <Link
                href={cta.href}
                className="ml-4 hover:bg-olive ease-linear duration-100 transition-all rounded-full bg-orange px-8 py-4 text-sm font-semibold text-cream hover:bg-orange/90"
              >
                {cta.label}
              </Link>
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
        <nav className="space-y-8 text-left text-orange px-4 pt-6 w-full max-w-md">
          {navigation.map((item, index) => (
            <motion.div
              key={item.title}
              initial="hidden"
              animate="visible"
              variants={linkVariants}
              transition={{ delay: 0.2 * index }}
            >
              {item.linkType === 'dropdown' && item.children && item.children.length > 0 ? (
                <div className="space-y-4">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === item.title ? null : item.title)}
                    className="text-2xl font-[500] hover:text-gray-700 transition-colors flex items-center gap-2 w-full text-left"
                  >
                    {item.title}
                    <svg
                      className={`w-5 h-5 transition-transform duration-200 ${openDropdown === item.title ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openDropdown === item.title && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-4 space-y-3"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.title}
                          href={getHref(child)}
                          onClick={() => {
                            setIsOpen(false);
                            setOpenDropdown(null);
                          }}
                          className="block text-xl font-[400] text-orange/80 hover:text-orange transition-colors"
                        >
                          {child.title}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ) : (
                <Link
                  href={getHref(item)}
                  className="text-2xl font-[500] hover:text-gray-700 transition-colors block"
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </Link>
              )}
            </motion.div>
          ))}
          <a
            href={cta.href}
            className="inline-block rounded-full bg-orange px-5 w-full text-center text-cream py-4 text-lg font-semibold transition hover:bg-olive"
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
