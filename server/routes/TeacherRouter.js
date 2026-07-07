import express from "express";

import {

    addTeacher,
    getTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher,
    getTeacherProfile,
    getTeacherCount

} from "../controller/TeacherController.js";

const TeacherRouter = express.Router();



// Add Teacher

TeacherRouter.post("/", addTeacher);


// Get All Teachers

TeacherRouter.get("/", getTeachers);

TeacherRouter.get("/profile/:email", getTeacherProfile);

// Get Teacher By Id
TeacherRouter.get("/count", getTeacherCount);

TeacherRouter.get("/:id", getTeacherById);


// Update Teacher

TeacherRouter.put("/:id", updateTeacher);


// Delete Teacher

TeacherRouter.delete("/:id", deleteTeacher);

export default TeacherRouter;