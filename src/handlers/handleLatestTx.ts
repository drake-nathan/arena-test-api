import { Request, Response } from 'express';
import { isAddress } from 'web3-utils';
import { getWalletTransactions } from '../etherscan/fetches';
import { filterTxByContract, findLatestTx } from '../etherscan/helpers';

export const handleLatestTx = async (req: Request, res: Response) => {
  const { contract_address, wallet_address } = req.body;

  const isWalletValid = isAddress(wallet_address);
  if (!isWalletValid) {
    res.status(400).send('Invalid wallet address');
    return;
  }

  const isContractValid = isAddress(contract_address);
  if (!isContractValid) {
    res.status(400).send('Invalid contract address');
    return;
  }

  try {
    const transactions = await getWalletTransactions(wallet_address);
    const txByContract = filterTxByContract(transactions, contract_address);
    const latestTx = findLatestTx(txByContract);

    res.send(latestTx);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
