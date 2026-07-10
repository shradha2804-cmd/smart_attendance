import axios from "axios";

const API = "http://localhost:8000/api/students";

export const getStudents = () => {
  return axios.get(API);
};

export const addStudent = (data) => {
  return axios.post(API, data);
};

export const updateStudent = (id, data) => {
  return axios.put(`${API}/${id}`, data);
};

export const deleteStudent = (id) => {
  return axios.delete(`${API}/${id}`);
};


export const getStudentProfile = (email) => {
  return axios.get(`${API}/profile/${email}`);
};