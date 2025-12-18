"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import React from "react";
import Link from "next/link";

const Services = () => {
    const services = [
        {
            id: 1,
            number: "01",
            title: "Diagnostic service",
            description: "Dodales magna nisi in id cursus enim Nulla porttitor accumsan tincidunt.",
            image: "/hero-new-1.jpg", // You can replace with actual service images
        },
        {
            id: 2,
            number: "02",
            title: "Vehicle inspection",
            description: "Est at sodales magna nisi in id cursus enim viverra. Viverra adipiscing pretium.",
            image: "/hero-new.jpg", // You can replace with actual service images
        },
        {
            id: 3,
            number: "03",
            title: "Performance upgrade",
            description: "Nulla porttitor accumsan tincidunt. Sed porttitor lectus nibh.",
            image: "/hero.png", // You can replace with actual service images
        },
    ];

    const containerRef = React.useRef(null);
    const headingRef = React.useRef(null);
    const textRef = React.useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });
    const isHeadingInView = useInView(headingRef, { once: true, margin: "-100px" });
    const isTextInView = useInView(textRef, { once: true, margin: "-100px" });

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

    return (
        <div
            ref={containerRef}
            className="min-h-screen w-full flex items-center justify-center py-20 px-4 md:px-8 lg:px-12"
        >
            <div className="max-w-[1450px] mx-auto w-full">
                {/* Heading Section */}
                <div className="text-center mb-12 md:mb-16 lg:mb-20">
                    <motion.h2
                        ref={headingRef}
                        className="text-3xl md:text-5xl lg:text-6xl font-bold text-orange mb-4"
                        variants={textVariants}
                        initial="hidden"
                        animate={isHeadingInView ? "visible" : "hidden"}
                    >
                        Our Services
                    </motion.h2>
                    <motion.p
                        ref={textRef}
                        className=" md:text-xl text-charcoal max-w-2xl mx-auto"
                        variants={textVariants}
                        initial="hidden"
                        animate={isTextInView ? "visible" : "hidden"}
                    >
                        Wij bieden complete oplossingen voor verwarming, domotica, onderhoud en renovatie.
                    </motion.p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            custom={index}
                            variants={cardVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden group"
                        >
                            {/* Background Image */}
                            <Image
                                src={service.image}
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
                                    {service.number}
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
                                    href={`/services/${service.id}`}
                                    className="inline-block hover:bg-olive ease-in  bg-orange  text-cream px-8 py-3 rounded-full font-semibold text-sm md:text-base transition-colors duration-300 mt-4"
                                >
                                    View Details
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;

