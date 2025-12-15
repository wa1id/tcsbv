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
    content?: any[];
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

interface ServiceDetailsClientProps {
    service: Service;
    siteSettings: SiteSettings;
}

const ServiceDetailsClient = ({ service, siteSettings }: ServiceDetailsClientProps) => {
    const containerRef = React.useRef(null);
    const heroRef = React.useRef(null);
    const contentRef = React.useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });
    const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" });
    const isContentInView = useInView(contentRef, { once: true, margin: "-100px" });

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

    const contentVariants = {
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

    // Get image URL from Sanity
    const imageUrl = service.image ? urlFor(service.image).width(1920).height(1080).url() : "/hero-new-1.jpg";

    // Extract text from content for fullDescription
    const getFullDescription = () => {
        if (service.content && service.content.length > 0) {
            // Extract text from PortableText blocks
            const extractText = (blocks: any[]): string => {
                return blocks
                    .map((block) => {
                        if (block._type === "block" && block.children) {
                            return block.children
                                .map((child: any) => child.text || "")
                                .join("");
                        }
                        return "";
                    })
                    .join(" ");
            };
            return extractText(service.content);
        }
        return service.description;
    };

    const fullDescription = getFullDescription();

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
                        src={imageUrl}
                        alt={service.title}
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
                            className="text-orange text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                        >
                            {service.title}
                        </motion.h1>
                        <motion.p
                            variants={textVariants}
                            initial="hidden"
                            animate={isHeroInView ? "visible" : "hidden"}
                            className="text-cream md:text-2xl mb-8"
                        >
                            {service.description}
                        </motion.p>
                        <motion.div
                            variants={textVariants}
                            initial="hidden"
                            animate={isHeroInView ? "visible" : "hidden"}
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

            {/* Content Section with H2, Description, and Image */}
            <div
                ref={containerRef}
                className="min-h-screen w-full py-20 px-4 md:px-8 lg:px-12 bg-cream"
            >
                <div className="max-w-[1450px] mx-auto w-full">
                    <motion.div
                        ref={contentRef}
                        variants={contentVariants}
                        initial="hidden"
                        animate={isContentInView ? "visible" : "hidden"}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                    >
                        {/* Text Content */}
                        <div className="space-y-6">
                            <motion.h2
                                variants={textVariants}
                                initial="hidden"
                                animate={isContentInView ? "visible" : "hidden"}
                                className="text-3xl md:text-5xl lg:text-6xl font-bold text-orange"
                            >
                                About {service.title}
                            </motion.h2>
                            <motion.p
                                variants={textVariants}
                                initial="hidden"
                                animate={isContentInView ? "visible" : "hidden"}
                                className="text-lg md:text-xl text-charcoal/80 leading-relaxed"
                            >
                                {fullDescription}
                            </motion.p>
                            <motion.p
                                variants={textVariants}
                                initial="hidden"
                                animate={isContentInView ? "visible" : "hidden"}
                                className="text-lg md:text-xl text-charcoal/80 leading-relaxed"
                            >
                                Our team of experienced professionals is dedicated to providing you with the highest quality service. We use only the best tools and equipment to ensure your vehicle receives the care it deserves.
                            </motion.p>
                        </div>

                        {/* Image */}
                        <motion.div
                            variants={contentVariants}
                            initial="hidden"
                            animate={isContentInView ? "visible" : "hidden"}
                            className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl"
                        >
                            <Image
                                src={imageUrl}
                                alt={service.title}
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
            <FAQ />
            <DynamicFooter siteSettings={siteSettings} />
        </>
    );
};

export default ServiceDetailsClient;

