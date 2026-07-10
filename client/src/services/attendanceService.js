import axios from "axios";

const API = "https://smart-attendance-62f6.onrender.com/api/attendance";

export const getAttendance = () => {
  return axios.get(API);
};

export const getStudentAttendance = (email) => {
  return axios.get(`${API}/student/${email}`);
};
export const getAllAttendance = () => {
  return axios.get(API);
};