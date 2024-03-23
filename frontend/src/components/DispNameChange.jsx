import ReactMarkdown from "react-markdown";

const NameChange = () => {
    const text = localStorage.getItem("nameChangeData")
    return (
        <div class="output-field bg-white border border-10 border-blue-500 text-black text-md rounded-xl w-3/4 block p-4 dark:bg-gray-700 dark:text-white dark:border-blue-500 overflow-y-auto h-96 text-left mt-5 text-xl ">
            <ReactMarkdown>{text}</ReactMarkdown>
        </div>
    );
}

export default NameChange;