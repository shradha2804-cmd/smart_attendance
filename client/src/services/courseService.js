import axios from "axios";

const API = "https://smart-attendance-62f6.onrender.com/api/courses";

export const getCourses = () => {
  return axios.get(API);
};

export const addCourse = (data) => {
  return axios.post(API, data);
};

export const updateCourse = (id, data) => {
  return axios.put(`${API}/${id}`, data);
};

export const deleteCourse = (id) => {
  return axios.delete(`${API}/${id}`);
};