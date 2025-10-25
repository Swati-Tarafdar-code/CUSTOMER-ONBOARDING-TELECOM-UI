// // src/pages/Customer/UploadDocument.jsx
// import { useState } from 'react';
// import { uploadDocument } from '../../api/documents';

// const UploadDocument = () => {
//   const [file, setFile] = useState(null);
//   const [result, setResult] = useState(null);

//   const submit = async (e) => {
//     e.preventDefault();
//     if (!file) return;
//     const { data } = await uploadDocument(file);
//     setResult(data);
//   };

//   return (
//     <div>
//       <h2>Upload Document</h2>
//       <form onSubmit={submit}>
//         <input type="file" onChange={(e)=>setFile(e.target.files[0])}/>
//         <button type="submit">Upload</button>
//       </form>
//       {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
//     </div>
//   );
// };


import React, { useState } from "react";
import axios from "axios";

function DocumentUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("document", file); // must match multer key

    try {
      const token = localStorage.getItem("token"); // assuming stored on login

      const response = await axios.post(
        "http://localhost:5000/api/documents/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(`✅ Upload successful: ${response.data.fileUrl}`);
    } catch (err) {
      console.error("❌ Upload error:", err.response?.data || err.message);
      setMessage(`Upload failed: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div>
      <h2>Upload Document</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default DocumentUpload;
