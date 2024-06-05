import React, { useEffect, useState } from 'react';

function TextGenerator({ textInput, setGeneratedText, generatedText }) {
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [error, setError] = useState(''); // State to manage error messages

  useEffect(() => {
    const chatgptText = async () => {
      setLoading(true); // Set loading to true at the start of the API call
      setError(''); // Clear any previous error messages

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${process.env.API_KEY}`);

      const body = JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: "user", content: `Write content for a pdf for the following prompt, content should be formatted so that it can be inserted into a pdf later: ${textInput}` }],
        max_tokens: 1500,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body,
      };

      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", requestOptions);
        const data = await response.json();
        if (data && data.choices && data.choices.length > 0) {
          setGeneratedText(data.choices[0].message.content);
        } else {
          setError('No content generated. Please try again.');
        }
      } catch (error) {
        setError('Error fetching text: ' + error.message);
      } finally {
        setLoading(false); // Set loading to false after the API call completes
      }
    };

    if (textInput && !generatedText) { // Call API only if text is not already generated
      chatgptText();
    }
  }, [textInput, setGeneratedText,generatedText]);

  return (
    <div>
      {loading && <p className='text-xl text-green-700 m-2 p-2'>Text is being generated...</p>}
      {error && <p>{error}</p>}
      {generatedText && !loading && !error && (
        <div>
          <h1 className='text-xl text-green-700 m-2 p-2'> Text Generated</h1>
        </div>
      )}
    </div>
  );
}

export default TextGenerator;
