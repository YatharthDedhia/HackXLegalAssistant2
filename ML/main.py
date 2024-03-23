from flask import Flask, request, jsonify
import pandas as pd
import os
import spacy

# Initialize Flask app
app = Flask(__name__)

# Load the desired spaCy model (en_core_web_sm is a good default)
nlp = spacy.load("en_core_web_sm")

# Function to read the contents of a .txt file
def read_txt_file(file_path):
    with open(file_path, 'r') as file:
        content = file.read()
    return content

# Directory containing the .txt files
txt_files_dir = "cases"

# List to store descriptions
descriptions = []

# Iterate over each .txt file in the directory
for file_name in os.listdir(txt_files_dir):
    if file_name.endswith(".txt"):
        file_path = os.path.join(txt_files_dir, file_name)
        content = read_txt_file(file_path)
        descriptions.append(content)

# Update the 'description' attribute in law_data_df with the contents of the .txt files
law_data_df = pd.DataFrame(columns=['description'])
law_data_df['case no'] = law_data_df.reset_index(drop=True) + 1
law_data_df['description'] = descriptions

@app.route("/")
def index():
    return "Welcome to the Law Data API!"

@app.route("/cases",method=['POST'])
def get_cases():
    prompt = request.args.get('prompt')
    if not prompt:
        return "Error: 'prompt' parameter is required.", 400
    
    prompt_doc = nlp(prompt)
    law_data_df['score'] = law_data_df['nlp'].apply(lambda x: x.similarity(prompt_doc))
    law_data_df_sorted = law_data_df.sort_values('score', ascending=False)
    top_cases = law_data_df_sorted[:2].to_dict(orient='records')
    return jsonify(top_cases)

if __name__ == "__main__":
    app.run(debug=True)
