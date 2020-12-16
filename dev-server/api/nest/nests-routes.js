import express from 'express';
const router = express.Router();
import * as controller from './nests-controller';
import * as auth from '../../services/auth-service';

router.post('/nest', auth.requireLogin, controller.create);
router.get('/nest', auth.requireLogin, controller.index);
router.get('/nest/:id', auth.requireLogin, controller.show);
router.put('/nest', auth.requireLogin, controller.update);
router.delete('/nest/:id', auth.requireLogin, controller.remove);

export default router;