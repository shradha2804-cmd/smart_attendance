import axios from "axios";

const API = "http://localhost:8000/api/courses";

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