import { Router } from 'express';
import { handleLatestTx } from './handlers/handleLatestTx';
import { handleMostTx } from './handlers/handleMostTx';
import { handleMostUsedContract } from './handlers/handleMostUsedContract';

const router = Router();

// routes to /api
router.route('/latest-tx').post(handleLatestTx);

router.route('/most-tx').post(handleMostTx);

router.route('/most-used-contract').post(handleMostUsedContract);

export default router;
