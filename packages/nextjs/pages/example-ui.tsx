import type { NextPage } from "next";
import Head from "next/head";
import { ContractData, ContractInteraction } from "~~/components/ExampleUi";
import { useEffect, useRef, ReactElement } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Spinner from "../components/Spinner"
const render = (status: Status): ReactElement => {
  if (status === Status.FAILURE) return (<ErrorDialog />)
  return <Spinner width="25" height="25" />;
};

function MyMapComponent({
  center,
  zoom,
}: {
  center: google.maps.LatLngLiteral;
  zoom: number;
}) {
  const ref = useRef();

  useEffect(() => {
    new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });
  });

  return <div ref={ref} id="map" />;
}
const MyApp = () => {
  const center = { lat: 39.771, lng: -104.979 };
  const zoom = 15;

  return (
  <Wrapper apiKey={"AIzaSyD7BALiQ3L-rupI-cyiMmE2r5DPNlI-5Tg"} render={render}><MyMapComponent center={center} zoom={zoom} /> </Wrapper>
  );
};
const ErrorDialog = () => {
  return (
    <div className="alert alert-danger" role="alert">
    Failure
    </div>
  );
};
const ExampleUI: NextPage = () => {
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
        <ContractInteraction />
        <ContractData />
        <MyApp></MyApp>
      </div>
    </>
  );
};

export default ExampleUI;
