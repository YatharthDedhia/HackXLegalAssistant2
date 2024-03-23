import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";

const NameChange = () => {
  const navigate = useNavigate()
  const [nameData, setNameData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState("");
  const [caseInput, setCaseInput] = useState("");

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
    },
  ];

  const genAI = new GoogleGenerativeAI(
    "AIzaSyCpXuKG4nlPYHe0XDtRn0iiW32KbPQTt9o"
  );


  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    motherName: '',
    age: '',
    currentAddress: '',
    previousName: '',
    dateOfChange: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const geminiTemplate = async (caseDetails) => {
    console.log(caseDetails)
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      options: { safetySettings },
    });

    const prompt =
      `
    You are a Legal AI Assistant.
    I am providing you with a template for a legal name change document and the details to be filled in the form.
    Give output in Markdown format in proper format as is given in the template as per the law.

`+ caseDetails + `
    
    Add values from this json at appropriate places in the following affidavit template
  
    Template = 
    I, ———————–S/o———————/Daughter of ——————-, aged  ———-years, resident of ——————–, do hereby solemnly affirm and declare as under:
1.That my name as per the records is —————-(XYZ).
2.That I have changed my name as ___ on (date of change of name).
3.At present all the records have my new name ___.
4. I state that (earlier name) and the (present name) is the name of one and the same person and that is myself.
I am executing this declaration to be submitted to the concerned authorities for the change of name.
I hereby state that whatever is stated herein above are true to the best of my knowledge.

Deponent
VERIFICATION:
Verified on this day (enter date)that the contents of the affidavit are true and correct, nothing material has been concealed and no part of it is false.
Deponent.


output should be affidavit in markdown format with json values filled in.



    Case Details:
    ` + caseDetails;

    console.log("calling gemini\n" + prompt);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    setApiData(text.toString()); // Ensure apiData is a string
    setLoading(false);
    localStorage.setItem("nameChangeData", text)
    navigate('/namechange')
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const newNameData = [...nameData, formData];
    setNameData(newNameData);

    console.log('Name Change Data submitted:', formData);
    console.log('Name Data array:', newNameData);

    setFormData({
      fullName: '',
      fatherName: '',
      motherName: '',
      age: '',
      currentAddress: '',
      previousName: '',
      dateOfChange: '',
    });

    geminiTemplate(JSON.stringify(formData))
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fullName">Full Name:</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="fatherName">Father's Name:</label>
        <input
          type="text"
          id="fatherName"
          name="fatherName"
          value={formData.fatherName}
          onChange={handleChange}
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="motherName">Mother's Name:</label>
        <input
          type="text"
          id="motherName"
          name="motherName"
          value={formData.motherName}
          onChange={handleChange}
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="currentAddress">Current Address:</label>
        <input
          type="text"
          id="currentAddress"
          name="currentAddress"
          value={formData.currentAddress}
          onChange={handleChange}
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="previousName">Previous Name:</label>
        <input
          type="text"
          id="previousName"
          name="previousName"
          value={formData.previousName}
          onChange={handleChange}
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="dateOfChange">Date of Name Change:</label>
        <input
          type="date"
          id="dateOfChange"
          name="dateOfChange"
          value={formData.dateOfChange}
          onChange={handleChange}
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <button type="submit">Submit Affidavit</button>
    </form>
  );
}

export default NameChange;