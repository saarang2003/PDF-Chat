/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import * as React from 'react';
import { Upload } from 'lucide-react';

const FileUploadComponent: React.FC = () => {
  const [pdfUrl, setPdfUrl] = React.useState<string | null>(null);

  const handleFileUploadButtonClick = () => {
    const el = document.createElement('input');
    el.setAttribute('type', 'file');
    el.setAttribute('accept', 'application/pdf');
    el.addEventListener('change', async (ev) => {
      if (el.files && el.files.length > 0) {
        const file = el.files.item(0);
        if (file) {
          // Create a URL for the PDF file to display it
          const url = URL.createObjectURL(file);
          setPdfUrl(url);

          // Upload the file to the server
          const formData = new FormData();
          formData.append('pdf', file);
          await fetch('http://localhost:8000/upload/pdf', {
            method: 'POST',
            body: formData,
          });
          console.log('File uploaded');
        }
      }
    });
    el.click();
  };

  return (
    <div className="flex flex-col h-screen w-full p-4">
      {/* Upload button */}
      <div
        className="bg-slate-900 flex text-white shadow-2xl justify-center items-center p-4 rounded-lg hover:bg-gray-800 hover:scale-95 transition-transform duration-200 cursor-pointer border-white border-2 mb-4"
        onClick={handleFileUploadButtonClick}
      >
        <div className="flex justify-center items-center space-x-4">
          <h3>Upload PDF File</h3>
          <Upload />
        </div>
      </div>

      {/* PDF viewer */}
      {pdfUrl && (
        <div className="flex-1 overflow-y-auto border border-gray-300 rounded-lg">
          <embed
            src={pdfUrl}
            type="application/pdf"
            className="w-full h-full"
          />
        </div>
      )}
    </div>
  );
};

export default FileUploadComponent;