import type { NextPage } from "next";
import Head from "next/head";
import Modal from "../components/Modal";
import { ContractData, ContractInteraction, BottomNav, MapView, Mint } from "~~/components/ExampleUi";
import { useEffect, useState, useRef, ReactElement } from "react";
import { useRouter } from "next/router";
import { getRouteMatcher } from "next/dist/shared/lib/router/utils/route-matcher";
import Image from "next/image";
import spork from "../public/assets/spork.png";
const myLoader = ({ src, width, quality }) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
};

const Profile: NextPage = () => {
  const router = useRouter();

  const isHomeActive = router.pathname === "/example-ui";
  const isSearchActive = router.pathname === "/example-ui?search";
  console.log("router pathname:" + router.pathname);

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div id="modal-root">
        <button onClick={() => setShowModal(true)}>Open Modal</button>

        <Modal onClose={() => setShowModal(false)} show={showModal} title="root">
          <div className="pt-10">
            <center>
              <Image src={spork} alt="Spork Castle NFT" width={300} height={300} />
            </center>
          </div>

          <div className="pt-5">
            <h1 className="text-center text-2xl font-bold"> SPORK CASTLE </h1>
            <h3 className="text-center text-lg "> 0xAddress </h3>
            <h4 className="text-center text-lg "> 99994655 Humboldt St, Denver CO 80216 </h4>
          </div>

          <div className="pt-5">
            <center>
              <Mint
                contract_address="0x123Ca8b94207567769D5b259E581A149D844CAF4"
                coords={[39.7813372392935, -104.97154179317967]}
                URI="insert_string_here"
              />
            </center>
          </div>
        </Modal>
        <BottomNav name="Profile" />
      </div>
    </>
  );
};

export default Profile;
