"use client";

import React from "react";
import HeroBlock from "./blocks/HeroBlock";
import HomeHeroBlock from "./blocks/HomeHeroBlock";
import HomeCTABlock from "./blocks/HomeCTABlock";
import TextBlock from "./blocks/TextBlock";
import ContactFormBlock from "./blocks/ContactFormBlock";
// Import other block components as needed

interface PageBuilderProps {
  blocks: any[];
  siteSettings?: any;
}

const PageBuilder = ({ blocks, siteSettings }: PageBuilderProps) => {
  console.log('PageBuilder received blocks:', blocks)
  
  const renderBlock = (block: any, index: number) => {
    if (!block || !block._type) {
      console.warn('Invalid block at index', index, block)
      return null
    }

    console.log('Rendering block:', block._type, block)

    switch (block._type) {
      case 'heroBlock':
        return <HeroBlock key={index} data={block} />;
      
      case 'homeHeroBlock':
        return <HomeHeroBlock key={index} data={block} siteSettings={siteSettings} />;
      
      case 'homeCTABlock':
        return <HomeCTABlock key={index} data={block} />;
      
      case 'textBlock':
        return <TextBlock key={index} data={block} />;
      
      case 'contactBlock':
        return <ContactFormBlock key={index} data={block} siteSettings={siteSettings} />;
      
      case 'servicesBlock':
        // You can create a ServicesBlock component later
        return (
          <div key={index} className="py-16 px-4 bg-cream">
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-orange mb-4">Services Section</h2>
              <p className="text-charcoal/80">Services block - to be implemented</p>
            </div>
          </div>
        );
      
      case 'testimonialsBlock':
        // You can create a TestimonialsBlock component later
        return (
          <div key={index} className="py-16 px-4 bg-white">
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-orange mb-4">Testimonials Section</h2>
              <p className="text-charcoal/80">Testimonials block - to be implemented</p>
            </div>
          </div>
        );
      
      case 'faqBlock':
        // You can create an FAQBlock component later
        return (
          <div key={index} className="py-16 px-4 bg-gray-100">
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-orange mb-4">FAQ Section</h2>
              <p className="text-charcoal/80">FAQ block - to be implemented</p>
            </div>
          </div>
        );
      
      default:
        console.warn(`Unknown block type: ${block._type}`);
        return null;
    }
  };

  return (
    <div className="w-full">
      {blocks?.map((block, index) => renderBlock(block, index))}
    </div>
  );
};

export default PageBuilder;