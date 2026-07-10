import axios from "axios";

const API = "https://smart-attendance-62f6.onrender.com/api/reports";

// Attendance Report
export const getAttendanceReport = (filters) => {
  return axios.post(API, filters);
};

// Export PDF
export const exportPDF = (filters) => {
  return axios.post(`${API}/pdf`, filters, {
    responseType: "blob",
  });
};

// Export Excel
export const exportExcel = (filters) => {
  return axios.post(`${API}/excel`, filters, {
    responseType: "blob",
  });
};