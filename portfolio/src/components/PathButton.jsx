import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const PathButton = ({ title, path, icon, theme, delay = 0 }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  const themeStyles = {
    software: {
      bg: 'bg-se-blue',
      bgHover: 'hover:bg-se-blue-dark',
      border: 'border-se-blue-light',
      shadow: 'shadow-se-blue/50',
      icon: '< />',
    },
    cybersecurity: {
      bg: 'bg-cyber-green',
      bgHover: 'hover:bg-cyber-green-dark',
      border: 'border-cyber-green',
      shadow: 'shadow-cyber-green/50',
      icon: '🔒',
    },
  };

  const style = themeStyles[theme] || themeStyles.software;

  return (
    <motion.button
      onClick={handleClick}
      className={`
        relative px-8 py-6 md:px-12 md:py-8
        ${style.bg} ${style.bgHover}
        border-2 ${style.border}
        rounded-lg
        text-white font-mono text-lg md:text-xl
        font-semibold
        transition-all duration-300
        shadow-lg ${style.shadow}
        hover:shadow-2xl hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black
        overflow-hidden
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      aria-label={`Navigate to ${title} portfolio`}
    >
      {/* Background pulse effect */}
      <motion.div
        className="absolute inset-0 bg-white/20"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.5, opacity: 0.3 }}
        transition={{ duration: 0.6 }}
        style={{ borderRadius: '50%' }}
      />

      <div className="relative flex items-center gap-4">
        <span className="text-2xl md:text-3xl">{icon}</span>
        <span>{title}</span>
      </div>
    </motion.button>
  );
};

export default PathButton;
