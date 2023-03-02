import mint_contract_abi from 'contracts.js'

const contractAbi = mint_contract_abi;

const contractAddress = /* insert contract address here, either from QR code or from modal */;

// Create contract instance
const contractInstance = new web3.eth.Contract(contractAbi, contractAddress);

// Set up account for signing with metamask
const accounts = await web3.eth.getAccounts();
const account = accounts[0];


// Create transaction object
const txObject = {
  from: account,
  gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
  gasLimit: web3.utils.toHex(500000),
  to: contractAddress,
  data: contractInstance.methods.mint(mint_address, real_x, real_y).encodeABI()
};

try {
  // Prompt the user to sign the transaction with Metamask
  const signedTx = await web3.eth.sendTransaction(txObject);
  console.log(`Transaction sent: ${signedTx.transactionHash}`);
} catch (error) {
  console.error(error);
}
