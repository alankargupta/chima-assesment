import React, { useEffect, useState } from 'react';

function ImageGenerator({ textInput, setImageUrl, imageUrl }) {
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [error, setError] = useState(''); // State to manage error messages

  useEffect(() => {
    const dalleImage = async () => {
      setLoading(true); // Set loading to true at the start of the API call
      setError(''); // Clear any previous error messages

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`);

      const body = JSON.stringify({
        model: 'dall-e-3',
        prompt: `Generate multiple images for a pdf for the following prompt: ${textInput}`,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body,
      };

      try {
        const response = await fetch("https://api.openai.com/v1/images/generations", requestOptions);
        const data = await response.json();
        if (data && data.data && data.data.length > 0) {
          setImageUrl(data.data[0].url);
        } else {
          setError('No image generated. Please try again.');
        }
      } catch (error) {
        setError('Error fetching image: ' + error.message);
      } finally {
        setLoading(false); // Set loading to false after the API call completes
      }
    };

    if (textInput && !imageUrl) { // Call API only if image is not already generated
        dalleImage();
      }
  }, [textInput, setImageUrl, imageUrl]);

  return (
    <div>
      {loading && <p className='text-xl text-green-700 m-2 p-2'>Image is being generated...</p>}
      {error && <p>{error}</p>}
      {imageUrl && !loading && !error && (
        <div>
          <h1 className='text-xl text-green-700 m-2 p-2'> Image Generated</h1>
        </div>
      )}
    </div>
  );
}

export default ImageGenerator;
