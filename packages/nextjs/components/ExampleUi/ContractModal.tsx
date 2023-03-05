
import { useEffect, useRef, ReactElement, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Spinner from "../Spinner";
import Modal from "../Modal";
import Mint from "./Mint";
import { useRouter } from "next/router";
import Image from "next/image";
import spork from "../../public/assets/spork.png";
function ContractModal({toggleShowModal}: {toggleShowModal: Function}) {
    
    return (

      <div id="modal-root">
        <Modal onClose={() => toggleShowModal()} show={toggleShowModal} title="root">
          <div className="pt-10">
            <center>
              <Image src={spork} alt="Spork Castle NFT" width={300} height={300} />
            </center>
          </div>

          <div className="pt-5">
            <h1 className="text-center text-2xl font-bold"> SPORK CASTLE </h1>
            <h3 className="text-center text-lg "> 0xAddress </h3>
            <h4 className="text-center text-lg "> 4655 Humboldt St, Denver CO 80216 </h4>
          </div>

          <div className="pt-5">
          <center>
              <Mint contract_address = "0x610178dA211FEF7D417bC0e6FeD39F05609AD788" URI = "insert_string_here"/>
          </center>
          </div>
        </Modal>
      </div>
    );
}
export default ContractModal;