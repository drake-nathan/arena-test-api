import axios from 'axios';
import dotenv from 'dotenv';
import type Web3 from 'web3';
import type { AbiItem } from 'web3-utils';

dotenv.config();

export const getAbi = async (contractAddress: string): Promise<AbiItem[]> => {
  const root = 'https://api.etherscan.io/api';
  const apikey = process.env.ETHERSCAN_API_KEY;

  if (!apikey) {
    throw new Error('API key not defined, please define Etherscan API key in .env file.');
  }

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

export const getContract = (web3: Web3, abi: AbiItem[], address: string) =>
  new web3.eth.Contract(abi, address);

export const getLatestBlock = (web3: Web3) => web3.eth.getBlockNumber();
