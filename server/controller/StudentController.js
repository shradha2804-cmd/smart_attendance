import Student from "../models/Student.js";


// ======================
// Add Student
// ======================

export const addStudent = async (req, res) => {

    try {

        const {

            studentId,
            rollNo,
            name,
            email,
            contact,
            gender,
            department,
            course,
            semester,
            year,
            photo,
            qrCode,
            status

        } = req.body;

        const existingStudent = await Student.findOne({

            $or: [

                { studentId },

                { rollNo },

                { email }

            ]

        });

        if (existingStudent) {

            return res.status(400).json({

                success: false,

                message: "Student already exists"

            });

        }

        const student = new Student({

            studentId,
            rollNo,
            name,
            email,
            contact,
            gender,
            department,
            course,
            semester,
            year,
            photo,
            qrCode,
            status

        });

        await student.save();

        res.status(201).json({

            success: true,

            message: "Student Added Successfully",

            student

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



// ======================
// Get All Students
// ======================

export const getStudents = async (req, res) => {

    try {

        const students = await Student.find()

            .populate("department")

            .populate("course");

        res.status(200).json({

            success: true,

            total: students.length,

            students

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



// ======================
// Get Student By ID
// ======================

export const getStudentById = async (req, res) => {

    try {

        const student = await Student.findById(req.params.id)

            .populate("department")

            .populate("course");

        if (!student) {

            return res.status(404).json({

                success: false,

                message: "Student Not Found"

            });

        }

        res.status(200).json({

            success: true,

            student

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



// ======================
// Update Student
// ======================

export const updateStudent = async (req, res) => {

    try {

        const student = await Student.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new: true,

                runValidators: true

            }

        );

        if (!student) {

            return res.status(404).json({

                success: false,

                message: "Student Not Found"

            });

        }

        res.status(200).json({

            success: true,

            message: "Student Updated Successfully",

            student

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



// ======================
// Delete Student
// ======================

export const deleteStudent = async (req, res) => {

    try {

        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {

            return res.status(404).json({

                success: false,

                message: "Student Not Found"

            });

        }

        res.status(200).json({

            success: true,

            message: "Student Deleted Successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};