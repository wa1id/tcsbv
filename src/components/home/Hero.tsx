'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'

const Hero = () => {
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
              src="/hero-new.jpg"
              alt="Professional Technician"
              fill
              className='object-cover'
              priority
            />
            {/* Booking Form - Bottom */}
            <motion.div 
              className='absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-6 bg-white rounded-lg shadow-xl p-4 lg:p-6'
              variants={formVariants}
            >
              <div className='flex flex-col sm:flex-row gap-3 lg:gap-4 items-stretch sm:items-center'>
                <input
                  type="text"
                  placeholder="Name ... *"
                  className='flex-1 min-w-0 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg bg-gray-100 text-charcoal placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange focus:bg-white transition-all text-sm lg:text-base'
                />
                <input
                  type="email"
                  placeholder="Email ... *"
                  className='flex-1 min-w-0 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg bg-gray-100 text-charcoal placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange focus:bg-white transition-all text-sm lg:text-base'
                />
                <button className='bg-orange hover:bg-[#da640e]/90 text-white px-4 lg:px-6 py-2.5 lg:py-3 rounded-lg font-semibold transition-colors whitespace-nowrap flex-shrink-0 text-sm lg:text-base'>
                  Book appointment
                </button>
              </div>
            </motion.div>
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
              Welcome to TCsBV
            </motion.p>

            {/* Main Headline */}
            <motion.h1 
              className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0e1306]/80 mb-6 lg:mb-8 leading-tight'
              variants={itemVariants}
            >
              Highly skilled certified <br />
              mechanics<br />
              guaranteed.
            </motion.h1>

            {/* Button */}
            <motion.button 
              className='bg-orange hover:bg-olive text-cream px-6 sm:px-8 py-3 lg:py-4 rounded-lg font-semibold text-base sm:text-lg shadow-lg hover:bg-gray-100 transition-colors mb-6 lg:mb-auto'
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              >
                <a href="/contact">Need a car inspection?</a>
              
            </motion.button>

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
                  src="/men.jpg"
                  alt="Service Representative"
                  width={64}
                  height={64}
                  className='object-cover w-full h-full'
                />
              </motion.div>
              <div>
                <p className='text-charcoal text-xs sm:text-sm lg:text-base mb-1'>
                  Got a question about our services?
                </p>
                <p className='text-orange text-xs sm:text-sm lg:text-base font-medium'>
                  Call us : 1.800.123.4567
                </p>
              </div>
            </motion.div>
          </motion.div>

        </motion.div>

      </motion.div>
    </div>
  )
}

export default Hero