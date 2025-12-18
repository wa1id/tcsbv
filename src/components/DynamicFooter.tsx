"use client";

import { motion, useInView } from "framer-motion";
import React from "react";

interface FooterProps {
  siteSettings: {
    title: string;
    description?: string;
    contactInfo?: {
      phone?: string;
      email?: string;
      address?: string;
    };
    socialMedia?: {
      facebook?: string;
      twitter?: string;
      instagram?: string;
      linkedin?: string;
    };
    footer?: {
      aboutText?: string;
      copyrightText?: string;
      quickLinks?: Array<any>;
      showNewsletter?: boolean;
      newsletterTitle?: string;
      newsletterDescription?: string;
    };
  };
}

const DynamicFooter = ({ siteSettings }: FooterProps) => {
    const containerRef = React.useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-50px" });

    const footerLinks = [
        { label: "Home", href: "/" },
        // { label: "Services", href: "/services" },
        { label: "Contact", href: "/contact" },
        { label: "FAQ", href: "#faq" },
    ];

    const contactInfo = [
        { 
          label: "Phone", 
          value: siteSettings.contactInfo?.phone || "1.800.123.4567", 
          href: `tel:${(siteSettings.contactInfo?.phone || "18001234567").replace(/[^\d]/g, '')}` 
        },
        { 
          label: "Email", 
          value: siteSettings.contactInfo?.email || "info@tcsbv.com", 
          href: `mailto:${siteSettings.contactInfo?.email || "info@tcsbv.com"}` 
        },
    ];

    const socialLinks = [
        {
            name: "Facebook",
            href: siteSettings.socialMedia?.facebook || "#",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            ),
        },
        {
            name: "Twitter",
            href: siteSettings.socialMedia?.twitter || "#",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
            ),
        },
        {
            name: "Instagram",
            href: siteSettings.socialMedia?.instagram || "#",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
            ),
        },
    ];

    // Filter out social links with empty or "#" hrefs
    const validSocialLinks = socialLinks.filter(social => social.href && social.href !== "#");

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1] as const,
            },
        }),
    };

    return (
        <footer
            ref={containerRef}
            className="w-full bg-charcoal text-cream py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-12"
        >
            <div className="max-w-[1450px] mx-auto">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
                    {/* Company Info */}
                    <motion.div
                        custom={0}
                        variants={itemVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="lg:col-span-1"
                    >
                        <h3 className="text-2xl font-bold text-orange mb-4">
                          {siteSettings.title || "TCsBV"}
                        </h3>
                        <p className="text-cream/70 text-sm md:text-base leading-relaxed mb-4">
                            {siteSettings.description || "Uw specialist in verwarming, domotica, onderhoud en renovatie. Kwaliteit en service staan bij ons centraal."}
                        </p>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        custom={1}
                        variants={itemVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        <h4 className="text-lg font-semibold text-orange mb-4">Quick Links</h4>
                        <ul className="space-y-3">
                            {footerLinks.map((link, index) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-cream/70 hover:text-orange transition-colors duration-300 text-sm md:text-base"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        custom={2}
                        variants={itemVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        <h4 className="text-lg font-semibold text-orange mb-4">Contact</h4>
                        <ul className="space-y-3">
                            {contactInfo.map((info, index) => (
                                <li key={info.label}>
                                    <a
                                        href={info.href}
                                        className="text-cream/70 hover:text-orange transition-colors duration-300 text-sm md:text-base block"
                                    >
                                        <span className="font-medium">{info.label}:</span>{" "}
                                        <span className="hover:underline">{info.value}</span>
                                    </a>
                                </li>
                            ))}
                            {siteSettings.contactInfo?.address && (
                                <li>
                                    <div className="text-cream/70 text-sm md:text-base">
                                        <span className="font-medium">Address:</span>{" "}
                                        <span className="whitespace-pre-line">{siteSettings.contactInfo.address}</span>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </motion.div>

                    {/* Social Media */}
                    {validSocialLinks.length > 0 && (
                        <motion.div
                            custom={3}
                            variants={itemVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                        >
                            <h4 className="text-lg font-semibold text-orange mb-4">Follow Us</h4>
                            <div className="flex gap-4">
                                {validSocialLinks.map((social, index) => (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        aria-label={social.name}
                                        className="w-10 h-10 rounded-full bg-cream/10 hover:bg-orange flex items-center justify-center text-cream/70 hover:text-cream transition-all duration-300 hover:scale-110"
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="border-t border-cream/20 pt-6 md:pt-8"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-cream/60 text-sm text-center md:text-left">
                            © {new Date().getFullYear()} {siteSettings.title || "TCsBV"}. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm text-cream/60">
                            <a href="#" className="hover:text-orange transition-colors duration-300">
                                Privacy Policy
                            </a>
                            <a href="#" className="hover:text-orange transition-colors duration-300">
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default DynamicFooter;