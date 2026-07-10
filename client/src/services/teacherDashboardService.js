import axios from "axios";

const API = "https://smart-attendance-62f6.onrender.com/api/attendance";

export const getTeacherDashboard = (email) => {

    return axios.get(`${API}/teacher-dashboard/${email}`);

};