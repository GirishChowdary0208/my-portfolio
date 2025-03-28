import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { IconType } from 'react-icons';
import { FaReact, FaNodeJs, FaPython, FaAws, FaDocker } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiMongodb, SiPostgresql, SiRedis, SiKubernetes, SiTensorflow } from 'react-icons/si';
import { TbBrandNextjs } from 'react-icons/tb';

interface Skill {
  name: string;
  Icon: IconType;
  level: number;
  color: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'AI/ML';
}

const Skills: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  const categories: Array<Skill['category']> = ['Frontend', 'Backend', 'Database', 'DevOps', 'AI/ML'];

  const skills: Skill[] = [
    // Frontend
    { name: 'React', Icon: FaReact, level: 90, color: 'cyan', category: 'Frontend' },
    { name: 'Next.js', Icon: TbBrandNextjs, level: 85, color: 'gray', category: 'Frontend' },
    { name: 'TypeScript', Icon: SiTypescript, level: 88, color: 'blue', category: 'Frontend' },
    { name: 'Tailwind CSS', Icon: SiTailwindcss, level: 92, color: 'teal', category: 'Frontend' },
    
    // Backend
    { name: 'Node.js', Icon: FaNodeJs, level: 85, color: 'green', category: 'Backend' },
    { name: 'Python', Icon: FaPython, level: 82, color: 'yellow', category: 'Backend' },
    
    // Database
    { name: 'MongoDB', Icon: SiMongodb, level: 80, color: 'green', category: 'Database' },
    { name: 'PostgreSQL', Icon: SiPostgresql, level: 75, color: 'blue', category: 'Database' },
    { name: 'Redis', Icon: SiRedis, level: 70, color: 'red', category: 'Database' },
    
    // DevOps
    { name: 'AWS', Icon: FaAws, level: 78, color: 'yellow', category: 'DevOps' },
    { name: 'Docker', Icon: FaDocker, level: 82, color: 'blue', category: 'DevOps' },
    { name: 'Kubernetes', Icon: SiKubernetes, level: 75, color: 'blue', category: 'DevOps' },
    
    // AI/ML
    { name: 'TensorFlow', Icon: SiTensorflow, level: 70, color: 'orange', category: 'AI/ML' }
  ];

  return (
    <section ref={ref} className="relative z-10 bg-gradient-to-b from-black via-black to-gray-900 py-24">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Technical Skills</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-8" />
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A comprehensive set of technical skills acquired through years of hands-on experience
          </p>
        </motion.div>

        <div className="space-y-16">
          {categories.map((category) => (
            <div key={category} className="space-y-8">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold text-white mb-6"
              >
                {category}
              </motion.h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills
                  .filter(skill => skill.category === category)
                  .map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="bg-gray-800 rounded-lg p-6 flex flex-col items-center text-center"
                    >
                      <skill.Icon className="text-4xl mb-4 text-blue-500" />
                      <h4 className="text-lg font-semibold text-white mb-2">{skill.name}</h4>
                      <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
                        <div 
                          className={`bg-blue-600 h-2.5 rounded-full`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <p className="text-gray-400 text-sm">{skill.level}% Proficiency</p>
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <motion.div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, rgba(0, 0, 0, 0) 50%)",
          opacity: opacity,
          scale: scale
        }}
      />
    </section>
  );
};

export default Skills;
