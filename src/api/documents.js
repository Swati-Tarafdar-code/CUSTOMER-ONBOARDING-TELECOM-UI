// src/api/documents.js

// import axios from 'axios';

// export const uploadDocument = (file) => {
//   const formData = new FormData();
//   // backend expects key 'document' (your UploadDocument currently uses 'document')
//   formData.append('document', file);

//   const token = localStorage.getItem('token');
//   return axios.post('http://localhost:5000/api/documents/upload', formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     },
//   });
// };

// export const reviewDocument = (documentId, status) =>
//   axios.put(`http://localhost:5000/api/documents/${documentId}/review`, { status });

// import api from './axios';


// export const uploadDocument = (file) => {
//   const formData = new FormData();
//   formData.append('file', file);

//   return api.post('http://localhost:5000/api/documents/upload', formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };

// export const reviewDocument = (documentId, status) =>
//   api.put(`http://localhost:5000/api/documents/${documentId}/review`, { status });

import axios from "axios";

export const uploadDocument = async (file) => {
  const token = localStorage.getItem("token");  // ✅ FIX

  const formData = new FormData();
  formData.append("document", file);

  return axios.post(
    "http://localhost:5000/api/documents/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,   // ✅ Now token exists
      },
    }
  );
};