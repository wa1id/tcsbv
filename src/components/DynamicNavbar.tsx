"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface NavbarProps {
  siteSettings: {
    title: string;
    logo?: any;
    ctaButton?: {
      enabled?: boolean;
      text?: string;
      linkType?: string;
      internalLink?: any;
      externalUrl?: string;
    };
  };
  navigation?: {
    pages: Array<{ title: string; slug: { current: string }; isHomePage?: boolean }>;
    services: Array<{ title: string; slug: { current: string } }>;
  };
}

const DynamicNavbar = ({ siteSettings, navigation }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [color, setColor] = useState("transparent");
  const [textColor, setTextColor] = useState("#da640e");
  const [blurLevel, setBlurLevel] = useState(0);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(event.target as Node)
      ) {
        setIsServicesOpen(false);
      }
    };

    if (isServicesOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isServicesOpen]);

  // Get services list
  const services = navigation?.services || [];

  // Only show pages from Sanity - no default fallbacks
  const links = navigation?.pages
    ? navigation.pages
        .filter(page => page.slug?.current && !page.isHomePage) // Filter out home pages and pages without slugs
        .map(page => ({
          label: page.title,
          href: `/${page.slug.current}`
        }))
    : [];

  // CTA button from Sanity settings or default
  const cta = siteSettings.ctaButton?.enabled !== false
    ? {
        label: siteSettings.ctaButton?.text || "Get in touch",
        href: siteSettings.ctaButton?.linkType === 'internal' && siteSettings.ctaButton?.internalLink?.slug?.current
          ? `/${siteSettings.ctaButton.internalLink.slug.current}`
          : siteSettings.ctaButton?.linkType === 'external' && siteSettings.ctaButton?.externalUrl
          ? siteSettings.ctaButton.externalUrl
          : "/contact"
      }
    : { label: "Get in touch", href: "/contact" };

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
              >
                {siteSettings.title || "TCsBV"}
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
              {services.length > 0 && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={linkVariants}
                  className="relative"
                  ref={servicesDropdownRef}
                >
                  <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    onMouseEnter={() => setIsServicesOpen(true)}
                    className="hover:text-orange/90 transition-colors flex items-center gap-1"
                  >
                    Services
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <motion.div
                    initial="closed"
                    animate={isServicesOpen ? "open" : "closed"}
                    variants={dropdownVariants}
                    onMouseLeave={() => setIsServicesOpen(false)}
                    className="absolute top-full left-0 mt-2 w-48 bg-cream rounded-lg shadow-lg border border-orange/20 overflow-hidden z-50"
                  >
                    <Link
                      href="/services"
                      className="block px-4 py-2 text-sm text-charcoal hover:bg-orange/10 hover:text-orange transition-colors"
                    >
                      All Services
                    </Link>
                    {services.map((service) => (
                      <Link
                        key={service.slug.current}
                        href={`/services/${service.slug.current}`}
                        className="block px-4 py-2 text-sm text-charcoal hover:bg-orange/10 hover:text-orange transition-colors"
                      >
                        {service.title}
                      </Link>
                    ))}
                  </motion.div>
                </motion.div>
              )}
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
          {services.length > 0 && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={linkVariants}
              className="space-y-4"
            >
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="text-2xl font-[500] hover:text-gray-700 transition-colors flex items-center gap-2 w-full text-left"
              >
                Services
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isServicesOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="pl-4 space-y-3"
                >
                  <Link
                    href="/services"
                    onClick={() => {
                      setIsOpen(false);
                      setIsServicesOpen(false);
                    }}
                    className="block text-xl font-[400] text-orange/80 hover:text-orange transition-colors"
                  >
                    All Services
                  </Link>
                  {services.map((service) => (
                    <Link
                      key={service.slug.current}
                      href={`/services/${service.slug.current}`}
                      onClick={() => {
                        setIsOpen(false);
                        setIsServicesOpen(false);
                      }}
                      className="block text-xl font-[400] text-orange/80 hover:text-orange transition-colors"
                    >
                      {service.title}
                    </Link>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
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

export default DynamicNavbar;