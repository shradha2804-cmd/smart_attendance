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
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} from "../../services/courseService";

import { getDepartments } from "../../services/departmentService";
import { getTeachers } from "../../services/teacherService";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    courseName: "",
    courseCode: "",
    department: "",
    semester: "",
    credits: "",
    teacher: "",
    description: "",
    status: "Active",
  });

  useEffect(() => {
    loadCourses();
    loadDepartments();
    loadTeachers();
  }, []);

  const loadCourses = async () => {
    const res = await getCourses();
    setCourses(res.data.courses);
  };

  const loadDepartments = async () => {
    const res = await getDepartments();
    setDepartments(res.data.departments);
  };

  const loadTeachers = async () => {
    const res = await getTeachers();
    setTeachers(res.data.teachers);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateCourse(editingId, formData);
        setMessage("Course Updated Successfully");
      } else {
        await addCourse(formData);
        setMessage("Course Added Successfully");
      }

      setEditingId(null);

      setFormData({
        courseName: "",
        courseCode: "",
        department: "",
        semester: "",
        credits: "",
        teacher: "",
        description: "",
        status: "Active",
      });

      loadCourses();
    } catch (err) {
      setMessage(err.response?.data?.message || "Error");
    }
  };

  const handleEdit = (course) => {
    setEditingId(course._id);

    setFormData({
      courseName: course.courseName,
      courseCode: course.courseCode,
      department: course.department?._id,
      semester: course.semester,
      credits: course.credits,
      teacher: course.teacher?._id || "",
      description: course.description,
      status: course.status,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;

    await deleteCourse(id);

    setMessage("Course Deleted Successfully");

    loadCourses();
  };

  return (
    <Container className="mt-4">

      <Card className="shadow p-4">

        <h2 className="mb-4">
          Course Management
        </h2>

        {message && (
          <Alert>{message}</Alert>
        )}

        <Form onSubmit={handleSubmit}>

          <Row>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Course Name</Form.Label>
                <Form.Control
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Course Code</Form.Label>
                <Form.Control
                  name="courseCode"
                  value={formData.courseCode}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

          </Row>

          <Row>

            <Col md={6}>
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
                    <option key={dept._id} value={dept._id}>
                      {dept.departmentName}
                    </option>
                  ))}

                </Form.Select>

              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Teacher</Form.Label>

                <Form.Select
                  name="teacher"
                  value={formData.teacher}
                  onChange={handleChange}
                >

                  <option value="">
                    Select Teacher
                  </option>

                  {teachers.map((teacher) => (
                    <option key={teacher._id} value={teacher._id}>
                      {teacher.name}
                    </option>
                  ))}

                </Form.Select>

              </Form.Group>
            </Col>

          </Row>

          <Row>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Semester</Form.Label>
                <Form.Control
                  type="number"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Credits</Form.Label>
                <Form.Control
                  type="number"
                  name="credits"
                  value={formData.credits}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Button type="submit">
            {editingId ? "Update Course" : "Add Course"}
          </Button>

        </Form>

      </Card>

      <Card className="shadow mt-4">

        <Card.Body>

          <h3>Course List</h3>

          <Table bordered hover>

            <thead>

              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Code</th>
                <th>Department</th>
                <th>Semester</th>
                <th>Teacher</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {courses.map((course, index) => (

                <tr key={course._id}>

                  <td>{index + 1}</td>

                  <td>{course.courseName}</td>

                  <td>{course.courseCode}</td>

                  <td>{course.department?.departmentName}</td>

                  <td>{course.semester}</td>

                  <td>{course.teacher?.name || "-"}</td>

                  <td>

                    <Button
                      size="sm"
                      variant="warning"
                      className="me-2"
                      onClick={() => handleEdit(course)}
                    >
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(course._id)}
                    >
                      Delete
                    </Button>

                  </td>

                </tr>

              ))}

            </tbody>

          </Table>

        </Card.Body>

      </Card>

    </Container>
  );
};

export default Courses;