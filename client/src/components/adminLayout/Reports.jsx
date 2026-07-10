import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Button,
  Table,
  Alert,
} from "react-bootstrap";

import {
  getAttendanceReport,
  exportPDF,
  exportExcel,
} from "../../services/reportService";
import { getDepartments } from "../../services/departmentService";
import { getCourses } from "../../services/courseService";

const Reports = () => {
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [message, setMessage] = useState("");

  const [filters, setFilters] = useState({
    department: "",
    course: "",
    date: "",
  });

  useEffect(() => {
    loadDepartments();
    loadCourses();
  }, []);

  const loadDepartments = async () => {
    try {
      const res = await getDepartments();
      setDepartments(res.data.departments);
    } catch (err) {
      console.log(err);
    }
  };

  const loadCourses = async () => {
    try {
      const res = await getCourses();
      setCourses(res.data.courses);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async () => {
    try {
      const res = await getAttendanceReport(filters);

      setAttendance(res.data.attendance);
      setMessage(
        `${res.data.total} attendance record(s) found`
      );
    } catch (err) {
      setMessage(err.response?.data?.message || "Error loading report");
    }
  };
  const handlePDF = async () => {
  const res = await exportPDF(filters);

  const url = window.URL.createObjectURL(new Blob([res.data]));

  const link = document.createElement("a");

  link.href = url;

  link.download = "AttendanceReport.pdf";

  link.click();
};

const handleExcel = async () => {
  const res = await exportExcel(filters);

  const url = window.URL.createObjectURL(new Blob([res.data]));

  const link = document.createElement("a");

  link.href = url;

  link.download = "AttendanceReport.xlsx";

  link.click();
};

  return (
    <Container className="mt-4">

      <Card className="shadow p-4">

        <h2 className="mb-4">
          Attendance Reports
        </h2>

        {message && (
          <Alert variant="info">
            {message}
          </Alert>
        )}

        <Row>

          <Col md={4}>

            <Form.Group>

              <Form.Label>Department</Form.Label>

              <Form.Select
                name="department"
                value={filters.department}
                onChange={handleChange}
              >
                <option value="">All Departments</option>

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

            <Form.Group>

              <Form.Label>Course</Form.Label>

              <Form.Select
                name="course"
                value={filters.course}
                onChange={handleChange}
              >
                <option value="">All Courses</option>

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

          <Col md={4}>

            <Form.Group>

              <Form.Label>Date</Form.Label>

              <Form.Control
                type="date"
                name="date"
                value={filters.date}
                onChange={handleChange}
              />

            </Form.Group>

          </Col>

        </Row>

        <br />

        <Button onClick={handleSearch}>
          Generate Report
        </Button>

      </Card>

      <Card className="shadow mt-4">

        <Card.Body>

          <Table striped bordered hover responsive>

            <thead className="table-dark">

              <tr>

                <th>#</th>
                <th>Student</th>
                <th>Teacher</th>
                <th>Department</th>
                <th>Course</th>
                <th>Lecture</th>
                <th>Date</th>
                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {attendance.length > 0 ? (

                attendance.map((item, index) => (

                  <tr key={item._id}>

                    <td>{index + 1}</td>

                    <td>{item.student?.name}</td>

                    <td>{item.teacher?.name}</td>

                    <td>{item.department?.departmentName}</td>

                    <td>{item.course?.courseName}</td>

                 <td>{item.qrSession?.lectureName || "-"}</td>

                    <td>
  {item.attendanceDate
    ? new Date(item.attendanceDate).toLocaleDateString()
    : "-"}
</td>

                    <td>

                      <span
                        className={`badge ${
                          item.status === "Present"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {item.status}
                      </span>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="8"
                    className="text-center"
                  >
                    No Attendance Found
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

export default Reports;