import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState, useCallback, useContext } from 'react';
import { useInView } from 'react-intersection-observer';
import { BoardContext } from '../contexts/BoardContext';

// Debug render
console.log('Home.jsx imported');

function Home() {
  const navigate = useNavigate();
  const { board, setBoard } = useContext(BoardContext);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Animation controls
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Handle board change
  const handleBoardChange = useCallback((newBoard) => {
    console.log('Changing board to:', newBoard);
    setBoard(newBoard);
  }, [setBoard]);

  // Testimonial navigation
  const nextTestimonial = useCallback(() => {
    console.log('Next testimonial');
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    console.log('Previous testimonial');
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const boards = ['CBSE', 'ICSE', 'State Board'];

  const features = [
    {
      title: 'Personalized Learning',
      desc: 'Tailored explanations for CBSE, ICSE, and State Board syllabi.',
      icon: '📚',
    },
    {
      title: 'AI-Powered Answers',
      desc: 'Instant, detailed responses with diagrams from our AI tutor.',
      icon: '🤖',
    },
    {
      title: 'Track Progress',
      desc: 'Review your learning history and improve over time.',
      icon: '📈',
    },
  ];

  const resources = [
    {
      title: 'CBSE Study Guides',
      desc: 'Free NCERT-based study materials.',
      link: 'https://ncert.nic.in',
      img: 'https://images.unsplash.com/photo-1580582932707-520aed4d91fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'ICSE Sample Papers',
      desc: 'Practice with official ICSE question papers.',
      link: 'https://cisce.org',
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Video Tutorials',
      desc: 'Engaging lessons on YouTube.',
      link: 'https://www.youtube.com',
      img: 'https://images.unsplash.com/photo-1617791160588-241658c0f566?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'State Board Notes',
      desc: 'Access notes for various state syllabi.',
      link: 'https://www.tn.gov.in',
      img: 'https://images.unsplash.com/photo-1507842217343-583bb7275b66?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    },
  ];

  const testimonials = [
    {
      name: 'Aarav Sharma',
      quote: 'EduAI helped me ace my CBSE exams with clear explanations!',
      img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    },
    {
      name: 'Priya Patel',
      quote: 'The AI tutor is like having a teacher available 24/7.',
      img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    },
    {
      name: 'Vikram Singh',
      quote: 'The diagrams make complex topics so easy to understand.',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    },
  ];

  const stats = [
    { value: '10,000+', label: 'Students Empowered' },
    { value: '50,000+', label: 'Questions Answered' },
    { value: '1,000+', label: 'Topics Covered' },
  ];

  const blogPosts = [
    {
      title: 'Mastering CBSE Physics',
      desc: 'Tips and tricks for acing your exams.',
      link: 'https://x.com',
      img: 'https://images.unsplash.com/photo-1635073048028-6772b064ad66?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Why ICSE Biology is Fun',
      desc: 'Explore the wonders of life sciences.',
      link: 'https://khanacademy.org',
      img: 'https://images.unsplash.com/photo-1628592102757-7bd522d74e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    },
  ];

  const partners = [
    { name: 'NCERT', img: 'https://images.unsplash.com/photo-1580582932707-520aed4d91fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
    { name: 'Khan Academy', img: 'https://images.unsplash.com/photo-1617791160588-241658c0f566?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-700 via-indigo-800 to-purple-800 text-white relative">
        <div className="absolute inset-0 bg-radial opacity-10 z-[-1]" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)' }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center px-4 relative z-10"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold mb-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Unlock Your Potential with EduAI
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Your AI-powered tutor for CBSE, ICSE, and State Board success.
          </motion.p>
          <motion.div
            className="flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0,0,0,0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/dashboard')}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow-lg"
              aria-label="Start learning"
              style={{ pointerEvents: 'auto' }}
            >
              Start Learning
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0,0,0,0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/explore')}
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold"
              aria-label="Explore topics"
              style={{ pointerEvents: 'auto' }}
            >
              Explore Topics
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Board Selector */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-4xl font-bold mb-4 text-gray-800"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            Choose Your Board
          </motion.h2>
          <motion.p
            className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            Select your education board for a tailored learning experience.
          </motion.p>
          <motion.div
            className="flex justify-center gap-4 flex-wrap"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {boards.map((b) => (
              <motion.button
                key={b}
                onClick={() => handleBoardChange(b)}
                className={`px-6 py-3 rounded-lg font-semibold ${
                  board === b ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variants={itemVariants}
                aria-label={`Select ${b} board`}
                style={{ pointerEvents: 'auto' }}
              >
                {b}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-center mb-12 text-gray-800 relative"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            ref={ref}
          >
            Why Choose EduAI?
            <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600" />
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white rounded-lg shadow-md border border-indigo-200/50 hover:shadow-xl transition-shadow"
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -5 }}
                aria-label={feature.title}
                style={{ pointerEvents: 'auto' }}
              >
                <span className="text-4xl mb-4 block text-blue-600">{feature.icon}</span>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-4xl font-bold mb-12 text-gray-800"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            Our Impact
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="p-6"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <h3 className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-center mb-12 text-gray-800 relative"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            Educational Resources
            <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600" />
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {resources.map((resource, index) => (
              <motion.a
                key={index}
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow"
                variants={itemVariants}
                whileHover={{ y: -5 }}
                aria-label={`Visit ${resource.title}`}
                style={{ pointerEvents: 'auto' }}
              >
                <img src={resource.img} alt={resource.title} className="w-full h-40 object-cover rounded-t-lg" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{resource.title}</h3>
                  <p className="text-gray-600">{resource.desc}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Video Demo Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-4xl font-bold mb-12 text-gray-800 relative"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            See EduAI in Action
            <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600" />
          </motion.h2>
          <motion.div
            className="max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative pb-9/16">
              <img
                src="https://images.unsplash.com/photo-1617791160588-241658c0f566?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="EduAI Demo Video"
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-blue-600 p-4 rounded-full"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Watch EduAI demo video"
                  style={{ pointerEvents: 'auto' }}
                >
                  ▶️
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-center mb-12 text-gray-800 relative"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            What Our Students Say
            <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600" />
          </motion.h2>
          <motion.div
            className="relative max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <motion.div
              className="p-6 bg-gray-100 rounded-lg text-center"
              variants={itemVariants}
              key={testimonialIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
              aria-label={`Testimonial by ${testimonials[testimonialIndex].name}`}
              style={{ pointerEvents: 'auto' }}
            >
              <img
                src={testimonials[testimonialIndex].img}
                alt={testimonials[testimonialIndex].name}
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <p className="text-gray-600 italic mb-2">"{testimonials[testimonialIndex].quote}"</p>
              <h4 className="font-semibold text-gray-800">{testimonials[testimonialIndex].name}</h4>
            </motion.div>
            <div className="flex justify-center gap-4 mt-4">
              <motion.button
                onClick={prevTestimonial}
                className="bg-blue-600 text-white p-2 rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Previous testimonial"
                style={{ pointerEvents: 'auto' }}
              >
                ←
              </motion.button>
              <motion.button
                onClick={nextTestimonial}
                className="bg-blue-600 text-white p-2 rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Next testimonial"
                style={{ pointerEvents: 'auto' }}
              >
                →
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-center mb-12 text-gray-800 relative"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            Latest Insights
            <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600" />
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {blogPosts.map((post, index) => (
              <motion.a
                key={index}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow"
                variants={itemVariants}
                whileHover={{ y: -5 }}
                aria-label={`Read ${post.title}`}
                style={{ pointerEvents: 'auto' }}
              >
                <img src={post.img} alt={post.title} className="w-full h-40 object-cover rounded-t-lg" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
                  <p className="text-gray-600">{post.desc}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-4xl font-bold mb-12 text-gray-800 relative"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            Our Partners
            <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600" />
          </motion.h2>
          <motion.div
            className="flex justify-center gap-8 flex-wrap"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                className="p-4"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <img src={partner.img} alt={partner.name} className="h-16 object-contain" />
                <p className="text-gray-600 mt-2">{partner.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-700 via-indigo-800 to-purple-800 text-white">
        <div className="container mx-auto px-4 text-center relative">
          <div className="absolute inset-0 bg-radial opacity-10 z-[-1]" />
          <motion.h2
            className="text-4xl font-bold mb-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            Ready to Transform Your Learning?
          </motion.h2>
          <motion.p
            className="text-xl mb-8 max-w-2xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            Join thousands of students excelling with EduAI’s AI-powered tutoring.
          </motion.p>
          <motion.div
            className="flex justify-center gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0,0,0,0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/signup')}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow-lg"
              variants={itemVariants}
              aria-label="Get started"
              style={{ pointerEvents: 'auto' }}
            >
              Get Started Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0,0,0,0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/ask')}
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold"
              variants={itemVariants}
              aria-label="Ask a question"
              style={{ pointerEvents: 'auto' }}
            >
              Ask a Question
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;