"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import React from "react";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

interface Service {
    _id: string;
    title: string;
    slug: { current: string };
    description: string;
    icon?: any;
    image?: any;
    features?: string[];
    price?: string;
    order: number;
    featured: boolean;
}

interface ServicesSectionProps {
    data: {
        title?: string;
        subtitle?: string;
        services?: Service[];
        layout?: 'grid' | 'carousel' | 'list';
    };
}

const ServicesSection = ({ data }: ServicesSectionProps) => {
    const services = data.services || [];
    const displayServices = services.slice(0, 3);
    const title = data.title || 'Onze Diensten';
    const subtitle = data.subtitle || '';

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

    if (displayServices.length === 0) {
        return null;
    }

    return (
        <div
            ref={containerRef}
            className="w-full flex items-center justify-center py-20 px-4 md:px-8 lg:px-12"
        >
            <div className="max-w-[1450px] mx-auto w-full">
                <div className="text-center mb-12 md:mb-16 lg:mb-20">
                    <motion.h2
                        ref={headingRef}
                        className="text-3xl md:text-5xl lg:text-6xl font-bold text-orange mb-4"
                        variants={textVariants}
                        initial="hidden"
                        animate={isHeadingInView ? "visible" : "hidden"}
                    >
                        {title}
                    </motion.h2>
                    {subtitle && (
                        <motion.p
                            ref={textRef}
                            className="md:text-xl text-charcoal max-w-2xl mx-auto"
                            variants={textVariants}
                            initial="hidden"
                            animate={isTextInView ? "visible" : "hidden"}
                        >
                            {subtitle}
                        </motion.p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {displayServices.map((service, index) => {
                        const imageUrl = service.image 
                            ? urlFor(service.image).width(600).height(800).url()
                            : null;

                        return (
                            <motion.article
                                key={service._id}
                                custom={index}
                                variants={cardVariants}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                            >
                                <Link
                                    href={`/services/${service.slug.current}`}
                                    className="block relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden group"
                                >
                                    {imageUrl ? (
                                        <Image
                                            src={imageUrl}
                                            alt=""
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-charcoal/80 group-hover:scale-110 transition-transform duration-500" />
                                    )}

                                    <div className="absolute transition-opacity duration-500 inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10">
                                        <div className="text-orange text-7xl md:text-8xl lg:text-9xl font-bold mb-4 leading-none" aria-hidden="true">
                                            {String(index + 1).padStart(2, '0')}
                                        </div>

                                        <h3 className="text-white text-2xl md:text-3xl font-semibold mb-3">
                                            {service.title}
                                        </h3>

                                        <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-md mb-4">
                                            {service.description}
                                        </p>

                                        <span className="inline-block group-hover:bg-olive ease-in bg-orange text-cream px-8 py-3 rounded-full font-semibold text-sm md:text-base transition-colors duration-300 mt-4">
                                            Meer info
                                        </span>
                                    </div>
                                </Link>
                            </motion.article>
                        );
                    })}
                </div>

                {services.length > 3 && (
                    <div className="text-center mt-12 md:mt-16">
                        <Link
                            href="/services"
                            className="inline-block bg-charcoal hover:bg-charcoal/90 text-cream px-8 py-4 rounded-full font-semibold text-lg transition-colors duration-300"
                        >
                            Bekijk alle diensten
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServicesSection;
