'use client';
import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT!,
  pinataGateway: "rose-calm-bedbug-368.mypinata.cloud",
})

const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiNzJjNGY5Mi1iNjZjLTRkY2QtODhkMC1lMzcwNTA5ZTE5MzciLCJlbWFpbCI6ImpvbmFoc21pdGgyMDEwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJkMzNmODg5ZWRkMTFjZWNhZjQ2NCIsInNjb3BlZEtleVNlY3JldCI6ImJjYWFlMzNhM2QzOTE5NTdkYWI5NWM4YzU0Y2EzNjZiMDM1N2NhY2FmMmE2Njk2NjNiOGZkZWZjOGEzMmI4NGEiLCJleHAiOjE3NzA1NTkwNzR9.5TtMqw4ybtEi_ltuwQaCia5fjpmVWZI9VJa5N7l-8U8";

export const GetActiveUser = async (activeUsername: string) => {
    try {
        const listResponse = await fetch('https://api.pinata.cloud/data/pinList', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${JWT}`,
          }
        });
    
        if (!listResponse.ok) {
          throw new Error(`Error fetching pin list from Pinata: ${listResponse.statusText}`);
        }
    
        const pinList = await listResponse.json();
        const allData = [];
    
        // Loop through each CID and fetch the data
        for (const pin of pinList.rows) {
          const cid = pin.ipfs_pin_hash;
          try {
            const response = await fetch(`https://gateway.pinata.cloud/ipfs/${cid}`, {
              method: "GET",
              // Remove the Authorization header to avoid CORS issues
            });
    
            if (!response.ok) {
              if (response.status === 404) {
                console.warn(`CID ${cid} not found.`);
              } else {
                console.warn(`Error fetching data for CID ${cid}: ${response.statusText}`);
              }
              continue;
            }
    
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
              const data = await response.json();
              allData.push(data);
            } else {
              console.warn(`CID ${cid} does not contain JSON data.`);
            }
          } catch (error) {
            console.warn(`Error processing CID ${cid}: ${(error as any).message}`);
          }
        }
    
        console.log(allData);
        
        for (const object of allData) {
            if(object.username == activeUsername) {
                return object;
            }
          
        }
        return null;
      } catch (error) {
        console.error("Error retrieving data from Pinata:", error);

        return null;
      }
}
