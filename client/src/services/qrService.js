import axios from "axios";

const API = "http://localhost:8000/api";

export const getDepartments = () => {
  return axios.get(`${API}/departments`);
};

export const getCourses = () => {
  return axios.get(`${API}/courses`);
};

export const getTeachers = () => {
  return axios.get(`${API}/teachers`);
};

export const generateQR = (data) => {
  return axios.post(`${API}/qr/generate`, data);
};