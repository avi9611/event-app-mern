import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get("/users", protectRoute);

export default router;