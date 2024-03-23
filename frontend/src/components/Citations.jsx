import { useEffect, useState } from "react";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import ReactMarkdown from 'react-markdown';

function Citations() {
    const [loading, setLoading] = useState(false);
    const [apiData, setApiData] = useState("");
    const [caseInput, setCaseInput] = useState("");

    const genAI = new GoogleGenerativeAI(
        "AIzaSyCpXuKG4nlPYHe0XDtRn0iiW32KbPQTt9o"
    );

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

    const callGemini = async (caseDetails) => {
        const model = genAI.getGenerativeModel({
            model: "gemini-pro",
            options: { safetySettings }
        });

        const prompt = `
        You are a Legal AI Assistant.
        I am providing you with case details.
        Give me the Sections of constitution applicable to the case
        Give output in JSON format with key being Law Number and value being a very short description of the Law

        Case Details:
        `+ caseDetails;

        console.log("calling gemini\n" + prompt)

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        setApiData(text.toString()); // Ensure apiData is a string
        setLoading(false);
    };

    useEffect(() => {
        // You can call callGemini here if needed on component mount
    }, []);

    return (
        <div className="container">
            <h1>Google Gemini Pro AI Integration With React</h1>

            <form onSubmit={(e) => {
                e.preventDefault(); // Prevent default form submission behavior
                callGemini(caseInput); // Call callGemini with caseInput when form is submitted
            }}>
                <label htmlFor="caseInput" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="text" id="caseInput" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Case Details" required name="caseInput" value={caseInput} onChange={e => setCaseInput(e.target.value)} />

                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>

            <ReactMarkdown>{apiData}</ReactMarkdown>
        </div>
    );
}
export default Citations;
