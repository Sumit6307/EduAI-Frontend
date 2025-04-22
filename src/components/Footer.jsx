import { useCallback } from 'react';
import { motion } from 'framer-motion';

// Debug render
console.log('Footer.jsx imported');

function Footer() {
  const footerLinks = [
    {
      category: 'Explore',
      links: [
        { name: 'Ask a Question', href: '/ask' },
        { name: 'Explore Topics', href: '/explore' },
        { name: 'Learning History', href: '/history' },
      ],
    },
    {
      category: 'Support',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
      ],
    },
    {
      category: 'Resources',
      links: [
        { name: 'NCERT', href: 'https://www.ncert.nic.in' },
        { name: 'Khan Academy', href: 'https://www.khanacademy.org' },
        { name: 'CISCE', href: 'https://www.cisce.org' },
      ],
    },
  ];

  const socialLinks = [
    { name: 'Twitter', href: 'https://x.com', icon: '🐦' },
    { name: 'Facebook', href: 'https://www.facebook.com', icon: '📘' },
    { name: 'YouTube', href: 'https://www.youtube.com', icon: '▶️' },
  ];

  const appLinks = [
    { name: 'App Store', href: 'https://www.apple.com/app-store', icon: '📱' },
    { name: 'Google Play', href: 'https://play.google.com', icon: '🤖' },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  // Handle newsletter signup (mock)
  const handleNewsletterSignup = useCallback((e) => {
    e.preventDefault();
    console.log('Newsletter signup submitted:', e.target.email.value);
    alert('Thank you for subscribing to EduAI’s newsletter!');
  }, []);

  // Scroll to top
  const scrollToTop = useCallback(() => {
    console.log('Scrolling to top');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <motion.footer
      className="bg-gradient-to-r from-blue-700 via-indigo-800 to-purple-800 text-white py-12 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {/* Subtle Radial Overlay */}
      <div className="absolute inset-0 bg-radial opacity-10 z-[-1]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Branding */}
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
              EduAI
            </h3>
            <p className="text-gray-200 mb-4">
              Empowering Minds, Shaping Futures with AI-powered learning for CBSE, ICSE, and State Boards.
            </p>
            <div className="flex space-x-4">
              {appLinks.map((app) => (
                <motion.a
                  key={app.name}
                  href={app.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-gray-200 hover:text-white transition-colors"
                  whileHover={{ scale: 1.2 }}
                  variants={itemVariants}
                  aria-label={`Download EduAI on ${app.name}`}
                >
                  {app.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation Links */}
          {footerLinks.map((category) => (
            <motion.div key={category.category} variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-4 text-blue-200">{category.category}</h4>
              <ul className="space-y-2">
                {category.links.map((link) => (
                  <motion.li key={link.name} variants={itemVariants}>
                    <a
                      href={link.href}
                      className="text-gray-200 hover:text-white transition-colors"
                      style={{ pointerEvents: 'auto' }}
                      aria-label={`Navigate to ${link.name}`}
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter Signup & Contact */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4 text-blue-200">Stay Connected</h4>
            <form onSubmit={handleNewsletterSignup} className="mb-6">
              <label htmlFor="email" className="sr-only">Email Address</label>
              <div className="flex">
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-l-lg text-gray-800 focus:outline-none"
                  required
                  aria-label="Email for newsletter"
                />
                <motion.button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ pointerEvents: 'auto' }}
                  aria-label="Subscribe to newsletter"
                >
                  Subscribe
                </motion.button>
              </div>
            </form>
            <ul className="space-y-2 text-gray-200">
              <li>
                📧 <a href="mailto:support@eduai.com" aria-label="Email support">support@eduai.com</a>
              </li>
              <li>
                📞 <a href="tel: 6307640107" aria-label="Call support">+91 6307640107</a>
              </li>
              <li>
                📍 123 Civil Lines, Prayagraj
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="my-8 border-t border-blue-200/50"
          variants={itemVariants}
        />

        {/* Social Media & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div className="flex space-x-4 mb-4 md:mb-0" variants={itemVariants}>
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-200 hover:text-white transition-colors"
                whileHover={{ scale: 1.2 }}
                variants={itemVariants}
                aria-label={`Follow EduAI on ${social.name}`}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
          <motion.div
            className="text-center text-gray-200"
            variants={itemVariants}
          >
            © {new Date().getFullYear()} EduAI. All rights reserved.
          </motion.div>
        </div>

        {/* Back to Top Button */}
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ y: [0, -10, 0], transition: { repeat: Infinity, duration: 2 } }}
          style={{ pointerEvents: 'auto' }}
          aria-label="Scroll to top"
        >
          ↑
        </motion.button>
      </div>
    </motion.footer>
  );
}

export default Footer;