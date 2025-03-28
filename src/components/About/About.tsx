'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { 
  FaServer, 
  FaDatabase, 
  FaMedal, 
  FaGraduationCap, 
  FaCertificate,
  FaCloud,
  FaRobot,
  FaPalette,
  FaProjectDiagram
} from 'react-icons/fa';
import { BsCodeSlash, BsCodeSquare } from 'react-icons/bs';

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 10 });
  const springY = useSpring(0, { stiffness: 300, damping: 10 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      x.set((event.clientX - rect.left - centerX) / 20);
      springY.set((event.clientY - rect.top - centerY) / 20);
    }
  };

  const resetPosition = () => {
    x.set(0);
    springY.set(0);
  };

  const skills = [
    { name: 'MERN Stack', icon: FaServer, color: 'blue', description: 'Full-stack development with MongoDB, Express, React, and Node.js' },
    { name: 'Machine Learning', icon: BsCodeSlash, color: 'blue', description: 'Advanced AI models and predictive analytics' },
    { name: 'Deep Learning', icon: BsCodeSquare, color: 'purple', description: 'Neural networks and advanced AI techniques' },
    { name: 'SQL', icon: FaDatabase, color: 'yellow', description: 'Complex database design and optimization' },
    { name: 'Cloud Management', icon: FaCloud, color: 'orange', description: 'Scalable cloud infrastructure solutions' },
    { name: 'DevOps', icon: BsCodeSquare, color: 'blue', description: 'Continuous integration and deployment' },
    { name: 'Robotics', icon: FaRobot, color: 'indigo', description: 'Intelligent robotic system design' },
    { name: 'UI/UX', icon: FaPalette, color: 'pink', description: 'Intuitive and engaging user interfaces' }
  ];

  const achievements = [
    {
      icon: FaMedal,
      title: "5+ Years in Machine Learning",
      description: "Extensive experience in developing and deploying machine learning solutions"
    },
    {
      icon: FaGraduationCap,
      title: "Masters Degree in AI & Robotics",
      description: "Advanced academic expertise in Artificial Intelligence and Robotics"
    },
    {
      icon: FaCertificate,
      title: "Advanced Certifications",
      description: "Certified in AWS, Azure, and Machine Learning technologies"
    },
    {
      icon: FaProjectDiagram,
      title: "20+ Projects Completed",
      description: "Diverse portfolio of innovative AI and software projects"
    }
  ];

  return (
    <section 
      className="py-20 bg-black relative overflow-hidden" 
      ref={containerRef}
    >
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
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <div className="text-blue-500 text-4xl bg-blue-500/10 rounded-full p-4">
              <BsCodeSlash />
            </div>
          </motion.div>
          <h2 className="text-4xl font-bold text-white mb-4 text-center">
            About Me
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mt-2" />
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-8" />
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Passionate about creating innovative solutions and pushing the boundaries of technology
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Left side - Image */}
          <motion.div
            ref={imageRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetPosition}
            style={{
              rotateX: springY,
              rotateY: springX,
              transition: 'transform 0.3s ease-out'
            }}
            className="relative"
          >
            <div className="relative h-[660px] w-full rounded-2xl overflow-hidden">
              <Image
                src="/profile.jpg"
                alt="Profile"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  console.error('Image load error:', e);
                  const imgElement = e.target as HTMLImageElement;
                  imgElement.src = '/profile-placeholder.jpg';
                }}
                priority
              />
              {/* Overlay gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>

            {/* Experience badges */}
            <motion.div
              className="absolute -left-4 bottom-10 bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-2xl font-bold">20+</div>
              <div className="text-sm">Projects Completed</div>
            </motion.div>

            <motion.div
              className="absolute -right-4 top-10 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-2xl font-bold">5+ Years</div>
              <div className="text-sm">in Machine Learning</div>
            </motion.div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <h3 className="text-3xl font-bold text-white mb-6">Professional Skills</h3>
            <div className="grid grid-cols-2 gap-5">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-blue-900/20 p-5 rounded-xl border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="flex items-center mb-3">
                    <skill.icon 
                      className={`mr-4 text-3xl text-${skill.color}-500`} 
                    />
                    <h4 className="text-xl font-semibold text-white">{skill.name}</h4>
                  </div>
                  <p className="text-gray-400 text-base">{skill.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Achievements with Consistent Alignment */}
        <div className="grid grid-cols-4 gap-6 px-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.1,
                type: 'spring',
                stiffness: 200
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)'
              }}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg text-center"
            >
              <div className="text-blue-500 text-4xl mb-4">
                <achievement.icon />
              </div>
              <h4 className="text-white font-bold mb-2 text-base">{achievement.title}</h4>
              <p className="text-gray-400 text-sm">{achievement.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;