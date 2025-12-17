"use client";

import { motion, useInView } from "framer-motion";
import React from "react";

interface ServicesBlockProps {
  data: {
    title?: string;
    subtitle?: string;
    services: any[];
    layout: 'grid' | 'carousel' | 'list';
  };
}

const ServicesBlock = ({ data }: ServicesBlockProps) => {
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

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="py-16 px-4 md:px-8 lg:px-12 bg-cream"
    >
      <div className="max-w-6xl mx-auto">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.services?.map((service, index) => (
            <div key={service._id || index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-charcoal mb-3">
                {service.title}
              </h3>
              <p className="text-charcoal/70 mb-4">
                {service.description}
              </p>
              {service.price && (
                <p className="text-orange font-semibold">
                  {service.price}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ServicesBlock;