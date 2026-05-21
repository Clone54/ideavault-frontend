import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight } from 'lucide-react';

export default function MyInteractions() {
  const { user } = useAuth();
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      api.get(`/users/${user.email}/interactions`)
        .then(res => setInteractions(Array.isArray(res.data) ? res.data : []))
        .catch(err => {
          console.error(err);
          setInteractions([]);
        })
        .finally(() => setLoading(false));
    }
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Interactions</h1>
        <p className="text-gray-600 dark:text-gray-400">Keep track of the ideas you've engaged with.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div></div>
      ) : interactions.length === 0 ? (
        <div className="text-center py-24 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-6 text-lg">You haven't commented on any ideas yet.</p>
          <Link to="/ideas" className="inline-flex px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition">Explore Ideas</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {interactions.map((idea) => (
            <div key={idea._id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition">
              <div>
                <span className="inline-block px-2 py-1 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 text-xs font-semibold rounded-md mb-2">{idea.category}</span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">{idea.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Creator: {idea.creatorName}</p>
              </div>
              <div className="flex-shrink-0">
                <Link to={`/ideas/${idea._id}`} className="inline-flex items-center px-4 py-2 bg-gray-50 dark:bg-gray-900 text-indigo-600 dark:text-indigo-400 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                  View Discussion <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
