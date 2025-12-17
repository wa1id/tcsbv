"use client";

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

interface HomeHeroBlockProps {
  data: {
    welcomeText: string;
    mainHeadline: string;
    backgroundImage?: any;
    ctaButton?: {
      text: string;
      url: string;
    };
    contactForm?: {
      showForm: boolean;
      formTitle: string;
    };
    contactInfo?: {
      questionText: string;
      phoneText: string;
    };
  };
  siteSettings?: any;
}

const HomeHeroBlock = ({ data, siteSettings }: HomeHeroBlockProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const backgroundImage = data?.backgroundImage
    ? urlFor(data.backgroundImage).width(1400).height(1200).url()
    : '/hero-new.jpg'

  const representativeImage = '/men.jpg'

  const headlineLines = data?.mainHeadline
    ? data.mainHeadline.split('\n').filter(Boolean)
    : ['Highly skilled certified', 'mechanics', 'guaranteed.']

  const ctaLink = data?.ctaButton?.linkType === 'internal' && data?.ctaButton?.internalLink?.slug?.current
    ? `/${data.ctaButton.internalLink.slug.current}`
    : data?.ctaButton?.linkType === 'external' && data?.ctaButton?.externalUrl
    ? data.ctaButton.externalUrl
    : '/contact'
  const ctaText = data?.ctaButton?.text || 'Need a car inspection?'
  const welcomeText = data?.welcomeText || 'Welcome to TCsBV'
  const contactPrompt = data?.contactInfo?.questionText || 'Got a question about our services?'
  const contactPhone = siteSettings?.contactInfo?.phone || '1.800.123.4567'
  const showForm = data?.contactForm?.showForm !== false
  const formButtonText = data?.contactForm?.formTitle || 'Book appointment'

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      }
    }
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      }
    }
  }

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.4,
        ease: [0.16, 1, 0.3, 1] as const,
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - could integrate with your SES API
    console.log('Form submitted:', formData);
  };

  return (
    <div className=''>
      <motion.div 
        className='max-w-[1450px] mx-auto px-4 pt-24 md:pt-28'
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div 
          className='bg-white shadow md:shadow-xl min-h-[400px] lg:h-[600px] rounded-[20px] lg:rounded-[34px] w-full overflow-hidden flex flex-col lg:flex-row'
          variants={itemVariants}
        >
          {/* Image Section - 50% */}
          <motion.div 
            className='w-full lg:w-1/2 h-[300px] sm:h-[400px] lg:h-full relative'
            variants={imageVariants}
          >
            <Image
              src={backgroundImage}
              alt="Professional Technician"
              fill
              className='object-cover'
              priority
            />
            {showForm && (
              <motion.div 
                className='absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-6 bg-white rounded-lg shadow-xl p-4 lg:p-6'
                variants={formVariants}
              >
                <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-3 lg:gap-4 items-stretch sm:items-center'>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name ... *"
                    className='flex-1 min-w-0 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg bg-gray-100 text-charcoal placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange focus:bg-white transition-all text-sm lg:text-base'
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email ... *"
                    className='flex-1 min-w-0 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg bg-gray-100 text-charcoal placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange focus:bg-white transition-all text-sm lg:text-base'
                  />
                  <button 
                    type="submit"
                    className='bg-orange hover:bg-[#da640e]/90 text-white px-4 lg:px-6 py-2.5 lg:py-3 rounded-lg font-semibold transition-colors whitespace-nowrap flex-shrink-0 text-sm lg:text-base'
                  >
                    {formButtonText}
                  </button>
                </form>
              </motion.div>
            )}
          </motion.div>
          {/* Text/Content Section - 50% */}
          <motion.div 
            className='w-full lg:w-1/2 h-auto lg:h-full flex flex-col justify-center items-start px-6 sm:px-8 lg:px-12 pt-8 sm:pt-12 lg:pt-28 pb-8 lg:pb-0 relative'
            variants={itemVariants}
          >
            {/* SVG Decoration - Top Right */}
            <motion.div 
              className='hidden lg:block absolute bottom-[-1.5rem] right-[-1rem] w-60 h-60'
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 0.7, rotate: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <Image
                src="/square-tiny-alternates.svg"
                alt="Decoration"
                width={200}
                height={200}
                className='object-contain opacity-70'
              />
            </motion.div>
            {/* Welcome Text - Top */}
            <motion.p 
              className='text-orange mb-3 lg:mb-4 text-xs sm:text-sm font-medium'
              variants={itemVariants}
            >
              {welcomeText}
            </motion.p>

            {/* Main Headline */}
            <motion.h1 
              className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0e1306]/80 mb-6 lg:mb-8 leading-tight'
              variants={itemVariants}
            >
              {headlineLines.map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < headlineLines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </motion.h1>

            {/* Button */}
            <motion.div 
              className='mb-6 lg:mb-auto'
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href={ctaLink}
                className='inline-block bg-orange hover:bg-olive text-cream px-6 sm:px-8 py-3 lg:py-4 rounded-lg font-semibold text-base sm:text-lg shadow-lg transition-colors'
              >
                {ctaText}
              </Link>
            </motion.div>

            {/* Bottom Contact Section */}
            <motion.div 
              className='relative lg:absolute bottom-0 lg:bottom-8 left-0 lg:left-12 flex items-center gap-3 lg:gap-4 mt-auto lg:mt-0'
              variants={itemVariants}
            >
              <motion.div 
                className='w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full border-2 border-orange overflow-hidden flex-shrink-0'
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300, ease: [0.16, 1, 0.3, 1] as const }}
              >
                <Image
                  src={representativeImage}
                  alt="Service Representative"
                  width={64}
                  height={64}
                  className='object-cover w-full h-full'
                />
              </motion.div>
              <div>
                <p className='text-charcoal text-xs sm:text-sm lg:text-base mb-1'>
                  {contactPrompt}
                </p>
                <p className='text-orange text-xs sm:text-sm lg:text-base font-medium'>
                  Call us : {contactPhone}
                </p>
              </div>
            </motion.div>
          </motion.div>

        </motion.div>

      </motion.div>
    </div>
  )
};

export default HomeHeroBlock;