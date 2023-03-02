import type { NextPage } from "next";
import Head from "next/head";
import { ContractData, ContractInteraction, BottomNav, MapView } from "~~/components/ExampleUi";
import { useEffect, useRef, ReactElement, useState, useContext} from "react";
import { useRouter } from "next/router";
import { getRouteMatcher } from "next/dist/shared/lib/router/utils/route-matcher";
import { useAccount, useSigner } from "wagmi";
import { MainContext } from "~~/context";
import { client as apolloClient, getDefaultProfile } from '../api'
import Link from 'next/link'
import { SortDirection, Client, Conversation } from '@xmtp/xmtp-js'

const Chats: NextPage = () => {
  const router = useRouter();

  const isHomeActive = router.pathname === "/example-ui";
  const isSearchActive = router.pathname === "/example-ui?search";
  console.log("router pathname:" + router.pathname);

  const [client, setClient] = useState<Client>()
  const [provider, setProvider] = useState<any>(null)
  const [address, setAddress] = useState('')
  const [currentConversation, setCurrentConversation] = useState<Conversation>()
  const profilesRef = useRef({})

  async function connect() {
    let signer;
    const { address } = useAccount()
    setAddress(address)
    const { data } = useSigner();
    if (signer === undefined && data) {
        signer = data;
    }
    const provider = signer.provider;
    setProvider(provider)
    initClient(provider)
  }

  async function initClient(wallet: any) {
    if (wallet && !client) {
      try {
        const xmtp = await Client.create(signer, {
          env: 'production'
        })
        setClient(xmtp)
      } catch (e) {
        console.error(e)
      }
    }
  }

  return (
    <>
      <div>
        <MainContext.Provider value={{
          provider,
          client,
          connect,
          address,
          currentConversation,
          setCurrentConversation,
          profilesRef,
        }}>
        

        
        </MainContext.Provider>

      </div>
    </>
  );
};

export default Chats;
