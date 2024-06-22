import express from 'express';
import { createOrder, getOrders, getUserOder, getOrder, updateOder } from '../controllers/orderController.js';

export const router = express.Router()

router.post('/order', createOrder)

router.get("/:uid", getUserOder);
router.get("/", getOrders);

export default router;



