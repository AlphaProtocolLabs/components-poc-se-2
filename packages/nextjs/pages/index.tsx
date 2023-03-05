import type { NextPage } from "next";
import Head from "next/head";
import { BugAntIcon, SparklesIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

import Image from "next/image";
import hero from "../public/assets/hero.png";
import two from "../public/assets/two.png";
import three from "../public/assets/three.png";
import four from "../public/assets/four.png";
const myLoader = ({ src, width, quality }) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
};

const Home: NextPage = () => {
  return (
      <div>
      <center>
        <Link href="/search" passHref className="link">
          <Image src={hero} alt="Hero" width={10000} height={5000} />
          <Image src={two} alt="Hero" width={10000} height={5000} />
          <Image src={three} alt="Hero" width={10000} height={5000} />
          <Image src={four} alt="Hero" width={10000} height={5000} />
        </Link>
      </center>
      </div>
  );
};

export default Home;
