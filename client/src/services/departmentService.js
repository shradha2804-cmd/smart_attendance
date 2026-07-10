import axios from "axios";

const API = "https://smart-attendance-62f6.onrender.com/api/departments";

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