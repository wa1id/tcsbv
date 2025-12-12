"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import React from "react";

const CTA = () => {
    const features = [
        {
            id: 1,
            icon: (
                <Image
                    src="/motor-white.png"
                    alt="Engine performance"
                    width={48}
                    height={48}
                    className="w-16 h-16"
                />
            ),
            title: "Engine performance",
            description: "Tempus tincidunt neque.",
        },
        {
            id: 2,
            icon: (
                <Image
                    src="/diagnostic-white.png"
                    alt="Detailed diagnostic"
                    width={48}
                    height={48}
                    className="w-16 h-16"
                />
            ),
            title: "Detailed diagnostic",
            description: "Tempus tincidunt neque.",
        },
        {
            id: 3,
            icon: (
                <Image
                    src="/tag.png"
                    alt="Reasonable price"
                    width={48}
                    height={48}
                    className="w-16 h-16"
                />
            ),
            title: "Reasonable price",
            description: "Tempus tincidunt neque.",
        },
    ];

    const containerRef = React.useRef(null);
    const heroRef = React.useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });
    const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" });

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
        <div ref={containerRef} className="relative mt-40 w-full">
            {/* Feature Cards Section - Top */}
            <div className="absolute top-[-12rem] left-0 right-0 z-10 max-w-[1080px] mx-auto px-4 md:px-8 lg:px-12 pt-12 md:pt-16 lg:pt-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.id}
                            custom={index}
                            variants={cardVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="bg-orange rounded-xl px-6 md:px-8  pt-10 pb-14 shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="text-orange mb-4">{feature.icon}</div>
                            <h3 className=" text-xl text-cream md:text-2xl font-semibold mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-cream text-sm md:text-base">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Hero Section with Background Image */}
            <div
                ref={heroRef}
                className="relative w-full h-[600px] mt-8 md:mt-12"
            >
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="/hero-new-1.jpg"
                        alt="Automotive Service"
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
                    animate={isHeroInView ? "visible" : "hidden"}
                    className="relative z-10 h-full flex items-center justify-center max-w-[1450px] mx-auto px-4 md:px-8 lg:px-12"
                >
                    <div className="max-w-2xl text-center mt-16">
                        {/* Main Heading */}
                        <h2 className="text-orange text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                            We strive for excellence in everything we do.
                        </h2>

                        {/* Sub-text */}
                        <p className="text-cream text-lg md:text-xl mb-8 text-center">
                            Massa euismod laoreet faucibus cras non amet.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <button className="bg-cream hover:bg-cream/90 text-charcoal px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300 shadow-lg hover:shadow-xl">
                                Need a car inspection?
                            </button>
                            <a
                                href="#faq"
                                className="flex items-center gap-2 text-cream hover:text-gold transition-colors duration-300 group"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    className="w-5 h-5 group-hover:scale-110 transition-transform"
                                >
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                                <span className="text-base md:text-lg font-medium">
                                    Frequently asked questions
                                </span>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CTA;

