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

  export default prediction;
  