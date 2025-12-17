"use client";

import React, { useState } from "react";

interface ContactFormProps {
  className?: string;
  title?: string;
  subtitle?: string;
  recipientEmail?: string;
  tenantName?: string;
}

const ContactForm = ({ 
  className = "", 
  title = "Send us a message",
  subtitle,
  recipientEmail = "info@tcsbv.com",
  tenantName = "TCSBV"
}: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/ses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emails: [recipientEmail],
          tenantName,
          dynamicTemplateData: {
            name: formData.name,
            email: formData.email,
            phoneNumber: formData.phone,
            message: formData.message,
          },
        }),
      });

      if (response.ok) {
        alert("Thank you for your message! We'll get back to you soon.");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert("Sorry, there was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-xl p-8 md:p-10 ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-orange mb-6">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-charcoal/80 mb-6">
          {subtitle}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-100 text-charcoal placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange focus:bg-white transition-all"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-100 text-charcoal placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange focus:bg-white transition-all"
            placeholder="your.email@example.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-2">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-100 text-charcoal placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange focus:bg-white transition-all"
            placeholder="(123) 456-7890"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-3 rounded-lg bg-gray-100 text-charcoal placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange focus:bg-white transition-all resize-none"
            placeholder="Tell us about your needs..."
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-orange hover:bg-olive text-cream px-8 py-4 rounded-full font-semibold text-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;