'use client';

import React, { useMemo, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FaBriefcase, FaLaptopCode, FaAward } from 'react-icons/fa';
import { IconType } from 'react-icons';

interface TimelineItem {
  id: number;
  title: string;
  organization: string;
  location: string;
  period: string;
  description: string[];
  icon: IconType;
  category: string;
  achievements?: string[];
  technologies?: string[];
}

const Experience = () => {
  const containerRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Professional');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const particlePositions = useMemo(() => {
    return Array.from({ length: 15 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 10 + 5,
      delay: Math.random() * 2
    }));
  }, []);

  const BackgroundParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particlePositions.map((particle, index) => (
        <div
          key={index}
          className="absolute bg-blue-500/20 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
    </div>
  );

  const timeline: TimelineItem[] = [
    {
      id: 1,
      title: 'B.Tech in Computer Science and Engineering',
      organization: 'Centurion University of Technology and Management',
      location: 'Vizianagaram, Andhra Pradesh',
      period: '2021 - 2025',
      description: [
        'Pursuing Bachelor of Technology in Computer Science and Engineering',
        'Specialization in Artificial Intelligence and Machine Learning',
        'Academic Excellence with CGPA: 9.2/10'
      ],
      icon: FaLaptopCode,
      category: 'Education',
      technologies: ['Machine Learning', 'Deep Learning', 'Python', 'Data Structures'],
      achievements: [
        'Consistent Academic Performer',
        'Active Participant in AI and ML Research Projects'
      ]
    },
    {
      id: 2,
      title: 'Intermediate (10+2)',
      organization: 'Sri Sarada College',
      location: 'Vijayawada, Andhra Pradesh',
      period: '2019 - 2021',
      description: [
        'Completed Intermediate in MPC (Mathematics, Physics, and Chemistry)',
        'Scored 760/1000 in Board Examinations'
      ],
      icon: FaLaptopCode,
      category: 'Education',
      technologies: ['Mathematics', 'Physics', 'Chemistry'],
      achievements: [
        'Strong Foundation in Science and Mathematics'
      ]
    },
    {
      id: 3,
      title: 'Machine Learning Intern',
      organization: 'Slash Mark',
      location: 'Remote',
      period: 'Jan 2024 – Apr 2024',
      description: [
        'Designed and deployed ML models for real-world applications',
        'Performed data preprocessing, feature engineering, and model optimization',
        'Collaborated with the team to enhance model accuracy and performance'
      ],
      icon: FaBriefcase,
      category: 'Professional',
      technologies: ['Machine Learning', 'Python', 'Data Preprocessing', 'Model Optimization'],
      achievements: [
        'Successfully developed and deployed production-ready ML models',
        'Improved model performance through advanced feature engineering'
      ]
    },
    {
      id: 4,
      title: 'Artificial Intelligence Intern',
      organization: 'Edunet Foundation',
      location: 'Remote',
      period: 'Aug 2023 – Oct 2023',
      description: [
        'Analyzed complex datasets to drive AI-powered decision-making',
        'Built predictive models and visualized insights using Python & ML tools',
        'Created detailed reports and interactive dashboards for stakeholders'
      ],
      icon: FaBriefcase,
      category: 'Professional',
      technologies: ['Python', 'Machine Learning', 'Data Visualization', 'AI Analytics'],
      achievements: [
        'Developed comprehensive AI-driven insights and predictive models',
        'Created impactful dashboards for strategic decision-making'
      ]
    }
  ];

  const filteredTimeline = timeline.filter(item => item.category === selectedCategory);

  return (
    <section className="py-20 bg-black relative overflow-hidden" ref={containerRef}>
      <BackgroundParticles />
      {/* Background effects */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, rgba(0, 0, 0, 0) 50%)",
          opacity,
          y
        }}
      />

      {/* Floating particles */}
      {[...Array(15)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-1 h-1 bg-blue-500/30 rounded-full"
          animate={{
            y: ["0vh", "100vh"],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "linear"
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `-5%`
          }}
        />
      ))}

      {/* Neural network connection lines */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
            style={{
              top: `${20 * (i + 1)}%`,
              left: 0,
              right: 0,
            }}
            animate={{
              x: ['-100%', '100%'],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Neural Network Journey</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-8" />
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Tracing my professional and academic evolution through technology and learning
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-8 mt-8 mb-16">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory('Professional')}
            className={`px-8 py-3 rounded-full font-medium transition-colors relative group text-lg ${
              selectedCategory === 'Professional'
                ? 'bg-gradient-to-r from-blue-600 to-blue-400 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-50 group-hover:opacity-75 transition duration-300" />
            <span className="relative flex items-center gap-3">
              <FaBriefcase className="text-xl" />
              Experience
            </span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory('Education')}
            className={`px-8 py-3 rounded-full font-medium transition-colors relative group text-lg ${
              selectedCategory === 'Education'
                ? 'bg-gradient-to-r from-purple-600 to-purple-400 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur opacity-50 group-hover:opacity-75 transition duration-300" />
            <span className="relative flex items-center gap-3">
              <FaLaptopCode className="text-xl" />
              Education
            </span>
          </motion.button>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Glowing Connecting Line */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-blue-500/20 h-full"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.5, 1, 0.5, 0],
              background: [
                'linear-gradient(to bottom, rgba(59, 130, 246, 0.2) 0%, rgba(0, 0, 0, 0) 50%)',
                'linear-gradient(to bottom, rgba(59, 130, 246, 0.5) 0%, rgba(124, 58, 237, 0.5) 50%, rgba(59, 130, 246, 0.5) 100%)',
                'linear-gradient(to bottom, rgba(59, 130, 246, 0.2) 0%, rgba(0, 0, 0, 0) 50%)'
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Glowing effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-blue-500/50 blur-sm" />
          </motion.div>

          {filteredTimeline.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`flex items-center gap-8 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Timeline dot with glowing effect */}
              <motion.div
                className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full ${
                  item.category === 'Education' 
                    ? 'bg-gradient-to-r from-purple-500 to-purple-400' 
                    : 'bg-gradient-to-r from-blue-500 to-blue-400'
                }`}
                whileHover={{ scale: 1.5 }}
                transition={{ duration: 0.2 }}
              >
                <div className={`absolute -inset-2 rounded-full blur-sm ${
                  item.category === 'Education' 
                    ? 'bg-purple-500/50' 
                    : 'bg-blue-500/50'
                }`} />
              </motion.div>

              {/* Content */}
              <motion.div
                className={`w-1/2 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className={`relative group ${
                  index % 2 === 0 ? 'ml-auto mr-8' : 'mr-auto ml-8'
                }`}>
                  {/* Card with glowing border */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-300" />
                  <div className="relative bg-gray-900/90 backdrop-blur-xl p-6 rounded-lg border border-blue-500/20">
                    {/* Icon */}
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                      <motion.div
                        className={`w-12 h-12 rounded-full flex items-center justify-center relative ${
                          item.category === 'Education' 
                            ? 'bg-gradient-to-r from-purple-600 to-purple-400' 
                            : 'bg-gradient-to-r from-blue-600 to-blue-400'
                        }`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="absolute inset-0 rounded-full blur-sm bg-blue-500/50" />
                        <span className="relative">
                          {React.createElement(item.icon, { size: 24 })}
                        </span>
                      </motion.div>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <div className="flex items-center gap-3 text-blue-400 text-sm mb-4 justify-center">
                        <span>{item.organization}</span>
                      </div>
                      <div className="flex items-center gap-3 text-purple-400 text-sm mb-4 justify-center">
                        <span>{item.location} • {item.period}</span>
                      </div>

                      <div className="space-y-4">
                        {/* Description */}
                        <ul className="list-disc list-inside text-gray-400 space-y-2">
                          {item.description.map((desc, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + i * 0.1 }}
                            >
                              {desc}
                            </motion.li>
                          ))}
                        </ul>

                        {/* Achievements */}
                        {item.achievements && (
                          <div className="mt-4">
                            <h4 className="text-white font-semibold mb-2 flex items-center gap-2 justify-center">
                              <FaAward className="text-yellow-500" />
                              Achievements
                            </h4>
                            <ul className="list-disc list-inside text-gray-400 space-y-2">
                              {item.achievements.map((achievement, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.5 + i * 0.1 }}
                                >
                                  {achievement}
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Technologies */}
                        {item.technologies && (
                          <div className="flex flex-wrap gap-2 mt-4 justify-center">
                            {item.technologies.map((tech, i) => (
                              <motion.span
                                key={tech}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.7 + i * 0.1 }}
                                className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm relative group"
                              >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-300" />
                                <span className="relative">{tech}</span>
                              </motion.span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
