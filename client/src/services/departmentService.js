import axios from "axios";

const API = "http://localhost:8000/api/departments";

export const getDepartments = () => {
  return axios.get(API);
};

export const addDepartment = (data) => {
  return axios.post(API, data);
};

export const updateDepartment = (id, data) => {
  return axios.put(`${API}/${id}`, data);
};

export const deleteDepartment = (id) => {
  return axios.delete(`${API}/${id}`);
};