import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', photo: '', password: '' });
  const { register } = useAuth();
  const navigate = useNavigate();

  const validatePassword = (pass) => {
    if (pass.length < 6) return 'Password must be at least 6 characters.';
    if (!/[A-Z]/.test(pass)) return 'Password must contain an uppercase letter.';
    if (!/[a-z]/.test(pass)) return 'Password must contain a lowercase letter.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validatePassword(formData.password);
    if (error) {
      return toast.error(error);
    }
    try {
      await register(formData.email, formData.password, formData.name, formData.photo);
      toast.success('Registration successful');
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Failed to register');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">Create an account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="mt-1 w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md outline-none focus:border-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label>
              <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="mt-1 w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md outline-none focus:border-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Photo URL</label>
              <input required type="text" value={formData.photo} onChange={e => setFormData({ ...formData, photo: e.target.value })} className="mt-1 w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md outline-none focus:border-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <input required type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} className="mt-1 w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md outline-none focus:border-indigo-500" />
            </div>
          </div>

          <div>
            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 outline-none">
              Register
            </button>
          </div>
        </form>
        
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account? <Link to="/login" className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
