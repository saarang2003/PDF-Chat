/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Upload } from 'lucide-react';
import * as React from 'react';

const FileUploadComponent :React.FC = () =>{

    const handleFileUpload = () => {
        const el = document.createElement('input');
        el.setAttribute('type' , 'file');
        el.setAttribute('accept' , 'application/pdf');
        el.addEventListener('change', async (ev) =>{

            if(el.files && el.files?.length > 0 ){
              console.log(el.files);
            }
            const formData = new FormData();
            if (el.files && el.files.length > 0) {
              formData.append('pdf', el.files[0]);
            }

            await fetch("http://localhost:8000/upload/pdf", {
                method: "POST",
                body: formData
            });
            console.log("File uploaded");
        })

        el.click();
    }
    return (
        <div className='bg-slate-900 text-white shadow-2xl flex justify-center items-center p-4'>
        <div onClick={handleFileUpload} className='flex justify-center  items-center cursor-pointer flex-col'>
            <h3>Upload a pdf File</h3>
        <Upload />
        </div>
        </div>
    )
}

export default FileUploadComponent