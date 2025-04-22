import { useContext, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { BoardContext } from '../contexts/BoardContext';

// Debug render
console.log('ExploreTopics.jsx imported');

// Inline topic data with online images and real website links
const topicData = {
  CBSE: [
    {
      name: 'Physics',
      description: 'Master mechanics, electromagnetism, and optics with interactive simulations.',
      image: 'https://images.unsplash.com/photo-1635073048028-6772b064ad66?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      link: 'https://www.ncert.nic.in/textbook.php',
      subtopics: ['Newton’s Laws', 'Electromagnetism', 'Optics'],
      quizLink: 'https://www.learncbse.in/cbse-class-12-physics-mcq/',
      simulationLink: 'https://phet.colorado.edu/en/simulations/category/physics',
    },
    {
      name: 'Biology',
      description: 'Explore cells, genetics, and ecosystems with engaging visuals.',
      image: 'https://images.unsplash.com/photo-1628592102757-7bd522d74e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      link: 'https://www.khanacademy.org/science/biology',
      subtopics: ['Genetics', 'Human Anatomy', 'Ecology'],
      quizLink: 'https://www.learncbse.in/cbse-class-12-biology-mcq/',
      simulationLink: 'https://www.olabs.edu.in/?sub=79&brch=17',
    },
    {
      name: 'Mathematics',
      description: 'Conquer algebra, calculus, and geometry with step-by-step guides.',
      image: 'https://images.unsplash.com/photo-1509228622682-30c0f0e3e6a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      link: 'https://byjus.com/maths/',
      subtopics: ['Algebra', 'Calculus', 'Trigonometry'],
      quizLink: 'https://www.learncbse.in/cbse-class-12-maths-mcq/',
      simulationLink: 'https://phet.colorado.edu/en/simulations/category/math',
    },
  ],
  ICSE: [
    {
      name: 'Chemistry',
      description: 'Learn chemical reactions and lab techniques with interactive labs.',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      link: 'https://www.cisce.org/publication-detail.aspx?Id=3',
      subtopics: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry'],
      quizLink: 'https://www.knowledgeboat.com/learn/icse-class-10-chemistry',
      simulationLink: 'https://www.olabs.edu.in/?sub=73&brch=8',
    },
    {
      name: 'History',
      description: 'Uncover ancient civilizations and modern history with rich narratives.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      link: 'https://www.khanacademy.org/humanities/world-history',
      subtopics: ['Ancient India', 'World Wars', 'Modern History'],
      quizLink: 'https://www.knowledgeboat.com/learn/icse-class-10-history-civics',
      simulationLink: null,
    },
    {
      name: 'Geography',
      description: 'Study physical and human geography with maps and case studies.',
      image: 'https://images.unsplash.com/photo-1521295123332-7c66cb995d77?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      link: 'https://www.nationalgeographic.org/education/',
      subtopics: ['Topography', 'Climate', 'Population'],
      quizLink: 'https://www.knowledgeboat.com/learn/icse-class-10-geography',
      simulationLink: null,
    },
  ],
  'State Board': [
    {
      name: 'Science',
      description: 'Discover physics, chemistry, and biology tailored to state syllabi.',
      image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      link: 'https://www.tn.gov.in/school-education',
      subtopics: ['Mechanics', 'Chemical Reactions', 'Cell Biology'],
      quizLink: 'https://www.selfstudys.com/books/tamil-nadu/state-books',
      simulationLink: 'https://phet.colorado.edu/en/simulations/category/new',
    },
    {
      name: 'Social Studies',
      description: 'Study history, civics, and geography with a regional focus.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      link: 'https://www.education.gov.in/en',
      subtopics: ['Indian History', 'Civics', 'Regional Geography'],
      quizLink: 'https://www.selfstudys.com/books/tamil-nadu/state-books',
      simulationLink: null,
    },
    {
      name: 'English',
      description: 'Enhance language skills with literature and grammar lessons.',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      link: 'https://www.britishcouncil.in/english',
      subtopics: ['Prose', 'Poetry', 'Grammar'],
      quizLink: 'https://www.selfstudys.com/books/tamil-nadu/state-books',
      simulationLink: null,
    },
  ],
};

// Study tips for each board
const studyTips = {
  CBSE: [
    'Focus on NCERT textbooks for core concepts.',
    'Practice previous years’ papers from cbse.gov.in.',
    'Use PhET simulations for hands-on learning.',
  ],
  ICSE: [
    'Emphasize project work and practicals.',
    'Refer to Selina textbooks for in-depth study.',
    'Practice analytical questions from KnowledgeBoat.',
  ],
  'State Board': [
    'Study state-specific textbooks thoroughly.',
    'Use SelfStudys for regional question banks.',
    'Watch Khan Academy videos for clarity.',
  ],
};

function ExploreTopics() {
  const { board } = useContext(BoardContext);
  const [filter, setFilter] = useState('All');
  const [filteredTopics, setFilteredTopics] = useState(topicData[board]);
  const [featuredTopic, setFeaturedTopic] = useState(topicData[board][0]);

  // Update filtered topics and featured topic
  useEffect(() => {
    console.log('ExploreTopics rendered:', { board, filter });
    const topics = filter === 'All'
      ? topicData[board]
      : topicData[board].filter((topic) => topic.name.toLowerCase().includes(filter.toLowerCase()));
    setFilteredTopics(topics);
    setFeaturedTopic(topicData[board][0]);
  }, [board, filter]);

  // Handle filter change
  const handleFilter = useCallback((category) => {
    console.log('Filter changed:', category);
    setFilter(category);
  }, []);

  // Handle link click
  const handleLinkClick = useCallback((link) => {
    console.log('Opening link:', link);
    window.open(link, '_blank', 'noopener,noreferrer');
  }, []);

  const filters = ['All', 'Science', 'Math', 'Humanities', 'Language'];
  const otherBoards = Object.keys(topicData).filter((b) => b !== board);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 py-16 relative">
      {/* Subtle Radial Overlay */}
      <div className="absolute inset-0 bg-radial opacity-10 z-[-1]" />

      <div className="container mx-auto px-4 relative z-10 flex">
        {/* Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden lg:block w-64 mr-6 sticky top-16 h-fit"
        >
          <div className="bg-white rounded-xl p-4 shadow-lg border border-indigo-200/50">
            <h3 className="text-lg font-bold text-blue-600 mb-3">Quick Links</h3>
            <ul className="space-y-2">
              {['Featured Topic', 'Topics', 'Resources', 'Study Tips', 'Tools', 'Community'].map((section) => (
                <li key={section}>
                  <a
                    href={`#${section.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-800 hover:text-blue-600"
                    style={{ pointerEvents: 'auto' }}
                  >
                    {section}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-8"
            id="header"
          >
            <h1 className="text-4xl font-bold text-white drop-shadow-md">
              ExploreTopics by EduAI
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-blue-200 mt-2 text-lg"
            >
              Discover Knowledge with {board}’s Spellbinding Subjects!
            </motion.p>
          </motion.div>

          {/* Featured Topic */}
          <motion.section
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-lg mb-8 border border-indigo-200/50"
            id="featured-topic"
          >
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              Featured Topic: {featuredTopic.name}
            </h2>
            <div className="flex flex-col md:flex-row gap-6">
              <motion.img
                src={featuredTopic.image}
                alt={featuredTopic.name}
                className="w-full md:w-1/3 rounded-lg object-cover"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              />
              <div className="flex-1">
                <p className="text-gray-800 mb-4">{featuredTopic.description}</p>
                <ul className="list-disc list-inside text-gray-600 mb-4">
                  {featuredTopic.subtopics.map((subtopic, index) => (
                    <li key={index}>{subtopic}</li>
                  ))}
                </ul>
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.03, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleLinkClick(featuredTopic.link)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                    style={{ pointerEvents: 'auto' }}
                    aria-label={`Learn more about ${featuredTopic.name}`}
                  >
                    Learn More
                  </motion.button>
                  {featuredTopic.quizLink && (
                    <motion.button
                      whileHover={{ scale: 1.03, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleLinkClick(featuredTopic.quizLink)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
                      style={{ pointerEvents: 'auto' }}
                      aria-label={`Take a quiz on ${featuredTopic.name}`}
                    >
                      Quick Quiz
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Filter Bar */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-6 flex gap-3 flex-wrap"
            id="filters"
          >
            {filters.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleFilter(category)}
                className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 ${
                  filter === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
                style={{ pointerEvents: 'auto' }}
                aria-label={`Filter by ${category}`}
              >
                <span className="text-sm">
                  {category === 'Science' ? '🔬' : category === 'Math' ? '📐' : category === 'Humanities' ? '📜' : category === 'Language' ? '📖' : '🌐'}
                </span>
                {category}
              </motion.button>
            ))}
          </motion.section>

          {/* Topic Grid */}
          <motion.section
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="bg-white rounded-xl p-6 shadow-lg mb-8 border border-indigo-200/50"
            id="topics"
          >
            <h2 className="text-2xl font-bold text-blue-600 mb-4">{board} Topics</h2>
            {filteredTopics.length === 0 ? (
              <p className="text-gray-600 text-center">No topics found for this filter.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredTopics.map((topic, index) => (
                  <motion.div
                    key={topic.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.03, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer"
                    style={{ pointerEvents: 'auto' }}
                    aria-label={`Explore ${topic.name}`}
                  >
                    <img
                      src={topic.image}
                      alt={topic.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h3 className="text-lg font-semibold text-gray-800">{topic.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{topic.description}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleLinkClick(topic.link)}
                        className="text-blue-600 text-sm underline"
                        aria-label={`Learn more about ${topic.name}`}
                      >
                        Learn More
                      </button>
                      {topic.quizLink && (
                        <button
                          onClick={() => handleLinkClick(topic.quizLink)}
                          className="text-green-600 text-sm underline"
                          aria-label={`Take a quiz on ${topic.name}`}
                        >
                          Quiz
                        </button>
                      )}
                      {topic.simulationLink && (
                        <button
                          onClick={() => handleLinkClick(topic.simulationLink)}
                          className="text-purple-600 text-sm underline"
                          aria-label={`Try a simulation for ${topic.name}`}
                        >
                          Simulation
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.section>

          {/* Learning Resources */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-white rounded-xl p-6 shadow-lg mb-8 border border-indigo-200/50"
            id="resources"
          >
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Learning Resources</h2>
            <ul className="space-y-4">
              <li>
                <h3 className="text-lg font-semibold text-gray-800">Khan Academy Videos</h3>
                <p className="text-gray-600">Watch engaging video lessons on {board} subjects.</p>
                <button
                  onClick={() => handleLinkClick('https://www.khanacademy.org')}
                  className="text-blue-600 underline"
                  aria-label="Visit Khan Academy"
                >
                  Explore Videos
                </button>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-gray-800">NCERT Textbooks</h3>
                <p className="text-gray-600">Access free PDF textbooks for {board} syllabus.</p>
                <button
                  onClick={() => handleLinkClick('https://www.ncert.nic.in/textbook.php')}
                  className="text-blue-600 underline"
                  aria-label="Download NCERT Textbooks"
                >
                  Download PDFs
                </button>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-gray-800">BYJU’S Study Material</h3>
                <p className="text-gray-600">Explore detailed notes and practice questions.</p>
                <button
                  onClick={() => handleLinkClick('https://byjus.com/')}
                  className="text-blue-600 underline"
                  aria-label="Visit BYJU’S"
                >
                  Study Now
                </button>
              </li>
            </ul>
          </motion.section>

          {/* Study Tips */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-white rounded-xl p-6 shadow-lg mb-8 border border-indigo-200/50"
            id="study-tips"
          >
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Study Tips for {board}</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              {studyTips[board].map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </motion.section>

          {/* Interactive Tools */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="bg-white rounded-xl p-6 shadow-lg mb-8 border border-indigo-200/50"
            id="tools"
          >
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Interactive Tools</h2>
            <ul className="space-y-4">
              <li>
                <h3 className="text-lg font-semibold text-gray-800">PhET Simulations</h3>
                <p className="text-gray-600">Interactive science and math simulations for hands-on learning.</p>
                <button
                  onClick={() => handleLinkClick('https://phet.colorado.edu/')}
                  className="text-blue-600 underline"
                  aria-label="Try PhET Simulations"
                >
                  Try Simulations
                </button>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-gray-800">OLabs Experiments</h3>
                <p className="text-gray-600">Virtual labs for Physics, Chemistry, and Biology.</p>
                <button
                  onClick={() => handleLinkClick('https://www.olabs.edu.in/')}
                  className="text-blue-600 underline"
                  aria-label="Access OLabs"
                >
                  Explore Labs
                </button>
              </li>
            </ul>
          </motion.section>

          {/* Community Spotlight */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="bg-white rounded-xl p-6 shadow-lg mb-8 border border-indigo-200/50"
            id="community"
          >
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Community Spotlight</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-800 italic">
                  “ExploreTopics helped me ace my CBSE Physics exam with PhET simulations!” - Priya S.
                </p>
                <p className="text-gray-600 text-sm">Class 12 Student, Chennai</p>
              </div>
              <div>
                <p className="text-gray-800 italic">
                  “The ICSE History resources on ExploreTopics are a game-changer.” - Arjun M.
                </p>
                <p className="text-gray-600 text-sm">Class 10 Student, Mumbai</p>
              </div>
            </div>
          </motion.section>

          {/* Related Boards */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-indigo-200/50"
            id="related-boards"
          >
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Explore Other Boards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {otherBoards.map((otherBoard) => (
                <motion.div
                  key={otherBoard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  whileHover={{ scale: 1.03, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  style={{ pointerEvents: 'auto' }}
                  aria-label={`Explore ${otherBoard} topics`}
                >
                  <h3 className="text-lg font-semibold text-gray-800">{otherBoard}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Discover {otherBoard}’s exciting subjects and resources.
                  </p>
                  <button
                    onClick={() => handleLinkClick(`https://www.${otherBoard.toLowerCase() === 'cbse' ? 'cbse.gov.in' : otherBoard.toLowerCase() === 'icse' ? 'cisce.org' : 'tn.gov.in/school-education'}`)}
                    className="text-blue-600 text-sm underline"
                    aria-label={`Learn more about ${otherBoard}`}
                  >
                    Learn More
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}

export default ExploreTopics;