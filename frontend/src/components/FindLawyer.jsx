import { useState } from "react";
import {
    GoogleGenerativeAI,
    HarmBlockThreshold,
    HarmCategory,
} from "@google/generative-ai";
import axios from "axios";

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
            const response = await axios.post("http://localhost:5000/api/v1/lawyerlist", {
                "type": text
            });

            if (response.status === 200) {
                // Registration successful, handle accordingly
                console.log("Search successful");
                console.log(response.data.users)
                setLawyerlist(response.data.users)
            } else {
                // Error handling for registration failure
                throw new Error("Search failed");
            }
        } catch (error) {
            console.error("Error:", error.message);
        }
    }

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
        console.log(text)
        await searchLawyer(text)

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
        <div>
            <div>
                <textarea
                    type="text"
                    id="default-input"
                    className="bg-gray-300 text-gray-900 text-md rounded-xl sm:w-5/12 w-full h-md border border-10 border-blue-500 dark:bg-gray-700 dark:text-white dark:border-blue-500 shadow-xl"
                    placeholder="Enter Case Details..."
                    value={caseInput}
                    onChange={(e) => setCaseInput(e.target.value)}
                ></textarea>
            </div>
            <div>
                <button
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                    onClick={(e) => {
                        e.preventDefault(); // Prevent default form submission behavior
                        geminiClassify(caseInput); // Call callGemini with caseInput when form is submitted
                    }}
                >Find Lawyer</button>
            </div>
            <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                {lawyerlist.map((lawyer, index) => (
                    <li key={index} className="pb-3 sm:pb-4">
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <div className="flex-shrink-0">
                                {/* Assuming you have a placeholder image */}
                                <img className="w-8 h-8 rounded-full" src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250" alt="Profile picture" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {lawyer.name} {/* Assuming lawyer object has a name property */}
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {lawyer.email}
                                </p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FindLawyer;
