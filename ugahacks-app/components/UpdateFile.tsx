'use client';

export const updateFromPinata = async (email: string, username: string, password: string, wallets: string[], cid: string) => {
  const url = `https://api.pinata.cloud/pinning/hashMetadata`;

  const jsonData = {
    ipfsPinHash: cid,
    name: 'Updated Metadata',
    keyvalues: {
      email: email,
      username: username,
      password: password,
      wallets: JSON.stringify(wallets),
    },
  };

  try {
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(jsonData),
      headers: {
        'Content-Type': 'application/json',
        'pinata_api_key': 'd33f889edd11cecaf464', // Replace with your actual Pinata API key
        'pinata_secret_api_key': 'bcaae33a3d391957dab95c8c54ca366b0357cacaf2a669663b8fdefc8a32b84a', // Replace with your actual Pinata Secret API key
      },
    });

    if (!response.ok) {
      throw new Error(`Error updating Pinata: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error updating Pinata:', error);
    throw error;
  }
};