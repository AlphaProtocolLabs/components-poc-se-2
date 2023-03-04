import type { NextPage } from "next";
import Head from "next/head";
import { ContractData, ContractInteraction } from "~~/components/ExampleUi";
import { useEffect, useRef, ReactElement, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Spinner from "../Spinner";
import { GeolocatedResult, useGeolocated } from "react-geolocated";
import { defaultPlaces }  from "./assets/DefaultPlaces";

// Return map bounds based on list of places
const getMapBounds = (map, maps, places) => {
  const bounds = new maps.LatLngBounds();

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
  const [places, setPlaces] = useState([])
  const ref = useRef();

  let googleMap = null;

  const fetchPlaces = () => {
    setPlaces(defaultPlaces.results)
  }
  useEffect(() => {
    
    fetchPlaces();

    const initGoogleMap = () => {
        return new window.google.maps.Map(ref.current, {
          center,
          zoom,
      });
    }

    const createMarker = (markerObj) => new window.google.maps.Marker({
      position: { lat: parseFloat(markerObj.lat), lng: parseFloat(markerObj.lng) },
      map: googleMap,
      /*
      icon: {
          url: icon,
          scaledSize: new window.google.maps.Size(80, 80)
      },
      */
    });
    


    googleMap = initGoogleMap();
    places.map((place) => {createMarker( { lat: place.geometry.location.lat, lng: place.geometry.location.lng})})

  });

  return <div ref={ref} id="map" />;
}
function Map({locatedCenter}: { locatedCenter: google.maps.LatLngLiteral; }) {
  const [currentLocation, setCurrentLocation] = useState<any>(null) 
  const zoom = 15;

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
  useGeolocated({
      positionOptions: {
          enableHighAccuracy: false,
      },
      watchPosition: true,
      userDecisionTimeout: 5000,
      onSuccess: (position: GeolocationPosition) => {}
  });

  return  (
  <>
   { !isGeolocationAvailable && (<NoLocationFoundDialog />)}
   { !isGeolocationEnabled &&  (<NoLocationFoundDialog />)} 
    <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} render={render}>
      <MyMapComponent center={ {lat: coords?.latitude, lng: coords?.longitude} } zoom={zoom} />{" "}
    </Wrapper>
    </>
  );
};

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
  return (
    <>
      <div className="grid lg:grid-cols-2 flex-grow" data-theme="exampleUi">
        <Map></Map>
      </div>
    </>
  );
};

export default MapView;
