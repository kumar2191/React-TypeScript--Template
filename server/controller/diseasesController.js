import Diseases from "../model/diseasesModel.js";
import Symptom from "../model/symptomModel.js";
import { ReE, ReS, isEmpty, isNull, to } from "../services/util.service.js";
import httpStatus from "http-status";

export const getAllDiseases = async (req, res) => {
    let err, diseases;

    [err, diseases] = await to(Diseases.find().populate("symptoms"));

    if (err) {
        return ReE(res, err, httpStatus.INTERNAL_SERVER_ERROR);
    }

    if(isNull(diseases)){
        return ReE(res, "No diseases found", httpStatus.NOT_FOUND);
    }

    return ReS(res, { data:diseases }, httpStatus.OK);

};

export const getDiseaseById = async (req, res) => {
    let err, disease;

    [err, disease] = await to(Diseases.findById(req.params.id).populate("symptoms"));

    if (err) {
        return ReE(res, err, httpStatus.INTERNAL_SERVER_ERROR);
    }

    if(isNull(disease)){
        return ReE(res, "Disease not found", httpStatus.NOT_FOUND);
    }

    return ReS(res, { data:disease }, httpStatus.OK);

};

export const createDisease = async (req, res) => {

    let err;

    let requiredFields = [ "name", "prevention", "treatment" ]

    let invalidFields = requiredFields.filter(x => isNull(req.body[x]));

    if(!isEmpty(invalidFields)){
        return ReE(res, `Please provide ${invalidFields}`, httpStatus.BAD_REQUEST);
    }

    let { name, prevention, treatment, symptoms  } = req.body;
    
    name = String(name).toLowerCase();

    if(name.length < 3 || name.length > 50 ){
        return ReE(res, { message: `Disease name must be at least 3 characters and at most 50 characters!` }, httpStatus.BAD_REQUEST);
    }

    // if(!Array.isArray(prevention)){
    //     return ReE(res, "prevention must given as array", httpStatus.INTERNAL_SERVER_ERROR);
    // }

    // if(!Array.isArray(treatment)){
    //     return ReE(res, "treatment must given as array", httpStatus.INTERNAL_SERVER_ERROR);
    // }

    if(!Array.isArray(symptoms)){
        return ReE(res, "symptoms must given as array", httpStatus.INTERNAL_SERVER_ERROR);
    }

    let checkDis ;

    [err, checkDis] = await to(Diseases.findOne({ name: name }));

    if (err) {
        return ReE(res, err, httpStatus.INTERNAL_SERVER_ERROR);
    }

    if (!isNull(checkDis)) {
        return ReE(res, "Diseases already exists", httpStatus.BAD_REQUEST);
    }

    for (let index = 0; index < symptoms.length; index++) {

        let checkSymptom;
    
        [err, checkSymptom] = await to(Symptom.findOne({ _id:  symptoms[index]}));
    
        if (err) {
            return ReE(res, err, httpStatus.INTERNAL_SERVER_ERROR);
        }
    
        if (isNull(checkSymptom)) {
            return ReE(res, `Symptom is not found this id ${symptoms[index]}`, httpStatus.BAD_REQUEST);
        }
        
    }


    let createdDiseases, createdDiseasesOptions = {
        name: name,
        treatment:treatment,
        symptoms:symptoms,
        prevention:prevention
        // description: description
    };

    [err, createdDiseases] = await to(Diseases.create(createdDiseasesOptions));

    if (err) {
        return ReE(res, err, httpStatus.INTERNAL_SERVER_ERROR);
    }

    return ReS(res, { data: createdDiseases}, httpStatus.CREATED);

};

export const updateAddDiseaseSymptoms = async (req, res) => {

    let err, body = req.body;

    let requiredFields = ["symptomsId", "diseaseId"];

    let invalidFields = requiredFields.filter(x => isNull(body[x]));

    if(!isEmpty(invalidFields)){
        return ReE(res, `Please provide ${invalidFields}`, httpStatus.BAD_REQUEST);
    }

    let { symptomsId, diseaseId } = req.body;

    if(!Array.isArray(symptomsId)){
        return ReE(res, "symptomsId must given as array", httpStatus.INTERNAL_SERVER_ERROR);
    }

    let checkDiseases;

    [err, checkDiseases] = await to(Diseases.findById({ _id: diseaseId }));

    if (err) {
        return ReE(res, err, httpStatus.INTERNAL_SERVER_ERROR);
    }

    if (isNull(checkDiseases)) {
        return ReE(res, "Disease not found", httpStatus.NOT_FOUND);
    }

    for (let index = 0; index < symptomsId.length; index++) {

        let checkSymptom;
    
        [err, checkSymptom] = await to(Symptom.findOne({ _id:  symptomsId[index]}));
    
        if (err) {
            return ReE(res, err, httpStatus.INTERNAL_SERVER_ERROR);
        }
    
        if (isNull(checkSymptom)) {
            return ReE(res, `Symptom is not found this id ${symptomsId[index]}`, httpStatus.BAD_REQUEST);
        }

        //let check the symptoms is already added or not
        let checkSymptomInDiseases = checkDiseases.symptoms.includes(symptomsId[index]);

        if(checkSymptomInDiseases){
            return ReE(res, `Symptom ${symptomsId[index]} id is already added in this disease`, httpStatus.BAD_REQUEST);
        }
        
    }

    let updatedDiseases ,updatedDiseasesOption = [
        ...checkDiseases.symptoms,
        ...symptomsId
    ];

    console.log(updatedDiseasesOption);

    [err, updatedDiseases] = await to(Diseases.findByIdAndUpdate(diseaseId, {symptoms:updatedDiseasesOption}, { new: true }));

    if (err) {
        return ReE(res, err, httpStatus.INTERNAL_SERVER_ERROR);
    }

    return ReS(res, { data: updatedDiseases, message:"symptom add in diseases successfully!" }, httpStatus.OK);

}

export const updateRemoveDiseaseSymptoms = async (req, res) => {
    
    let err, body = req.body;

    let requiredFields = ["symptomsId", "diseasesId"];

    let invalidFields = requiredFields.filter(x => isNull(body[x]));

    if(!isEmpty(invalidFields)){
        return ReE(res, `Please provide ${invalidFields}`, httpStatus.BAD_REQUEST);
    }

    let { symptomsId, diseasesId } = req.body;

    let checkDiseases;

    [err, checkDiseases] = await to(Diseases.findById({ _id: diseasesId }));

    if (err) {
        return ReE(res, err, httpStatus.INTERNAL_SERVER_ERROR);
    }

    if (isNull(checkDiseases)) {
        return ReE(res, "Disease not found", httpStatus.NOT_FOUND);
    }

    let checkSymptom;

    [err, checkSymptom] = await to(Symptom.findOne({ _id:  symptomsId}));

    if (err) {
        return ReE(res, err, httpStatus.INTERNAL_SERVER_ERROR);
    }

    if (isNull(checkSymptom)) {
        return ReE(res, `Symptom is not found this id ${symptomsId}`, httpStatus.BAD_REQUEST);
    }

    //let check the symptoms is already added or not
    let checkSymptomInDiseases = checkDiseases.symptoms.includes(symptomsId);

    if(!checkSymptomInDiseases){
        return ReE(res, `Symptom ${symptomsId} id is not in this disease`, httpStatus.BAD_REQUEST);
    }

    let updatedDiseases ,updatedDiseasesOption = checkDiseases.symptoms.filter(x =>  x != symptomsId);

    [err, updatedDiseases] = await to(Diseases.findByIdAndUpdate(diseasesId, {symptoms:updatedDiseasesOption}, { new: true }));

    if (err) {
        return ReE(res, err, httpStatus.INTERNAL_SERVER_ERROR);
    }

    return ReS(res, { data: updatedDiseases, message:"symptom remove from diseases successfully!" }, httpStatus.OK);

}