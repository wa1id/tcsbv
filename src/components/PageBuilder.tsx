"use client";

import React from "react";
import HeroBlock from "./blocks/HeroBlock";
import HomeCTABlock from "./blocks/HomeCTABlock";
import FeaturesBlock from "./blocks/FeaturesBlock";
import ServicesSection from "./blocks/ServicesSection";
import TestimonialsSection from "./blocks/TestimonialsSection";
import FAQSection from "./blocks/FAQSection";
import TextBlock from "./blocks/TextBlock";
import ContactFormBlock from "./blocks/ContactFormBlock";

interface PageBuilderProps {
  blocks: any[];
  siteSettings?: any;
}

const PageBuilder = ({ blocks, siteSettings }: PageBuilderProps) => {
  const renderBlock = (block: any, index: number) => {
    if (!block || !block._type) {
      return null
    }

    switch (block._type) {
      case 'heroBlock':
        return <HeroBlock key={index} data={block} siteSettings={siteSettings} />;
      
      case 'homeCTABlock':
        return <HomeCTABlock key={index} data={block} />;
      
      case 'textBlock':
        return <TextBlock key={index} data={block} />;
      
      case 'contactBlock':
        return <ContactFormBlock key={index} data={block} siteSettings={siteSettings} />;
      
      case 'servicesBlock':
        return <ServicesSection key={index} services={block.services || []} />;
      
      case 'testimonialsBlock':
        return <TestimonialsSection key={index} testimonials={block.testimonials || []} />;
      
      case 'faqBlock':
        return <FAQSection key={index} faqs={block.faqs || []} />;
      
      case 'featuresBlock':
        return <FeaturesBlock key={index} data={block} />;
      
      default:
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