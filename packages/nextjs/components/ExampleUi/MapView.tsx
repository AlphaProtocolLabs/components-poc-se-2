import type { NextPage } from "next";
import Head from "next/head";
import { ContractData, ContractInteraction } from "~~/components/ExampleUi";
import { useEffect, useRef, ReactElement } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Spinner from "../Spinner";

// Return map bounds based on list of places
const getMapBounds = (map, maps, places) => {
  const bounds = new maps.LatLngBounds();

  places.forEach((place) => {
    bounds.extend(new maps.LatLng(
      place.geometry.location.lat,
      place.geometry.location.lng,
    ));
  });
  return bounds;
};

// Re-center map when resizing the window
const bindResizeListener = (map, maps, bounds) => {
  maps.event.addDomListenerOnce(map, 'idle', () => {
    maps.event.addDomListener(window, 'resize', () => {
      map.fitBounds(bounds);
    });
  });
};

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
const Map = () => {
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

const MapView: NextPage = () => {
  return (
    <>
      <div className="grid lg:grid-cols-2 flex-grow" data-theme="exampleUi">
        <Map></Map>
      </div>
    </>
  );
};

export default MapView;
