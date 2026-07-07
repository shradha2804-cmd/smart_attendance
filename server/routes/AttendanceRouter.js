import express from "express";

import {

    markAttendance,
    getAttendance,
    getStudentAttendance,
    deleteAttendance,
    getStudentDashboard,
    getTeacherDashboard

} from "../controller/AttendanceController.js";

const AttendanceRouter = express.Router();



// Mark Attendance

AttendanceRouter.post("/mark", markAttendance);



// Get All Attendance

AttendanceRouter.get("/", getAttendance);



// Student Attendance

AttendanceRouter.get("/student/:email", getStudentAttendance);



// Delete Attendance

AttendanceRouter.delete("/:id", deleteAttendance);

AttendanceRouter.get("/dashboard/:email", getStudentDashboard);
AttendanceRouter.get("/teacher-dashboard/:email", getTeacherDashboard);
export default AttendanceRouter;