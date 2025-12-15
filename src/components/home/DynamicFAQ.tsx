"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import React, { useState } from "react";
import { PortableText } from '@portabletext/react';

interface FAQ {
    _id: string;
    question: string;
    answer: any[]; // Portable Text array
    category: string;
    order: number;
    featured: boolean;
}

interface DynamicFAQProps {
    faqs: FAQ[];
}

const DynamicFAQ = ({ faqs }: DynamicFAQProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    // Take only featured FAQs or first 3 if no featured ones
    const featuredFaqs = faqs.filter(faq => faq.featured);
    const displayFaqs = featuredFaqs.length > 0 ? featuredFaqs.slice(0, 3) : faqs.slice(0, 3);

    const stats = [
        {
            number: "25+",
            label: "Years of experience",
        },
        {
            number: "35",
            label: "Amazing employees",
        },
        {
            number: "10k+",
            label: "Hours of maintenance",
        },
        {
            number: "2k+",
            label: "Projects done",
        },
    ];

    const containerRef = React.useRef(null);
    const imageRef = React.useRef(null);
    const titleRef = React.useRef(null);
    const statsRef = React.useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });
    const isImageInView = useInView(imageRef, { once: true, margin: "-100px" });
    const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" });
    const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const titleVariants = {
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

    const faqVariants = {
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

    const statVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: (i: number) => ({
            opacity: 1,
            scale: 1,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1] as const,
            },
        }),
    };

    const imageVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1] as const,
            },
        },
    };

    // Portable Text components for rendering rich text
    const portableTextComponents = {
        block: {
            normal: ({ children }: any) => (
                <p className="text-sm md:text-base text-charcoal/70 leading-relaxed">
                    {children}
                </p>
            ),
        },
    };

    return (
        <div
            ref={containerRef}
            id="faq"
            className="w-full pt-20 md:py-28 lg:py-32 px-4 md:px-8 lg:px-12"
        >
            <div className="max-w-[1450px] mx-auto">
                {/* FAQ Section with Image and FAQ Side by Side */}
                <div className="mb-20 md:mb-24 lg:mb-32">
                    {/* Image and FAQ Grid Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
                        {/* Left Side - Image */}
                        <motion.div
                            ref={imageRef}
                            variants={imageVariants}
                            initial="hidden"
                            animate={isImageInView ? "visible" : "hidden"}
                            className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-xl overflow-hidden shadow-lg"
                        >
                            <Image
                                src="/hero-new-1.jpg"
                                alt="Professional Mechanic"
                                fill
                                className="object-cover"
                                priority
                            />
                        </motion.div>

                        {/* Right Side - FAQ Items */}
                        <div className="space-y-4 md:space-y-5">
                            {/* Title Section */}
                            <motion.div
                                ref={titleRef}
                                variants={titleVariants}
                                initial="hidden"
                                animate={isTitleInView ? "visible" : "hidden"}
                                className="md:mb-10"
                            >
                                <h2 className="text-4xl font-bold text-charcoal mb-4">
                                    Frequently asked{" "}
                                    <span className="relative inline-block">
                                        questions
                                        <span className="absolute bottom-1 left-0 right-0 h-2 bg-orange -z-10 transform -skew-y-[-1deg]"></span>
                                    </span>
                                    .
                                </h2>
                                <p className="text-lg md:text-xl text-charcoal/70 max-w-2xl">
                                    Find answers to common questions about our automotive services and expertise.
                                </p>
                            </motion.div>

                            {displayFaqs.map((item, index) => (
                                <motion.div
                                    key={item._id}
                                    custom={index}
                                    variants={faqVariants}
                                    initial="hidden"
                                    animate={isInView ? "visible" : "hidden"}
                                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                                >
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className="w-full flex items-center gap-4 md:gap-6 p-5 md:p-6 text-left focus:outline-none rounded-lg"
                                        aria-expanded={openIndex === index}
                                    >
                                        {/* Orange Square Icon with Plus */}
                                        <div className="flex-shrink-0">
                                            <div
                                                className={`w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center transition-all duration-300 ${
                                                    openIndex === index
                                                        ? "bg-orange rotate-45"
                                                        : "bg-orange"
                                                }`}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    className="w-6 h-6 md:w-7 md:h-7 text-white"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2.5}
                                                        d="M12 4v16m8-8H4"
                                                    />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Question */}
                                        <div className="flex-1">
                                            <h3 className="text-base md:text-lg lg:text-xl font-semibold text-charcoal pr-4">
                                                {item.question}
                                            </h3>
                                        </div>
                                    </button>

                                    {/* Answer (Collapsible) */}
                                    <motion.div
                                        initial={false}
                                        animate={{
                                            height: openIndex === index ? "auto" : 0,
                                            opacity: openIndex === index ? 1 : 0,
                                        }}
                                        transition={{
                                            duration: 0.3,
                                            ease: [0.4, 0, 0.2, 1],
                                        }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-5 md:px-6 pb-5 md:pb-6 ml-20 md:ml-24">
                                            <PortableText 
                                                value={item.answer} 
                                                components={portableTextComponents}
                                            />
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Statistics Section */}
                <motion.div
                    ref={statsRef}
                    initial="hidden"
                    animate={isStatsInView ? "visible" : "hidden"}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12 pt-12 md:pt-16 border-t border-charcoal/10"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            variants={statVariants}
                            className="text-center"
                        >
                            <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-orange mb-2 md:mb-3">
                                {stat.number}
                            </div>
                            <div className="text-sm md:text-base lg:text-lg text-charcoal/60 font-medium">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default DynamicFAQ;