// src/api/documents.js
import api from './axios';

export const uploadDocument = (file) => {
  const form = new FormData();
  form.append('file', file);
  return api.post('/documents/upload', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const reviewDocument = (documentId, status) =>
  api.put(`/documents/${documentId}/review`, { status });