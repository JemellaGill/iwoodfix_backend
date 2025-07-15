// src/routes/customer.routes.ts
import express from 'express';
import { showCustomers, addCustomer } from '../controllers/customer.controller';

const router = express.Router();

router.get('/customers', showCustomers);
router.post('/customers', addCustomer); // <- add this


export default router;
