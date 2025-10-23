// src/api/ocr.js
import api from './axios';

export const runOcr = (documentId) =>
  api.post(`/data-extraction/${documentId}/ocr`);