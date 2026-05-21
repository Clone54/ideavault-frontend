import { Link } from 'react-router-dom';
import { Target } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <Target className="w-24 h-24 text-indigo-200 dark:text-indigo-900 mb-8" />
      <h1 className="text-6xl font-extrabold text-gray-900 dark:text-white mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-6">Off the Beaten Path</h2>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-10 text-lg">
        The idea or page you're looking for doesn't exist. Maybe it's time to create it?
      </p>
      <Link to="/" className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 transition">
        Back to Home
      </Link>
    </div>
  );
}
