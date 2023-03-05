import { useEffect, useRef, ReactElement, useState } from "react";
import React from "react";
import Web3 from "web3";
import mint_contract_abi from "../../public/assets/mint_contract_abi.json";

function Mint(props) {
  const [closeEnough, setCloseEnough] = useState(null);
  const handleClick = async () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    async function success(pos) {
      const crd = pos.coords;

      console.log("Your current position is:");
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      var web3 = new Web3(Web3.givenProvider);

      //if(props.coords[0] )

      // this needs actual contract addy
      const contractAddress = props.contract_address;
      //const contractAddress = "0x610178dA211FEF7D417bC0e6FeD39F05609AD788";

      // Create contract instance
      const contractInstance = new web3.eth.Contract(mint_contract_abi, contractAddress);
        //39781337239293500000
        //1000000000000000000
      const coords = await contractInstance.methods.getCoords().call();
      console.log(coords);
      const x_diff = Math.abs(parseInt(parseFloat(crd.latitude ) *1000000 - (coords[0] / 1000000000000)));
      const y_diff = Math.abs(parseInt(parseFloat(crd.longitude ) *1000000 - (coords[1] / 1000000000000)));
      console.log(x_diff);
      console.log(y_diff);
      console.log("------------");
      console.log(coords[0]);
      console.log(crd.latitude);
      console.log("------------");

      if (x_diff < 900 && y_diff < 900) {
        // Set up account for signing with metamask
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];

        // Create transaction object
        const txObject = {
          from: account,
          gasPrice: web3.utils.toHex(web3.utils.toWei("300", "gwei")),
          gasLimit: web3.utils.toHex(500000),
          to: contractAddress,
          data: contractInstance.methods.mint(props.URI).encodeABI(),
        };

        try {
          // Prompt the user to sign the transaction with Metamask
          const signedTx = await web3.eth.sendTransaction(txObject);
          console.log(`Transaction sent: ${signedTx.transactionHash}`);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log("Not close enough to redeem, sorry!");
      }
    }
    const result = navigator.geolocation.getCurrentPosition(success, error, options);
  };

  return (
    <>
      <div>
        <button className="rounded-full bg-pink-300 text-xl font-medium uppercase px-5" onClick={handleClick}>
          MINT
        </button>
        {closeEnough != null && !closeEnough && <p>Not close eough to redeem, sorry</p>}
      </div>
    </>
  );
}

export default Mint;
