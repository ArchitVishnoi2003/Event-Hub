import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { useAuth } from '../context/AuthContext';
import { Calendar, Clock, MapPin, Users, Tag, Image, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const CreateEvent = () => {
  const navigate = useNavigate();
  const { createEvent } = useEvents();
  const { isAdmin } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    club: '',
    maxParticipants: '',
    imageUrl: ''
  });

  // List of available clubs
  const clubs = [
    'Sports Club',
    'Music Club',
    'Dance Club',
    'Art Club',
    'Science Club',
    'Debate Club',
    'Photography Club',
    'Theater Club'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin()) {
      toast.error('Only admins can create events');
      return;
    }
    try {
      await createEvent(formData);
      toast.success('Event created successfully!');
      navigate('/events');
    } catch (error) {
      toast.error('Failed to create event');
      console.error('Error creating event:', error);
    }
  };

  if (!isAdmin()) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 shadow-xl text-center"
          >
            <h2 className="text-2xl font-bold text-red-500 mb-4">Access Denied</h2>
            <p className="text-gray-300">Only administrators can create events.</p>
            <button
              onClick={() => navigate(-1)}
              className="mt-6 px-6 py-3 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-medium transition-colors"
            >
              Go Back
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 shadow-xl"
        >
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </button>
            <h1 className="text-3xl font-bold">Create New Event</h1>
            <div className="w-24" /> {/* Spacer for alignment */}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Event Title
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:outline-none focus:border-purple-500 text-white"
                    placeholder="Enter event title"
                  />
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Club
                </label>
                <div className="relative">
                  <select
                    name="club"
                    value={formData.club}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:outline-none focus:border-purple-500 text-white appearance-none"
                  >
                    <option value="">Select a club</option>
                    {clubs.map((club) => (
                      <option key={club} value={club}>
                        {club}
                      </option>
                    ))}
                  </select>
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:outline-none focus:border-purple-500 text-white"
                  />
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Time
                </label>
                <div className="relative">
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:outline-none focus:border-purple-500 text-white"
                  />
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:outline-none focus:border-purple-500 text-white"
                    placeholder="Enter event location"
                  />
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Max Participants
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="maxParticipants"
                    value={formData.maxParticipants}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:outline-none focus:border-purple-500 text-white"
                    placeholder="Enter max participants"
                  />
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Event Image URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:outline-none focus:border-purple-500 text-white"
                  placeholder="Enter image URL"
                />
                <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:outline-none focus:border-purple-500 text-white"
                placeholder="Enter event description"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-medium transition-colors"
              >
                Create Event
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateEvent; 