"use client";

import { PortableText } from '@portabletext/react';
import { motion, useInView } from "framer-motion";
import React from "react";

interface TextBlockProps {
  data: {
    title?: string;
    content: any[];
    backgroundColor: 'white' | 'cream' | 'gray';
  };
}

const TextBlock = ({ data }: TextBlockProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getBackgroundColor = (color: string) => {
    switch (color) {
      case 'cream':
        return 'bg-cream';
      case 'gray':
        return 'bg-gray-100';
      default:
        return 'bg-white';
    }
  };

  const cardVariants = {
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

  const portableTextComponents = {
    block: {
      h1: ({ children }: any) => (
        <h1 className="text-4xl md:text-5xl font-bold text-orange mb-6">{children}</h1>
      ),
      h2: ({ children }: any) => (
        <h2 className="text-3xl md:text-4xl font-bold text-orange mb-4">{children}</h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="text-2xl md:text-3xl font-semibold text-charcoal mb-3">{children}</h3>
      ),
      normal: ({ children }: any) => (
        <p className="text-lg text-charcoal/80 mb-4 leading-relaxed">{children}</p>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-orange pl-6 italic text-xl text-charcoal/70 my-6">
          {children}
        </blockquote>
      ),
    },
    marks: {
      strong: ({ children }: any) => <strong className="font-bold text-charcoal">{children}</strong>,
      em: ({ children }: any) => <em className="italic">{children}</em>,
      link: ({ children, value }: any) => (
        <a
          href={value.href}
          className="text-orange hover:text-olive underline transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`py-16 px-4 md:px-8 lg:px-12 ${getBackgroundColor(data.backgroundColor)}`}
    >
      <div className="max-w-4xl mx-auto">
        {data.title && (
          <h2 className="text-3xl md:text-4xl font-bold text-orange mb-8 text-center">
            {data.title}
          </h2>
        )}
        <div className="prose prose-lg max-w-none">
          <PortableText value={data.content} components={portableTextComponents} />
        </div>
      </div>
    </motion.div>
  );
};

export default TextBlock;