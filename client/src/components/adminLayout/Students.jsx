import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Table,
  Row,
  Col,
  Alert,
} from "react-bootstrap";

import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../../services/studentService";

import { getDepartments } from "../../services/departmentService";
import { getCourses } from "../../services/courseService";

const Students = () => {

  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [message, setMessage] = useState("");

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    studentId: "",
    rollNo: "",
    name: "",
    email: "",
    contact: "",
    gender: "",
    department: "",
    course: "",
    semester: "",
    year: "",
    photo: "",
    qrCode: "",
    status: "Active",
  });

  useEffect(() => {
    loadStudents();
    loadDepartments();
    loadCourses();
  }, []);
    // ==========================
  // Load Students
  // ==========================
  const loadStudents = async () => {
    try {
      const res = await getStudents();
      setStudents(res.data.students);
    } catch (err) {
      console.log(err);
    }
  };

  // ==========================
  // Load Departments
  // ==========================
  const loadDepartments = async () => {
    try {
      const res = await getDepartments();
      setDepartments(res.data.departments);
    } catch (err) {
      console.log(err);
    }
  };

  // ==========================
  // Load Courses
  // ==========================
  const loadCourses = async () => {
    try {
      const res = await getCourses();
      setCourses(res.data.courses);
    } catch (err) {
      console.log(err);
    }
  };

  // ==========================
  // Handle Input Change
  // ==========================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================
  // Add / Update Student
  // ==========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateStudent(editingId, formData);
        setMessage("Student Updated Successfully");
      } else {
        await addStudent(formData);
        setMessage("Student Added Successfully");
      }

      setEditingId(null);

      setFormData({
        studentId: "",
        rollNo: "",
        name: "",
        email: "",
        contact: "",
        gender: "",
        department: "",
        course: "",
        semester: "",
        year: "",
        photo: "",
        qrCode: "",
        status: "Active",
      });

      loadStudents();

    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  // ==========================
  // Edit Student
  // ==========================
  const handleEdit = (student) => {

    setEditingId(student._id);

    setFormData({
      studentId: student.studentId,
      rollNo: student.rollNo,
      name: student.name,
      email: student.email,
      contact: student.contact,
      gender: student.gender,
      department: student.department?._id,
      course: student.course?._id,
      semester: student.semester,
      year: student.year,
      photo: student.photo,
      qrCode: student.qrCode,
      status: student.status,
    });
  };

  // ==========================
  // Delete Student
  // ==========================
  const handleDelete = async (id) => {

    if (!window.confirm("Delete this student?")) return;

    try {

      await deleteStudent(id);

      setMessage("Student Deleted Successfully");

      loadStudents();

    } catch (err) {
      console.log(err);
    }
  };

  // ==========================
  // Search Students
  // ==========================
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(search.toLowerCase()) ||
    student.studentId.toLowerCase().includes(search.toLowerCase())
  );
    return (
    <Container className="mt-4">

      <Card className="shadow p-4">

        <h2 className="mb-4">
          Student Management
        </h2>

        {message && (
          <Alert variant="success">
            {message}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>

          <Row>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Student ID</Form.Label>
                <Form.Control
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Roll Number</Form.Label>
                <Form.Control
                  name="rollNo"
                  value={formData.rollNo}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Student Name</Form.Label>
                <Form.Control
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

          </Row>

          <Row>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

          </Row>

          <Row>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>

                <Form.Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </Form.Select>

              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Department</Form.Label>

                <Form.Select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                >

                  <option value="">
                    Select Department
                  </option>

                  {departments.map((dept) => (

                    <option
                      key={dept._id}
                      value={dept._id}
                    >
                      {dept.departmentName}
                    </option>

                  ))}

                </Form.Select>

              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">

                <Form.Label>Course</Form.Label>

                <Form.Select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                >

                  <option value="">
                    Select Course
                  </option>

                  {courses.map((course) => (

                    <option
                      key={course._id}
                      value={course._id}
                    >
                      {course.courseName}
                    </option>

                  ))}

                </Form.Select>

              </Form.Group>
            </Col>

          </Row>

          <Row>

            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Semester</Form.Label>

                <Form.Select
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                </Form.Select>

              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Year</Form.Label>

                <Form.Select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </Form.Select>

              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Photo URL</Form.Label>

                <Form.Control
                  name="photo"
                  value={formData.photo}
                  onChange={handleChange}
                />

              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>QR Code</Form.Label>

                <Form.Control
                  name="qrCode"
                  value={formData.qrCode}
                  onChange={handleChange}
                />

              </Form.Group>
            </Col>

          </Row>

          <Row>

            <Col md={6}>
              <Form.Group className="mb-3">

                <Form.Label>Status</Form.Label>

                <Form.Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </Form.Select>

              </Form.Group>
            </Col>

          </Row>

          <Button type="submit">

            {editingId ? "Update Student" : "Add Student"}

          </Button>

        </Form>

      </Card>
            {/* Student List */}

      <Card className="shadow mt-4">

        <Card.Body>

          <Row className="mb-3">

            <Col md={6}>
              <h3>Student List</h3>
            </Col>

            <Col md={6}>

              <Form.Control
                type="text"
                placeholder="Search by Name / Roll No / Student ID"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </Col>

          </Row>

          <Table striped bordered hover responsive>

            <thead className="table-dark">

              <tr>

                <th>#</th>
                <th>Student ID</th>
                <th>Roll No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Gender</th>
                <th>Department</th>
                <th>Course</th>
                <th>Semester</th>
                <th>Year</th>
                <th>Status</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {filteredStudents.length > 0 ? (

                filteredStudents.map((student, index) => (

                  <tr key={student._id}>

                    <td>{index + 1}</td>

                    <td>{student.studentId}</td>

                    <td>{student.rollNo}</td>

                    <td>{student.name}</td>

                    <td>{student.email}</td>

                    <td>{student.contact}</td>

                    <td>{student.gender}</td>

                    <td>{student.department?.departmentName}</td>

                    <td>{student.course?.courseName}</td>

                    <td>{student.semester}</td>

                    <td>{student.year}</td>

                    <td>

                      <span
                        className={`badge ${
                          student.status === "Active"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {student.status}
                      </span>

                    </td>

                    <td>

                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(student)}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(student._id)}
                      >
                        Delete
                      </Button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td colSpan="13" className="text-center">

                    No Students Found

                  </td>

                </tr>

              )}

            </tbody>

          </Table>

        </Card.Body>

      </Card>

    </Container>

  );
};

export default Students;