import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

interface ThemeToggleProps {
  theme: string;
  toggleTheme: () => void;
  compact?: boolean;
}

const ThemeToggle = ({ theme, toggleTheme, compact = false }: ThemeToggleProps) => {
  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative flex items-center justify-center rounded-full transition-all duration-300 ${
        compact ? 'w-9 h-9' : 'w-10 h-10'
      } ${
        theme === 'light'
          ? 'bg-primary/10 text-primary hover:bg-primary/20'
          : 'text-gray-300 hover:text-primary hover:bg-white/10'
      }`}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
      aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        {theme === 'dark' ? (
          <Sun className="w-4 h-4" />
        ) : (
          <Moon className="w-4 h-4" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
