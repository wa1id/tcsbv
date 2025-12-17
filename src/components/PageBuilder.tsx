"use client";

import React from "react";
import HeroBlock from "./blocks/HeroBlock";
import HomeHeroBlock from "./blocks/HomeHeroBlock";
import HomeCTABlock from "./blocks/HomeCTABlock";
import ServicesBlock from "./blocks/ServicesBlock";
import TestimonialsBlock from "./blocks/TestimonialsBlock";
import FAQBlock from "./blocks/FAQBlock";
import TextBlock from "./blocks/TextBlock";
import ContactFormBlock from "./blocks/ContactFormBlock";

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
        return <ServicesBlock key={index} data={block} />;
      
      case 'testimonialsBlock':
        return <TestimonialsBlock key={index} data={block} />;
      
      case 'faqBlock':
        return <FAQBlock key={index} data={block} />;
      
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