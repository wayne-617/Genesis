require('dotenv').config();
require('@nomiclabs/hardhat-ethers');  // Ensure you have ethers plugin

module.exports = {
  solidity: "0.8.20",  // Define your Solidity version here, adjust if needed
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURIA_API_KEY}`,  // Or use Alchemy URL
      accounts: [`0x${process.env.PRIVATE_KEY}`],  // Replace with your wallet's private key
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,  // Optional: Only if you want to verify your contract on Etherscan
  },
};