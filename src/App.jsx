import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Events from './pages/Events';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import CreateEvent from './pages/CreateEvent';
import Dashboard from './pages/Dashboard';
import Clubs from './pages/Clubs';
import { EventProvider } from './context/EventContext';
import { AuthProvider } from './context/AuthContext';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <AuthProvider>
      <EventProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/clubs" element={<Clubs />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/create-event" element={<CreateEvent />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="*" element={<div className="flex flex-col items-center justify-center min-h-screen"><h1 className="text-4xl font-bold mb-4">404</h1><p className="text-lg text-gray-400">Page Not Found</p></div>} />
            </Routes>
            <Footer />
            <Toaster position="bottom-right" />
          </div>
        </Router>
      </EventProvider>
    </AuthProvider>
  );
}

export default App;


