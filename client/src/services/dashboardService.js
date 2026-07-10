import axios from "axios";

const API = "https://smart-attendance-62f6.onrender.com/api/attendance";

export const getDashboard = (email) => {
    return axios.get(`${API}/dashboard/${email}`);
};