import axios from "axios";

const API = "http://localhost:8000/api/attendance";

export const getTeacherDashboard = (email) => {

    return axios.get(`${API}/teacher-dashboard/${email}`);

};