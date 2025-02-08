'use client';  // Ensure this is at the top of the file

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';  // Correct imports

export default function App() {
  return (
    <Router>
      <div className="flex justify-center">
        <nav>
          <Link to="/"> Home</Link>  {/* Link component */}
          <Link to="/page1"> Page 1</Link>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/page1" element={<Page1 />} />
      </Routes>
    </Router>
  );
}

function Page1() {
  return <div>Page 1 Content</div>;
}

function Home() {
  return (
    <div className="flex justify-center ...">
      <button className="btn btn-outline btn-primary">Hi There</button>
    </div>
  );
}
