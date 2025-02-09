'use client';

import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="flex justify-between items-center h-screen p-10">
      <div className="flex flex-col items-start space-y-4 ml-32">
      <h1 className="text-8xl font-bold">Genesis</h1>
      <h2 className="text-2xl font-semibold">A place to build on</h2>
      </div>
      <div className="flex flex-col items-center space-y-4 bg-neutral p-16 rounded-lg mr-48 w-1/2">
        <h2 className="text-4xl font-semibold text-white">Our Mission</h2>
        <p className="text-lg text-white">Genesis is a pioneering crowdfunding platform designed to empower creators and provide transparency for contributors. Built as a Kickstarter-like application, Genesis enables users to launch projects and receive funding in cryptocurrency. Unlike traditional crowdfunding, our platform ensures financial accountability by locking a majority of the funds until the full funding goal is met. Developers receive a small portion upfront, while the rest remains secured. Contributors also have the power to safeguard their investments—if a project fails to meet expectations, patrons can vote for cancellation, triggering a refund of the remaining funds. With Genesis, innovation and trust go hand in hand.</p>
      </div>
    </div>
  );
};

export default AboutPage;
