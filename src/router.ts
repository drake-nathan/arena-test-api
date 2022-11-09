import { Router } from 'express';
import { fetchEvents } from './web3/fetches';
import { getAbi, getContract } from './web3/helpers';
import web3 from './web3/provider';

const router = Router();

// routes to /api
router.route('/latest-tx').post(async (req, res) => {
  const { contract_address, wallet_address } = req.body;

  try {
    const abi = await getAbi(contract_address);
    const contract = getContract(web3, abi, contract_address);
    const tx = await fetchEvents(web3, contract, wallet_address);

    res.send(tx.length.toString());
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

export default router;
