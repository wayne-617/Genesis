'use client';

import React, { useState } from 'react';
import RetrieveFile from '../../../components/RetrieveFile';

const LoginPage: React.FC = () => {
  const [cid, setCid] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="bg-white text-gray-800 rounded-lg shadow-lg p-8 w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path
                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow p-2 text-gray-400"
              placeholder="Enter CID"
              value={cid}
              onChange={(e) => setCid(e.target.value)}
            />
          </label>
          <button type="submit" className="btn btn-primary w-full">Login</button>
        </form>
        <h3 className="text-center mt-4">Don't have an account? <a href="/pages/signup" className="text-primary">Sign Up</a></h3>
      </div>
      {submitted && <RetrieveFile cid={cid} />}
    </div>
  );
};

export default LoginPage;