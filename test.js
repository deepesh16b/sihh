import Express from "express";
import cors from "cors";
import axios from 'axios'
import * as dotenv from "dotenv";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the directory name of the current module file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = new Express();
app.use(cors());
app.use(Express.json()); // Parse JSON request bodies

app.use(Express.static('public'));
const inputArray = [[37,0,0,0,2,2]];  // Adjust this to match your input data format

// Define the Flask API endpoint
const apiUrl = 'http://127.0.0.1:5000/predictt'; // Update with the actual URL
// Send a POST request to the Flask

axios
  .post(apiUrl, { features: inputArray })
  .then((response) => {
    // Handle the prediction response here
    const prediction = response.data.prediction;

    // console.log('Prediction:', prediction);
    console.log('Prediction:', prediction);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
const PORT = 3000;
const startServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log("Server started on port http://localhost:3000");
        });
    } catch (error) {
        console.log(error);
    }
};

startServer();
