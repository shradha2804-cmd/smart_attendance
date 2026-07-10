import axios from "axios";

const API = "http://localhost:8000/api/attendance";

export const getDashboard = (email) => {
    return axios.get(`${API}/dashboard/${email}`);
};