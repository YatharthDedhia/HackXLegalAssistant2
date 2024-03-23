import pandas as pd
from pydantic import BaseModel
import os
import spacy
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the desired spaCy model (en_core_web_sm is a good default)
nlp = spacy.load("en_core_web_sm")

# Function to read the contents of a .txt file

def read_txt_file(file_path):
    with open(file_path, 'r') as file:
        content = file.read()
    return content

class Item(BaseModel):
    prompt: str

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

# Create a global DataFrame with the descriptions
global law_data_df
law_data_df = pd.DataFrame(columns=['description'])
law_data_df['case_no'] = law_data_df.reset_index(drop=True) + 1
law_data_df['description'] = descriptions

# Apply the NLP model to the descriptions
law_data_df['nlp'] = law_data_df["description"].apply(lambda x: nlp(x))

#app = FastAPI()
@app.get("/")
async def test():
    return


@app.post("/")
async def root(item: Item):
    global law_data_df  # Declare law_data_df as global
    prompt = item.prompt
    prompt_doc = nlp(prompt)
    print(prompt)

    # Calculate the similarity score between the prompt and each description
    law_data_df['score'] = law_data_df['nlp'].apply(
        lambda x: x.similarity(prompt_doc))

    # Sort the DataFrame by the similarity score in descending order
    law_data_df = law_data_df.sort_values('score', ascending=False)

    # Get the top 3 rows
    top_3 = law_data_df.head(3)

    # Prepare the output dictionary
    output = {"top3": top_3.to_dict(orient='records')}
    # print("OUTPUT", output)
    return {"output": str(output)}
