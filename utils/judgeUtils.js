import judgeScheduleSchema from "../mongodb/models/judge_schedule.js";
import judgeSchema from "../mongodb/models/judge.js";
import caseSchema from "../mongodb/models/case.js";

export async function createJudgeSchedule(judgeID, cases) {
    const judgeSchedule = await judgeScheduleSchema.create({
        judgeID: judgeID,
        cases: cases,
    });
}

// returns judgec schedule by judge id in order of priority
export async function getJudgeSchedule(judgeID) {
    try {
        const judgeSchedule = await judgeScheduleSchema.findOne({
            judgeID: judgeID,
        });
        // cases sorted by priority
        const cases = await caseSchema.find({
            caseID: { $in: judgeSchedule.cases },
        }).sort({ priority: -1 });
        return cases;
    } catch (error) {
        console.log(error);
    }
}

export async function addCaseToJudgeSchedule(judgeID, caseID) {
    try {
        const judgeSchedule = await judgeScheduleSchema.findOne({
            judgeID: judgeID,
        });
        judgeSchedule.cases.push(caseID);
        judgeSchedule.save();
        return judgeSchedule;
    } catch (error) {
        console.log(error);
    }
}

export async function removeCaseFromJudgeSchedule(judgeID, caseID) {
    try {
        const judgeSchedule = await judgeScheduleSchema.findOne({
            judgeID: judgeID,
        });
        judgeSchedule.cases.pull(caseID);
        judgeSchedule.save();
        return judgeSchedule;
    } catch (error) {
        console.log(error);
    }
}

export async function addJudge(judgeID, judgeName, judgeType) {
    const judge = await judgeSchema.create({
        judgeID: judgeID,
        judgeName: judgeName,
        judgeType: judgeType,
    });
}