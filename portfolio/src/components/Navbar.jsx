import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = ({ theme = 'software' }) => {
  const location = useLocation();

  const themeStyles = {
    software: {
      bg: 'bg-dark-surface/80',
      border: 'border-gray-800',
      text: 'text-se-blue-light',
      hover: 'hover:text-se-blue',
    },
    cybersecurity: {
      bg: 'bg-black/80',
      border: 'border-cyber-green/30',
      text: 'text-cyber-green',
      hover: 'hover:text-white',
    },
  };

  const style = themeStyles[theme] || themeStyles.software;

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b ${style.bg} ${style.border}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className={`font-display text-2xl ${style.text} ${style.hover} transition-colors`}
        >
          Tantalost
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`font-mono text-sm ${style.text} ${style.hover} transition-colors`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile menu button - could be expanded later */}
        <button
          className={`md:hidden ${style.text} ${style.hover} font-mono text-sm`}
          aria-label="Menu"
        >
          ☰
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
