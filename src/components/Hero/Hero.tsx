'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaTwitter, FaReact, FaPython, FaDatabase, FaCloud, FaRobot, FaCode, FaHammer, FaRocket } from 'react-icons/fa';
import { SiTensorflow, SiKubernetes, SiDocker, SiPytorch } from 'react-icons/si';
import { IoMdAnalytics } from 'react-icons/io';
import { RiAiGenerate } from 'react-icons/ri';
import { FaNetworkWired } from 'react-icons/fa6';


// Minimal Tech Capabilities Showcase
const TechCapabilitiesShowcase: React.FC = () => {
  const capabilities = [
    { 
      icon: FaRobot, 
      title: 'AI/ML', 
      description: 'Intelligent System Design',
      color: 'text-green-400'
    },
    { 
      icon: FaCode, 
      title: 'Full-Stack', 
      description: 'End-to-End Solutions',
      color: 'text-blue-400'
    },
    { 
      icon: IoMdAnalytics, 
      title: 'Data', 
      description: 'Advanced Analytics',
      color: 'text-purple-400'
    },
    { 
      icon: RiAiGenerate, 
      title: 'Generative AI', 
      description: 'Creative Innovations',
      color: 'text-cyan-400'
    }
  ];

  return (
    <motion.div 
      className="absolute bottom-8 left-8 bg-black/30 backdrop-blur-sm rounded-xl p-3 
        border border-blue-900/30 shadow-lg flex space-x-3"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      {capabilities.map((cap, index) => (
        <motion.div
          key={cap.title}
          className="group relative"
          whileHover={{ scale: 1.1 }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.1 
          }}
        >
          <div className={`
            p-2 rounded-full transition-all duration-300
            ${cap.color} bg-opacity-20 group-hover:bg-opacity-40
          `}>
            <cap.icon className="text-xl" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute -top-10 left-1/2 transform -translate-x-1/2 
              bg-black/70 text-white text-xs px-2 py-1 rounded-md opacity-0"
          >
            {cap.description}
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};

// Interactive Code Concept Display
const CodeConceptDisplay: React.FC = () => {
  const [currentConcept, setCurrentConcept] = useState('');
  const [isClient, setIsClient] = useState(false);

  const concepts = useMemo(() => [
    'AI.optimize(problem)',
    'Neural.train(dataset)',
    'Code.transform(vision)',
    'ML.predict(future)'
  ], []);

  useEffect(() => {
    setIsClient(true);
    const conceptInterval = setInterval(() => {
      setCurrentConcept(prev => {
        const currentIndex = concepts.indexOf(prev);
        const nextIndex = (currentIndex + 1) % concepts.length;
        return concepts[nextIndex];
      });
    }, 3000);

    return () => clearInterval(conceptInterval);
  }, [concepts]);

  if (!isClient) return null;

  return (
    <div className="absolute top-4 right-4 z-20 text-sm text-gray-300">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentConcept}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="bg-black/30 backdrop-blur-sm px-3 py-1 rounded-md"
        >
          {currentConcept}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Advanced Gradient Tic Tac Toe with AI
const GradientTicTacToe: React.FC = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState<string | null>(null);
  const [gameMode, setGameMode] = useState<'start' | 'playing' | 'gameOver'>('start');

  const winningCombos = useMemo(() => [
    [0, 1, 2],  // Top row
    [3, 4, 5],  // Middle row
    [6, 7, 8],  // Bottom row
    [0, 3, 6],  // Left column
    [1, 4, 7],  // Middle column
    [2, 5, 8],  // Right column
    [0, 4, 8],  // Diagonal top-left to bottom-right
    [2, 4, 6]   // Diagonal top-right to bottom-left
  ], []);

  const checkWinner = useCallback((currentBoard: (string | null)[]) => {
    // Check winning combinations
    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        currentBoard[a] && 
        currentBoard[a] === currentBoard[b] && 
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }

    // Check for draw
    return currentBoard.every(cell => cell !== null) ? 'Draw' : null;
  }, [winningCombos]);

  const findBestMove = useCallback((board: (string | null)[]) => {
    // Priority strategies
    const strategies = [
      // 1. Win if possible
      () => {
        for (const combo of winningCombos) {
          const [a, b, c] = combo;
          if (
            board[a] === 'O' && board[b] === 'O' && board[c] === null ||
            board[a] === 'O' && board[c] === 'O' && board[b] === null ||
            board[b] === 'O' && board[c] === 'O' && board[a] === null
          ) {
            return combo.find(index => board[index] === null);
          }
        }
        return null;
      },
      
      // 2. Block player's winning move
      () => {
        for (const combo of winningCombos) {
          const [a, b, c] = combo;
          if (
            board[a] === 'X' && board[b] === 'X' && board[c] === null ||
            board[a] === 'X' && board[c] === 'X' && board[b] === null ||
            board[b] === 'X' && board[c] === 'X' && board[a] === null
          ) {
            return combo.find(index => board[index] === null);
          }
        }
        return null;
      },
      
      // 3. Take center if available
      () => board[4] === null ? 4 : null,
      
      // 4. Take corners
      () => {
        const corners = [0, 2, 6, 8];
        const availableCorners = corners.filter(corner => board[corner] === null);
        return availableCorners.length > 0 
          ? availableCorners[Math.floor(Math.random() * availableCorners.length)] 
          : null;
      },
      
      // 5. Take any available space
      () => {
        const availableMoves = board.reduce((acc, cell, index) => 
          cell === null ? [...acc, index] : acc, [] as number[]);
        return availableMoves.length > 0 
          ? availableMoves[Math.floor(Math.random() * availableMoves.length)] 
          : null;
      }
    ];

    // Try each strategy in order
    for (const strategy of strategies) {
      const move = strategy();
      if (move !== null) return move;
    }

    return null;
  }, [winningCombos]);

  const computerMove = useCallback(() => {
    if (winner || currentPlayer !== 'O') return;

    const bestMove = findBestMove(board);
    if (bestMove !== null && bestMove !== undefined) {
      const newBoard = [...board];
      newBoard[bestMove] = 'O';
      setBoard(newBoard);

      const newWinner = checkWinner(newBoard);
      if (newWinner) {
        setWinner(newWinner);
        setGameMode('gameOver');
      } else {
        setCurrentPlayer('X');
      }
    }
  }, [board, winner, currentPlayer, checkWinner, findBestMove]);

  const handleCellClick = useCallback((index: number) => {
    if (board[index] || winner || currentPlayer !== 'X') return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      setGameMode('gameOver');
    } else {
      setCurrentPlayer('O');
    }
  }, [board, winner, currentPlayer, checkWinner]);

  useEffect(() => {
    if (gameMode === 'playing' && currentPlayer === 'O') {
      const moveTimer = setTimeout(computerMove, 500);
      return () => clearTimeout(moveTimer);
    }
  }, [currentPlayer, gameMode, computerMove]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setGameMode('start');
  };

  const startGame = () => {
    setGameMode('playing');
  };

  const getGradient = (player: string | null) => {
    switch(player) {
      case 'X': return 'text-blue-300';
      case 'O': return 'text-green-300';
      default: return 'text-gray-500';
    }
  };

  return (
    <motion.div 
      className="absolute top-8 right-8 bg-black/10 backdrop-blur-md rounded-xl p-3 
        border border-blue-900/20 shadow-lg w-40"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      {gameMode === 'start' && (
        <motion.button
          className="w-full bg-blue-600/20 text-blue-300 py-2 rounded-lg 
            border border-blue-900/30 hover:bg-blue-600/30 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startGame}
        >
          Start Game
        </motion.button>
      )}

      {gameMode !== 'start' && (
        <>
          <div className="grid grid-cols-3 gap-1 relative">
            {/* Futuristic Grid Lines */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-blue-500/30"></div>
              <div className="absolute bottom-1/3 left-0 right-0 h-[1px] bg-blue-500/30"></div>
              <div className="absolute left-1/3 top-0 bottom-0 w-[1px] bg-blue-500/30"></div>
              <div className="absolute right-1/3 top-0 bottom-0 w-[1px] bg-blue-500/30"></div>
            </div>

            {board.map((cell, index) => (
              <motion.div
                key={index}
                className={`w-10 h-10 flex items-center justify-center 
                  relative z-10
                  ${!cell && !winner ? 'hover:bg-blue-900/10' : ''}
                  transition-all duration-300 cursor-pointer`}
                onClick={() => handleCellClick(index)}
                whileHover={{ scale: !cell && !winner ? 1.05 : 1 }}
                whileTap={{ scale: !cell && !winner ? 0.95 : 1 }}
              >
                {cell && (
                  <motion.span 
                    className={`font-mono font-bold text-xl ${getGradient(cell)}`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {cell}
                  </motion.span>
                )}
              </motion.div>
            ))}
          </div>

          {winner && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-center text-xs text-blue-300 flex justify-between items-center"
            >
              <span>
                {winner === 'Draw' ? 'Draw!' : `${winner} Wins!`}
              </span>
              <motion.button 
                onClick={resetGame}
                className="text-blue-400 hover:text-blue-200 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Reset
              </motion.button>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
};

// Dynamic Skill Particles
const SkillParticles: React.FC = () => {
  const [particles, setParticles] = useState<{
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    speed: number;
    icon: React.ElementType;
  }[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  const skillIcons = useMemo(() => [
    { Icon: FaReact, color: 'text-cyan-400', name: 'React' },
    { Icon: FaPython, color: 'text-yellow-500', name: 'Python' },
    { Icon: SiTensorflow, color: 'text-orange-500', name: 'TensorFlow' },
    { Icon: FaDatabase, color: 'text-blue-600', name: 'Databases' },
    { Icon: SiKubernetes, color: 'text-blue-500', name: 'Kubernetes' },
    { Icon: FaCloud, color: 'text-indigo-500', name: 'Cloud' },
    { Icon: SiDocker, color: 'text-blue-600', name: 'Docker' },
    { Icon: SiPytorch, color: 'text-red-500', name: 'PyTorch' },
    { Icon: FaNetworkWired, color: 'text-green-500', name: 'Networking' }
  ], []);

  const generateParticles = useCallback(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const newParticles = skillIcons.map((skill, index) => ({
      id: index,
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 30 + 20,
      color: skill.color,
      speed: Math.random() * 0.5 + 0.1,
      icon: skill.Icon
    }));

    setParticles(newParticles);
  }, [skillIcons]);

  useEffect(() => {
    generateParticles();
    const resizeHandler = () => generateParticles();
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, [generateParticles]);

  return (
    <motion.div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.7 }}
      transition={{ duration: 1 }}
    >
      {particles.map((particle) => {
        const Icon = particle.icon;
        return (
          <motion.div
            key={particle.id}
            className={`absolute ${particle.color} opacity-50 hover:opacity-100 transition-opacity duration-300`}
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 5 + particle.speed * 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
          >
            <Icon className="w-full h-full" />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

// Code Suggestion Component
const CodeSuggestionBot: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);

  const codeSuggestions = [
    "Optimize model performance with hyperparameter tuning",
    "Use transfer learning for faster model training",
    "Leverage ONNX for cross-platform AI model deployment",
    "Apply data augmentation to improve model generalization",
    "Use TensorRT for accelerated deep learning inference",
    "Deploy ML models with FastAPI for high-performance APIs",
    "Implement Explainable AI (XAI) for transparent ML decisions",
    "Utilize AutoML for efficient model selection",
    "Use Hugging Face Transformers for state-of-the-art NLP",
    "Leverage MLOps for automated model training and deployment",
    "Optimize large models using quantization and pruning",
    "Use DVC for version control in ML projects",
    "Parallelize data preprocessing with Dask or Ray",
    "Train deep learning models on multiple GPUs using PyTorch Lightning",
    "Use GANs for synthetic data generation",
    "Implement real-time ML inference with TensorFlow Serving",
    "Enhance computer vision models with self-supervised learning",
    "Fine-tune LLMs with LoRA for efficient domain adaptation",
    "Leverage federated learning for privacy-preserving AI",
    "Apply reinforcement learning for complex decision-making tasks"
  ];

  const generateSuggestion = () => {
    const randomSuggestion = codeSuggestions[
      Math.floor(Math.random() * codeSuggestions.length)
    ];
    setSuggestion(randomSuggestion);
  };

  return (
    <motion.div 
      className="fixed bottom-8 right-8 z-50"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <motion.div 
        className={`
          bg-black/30 backdrop-blur-lg rounded-xl 
          border border-blue-900/30 shadow-2xl
          overflow-hidden transition-all duration-300
          ${isExpanded ? 'w-72 p-4' : 'w-16 p-2'}
        `}
      >
        <motion.button
          className="w-full flex items-center justify-center 
            text-blue-300 hover:text-blue-200 
            transition-colors duration-300"
          onClick={() => {
            setIsExpanded(!isExpanded);
            if (!isExpanded) generateSuggestion();
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaRobot className="text-2xl" />
          {isExpanded && (
            <span className="ml-2 text-sm font-bold">Code Insights</span>
          )}
        </motion.button>

        {isExpanded && suggestion && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-xs text-blue-200 
              bg-blue-900/20 rounded-lg p-3 
              border border-blue-900/30"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-blue-300 font-bold flex items-center">
                <FaRobot className="mr-2" /> AI Suggestion
              </span>
              <motion.button
                onClick={generateSuggestion}
                whileHover={{ rotate: 180 }}
                className="text-blue-400 hover:text-blue-200 transition-colors"
              >
                
              </motion.button>
            </div>
            <p className="text-blue-100">{suggestion}</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

// Futuristic Real-Time Clock Component
const FuturisticClock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    // Only set time on client-side
    setCurrentTime(new Date());

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    // Custom formatting for date and time
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    const formattedDate = `${day}/${month}/${year}`;

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return {
      date: formattedDate,
      time: formattedTime,
      timezone: 'IST'
    };
  };

  // Render nothing on server, only on client
  if (!currentTime) return null;

  const { date, time, timezone } = formatTime(currentTime);

  return (
    <motion.div 
      className="absolute top-8 left-8 bg-gradient-to-br from-blue-900/50 to-purple-900/50 
        backdrop-blur-xl rounded-xl p-3 text-left border-2 border-blue-500/30 
        shadow-lg shadow-blue-500/20 overflow-hidden"
      initial={{ opacity: 0, x: -50, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        x: 0, 
        scale: 1,
        boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)'
      }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)',
        transition: { duration: 0.2 }
      }}
      transition={{ 
        duration: 0.7, 
        type: 'spring', 
        stiffness: 100 
      }}
    >
      <div className="relative z-10 flex flex-col">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 
            opacity-50 blur-xl -z-10"
          animate={{
            rotate: 360,
            transition: {
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        />
        <motion.code 
          className="text-xs text-blue-200 font-mono tracking-wider relative"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 1, 0.7, 1],
            transition: {
              duration: 1,
              repeat: Infinity,
              repeatType: 'reverse'
            }
          }}
        >
          <span className="text-green-400 font-bold">const</span>{' '}
          <span className="text-cyan-400 font-bold">currentTimestamp</span>{' '}
          <span className="text-yellow-400">=</span>{' '}
          <span className="text-purple-400">{`{`}</span>
        </motion.code>
        <code className="text-xs text-blue-100 font-mono pl-4 mb-1">
          date: <span className="text-lime-400 font-semibold">{date}</span>,
        </code>
        <code className="text-xs text-blue-100 font-mono pl-4 mb-1">
          time: <span className="text-pink-400 font-semibold">{time};</span>,
        </code>
        <code className="text-xs text-blue-100 font-mono pl-4">
          timezone: <span className="text-sky-400 font-semibold">{timezone}</span>
        </code>
        <motion.code 
          className="text-xs text-blue-200 font-mono tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 1, 0.7, 1],
            transition: {
              duration: 1,
              repeat: Infinity,
              repeatType: 'reverse'
            }
          }}
        >
          <span className="text-purple-400">{`}`}</span>;
        </motion.code>
      </div>
    </motion.div>
  );
};

// Futuristic Navigation Component
const FuturisticNavigation: React.FC = () => {
  const navItems = [
    { 
      label: 'Code', 
      icon: FaCode, 
      color: 'text-cyan-400', 
      hoverColor: 'hover:text-cyan-300' 
    },
    { 
      label: 'Build', 
      icon: FaHammer, 
      color: 'text-green-400', 
      hoverColor: 'hover:text-green-300' 
    },
    { 
      label: 'Transform', 
      icon: FaRocket, 
      color: 'text-purple-400', 
      hoverColor: 'hover:text-purple-300' 
    }
  ];

  return (
    <div className="flex items-center space-x-4 bg-black/30 backdrop-blur-md rounded-xl px-4 py-2">
      {navItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            className={`${item.color} ${item.hoverColor} flex items-center`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0
            }}
            transition={{
              delay: index * 0.2,
              type: "spring",
              stiffness: 200
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Icon className="mr-2" />
            {item.label}
            {index < navItems.length - 1 && (
              <span className="text-gray-500 mx-2">|</span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  const [nameColor, setNameColor] = useState('bg-gradient-to-r from-blue-500 to-purple-600');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (scale) {
      setIsClient(true);
      const colorOptions = [
        'bg-gradient-to-r from-blue-500 to-purple-600',
        'bg-gradient-to-r from-green-500 to-teal-600',
        'bg-gradient-to-r from-red-500 to-orange-600'
      ];

      const colorInterval = setInterval(() => {
        setNameColor(prevColor => {
          const currentIndex = colorOptions.indexOf(prevColor);
          const nextIndex = (currentIndex + 1) % colorOptions.length;
          return colorOptions[nextIndex];
        });
      }, 5000);

      return () => clearInterval(colorInterval);
    }
  }, [scale]);

  if (!isClient) return null;

  return (
    <>
      <motion.section
        ref={containerRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
        style={{ 
          opacity, 
          scale,  // Explicitly use scale here
          y 
        }}
      >
        {/* Futuristic Clock */}
        <FuturisticClock />

        {/* Skill Particles Background */}
        <SkillParticles />

        {/* Futuristic Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-900/20 to-black opacity-80" />
        <div className="absolute inset-0 opacity-10 bg-grid-white/[0.02] pointer-events-none" />
        
        {/* Advanced Interactive Components */}
        <TechCapabilitiesShowcase />
        <CodeConceptDisplay />
        <GradientTicTacToe />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            style={{ scale, y }}
            className="space-y-4"
          >
            <h1 className="text-5xl font-bold mb-2">
            <span className="text-gray-500 mr-2">I&#39;M</span>
              <TypeAnimation
                sequence={[
                  'Girish Chowdary',
                  1000,
                  '',
                  500,
                  'Girish Chowdary',
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className={`inline-block bg-clip-text text-transparent ${nameColor}`}
              />
            </h1>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-4">
              <motion.span
                initial={{ 
                  opacity: 0, 
                  x: -50,
                  filter: 'blur(10px)'
                }}
                animate={{ 
                  opacity: 1,
                  x: 0,
                  filter: 'blur(0px)'
                }}
                transition={{
                  duration: 1.5,
                  type: "spring",
                  stiffness: 50,
                  damping: 10
                }}
              >
                Transforming complex challenges into elegant solutions through{' '}
                <motion.span 
                  className="inline-block"
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    transition: { 
                      type: "spring", 
                      stiffness: 300 
                    }
                  }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                    AI
                  </span>
                </motion.span>
              </motion.span>
            </p>

            <motion.div
              className="mt-4 flex justify-center items-center"
              initial={{ 
                opacity: 0,
                scale: 0.8
              }}
              animate={{ 
                opacity: 1,
                scale: 1
              }}
              transition={{
                duration: 2,
                type: "spring",
                stiffness: 100
              }}
            >
              {(() => {
                return <FuturisticNavigation />;
              })()}
            </motion.div>

            <div className="flex justify-center space-x-4">
              <motion.a
                href="https://github.com/GirishChowdary0208"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl text-gray-300 hover:text-white transition-colors relative group"
                whileHover={{ 
                  scale: 1.1,
                  transition: { 
                    type: "spring",
                    stiffness: 300
                  }
                }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0.7 }}
                animate={{ 
                  opacity: [0.7, 1],
                  transition: {
                    repeat: Infinity,
                    duration: 2,
                    repeatType: "reverse"
                  }
                }}
              >
                <FaGithub className="relative z-10" />
                <motion.div 
                  className="absolute inset-0 bg-blue-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileHover={{
                    scale: [0.8, 1.1],
                    opacity: [0, 0.5]
                  }}
                />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/girish-chowdary-919b6522b/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl text-gray-300 hover:text-white transition-colors relative group"
                whileHover={{ 
                  scale: 1.1,
                  transition: { 
                    type: "spring",
                    stiffness: 300
                  }
                }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0.7 }}
                animate={{ 
                  opacity: [0.7, 1],
                  transition: {
                    repeat: Infinity,
                    duration: 2,
                    repeatType: "reverse"
                  }
                }}
              >
                <FaLinkedin className="relative z-10" />
                <motion.div 
                  className="absolute inset-0 bg-blue-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileHover={{
                    scale: [0.8, 1.1],
                    opacity: [0, 0.5]
                  }}
                />
              </motion.a>
              <motion.a
                href="https://x.com/Girishhchowdary"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl text-gray-300 hover:text-white transition-colors relative group"
                whileHover={{ 
                  scale: 1.1,
                  transition: { 
                    type: "spring",
                    stiffness: 300
                  }
                }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0.7 }}
                animate={{ 
                  opacity: [0.7, 1],
                  transition: {
                    repeat: Infinity,
                    duration: 2,
                    repeatType: "reverse"
                  }
                }}
              >
                <FaTwitter className="relative z-10" />
                <motion.div 
                  className="absolute inset-0 bg-blue-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileHover={{
                    scale: [0.8, 1.1],
                    opacity: [0, 0.5]
                  }}
                />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.section>
      <CodeSuggestionBot />
    </>
  );
};

export default Hero;
