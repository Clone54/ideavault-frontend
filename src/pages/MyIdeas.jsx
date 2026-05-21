import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, ArrowRight } from 'lucide-react';

export default function MyIdeas() {
  const { user } = useAuth();
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState(null);

  const fetchMyIdeas = async () => {
    try {
      const res = await api.get(`/users/${user?.email}/ideas`);
      setIdeas(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      toast.error('Failed to fetch your ideas');
      setIdeas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchMyIdeas();
  }, [user]);

  const handleDelete = async (id) => {




    

    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-semibold text-gray-900">Are you sure you want to delete this idea?</p>
        <div className="flex gap-2">
          <button 
            className="px-3 py-1 bg-red-600 text-white rounded font-medium"
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                await api.delete(`/ideas/${id}`);
                fetchMyIdeas();
                toast.success('Idea deleted');
              } catch (e) {
                toast.error('Failed to delete');
              }
            }}
          >
            Yes, Delete
          </button>
          <button 
            className="px-3 py-1 bg-gray-200 text-gray-800 rounded font-medium"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ), { duration: Infinity });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/ideas/${editModal._id}`, editModal);
      setEditModal(null);
      fetchMyIdeas();
      toast.success('Idea updated successfully');
    } catch (error) {
      toast.error('Failed to update idea');
    }
  };

  const handleChange = (e) => {
    setEditModal({ ...editModal, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">My Ideas</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and track the progress of your startup concepts.</p>
        </div>
        <Link to="/add-idea" className="hidden sm:inline-flex px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition">
          Add New Idea
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div></div>
      ) : ideas.length === 0 ? (
        <div className="text-center py-24 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <p className="text-gray-500 mb-6 text-lg">You haven't posted any ideas yet.</p>
          <Link to="/add-idea" className="inline-flex px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition">Start Sharing Now</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <motion.div 
              key={idea._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs font-semibold">
                  {idea.category}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => setEditModal(idea)} className="p-2 text-gray-400 hover:text-indigo-600 bg-gray-50 dark:bg-gray-900 rounded-lg transition">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(idea._id)} className="p-2 text-gray-400 hover:text-red-600 bg-gray-50 dark:bg-gray-900 rounded-lg transition">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">{idea.title}</h3>
              <p className="text-sm text-gray-500 mb-6 flex-grow line-clamp-2">{idea.shortDescription}</p>
              
              <Link to={`/ideas/${idea._id}`} className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 text-indigo-600 dark:text-indigo-400 font-medium text-sm flex items-center justify-center hover:text-indigo-700">
                View Public Page <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {}
      <AnimatePresence>
        {editModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Edit Idea</h2>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                  <input type="text" name="title" value={editModal.title} onChange={handleChange} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-900 dark:border-gray-700 dark:text-white outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Short Description</label>
                  <textarea name="shortDescription" value={editModal.shortDescription} onChange={handleChange} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-900 dark:border-gray-700 dark:text-white outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                  <select name="category" value={editModal.category} onChange={handleChange} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-900 dark:border-gray-700 dark:text-white outline-none">
                    <option value="Tech">Tech</option>
                    <option value="Health">Health</option>
                    <option value="Education">Education</option>
                    <option value="AI">AI</option>
                    <option value="Finance">Finance</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="pt-4 flex justify-end gap-3">
                  <button type="button" onClick={() => setEditModal(null)} className="px-6 py-2 text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200">Cancel</button>
                  <button type="submit" className="px-6 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">Save Changes</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
