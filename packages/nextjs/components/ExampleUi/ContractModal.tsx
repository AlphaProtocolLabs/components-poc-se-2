import { useEffect, useRef, ReactElement, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Spinner from "../Spinner";
import Modal from "../Modal";
import Mint from "./Mint";
import { useRouter } from "next/router";
import Image from "next/image";
import spork from "../../public/assets/spork.png";
import buidlhub from "../../public/assets/buidlhub.png";

function ContractModal({
  toggleShowModal,
  places,
  placeId,
}: {
  toggleShowModal: Function;
  places: Array<Object>;
  placeId: Number;
}) {
  if (places != null && placeId != null) {
    let place = places[placeId];
    return (
      <div id="modal-root">
        <Modal onClose={() => toggleShowModal(null)} show={toggleShowModal} title="root">
          <div className="pt-10">
            <center>
              {placeId == 0 && <Image src={spork} alt={name + " NFT"} width={300} height={300} />}
              {placeId == 1 && <Image src={buidlhub} alt={name + " NFT"} width={300} height={300} />}
            </center>
          </div>

          <div className="pt-5">
            <h1 className="text-center text-2xl font-bold"> {place.name}</h1>
            <h3 className="text-center text-lg "> {place.contract_address} </h3>
            <h4 className="text-center text-lg "> {place.formatted_address} </h4>
          </div>

          <div className="pt-5">
            <center>
              <Mint contract_address={place.contract_address} URI="https://bafybeiglr7zz2nhn6xmx7qhsnmvp5n56cs64rnyr56gvcmbmhpjex243oy.ipfs.w3s.link/spork.png" />
            </center>
          </div>
        </Modal>
      </div>
    );
  }
}
export default ContractModal;
