"use client";

import { motion, useInView } from "framer-motion";
import React, { useState } from "react";
import { PortableText } from '@portabletext/react';

interface FAQ {
    _id: string;
    question: string;
    answer: any[];
    category: string;
    order: number;
    featured: boolean;
}

interface FAQSectionProps {
    data: {
        title?: string;
        subtitle?: string;
        faqs?: FAQ[];
    };
}

const FAQSection = ({ data }: FAQSectionProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    
    const faqs = data.faqs || [];
    const title = data.title || 'Veelgestelde vragen';
    const subtitle = data.subtitle || '';
    
    const featuredFaqs = faqs.filter(faq => faq.featured);
    const displayFaqs = featuredFaqs.length > 0 ? featuredFaqs : faqs;

    const containerRef = React.useRef(null);
    const titleRef = React.useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });
    const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" });

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

    const portableTextComponents = {
        block: {
            normal: ({ children }: any) => (
                <p className="text-sm md:text-base text-charcoal/70 leading-relaxed">
                    {children}
                </p>
            ),
        },
    };

    if (displayFaqs.length === 0) {
        return null;
    }

    return (
        <div
            ref={containerRef}
            id="faq"
            className="w-full py-20 md:py-28 lg:py-32 px-4 md:px-8 lg:px-12"
        >
            <div className="max-w-[1450px] mx-auto">
                <motion.div
                    ref={titleRef}
                    variants={titleVariants}
                    initial="hidden"
                    animate={isTitleInView ? "visible" : "hidden"}
                    className="text-center mb-12 md:mb-16"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-4">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-lg md:text-xl text-charcoal/70 max-w-2xl mx-auto">
                            {subtitle}
                        </p>
                    )}
                </motion.div>

                <div className="max-w-3xl mx-auto space-y-4 md:space-y-5">
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

                                <div className="flex-1">
                                    <h3 className="text-base md:text-lg lg:text-xl font-semibold text-charcoal pr-4">
                                        {item.question}
                                    </h3>
                                </div>
                            </button>

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
    );
};

export default FAQSection;
