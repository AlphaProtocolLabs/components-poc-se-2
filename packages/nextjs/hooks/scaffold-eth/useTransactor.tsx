import { TransactionRequest, TransactionResponse, TransactionReceipt } from "@ethersproject/abstract-provider";
import { SendTransactionResult } from "@wagmi/core";
import { BigNumber, ethers, Signer } from "ethers";
import { Deferrable } from "ethers/lib/utils";
import { useSigner } from "wagmi";
import { getParsedEthersError } from "~~/components/scaffold-eth/Contract/utilsContract";
import { getBlockExplorerTxLink, notification } from "~~/utils/scaffold-eth";

type TTransactionFunc = (
  tx: Promise<SendTransactionResult> | Deferrable<TransactionRequest> | undefined,
  callback?: ((_param: any) => void) | undefined,
) => Promise<Record<string, any> | undefined>;

/**
 * Custom notification content for TXs.
 */
const TxnNotification = ({ message, blockExplorerLink }: { message: string; blockExplorerLink?: string }) => {
  return (
    <div className={`flex flex-col ml-1 cursor-default`}>
      <p className="my-0">{message}</p>
      {blockExplorerLink && blockExplorerLink.length > 0 ? (
        <a href={blockExplorerLink} target="_blank" rel="noreferrer" className="block underline text-md">
          checkout out transaction
        </a>
      ) : null}
    </div>
  );
};

/**
 * Runs TXs showing UI feedback.
 * @param _signer
 * @param gasPrice
 * @dev If signer is provided => dev wants to send a raw tx.
 */
export const useTransactor = (_signer?: Signer, gasPrice?: number): TTransactionFunc => {
  let signer = _signer;
  const { data } = useSigner();
  if (signer === undefined && data) {
    signer = data;
  }

  const result: TTransactionFunc = async (tx, callback) => {
    if (!signer) {
      return;
    }

    let notificationId = null;
    let transactionReceipt: TransactionReceipt | undefined;
    let transactionResponse: SendTransactionResult | TransactionResponse | undefined;
    try {
      const provider = signer.provider;
      const network = await provider?.getNetwork();

      notificationId = notification.loading(<TxnNotification message="Awaiting for user confirmation" />);
      if (tx instanceof Promise) {
        // Tx is already prepared by the caller
        transactionResponse = await tx;
      } else if (tx != null) {
        // Raw tx
        if (!tx.gasPrice) {
          tx.gasPrice = gasPrice || ethers.utils.parseUnits("4.1", "gwei");
        }
        if (!tx.gasLimit) {
          tx.gasLimit = BigNumber.from(ethers.utils.hexlify(120000));
        }

        transactionResponse = await signer.sendTransaction(tx);
      } else {
        throw new Error("Incorrect transaction passed to transactor");
      }
      notification.remove(notificationId);

      const blockExplorerTxURL = network ? getBlockExplorerTxLink(network, transactionResponse.hash) : "";

      notificationId = notification.loading(
        <TxnNotification message="Mining transaction, Hold tight!" blockExplorerLink={blockExplorerTxURL} />,
      );
      transactionReceipt = await transactionResponse.wait();
      notification.remove(notificationId);

      notification.success(<TxnNotification message="Mined successfully !" blockExplorerLink={blockExplorerTxURL} />, {
        icon: "🎉",
      });

      if (transactionReceipt) {
        if (callback != null && transactionReceipt.blockHash != null && transactionReceipt.confirmations >= 1) {
          callback({ ...transactionResponse, ...transactionReceipt });
        }
      }
    } catch (error: any) {
      if (notificationId) {
        notification.remove(notificationId);
      }
      // TODO handle error properly
      console.error("⚡️ ~ file: useTransactor.ts ~ line 98 ~ constresult:TTransactionFunc= ~ error", error);
      const message = getParsedEthersError(error);
      notification.error(message);
    }

    return transactionResponse;
  };

  return result;
};
