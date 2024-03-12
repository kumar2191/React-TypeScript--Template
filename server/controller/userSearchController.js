import httpStatus from "http-status";
import UserSearch from "../model/userSearchModel.js";
import { ReE, ReS, isEmpty, isNull, to } from "../services/util.service.js";
import User from "../model/userModel.js";
import Diseases from "../model/diseasesModel.js";
import Symptom from "../model/symptomModel.js";

export const getAllUserSearch = async (req, res) => {

    let err, getAllUserSearch;

    [err, getAllUserSearch] = await to(UserSearch.find({})
        .populate('diseasesId').populate('symptom').populate("userId"));

    if (err) {
        return ReE(res, err, httpStatus.INTERNAL_SERVER_ERROR);
    }

    return ReS(res, { data: getAllUserSearch }, httpStatus.OK);

}

export const getUserSearchById = async (req, res) => {
    let err, userSearch;

    [err, userSearch] = await to(UserSearch.findById(req.params.id)
        .populate('diseasesId').populate('symptom').populate("userId"));

    if (err) {
        return ReE(res, err, httpStatus.INTERNAL_SERVER_ERROR);
    }

    if (isNull(userSearch)) {
        return ReE(res, "User search not found", httpStatus.BAD_REQUEST);
    }

    return ReS(res, { data: userSearch }, httpStatus.OK);

}

export const getUserSearchByToken = async (req, res) => {
    let err, getUserSearch, user = req.user;

    let checkUser;

    [err, checkUser] = await to(User.find({ _id: user }));

    if (err) {
        return ReE(res, err, httpStatus.INTERNAL_SERVER_ERROR);
    }

    if (isNull(checkUser)) {
        return ReE(res, "User is not found", httpStatus.BAD_REQUEST);
    }

    [err, getUserSearch] = await to(UserSearch.find({ userId: user }).populate('diseasesId')
        .populate('symptom').populate("userId"));

    if (err) {
        return ReE(res, err, httpStatus.INTERNAL_SERVER_ERROR);
    }

    if (isNull(getUserSearch)) {
        return ReE(res, "User search not found", httpStatus.BAD_REQUEST);
    }

    return ReS(res, { data: getUserSearch }, httpStatus.OK);

}

export const createUserSearch = async (req, res) => {
    let err;
    let { symptom, diseasesId } = req.body;
    let userId = req.user;
    console.log(userId);
    let requiredFields = ["symptom", "diseasesId"];

    let invalidFields = requiredFields.filter(x => isNull(req.body[x]));

    if (!isEmpty(invalidFields)) {
        return ReE(res, `Please provide ${invalidFields}`, httpStatus.BAD_REQUEST);
    }

    let checkUser;

    [err, checkUser] = await to(User.findOne({ _id: userId }));

    if (err) {
        return ReE(res, err, httpStatus.INTERNAL_SERVER_ERROR);
    }

    if (isNull(checkUser)) {
        return ReE(res, "User is not found", httpStatus.BAD_REQUEST);
    }

    let checkDiseases;

    [err, checkDiseases] = await to(Diseases.findOne({ _id: diseasesId }));

    if (err) {
        return ReE(res, err, httpStatus.INTERNAL_SERVER_ERROR);
    }

    if (isNull(checkDiseases)) {
        return ReE(res, "Diseases not found", httpStatus.BAD_REQUEST);
    }

    for (let index = 0; index < symptom.length; index++) {
        const element = symptom[index];

        let checkSymptom;

        [err, checkSymptom] = await to(Symptom.findOne({ _id: element }));

        if (err) {
            return ReE(res, err, httpStatus.INTERNAL_SERVER_ERROR);
        }

        if (isNull(checkSymptom)) {
            return ReE(res, `Symptom is not found this id ${element}`, httpStatus.BAD_REQUEST);
        }

        //let symptom are in the diseases

        let checkSymptomInDiseases = checkDiseases.symptoms.includes(element);

        if (!checkSymptomInDiseases) {
            return ReE(res, `Symptom ${element} id is not added in this disease`, httpStatus.BAD_REQUEST);
        }

    }

    let createdUserSearch, createdUserSearchOptions = {
        userId: userId,
        symptom: symptom,
        diseasesId: diseasesId
    };

    [err, createdUserSearch] = await to(UserSearch.create(createdUserSearchOptions));

    if (err) {
        return ReE(res, err, httpStatus.INTERNAL_SERVER_ERROR);
    }

    return ReS(res, { message: "User search created successfully", data: createdUserSearch }, httpStatus.CREATED);

}