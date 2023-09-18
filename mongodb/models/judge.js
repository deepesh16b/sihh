import mongoose from "mongoose";

const judge = new mongoose.Schema({
    judgeID: { type: String, required: true },
    judgeName: { type: String, required: true },
    judgeType: { type: String, required: true },
});

const judgeSchema = mongoose.model("judge", judge);

export default judgeSchema;