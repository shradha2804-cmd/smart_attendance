import express from "express";

import {

    markAttendance,
    getAttendance,
    getStudentAttendance,
    deleteAttendance

} from "../controller/AttendanceController.js";

const AttendanceRouter = express.Router();



// Mark Attendance

AttendanceRouter.post("/mark", markAttendance);



// Get All Attendance

AttendanceRouter.get("/", getAttendance);



// Student Attendance

AttendanceRouter.get("/student/:id", getStudentAttendance);



// Delete Attendance

AttendanceRouter.delete("/:id", deleteAttendance);

export default AttendanceRouter;