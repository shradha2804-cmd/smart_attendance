import axios from "axios";

const API = "https://smart-attendance-62f6.onrender.com/api/teachers";

export const getTeacherProfile = (email) => {

    return axios.get(`${API}/profile/${email}`);

};