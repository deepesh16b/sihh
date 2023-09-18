import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const caseSch = new mongoose.Schema({
    caseID: { type: String, required: true },
    // caseName: { type: String, required: true },
    type_name_s: { type: String, required: true },
    judge_position: { type: String, required: true },
    // hearingDates: {
    //     type: [
    //         {
    //             datetime: { type: Date, required: true },
    //         },
    //     ],
    //     required: true,
    // },
    // caseStatus: { type: String, required: true },
    caseDescription: { type: String, required: false },
    priority: { type: Number, required: true },
    female_defendant: { type: Number, required: true },
    female_petitioner: { type: Number, required: true },
    female_adv_def: { type: Number, required: true },
    female_adv_pet: { type: Number, required: true },
    case_duration: { type: Number, required: true },
});

const caseSchema = mongoose.model("case", caseSch);

export default caseSchema;
