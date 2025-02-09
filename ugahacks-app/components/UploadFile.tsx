'use client';

import React, { useState } from 'react';

interface UploadFileProps {
  email: string;
  username: string;
  password: string;
  wallets: string[];
}

export const uploadToPinata = async (email: string, username: string, password: string) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  const jsonData = {
    email: email,
    username: username,
    password: password,
    wallets: [],
  };
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(jsonData),
      headers: {
        'Content-Type': 'application/json',
        'pinata_api_key': 'd33f889edd11cecaf464', // Replace with your actual Pinata API key
        'pinata_secret_api_key': 'bcaae33a3d391957dab95c8c54ca366b0357cacaf2a669663b8fdefc8a32b84a' // Replace with your actual Pinata Secret API key
      }
    });

    if (!response.ok) {
      throw new Error(`Error uploading to Pinata: ${response.statusText}`);
    }

    const result = await response.json();

    console.log(result.IpfsHash);
    return result;
  } catch (error) {
    console.error('Error uploading to Pinata:', error);
    throw error;
  }
};

const UploadFile: React.FC<UploadFileProps> = ({ email, username, password }) => {
  const [uploading, setUploading] = useState(false);
  const [cid, setCid] = useState<string | null>(null);
  
  const handleUpload = async () => {
    try {
      setUploading(true);
      const result = await uploadToPinata(email, username, password);
      setCid(result.IpfsHash);
      setUploading(false);
    } catch (error) {
      console.error('Upload failed:', error);
      setUploading(false);
    }
    
  };
  console.log(cid);
  return (
    <div className="flex flex-col items-center">
      <button onClick={handleUpload} className="btn btn-primary">
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {cid && <p>Information uploaded with CID: {cid}</p>}
    </div>
  );
};

export default UploadFile;