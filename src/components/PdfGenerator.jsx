import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

function PdfGenerator({ imageUrl, generatedText }) {
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [error, setError] = useState(''); // State to manage error messages
  const [generatedPdf, setGeneratedPdf] = useState(null); // State to manage the generated PDF content

  const generateAndDownloadPdf = async () => {
    setLoading(true);
    setError('');

    try {
      const doc = new jsPDF();
      const textLines = doc.splitTextToSize(generatedText, 180); // Split text into lines that fit the page width

      // Add text to the PDF, managing page breaks
      let y = 10;
      for (let i = 0; i < textLines.length; i++) {
        if (y > 270) { // Check if space is available on the current page
          doc.addPage();
          y = 10; // Reset y position for the new page
        }
        doc.text(textLines[i], 10, y);
        y += 10;
      }

      const finalizePdf = () => {
        setGeneratedPdf(doc.output('blob'));
        doc.save('generated.pdf');
        setLoading(false);
      };

      if (imageUrl) {
        // Load the image
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const response = await fetch(proxyUrl + imageUrl);
        const blob = await response.blob();
        const img = new Image();
        img.src = URL.createObjectURL(blob);
        img.onload = () => {
          if (y + 160 > 270) { // Check if image fits on the current page
            doc.addPage();
            y = 10;
          }
          doc.addImage(img, 'JPEG', 10, y, 180, 160);
          finalizePdf();
        };
        img.onerror = () => {
          setError('Error loading image');
          setLoading(false);
        };
      } else {
        finalizePdf();
      }
    } catch (error) {
      setError('Error generating PDF: ' + error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <button 
        onClick={generateAndDownloadPdf} 
        className="bg-green-700 text-white h-10 w-56 rounded-md m-2 p-2"
      >
        Generate & Download PDF
      </button>
      {loading && <p>PDF is being generated...</p>}
      {error && <p>{error}</p>}
      {generatedPdf && !loading && !error && (
        <div>
          <h1>PDF Generated</h1>
        </div>
      )}
    </div>
  );
}

export default PdfGenerator;
