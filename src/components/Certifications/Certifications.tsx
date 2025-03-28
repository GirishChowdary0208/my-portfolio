'use client';

import React, { useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

interface Certification {
  title: string;
  issuer: string;
  issuedDate: string;
  credentialId?: string;
  skills: string[];
  description?: string;
}

const Certifications: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const certifications: Certification[] = useMemo(() => [
    {
      title: "Java Full Stack Course",
      issuer: "Wipro TalentNext",
      issuedDate: "Oct 2024",
      skills: ["Java", "JavaScript", "Full-Stack Development"],
      description: "Comprehensive full-stack development program covering Java ecosystem, JavaScript frameworks, and end-to-end web application development."
    },
    {
      title: "API Fundamentals Student Expert",
      issuer: "Postman",
      issuedDate: "Jul 2024",
      credentialId: "66901258b8922675eddb0533",
      skills: ["API Development", "Postman", "RESTful APIs"],
      description: "Advanced certification demonstrating expertise in API design, development, and testing using Postman tools and industry best practices."
    },
    {
      title: "AI Engineering",
      issuer: "IBM via Coursera",
      issuedDate: "Oct 2023",
      credentialId: "PTWQLE5FGTZS",
      skills: ["Machine Learning", "Artificial Intelligence", "Watson APIs"],
      description: "Comprehensive AI engineering certification covering machine learning techniques, artificial intelligence principles, and Watson API integration."
    },
    {
      title: "Python Essentials 2",
      issuer: "Cisco",
      issuedDate: "Aug 2023",
      skills: ["Python Programming"],
      description: "Foundational Python programming certification covering essential programming concepts and practical coding skills."
    },
    {
      title: "Applied AI Specialization",
      issuer: "IBM via Coursera",
      issuedDate: "Feb 2023",
      credentialId: "MSCKESWVEHHP",
      skills: ["Machine Learning", "AI", "Data Analytics"],
      description: "Specialized certification in applied artificial intelligence, focusing on machine learning techniques and data analytics applications."
    }
  ], []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const nextSlide = React.useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % certifications.length);
  }, [certifications.length]);

  const prevSlide = React.useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + certifications.length) % certifications.length);
  }, [certifications.length]);

  useEffect(() => {
    if (!isClient || isAutoPlayPaused) return;

    const autoPlayInterval = setInterval(nextSlide, 3000);
    return () => clearInterval(autoPlayInterval);
  }, [nextSlide, isAutoPlayPaused, isClient]);

  const slideVariants = useMemo(() => ({
    initial: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.8,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    })
  }), []);

  // Prevent rendering on server
  if (typeof window === 'undefined' || !isClient) {
    return null;
  }

  return (
    <section 
      className="min-h-screen bg-black text-white flex items-center justify-center py-16 px-4 relative"
      onMouseEnter={() => setIsAutoPlayPaused(true)}
      onMouseLeave={() => setIsAutoPlayPaused(false)}
    >
      <div className="container mx-auto max-w-6xl relative">
        <h2 className="text-5xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
          Professional Certifications
        </h2>

        {/* Slide Navigation */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-20">
          <button 
            onClick={prevSlide}
            className="text-5xl text-blue-500 hover:text-blue-400 transition-colors"
          >
            ◀
          </button>
        </div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-20">
          <button 
            onClick={nextSlide}
            className="text-5xl text-blue-500 hover:text-blue-400 transition-colors"
          >
            ▶
          </button>
        </div>

        {/* Slide Container */}
        <div className="relative w-full h-[600px] overflow-hidden">
          <AnimatePresence initial={false} custom={currentSlide}>
            <motion.div
              key={currentSlide}
              custom={currentSlide}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-full max-w-4xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col p-8">
                {/* Certification Details */}
                <h3 className="text-3xl font-bold mb-4 text-blue-400">
                  {certifications[currentSlide].title}
                </h3>
                <p className="text-xl text-gray-300 mb-4">
                  {certifications[currentSlide].issuer} | {certifications[currentSlide].issuedDate}
                </p>
                
                {certifications[currentSlide].credentialId && (
                  <p className="text-sm text-gray-500 mb-4">
                    Credential ID: {certifications[currentSlide].credentialId}
                  </p>
                )}

                <p className="text-gray-300 mb-6">
                  {certifications[currentSlide].description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {certifications[currentSlide].skills.map((skill) => (
                    <span 
                      key={skill}
                      className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full"
                    >
                      #{skill.replace(/\s+/g, '')}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-8 space-x-4">
          {certifications.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`
                w-4 h-4 rounded-full transition-all duration-300
                ${index === currentSlide 
                  ? 'bg-blue-500 scale-150' 
                  : 'bg-gray-600 hover:bg-blue-500/50'
                }
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Dynamically import to ensure client-side only rendering
export default dynamic(() => Promise.resolve(Certifications), {
  ssr: false
});
