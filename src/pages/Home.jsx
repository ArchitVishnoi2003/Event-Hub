import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Trophy, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function Home() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const events = [
    {
      title: "Tech Fest 2024",
      date: "March 25-26, 2024",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000",
      category: "Technology"
    },
    {
      title: "Cultural Night",
      date: "April 1, 2024",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1000",
      category: "Cultural"
    },
    {
      title: "Sports Meet",
      date: "April 15, 2024",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=1000",
      category: "Sports"
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            {...fadeIn}
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text"
          >
            Discover Amazing College Events
          </motion.h1>
          <motion.p
            {...fadeIn}
            className="text-xl md:text-2xl mb-8 text-gray-300"
          >
            Join, organize, and experience the best events on campus
          </motion.p>
          <motion.div
            {...fadeIn}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/events"
              className="px-8 py-3 bg-purple-500 rounded-full hover:bg-purple-600 transition-colors flex items-center space-x-2"
            >
              <span>Explore Events</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/create-event"
              className="px-8 py-3 bg-transparent border-2 border-purple-500 rounded-full hover:bg-purple-500/20 transition-colors"
            >
              Host an Event
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Events */}
      <section className="py-20 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            {...fadeIn}
            className="text-3xl font-bold mb-12 text-center"
          >
            Featured Events
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-800/50 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="text-sm text-purple-400">{event.category}</span>
                  <h3 className="text-xl font-semibold mt-2">{event.title}</h3>
                  <p className="text-gray-400 mt-2">{event.date}</p>
                  <button className="mt-4 text-purple-400 hover:text-purple-300 flex items-center space-x-1">
                    <span>Learn more</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-black/40 to-black/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              {...fadeIn}
              className="p-6 rounded-xl bg-purple-500/10 backdrop-blur-lg"
            >
              <Calendar className="h-12 w-12 mx-auto mb-4 text-purple-400" />
              <h3 className="text-3xl font-bold">100+</h3>
              <p className="text-gray-400">Events Hosted</p>
            </motion.div>
            <motion.div
              {...fadeIn}
              className="p-6 rounded-xl bg-purple-500/10 backdrop-blur-lg"
            >
              <Users className="h-12 w-12 mx-auto mb-4 text-purple-400" />
              <h3 className="text-3xl font-bold">5000+</h3>
              <p className="text-gray-400">Active Users</p>
            </motion.div>
            <motion.div
              {...fadeIn}
              className="p-6 rounded-xl bg-purple-500/10 backdrop-blur-lg"
            >
              <Trophy className="h-12 w-12 mx-auto mb-4 text-purple-400" />
              <h3 className="text-3xl font-bold">50+</h3>
              <p className="text-gray-400">College Clubs</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;