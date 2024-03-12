import Jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import { ReE } from '../services/util.service.js';

export default function (req, res, next) {
    const token = req.header('token');
    
    if (!token) {
        return ReE(res, 'No token, authorization denied', httpStatus.UNAUTHORIZED);
    }
    
    let err , decoded;

    [err, decoded] = [null, Jwt.verify(token, process.env.JWT_SECRET)];

    if (err) {
        return ReE(res, 'Token is not valid', httpStatus.UNAUTHORIZED);
    }

    req.user = decoded.user;
    next();

    // try {
    //     const decoded = Jwt.verify(token, process.env.JWT_SECRET);
    //     req.user = decoded.user;
    //     next();
    // } catch (error) {
    //     return ReE(res, 'Token is not valid', httpStatus.UNAUTHORIZED);
    // }

};