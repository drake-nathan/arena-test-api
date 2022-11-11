import { Router } from 'express';
import { handleLatestTx } from './handlers/handleLatestTx';
import { handleMostTx } from './handlers/handleMostTx';

const router = Router();

// routes to /api
router.route('/latest-tx').post(handleLatestTx);

router.route('/most-tx').post(handleMostTx);

export default router;
