import User from '../model/userModel.js';
import { ReE, isNull, to } from '../services/util.service.js';
import httpStatus from 'http-status';


export default async function isOwner (req, res, next) {  
    let err, getUser;
    
    [err,getUser] = await to(User.findById({_id:req.user}))

    if (err) {
        return ReE(res, err, httpStatus.INTERNAL_SERVER_ERROR );
    }

    if(isNull(getUser)){
        return ReE(res, "token details is invalid", httpStatus.NOT_FOUND);
    }

    if(getUser.isAdmin){
        return next();
    }

    ReE(res, 'You are not authorized to perform this operation', httpStatus.UNAUTHORIZED);

}