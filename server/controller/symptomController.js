import httpStatus from "http-status";
import { ReE, ReS, isEmpty, isNull, to } from "../services/util.service.js";
import Symptom from "../model/symptomModel.js";

export const getAllSymptoms = async (req, res) => {

    let err, symptoms;

    [err, symptoms] = await to(Symptom.find());

    if (err) {
        return ReE(res, err, httpStatus.INTERNAL_SERVER_ERROR);
    }

    if(isNull(symptoms)){
        return ReE(res, "No symptoms found", httpStatus.NOT_FOUND);
    }

    return ReS(res, { data:symptoms }, httpStatus.OK);

}

export const getSymptomById = async (req, res) => {
    let err, symptom;

    [err, symptom] = await to(Symptom.findById(req.params.id));

    if (err) {
        return ReE(res, err, httpStatus.INTERNAL_SERVER_ERROR);
    }

    if(isNull(symptom)){
        return ReE(res, "Symptom not found", httpStatus.NOT_FOUND);
    }

    return ReS(res, { data:symptom }, httpStatus.OK);

}

export const createSymptom = async (req, res) => {
    let err;

    let requiredFields = ["name"];

    let invalidFields = requiredFields.filter(x => isNull(req.body[x]));

    if(!isEmpty(invalidFields)){
        return ReE(res, `Please provide ${invalidFields}`, httpStatus.BAD_REQUEST);
    }

    let { name } = req.body;
    name = String(name).toLowerCase();
    
    if(name.length < 3 || name.length > 150 ){
        return ReE(res, { message: `Symptom name must be at least 3 characters and at most 150 characters!` }, httpStatus.BAD_REQUEST);
    }

    let createdSymptom, createdSymptomOptions = {
        name: name
    };

    let checkDiseasesSymptom;

    [err, checkDiseasesSymptom] = await to(Symptom.findOne(createdSymptomOptions));

    if (err) {
        return ReE(res, err, httpStatus.INTERNAL_SERVER_ERROR);
    }

    if (!isNull(checkDiseasesSymptom)) {
        return ReE(res, "Symptom already exists", httpStatus.BAD_REQUEST);
    }

    [err, createdSymptom] = await to(Symptom.create(createdSymptomOptions));

    if (err) {
        return ReE(res, err, httpStatus.INTERNAL_SERVER_ERROR);
    }

    return ReS(res, { data:createdSymptom,message:"symptom created successfully!" }, httpStatus.CREATED);

};

export const updateSymptom = async (req, res) => {
    let err, body = req.body;

    let requiredFields = ["name"];

    let invalidFields = requiredFields.filter(x => !isNull(body[x]));

    if(isEmpty(invalidFields)){
        return ReE(res, `Please enter something to updated symptom!.`, httpStatus.BAD_REQUEST);
    }

    let { name, symptomId } = req.body;
    name = String(name).toLowerCase();

    if(isNull(symptomId)){
        return ReE(res, `Please provide symptomId in body`, httpStatus.BAD_REQUEST);
    }

    let checkSymptom;

    [err, checkSymptom] = await to(Symptom.findById({ _id: symptomId }));

    if (err) {
        return ReE(res, err, httpStatus.INTERNAL_SERVER_ERROR);
    }

    if (isNull(checkSymptom)) {
        return ReE(res, "Symptom not found", httpStatus.NOT_FOUND);
    }

    let sameValue = requiredFields.filter(x => checkSymptom[x] === req.body[x]);

    if(sameValue.length === requiredFields.length){
        return ReE(res, "Please edit to updated symptom!", httpStatus.BAD_REQUEST);
    }

    [err, checkSymptom] = await to(Symptom.findOne({ name: name}));

    if (err) {
        return ReE(res, err, httpStatus.INTERNAL_SERVER_ERROR);
    }

    if (!isNull(checkSymptom)) {
        return ReE(res, "Symptom already exists", httpStatus.BAD_REQUEST);
    }


    let updatedSymptom, updatedSymptomOptions = {
        name: name || checkSymptom.name,
    };

    [err, updatedSymptom] = await to(Symptom.findByIdAndUpdate(symptomId, updatedSymptomOptions, { new: true }));

    if (err) {
        return ReE(res, err, httpStatus.INTERNAL_SERVER_ERROR);
    }

    return ReS(res, { data:updatedSymptom, message:"symptom updated successfully" }, httpStatus.OK);

};
