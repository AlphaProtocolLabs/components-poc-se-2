import { Image } from "next/image";
import { useEffect, useState, useRef, ReactElement } from "react";


export const MyImage = (props) => {
  return (
    <>
    <Image
      loader={myLoader}
      src="url('assets/spork.png')"
      alt="Spork Castle NFT"
      width={100}
      height={100}
    />
  )
}
