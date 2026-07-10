import axios from "axios";

const API = "http://localhost:8000/api";

export const getStudentCount = () => {
  return axios.get(`${API}/students/count`);
};

export const getTeacherCount = () => {
  return axios.get(`${API}/teachers/count`);
};

export const getCourseCount = () => {
  return axios.get(`${API}/courses/count`);
};

export const getDepartmentCount = () => {
  return axios.get(`${API}/departments/count`);
};

export const getAttendance = () => {
  return axios.get(`${API}/attendance`);
};

export const getQRCount = () => {
  return axios.get(`${API}/qr/count`);
};