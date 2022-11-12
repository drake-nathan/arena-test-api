import { Request, Response } from 'express';
import { isAddress } from 'web3-utils';
import { getWalletTransactions } from '../etherscan/fetches';
import { filterMostUsedContract } from '../etherscan/helpers';

export const handleMostUsedContract = async (req: Request, res: Response) => {
  const { wallet_address } = req.body;

  const isWalletValid = isAddress(wallet_address);
  if (!isWalletValid) {
    res.status(400).send('Invalid wallet address');
    return;
  }

  try {
    const transactions = await getWalletTransactions(wallet_address);
    const mostUsedContract = filterMostUsedContract(
      transactions,
      wallet_address,
    );

    res.send(mostUsedContract);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
