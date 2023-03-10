import React from "react";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { useAppStore } from "~~/services/store/store";
import { BiUser, BiGlobe, BiConversation } from "react-icons/bi";
import SwitchTheme from "./SwitchTheme";
import { Faucet } from "~~/components/scaffold-eth";
import { getTargetNetwork } from "~~/utils/scaffold-eth";
import { hardhat } from "wagmi/chains";

/**
 * Site footer
 */
export default function Footer() {
  const ethPrice = useAppStore(state => state.ethPrice);
  const configuredNetwork = getTargetNetwork();

  return (
    <div className="min-h-0 mb-11 lg:mb-0">
      <div>
        <div className="fixed flex justify-between items-center w-full z-20 p-4 bottom-0 left-0 pointer-events-none">
          <div className="flex space-x-2 pointer-events-auto">
          </div>
        </div>
      </div>
    </div>
  );
}
