import { Link, useLocation } from 'react-router-dom';
import { Brain, Home, FileText, MessageCircle, BarChart3, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Layout = ({ children }) => {
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/questionnaire', icon: FileText, label: 'Questionnaire' },
    { path: '/consultation', icon: MessageCircle, label: 'Consultation' },
    { path: '/dashboard', icon: BarChart3, label: 'Dashboard' },
  ];

  return (
    <div className="min-h-screen bg-primary-50 dark:bg-primary-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-primary-900 shadow-sm border-b border-primary-200 dark:border-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Brain className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              <h1 className="text-xl font-bold text-primary-900 dark:text-white">AI Optimizer</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Navigation */}
              <nav className="hidden md:flex space-x-8">
                {navItems.map(({ path, icon: Icon, label }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === path
                        ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                        : 'text-primary-600 dark:text-primary-300 hover:text-primary-900 dark:hover:text-white hover:bg-primary-100 dark:hover:bg-primary-700'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </Link>
                ))}
              </nav>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-primary-100 dark:bg-primary-700 hover:bg-primary-200 dark:hover:bg-primary-600 transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-primary-50" />
                ) : (
                  <Moon className="h-5 w-5 text-primary-900" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-primary-800 border-t border-primary-200 dark:border-primary-700">
        <div className="flex justify-around py-2">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center space-y-1 px-3 py-2 text-xs font-medium transition-colors ${
                location.pathname === path
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-primary-600 dark:text-primary-300'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Layout; 