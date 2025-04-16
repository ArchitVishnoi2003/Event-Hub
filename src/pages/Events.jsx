import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Tag, DollarSign, Users } from 'lucide-react';
import { useEvents } from '../context/EventContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

function Events() {
  const { events, loading, registerForEvent, unregisterFromEvent } = useEvents();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? event.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const handleRegister = async (eventId) => {
    try {
      if (!user) {
        toast.error('Please login to register for events');
        return;
      }
      await registerForEvent(eventId);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUnregister = async (eventId) => {
    try {
      if (!user) {
        toast.error('Please login to unregister from events');
        return;
      }
      await unregisterFromEvent(eventId);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Explore Events</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:outline-none focus:border-purple-500 text-white"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:outline-none focus:border-purple-500 text-white"
            >
              <option value="">All Categories</option>
              <option value="Technology">Technology</option>
              <option value="Cultural">Cultural</option>
              <option value="Sports">Sports</option>
              <option value="Academic">Academic</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/40 backdrop-blur-xl rounded-xl p-6 shadow-xl"
            >
              <h2 className="text-xl font-bold text-white mb-2">{event.title}</h2>
              <p className="text-gray-400 mb-4">{event.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-300">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Tag className="h-4 w-4 mr-2" />
                  <span>{event.category}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <DollarSign className="h-4 w-4 mr-2" />
                  <span>₹{event.price}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{event.registeredUsers?.length || 0} registered</span>
                </div>
              </div>

              {user && (
                <button
                  onClick={() => 
                    event.registeredUsers?.includes(user.uid)
                      ? handleUnregister(event.id)
                      : handleRegister(event.id)
                  }
                  className={`w-full py-2 px-4 rounded-lg ${
                    event.registeredUsers?.includes(user.uid)
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-purple-500 hover:bg-purple-600'
                  } text-white font-medium transition-colors`}
                >
                  {event.registeredUsers?.includes(user.uid)
                    ? 'Unregister'
                    : 'Register'}
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No events found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;