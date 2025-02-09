'use client';
import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT!,
  pinataGateway: "rose-calm-bedbug-368.mypinata.cloud",
})

const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiNzJjNGY5Mi1iNjZjLTRkY2QtODhkMC1lMzcwNTA5ZTE5MzciLCJlbWFpbCI6ImpvbmFoc21pdGgyMDEwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJkMzNmODg5ZWRkMTFjZWNhZjQ2NCIsInNjb3BlZEtleVNlY3JldCI6ImJjYWFlMzNhM2QzOTE5NTdkYWI5NWM4YzU0Y2EzNjZiMDM1N2NhY2FmMmE2Njk2NjNiOGZkZWZjOGEzMmI4NGEiLCJleHAiOjE3NzA1NTkwNzR9.5TtMqw4ybtEi_ltuwQaCia5fjpmVWZI9VJa5N7l-8U8";






export const updateFromPinata = async (email: string, username: string, password: string, wallets: string[], cid: string) => {

    const update = await pinata.updateMetadata({
        cid: cid,
        keyValues: {
            email: email,
            username: username,
            password: password,
        }
    })
}