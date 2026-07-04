import Attendance from "../models/Attendance.js";
import QRSession from "../models/QRSession.js";
import Student from "../models/Student.js";



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

            .populate("student")

            .populate("teacher")

            .populate("course")

            .populate("department");



        res.status(200).json({

            success: true,

            total: attendance.length,

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
// Student Attendance
// ===================================

export const getStudentAttendance = async (req, res) => {

    try {

        const attendance = await Attendance.find({

            student: req.params.id

        })

            .populate("course")

            .populate("teacher");



        res.status(200).json({

            success: true,

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