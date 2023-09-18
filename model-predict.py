# from flask import Flask, request, jsonify
import json
from flask import Flask, request, Response
import joblib  # Import joblib for loading the model

app = Flask(__name__)

# Load your trained machine learning model (Replace 'your_model.pkl' with the actual model filename)
priority = joblib.load('priority_model1.pkl')
judge_position= joblib.load('judge_position_model1.pkl')
time = joblib.load('time_model1.pkl')

@app.route('/predictt', methods=['POST'])

def predictt():
    try:
        data = request.get_json(force=True)  # Get data from the POST request
        features = data['features']  # Adjust this based on your data structure
         # Validate the input data (optional)
        # if not isinstance(features, list) or not all(isinstance(f, (int, float)) for f in features):
        #     raise ValueError("Invalid input data format.")
        print('features .......................', features)
        priority_prediction = priority.predict(features)[0]
        priority_names = {
            1: 'Lowest',
            2: 'Low (2)',
            3: 'Low (1)',
            4: 'Medium (3)',
            5: 'Medium (2)',
            6: 'Medium (1)',
            7: 'High (3)',
            8: 'High (2)',
            9: 'High (1)',
            10: 'Critical'
        }# Make a prediction
        print('prediction .......................', priority_names[priority_prediction])
        judge_position_data = {
            0: '3-jmfc',
            1: 'addil. district and sesseions court palghar',
            2: 'additional chief metropolitan magistrate',
            3: 'additional district and sessions court',
            4: 'additional metropolitan magistrate court',
            5: 'cantonment court',
            6: 'chief judicial magistrate',
            7: 'civil court',
            8: 'civil judge',
            9: 'civil judge junior division',
            10: 'civil judge senior division',
            11: 'court of civil judge s.d., kandhar dist. nanded',
            12: 'criminal cases',
            13: 'district and additional sessions court',
            14: 'district and sessions court',
            15: 'gram nyayalaya',
            16: 'District court',
            17: 'jmfc',
            18: 'judicial magistrate court',
            19: 'junior division',
            20: 'juvenile board',
            21: 'metropolitan magistrate court',
            22: 'motor vehicle court',
            23: 'District court',
            24: 'District court, dist.ahmednagar',
            25: 'principal district and sessions court',
            26: 'district court',
            27: 'railway ner',
            28: 'senior division court',
            29: 'shevgaon court'
        }
        judge_position_prediction=judge_position.predict(features)[0]
        print('prediction .......................', judge_position_data[judge_position_prediction])
        time_prediction=round(time.predict(features)[0])
        print('prediction .......................', time_prediction)
        response_data = {'priority_prediction': priority_names[priority_prediction],"judge_position_prediction":judge_position_data[judge_position_prediction],"time_prediction":str(time_prediction)}
        response_json = json.dumps(response_data)  # Convert the dictionary to a JSON string

        # Return JSON response with the appropriate Content-Type header
        return Response(response_json, content_type='application/json'), 200
    except Exception as e:
        error_message = {'error': str(e)}
        response_json = json.dumps(error_message)
        return Response(response_json, content_type='application/json', status=500)

if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)


