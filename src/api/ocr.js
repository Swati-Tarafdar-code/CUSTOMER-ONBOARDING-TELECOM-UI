// src/api/ocr.js
import api from './axios';

export const runOcr = (documentId) =>
  api.post(`http://localhost:5000/api/extracted_data/${documentId}/ocr`);
