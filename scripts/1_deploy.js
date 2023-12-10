// Import ethers from Hardhat package
const { ethers } = require("hardhat");

async function main() {
    // Get the contract to deploy
    const LeveragedYieldFarm = await ethers.getContractFactory("LeveragedYieldFarm");

    // Deploy the contract
    const leveragedYieldFarm = await LeveragedYieldFarm.deploy();

    // Wait for the deployment to finish
    await leveragedYieldFarm.deployed();

    console.log("LeveragedYieldFarm deployed to:", leveragedYieldFarm.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
