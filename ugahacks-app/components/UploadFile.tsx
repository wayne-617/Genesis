'use client';

import React, { useState } from 'react';

interface UploadFileProps {
  email: string;
  username: string;
  password: string;
}

export const uploadToPinata = async (email: string, username: string, password: string) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  const jsonData = {
    email: email,
    username: username,
    password: password,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(jsonData),
      headers: {
        'Content-Type': 'application/json',
        'pinata_api_key': 'yourPinataApiKey',
        'pinata_secret_api_key': 'yourPinataSecretApiKey'
      }
    });

    if (!response.ok) {
      throw new Error(`Error uploading to Pinata: ${response.statusText}`);
    }

    const result = await response.json();
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