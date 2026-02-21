import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const loginAdmin = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        // Hardcoded admin credentials
        const ADMIN_USERNAME = 'ilerioluwasam';
        const ADMIN_PASSWORD = '1202';

        if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: 'admin', username: ADMIN_USERNAME }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
        res.json({ token, admin: { id: 'admin', username: ADMIN_USERNAME } });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
