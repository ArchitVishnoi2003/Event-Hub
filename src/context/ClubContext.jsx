import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { db, functions } from '../firebase/config';
import toast from 'react-hot-toast';

const ClubContext = createContext();

export const useClubs = () => useContext(ClubContext);

export const ClubProvider = ({ children }) => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClubs = async () => {
    try {
      const clubsQuery = query(collection(db, 'clubs'), orderBy('name'));
      const querySnapshot = await getDocs(clubsQuery);
      const clubsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setClubs(clubsData);
    } catch (error) {
      console.error('Error fetching clubs:', error);
      toast.error('Failed to fetch clubs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  const createClub = async (clubData) => {
    try {
      // Validate input
      if (!clubData.name || !clubData.description) {
        toast.error('Club name and description are required');
        return;
      }

      // Check if club with same name exists
      const existingClub = clubs.find(club => 
        club.name.toLowerCase() === clubData.name.toLowerCase()
      );
      
      if (existingClub) {
        toast.error('A club with this name already exists');
        return;
      }

      // Create the club
      const docRef = await addDoc(collection(db, 'clubs'), {
        name: clubData.name.trim(),
        description: clubData.description.trim(),
        createdAt: serverTimestamp()
      });

      // Refresh the clubs list
      await fetchClubs();
      
      toast.success('Club created successfully!');
      return docRef.id;
    } catch (error) {
      console.error('Error creating club:', error);
      toast.error('Failed to create club');
      throw error;
    }
  };

  const value = {
    clubs,
    loading,
    createClub
  };

  return (
    <ClubContext.Provider value={value}>
      {children}
    </ClubContext.Provider>
  );
}; 