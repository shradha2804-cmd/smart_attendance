import express from "express";

import {
  addDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
  getDepartmentCount,
} from "../controller/DepartmentController.js";

const DepartmentRouter = express.Router();


// =======================
// Add Department
// =======================

DepartmentRouter.post("/", addDepartment);


// =======================
// Get All Departments
// =======================

DepartmentRouter.get("/", getDepartments);


// =======================
// Get Department By Id
// =======================
DepartmentRouter.get("/count", getDepartmentCount);


DepartmentRouter.get("/:id", getDepartmentById);


// =======================
// Update Department
// =======================

DepartmentRouter.put("/:id", updateDepartment);


// =======================
// Delete Department
// =======================

DepartmentRouter.delete("/:id", deleteDepartment);

export default DepartmentRouter;