"use client";

import React from "react";
import HeroBlock from "./blocks/HeroBlock";
import HomeCTABlock from "./blocks/HomeCTABlock";
import FeaturesBlock from "./blocks/FeaturesBlock";
import DynamicServices from "./home/DynamicServices";
import DynamicTestimonials from "./home/DynamicTestimonials";
import DynamicFAQ from "./home/DynamicFAQ";
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
        return <DynamicServices key={index} services={block.services || []} />;
      
      case 'testimonialsBlock':
        return <DynamicTestimonials key={index} testimonials={block.testimonials || []} />;
      
      case 'faqBlock':
        return <DynamicFAQ key={index} faqs={block.faqs || []} />;
      
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