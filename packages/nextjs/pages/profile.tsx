import type { NextPage } from "next";
import Head from "next/head";
import { ContractData, ContractInteraction, BottomNav, MapView } from "~~/components/ExampleUi";
import { useEffect, useRef, ReactElement } from "react";
import { useRouter } from "next/router";
import { getRouteMatcher } from "next/dist/shared/lib/router/utils/route-matcher";
//import { ContractUI } from "~~/components/scaffold-eth";
import RainbowKitCustomConnectButton from "~~/components/scaffold-eth/RainbowKitCustomConnectButton";



const Profile: NextPage = () => {
  const router = useRouter();

  const isHomeActive = router.pathname === "/example-ui";
  const isSearchActive = router.pathname === "/example-ui?search";
  console.log("router pathname:" + router.pathname);

  return (
    <>
    <div className="flex items-center">
        <RainbowKitCustomConnectButton />
    </div>
    </>
  );
};

export default Profile;
