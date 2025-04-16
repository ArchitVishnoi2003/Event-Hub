import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Edit, Save, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

function Profile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: ''
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        bio: user.bio || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await updateProfile(user.uid, profileData);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Error updating profile:', error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Please log in to view your profile</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md px-6 py-12 bg-black/40 backdrop-blur-xl rounded-2xl shadow-xl"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Profile</h1>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors"
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4" />
                <span>Save</span>
              </>
            ) : (
              <>
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </>
            )}
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="h-20 w-20 rounded-full bg-purple-500 flex items-center justify-center">
              <User className="h-10 w-10 text-white" />
            </div>
            <div>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:outline-none focus:border-purple-500 text-white"
                  placeholder="Enter your name"
                />
              ) : (
                <h2 className="text-2xl font-semibold">{profileData.name || 'No name provided'}</h2>
              )}
              <div className="flex items-center mt-1">
                <Shield className="h-4 w-4 text-gray-400 mr-1" />
                <span className="text-sm text-gray-400">
                  {user.role === 'admin' ? (
                    <span className="text-purple-400">Admin</span>
                  ) : (
                    <span className="text-blue-400">Student</span>
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <span className="text-gray-300">{user.email}</span>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-400" />
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:outline-none focus:border-purple-500 text-white"
                  placeholder="Enter your phone number"
                />
              ) : (
                <span>{profileData.phone || 'No phone number provided'}</span>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-gray-400" />
              {isEditing ? (
                <input
                  type="text"
                  name="location"
                  value={profileData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:outline-none focus:border-purple-500 text-white"
                  placeholder="Enter your location"
                />
              ) : (
                <span>{profileData.location || 'No location provided'}</span>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Bio</h3>
            {isEditing ? (
              <textarea
                name="bio"
                value={profileData.bio}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:outline-none focus:border-purple-500 text-white"
                rows="3"
                placeholder="Tell us about yourself"
              />
            ) : (
              <p className="text-gray-300">{profileData.bio || 'No bio provided'}</p>
            )}
          </div>

          {user.role === 'admin' && (
            <div className="mt-6 pt-6 border-t border-gray-700">
              <h3 className="text-lg font-medium mb-4">Admin Features</h3>
              <div className="grid grid-cols-1 gap-4">
                <a
                  href="/create-event"
                  className="flex items-center justify-center px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors"
                >
                  Create Event
                </a>
                <a
                  href="/admin"
                  className="flex items-center justify-center px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors"
                >
                  Admin Panel
                </a>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default Profile;

