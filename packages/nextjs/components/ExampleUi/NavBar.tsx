import type { NextPage } from "next";
import Head from "next/head";
import { ContractData, ContractInteraction, NavBar } from "~~/components/ExampleUi";
import { useEffect, useRef, ReactElement } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Spinner from "../Spinner";
import { CopyIcon } from "./assets/CopyIcon";
import { DiamondIcon } from "./assets/DiamondIcon";
import { HareIcon } from "./assets/HareIcon";

// Re-center map when resizing the window
const bindResizeListener = (bounds) => {
};


const NavBar =  () => {
  return (
    <>
    <NavBar />
    </>
  );
};

export default NavBar;
