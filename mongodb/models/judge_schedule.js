import mongoose from "mongoose";

// cases is an array of case IDs in mongoDB
const judgeSchedule = new mongoose.Schema({
    judgeID: { type: String, required: true },
    cases: { type: [String], required: true },
});

const judgeScheduleSchema = mongoose.model("judgeSchedule", judgeSchedule);

export default judgeScheduleSchema;