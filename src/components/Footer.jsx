import { Lightbulb, Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pt-12 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <span className="font-bold text-lg text-gray-900 dark:text-white">IdeaVault</span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs mb-4">
              The premier platform for sharing, validating, and growing innovative startup ideas through community collaboration.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><Link to="/ideas" className="hover:text-indigo-600 dark:hover:text-indigo-400">Explore Ideas</Link></li>
              <li><Link to="/add-idea" className="hover:text-indigo-600 dark:hover:text-indigo-400">Submit Idea</Link></li>
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Trending</a></li>
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Categories</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li>hi@ideavault.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Innovation Drive</li>
              <li>Tech City, TC 90210</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} IdeaVault Platform. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0 text-sm text-gray-400">
            <a href="#" className="hover:text-gray-900 dark:hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900 dark:hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
