import type { NextPage } from "next";
import Head from "next/head";
import { ContractData, ContractInteraction } from "~~/components/ExampleUi";
import { useEffect, useRef, ReactElement, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Spinner from "../Spinner";
import { useGeolocated } from "react-geolocated";

// Return map bounds based on list of places
const getMapBounds = (map, maps, places) => {
  const bounds = new maps.LatLngBounds();
  const [currentLocation, setCurrentLocation] = useState<any>(null);

  places.forEach(place => {
    bounds.extend(new maps.LatLng(place.geometry.location.lat, place.geometry.location.lng));
  });
  return bounds;
};

// Re-center map when resizing the window
const bindResizeListener = (map, maps, bounds) => {
  maps.event.addDomListenerOnce(map, "idle", () => {
    maps.event.addDomListener(window, "resize", () => {
      map.fitBounds(bounds);
    });
  });
};

const render = (status: Status): ReactElement => {
  if (status === Status.FAILURE) return <ErrorDialog />;
  return <Spinner width="25" height="25" />;
};

function MyMapComponent({ center, zoom }: { center: google.maps.LatLngLiteral; zoom: number }) {
  const ref = useRef();

  useEffect(() => {
    new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });
  });

  return <div ref={ref} id="map" />;
}
function Map({ locatedCenter }: { locatedCenter: google.maps.LatLngLiteral }) {
  const zoom = 15;

  return (
    <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} render={render}>
      <MyMapComponent center={locatedCenter} zoom={zoom} />{" "}
    </Wrapper>
  );
}

const NoLocationFoundDialog = () => {
  return (
    <div className="alert alert-danger" role="alert">
      Geolocation is not enabled
    </div>
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
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    watchPosition: true,
    userDecisionTimeout: 5000,
  });

  return (
    <>
      <div className="grid lg:grid-cols-2 flex-grow" data-theme="exampleUi">
        {!isGeolocationAvailable && <NoLocationFoundDialog />}
        {!isGeolocationEnabled && <NoLocationFoundDialog />}
        <Map locatedCenter={{ lat: coords?.latitude, lng: coords?.longitude }}></Map>
      </div>
    </>
  );
};

export default MapView;
