
// import React, { useState } from "react";
// import axios from "axios";

// function DocumentUpload() {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState("");

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();

//     if (!file) {
//       setMessage("Please select a file first!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("document", file); // must match multer key

//     try {
//       const token = localStorage.getItem("token"); // assuming stored on login

//       const response = await axios.post(
//         "http://localhost:5000/api/documents/upload",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setMessage(`✅ Upload successful: ${response.data.fileUrl}`);
//     } catch (err) {
//       console.error("❌ Upload error:", err.response?.data || err.message);
//       setMessage(`Upload failed: ${err.response?.data?.message || err.message}`);
//     }
//   };

//   return (
//     <div>
//       <h2>Upload Document</h2>
//       <form onSubmit={handleUpload}>
//         <input type="file" onChange={handleFileChange} />
//         <button type="submit">Upload</button>
//       </form>
//       <p>{message}</p>
//     </div>
//   );
// }

// export default DocumentUpload;

// ...existing code...
import React, { useRef, useState, useEffect } from 'react';
import { uploadDocument } from '../../api/documents';
import '../../UploadDocument.css';

const UploadDocument = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleBrowse = () => inputRef.current?.click();

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreviewUrl(f.type?.startsWith('image/') ? URL.createObjectURL(f) : null);
    setMsg('');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer?.files?.[0];
    if (f) {
      setFile(f);
      setPreviewUrl(f.type?.startsWith('image/') ? URL.createObjectURL(f) : null);
      setMsg('');
    }
  };

  const handleUpload = async (e) => {
    e?.preventDefault();
    if (!file) {
      setMsg('Please select a file first');
      return;
    }

    try {
      setLoading(true);
      const res = await uploadDocument(file);
      setMsg('Upload successful');
      setFile(null);
      setPreviewUrl(null);
      if (typeof onUploadSuccess === 'function') onUploadSuccess(res.data);
    } catch (err) {
      console.error('Upload error', err);
      setMsg(err?.response?.data?.message || err.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-module">
      <div
        className={`dropzone ${file ? 'has-file' : ''}`}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="drop-inner">
          <div className="icon">⤴︎</div>

          {!file ? (
            <>
              <div className="drop-text">Drag & drop files here or</div>
              <button type="button" className="btn-browse" onClick={handleBrowse}>
                Browse Files
              </button>
            </>
          ) : (
            <div className="file-info">
              {previewUrl ? <img src={previewUrl} alt="preview" /> : <div className="file-name">{file.name}</div>}
              <div className="file-meta">{(file.size / 1024).toFixed(1)} KB</div>
            </div>
          )}

          <input ref={inputRef} type="file" onChange={handleFileChange} style={{ display: 'none' }} />
        </div>
      </div>

      <div className="upload-controls">
        <button className="btn btn-primary" onClick={handleUpload} disabled={loading}>
          {loading ? 'Uploading…' : 'Upload'}
        </button>
        <div className="upload-msg">{msg}</div>
      </div>
    </div>
  );
};

export default UploadDocument;
