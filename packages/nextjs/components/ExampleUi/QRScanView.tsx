import type { NextPage } from "next";
import Head from "next/head";
import { ContractData, ContractInteraction } from "~~/components/ExampleUi";
import { useEffect, useRef, ReactElement } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Spinner from "../Spinner";
import {QrScanner} from '@yudiel/react-qr-scanner';


// Re-center map when resizing the window
const bindResizeListener = () => {
};

const render = (status: Status): ReactElement => {
  if (status === Status.FAILURE) return <ErrorDialog />;
  return <Spinner width="25" height="25" />;
};

const QRScanner = () => {

  return (
    <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, height: "40%", margin: "auto", marginTop: 64 }}>
      <QrScanner
          onDecode={(result) => console.log(result.text)}
          onError={(error) => console.log(error?.message)}
      />
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

const QRScanView: NextPage = () => {
  return (
    <>
      <div className="grid lg:grid-cols-2 flex-grow" data-theme="exampleUi">
       <QRScanner />
      </div>
    </>
  );
};

export default QRScanView;
