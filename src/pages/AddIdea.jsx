import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import toast from 'react-hot-toast';

export default function AddIdea() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    detailedDescription: '',
    category: 'Tech',
    tags: '',
    imageUrl: '',
    estimatedBudget: '',
    targetAudience: '',
    problemStatement: '',
    proposedSolution: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      };
      await api.post('/ideas', payload);
      toast.success('Idea added successfully!');
      navigate('/my-ideas');
    } catch (error) {
      toast.error('Failed to add idea');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Submit a Startup Idea</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Idea Title *</label>
            <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 outline-none border" placeholder="e.g. NextGen AI Note Taker" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Short Description *</label>
            <textarea required name="shortDescription" value={formData.shortDescription} onChange={handleChange} rows={2} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 outline-none border" placeholder="A one-sentence pitch..."></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category *</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 outline-none border">
              <option value="Tech">Tech</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="AI">AI</option>
              <option value="Finance">Finance</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags</label>
            <input type="text" name="tags" value={formData.tags} onChange={handleChange} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 outline-none border" placeholder="SaaS, Mobile, B2B (comma separated)" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
            <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 outline-none border" placeholder="https://example.com/image.jpg" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Problem Statement *</label>
            <textarea required name="problemStatement" value={formData.problemStatement} onChange={handleChange} rows={3} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 outline-none border" placeholder="What pain point are you solving?"></textarea>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Proposed Solution *</label>
            <textarea required name="proposedSolution" value={formData.proposedSolution} onChange={handleChange} rows={3} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 outline-none border" placeholder="How does your idea solve the problem?"></textarea>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Detailed Description *</label>
            <textarea required name="detailedDescription" value={formData.detailedDescription} onChange={handleChange} rows={5} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 outline-none border" placeholder="Explain your vision in detail..."></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Estimated Budget</label>
            <input type="text" name="estimatedBudget" value={formData.estimatedBudget} onChange={handleChange} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 outline-none border" placeholder="e.g. $10,000" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Audience *</label>
            <input required type="text" name="targetAudience" value={formData.targetAudience} onChange={handleChange} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 outline-none border" placeholder="e.g. Students, Small Businesses" />
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-indigo-600 text-white rounded-md font-medium text-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Idea'}
          </button>
        </div>
      </form>
    </div>
  );
}
