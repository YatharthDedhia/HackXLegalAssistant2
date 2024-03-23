import React, { useState } from 'react';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import Anthropic from '@anthropic-ai/sdk';
// const cors = require('cors');
// const express = require('express');
// const app = express();

// app.use(cors())
// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true,            //access-control-allow-credentials:true
//   optionSuccessStatus: 200
// }
// app.use(cors(corsOptions));

const FIRForm = () => {
  const [formData, setFormData] = useState({
    policeStation: '',
    crimeDate: '',
    crimeTime: '',
    crimePlace: '',
    crimeNature: '',
    crimeModeOfCommission: '',
    criminalName: '',
    criminalAddress: '',
    criminalContactNumber: '',
    complainantName: '',
    complainantAddress: '',
    complainantContactNumber: '',
  });

  const [firArray, setFIRArray] = useState([]);
  const [FIRdata, setFIRData] = useState([]); // Array to store submitted FIR data
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState("");

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_UNSPECIFIED,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DEROGATORY,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_TOXICITY,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_VIOLENCE,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUAL,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_MEDICAL,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    }
  ];

  const genAI = new GoogleGenerativeAI(
    ""
  );

  const anthropic = new Anthropic({
    apiKey: '', // defaults to process.env["ANTHROPIC_API_KEY"]
  });

  const mdToDocx = (mdText) => {
    setApiData(mdText)
  }

  const claudeTemplate = async (formData) => {
    const prompt = `
      You are a Legal AI Assistant.
      I am providing you with template for a legal form,
      I am also providing you with details to be filled in the form,
      Take the input submitted in json format by the user and 
      Fill the form and give the output in markdown format.

      Template:
      To,
  The SHO,
  PS (Name of the police station )
  Sub: Registration of FIR.
  Sir,
  Please register a FIR in the facts narrated below
  (Give in specific details the crime including the place of commission of crime, time, date, day and the nature of crime with the details of the mode in which crime was committed, attach all the proof or documents if required)
  Name of the person who has committed the crime
  Address of the person who has committed the crime
  Contact number of the person who has committed crime
  Final paragraph:
  You are requested to register a FIR in the facts stated above and take criminal action against the person named above and to protect the complainant from the said person.
  Thanking you
  Yours
  Name
  Address
  Contact Number
  Enclosures:



  Form Data:
      `+ formData;

    console.log("calling gemini\n" + prompt)
    const text = anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 2048,
      messages: [{
        role: "user",
        content: prompt
      }],
    });
    console.log(text);

    setApiData(text.toString()); // Ensure apiData is a string
    setLoading(false);
  }


  const geminiTemplate = async (formData) => {
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      options: { safetySettings }
    });

    const prompt = `
      You are a Legal AI Assistant.
      I am providing you with template for a legal form,
      I am also providing you with details to be filled in the form,
      Take the input submitted in json format by the user and 
      Fill the form and give the output in markdown format.

      Template:
      To,
  The SHO,
  PS (Name of the police station )
  Sub: Registration of FIR.
  Sir,
  Please register a FIR in the facts narrated below
  (Give in specific details the crime including the place of commission of crime, time, date, day and the nature of crime with the details of the mode in which crime was committed, attach all the proof or documents if required)
  Name of the person who has committed the crime
  Address of the person who has committed the crime
  Contact number of the person who has committed crime
  Final paragraph:
  You are requested to register a FIR in the facts stated above and take criminal action against the person named above and to protect the complainant from the said person.
  Thanking you
  Yours
  Name
  Address
  Contact Number
  Enclosures:



  Form Data:
      `+ formData;

    console.log("calling gemini\n" + prompt)

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text)
    mdToDocx(text)

    setApiData(text.toString()); // Ensure apiData is a string
    setLoading(false);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFIRArray([...firArray, formData]);
    setFIRData([...FIRdata, formData]); // Store the submitted FIR data in FIRdata array
    console.log('Form submitted:', formData);
    claudeTemplate(formData)
    // geminiTemplate(formData)
  };


  return (
    <div>
      <h1>REGISTER FIR</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="policeStation">To the Station House Officer, PS:</label>
          <input
            type="text"
            id="policeStation"
            name="policeStation"
            value={formData.policeStation}
            onChange={handleChange}
            placeholder="Enter Police Station Name"
            required
          />
        </div>

        <div>
          <label htmlFor="crimeDate">Date of Crime:</label>
          <input
            type="date"
            id="crimeDate"
            name="crimeDate"
            value={formData.crimeDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="crimeTime">Time of Crime:</label>
          <input
            type="time"
            id="crimeTime"
            name="crimeTime"
            value={formData.crimeTime}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="crimePlace">Place of Crime:</label>
          <input
            type="text"
            id="crimePlace"
            name="crimePlace"
            value={formData.crimePlace}
            onChange={handleChange}
            placeholder="Enter Place of Crime"
            required
          />
        </div>

        <div>
          <label htmlFor="crimeNature">Nature of Crime:</label>
          <input
            type="text"
            id="crimeNature"
            name="crimeNature"
            value={formData.crimeNature}
            onChange={handleChange}
            placeholder="Enter Nature of Crime"
            required
          />
        </div>

        <div>
          <label htmlFor="crimeModeOfCommission">Mode of Crime Commission:</label>
          <textarea
            id="crimeModeOfCommission"
            name="crimeModeOfCommission"
            value={formData.crimeModeOfCommission}
            onChange={handleChange}
            placeholder="Describe the mode of crime commission and attach any proof or documents."
            required
          />
        </div>

        <div>
          <label htmlFor="criminalName">Name of the Person Who Committed the Crime:</label>
          <input
            type="text"
            id="criminalName"
            name="criminalName"
            value={formData.criminalName}
            onChange={handleChange}
            placeholder="Enter Criminal's Name"
            required
          />
        </div>

        <div>
          <label htmlFor="criminalAddress">Address of the Person Who Committed the Crime:</label>
          <input
            type="text"
            id="criminalAddress"
            name="criminalAddress"
            value={formData.criminalAddress}
            onChange={handleChange}
            placeholder="Enter Criminal's Address"
            required
          />
        </div>

        <div>
          <label htmlFor="criminalContactNumber">Contact Number of the Person Who Committed the Crime:</label>
          <input
            type="tel"
            id="criminalContactNumber"
            name="criminalContactNumber"
            value={formData.criminalContactNumber}
            onChange={handleChange}
            placeholder="Enter Criminal's Contact Number"
            required
          />
        </div>

        <div>
          <label htmlFor="complainantName">Name of the Complainant:</label>
          <input
            type="text"
            id="complainantName"
            name="complainantName"
            value={formData.complainantName}
            onChange={handleChange}
            placeholder="Enter Your Name"
            required
          />
        </div>

        <div>
          <label htmlFor="complainantAddress">Address of the Complainant:</label>
          <input
            type="text"
            id="complainantAddress"
            name="complainantAddress"
            value={formData.complainantAddress}
            onChange={handleChange}
            placeholder="Enter Your Address"
            required
          />
        </div>

        <div>
          <label htmlFor="complainantContactNumber">Contact Number of the Complainant:</label>
          <input
            type="tel"
            id="complainantContactNumber"
            name="complainantContactNumber"
            value={formData.complainantContactNumber}
            onChange={handleChange}
            placeholder="Enter Your Contact Number"
            required
          />
        </div>

        <button type="submit">Submit FIR</button>
      </form>
    </div>
  );
};

export default FIRForm;