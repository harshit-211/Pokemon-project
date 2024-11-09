import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const SECRET = "bankai";
export const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
    const authHeaders = req.headers.authorization;
    if (authHeaders) {
        const token = authHeaders.split(' ')[1];
        jwt.verify(token, SECRET, (err, payload) => {
            if (err) {
                console.error("Token verification failed", err);
                return res.sendStatus(403);
            }

            if (!payload) {
                console.error("No payload in token");
                return res.sendStatus(403);
            }

            if (typeof payload === "string") {
                console.error("Payload is a string");
                return res.sendStatus(403);
            }

            req.headers["userId"] = payload.id;
            console.log("User ID set in headers:", payload.id);
            next();
        });
    } else {
        console.error("Authorization header missing");
        res.sendStatus(403);
    }
};
