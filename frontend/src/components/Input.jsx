import { useEffect, useState } from "react";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import ReactMarkdown from "react-markdown";

const Input = () => {
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
  const geminiSummarize = async (caseDetails) => {
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      options: { safetySettings },
    });

    const prompt =
      `
    You are a Legal AI Assistant.
    I am providing you with case details.
    Summarise this pointwise for me!

    Case Details:
    ` + caseDetails;

    console.log("calling gemini\n" + prompt);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    setApiData(text.toString()); // Ensure apiData is a string
    setLoading(false);
  };

  const geminiCitations = async (caseDetails) => {
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      options: { safetySettings },
    });

    const prompt =
      `
    You are a Legal AI Assistant.
    I am providing you with case details.
    Give me the Sections of constitution applicable to the case
    Give output in Markdown format,pointwise with key being Law Number and value being a very short description of the Law

    Case Details:
    ` + caseDetails;

    console.log("calling gemini\n" + prompt);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    setApiData(text.toString()); // Ensure apiData is a string
    setLoading(false);
  };


  return (
    <div className="contianer flex justify-center items-center h-screen ">
      <div className="input-field  sm:w-full sm:px-10 mb-10 ">
        <div className="tagline sm:mt-20 mt-20 ">
          <p className="text-5xl mx-10 font-bold text-wrap text-blue-500 text-center   ">
            Meet your new AI legal assistant{" "}
          </p>
          <p className="text-gray-400 font-xl text-center mt-3 w-1/2 mx-auto">
            CoCounsel does document review,deposition preparation, contract
            analysis, and timeline creation in minutes—with results you can
            trust.
          </p>
        </div>

        <div class="mb-6 sm:w-full flex flex-col sm:mx-auto mt-10 items-center ">
          <div className="input-containers flex flex-col justify-center items-center gap-5 w-full p-4">
            <textarea
              type="text"
              id="default-input"
              class="bg-gray-300 text-gray-900 text-xl pt-4 rounded-xl w-3/4 h-16 border border-10 border-blue-500 dark:bg-gray-700 dark:text-white dark:border-blue-500 shadow-xl"
              placeholder="Enter Case Details..."
              value={caseInput}
              onChange={(e) => setCaseInput(e.target.value)}
            ></textarea>
            <p> OR </p>
            <form action="/upload" method="post" enctype="multipart/form-data">
              <div class="fileinput">
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  for="file_input"
                >
                  Upload file
                </label>
                <input
                  class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-blue-500 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="file_input_help"
                  id="file_input"
                  name="image"
                  type="file"
                  accept='image/*'
                />
                <p
                  class="mt-1 text-sm text-gray-500 dark:text-gray-300"
                  id="file_input_help"
                >
                  SVG, PNG, JPG or GIF
                </p>
              </div>
            </form>
          </div>
          <div className="buttons mt-10">
          <button
          class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
          onClick={(e) => {
            e.preventDefault(); // Prevent default form submission behavior
            geminiSummarize(caseInput); // Call callGemini with caseInput when form is submitted
          }}
        >
          <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Summarize
          </span>
        </button>
        <button
          class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
          onClick={(e) => {
            e.preventDefault(); // Prevent default form submission behavior
            geminiCitations(caseInput); // Call callGemini with caseInput when form is submitted
          }}
        >
          <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Citation
          </span>
        </button>
        <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
          <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Similar Case
          </span>
        </button>
          </div>
          <div class="output-field bg-gray-300 border border-10 border-blue-500 text-gray-900 text-md rounded-xl w-3/4 block p-4 dark:bg-gray-700 dark:text-white dark:border-blue-500 overflow-y-auto h-56 text-left mt-5 text-xl ">
            <ReactMarkdown>{apiData}</ReactMarkdown>
          </div>
        </div>

  
      </div>
    </div>
  );
};

export default Input;
