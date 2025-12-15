"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import React from "react";

const Testimonials = () => {
    const testimonialsRef = React.useRef(null);
    const isTestimonialsInView = useInView(testimonialsRef, { once: true, margin: "-100px" });

    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Business Owner",
            image: "/men.jpg",
            rating: 5,
            text: "Exceptional service! They diagnosed my car's issue quickly and fixed it at a fair price. The team was professional and kept me informed throughout the process."
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Software Engineer",
            image: "/men.jpg",
            rating: 5,
            text: "I've been bringing my car here for years. Their attention to detail and honest approach to repairs makes them my go-to automotive service provider."
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            role: "Marketing Manager",
            image: "/men.jpg",
            rating: 5,
            text: "Outstanding customer service and quality work. They went above and beyond to ensure my car was running perfectly. Highly recommend!"
        }
    ];

    const testimonialVariants = {
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

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <div
            ref={testimonialsRef}
            className="relative w-full py-24 md:py-32 px-4 md:px-8 lg:px-12 bg-cream overflow-hidden"
        >
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-20 right-10 w-72 h-72 bg-orange/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-olive/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-[1450px] mx-auto">
                {/* Section Header */}
                <motion.div
                    variants={textVariants}
                    initial="hidden"
                    animate={isTestimonialsInView ? "visible" : "hidden"}
                    className="text-center mb-16 md:mb-20"
                >
                    <motion.div
                        variants={textVariants}
                        initial="hidden"
                        animate={isTestimonialsInView ? "visible" : "hidden"}
                        className="inline-block mb-4"
                    >
                        <span className="text-orange text-sm md:text-base font-semibold uppercase tracking-wider">
                            Client Testimonials
                        </span>
                    </motion.div>
                    <motion.h2
                        variants={textVariants}
                        initial="hidden"
                        animate={isTestimonialsInView ? "visible" : "hidden"}
                        className="text-charcoal text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                    >
                        What Our Customers Say
                    </motion.h2>
                    <motion.p
                        variants={textVariants}
                        initial="hidden"
                        animate={isTestimonialsInView ? "visible" : "hidden"}
                        className="text-charcoal/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
                    >
                        Don't just take our word for it - hear from our satisfied customers about their experience with our services
                    </motion.p>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            custom={index}
                            variants={testimonialVariants}
                            initial="hidden"
                            animate={isTestimonialsInView ? "visible" : "hidden"}
                            className="group relative"
                        >
                            <div className="relative h-full bg-white rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-2 border border-orange/10 hover:border-orange/20">
                                {/* Quote Icon */}
                                <div className="absolute top-6 right-6 text-orange/20 group-hover:text-orange/30 transition-colors duration-300">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                                    </svg>
                                </div>

                                {/* Rating Stars */}
                                <div className="flex items-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
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
                                    "{testimonial.text}"
                                </p>

                                {/* Customer Info */}
                                <div className="flex items-center">
                                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-orange/20">
                                        <Image
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            width={48}
                                            height={48}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-charcoal font-semibold text-lg">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-charcoal/60 text-sm">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>

                                {/* Hover Effect Line */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;