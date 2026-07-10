import axios from "axios";

const API = "http://localhost:8000/api/attendance";

export const getAttendance = () => {
  return axios.get(API);
};

export const getStudentAttendance = (email) => {
  return axios.get(`${API}/student/${email}`);
};
export const getAllAttendance = () => {
  return axios.get(API);
};