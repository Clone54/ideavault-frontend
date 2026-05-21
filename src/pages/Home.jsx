import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target, Users, TrendingUp, Lightbulb } from 'lucide-react';
import api from '../lib/api';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/ideas/trending')
      .then((res) => {
        setTrending(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.log('Error fetching trending', err);
        setTrending([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const bannerSlides = [
    {
      title: "Share Your Vision with the World",
      description: "IdeaVault is the premier community for validating and growing your next big startup idea.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80"
    },
    {
      title: "Discover the Next Big Thing",
      description: "Explore hundreds of innovative concepts across Tech, AI, Health, and Education.",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2832&q=80"
    },
    {
      title: "Build Together",
      description: "Engage with creators, provide feedback, and join forces to turn ideas into reality.",
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=2970&q=80"
    }
  ];

  return (
    <div>
      {}
      <section className="relative h-[600px] w-full">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="h-full w-full"
        >
          {bannerSlides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative w-full h-full">
                <img src={slide.image} alt={slide.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gray-900/60 dark:bg-gray-900/80 mix-blend-multiply" />
                <div className="absolute inset-0 flex items-center justify-center text-center">
                  <div className="max-w-3xl px-4">
                    <motion.h1 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="text-4xl md:text-6xl font-extrabold text-white mb-6"
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-xl md:text-2xl text-gray-200 mb-10"
                    >
                      {slide.description}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      <Link to="/ideas" className="inline-flex items-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full text-lg transition-transform hover:scale-105 shadow-lg relative z-20">
                        Explore Ideas
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
              <TrendingUp className="text-indigo-600 w-8 h-8" />
              Trending Ideas
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              Discover the most popular concepts validated by our community.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12"><div className="w-10 h-10 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trending.map((idea, idx) => (
                <motion.div 
                  key={idea._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all group"
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
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 line-clamp-3">
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
      </section>

      {}
      <section className="py-24 relative overflow-hidden bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">How IdeaVault Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center mb-6">
                <Lightbulb className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">1. Post Your Idea</h3>
              <p className="text-gray-600 dark:text-gray-400">Share your vision, problem statement, and proposed solution with our global community.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mb-6">
                <Users className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2. Gather Feedback</h3>
              <p className="text-gray-600 dark:text-gray-400">Receive constructive comments, validation, and insights from experienced creators.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mb-6">
                <Zap className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">3. Iterate & Build</h3>
              <p className="text-gray-600 dark:text-gray-400">Refine your concept based on feedback and take the leap to build your startup.</p>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="py-24 bg-indigo-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Target className="w-16 h-16 text-white/80 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Validate Your Idea?</h2>
          <p className="text-indigo-100 text-xl mb-10 max-w-2xl mx-auto">Join thousands of creators who are shaping the future. It’s free to start sharing.</p>
          <Link to="/add-idea" className="inline-flex items-center px-8 py-4 bg-white text-indigo-900 font-bold rounded-full text-lg hover:bg-gray-100 transition-colors shadow-xl">
             Submit an Idea Now
          </Link>
        </div>
      </section>
    </div>
  );
}
