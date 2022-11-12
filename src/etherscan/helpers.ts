import { EtherscanTx } from '../types';

export const filterTxByContract = (
  transactions: EtherscanTx[],
  contractAddress: string,
) => {
  const txByContract = transactions.filter(
    (tx) => tx.to.toLowerCase() === contractAddress.toLowerCase(),
  );

  return txByContract;
};

export const findLatestTx = (transactions: EtherscanTx[]) => {
  const latestTx = transactions.sort(
    (a, b) => Number(b.timeStamp) - Number(a.timeStamp),
  )[0];

  return latestTx;
};

export const filterMostUsedContract = (
  transactions: EtherscanTx[],
  walletAddress: string,
) => {
  const contractAddresses = transactions
    .map((tx) => {
      if (tx.to.toLowerCase() !== walletAddress.toLowerCase()) {
        return tx.to;
      }
      return null;
    })
    .filter(Boolean);

  const contractAddressesCount = contractAddresses.reduce((acc, address) => {
    if (acc[address]) {
      acc[address] += 1;
    } else {
      acc[address] = 1;
    }
    return acc;
  }, {});

  const mostUsedContractAddress = Object.keys(contractAddressesCount).reduce(
    (a, b) => (contractAddressesCount[a] > contractAddressesCount[b] ? a : b),
  );

  return {
    [mostUsedContractAddress]: contractAddressesCount[mostUsedContractAddress],
  };
};
