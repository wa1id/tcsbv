import React from 'react'
import Image from 'next/image'

const Hero = () => {
  return (
    <div className=''>
      <div className='max-w-[1450px] mx-auto px-3 mt-24' >
        <div className='bg-white shadow-xl h-[600px] rounded-[34px] w-full overflow-hidden flex'>
          {/* Image Section - 50% */}
          <div className='w-1/2 h-full relative'>
            <Image
              src="/hero-new.jpg"
              alt="Professional Technician"
              fill
              className='object-cover'
              priority
            />
            {/* Booking Form - Bottom */}
            <div className='absolute bottom-6 left-6 right-6 bg-white rounded-lg shadow-xl p-6'>
              <div className='flex gap-4 items-center'>
                <input
                  type="text"
                  placeholder="Name ... *"
                  className='flex-1 min-w-0 px-4 py-3 rounded-lg bg-gray-100 text-charcoal placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange focus:bg-white transition-all'
                />
                <input
                  type="email"
                  placeholder="Email ... *"
                  className='flex-1 min-w-0 px-4 py-3 rounded-lg bg-gray-100 text-charcoal placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange focus:bg-white transition-all'
                />
                <button className='bg-orange hover:bg-[#da640e]/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap flex-shrink-0'>
                  Book appointment
                </button>
              </div>
            </div>
          </div>
          {/* Text/Content Section - 50% */}
          <div className='w-1/2 h-full flex flex-col justify-center items-start  px-12 pt-28 relative'>
            {/* SVG Decoration - Top Right */}
            <div className='absolute bottom-[-1.5rem] right-[-1rem] w-60 h-60 '>
              <Image
                src="/square-tiny-alternates.svg"
                alt="Decoration"
                width={200}
                height={200}
                className='object-contain opacity-70'
              />
            </div>
            {/* Welcome Text - Top */}

            <p className='text-orange mb-4 text-sm font-medium'>
              Welcome to TCsBV
            </p>


            {/* Main Headline */}
            <h1 className='text-5xl font-bold text-[#0e1306]/80 mb-8 leading-tight'>
              Highly skilled certified <br />
              mechanics<br />
              guaranteed.
            </h1>

            {/* Button */}
            <button className='bg-orange hover:bg-olive text-cream px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:bg-gray-100 transition-colors mb-auto'>
              Need a car inspection?
            </button>

            {/* Bottom Contact Section */}
            <div className='absolute bottom-8 left-12 flex items-center gap-4'>
              <div className='w-16 h-16 rounded-full border-2 border-orange overflow-hidden flex-shrink-0'>
                <Image
                  src="/men.jpg"
                  alt="Service Representative"
                  width={64}
                  height={64}
                  className='object-cover'
                />
              </div>
              <div>
                <p className='text-charcoal text-base mb-1'>
                  Got a question about our services?
                </p>
                <p className='text-orange text-base font-medium'>
                  Call us : 1.800.123.4567
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Hero