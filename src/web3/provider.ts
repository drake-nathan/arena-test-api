import Web3 from 'web3';
import dotenv from 'dotenv';

dotenv.config();

const rpcUrl = process.env.RPC_URL;

if (!rpcUrl) {
  throw new Error('RPC_URL not defined, please define a RPC_URL in .env file.');
}

const web3Provider = new Web3.providers.HttpProvider(rpcUrl);

const web3 = new Web3(web3Provider);

export default web3;
