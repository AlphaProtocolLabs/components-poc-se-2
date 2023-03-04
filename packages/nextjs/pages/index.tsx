import type { NextPage } from "next";
import Head from "next/head";
import { BugAntIcon, SparklesIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Alpha Protocol</title>
        <meta name="description" content="Peer to Peer Networking and Communication" />
      </Head>
      
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Experiance the Network</span>
            <span className="block text-4xl font-bold">Alpha GO</span>
          </h1>
          <p className="text-center text-lg">
            Peer to Peer Networking and Communication is Hard{" "}
            <code className="italic bg-base-300 text-base font-bold"></code>
          </p>
          <p className="text-center text-lg">
            So we made it <code className="bg-base-300 text-large font-bold">FUN!</code> {" "}
            <code className="text-base text-xl font-bold">
            <Link href="/profile" passHref className="link">
              ENTER
            </Link>
            </code>
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
