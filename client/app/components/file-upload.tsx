/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import * as React from 'react';
import { Upload } from 'lucide-react';

const FileUploadComponent: React.FC = () => {
  const handleFileUploadButtonClick = () => {
    const el = document.createElement('input');
    el.setAttribute('type', 'file');
    el.setAttribute('accept', 'application/pdf');
    el.addEventListener('change', async (ev) => {
      if (el.files && el.files.length > 0) {
        const file = el.files.item(0);
        if (file) {
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
    <div className="bg-slate-900 flex text-white shadow-2xl max-w-[70%] justify-center items-center p-4 rounded-lg hover:bg-gray-800 hover:scale-95 transition-transform duration-200 cursor-pointer border-white border-2">
      <div
        onClick={handleFileUploadButtonClick}
        className="flex justify-center items-center space-x-4 "
      >
        <h3>Upload PDF File</h3>
        <Upload />
      </div>
    </div>
  );
};

export default FileUploadComponent;