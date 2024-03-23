import { useEffect, useState } from "react";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import Spinner from "./Spinner";

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

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      const base64String = await convertImageToBase64(file);
      const { data } = await axios.post("http://127.0.0.1:5001/ocr", {
        image: base64String,
      });
      setCaseInput(data.text);
    } catch (error) {
      console.error("Error while uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  const geminiSummarize = async (caseDetails) => {
    setLoading(true);
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
    setLoading(true);
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

  const similarCases = async (caseDetails) => {
    setLoading(true);
    console.log(JSON.stringify({ prompt: caseDetails }));
    try {
      const response = await fetch("http://127.0.0.1:8000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: caseDetails }),
        // mode: "no-cors"
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      // console.log(JSON.parse(data.output));
      setApiData(data.output);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contianer flex justify-center items-center h-screen radial-gradient-custom">
      <div className="input-field  sm:w-full sm:px-10 mb-10 ">
        <div className="tagline sm:mt-2 mt-20">
          <p className="text-5xl mx-10 font-bold text-wrap text-center text-gray-800 dark:text-blue-600 text-shadow-md md:text-shadow-lg lg:text-shadow-xl">
            Meet your new AI legal assistant
          </p>
          <p className="text-gray-700 font-xl font-semibold text-center mt-3 w-1/2 mx-auto">
            Legal AI does document review, summary and citation generation, find
            a appropriate lawyer, and legal document template generation in
            minutes—with results you can trust.
          </p>
        </div>
        <div class="mb-6 sm:w-full flex flex-row sm:mx-auto mt-10 items-center ">
          <div className="input-containers flex flex-col justify-center items-center gap-5 w-full p-4">
            <textarea
              type="text"
              id="default-input"
              class="bg-white text-black font-semibold text-xl pt-4 rounded-xl w-3/4 h-16 border border-10 border-blue-500 dark:bg-gray-700 dark:text-white dark:border-blue-500 shadow-xl"
              placeholder="Enter Case Details..."
              value={caseInput}
              onChange={(e) => setCaseInput(e.target.value)}
            ></textarea>
            <p className="text-white text-2xl font-bold"> OR </p>
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
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <p
                  class="mt-1 text-md text-black font-semibold  dark:text-gray-300"
                  id="file_input_help"
                >
                  SVG, PNG, JPG or GIF
                </p>
              </div>
            </form>
            <div className="buttons mt-7">
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
              <button
                class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default form submission behavior
                  similarCases(caseInput); // Call callGemini with caseInput when form is submitted
                }}
              >
                <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Similar Case
                </span>
              </button>
            </div>
          </div>

          <div class="output-field bg-white border border-10 border-blue-500 text-black text-md rounded-xl w-3/4 block p-4 dark:bg-gray-700 dark:text-white dark:border-blue-500 overflow-y-auto h-96 text-left mt-5 text-xl ">
            {loading ? (
              <div role="status" className="flex justify-center items-center h-full">
                <svg
                  aria-hidden="true"
                  class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>  
                <span class="sr-only">Loading...</span>
              </div>
            ) : (
              <ReactMarkdown>{apiData}</ReactMarkdown>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Input;
  

