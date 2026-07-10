import axios from "axios";

const API = "http://localhost:8000/api/teachers";

export const getTeacherProfile = (email) => {

    return axios.get(`${API}/profile/${email}`);

};