"use client";

import { motion, useInView } from "framer-motion";
import React from "react";

interface TestimonialsBlockProps {
  data: {
    title?: string;
    subtitle?: string;
    testimonials: any[];
    layout: 'carousel' | 'grid';
  };
}

const TestimonialsBlock = ({ data }: TestimonialsBlockProps) => {
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
      className="py-16 px-4 md:px-8 lg:px-12 bg-white"
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
          {data.testimonials?.map((testimonial, index) => (
            <div key={testimonial._id || index} className="bg-cream rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < (testimonial.rating || 5) ? 'text-orange' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-charcoal/80 mb-4 italic">
                "{testimonial.content}"
              </p>
              <div>
                <p className="font-semibold text-charcoal">
                  {testimonial.name}
                </p>
                {testimonial.company && (
                  <p className="text-sm text-charcoal/60">
                    {testimonial.position} at {testimonial.company}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialsBlock;