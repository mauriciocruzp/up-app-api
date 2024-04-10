import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const createToken = async (payload: object) => {
    dotenv.config();

    const JWT_SECRET = process.env.JWT_SECRET || 'secret';
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "2d",
    });
};

export { createToken };
