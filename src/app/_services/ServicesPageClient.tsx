"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import React from "react";
import Link from "next/link";
import DynamicFooter from "@/components/DynamicFooter";
import FAQ from "@/components/home/FAQ";
import { urlFor } from "@/sanity/lib/image";

interface Service {
    _id: string;
    title: string;
    slug: { current: string };
    description: string;
    image?: any;
    features?: string[];
    price?: string;
}

interface SiteSettings {
    title: string;
    description?: string;
    logo?: any;
    footer?: any;
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
    [key: string]: any;
}

interface ServicesPageClientProps {
    services: Service[];
    siteSettings: SiteSettings;
    pageSettings?: any;
}

// Testimonials Component
const TestimonialsSection = () => {
    const testimonialsRef = React.useRef(null);
    const isTestimonialsInView = useInView(testimonialsRef, { once: true, margin: "-100px" });

    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Business Owner",
            image: "/men.jpg",
            rating: 5,
            text: "Exceptional service! They diagnosed my car's issue quickly and fixed it at a fair price. The team was professional and kept me informed throughout the process."
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Software Engineer",
            image: "/men.jpg",
            rating: 5,
            text: "I've been bringing my car here for years. Their attention to detail and honest approach to repairs makes them my go-to automotive service provider."
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            role: "Marketing Manager",
            image: "/men.jpg",
            rating: 5,
            text: "Outstanding customer service and quality work. They went above and beyond to ensure my car was running perfectly. Highly recommend!"
        }
    ];

    const testimonialVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2,
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1] as const,
            },
        }),
    };

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <div
            ref={testimonialsRef}
            className="relative w-full py-24 md:py-32 px-4 md:px-8 lg:px-12 bg-cream overflow-hidden"
        >
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-20 right-10 w-72 h-72 bg-orange/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-olive/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-[1450px] mx-auto">
                {/* Section Header */}
                <motion.div
                    variants={textVariants}
                    initial="hidden"
                    animate={isTestimonialsInView ? "visible" : "hidden"}
                    className="text-center mb-16 md:mb-20"
                >
                    <motion.div
                        variants={textVariants}
                        initial="hidden"
                        animate={isTestimonialsInView ? "visible" : "hidden"}
                        className="inline-block mb-4"
                    >
                        <span className="text-orange text-sm md:text-base font-semibold uppercase tracking-wider">
                            Client Testimonials
                        </span>
                    </motion.div>
                    <motion.h2
                        variants={textVariants}
                        initial="hidden"
                        animate={isTestimonialsInView ? "visible" : "hidden"}
                        className="text-charcoal text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                    >
                        What Our Customers Say
                    </motion.h2>
                    <motion.p
                        variants={textVariants}
                        initial="hidden"
                        animate={isTestimonialsInView ? "visible" : "hidden"}
                        className="text-charcoal/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
                    >
                        Don't just take our word for it - hear from our satisfied customers about their experience with our services
                    </motion.p>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            custom={index}
                            variants={testimonialVariants}
                            initial="hidden"
                            animate={isTestimonialsInView ? "visible" : "hidden"}
                            className="group relative"
                        >
                            <div className="relative h-full bg-white rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-2 border border-orange/10 hover:border-orange/20">
                                {/* Quote Icon */}
                                <div className="absolute top-6 right-6 text-orange/20 group-hover:text-orange/30 transition-colors duration-300">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                                    </svg>
                                </div>

                                {/* Rating Stars */}
                                <div className="flex items-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className="w-5 h-5 text-orange"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>

                                {/* Testimonial Text */}
                                <p className="text-charcoal text-base md:text-lg leading-relaxed mb-6 italic">
                                    "{testimonial.text}"
                                </p>

                                {/* Customer Info */}
                                <div className="flex items-center">
                                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-orange/20">
                                        <Image
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            width={48}
                                            height={48}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-charcoal font-semibold text-lg">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-charcoal/60 text-sm">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>

                                {/* Hover Effect Line */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// CTA Section Component
const CTASection = () => {
    const ctaRef = React.useRef(null);
    const isCTAInView = useInView(ctaRef, { once: true, margin: "-100px" });

    const features = [
        {
            id: 1,
            icon: (
                <Image
                    src="/motor-white.png"
                    alt="Engine performance"
                    width={48}
                    height={48}
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
                />
            ),
            title: "Expert Diagnostics",
            description: "Advanced diagnostic tools for accurate results",
        },
        {
            id: 2,
            icon: (
                <Image
                    src="/diagnostic-white.png"
                    alt="Quality service"
                    width={48}
                    height={48}
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
                />
            ),
            title: "Quality Service",
            description: "Professional service you can trust",
        },
        {
            id: 3,
            icon: (
                <Image
                    src="/tag.png"
                    alt="Fair pricing"
                    width={48}
                    height={48}
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
                />
            ),
            title: "Fair Pricing",
            description: "Transparent pricing with no hidden costs",
        },
    ];

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.15,
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1] as const,
            },
        }),
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

    return (
        <div ref={ctaRef} className="relative mt-20 sm:mt-32 md:mt-40 w-full">
            {/* Feature Cards Section - Top */}
            <div className="relative lg:absolute top-0 lg:top-[-12rem] left-0 right-0 z-10 max-w-[1080px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-8 sm:pt-12 md:pt-16 lg:pt-20 mb-8 lg:mb-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.id}
                            custom={index}
                            variants={cardVariants}
                            initial="hidden"
                            animate={isCTAInView ? "visible" : "hidden"}
                            className="bg-orange rounded-xl px-5 sm:px-6 md:px-8 pt-8 sm:pt-10 pb-10 sm:pb-12 md:pb-14 shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="text-orange mb-3 sm:mb-4">{feature.icon}</div>
                            <h3 className="text-lg sm:text-xl md:text-2xl text-cream font-semibold mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-cream text-xs sm:text-sm md:text-base">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Hero Section with Background Image */}
            <div className="relative w-full h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px] mt-0 lg:mt-8 md:mt-12">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="/hero-new-1.jpg"
                        alt="Ready to get started?"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Dark Overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal to-charcoal opacity-75" />
                </div>

                {/* Content Overlay */}
                <motion.div
                    variants={heroVariants}
                    initial="hidden"
                    animate={isCTAInView ? "visible" : "hidden"}
                    className="relative z-10 h-full flex items-center justify-center max-w-[1450px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12"
                >
                    <div className="max-w-2xl text-center mt-8 sm:mt-12 lg:mt-16 px-2">
                        {/* Main Heading */}
                        <h2 className="text-orange text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
                            Ready to Experience Excellence?
                        </h2>

                        {/* Sub-text */}
                        <p className="text-cream text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 text-center">
                            Get your vehicle serviced by professionals who care about quality and your satisfaction.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                            <Link
                                href="/contact"
                                className="bg-cream hover:bg-cream/90 text-charcoal px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-colors duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
                            >
                                Book Your Service Today
                            </Link>
                            <a
                                href="tel:+1234567890"
                                className="flex items-center justify-center gap-2 text-cream hover:text-orange transition-colors duration-300 group"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                </svg>
                                <span className="text-sm sm:text-base md:text-lg font-medium">
                                    Call us now
                                </span>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const ServicesPageClient = ({ services, siteSettings, pageSettings }: ServicesPageClientProps) => {
    const containerRef = React.useRef(null);
    const heroRef = React.useRef(null);
    const headingRef = React.useRef(null);
    const featuresRef = React.useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });
    const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" });
    const isHeadingInView = useInView(headingRef, { once: true, margin: "-100px" });
    const isFeaturesInView = useInView(featuresRef, { once: true, margin: "-100px" });

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
        hidden: { opacity: 0, y: 50 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2,
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1] as const,
            },
        }),
    };

    const featureCardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1] as const,
            },
        }),
    };

    // Format service number (01, 02, 03, etc.)
    const formatServiceNumber = (index: number) => {
        return String(index + 1).padStart(2, "0");
    };

    // Icon Component for consistent styling
    const IconWrapper = ({ children }: { children: React.ReactNode }) => (
        <div className="w-full h-full flex items-center justify-center">
            {children}
        </div>
    );

    const features = [
        {
            icon: (
                <IconWrapper>
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-8 h-8"
                    >
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" />
                        <path d="M2 12l10 5 10-5" />
                    </svg>
                </IconWrapper>
            ),
            title: "Expert Technicians",
            description: "Certified professionals with years of experience in automotive services",
        },
        {
            icon: (
                <IconWrapper>
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-8 h-8"
                    >
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                </IconWrapper>
            ),
            title: "Fast Service",
            description: "Quick turnaround times without compromising on quality",
        },
        {
            icon: (
                <IconWrapper>
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-8 h-8"
                    >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="M9 12l2 2 4-4" />
                    </svg>
                </IconWrapper>
            ),
            title: "Quality Guarantee",
            description: "100% satisfaction guarantee on all our services",
        },
        {
            icon: (
                <IconWrapper>
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-8 h-8"
                    >
                        <line x1="12" y1="1" x2="12" y2="23" />
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                </IconWrapper>
            ),
            title: "Fair Pricing",
            description: "Transparent pricing with no hidden costs",
        },
        {
            icon: (
                <IconWrapper>
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-8 h-8"
                    >
                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                    </svg>
                </IconWrapper>
            ),
            title: "Modern Equipment",
            description: "State-of-the-art tools and technology for best results",
        },
        {
            icon: (
                <IconWrapper>
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-8 h-8"
                    >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                </IconWrapper>
            ),
            title: "Trusted Service",
            description: "Thousands of satisfied customers trust us with their vehicles",
        },
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
                        alt="Our Services"
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
                            ref={headingRef}
                            variants={textVariants}
                            initial="hidden"
                            animate={isHeadingInView ? "visible" : "hidden"}
                            className="text-orange text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                        >
                            Our Services
                        </motion.h1>
                        <motion.p
                            variants={textVariants}
                            initial="hidden"
                            animate={isHeadingInView ? "visible" : "hidden"}
                            className="text-cream text-xl md:text-2xl mb-8"
                        >
                            Comprehensive automotive solutions tailored to your needs
                        </motion.p>
                        <motion.div
                            variants={textVariants}
                            initial="hidden"
                            animate={isHeadingInView ? "visible" : "hidden"}
                        >
                            <Link
                                href="/contact"
                                className="inline-block bg-orange hover:bg-olive text-cream px-8 py-4 rounded-full font-semibold text-lg transition-colors duration-300"
                            >
                                Need a car inspection?
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Services Cards Section */}
            <div
                ref={containerRef}
                className="min-h-screen w-full flex items-center justify-center py-20 px-4 md:px-8 lg:px-12 bg-cream"
            >
                <div className="max-w-[1450px] mx-auto w-full">
                    {/* Section Heading */}
                    <motion.div
                        variants={textVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="text-center mb-12 md:mb-16"
                    >
                        <h2 className="text-orange text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                            What We Offer
                        </h2>
                        <p className="text-charcoal/70 text-lg md:text-xl max-w-2xl mx-auto">
                            Explore our comprehensive range of automotive services
                        </p>
                    </motion.div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {services.map((service, index) => {
                            const imageUrl = service.image
                                ? urlFor(service.image).width(800).height(600).url()
                                : "/hero-new-1.jpg";

                            return (
                                <motion.div
                                    key={service._id}
                                    custom={index}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate={isInView ? "visible" : "hidden"}
                                    className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden group"
                                >
                                    {/* Background Image */}
                                    <Image
                                        src={imageUrl}
                                        alt={service.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />

                                    {/* Dark Gradient Overlay at Bottom */}
                                    <div className="absolute transition-opacity duration-500 inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                                    {/* Content Container */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10">
                                        {/* Yellow Number */}
                                        <div className="text-orange text-7xl md:text-8xl lg:text-9xl font-bold mb-4 leading-none">
                                            {formatServiceNumber(index)}
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-white text-2xl md:text-3xl font-semibold mb-3">
                                            {service.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-md mb-4">
                                            {service.description}
                                        </p>

                                        {/* Button */}
                                        <Link
                                            href={`/services/${service.slug.current}`}
                                            className="inline-block hover:bg-olive ease-linear bg-orange hover:bg-orange/90 text-cream px-8 py-3 rounded-full font-semibold text-sm md:text-base transition-colors duration-300 mt-4"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div
                ref={featuresRef}
                className="relative w-full py-24 md:py-32 px-4 md:px-8 lg:px-12 overflow-hidden"
            >
                {/* Background with Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal/95 to-charcoal">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,165,0,0.1),transparent_50%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,195,74,0.08),transparent_50%)]" />
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-orange/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-olive/5 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 max-w-[1450px] mx-auto">
                    {/* Section Header */}
                    <motion.div
                        variants={textVariants}
                        initial="hidden"
                        animate={isFeaturesInView ? "visible" : "hidden"}
                        className="text-center mb-16 md:mb-20"
                    >
                        <motion.div
                            variants={textVariants}
                            initial="hidden"
                            animate={isFeaturesInView ? "visible" : "hidden"}
                            className="inline-block mb-4"
                        >
                            <span className="text-orange text-sm md:text-base font-semibold uppercase tracking-wider">
                                Why Choose Us
                            </span>
                        </motion.div>
                        <motion.h2
                            variants={textVariants}
                            initial="hidden"
                            animate={isFeaturesInView ? "visible" : "hidden"}
                            className="text-cream text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                        >
                            Excellence in Every Service
                        </motion.h2>
                        <motion.p
                            variants={textVariants}
                            initial="hidden"
                            animate={isFeaturesInView ? "visible" : "hidden"}
                            className="text-cream text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
                        >
                            We combine expertise, innovation, and dedication to deliver automotive solutions that exceed expectations
                        </motion.p>
                    </motion.div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                custom={index}
                                variants={featureCardVariants}
                                initial="hidden"
                                animate={isFeaturesInView ? "visible" : "hidden"}
                                className="group relative"
                            >
                                <div className="relative h-full bg-gradient-to-br from-cream/5 to-cream/0 backdrop-blur-sm border border-[#f3f4e4]/50 rounded-2xl p-8 md:p-10 hover:border-orange/30 transition-all duration-300 ease-out hover:shadow-2xl hover:shadow-orange/10 hover:-translate-y-2">
                                    {/* Icon */}
                                    <div className="mb-6">
                                        <div className="w-16 h-16 rounded-xl bg-orange flex items-center justify-center text-cream shadow-lg shadow-orange/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 ease-out">
                                            {feature.icon}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-orange text-xl md:text-2xl font-bold mb-4 group-hover:text-orange transition-colors duration-300">
                                        {feature.title}
                                    </h3>
                                    <p className="text-cream text-base md:text-lg leading-relaxed">
                                        {feature.description}
                                    </p>

                                    {/* Hover Effect Line */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl" />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <motion.div
                        variants={textVariants}
                        initial="hidden"
                        animate={isFeaturesInView ? "visible" : "hidden"}
                        className="mt-16 md:mt-20 text-center"
                    >
                        <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
                            <Link
                                href="/contact"
                                className="group relative px-8 py-4 bg-orange hover:bg-orange/90 text-cream font-semibold text-lg rounded-full transition-all duration-300 shadow-lg shadow-orange/20 hover:shadow-xl hover:shadow-orange/30 hover:scale-105"
                            >
                                Get Started Today
                                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-orange to-olive opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                            </Link>
                           
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Testimonials Section */}
            <TestimonialsSection />

            {/* CTA Section */}
            <CTASection />

            <FAQ />
            <DynamicFooter siteSettings={siteSettings} />
        </>
    );
};

export default ServicesPageClient;

