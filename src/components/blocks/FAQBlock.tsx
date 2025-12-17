"use client";

import { motion, useInView } from "framer-motion";
import React, { useState } from "react";
import { PortableText } from '@portabletext/react';

interface FAQBlockProps {
  data: {
    title?: string;
    subtitle?: string;
    faqs: any[];
  };
}

const FAQBlock = ({ data }: FAQBlockProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="py-16 px-4 md:px-8 lg:px-12 bg-gray-100"
    >
      <div className="max-w-4xl mx-auto">
        {data.title && (
          <h2 className="text-3xl md:text-4xl font-bold text-orange mb-4 text-center">
            {data.title}
          </h2>
        )}
        {data.subtitle && (
          <p className="text-lg text-charcoal/80 mb-8 text-center max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        )}
        
        <div className="space-y-4">
          {data.faqs?.map((faq, index) => (
            <div key={faq._id || index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-charcoal pr-4">
                  {faq.question}
                </h3>
                <svg
                  className={`w-5 h-5 text-orange transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <div className="text-charcoal/80 leading-relaxed">
                    {faq.answer ? (
                      <PortableText value={faq.answer} />
                    ) : (
                      <p>No answer provided.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FAQBlock;