import axios from "axios";

const API = "http://localhost:8000/api/teachers";

export const getTeachers = () => {
  return axios.get(API);
};

export const addTeacher = (data) => {
  return axios.post(API, data);
};

export const updateTeacher = (id, data) => {
  return axios.put(`${API}/${id}`, data);
};

export const deleteTeacher = (id) => {
  return axios.delete(`${API}/${id}`);
};