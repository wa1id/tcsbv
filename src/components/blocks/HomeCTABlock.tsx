"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import React from "react";
import { urlFor } from "@/sanity/lib/image";

interface HomeCTABlockProps {
  data: {
    featureCards: Array<{
      icon?: any;
      title: string;
      description: string;
    }>;
    backgroundImage?: any;
    mainHeadline: string;
    subtext: string;
    ctaButtons: Array<{
      text: string;
      url: string;
      style: 'primary' | 'secondary';
    }>;
  };
}

const HomeCTABlock = ({ data }: HomeCTABlockProps) => {
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
    <div ref={containerRef} className="relative mt-20 sm:mt-32 md:mt-40 w-full">
      {/* Feature Cards Section - Top */}
      <div className="relative lg:absolute top-0 lg:top-[-12rem] left-0 right-0 z-10 max-w-[1080px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-8 sm:pt-12 md:pt-16 lg:pt-20 mb-8 lg:mb-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {data.featureCards.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="bg-orange rounded-xl px-5 sm:px-6 md:px-8 pt-8 sm:pt-10 pb-10 sm:pb-12 md:pb-14 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-orange mb-3 sm:mb-4">
                {feature.icon ? (
                  <Image
                    src={urlFor(feature.icon).url()}
                    alt={feature.title}
                    width={48}
                    height={48}
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
                  />
                ) : (
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-cream rounded-lg" />
                )}
              </div>
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
      <div
        ref={heroRef}
        className="relative w-full h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px] mt-0 lg:mt-8 md:mt-12"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          {data.backgroundImage ? (
            <Image
              src={urlFor(data.backgroundImage).url()}
              alt={data.mainHeadline || 'CTA background'}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-charcoal" />
          )}
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal to-charcoal opacity-75" />
        </div>

        {/* Content Overlay */}
        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate={isHeroInView ? "visible" : "hidden"}
          className="relative z-10 h-full flex items-center justify-center max-w-[1450px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12"
        >
          <div className="max-w-2xl text-center mt-8 sm:mt-12 lg:mt-16 px-2">
            {/* Main Heading */}
            <h2 className="text-orange text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
              {data.mainHeadline}
            </h2>

            {/* Sub-text */}
            <p className="text-cream text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 text-center">
              {data.subtext}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              {data.ctaButtons.map((button, index) => (
                <React.Fragment key={index}>
                  {button.style === 'primary' ? (
                    <Link href={button.url}>
                      <button className="bg-cream hover:bg-cream/90 text-charcoal px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-colors duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto">
                        {button.text}
                      </button>
                    </Link>
                  ) : (
                    <a
                      href={button.url}
                      className="flex items-center justify-center gap-2 text-cream hover:text-gold transition-colors duration-300 group"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span className="text-sm sm:text-base md:text-lg font-medium">
                        {button.text}
                      </span>
                    </a>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeCTABlock;