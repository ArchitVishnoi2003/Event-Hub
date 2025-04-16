import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, MapPin, Tag, DollarSign, Search, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';

function Clubs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClub, setSelectedClub] = useState(null);
  const { events } = useEvents();

  const clubs = [
    {
      id: 1,
      name: 'Tech Club',
      description: 'A club for technology enthusiasts and developers'
    },
    {
      id: 2,
      name: 'Cultural Club',
      description: 'Celebrating art, music, and cultural diversity'
    },
    {
      id: 3,
      name: 'Sports Club',
      description: 'Promoting sports and physical activities'
    }
  ];

  const filteredClubs = clubs.filter(club =>
    club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    club.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getClubEvents = (clubName) => {
    return events.filter(event => event.club === clubName);
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Clubs</h1>
            <Link
              to="/create-event"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Host Event</span>
            </Link>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search clubs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:outline-none focus:border-purple-500 text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClubs.map(club => (
            <motion.div
              key={club.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/40 backdrop-blur-xl rounded-xl p-6 shadow-xl cursor-pointer hover:bg-purple-500/10 transition-colors"
              onClick={() => setSelectedClub(club)}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-purple-500 flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{club.name}</h2>
                  <p className="text-gray-300">{getClubEvents(club.name).length} Events</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">{club.description}</p>
            </motion.div>
          ))}
        </div>

        {selectedClub && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-black/40 backdrop-blur-xl rounded-xl p-6 shadow-xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">{selectedClub.name} Events</h2>
              <button
                onClick={() => setSelectedClub(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getClubEvents(selectedClub.name).map(event => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-purple-500/10 rounded-xl p-6"
                >
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-gray-300 mb-4">{event.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Calendar className="h-4 w-4 text-purple-400" />
                      <span>{event.date} at {event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <MapPin className="h-4 w-4 text-purple-400" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Tag className="h-4 w-4 text-purple-400" />
                      <span>{event.category}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <DollarSign className="h-4 w-4 text-purple-400" />
                      <span>₹{event.price}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Clubs;