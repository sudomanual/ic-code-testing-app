import jwt from "jsonwebtoken"
import { secret } from "./credentials/auth"
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const iv = crypto.randomBytes(16);

/**
 * Auth Guard is middleware provide routes security
 * @param req
 * @param res
 * @param next
 * @returns {*|Promise<any>}
 * @constructor
 */
export const authGuard = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'] // Express headers are auto converted to lowercase
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length)
    }

    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: 'Token is not valid'
                })
            } else {
                req.decoded = decoded
                next()
            }
        })
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        })
    }
};


/**
 * Encrypt text
 * @param password
 * @param callback
 */
export const encrypt = (text) => {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secret), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}
