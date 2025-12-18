"use client";

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { urlFor } from '@/sanity/lib/image'

interface HeroBlockProps {
  data: {
    style?: 'default' | 'home';
    backgroundImage?: any;
    // Default style
    title?: string;
    subtitle?: string;
    description?: string;
    ctaButtons?: Array<{
      text: string;
      url: string;
      buttonStyle: 'primary' | 'secondary' | 'outline';
    }>;
    // Home style
    welcomeText?: string;
    mainHeadline?: string;
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

const HeroBlock = ({ data, siteSettings }: HeroBlockProps) => {
  if (data.style === 'home') {
    return <HomeHero data={data} siteSettings={siteSettings} />
  }
  return <DefaultHero data={data} />
}

function DefaultHero({ data }: { data: HeroBlockProps['data'] }) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

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
  }

  const getButtonStyles = (style: string) => {
    switch (style) {
      case 'primary':
        return 'bg-orange hover:bg-olive text-cream'
      case 'secondary':
        return 'bg-cream hover:bg-cream/90 text-charcoal'
      case 'outline':
        return 'border-2 border-cream text-cream hover:bg-cream hover:text-charcoal'
      default:
        return 'bg-orange hover:bg-olive text-cream'
    }
  }

  return (
    <div ref={ref} className="relative w-full h-[500px] md:h-[600px]">
      <div className="absolute inset-0">
        {data.backgroundImage ? (
          <Image
            src={urlFor(data.backgroundImage).url()}
            alt={data.title || ''}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-charcoal" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal to-charcoal opacity-80" />
      </div>

      <motion.div
        variants={heroVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 h-full flex items-center justify-center max-w-[1450px] mx-auto px-4 md:px-8 lg:px-12"
      >
        <div className="max-w-4xl text-center">
          <h1 className="text-orange text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {data.title}
          </h1>
          {data.subtitle && (
            <p className="text-cream text-xl md:text-2xl mb-4">
              {data.subtitle}
            </p>
          )}
          {data.description && (
            <p className="text-cream/80 text-lg mb-8 max-w-2xl mx-auto">
              {data.description}
            </p>
          )}
          {data.ctaButtons && data.ctaButtons.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {data.ctaButtons.map((button, index) => (
                <Link key={index} href={button.url}>
                  <button
                    className={`px-8 py-4 rounded-full font-semibold text-lg transition-colors duration-300 ${getButtonStyles(button.buttonStyle)}`}
                  >
                    {button.text}
                  </button>
                </Link>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

function HomeHero({ data, siteSettings }: { data: HeroBlockProps['data']; siteSettings?: any }) {
  const [formData, setFormData] = useState({ name: "", email: "" })

  const backgroundImage = data?.backgroundImage
    ? urlFor(data.backgroundImage).width(1400).height(1200).url()
    : '/hero-new.jpg'

  const headlineLines = data?.mainHeadline
    ? data.mainHeadline.split('\n').filter(Boolean)
    : ['Highly skilled certified', 'mechanics', 'guaranteed.']

  const ctaLink = data?.ctaButton?.url || '/contact'
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
      transition: { duration: 0.6, staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    }
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  }

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] as const }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <div>
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

          <motion.div 
            className='w-full lg:w-1/2 h-auto lg:h-full flex flex-col justify-center items-start px-6 sm:px-8 lg:px-12 pt-8 sm:pt-12 lg:pt-28 pb-8 lg:pb-0 relative'
            variants={itemVariants}
          >
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

            <motion.p 
              className='text-orange mb-3 lg:mb-4 text-xs sm:text-sm font-medium'
              variants={itemVariants}
            >
              {welcomeText}
            </motion.p>

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
}

export default HeroBlock
