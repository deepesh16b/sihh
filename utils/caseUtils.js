import caseSchema from "../mongodb/models/case.js";

//temporary function to get priority from ML model
function getPriorityFromMLModel(caseType, caseDescription) {
    return Math.random() * 10;
}

export async function createCase(caseID, caseName, caseType, hearingDates, caseStatus, caseDescription, caseDocuments) {
    // replace this with ML model
    const priority = getPriorityFromMLModel(caseType, caseDescription);
    const newCase = await caseSchema.create({
        caseID: caseID,
        type_name_s: type_name_s,
        judge_position: judge_position,
        caseDescription: caseDescription,
        female_defendant: female_defendant,
        female_petitioner: female_petitioner,
        female_adv_def: female_adv_def,
        female_adv_pet: female_adv_pet,
        case_duration: case_duration,
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