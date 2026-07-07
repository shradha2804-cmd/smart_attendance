import Attendance from "../models/Attendance.js";
import QRSession from "../models/QRSession.js";
import Student from "../models/Student.js";

import Teacher from "../models/Teacher.js";
import Course from "../models/Course.js";

// ===================================
// Mark Attendance
// ===================================

export const markAttendance = async (req, res) => {

    try {

        const {
    email,
    qrToken
} = req.body;


        const session = await QRSession.findOne({

            qrToken

        });



        if (!session) {

            return res.status(404).json({

                success: false,

                message: "Invalid QR"

            });

        }



        if (session.status === "Expired") {

            return res.status(400).json({

                success: false,

                message: "QR Expired"

            });

        }



        if (new Date() > session.endTime) {

            session.status = "Expired";

            await session.save();

            return res.status(400).json({

                success: false,

                message: "QR Expired"

            });

        }



       const student = await Student.findOne({ email });

if (!student) {

    return res.status(404).json({

        success: false,

        message: "Student Not Found. Ask Admin to add this email in Student Management."

    });

}



       const alreadyMarked = await Attendance.findOne({

    student: student._id,

    qrSession: session._id

});



        if (alreadyMarked) {

            return res.status(400).json({

                success: false,

                message: "Attendance Already Marked"

            });

        }



        const attendance = new Attendance({

            student: student._id,

            teacher: session.teacher,

            course: session.course,

            department: session.department,

            qrSession: session._id,

            status: "Present"

        });



        await attendance.save();



        res.status(201).json({

            success: true,

            message: "Attendance Marked Successfully",

            attendance

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



// ===================================
// Get All Attendance
// ===================================

export const getAttendance = async (req, res) => {
  try {

    const attendance = await Attendance.find()
      .populate({
        path: "student",
        select: "name rollNo"
      })
      .populate({
        path: "teacher",
        select: "name"
      })
      .populate({
        path: "course",
        select: "courseName"
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      attendance
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



// ===================================
// Student Attendance
// ===================================


        export const getStudentAttendance = async (req, res) => {
  try {

    // Find student using email
    const student = await Student.findOne({
      email: req.params.email,
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student Not Found",
      });
    }

    // Find attendance using Student ObjectId
    const attendance = await Attendance.find({
      student: student._id,
    })
      .populate("course")
      .populate("teacher")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      attendance,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// ===================================
// Delete Attendance
// ===================================

export const deleteAttendance = async (req, res) => {

    try {

        await Attendance.findByIdAndDelete(req.params.id);

        res.status(200).json({

            success: true,

            message: "Attendance Deleted"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
export const getStudentDashboard = async (req, res) => {

    try {

        const student = await Student.findOne({
            email: req.params.email
        }).populate("course");

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        const attendance = await Attendance.find({
            student: student._id
        })
            .populate("course")
            .sort({ createdAt: -1 });

        const present = attendance.filter(
            a => a.status === "Present"
        ).length;

        const percentage =
            attendance.length === 0
                ? 0
                : Math.round((present / attendance.length) * 100);

        const today = new Date().toDateString();

        const todayAttendance = attendance.find(
            a =>
                new Date(a.createdAt).toDateString() === today
        );

        res.json({

            success: true,

            student: student.name,

            attendancePercentage: percentage,

            todayStatus: todayAttendance
                ? todayAttendance.status
                : "Not Marked",

            totalSubjects: 1,

            recentAttendance: attendance.slice(0, 5)

        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};
export const getTeacherDashboard = async (req, res) => {

    try {

        const teacher = await Teacher.findOne({
            email: req.params.email
        });

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: "Teacher Not Found"
            });
        }

        const totalStudents = await Student.countDocuments();

        const totalClasses = await Course.countDocuments({
            teacher: teacher._id
        });

        const today = new Date();
        today.setHours(0,0,0,0);

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate()+1);

        const todayAttendance = await Attendance.find({

            teacher: teacher._id,

            createdAt: {
                $gte: today,
                $lt: tomorrow
            }

        })
        .populate("student")
        .populate("course")
        .sort({createdAt:-1});

        const activeQR = await QRSession.findOne({

            teacher: teacher._id,

            status:"Active"

        });

        res.json({

            success:true,

            teacherName:teacher.name,

            totalStudents,

            totalClasses,

            todayAttendance:todayAttendance.length,

            qrStatus:activeQR ? "Active":"Inactive",

            recentAttendance:todayAttendance.slice(0,5)

        });

    }

    catch(err){

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};