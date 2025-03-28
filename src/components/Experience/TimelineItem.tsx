'use client';

import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';

interface TimelineItemProps {
  title: string;
  company?: string;
  institution?: string;
  duration: string;
  description: string;
  achievements: string[];
  index: number;
}

const TimelineItem = ({
  title,
  company,
  institution,
  duration,
  description,
  achievements,
  index,
}: TimelineItemProps) => {
  const organization = company || institution;
  const isEven = index % 2 === 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: index * 0.02
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 5,
      x: isEven ? -5 : 5
    },
    visible: { 
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 12,
        duration: 0.15
      }
    }
  };

  const iconVariants = {
    hidden: { 
      scale: 0,
      rotate: -45
    },
    visible: { 
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
        duration: 0.1
      }
    }
  };

  const lineVariants = {
    hidden: { scaleY: 0 },
    visible: { 
      scaleY: 1,
      transition: {
        duration: 0.15,
        ease: "easeOut"
      }
    }
  };

  const ContentBlock = () => (
    <motion.div
      variants={itemVariants}
      className="space-y-2"
    >
      <motion.span 
        className="text-blue-500 text-sm font-semibold block"
        whileHover={{ scale: 1.05, x: isEven ? -5 : 5 }}
      >
        {duration}
      </motion.span>
      <motion.h3 
        className="text-xl font-bold text-white"
        whileHover={{ scale: 1.02 }}
      >
        {title}
      </motion.h3>
      <motion.p 
        className="text-gray-400 text-lg"
        whileHover={{ color: "#60A5FA" }}
      >
        {organization}
      </motion.p>
      <motion.p className="text-gray-500">{description}</motion.p>
      <motion.ul className="list-none space-y-2 mt-4">
        {achievements.map((item, i) => (
          <motion.li
            key={i}
            variants={itemVariants}
            className="text-gray-400 flex items-start group"
            whileHover={{ x: isEven ? -5 : 5 }}
          >
            <motion.span 
              className="mr-2 text-blue-500"
              initial={{ opacity: 0.5 }}
              whileHover={{ scale: 1.2, opacity: 1 }}
            >
              •
            </motion.span>
            <span>{item}</span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative flex items-center"
    >
      {/* Desktop layout */}
      <div className="hidden md:grid grid-cols-[1fr,auto,1fr] w-full gap-8">
        {/* Left content */}
        <div className={isEven ? 'pr-8 text-right' : ''}>
          {isEven && <ContentBlock />}
        </div>

        {/* Center icon */}
        <div className="relative">
          <motion.div
            variants={iconVariants}
            whileHover={{ 
              scale: 1.2,
              boxShadow: "0 0 20px rgba(37, 99, 235, 0.5)"
            }}
            className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white z-10 relative"
          >
            {company ? <FaBriefcase size={20} /> : <FaGraduationCap size={24} />}
          </motion.div>
          <motion.div
            variants={lineVariants}
            className="absolute left-1/2 top-[50%] h-[200%] w-px bg-blue-500/20 -translate-x-1/2 origin-top"
          />
        </div>

        {/* Right content */}
        <div className={!isEven ? 'pl-8' : ''}>
          {!isEven && <ContentBlock />}
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden flex gap-4">
        <motion.div 
          variants={iconVariants}
          whileHover={{ scale: 1.1 }}
          className="flex-shrink-0"
        >
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white">
            {company ? <FaBriefcase size={20} /> : <FaGraduationCap size={24} />}
          </div>
        </motion.div>
        <div className="flex-grow pt-1">
          <ContentBlock />
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineItem;
