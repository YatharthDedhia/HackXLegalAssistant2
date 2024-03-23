import { useState } from "react";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import axios from "axios";
import Spinner from "./Spinner";

const FindLawyer = () => {
  const [caseInput, setCaseInput] = useState("");
  const [apiData, setApiData] = useState("");
  const [loading, setLoading] = useState(false);
  const [lawyerlist, setLawyerlist] = useState([]);

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

  const searchLawyer = async (text) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/lawyerlist",
        {
          type: text,
        }
      );

      if (response.status === 200) {
        // Registration successful, handle accordingly
        console.log("Search successful");
        console.log(response.data.users);
        setLawyerlist(response.data.users);
      } else {
        // Error handling for registration failure
        throw new Error("Search failed");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const geminiClassify = async (caseDetails) => {
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      options: { safetySettings },
    });

    const prompt =
      `
        You are a Legal AI Assistant.
        I am providing you with all the categories of lawyers present.
        I am also providing you with a case information.
        Classify this case as one of the categories of lawyers which would be most helpful for the given case
        give output as a single word as the category name
        
        
        categories:
        Civil,Criminal,Family,Corporate,Other
        
        
        Case Details:
        ` + caseDetails;

    console.log("calling gemini\n" + prompt);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    await searchLawyer(text);

    // await setApiData(text.toString()); // Ensure apiData is a string
    // try {
    //     console.log(JSON.parse(apiData))
    // }
    // catch {
    //     console.log("error parsing")
    // }
    setLoading(false);
  };

  return (
    <div class="container  w-full radial-gradient-custom">
    <div class="flex flex-col justify-center items-center h-screen w-full radial-gradient-custom text-white">
        <div class="text-4xl font-bold mb-8">
            Find Top Lawyers to Assist You
        </div>
        <div class="w-full max-w-lg">
            <textarea
                type="text"
                id="default-input"
                class="bg-gray-100 text-gray-900 text-md rounded-xl w-full h-40 border-2 border-blue-500 dark:bg-gray-800 dark:text-white dark:border-blue-500 shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 pl-4 resize-none"
                placeholder="Enter Case Details..."
                value={caseInput}
                onChange={(e) => setCaseInput(e.target.value)}
            ></textarea>
        </div>
        <div>
            <button
                class="inline-block px-4 py-2 text-md font-medium text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-5"
                onClick={(e) => {
                    e.preventDefault(); // Prevent default form submission behavior
                    geminiClassify(caseInput); // Call callGemini with caseInput when form is submitted
                }}
            >
                Find Lawyer
            </button>
        </div>
        <ul class="w-full max-w-md mt-8">
            {lawyerlist.map((lawyer, index) => (
                <li key={index} class="py-4 px-6 mb-6 bg-white rounded-lg shadow-md">
                    <div class="flex items-center space-x-4">
                        <div>
                            <img class="w-10 h-10 rounded-full" src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250" alt="Profile picture" />
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-base font-semibold text-gray-800 truncate">{lawyer.name}</p>
                            <p class="text-sm text-gray-600 truncate">{lawyer.email}</p>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    </div>
</div>

  );
};

export default FindLawyer;
