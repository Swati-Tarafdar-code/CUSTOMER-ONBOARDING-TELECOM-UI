// src/api/audit.js
import api from './axios';

export const getAuditLogs = () => api.get('http://localhost:5000/api/audit');