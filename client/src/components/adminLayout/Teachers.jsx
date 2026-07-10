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
  getTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher,
} from "../../services/teacherService";

import { getDepartments } from "../../services/departmentService";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    teacherId: "",
    name: "",
    email: "",
    contact: "",
    gender: "",
    qualification: "",
    experience: "",
    department: "",
    joiningDate: "",
  });

  useEffect(() => {
    loadTeachers();
    loadDepartments();
  }, []);

  const loadTeachers = async () => {
    try {
      const res = await getTeachers();
      setTeachers(res.data.teachers);
    } catch (err) {
      console.log(err);
    }
  };

  const loadDepartments = async () => {
    try {
      const res = await getDepartments();
      setDepartments(res.data.departments);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const clearForm = () => {
    setEditingId(null);

    setFormData({
      teacherId: "",
      name: "",
      email: "",
      contact: "",
      gender: "",
      qualification: "",
      experience: "",
      department: "",
      joiningDate: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateTeacher(editingId, formData);
        setMessage("Teacher Updated Successfully");
      } else {
        await addTeacher(formData);
        setMessage("Teacher Added Successfully");
      }

      clearForm();
      loadTeachers();
    } catch (err) {
      console.log(err);

      setMessage(
        err.response?.data?.message || "Something went wrong"
      );
    }
  };

  const handleEdit = (teacher) => {
    setEditingId(teacher._id);

    setFormData({
      teacherId: teacher.teacherId,
      name: teacher.name,
      email: teacher.email,
      contact: teacher.contact,
      gender: teacher.gender,
      qualification: teacher.qualification,
      experience: teacher.experience,
      department: teacher.department?._id,
      joiningDate: teacher.joiningDate
        ? teacher.joiningDate.substring(0, 10)
        : "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete Teacher?")) return;

    try {
      await deleteTeacher(id);

      setMessage("Teacher Deleted Successfully");

      loadTeachers();
    } catch (err) {
      setMessage(err.response?.data?.message);
    }
  };

  return (
    <Container className="mt-4">

      <Card className="shadow p-4">

        <h2 className="mb-4">Teacher Management</h2>

        {message && (
          <Alert variant="info">
            {message}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>

          <Row>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Teacher ID</Form.Label>
                <Form.Control
                  name="teacherId"
                  value={formData.teacherId}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
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
                />
              </Form.Group>
            </Col>

          </Row>

          <Row>

            <Col md={6}>
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

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Department</Form.Label>

                <Form.Select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                >
                  <option value="">Select Department</option>

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

          </Row>

          <Row>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Qualification</Form.Label>
                <Form.Control
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Experience</Form.Label>
                <Form.Control
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

          </Row>

          <Row>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Joining Date</Form.Label>
                <Form.Control
                  type="date"
                  name="joiningDate"
                  value={formData.joiningDate}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

          </Row>

          <Button type="submit">
            {editingId ? "Update Teacher" : "Add Teacher"}
          </Button>

          <Button
            variant="secondary"
            className="ms-2"
            onClick={clearForm}
          >
            Clear
          </Button>

        </Form>

      </Card>

      <Card className="shadow mt-4">

        <Card.Body>

          <h3>Teacher List</h3>

          <Table bordered hover>

            <thead>

              <tr>
                <th>#</th>
                <th>Teacher ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Department</th>
                <th>Qualification</th>
                <th>Experience</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {teachers.map((teacher, index) => (

                <tr key={teacher._id}>

                  <td>{index + 1}</td>
                  <td>{teacher.teacherId}</td>
                  <td>{teacher.name}</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.contact}</td>
                  <td>{teacher.department?.departmentName}</td>
                  <td>{teacher.qualification}</td>
                  <td>{teacher.experience} Years</td>

                  <td>

                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(teacher)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(teacher._id)}
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

export default Teachers;