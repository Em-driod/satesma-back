import express from 'express';
import { loginAdmin } from '../controllers/adminController';

const router = express.Router();

// @route   POST api/admin/login
// @desc    Auth admin & get token
// @access  Public
router.post('/login', loginAdmin);

export default router;
