import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import UserRouter from "./routes/UserRouter.js";
import DepartmentRouter from "./routes/DepartmentRouter.js";
import CourseRouter from "./routes/CourseRouter.js";
import TeacherRouter from "./routes/TeacherRouter.js";
import StudentRouter from "./routes/StudentRouter.js";
import QRRouter from "./routes/QRRouter.js";
import AttendanceRouter from "./routes/AttendanceRouter.js";
import ReportRouter from "./routes/ReportRouter.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", UserRouter);
app.use("/api/departments",DepartmentRouter);
app.use("/api/courses",CourseRouter);
app.use("/api/teachers", TeacherRouter);
app.use("/api/students", StudentRouter);
app.use("/api/qr", QRRouter);
app.use("/api/attendance", AttendanceRouter);
app.use("/api/reports", ReportRouter);
const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });