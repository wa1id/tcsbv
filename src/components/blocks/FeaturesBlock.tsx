"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import React from "react";
import { urlFor } from "@/sanity/lib/image";

interface FeaturesBlockProps {
  data: {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    features: Array<{
      icon?: any;
      title: string;
      description: string;
    }>;
    ctaButton?: {
      enabled?: boolean;
      text?: string;
      linkType?: string;
      internalLink?: any;
      externalUrl?: string;
    };
    backgroundColor: 'dark' | 'light' | 'white';
    layout: '2x3' | '3x2' | '1x6';
  };
}

const FeaturesBlock = ({ data }: FeaturesBlockProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getBackgroundColor = () => {
    switch (data.backgroundColor) {
      case 'dark':
        return 'bg-charcoal';
      case 'light':
        return 'bg-cream';
      default:
        return 'bg-white';
    }
  };

  const getTextColor = () => {
    return data.backgroundColor === 'dark' ? 'text-cream' : 'text-charcoal';
  };

  const getGridLayout = () => {
    switch (data.layout) {
      case '3x2':
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case '1x6':
        return 'grid-cols-1';
      default: // '2x3'
        return 'grid-cols-1 md:grid-cols-2';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
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

  const getButtonUrl = () => {
    if (data.ctaButton?.linkType === 'internal' && data.ctaButton?.internalLink?.slug?.current) {
      return `/${data.ctaButton.internalLink.slug.current}`;
    }
    if (data.ctaButton?.linkType === 'external' && data.ctaButton?.externalUrl) {
      return data.ctaButton.externalUrl;
    }
    return '/contact';
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`py-16 px-4 md:px-8 lg:px-12 ${getBackgroundColor()}`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          {data.eyebrow && (
            <motion.p
              variants={itemVariants}
              className="text-orange text-sm font-semibold tracking-wider uppercase mb-4"
            >
              {data.eyebrow}
            </motion.p>
          )}
          <motion.h2
            variants={itemVariants}
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 ${getTextColor()}`}
          >
            {data.title}
          </motion.h2>
          {data.subtitle && (
            <motion.p
              variants={itemVariants}
              className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${
                data.backgroundColor === 'dark' ? 'text-cream/80' : 'text-charcoal/80'
              }`}
            >
              {data.subtitle}
            </motion.p>
          )}
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          className={`grid ${getGridLayout()} gap-6 mb-12`}
        >
          {data.features?.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`p-6 rounded-xl border ${
                data.backgroundColor === 'dark'
                  ? 'border-cream/20 bg-charcoal/50'
                  : 'border-charcoal/20 bg-white/50'
              } hover:border-orange/50 transition-colors duration-300`}
            >
              {/* Icon */}
              <div className="mb-4">
                {feature.icon ? (
                  <Image
                    src={urlFor(feature.icon).url()}
                    alt={feature.title}
                    width={48}
                    height={48}
                    className="w-12 h-12"
                  />
                ) : (
                  <div className="w-12 h-12 bg-orange rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-cream"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Content */}
              <h3 className={`text-xl font-semibold mb-3 text-orange`}>
                {feature.title}
              </h3>
              <p className={`leading-relaxed ${
                data.backgroundColor === 'dark' ? 'text-cream/70' : 'text-charcoal/70'
              }`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        {data.ctaButton?.enabled && (
          <motion.div
            variants={itemVariants}
            className="text-center"
          >
            <Link
              href={getButtonUrl()}
              className="inline-block bg-orange hover:bg-olive text-cream px-8 py-4 rounded-full font-semibold text-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              {data.ctaButton.text || 'Get Started Today'}
            </Link>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default FeaturesBlock;