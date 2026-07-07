import Course from "../models/Course.js";


// =============================
// Add Course
// =============================

export const addCourse = async (req, res) => {
  try {

    const {
      courseName,
      courseCode,
      department,
      semester,
      credits,
      teacher,
      description,
      status,
    } = req.body;

    const existingCourse = await Course.findOne({ courseCode });

    if (existingCourse) {
      return res.status(400).json({
        success: false,
        message: "Course already exists",
      });
    }

    const newCourse = new Course({
      courseName,
      courseCode,
      department,
      semester,
      credits,
      teacher,
      description,
      status,
    });

    await newCourse.save();

    res.status(201).json({
      success: true,
      message: "Course Added Successfully",
      course: newCourse,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// =============================
// Get All Courses
// =============================

export const getCourses = async (req, res) => {

  try {

    const courses = await Course.find()
      .populate("department")
      .populate("teacher");

    res.status(200).json({
      success: true,
      total: courses.length,
      courses,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};



// =============================
// Get Course By Id
// =============================

export const getCourseById = async (req, res) => {

  try {

    const course = await Course.findById(req.params.id)
      .populate("department")
      .populate("teacher");

    if (!course) {

      return res.status(404).json({
        success: false,
        message: "Course Not Found",
      });

    }

    res.status(200).json({
      success: true,
      course,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};




// =============================
// Update Course
// =============================

export const updateCourse = async (req, res) => {

  try {

    const updatedCourse = await Course.findByIdAndUpdate(

      req.params.id,

      req.body,

      {
        new: true,
        runValidators: true,
      }

    );

    if (!updatedCourse) {

      return res.status(404).json({
        success: false,
        message: "Course Not Found",
      });

    }

    res.status(200).json({
      success: true,
      message: "Course Updated Successfully",
      course: updatedCourse,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};




// =============================
// Delete Course
// =============================

export const deleteCourse = async (req, res) => {

  try {

    const deletedCourse = await Course.findByIdAndDelete(req.params.id);

    if (!deletedCourse) {

      return res.status(404).json({
        success: false,
        message: "Course Not Found",
      });

    }

    res.status(200).json({
      success: true,
      message: "Course Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};
export const getCourseCount = async (req, res) => {

  try {

    const count = await Course.countDocuments();

    res.json({
      success: true,
      count,
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};