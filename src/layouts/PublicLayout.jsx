import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import IndependenceBanner from '../components/IndependenceBanner';

const PublicLayout = () => {
  return (
    <>
      <IndependenceBanner />
      <Navbar />
      <div className="announcement-bar">
        <marquee behavior="scroll" direction="left">
          📢 Have suggestions, questions, or interview doubts?
          Share your queries — answers will be updated module-wise.
          Contact: vlsiphysicaldesignocean@gmail.com
        </marquee>
      </div>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;
