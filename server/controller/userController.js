import User from "../model/userModel.js";
import { ReE, ReS, isEmail, isEmpty, isNull, to } from "../services/util.service.js";
import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getALLUsers = async (req, res) => {

    let err, users;

    [err, users] = await to(User.find().select("-password"));
    
    if (err) {
        return ReE(res, err, httpStatus.INTERNAL_SERVER_ERROR );
    }
    
    return ReS(res, { data : users }, httpStatus.OK);

}

export const getUserById = async (req, res) => {
    let err, user;
    
    [err, user] = await to(User.findById(req.params.id).select("-password"));
    
    if (err) {
        return ReE(res, err, httpStatus.INTERNAL_SERVER_ERROR );
    }

    if (isNull(user)) {
        return ReE(res, "User not found", httpStatus.BAD_REQUEST);
    }
    
    return ReS(res, { data : user }, httpStatus.OK);
}

export const registerUser = async (req, res) => {
    let err,body = req.body;

    let requiredFields = ["name", "email", "password", "phoneNo", "gender"];

    let invalidFields = requiredFields.filter(x => isNull(body[x]));

    let { name, email, password, phoneNo, gender } = body;
    
    email = String(email).toLowerCase();

    if(!isEmpty(invalidFields)){
        return ReE(res, `Please provide ${invalidFields}`, httpStatus.BAD_REQUEST);
    }

    if(phoneNo.length !== 10 ){
        return ReE(res, { message: `Please enter valid phone number!.` }, httpStatus.BAD_REQUEST);
    }

    if(password.length < 6){
        return ReE(res, { message: `Password must be at least 6 characters!` }, httpStatus.BAD_REQUEST);
    }

    if(name.length < 3 || name.length > 50 ){
        return ReE(res, { message: `Please enter valid name!.` }, httpStatus.BAD_REQUEST);
    }

    if(/^[A-Za-z\s]+$/.test(name) === false){
        return ReE(res, { message: `Please enter valid name!.` }, httpStatus.BAD_REQUEST);
    }

    if(String(name).trim().length<3){
        return ReE(res, { message: "Enter valid name with more then 3 character!." }, httpStatus.BAD_REQUEST);
    }

    if (!isEmail(email)) {
        return ReE(res, { message: "Enter valid email detail!." }, httpStatus.BAD_REQUEST);
    }

    let checkUser, checkUserOptionsForEmail = {
        email: email
    };

    [err, checkUser] = await to(User.findOne(checkUserOptionsForEmail));

    if (err) {
        return ReE(res, err, httpStatus.INTERNAL_SERVER_ERROR );
    }

    if (!isNull(checkUser)) {
        return ReE(res, "User email already exists", httpStatus.BAD_REQUEST);
    }

    let checkUserOptionsForPhoneNo = {
        phoneNo: phoneNo
    };

    [err, checkUser] = await to(User.findOne(checkUserOptionsForPhoneNo));

    if (err) {
        return ReE(res, err, httpStatus.INTERNAL_SERVER_ERROR );
    }

    if (!isNull(checkUser)) {
        return ReE(res, "User phone number already exists", httpStatus.BAD_REQUEST);
    }

    if(gender.toLowerCase() === "male" || gender.toLowerCase() === "female" || gender.toLowerCase() === "others"){
        
        let hashPassword;

        [err, hashPassword] = await to(bcrypt.hash(password, 10));

        let user , userCreate= {
            name: name,
            email: email,
            password: hashPassword,
            phoneNo: phoneNo,
            gender: gender
        };

        [err, user] = await to(User.create(userCreate));

        if (err) {
            return ReE(res, err, httpStatus.INTERNAL_SERVER_ERROR );
        }

        return ReS(res, {message : "user register successfully"}, httpStatus.CREATED);
    }
    
    return ReE(res, { message: "Please enter valid gender like male, female and others!." }, httpStatus.BAD_REQUEST);

};

export const loginUser = async (req, res) => {
    let err, user;
    let body = req.body;

    let requiredFields = ["email", "password"];

    let invalidFields = requiredFields.filter(x => isNull(body[x]));

    if(!isEmpty(invalidFields)){
        return ReE(res, `Please provide ${invalidFields}`, httpStatus.BAD_REQUEST);
    }

    let { email, password } = body;

    email = String(email).toLowerCase();

    let checkUserOptions = {
        email: email
    };

    [err, user] = await to(User.findOne(checkUserOptions));

    if (err) {
        return ReE(res, err, httpStatus.INTERNAL_SERVER_ERROR );
    }

    if (isNull(user)) {
        return ReE(res, "User not found", httpStatus.BAD_REQUEST);
    }

    let isPasswordMatch;

    [err, isPasswordMatch] = await to(bcrypt.compare(password, user.password));

    if (err) {
        return ReE(res, err, httpStatus.INTERNAL_SERVER_ERROR );
    }

    if (!isPasswordMatch) {
        return ReE(res, "Invalid credentials", httpStatus.BAD_REQUEST);
    }

    let token = jwt.sign(
        { user: user._id }, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return ReS(res, { message : "login succesfully", token: token }, httpStatus.OK);
}

export const getUserByToken = async (req, res) => {
    let err, user=req.user,checkUser;
    [err, checkUser] = await to(User.findById(user).select("-password"));

    if (err) {
        return ReE(res, err, httpStatus.INTERNAL_SERVER_ERROR );
    }

    if (isNull(checkUser)) {
        return ReE(res, "User not found", httpStatus.BAD_REQUEST);
    }

    console.log("mass");

    return ReS(res, { data : checkUser }, httpStatus.OK);
};

export const updateUser = async (req, res) => {
    let err, user = req.user, body = req.body;

    let requiredFields = ["name", "phoneNo", "gender"];

    let invalidFields = requiredFields.filter(x => !isNull(body[x]));

    let { name, phoneNo, gender} = body;

    if(isEmpty(invalidFields)){
        return ReE(res, `Please enter something to updated user!.`, httpStatus.BAD_REQUEST);
    }

    if(!isNull(phoneNo) && phoneNo.length !== 10 ){
        return ReE(res, { message: `Please enter valid phone number!.` }, httpStatus.BAD_REQUEST);
    }

    if(!isNull(name) && (name.length < 3 || name.length > 50) ){
        return ReE(res, { message: `Please enter valid name!.` }, httpStatus.BAD_REQUEST);
    }

    if(!isNull(name) && /^[A-Za-z\s]+$/.test(name) === false){
        return ReE(res, { message: `Please enter valid name!.` }, httpStatus.BAD_REQUEST);
    }

    if(!isNull(name) && String(name).trim().length<3){
        return ReE(res, { message: "Enter vaild name with more then 3 character!." }, httpStatus.BAD_REQUEST);
    }

    let checkUser;

    [err, checkUser] = await to(User.findById(user));

    if (err) {
        return ReE(res, err, httpStatus.INTERNAL_SERVER_ERROR );
    }

    if (isNull(checkUser)) {
        return ReE(res, "User not found", httpStatus.BAD_REQUEST);
    }

    let updatedField = requiredFields.filter(x => body[x] != checkUser[x]);

    if (isEmpty(updatedField)) {
        return ReE(res, { message: `Please edit something to updated user!.` }, httpStatus.BAD_REQUEST);
    }

    if(!isNull(phoneNo) && phoneNo != checkUser.phoneNo){

        let checkUserOptionsForPhoneNo = {
            phoneNo: phoneNo
        };

        [err, checkUser] = await to(User.findOne(checkUserOptionsForPhoneNo));

        if (err) {
            return ReE(res, err, httpStatus.INTERNAL_SERVER_ERROR );
        }

        if (!isNull(checkUser)) {
            return ReE(res, "User phone number already exists", httpStatus.BAD_REQUEST);
        }

    }

    let userUpdate = {
        name: name || checkUser.name,
        phoneNo: phoneNo || checkUser.phoneNo,
        gender: gender || checkUser.gender
    };

    [err, user] = await to(User.findByIdAndUpdate(user, userUpdate, { new: true }));

    if (err) {
        return ReE(res, err, httpStatus.INTERNAL_SERVER_ERROR );
    }

    if(isNull(user)){
        return ReE(res, "something went wrong for updating user", httpStatus.BAD_REQUEST);
    }

    return ReS(res, { message : "user update successfully", data : user }, httpStatus.OK);

}