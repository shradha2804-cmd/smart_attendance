import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Table,
  Alert,
} from "react-bootstrap";

import {
  getDepartments,
  addDepartment,
  updateDepartment,
  deleteDepartment,
} from "../../services/departmentService";

const Departments = () => {
  const [departments, setDepartments] = useState([]);

  const [formData, setFormData] = useState({
    departmentName: "",
    departmentCode: "",
    hod: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      const res = await getDepartments();
      setDepartments(res.data.departments);
    } catch (error) {
      console.log(error);
    }
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
        await updateDepartment(editingId, formData);
        setMessage("Department Updated Successfully");
      } else {
        await addDepartment(formData);
        setMessage("Department Added Successfully");
      }

      setFormData({
        departmentName: "",
        departmentCode: "",
        hod: "",
      });

      setEditingId(null);

      loadDepartments();
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleEdit = (department) => {
    setEditingId(department._id);

    setFormData({
      departmentName: department.departmentName,
      departmentCode: department.departmentCode,
      hod: department.hod,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this department?")) return;

    try {
      await deleteDepartment(id);

      setMessage("Department Deleted Successfully");

      loadDepartments();
    } catch (error) {
      setMessage(error.response?.data?.message || "Delete Failed");
    }
  };

  return (
    <Container className="mt-4">

      <Card className="shadow p-4">

        <h2 className="text-center mb-4">
          Department Management
        </h2>

        {message && (
          <Alert variant="success">
            {message}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3">

            <Form.Label>
              Department Name
            </Form.Label>

            <Form.Control
              type="text"
              name="departmentName"
              value={formData.departmentName}
              onChange={handleChange}
              required
            />

          </Form.Group>

          <Form.Group className="mb-3">

            <Form.Label>
              Department Code
            </Form.Label>

            <Form.Control
              type="text"
              name="departmentCode"
              value={formData.departmentCode}
              onChange={handleChange}
              required
            />

          </Form.Group>

          <Form.Group className="mb-3">

            <Form.Label>
              HOD
            </Form.Label>

            <Form.Control
              type="text"
              name="hod"
              value={formData.hod}
              onChange={handleChange}
              required
            />

          </Form.Group>

          <Button type="submit">

            {editingId ? "Update Department" : "Add Department"}

          </Button>

        </Form>

      </Card>

      <Card className="shadow mt-4">

        <Card.Body>

          <h3 className="mb-3">
            Department List
          </h3>

          <Table striped bordered hover>

            <thead>

              <tr>

                <th>#</th>
                <th>Name</th>
                <th>Code</th>
                <th>HOD</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {departments.length > 0 ? (

                departments.map((department, index) => (

                  <tr key={department._id}>

                    <td>{index + 1}</td>

                    <td>{department.departmentName}</td>

                    <td>{department.departmentCode}</td>

                    <td>{department.hod}</td>

                    <td>

                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(department)}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(department._id)}
                      >
                        Delete
                      </Button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center"
                  >
                    No Departments Found
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

export default Departments;