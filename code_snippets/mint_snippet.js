import mint_contract_abi from 'contracts.js'

const contractAbi = mint_contract_abi;

const contractAddress = /* insert contract address here */;

// Create contract instance
const contractInstance = new web3.eth.Contract(contractAbi, contractAddress);

// Set up account and private key for transaction signing
const account = /* insert account address here */;
const privateKey = /* insert account private key here */;


// Create transaction object
const transactionObject = {
  from: account,
  gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
  gasLimit: web3.utils.toHex(500000),
  to: contractAddress,
  data: contractInstance.methods.mint(mint_address, real_x, real_y).encodeABI()
};

// Sign and send transaction
web3.eth.accounts.signTransaction(transactionObject, privateKey, function(error, signedTx) {
  if (error) {
    console.log(error);
  } else {
    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, txHash) {
      if (error) {
        console.log(error);
      } else {
        console.log('Transaction hash:', txHash);
      }
    });
  }
});