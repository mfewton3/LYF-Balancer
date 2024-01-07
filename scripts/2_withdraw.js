const Web3 = require('web3');
const fs = require('fs');

// Configuration: Set these values accordingly
const providerURL = 'YOUR_INFURA_URL'; // or any other Ethereum node URL
const privateKey = 'YOUR_PRIVATE_KEY'; // private key of the account invoking the function
const contractAddress = 'CONTRACT_ADDRESS_HERE'; // address of the LeveragedYieldFarm contract
const initialAmount = 100; // set the initial amount of DAI to withdraw

// Initialize web3
const web3 = new Web3(new Web3.providers.HttpProvider(providerURL));

// Get account from private key
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);

// Contract ABI
const contractABI = JSON.parse(fs.readFileSync('path_to_abi.json', 'utf-8'));

// Create contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function withdrawDai() {
    try {
        const gasPrice = await web3.eth.getGasPrice();
        const gasEstimate = await contract.methods.withdrawDai(initialAmount).estimateGas({ from: account.address });

        const tx = contract.methods.withdrawDai(initialAmount);
        const receipt = await tx.send({
            from: account.address,
            gasPrice: gasPrice,
            gas: gasEstimate
        });

        console.log('Transaction receipt:', receipt);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

withdrawDai();
