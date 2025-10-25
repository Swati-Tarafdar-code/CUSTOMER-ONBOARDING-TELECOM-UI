// src/api/documents.js
import api from './axios';

// export const uploadDocument = (file) => {
//   const form = new FormData();
//   form.append('file', file);
//   return api.post('http://localhost:5000/api/documents/upload', form, {
//     headers: { 'Content-Type': 'multipart/form-data' },
//   });
// };

// src/api/documents.js
// import axios from 'axios';

export const uploadDocument = (file) => {
  const formData = new FormData();
  formData.append('file', file);

  return api.post('http://localhost:5000/api/documents/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const reviewDocument = (documentId, status) =>
  api.put(`http://localhost:5000/api/documents/${documentId}/review`, { status });