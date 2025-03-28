'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaBrain, FaRobot } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';
import { SiTensorflow, SiPytorch, SiScikitlearn } from 'react-icons/si';

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const validateForm = () => {
    const errors = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };

    // Name validation
    if (!formState.name.trim()) {
      errors.name = 'Name is required';
    } else if (formState.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formState.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formState.email)) {
      errors.email = 'Invalid email format';
    }

    // Subject validation
    if (!formState.subject.trim()) {
      errors.subject = 'Subject is required';
    } else if (formState.subject.trim().length < 3) {
      errors.subject = 'Subject must be at least 3 characters';
    }

    // Message validation
    if (!formState.message.trim()) {
      errors.message = 'Message is required';
    } else if (formState.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    setFormErrors(errors);
    return Object.values(errors).every(error => error === '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://formspree.io/f/xwplnvke', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear specific field error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const techStack = [
    { icon: SiTensorflow },
    { icon: SiPytorch },
    { icon: SiScikitlearn },
    { icon: FaBrain },
    { icon: FaRobot }
  ];

  return (
    <section className="py-20 bg-black relative overflow-hidden" ref={containerRef}>
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, rgba(0, 0, 0, 0) 70%)",
          opacity
        }}
      />

      {/* Animated circuit lines */}
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
          <h2 className="text-4xl font-bold text-white mb-4">Neural Connection Hub</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-8" />
          <p className="text-blue-400 max-w-2xl mx-auto text-lg font-light tracking-wide">
            Initiate a synaptic connection with my AI-enhanced response system
          </p>
        </motion.div>

        {/* Tech Stack Icons */}
        <motion.div 
          className="flex justify-center gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {techStack.map((tech, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-300" />
              <div className="relative p-4 bg-gray-900 rounded-lg">
                <tech.icon className="text-3xl text-blue-400 group-hover:text-blue-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative bg-gray-900/90 backdrop-blur-xl p-8 rounded-lg border border-blue-500/20"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="relative group"
              >
                <label htmlFor="name" className="block text-sm font-medium text-blue-400 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-gray-800/50 rounded-lg border ${
                    formErrors.name 
                      ? 'border-red-500/50 focus:border-red-500' 
                      : 'border-blue-500/20 focus:border-blue-500'
                  } text-white focus:outline-none transition-colors`}
                  placeholder="Enter your name"
                />
                {formErrors.name && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="relative group"
              >
                <label htmlFor="email" className="block text-sm font-medium text-blue-400 mb-2">
                  E-Mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-gray-800/50 rounded-lg border ${
                    formErrors.email 
                      ? 'border-red-500/50 focus:border-red-500' 
                      : 'border-blue-500/20 focus:border-blue-500'
                  } text-white focus:outline-none transition-colors`}
                  placeholder="Enter your email address"
                />
                {formErrors.email && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative group"
              >
                <label htmlFor="subject" className="block text-sm font-medium text-blue-400 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-gray-800/50 rounded-lg border ${
                    formErrors.subject 
                      ? 'border-red-500/50 focus:border-red-500' 
                      : 'border-blue-500/20 focus:border-blue-500'
                  } text-white focus:outline-none transition-colors`}
                  placeholder="Enter the subject"
                />
                {formErrors.subject && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.subject}</p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative group"
              >
                <label htmlFor="message" className="block text-sm font-medium text-blue-400 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-4 py-3 bg-gray-800/50 rounded-lg border ${
                    formErrors.message 
                      ? 'border-red-500/50 focus:border-red-500' 
                      : 'border-blue-500/20 focus:border-blue-500'
                  } text-white focus:outline-none transition-colors resize-none`}
                  placeholder="Write your message here..."
                />
                {formErrors.message && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.message}</p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <IoMdSend className="mr-2" /> Send Message
                    </>
                  )}
                </button>
              </motion.div>

              {/* Submission Status */}
              {submitStatus === 'success' && (
                <div className="text-green-500 text-center mt-4">
                  Message sent successfully! I&apos;ll get back to you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="text-red-500 text-center mt-4">
                  Failed to send message. Please try again later.
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
      <p className="text-gray-400 text-center mb-8">
        Let&apos;s collaborate and transform innovative ideas into reality
      </p>
      <p className="text-gray-500 text-sm mb-4">
        &quot;Innovation begins with a conversation&quot;
      </p>
    </section>
  );
};

export default Contact;
