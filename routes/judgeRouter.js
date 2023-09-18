import { Router } from "express";

import {
    addCaseToJudgeSchedule,
    createJudgeSchedule,
    getJudgeSchedule,
} from "../utils/judgeUtils.js";

const judgeRouter = Router();

// gets judge schedule by judge id
judgeRouter.route("/:judgeId").get(async (req, res) => {
    console.log(req.params.judgeId);
    const judgeID = req.params.judgeId;
    const judgeSchedule = await getJudgeSchedule(judgeID);
    res.send(judgeSchedule);
});

// creates judge schedule by judge id and array of case ids
judgeRouter.route("/:judgeId").post(async (req, res) => {
    const judgeID = req.params.judgeId;
    const cases = req.body.cases;
    const judgeSchedule = await createJudgeSchedule(judgeID, cases);
    res.send(judgeSchedule);
});

// adds case to judge schedule by judge id and case id
judgeRouter.route("/add").post(async (req, res) => {
    const judgeID = req.body.judgeId;
    const caseID = req.body.caseId;
    const judgeSchedule = await addCaseToJudgeSchedule(judgeID, caseID);
    res.send(judgeSchedule);
});

export default judgeRouter;
