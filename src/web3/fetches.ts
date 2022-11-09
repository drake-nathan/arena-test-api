import type Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { getLatestBlock } from './helpers';

export const fetchEvents = async (
  web3: Web3,
  contract: Contract,
  wallet_address: string,
) => {
  const fromBlock = (await getLatestBlock(web3)) - 10000;
  const options = { filter: { address: [wallet_address] }, fromBlock };

  const tx = await contract.getPastEvents('allEvents', options);

  return tx;
};
