import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import api from '../lib/api';

export default function Layout() {
  const [dbWarning, setDbWarning] = useState(false);

  useEffect(() => {
    api.get('/config').then(res => {
      if (res.data && res.data.hasExternalDb === false) {
        setDbWarning(true);
      }
    }).catch(err => console.error("Config check failed", err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      {dbWarning && (
        <div className="bg-red-600 text-white p-3 text-center text-sm font-medium">
          CRITICAL: You are using the ephemeral local database. Data (including newly added ideas) will be completely wiped whenever the container restarts! Please add a valid <strong>MONGODB_URI</strong> to your Secrets panel and restart the server to persist data.
        </div>
      )}
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
