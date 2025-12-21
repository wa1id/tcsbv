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
    detailPage?: { slug: { current: string } };
}

interface ServicesSectionProps {
    data: {
        title?: string;
        subtitle?: string;
        services?: Service[];
        numberOfServicesToShow?: number;
    };
}

function getServiceHref(service: Service): string | null {
    if (service.detailPage?.slug?.current) {
        return `/${service.detailPage.slug.current}`;
    }
    return null;
}

interface ServiceCardProps {
    service: Service;
    index: number;
    isInView: boolean;
    cardVariants: {
        hidden: { opacity: number; y: number };
        visible: (i: number) => {
            opacity: number;
            y: number;
            transition: { delay: number; duration: number; ease: readonly [number, number, number, number] };
        };
    };
}

const ServiceCard = ({ service, index, isInView, cardVariants }: ServiceCardProps) => {
    const imageUrl = service.image 
        ? urlFor(service.image).width(600).height(800).url()
        : null;
    const serviceHref = getServiceHref(service);

    const cardContent = (
        <>
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
                <h3 className="text-white text-2xl md:text-3xl font-semibold mb-3">
                    {service.title}
                </h3>

                <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-md mb-4">
                    {service.description}
                </p>

                {serviceHref && (
                    <span className="inline-block group-hover:bg-olive ease-in bg-orange text-cream px-8 py-3 rounded-full font-semibold text-sm md:text-base transition-colors duration-300 mt-4">
                        Meer info
                    </span>
                )}
            </div>
        </>
    );

    return (
        <motion.article
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            {serviceHref ? (
                <Link
                    href={serviceHref}
                    className="block relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden group"
                >
                    {cardContent}
                </Link>
            ) : (
                <div className="block relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden">
                    {cardContent}
                </div>
            )}
        </motion.article>
    );
};

const ServicesSection = ({ data }: ServicesSectionProps) => {
    const services = data.services || [];
    const numberOfServicesToShow = data.numberOfServicesToShow;
    const displayServices = numberOfServicesToShow 
        ? services.slice(0, numberOfServicesToShow) 
        : services;
    const title = data.title || 'Onze Diensten';
    const subtitle = data.subtitle || '';
    
    const totalCount = displayServices.length;
    const columnsPerRow = 3;
    const lastRowCount = totalCount % columnsPerRow;
    const hasIncompleteLastRow = lastRowCount > 0;
    const fullRowsCount = Math.floor(totalCount / columnsPerRow) * columnsPerRow;

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
                    {displayServices.slice(0, fullRowsCount).map((service, index) => (
                        <ServiceCard 
                            key={service._id}
                            service={service}
                            index={index}
                            isInView={isInView}
                            cardVariants={cardVariants}
                        />
                    ))}
                </div>

                {hasIncompleteLastRow && (
                    <div className="flex justify-center gap-6 lg:gap-8 mt-6 lg:mt-8">
                        {displayServices.slice(fullRowsCount).map((service, index) => (
                            <div key={service._id} className="w-full md:w-[calc(33.333%-1rem)] max-w-[450px]">
                                <ServiceCard 
                                    service={service}
                                    index={fullRowsCount + index}
                                    isInView={isInView}
                                    cardVariants={cardVariants}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServicesSection;
