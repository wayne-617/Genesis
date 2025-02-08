'use client';  // Ensure this is at the top of the file

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';  // Correct imports
//import uploadPinata from './pinataUpload.js';


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
  const handleUpload = async () => {
    try{
      //const filePath = '../testData/pinata.png';
      //const result = await uploadPinata();
      //console.log("Uploading results ", result);
    }catch(e){
      console.log("Error uploading file ", e);
    }
  }

  return (
  <div>
    <p>Page 1 Content</p>
    <button className="btn" onClick={handleUpload}>Upload</button>
  </div>
  );

}

function Home() {
  return (
    <div className="flex justify-center ...">
      <button className="btn">Hi</button>
    </div>
  );
}
