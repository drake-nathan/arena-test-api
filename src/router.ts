import { Router } from 'express';

const router = Router();

router.route('/').get((req, res) => {
  res.send('Route up and running.');
});

export default router;
