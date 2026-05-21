import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';
import { Search, Filter, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Ideas() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const fetchIdeas = async () => {
    setLoading(true);
    try {
      const res = await api.get('/ideas', { params: { search, category: category === 'All' ? '' : category } });
      setIdeas(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log(error);
      setIdeas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, [search, category]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Explore Ideas</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">Discover and validate the next big thing.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-10 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex-grow relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search ideas by title..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-white outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        <div className="md:w-64 relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-white outline-none focus:border-indigo-500 appearance-none transition-colors"
          >
            <option value="All">All Categories</option>
            <option value="Tech">Tech</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="AI">AI</option>
            <option value="Finance">Finance</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-12 h-12 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div></div>
      ) : ideas.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No ideas found</h3>
          <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ideas.map((idea, idx) => (
            <motion.div 
              key={idea._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 flex flex-col shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-semibold tracking-wide uppercase">
                  {idea.category}
                </span>
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                  <Users className="w-4 h-4 mr-1" />
                  {idea.interactionCount || 0}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">{idea.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 flex-grow line-clamp-3">
                {idea.shortDescription}
              </p>
              
              <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center mt-auto">
                <div className="flex items-center gap-2">
                  {idea.creatorPhoto ? (
                    <img src={idea.creatorPhoto} alt="" className="w-6 h-6 rounded-full" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700" />
                  )}
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{idea.creatorName}</span>
                </div>
                <Link to={`/ideas/${idea._id}`} className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 flex items-center pr-2">
                    Details <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
