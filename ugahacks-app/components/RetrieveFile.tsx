// filepath: /c:/Users/jonah/Documents/GitHub/UGAHacksX/ugahacks-app/components/RetrieveFile.tsx

'use client';

import React, { useState, useEffect } from 'react';

interface RetrieveFileProps {
  username: string;
  password: string;
}

const RetrieveFile: React.FC<RetrieveFileProps> = ({ username, password }) => {
  const [fileData, setFileData] = useState<{ username: string; password: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const retrieveFromPinata = async () => {
      const url = `https://api.pinata.cloud/data/pinList?status=pinned`;

      try {
        setLoading(true);
        const response = await fetch(url, {
          headers: {
            'pinata_api_key': 'yourPinataApiKey',
            'pinata_secret_api_key': 'yourPinataSecretApiKey'
          }
        });

        if (!response.ok) {
          throw new Error(`Error retrieving from Pinata: ${response.statusText}`);
        }

        const data = await response.json();
        const files = data.rows;

        for (const file of files) {
          const metadata = file.metadata.keyvalues;
          if (metadata.username === username && metadata.password === password) {
            setFileData({ username: metadata.username, password: metadata.password });
            setLoading(false);
            return;
          }
        }

        setError('No matching username and password found');
        setLoading(false);
      } catch (error) {
        console.error('Error retrieving from Pinata:', error);
        setError('Error retrieving from Pinata');
        setLoading(false);
      }
    };

    retrieveFromPinata();
  }, [username, password]);

  return (
    <div className="flex flex-col items-center">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : fileData ? (
        <div>
          <p>Username: {fileData.username}</p>
          <p>Password: {fileData.password}</p>
        </div>
      ) : null}
    </div>
  );
};

export default RetrieveFile;