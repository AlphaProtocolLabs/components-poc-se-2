import React from 'react';
import Web3 from 'web3';
import mint_contract_abi from '../../../mint_contract_abi.json';

function Mint(props) {
  const handleClick = async () => {
    
    var web3 = new Web3(Web3.givenProvider)

    //if(props.coords[0] )

    // this needs actual contract addy
    const contractAddress = props.contract_address;
    //const contractAddress = "0x610178dA211FEF7D417bC0e6FeD39F05609AD788";

    // Create contract instance
    const contractInstance = new web3.eth.Contract(mint_contract_abi, contractAddress);

    const coords = await contractInstance.methods.getCoords().call()
    console.log(props.coords)
    console.log(coords)
    const x_diff =Math.abs(parseInt(props.coords[0]*1000000) - coords[0])
    const y_diff = Math.abs(parseInt(props.coords[1]*1000000) - coords[1])
  
    if ( x_diff < 450 && y_diff < 450 )
    {
    // Set up account for signing with metamask
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    // Create transaction object
    const txObject = {
      from: account,
      gasPrice: web3.utils.toHex(web3.utils.toWei('300', 'gwei')),
      gasLimit: web3.utils.toHex(500000),
      to: contractAddress,
      data: contractInstance.methods.mint(
        "data:application/json;base64,eyJuYW1lIjogIlFSLU5GVC1QUk9UT1RZUEUiLCJkZXNjcmlwdGlvbiI6ICJRUiBORlQgYXNzb2NpYXRlZCB3aXRoIGEgcmVhbCB3b3JsZCBsb2NhdGlvbiIsImltYWdlIjogImh0dHBzOi8vaXBmcy5pby9pcGZzL1FtVGdxbmhGQk1rZlQ5czhQSEtjZFhCbjFmNWJHM1E1aG1CYVI0VTZob1R2YjE/ZmlsZW5hbWU9Q2hhaW5saW5rX0VsZi5wbmciLCJhdHRyaWJ1dGVzIjogW3sidHJhaXRfdHlwZSI6ICJkaXN0YW5jZSIsInZhbHVlIjogdGVzdCB2YWx1ZX1dfQ=="

      ).encodeABI()
    };

    try {
      // Prompt the user to sign the transaction with Metamask
      const signedTx = await web3.eth.sendTransaction(txObject);
      console.log(`Transaction sent: ${signedTx.transactionHash}`);
    } catch (error) {
      console.error(error);
    }
  }
  else
  {
    console.log("Not close enough to redeem, sorry!");
  }
  };

  return (
    <div>
      <button  class="rounded-full bg-pink-300 text-xl font-medium uppercase px-5" onClick={handleClick}>MINT</button>
    </div>
  );
}

export default Mint;
