import Teacher from "../models/Teacher.js";



// =======================
// Add Teacher
// =======================

export const addTeacher = async (req, res) => {

    try {

        const {
            teacherId,
            name,
            email,
            contact,
            gender,
            qualification,
            experience,
            department,
            courses,
            joiningDate,
            photo,
            status
        } = req.body;

        const existingTeacher = await Teacher.findOne({
            $or: [
                { teacherId },
                { email }
            ]
        });

        if (existingTeacher) {
            return res.status(400).json({
                success: false,
                message: "Teacher already exists"
            });
        }

        const teacher = new Teacher({
            teacherId,
            name,
            email,
            contact,
            gender,
            qualification,
            experience,
            department,
            courses,
            joiningDate,
            photo,
            status
        });

        await teacher.save();

        res.status(201).json({
            success: true,
            message: "Teacher Added Successfully",
            teacher
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};




// =======================
// Get All Teachers
// =======================

export const getTeachers = async (req, res) => {

    try {

        const teachers = await Teacher.find()
            .populate("department")
            .populate("courses");

        res.status(200).json({
            success: true,
            total: teachers.length,
            teachers
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};




// =======================
// Get Teacher By Id
// =======================

export const getTeacherById = async (req, res) => {

    try {

        const teacher = await Teacher.findById(req.params.id)
            .populate("department")
            .populate("courses");

        if (!teacher) {

            return res.status(404).json({
                success: false,
                message: "Teacher Not Found"
            });

        }

        res.status(200).json({
            success: true,
            teacher
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};




// =======================
// Update Teacher
// =======================

export const updateTeacher = async (req, res) => {

    try {

        const updatedTeacher = await Teacher.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true,
                runValidators: true
            }

        );

        if (!updatedTeacher) {

            return res.status(404).json({
                success: false,
                message: "Teacher Not Found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Teacher Updated Successfully",
            teacher: updatedTeacher
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};




// =======================
// Delete Teacher
// =======================

export const deleteTeacher = async (req, res) => {

    try {

        const teacher = await Teacher.findByIdAndDelete(req.params.id);

        if (!teacher) {

            return res.status(404).json({
                success: false,
                message: "Teacher Not Found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Teacher Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};