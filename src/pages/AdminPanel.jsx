import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../context/EventContext';
import { Calendar, Users, Trash, Edit, Shield, ArrowLeft, Mail, Clock, User as UserIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';

const AdminPanel = () => {
  const { user, isAdmin, setUserAsAdmin } = useAuth();
  const { events, deleteEvent } = useEvents();
  const [selectedTab, setSelectedTab] = useState('events');
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin()) {
      toast.error('You need to be an admin to access this page');
      return;
    }
  }, [isAdmin]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (selectedTab === 'users') {
        try {
          setLoading(true);
          const usersQuery = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
          const querySnapshot = await getDocs(usersQuery);
          const usersData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          console.log('Fetched users:', usersData); // Debug log
          setUsers(usersData);
        } catch (error) {
          console.error('Error fetching users:', error);
          toast.error('Failed to fetch users. Please try again later.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUsers();
  }, [selectedTab]);

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteEvent(eventId);
      toast.success('Event deleted successfully');
    } catch (error) {
      toast.error('Failed to delete event');
      console.error('Error deleting event:', error);
    }
  };

  const handleMakeAdmin = async (userId) => {
    try {
      await setUserAsAdmin(userId);
      toast.success('User promoted to admin');
      // Refresh users list
      const usersQuery = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(usersQuery);
      const usersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersData);
    } catch (error) {
      console.error('Error promoting user:', error);
      toast.error('Failed to promote user. Please try again later.');
    }
  };

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isAdmin()) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">You need to be an admin to access this page</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 shadow-xl"
        >
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </button>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <div className="w-24" /> {/* Spacer for alignment */}
          </div>

          <div className="mb-8">
            <div className="border-b border-gray-700">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setSelectedTab('events')}
                  className={`${
                    selectedTab === 'events'
                      ? 'border-purple-500 text-purple-500'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Events</span>
                  </div>
                </button>
                <button
                  onClick={() => setSelectedTab('users')}
                  className={`${
                    selectedTab === 'users'
                      ? 'border-purple-500 text-purple-500'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Users</span>
                  </div>
                </button>
              </nav>
            </div>
          </div>

          {selectedTab === 'events' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Manage Events</h2>
                <a
                  href="/create-event"
                  className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-medium transition-colors"
                >
                  Create Event
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-800/50 rounded-lg p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-medium">{event.title}</h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="p-2 text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash className="h-5 w-5" />
                        </button>
                        <a
                          href={`/edit-event/${event.id}`}
                          className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <Edit className="h-5 w-5" />
                        </a>
                      </div>
                    </div>
                    <p className="text-gray-400 mb-4">{event.description}</p>
                    <div className="space-y-2 text-sm text-gray-400">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>{event.maxParticipants} max participants</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'users' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Manage Users</h2>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:outline-none focus:border-purple-500 text-white"
                  />
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Created
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-white">{user.name || 'No name'}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-400">{user.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  user.role === 'admin'
                                    ? 'bg-purple-500 text-white'
                                    : 'bg-gray-700 text-gray-300'
                                }`}
                              >
                                {user.role || 'user'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-400">
                                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                              {user.role !== 'admin' && (
                                <button
                                  onClick={() => handleMakeAdmin(user.id)}
                                  className="flex items-center space-x-1 text-purple-400 hover:text-purple-300 transition-colors"
                                >
                                  <Shield className="h-4 w-4" />
                                  <span>Make Admin</span>
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="px-6 py-4 text-center text-gray-400">
                            No users found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPanel; 