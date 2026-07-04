import express from "express";

import {

    addStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent

} from "../controller/StudentController.js";

const StudentRouter = express.Router();

StudentRouter.post("/", addStudent);

StudentRouter.get("/", getStudents);

StudentRouter.get("/:id", getStudentById);

StudentRouter.put("/:id", updateStudent);

StudentRouter.delete("/:id", deleteStudent);

export default StudentRouter;