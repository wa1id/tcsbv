"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface Testimonial {
  _id: string;
  name: string;
  company?: string;
  position?: string;
  content: string;
  rating: number;
  image?: any;
  dateGiven?: string;
  service?: {
    title: string;
    slug: { current: string };
  };
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, className = "" }) => {
  return (
    <div className={`group relative ${className}`}>
      <div className="relative h-full bg-white rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-2 border border-orange/10 hover:border-orange/20">
        {/* Quote Icon */}
        <div className="absolute top-6 right-6 text-orange/20 group-hover:text-orange/30 transition-colors duration-300">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
          </svg>
        </div>

        {/* Rating Stars */}
        <div className="flex items-center mb-4">
          {[...Array(testimonial.rating || 5)].map((_, i) => (
            <svg
              key={i}
              className="w-5 h-5 text-orange"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Testimonial Text */}
        <p className="text-charcoal text-base md:text-lg leading-relaxed mb-6 italic">
          "{testimonial.content}"
        </p>

        {/* Customer Info */}
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-orange/20">
            {testimonial.image ? (
              <Image
                src={urlFor(testimonial.image).width(48).height(48).url()}
                alt={testimonial.name}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-orange/10 flex items-center justify-center">
                <span className="text-orange font-semibold text-lg">
                  {testimonial.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <div>
            <h4 className="text-charcoal font-semibold text-lg">
              {testimonial.name}
            </h4>
            <p className="text-charcoal/60 text-sm">
              {testimonial.position && testimonial.company 
                ? `${testimonial.position} at ${testimonial.company}`
                : testimonial.position || testimonial.company || 'Valued Customer'
              }
            </p>
          </div>
        </div>

        {/* Service Badge (if linked to a service) */}
        {testimonial.service && (
          <div className="absolute top-6 left-6">
            <span className="inline-block bg-orange/10 text-orange text-xs font-medium px-2 py-1 rounded-full">
              {testimonial.service.title}
            </span>
          </div>
        )}

        {/* Date */}
        {testimonial.dateGiven && (
          <div className="absolute bottom-6 right-6">
            <span className="text-charcoal/40 text-xs">
              {new Date(testimonial.dateGiven).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
              })}
            </span>
          </div>
        )}

        {/* Hover Effect Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl" />
      </div>
    </div>
  );
};

export default TestimonialCard;