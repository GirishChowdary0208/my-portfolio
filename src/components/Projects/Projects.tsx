'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs, FaPython } from 'react-icons/fa';
import { SiTypescript, SiMongodb, SiPostgresql, SiTailwindcss, SiDocker, SiKubernetes, SiAmazon } from 'react-icons/si';
import { TbBrandNextjs } from 'react-icons/tb';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: { name: string; icon: React.ComponentType }[];
  links: {
    github?: string;
    live?: string;
  };
  features: string[];
}

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

  const projects: Project[] = [
    {
      id: 1,
      title: "AI-Powered Task Manager",
      description: "A smart task management application that uses AI to prioritize and categorize tasks, featuring real-time collaboration and automated scheduling.",
      image: "/profile-placeholder.jpg",
      tech: [
        { name: "React", icon: FaReact },
        { name: "TypeScript", icon: SiTypescript },
        { name: "Node.js", icon: FaNodeJs },
        { name: "MongoDB", icon: SiMongodb },
      ],
      links: {
        github: "https://github.com/username/project1",
        live: "https://project1.demo.com"
      },
      features: [
        "AI-powered task prioritization",
        "Real-time collaboration",
        "Automated scheduling",
        "Performance analytics"
      ]
    },
    {
      id: 2,
      title: "E-commerce Platform",
      description: "A scalable e-commerce platform with microservices architecture, featuring real-time inventory management and AI-powered product recommendations.",
      image: "/profile-placeholder.jpg",
      tech: [
        { name: "Next.js", icon: TbBrandNextjs },
        { name: "PostgreSQL", icon: SiPostgresql },
        { name: "Docker", icon: SiDocker },
        { name: "AWS", icon: SiAmazon },
      ],
      links: {
        github: "https://github.com/username/project2",
        live: "https://project2.demo.com"
      },
      features: [
        "Microservices architecture",
        "Real-time inventory tracking",
        "AI product recommendations",
        "Advanced analytics dashboard"
      ]
    },
    {
      id: 3,
      title: "Cloud-Native Analytics Platform",
      description: "A comprehensive analytics platform built with cloud-native technologies, providing real-time data processing and visualization capabilities.",
      image: "/profile-placeholder.jpg",
      tech: [
        { name: "Python", icon: FaPython },
        { name: "React", icon: FaReact },
        { name: "Kubernetes", icon: SiKubernetes },
        { name: "Tailwind", icon: SiTailwindcss },
      ],
      links: {
        github: "https://github.com/username/project3",
        live: "https://project3.demo.com"
      },
      features: [
        "Real-time data processing",
        "Interactive visualizations",
        "Scalable architecture",
        "Custom reporting"
      ]
    }
  ];

  return (
    <section className="py-20 bg-black relative overflow-hidden" ref={containerRef}>
      {/* Background effects */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, rgba(0, 0, 0, 0) 50%)",
          opacity,
          y,
          scale: scale // Explicitly use scale here
        }}
      />

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
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

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Featured Projects</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-8" />
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Showcasing some of my best work and technical achievements
          </p>
        </motion.div>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-12 items-center`}
            >
              {/* Project Image */}
              <motion.div
                className="w-full lg:w-1/2 relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative h-[300px] rounded-xl overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  {/* Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Tech stack overlay */}
                <motion.div
                  className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4 bg-gray-900/90 backdrop-blur-sm px-6 py-3 rounded-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {project.tech.map((tech) => (
                    <motion.div
                      key={tech.name}
                      whileHover={{ scale: 1.2, y: -5 }}
                      className="text-2xl text-blue-400"
                      title={tech.name}
                    >
                      <tech.icon />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Project Info */}
              <div className="w-full lg:w-1/2 space-y-6">
                <motion.h3
                  className="text-3xl font-bold text-white"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {project.title}
                </motion.h3>

                <motion.p
                  className="text-gray-400"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {project.description}
                </motion.p>

                {/* Features */}
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <h4 className="text-white font-semibold">Key Features:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {project.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="flex items-center gap-2 text-gray-400"
                      >
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Links */}
                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {project.links.github && (
                    <motion.a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      className="flex items-center gap-2 text-white bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700"
                    >
                      <FaGithub />
                      <span>GitHub</span>
                    </motion.a>
                  )}
                  {project.links.live && (
                    <motion.a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      className="flex items-center gap-2 text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      <FaExternalLinkAlt />
                      <span>Live Demo</span>
                    </motion.a>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
