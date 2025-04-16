import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Award, Heart } from 'lucide-react';

function About() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1000",
      description: "Passionate about bringing people together through events."
    },
    {
      name: "Michael Chen",
      role: "Technical Lead",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000",
      description: "Building the future of event management technology."
    },
    {
      name: "Emily Rodriguez",
      role: "Community Manager",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1000",
      description: "Creating meaningful connections in our college community."
    }
  ];

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80"
            alt="About Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            {...fadeIn}
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text"
          >
            About EventHub
          </motion.h1>
          <motion.p
            {...fadeIn}
            className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto"
          >
            We're revolutionizing how college events are organized, managed, and experienced.
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-300 mb-6">
                At EventHub, we believe that college life should be filled with memorable experiences and meaningful connections. Our platform makes it easy for students and clubs to discover, create, and participate in events that matter to them.
              </p>
              <p className="text-gray-300">
                We're committed to fostering a vibrant campus community where every student can find their place and every club can reach its audience.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="p-6 rounded-xl bg-purple-500/10 backdrop-blur-lg text-center">
                <Users className="h-8 w-8 mx-auto mb-4 text-purple-400" />
                <h3 className="text-xl font-semibold mb-2">5000+</h3>
                <p className="text-gray-400">Active Users</p>
              </div>
              <div className="p-6 rounded-xl bg-purple-500/10 backdrop-blur-lg text-center">
                <Calendar className="h-8 w-8 mx-auto mb-4 text-purple-400" />
                <h3 className="text-xl font-semibold mb-2">100+</h3>
                <p className="text-gray-400">Events Monthly</p>
              </div>
              <div className="p-6 rounded-xl bg-purple-500/10 backdrop-blur-lg text-center">
                <Award className="h-8 w-8 mx-auto mb-4 text-purple-400" />
                <h3 className="text-xl font-semibold mb-2">50+</h3>
                <p className="text-gray-400">College Clubs</p>
              </div>
              <div className="p-6 rounded-xl bg-purple-500/10 backdrop-blur-lg text-center">
                <Heart className="h-8 w-8 mx-auto mb-4 text-purple-400" />
                <h3 className="text-xl font-semibold mb-2">95%</h3>
                <p className="text-gray-400">Satisfaction</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-b from-black/40 to-black/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We're a dedicated team of professionals passionate about creating the best event management platform for college communities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-black/20 backdrop-blur-lg rounded-xl overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-purple-400 mb-4">{member.role}</p>
                  <p className="text-gray-300">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;