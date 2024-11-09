"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJwt = exports.SECRET = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.SECRET = "bankai";
const authenticateJwt = (req, res, next) => {
    const authHeaders = req.headers.authorization;
    if (authHeaders) {
        const token = authHeaders.split(' ')[1];
        jsonwebtoken_1.default.verify(token, exports.SECRET, (err, payload) => {
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
    }
    else {
        console.error("Authorization header missing");
        res.sendStatus(403);
    }
};
exports.authenticateJwt = authenticateJwt;
