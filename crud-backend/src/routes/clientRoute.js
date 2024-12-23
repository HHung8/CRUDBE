import express from 'express';
import * as clientController from '../controllers/clientCotroller.js';

const router = express.Router();

router.get('/clients', clientController.getClients);
router.post('/clients/create', clientController.createClient);
router.put('/clients/:id', clientController.updatedClients);
router.delete('/clients/:id', clientController.deleteClients);
router.get('/clients/search', clientController.searchClients)

export default router;