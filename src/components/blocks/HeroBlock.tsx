"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import React from "react";
import { urlFor } from "@/sanity/lib/image";

interface HeroBlockProps {
  data: {
    title: string;
    subtitle?: string;
    description?: string;
    backgroundImage?: any;
    ctaButtons?: Array<{
      text: string;
      url: string;
      style: 'primary' | 'secondary' | 'outline';
    }>;
  };
}

const HeroBlock = ({ data }: HeroBlockProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

  const getButtonStyles = (style: string) => {
    switch (style) {
      case 'primary':
        return 'bg-orange hover:bg-olive text-cream';
      case 'secondary':
        return 'bg-cream hover:bg-cream/90 text-charcoal';
      case 'outline':
        return 'border-2 border-cream text-cream hover:bg-cream hover:text-charcoal';
      default:
        return 'bg-orange hover:bg-olive text-cream';
    }
  };

  return (
    <div ref={ref} className="relative w-full h-[500px] md:h-[600px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        {data.backgroundImage ? (
          <Image
            src={urlFor(data.backgroundImage).url()}
            alt={data.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-charcoal" />
        )}
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal to-charcoal opacity-80" />
      </div>

      {/* Content Overlay */}
      <motion.div
        variants={heroVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 h-full flex items-center justify-center max-w-[1450px] mx-auto px-4 md:px-8 lg:px-12"
      >
        <div className="max-w-4xl text-center">
          <h1 className="text-orange text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {data.title}
          </h1>
          {data.subtitle && (
            <p className="text-cream text-xl md:text-2xl mb-4">
              {data.subtitle}
            </p>
          )}
          {data.description && (
            <p className="text-cream/80 text-lg mb-8 max-w-2xl mx-auto">
              {data.description}
            </p>
          )}
          {data.ctaButtons && data.ctaButtons.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {data.ctaButtons.map((button, index) => (
                <Link key={index} href={button.url}>
                  <button
                    className={`px-8 py-4 rounded-full font-semibold text-lg transition-colors duration-300 ${getButtonStyles(button.style)}`}
                  >
                    {button.text}
                  </button>
                </Link>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default HeroBlock;