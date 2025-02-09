async function main() {
    // Get the deployer account (the first signer)
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    // Get the contract factory for Funding.sol
    const Funding = await ethers.getContractFactory("Funding");
  
    // Deploy the contract (empty constructor, no arguments)
    const funding = await Funding.deploy();
  
    // Wait for the contract to be deployed
    await funding.deployed();
  
    // Log the contract's deployed address
    console.log("Funding contract deployed to:", funding.address);
  }
  
  // Run the main function and handle errors
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });