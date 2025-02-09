'use client';

import React from 'react';

const IndexPage: React.FC = () => {
  return (
    <div className="hero bg-white min-h-screen">
      <div className="hero-content text-center bg-neutral rounded-lg p-12">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-white">Hello there</h1>
          <p className="py-6 text-white">
            Welcome to Genesis! Your way of funding projects that you care about.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
