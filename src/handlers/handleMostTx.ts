import { Request, Response } from 'express';
import { isAddress } from 'web3-utils';
import { getWalletTransactions } from '../etherscan/fetches';
import { EtherscanTx } from '../types';

export const handleMostTx = async (req: Request, res: Response) => {
  const { contract_address, wallets } = req.body;

  const isContractValid = isAddress(contract_address);
  if (!isContractValid) {
    res.status(400).send('Invalid contract address');
    return;
  }

  const areAllWalletsValid = wallets.every((wallet: string) =>
    isAddress(wallet),
  );
  if (!areAllWalletsValid) {
    res.status(400).send('At least one invalid wallet address');
    return;
  }

  try {
    const eachWalletsTransactions: EtherscanTx[][] = await Promise.all(
      wallets.map((wallet: string) => getWalletTransactions(wallet)),
    );

    const txCountByWallet = eachWalletsTransactions
      .map((listOfTx, i) => {
        const txCount = listOfTx.filter(
          (tx) => tx.to === contract_address,
        ).length;

        return {
          wallet: wallets[i],
          txCount,
        };
      })
      .sort((a, b) => b.txCount - a.txCount);

    res.send(txCountByWallet);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
