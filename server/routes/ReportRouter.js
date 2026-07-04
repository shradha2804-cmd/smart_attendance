import express from "express";
import { exportExcel, exportPDF, getAttendanceReport } from "../controller/ReportController.js";

const ReportRouter = express.Router();

ReportRouter.post("/", getAttendanceReport);
ReportRouter.post("/pdf", exportPDF);

ReportRouter.post("/excel", exportExcel);
export default ReportRouter;