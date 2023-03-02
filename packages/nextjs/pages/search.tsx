import type { NextPage } from "next";
import Head from "next/head";
import { ContractData, ContractInteraction, BottomNav, MapView } from "../components/ExampleUi";
import { useEffect, useRef, ReactElement } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Spinner from "../components/Spinner";
import { useRouter } from "next/router";
import { getRouteMatcher } from "next/dist/shared/lib/router/utils/route-matcher";

const Search: NextPage = () => {
  const router = useRouter();

  const isHomeActive = router.pathname === "/example-ui";
  const isSearchActive = router.pathname === "/example-ui?search";
  console.log("router pathname:" + router.pathname);

  return (
    <>
      <Head>
        <title>Scaffold-eth Example Ui</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </Head>
      <div className="grid lg:grid-cols-2 flex-grow" data-theme="exampleUi">
          <MapView />
        </div>
    </>
  );
};

export default Search;
