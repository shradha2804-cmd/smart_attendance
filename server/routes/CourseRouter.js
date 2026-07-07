import express from "express";

import {
  addCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getCourseCount,
} from "../controller/CourseController.js";

const CourseRouter = express.Router();


// ===========================
// Add Course
// ===========================

CourseRouter.post("/", addCourse);


// ===========================
// Get All Courses
// ===========================

CourseRouter.get("/", getCourses);


// ===========================
// Get Course By ID
// ===========================
CourseRouter.get("/count", getCourseCount);

CourseRouter.get("/:id", getCourseById);


// ===========================
// Update Course
// ===========================

CourseRouter.put("/:id", updateCourse);


// ===========================
// Delete Course
// ===========================

CourseRouter.delete("/:id", deleteCourse);


export default CourseRouter;