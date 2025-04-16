import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const EventContext = createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const eventsCollection = collection(db, 'events');
      const eventsSnapshot = await getDocs(eventsCollection);
      const eventsList = eventsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEvents(eventsList);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to fetch events');
      setLoading(false);
    }
  };

  const createEvent = async (eventData) => {
    try {
      const eventsCollection = collection(db, 'events');
      const newEvent = {
        ...eventData,
        createdAt: new Date().toISOString(),
        registeredUsers: []
      };

      const docRef = await addDoc(eventsCollection, newEvent);
      const createdEvent = { id: docRef.id, ...newEvent };
      setEvents(prevEvents => [...prevEvents, createdEvent]);
      toast.success('Event created successfully!');
      return createdEvent;
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Failed to create event');
      throw error;
    }
  };

  const registerForEvent = async (eventId) => {
    try {
      if (!user) {
        throw new Error('You must be logged in to register for an event');
      }

      const eventRef = doc(db, 'events', eventId);
      const event = events.find(e => e.id === eventId);

      if (!event) {
        throw new Error('Event not found');
      }

      if (event.registeredUsers.includes(user.uid)) {
        throw new Error('You are already registered for this event');
      }

      const updatedEvent = {
        ...event,
        registeredUsers: [...event.registeredUsers, user.uid]
      };

      await updateDoc(eventRef, {
        registeredUsers: updatedEvent.registeredUsers
      });

      setEvents(prevEvents =>
        prevEvents.map(e => (e.id === eventId ? updatedEvent : e))
      );

      toast.success('Successfully registered for the event!');
    } catch (error) {
      console.error('Error registering for event:', error);
      toast.error(error.message);
      throw error;
    }
  };

  const unregisterFromEvent = async (eventId) => {
    try {
      if (!user) {
        throw new Error('You must be logged in to unregister from an event');
      }

      const eventRef = doc(db, 'events', eventId);
      const event = events.find(e => e.id === eventId);

      if (!event) {
        throw new Error('Event not found');
      }

      if (!event.registeredUsers.includes(user.uid)) {
        throw new Error('You are not registered for this event');
      }

      const updatedEvent = {
        ...event,
        registeredUsers: event.registeredUsers.filter(id => id !== user.uid)
      };

      await updateDoc(eventRef, {
        registeredUsers: updatedEvent.registeredUsers
      });

      setEvents(prevEvents =>
        prevEvents.map(e => (e.id === eventId ? updatedEvent : e))
      );

      toast.success('Successfully unregistered from the event!');
    } catch (error) {
      console.error('Error unregistering from event:', error);
      toast.error(error.message);
      throw error;
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      const event = events.find(e => e.id === eventId);
      if (!event) {
        throw new Error('Event not found');
      }

      await deleteDoc(doc(db, 'events', eventId));
      setEvents(prevEvents => prevEvents.filter(e => e.id !== eventId));
      toast.success('Event deleted successfully!');
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error(error.message);
      throw error;
    }
  };

  const value = {
    events,
    loading,
    createEvent,
    registerForEvent,
    unregisterFromEvent,
    deleteEvent,
    fetchEvents
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
} 