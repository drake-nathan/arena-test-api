import { Request, Response } from 'express';
import { isAddress } from 'web3-utils';
import { getWalletTxByContract } from '../etherscan-fetches';

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
    const eachWalletsTransactions = await Promise.all(
      wallets.map((wallet: string) =>
        getWalletTxByContract(contract_address, wallet),
      ),
    );
    // res.send(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
