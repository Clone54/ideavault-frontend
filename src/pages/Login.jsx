import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authClient } from '../lib/auth-client';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const result = await authClient.signIn.email({
        email,
        password
      });

      if (result?.error) {
        toast.error(result.error.message || 'Login failed');
        return;
      }

      toast.success('Logged in successfully');

      navigate(from, { replace: true });

    } catch (error) {
      console.error(error);

      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);

      await authClient.signIn.social({
        provider: 'google',
        callbackURL: from
      });

    } catch (error) {
      console.error(error);

      toast.error('Google login failed');

      setGoogleLoading(false);
    }
  };

  const handleForgetPassword = () => {
    toast('Forget password feature coming soon', {
      icon: '📧'
    });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 shadow-sm">

        <div className="mb-8">
          <h1 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
            Sign in to your account
          </h1>
        </div>

        <form
          onSubmit={handleEmailLogin}
          className="space-y-6"
        >

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email address
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white p-3 outline-none focus:border-indigo-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white p-3 outline-none focus:border-indigo-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleForgetPassword}
              className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
            >
              Forgot your password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-indigo-600 px-4 py-3 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-70"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>

          <span className="mx-4 text-sm text-gray-500">
            Or continue with
          </span>

          <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          className="flex w-full items-center justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-70"
        >
          <svg
            className="mr-2 h-5 w-5"
            viewBox="0 0 24 24"
          >
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 
              1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 
              3.28-4.74 3.28-8.09z"
            />

            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 
              7.28-2.66l-3.57-2.77c-.98.66-2.23 
              1.06-3.71 1.06-2.86 
              0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 
              20.53 7.7 23 12 23z"
            />

            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 
              8.55 1 10.22 1 12s.43 3.45 
              1.18 4.93l2.85-2.22.81-.62z"
            />

            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 
              4.21 1.64l3.15-3.15C17.45 
              2.09 14.97 1 12 1 7.7 1 
              3.99 3.47 2.18 7.07l3.66 
              2.84c.87-2.6 3.3-4.53 
              6.16-4.53z"
            />
          </svg>

          {googleLoading
            ? 'Redirecting...'
            : 'Continue with Google'}
        </button>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Not a member?{' '}

          <Link
            to="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
          >
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
}