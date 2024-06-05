import React, { useState } from 'react';
import TextGenerator from './TextGenerator';
import ImageGenerator from './ImageGenerator';
import PdfGenerator from './PdfGenerator';

function Body() {
    const [textInput, setTextInput] = useState(""); // State to manage the text input value
    const [submittedInput, setSubmittedInput] = useState(""); // State to manage the submitted input
    const [generatedText, setGeneratedText] = useState(''); // State to store the generated text
    const [imageUrl, setImageUrl] = useState(''); // State to store the generated image URL

    // Handle input change
    const handlePrompt = (e) => {
        setTextInput(e.target.value);
    };

    // Handle form submission
    const handlePromptSubmit = () => {
        setSubmittedInput(textInput);
    };

    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
            {/* Header */}
            <h1 className="text-green-700 text-4xl mb-6">Enter Prompt</h1>

            {/* Input field */}
            <input
                type="text"
                className="bg-gray-100 border border-gray-300 p-4 rounded-lg w-full mb-6 text-black h-16"
                value={textInput}
                onChange={handlePrompt}
                placeholder="Type your prompt here..."
            />

            {/* Submit button */}
            <button
                className="bg-green-700 text-white py-3 px-6 rounded-lg hover:bg-green-800 transition duration-300"
                onClick={handlePromptSubmit}
            >
                Submit
            </button>

            {/* Conditionally render the generators if input is submitted */}
            {submittedInput && (
                <div className="mt-8">
                    <TextGenerator textInput={submittedInput} setGeneratedText={setGeneratedText} generatedText={generatedText} />
                    <ImageGenerator textInput={submittedInput} setImageUrl={setImageUrl} imageUrl={imageUrl} />
                </div>
            )}

            {/* PDF Generator */}
            <div className="mt-8">
                <PdfGenerator imageUrl={imageUrl} generatedText={generatedText} />
            </div>
        </div>
    );
}

export default Body;
