"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import React, { useState } from "react";

interface ContactPageClientProps {
  siteSettings: any;
}

const ContactPageClient = ({ siteSettings }: ContactPageClientProps) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const containerRef = React.useRef(null);
    const heroRef = React.useRef(null);
    const formRef = React.useRef(null);
    const infoRef = React.useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });
    const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" });
    const isFormInView = useInView(formRef, { once: true, margin: "-100px" });
    const isInfoInView = useInView(infoRef, { once: true, margin: "-100px" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/ses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emails: [siteSettings.contactInfo?.email || 'info@tcsbv.com'],
                    tenantName: 'TCSBV',
                    dynamicTemplateData: {
                        name: formData.name,
                        email: formData.email,
                        phoneNumber: formData.phone,
                        message: formData.message,
                    },
                }),
            });

            if (response.ok) {
                alert("Thank you for your message! We'll get back to you soon.");
                setFormData({ name: "", email: "", phone: "", message: "" });
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            alert("Sorry, there was an error sending your message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const heroVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1] as const,
            },
        },
    };

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1] as const,
            },
        },
    };

    const contactInfo = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
            label: "Phone",
            value: siteSettings.contactInfo?.phone || "1.800.123.4567",
            href: `tel:${(siteSettings.contactInfo?.phone || "18001234567").replace(/[^\d]/g, '')}`,
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            label: "Email",
            value: siteSettings.contactInfo?.email || "info@tcsbv.com",
            href: `mailto:${siteSettings.contactInfo?.email || "info@tcsbv.com"}`,
        },
        ...(siteSettings.contactInfo?.address ? [{
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            label: "Address",
            value: siteSettings.contactInfo.address,
            href: "#",
        }] : []),
    ];

    return (
        <>
            {/* Hero Section */}
            <div
                ref={heroRef}
                className="relative w-full h-[500px] md:h-[600px] pt-20"
            >
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="/hero-new-1.jpg"
                        alt="Contact Us"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal to-charcoal opacity-80" />
                </div>

                {/* Content Overlay */}
                <motion.div
                    variants={heroVariants}
                    initial="hidden"
                    animate={isHeroInView ? "visible" : "hidden"}
                    className="relative z-10 h-full flex items-center justify-center max-w-[1450px] mx-auto px-4 md:px-8 lg:px-12"
                >
                    <div className="max-w-3xl text-center">
                        <motion.h1
                            variants={textVariants}
                            initial="hidden"
                            animate={isHeroInView ? "visible" : "hidden"}
                            className="text-orange text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                        >
                            Contact Us
                        </motion.h1>
                        <motion.p
                            variants={textVariants}
                            initial="hidden"
                            animate={isHeroInView ? "visible" : "hidden"}
                            className="text-cream text-xl md:text-2xl mb-8"
                        >
                            Get in touch with us for all your automotive needs
                        </motion.p>
                    </div>
                </motion.div>
            </div>

            {/* Contact Section */}
            <div
                ref={containerRef}
                id="contact"
                className="min-h-screen w-full py-20 px-4 md:px-8 lg:px-12 bg-cream"
            >
                <div className="max-w-[1450px] mx-auto w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                        {/* Contact Form */}
                        <motion.div
                            ref={formRef}
                            variants={cardVariants}
                            initial="hidden"
                            animate={isFormInView ? "visible" : "hidden"}
                            className="bg-white rounded-2xl shadow-xl p-8 md:p-10"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-orange mb-6">
                                Send us a message
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg bg-gray-100 text-charcoal placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange focus:bg-white transition-all"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg bg-gray-100 text-charcoal placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange focus:bg-white transition-all"
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-2">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg bg-gray-100 text-charcoal placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange focus:bg-white transition-all"
                                        placeholder="(123) 456-7890"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 rounded-lg bg-gray-100 text-charcoal placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange focus:bg-white transition-all resize-none"
                                        placeholder="Tell us about your needs..."
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-orange hover:bg-olive text-cream px-8 py-4 rounded-full font-semibold text-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </button>
                            </form>
                        </motion.div>

                        {/* Contact Information */}
                        <motion.div
                            ref={infoRef}
                            variants={cardVariants}
                            initial="hidden"
                            animate={isInfoInView ? "visible" : "hidden"}
                            className="space-y-8"
                        >
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-orange mb-6">
                                    Get in touch
                                </h2>
                                <p className="text-lg text-charcoal/80 leading-relaxed mb-8">
                                    {siteSettings.description || "We're here to help with all your automotive needs. Whether you need a car inspection, diagnostic service, or performance upgrade, our team is ready to assist you."}
                                </p>
                            </div>

                            {/* Contact Info Cards */}
                            <div className="space-y-6">
                                {contactInfo.map((info, index) => (
                                    <motion.a
                                        key={index}
                                        href={info.href}
                                        custom={index}
                                        variants={cardVariants}
                                        initial="hidden"
                                        animate={isInfoInView ? "visible" : "hidden"}
                                        className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 group"
                                    >
                                        <div className="flex-shrink-0 w-12 h-12 bg-orange rounded-lg flex items-center justify-center text-cream group-hover:bg-olive transition-colors">
                                            {info.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-charcoal mb-1">
                                                {info.label}
                                            </h3>
                                            <p className="text-charcoal/70 group-hover:text-orange transition-colors whitespace-pre-line">
                                                {info.value}
                                            </p>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>

                            {/* Business Hours */}
                            <motion.div
                                variants={cardVariants}
                                initial="hidden"
                                animate={isInfoInView ? "visible" : "hidden"}
                                className="bg-white rounded-xl shadow-md p-6"
                            >
                                <h3 className="text-xl font-semibold text-charcoal mb-4">
                                    Business Hours
                                </h3>
                                <div className="space-y-2 text-charcoal/70">
                                    <div className="flex justify-between">
                                        <span>Monday - Friday</span>
                                        <span className="font-medium">8:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Saturday</span>
                                        <span className="font-medium">9:00 AM - 4:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Sunday</span>
                                        <span className="font-medium">Closed</span>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactPageClient;