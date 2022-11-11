import axios from 'axios';
import dotenv from 'dotenv';
import type { AbiItem } from 'web3-utils';
import { EtherscanTx } from './types';

dotenv.config();

const apikey = process.env.ETHERSCAN_API_KEY;

if (!apikey) {
  throw new Error(
    'API key not defined, please define Etherscan API key in .env file.',
  );
}

const root = 'https://api.etherscan.io/api';

export const getAbi = async (contractAddress: string): Promise<AbiItem[]> => {
  const params = {
    module: 'contract',
    action: 'getabi',
    address: contractAddress,
    apikey,
  };

  try {
    const response = await axios.get(root, { params });

    return JSON.parse(response.data.result) as AbiItem[];
  } catch (error) {
    console.error(error);
  }
};

export const getWalletTxByContract = async (
  contractAddress: string,
  walletAddress: string,
) => {
  const params = {
    module: 'account',
    action: 'txlist',
    address: walletAddress,
    startblock: 0,
    endblock: 99999999,
    apikey,
  };

  const response = await axios.get(root, { params });

  const walletTransactions = response.data.result as EtherscanTx[];

  const txByContract = walletTransactions.filter(
    (tx) =>
      tx.to.toLowerCase() === contractAddress.toLowerCase() ||
      tx.from.toLowerCase() === contractAddress.toLowerCase(),
  );

  return txByContract;
};
