import Attendance from "../models/Attendance.js";
import PDFDocument from "pdfkit";
import ExcelJS from "exceljs";

// ===============================
// Attendance Report
// ===============================

export const getAttendanceReport = async (req, res) => {
  try {
    const { department, course, date } = req.body;

    let filter = {};

    if (department) {
      filter.department = department;
    }

    if (course) {
      filter.course = course;
    }

    if (date) {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  filter.attendanceDate = {
    $gte: start,
    $lte: end,
  };
}

    const attendance = await Attendance.find(filter)
      .populate("student")
      .populate("teacher")
      .populate("department")
      .populate("course");

    res.status(200).json({
      success: true,
      total: attendance.length,
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ===============================
// Export Attendance Report as PDF
// ===============================

export const exportPDF = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate("student")
      .populate("teacher")
      .populate("department")
      .populate("course");

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=AttendanceReport.pdf"
    );

    doc.pipe(res);

    doc.fontSize(20).text("Attendance Report", {
      align: "center",
    });

    doc.moveDown();

    attendance.forEach((item, index) => {
      doc.fontSize(12).text(
  `${index + 1}. ${item.student?.name} | ${item.course?.courseName} | ${item.status} | ${new Date(item.attendanceDate).toLocaleDateString()}`
);
    });

    doc.end();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ===============================
// Export Attendance Report as Excel
// ===============================

export const exportExcel = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate("student")
      .populate("teacher")
      .populate("department")
      .populate("course");

    const workbook = new ExcelJS.Workbook();

    const worksheet = workbook.addWorksheet("Attendance");

    worksheet.columns = [
      { header: "Student", key: "student", width: 25 },
      { header: "Teacher", key: "teacher", width: 25 },
      { header: "Department", key: "department", width: 20 },
      { header: "Course", key: "course", width: 20 },
      { header: "Lecture", key: "lecture", width: 20 },
      { header: "Date", key: "date", width: 20 },
      { header: "Status", key: "status", width: 15 },
    ];

    attendance.forEach((item) => {
      worksheet.addRow({
        student: item.student?.name,
        teacher: item.teacher?.name,
        department: item.department?.departmentName,
        course: item.course?.courseName,
        lecture: item.lectureName,
date: new Date(item.attendanceDate).toLocaleDateString(),        status: item.status,
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=AttendanceReport.xlsx"
    );

    await workbook.xlsx.write(res);

    res.end();

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};