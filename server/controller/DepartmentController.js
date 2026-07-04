import Department from "../models/Department.js";


// ==============================
// Add Department
// ==============================

export const addDepartment = async (req, res) => {
  try {

    const {
      departmentName,
      departmentCode,
      hod,
      description,
      status,
    } = req.body;

    // Check duplicate department

    const existingDepartment = await Department.findOne({
      $or: [
        { departmentName },
        { departmentCode },
      ],
    });

    if (existingDepartment) {
      return res.status(400).json({
        success: false,
        message: "Department already exists",
      });
    }

    const department = new Department({
      departmentName,
      departmentCode,
      hod,
      description,
      status,
    });

    await department.save();

    res.status(201).json({
      success: true,
      message: "Department added successfully",
      department,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// ==============================
// Get All Departments
// ==============================

export const getDepartments = async (req, res) => {

  try {

    const departments = await Department.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      total: departments.length,
      departments,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};



// ==============================
// Get Department By ID
// ==============================

export const getDepartmentById = async (req, res) => {

  try {

    const department = await Department.findById(req.params.id);

    if (!department) {

      return res.status(404).json({
        success: false,
        message: "Department not found",
      });

    }

    res.status(200).json({
      success: true,
      department,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};



// ==============================
// Update Department
// ==============================

export const updateDepartment = async (req, res) => {

  try {

    const department = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!department) {

      return res.status(404).json({
        success: false,
        message: "Department not found",
      });

    }

    res.status(200).json({
      success: true,
      message: "Department updated successfully",
      department,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};




// ==============================
// Delete Department
// ==============================

export const deleteDepartment = async (req, res) => {

  try {

    const department = await Department.findByIdAndDelete(req.params.id);

    if (!department) {

      return res.status(404).json({
        success: false,
        message: "Department not found",
      });

    }

    res.status(200).json({
      success: true,
      message: "Department deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};