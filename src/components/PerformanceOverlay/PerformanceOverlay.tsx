'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChartLine } from 'react-icons/fa';

const PerformanceOverlay = () => {
  const [performance, setPerformance] = useState({
    cpu: 45,
    memory: 65,
    network: 92
  });

  // Function to generate random performance metrics
  const generatePerformanceMetrics = () => {
    return {
      cpu: Math.floor(Math.random() * 100),
      memory: Math.floor(Math.random() * 100),
      network: Math.floor(Math.random() * 150)
    };
  };

  // Update performance metrics every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPerformance(generatePerformanceMetrics());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-3 flex items-center space-x-3 text-xs"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <FaChartLine className="text-blue-400" />
      <div className="flex space-x-2">
        <div className="flex items-center">
          <span className="text-gray-300 mr-1">CPU:</span>
          <span className="text-blue-300">{performance.cpu}%</span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-300 mr-1">MEM:</span>
          <span className="text-green-300">{performance.memory}%</span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-300 mr-1">NET:</span>
          <span className="text-purple-300">{performance.network} Mbps</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PerformanceOverlay;
