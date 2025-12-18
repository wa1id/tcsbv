"use client";

import { motion, useInView } from "framer-motion";
import React from "react";
import ContactForm from "@/components/ContactForm";

interface ContactFormBlockProps {
  data: {
    title: string;
    subtitle?: string;
    recipientEmail?: string;
    showContactInfo: boolean;
    backgroundColor: 'white' | 'cream' | 'gray';
  };
  siteSettings?: any;
}

const ContactFormBlock = ({ data, siteSettings }: ContactFormBlockProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getBackgroundColor = (color: string) => {
    switch (color) {
      case 'cream':
        return 'bg-cream';
      case 'gray':
        return 'bg-gray-100';
      default:
        return 'bg-white';
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: "Phone",
      value: siteSettings?.contactInfo?.phone || "1.800.123.4567",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: "Email",
      value: siteSettings?.contactInfo?.email || "info@tcsbv.com",
    },
  ];

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`py-16 px-4 md:px-8 lg:px-12 ${getBackgroundColor(data.backgroundColor)}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className={`grid grid-cols-1 ${data.showContactInfo ? 'lg:grid-cols-2' : ''} gap-12`}>
          {/* Contact Form */}
          <div>
            <ContactForm
              title={data.title}
              subtitle={data.subtitle}
              recipientEmail={data.recipientEmail || siteSettings?.contactInfo?.email}
              tenantName="TCSBV"
            />
          </div>

          {/* Contact Information */}
          {data.showContactInfo && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-orange mb-4">
                  Get in touch
                </h3>
                <p className="text-lg text-charcoal/80 leading-relaxed mb-6">
                  {siteSettings?.description || "Wij helpen u graag met al uw vragen over verwarming, domotica en onderhoud."}
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-orange rounded-lg flex items-center justify-center text-cream">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-charcoal">{info.label}</h4>
                      <p className="text-charcoal/70">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ContactFormBlock;