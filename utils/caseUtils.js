import caseSchema from "../mongodb/models/case.js";
import { predict_priority } from "../index.js";

//temporary function to get priority from ML model
function getPriorityFromMLModel(caseType, caseDescription) {
    return Math.random() * 10;
}

export async function createCase(caseID, acts, type_name_s, caseDescription, female_defendant, female_petitioner, female_adv_def, female_adv_pet) {
    // replace this with ML model
    const priority = await predict_priority([caseType, acts, female_defendant, female_petitioner,  female_adv_def, female_adv_pet]);
    const newCase = await caseSchema.create({
        caseID: caseID,
        type_name_s: type_name_s,
        judge_position: priority[1],
        caseDescription: caseDescription,
        female_defendant: female_defendant,
        female_petitioner: female_petitioner,
        female_adv_def: female_adv_def,
        female_adv_pet: female_adv_pet,
        case_duration: priority[2],
        priority: Number.parseInt(priority[0])
    });
};

export async function getCase(caseID) {
    try {
        const newCase = await caseSchema.findOne({
            caseID: caseID,
        });
        return newCase;
    } catch (error) {
        console.log(error);
    }
};

await async function addHearingDateToCase(caseID, hearingDate) {
    try {
        const newCase = await caseSchema.findOne({
            caseID: caseID,
        });
        newCase.hearingDates.push(hearingDate);
        const priority = getPriorityFromMLModel(newCase.caseType, newCase.caseDescription);
        newCase.priority = priority;
        newCase.save();
        return newCase;
    } catch (error) {
        console.log(error);
    }
}