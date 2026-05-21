import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Target, Lightbulb, User, MessageCircle, Calendar, Tag, Trash2, Edit2 } from 'lucide-react';

export default function IdeaDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');

  const fetchIdea = async () => {
    try {
      const res = await api.get(`/ideas/${id}`);
      setIdea(res.data);
    } catch (error) {
      toast.error('Idea not found');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdea();
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      const payload = {
        text: commentText,
        userName: user?.displayName || 'Anonymous',
        userPhoto: user?.photoURL || ''
      };
      await api.post(`/ideas/${id}/comments`, payload);
      setCommentText('');
      fetchIdea();
      toast.success('Comment added');
    } catch (error) {
      toast.error('Failed to add comment');
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Delete this comment?')) return;
    try {
      await api.delete(`/ideas/${id}/comments/${commentId}`);
      fetchIdea();
      toast.success('Comment deleted');
    } catch (error) {
      toast.error('Failed to delete comment');
    }
  };

  const handleEditSubmit = async (commentId) => {
    try {
      await api.put(`/ideas/${id}/comments/${commentId}`, { text: editCommentText });
      setEditingComment(null);
      fetchIdea();
      toast.success('Comment updated');
    } catch (error) {
      toast.error('Failed to update comment');
    }
  };

  if (loading) return <div className="flex justify-center py-32"><div className="w-12 h-12 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div></div>;
  if (!idea) return <div className="text-center py-32 text-xl font-bold dark:text-white">Idea not found</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-700 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 dark:bg-indigo-900/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-bold tracking-wide uppercase">
              {idea.category}
            </span>
            <span className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
              <Calendar className="w-4 h-4 mr-1" /> {new Date(idea.createdAt).toLocaleDateString()}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">{idea.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 md:w-3/4 leading-relaxed mb-8">{idea.shortDescription}</p>
          
          <div className="flex items-center gap-4 pt-6 border-t border-gray-100 dark:border-gray-700">
            {idea.creatorPhoto ? (
              <img src={idea.creatorPhoto} alt="" className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-800 shadow-sm" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <User className="w-6 h-6 text-gray-500" />
              </div>
            )}
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Created by</p>
              <p className="font-semibold text-gray-900 dark:text-white">{idea.creatorName}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 space-y-8">
          {}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Lightbulb className="text-yellow-500" /> The Vision
            </h2>
            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
              <p className="whitespace-pre-wrap">{idea.detailedDescription}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-red-50 dark:bg-red-900/10 rounded-3xl p-8 border border-red-100 dark:border-red-900/30">
              <h3 className="text-xl font-bold text-red-800 dark:text-red-400 mb-4 flex items-center gap-2">
                Problem Statement
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{idea.problemStatement}</p>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/10 rounded-3xl p-8 border border-green-100 dark:border-green-900/30">
              <h3 className="text-xl font-bold text-green-800 dark:text-green-400 mb-4 flex items-center gap-2">
                Proposed Solution
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{idea.proposedSolution}</p>
            </div>
          </div>
        </div>

        {}
        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
             <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">At a Glance</h3>
             
             <div className="space-y-6">
               <div>
                 <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-2"><Target className="w-4 h-4" /> Target Audience</p>
                 <p className="font-medium text-gray-900 dark:text-white">{idea.targetAudience}</p>
               </div>
               
               {idea.estimatedBudget && (
                 <div>
                   <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Estimated Budget</p>
                   <p className="font-medium text-gray-900 dark:text-white">{idea.estimatedBudget}</p>
                 </div>
               )}
               
               {idea.tags && idea.tags.length > 0 && (
                 <div>
                   <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-2"><Tag className="w-4 h-4" /> Tags</p>
                   <div className="flex flex-wrap gap-2">
                     {idea.tags.map((tag, i) => (
                       <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-sm text-gray-700 dark:text-gray-300">
                         {tag}
                       </span>
                     ))}
                   </div>
                 </div>
               )}
             </div>
          </div>
        </div>
      </div>

      {}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
          <MessageCircle className="text-indigo-500" /> Discussion ({idea.comments?.length || 0})
        </h3>
        
        {user ? (
          <form onSubmit={handleAddComment} className="mb-10 flex gap-4">
            <div className="flex-shrink-0">
              {user.photoURL ? (
                <img src={user.photoURL} alt="" className="w-10 h-10 rounded-full bg-gray-200" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"><User className="w-5 h-5 text-gray-500" /></div>
              )}
            </div>
            <div className="flex-grow flex flex-col items-end gap-2">
              <textarea 
                value={commentText} 
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-gray-900 dark:text-white outline-none focus:border-indigo-500 transition-colors"
                placeholder="Share your thoughts, feedback, or validation..." 
                rows={3}
                required
              />
              <button disabled={!commentText.trim()} type="submit" className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors">
                Post Comment
              </button>
            </div>
          </form>
        ) : (
          <div className="mb-10 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-center">
            <p className="text-indigo-800 dark:text-indigo-200 mb-3">Join the conversation</p>
            <Link to="/login" className="inline-block px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700">Login to Comment</Link>
          </div>
        )}

        <div className="space-y-6">
          {idea.comments && idea.comments.length > 0 ? (
            idea.comments.map((comment) => (
              <div key={comment._id} className="flex gap-4">
                <div className="flex-shrink-0">
                  {comment.userPhoto ? (
                    <img src={comment.userPhoto} alt="" className="w-10 h-10 rounded-full bg-gray-200" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"><User className="w-5 h-5 text-gray-500" /></div>
                  )}
                </div>
                <div className="flex-grow bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700/50 rounded-2xl p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-bold text-gray-900 dark:text-white mr-2">{comment.userName}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(comment.createdAt).toLocaleDateString()}</span>
                    </div>
                    {user && user.email === comment.userId && (
                      <div className="flex items-center gap-2">
                        <button onClick={() => { setEditingComment(comment._id); setEditCommentText(comment.text); }} className="text-gray-400 hover:text-indigo-600 transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteComment(comment._id)} className="text-gray-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {editingComment === comment._id ? (
                    <div className="mt-3 flex flex-col items-end gap-2">
                      <textarea 
                        value={editCommentText}
                        onChange={e => setEditCommentText(e.target.value)}
                        className="w-full bg-white dark:bg-gray-800 border border-indigo-300 dark:border-indigo-700 rounded-lg p-3 text-gray-900 dark:text-white outline-none"
                        rows={2}
                      />
                      <div className="flex gap-2">
                         <button onClick={() => setEditingComment(null)} className="px-3 py-1.5 text-sm text-gray-600 bg-gray-200 rounded-md">Cancel</button>
                         <button onClick={() => handleEditSubmit(comment._id)} className="px-3 py-1.5 text-sm text-white bg-indigo-600 rounded-md">Save</button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">{comment.text}</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">No comments yet. Be the first to share your feedback!</p>
          )}
        </div>
      </div>
    </div>
  );
}
