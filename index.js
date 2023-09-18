import Express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import axios from 'axios'
import bodyParser from "body-parser"
dotenv.config();

import connectDB from "./mongodb/connect.js";

import {
  addCaseToJudgeSchedule,
  addJudge,
  createJudgeSchedule,
  getJudgeSchedule,
} from "./utils/judgeUtils.js";

import judgeRouter from "./routes/judgeRouter.js";
import { createCase } from "./utils/caseUtils.js";

// ----------------------------------------------------------------------

const app = new Express();
app.use(cors());
app.use(Express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(Express.static("public"));
app.use("/api/judge", judgeRouter);

// --------------------------------------------------------------------

const predict_priority = async (inputArray) => {
    const apiUrl = "http://127.0.0.1:5000/predictt";
    try {
        const response = await axios.post(apiUrl, { features: inputArray });
        const {priority_prediction, judge_position_prediction, time_prediction} = response.data;
        console.log("Prediction:", priority_prediction, judge_position_prediction, time_prediction);
        return [priority_prediction, judge_position_prediction, time_prediction];
    } catch (error) {
        console.error("Error:", error);
        throw error; // You can choose to handle or propagate the error as needed
    }
};

// ---------------------------------------------------------------------

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", async (req, res) => {
  console.log("Received request");
  console.log(req.body);
  const {type_name_s,act_s,female_petitioner,description,date_of_filling, female_defendant,female_adv_def,female_adv_pet} = req.body;
  const inputArray = [[type_name_s, act_s, female_defendant, female_petitioner, female_adv_def, female_adv_pet]];
  const input_case_data = await predict_priority(inputArray);
  res.send("input case: ",inputArray, "prediction: ", input_case_data);
  console.log(input_case_data);
});

// ----------------------------------------------------------------------

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => {
      console.log("Server started on port http://localhost:8080");
    });
    // console.log(await getJudgeSchedule("1"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
