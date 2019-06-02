import jwt from "jsonwebtoken"
import { secret } from "./credentials/auth"
import crypto from "crypto"

/**
 * Auth Guard is middleware provide routes security
 * @param req
 * @param res
 * @param next
 * @returns {*|Promise<any>}
 * @constructor
 */
export const authGuard = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['Authorization'] || req.headers['authorization'] // Express headers are auto converted to lowercase
    if (typeof token != "undefined" && token.startsWith('Bearer ')) {
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
 * @param text
 * @returns {{encryptedData: string, iv: string}}
 */
export const encrypt = (text) => {
    let encrypted = crypto.createHmac('sha256', secret)
        .update(text)
        .digest('hex')
    return encrypted;
};
