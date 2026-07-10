import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Badge,
  Form,
  Row,
  Col,
  Alert,
} from "react-bootstrap";

import { getStudentAttendance } from "../../services/attendanceService";

const AttendanceHistory = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  const [attendance, setAttendance] = useState([]);

  const [message, setMessage] = useState("");

  const [subjectFilter, setSubjectFilter] = useState("");

  const [monthFilter, setMonthFilter] = useState("");

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
  try {
    const res = await getStudentAttendance(user.email);

    console.log("Attendance API:", res.data);

    setAttendance(res.data.attendance);
  } catch (err) {
    console.log(err);

    setMessage(
      err.response?.data?.message ||
      "Unable to load attendance."
    );
  }
};
  const filteredAttendance = attendance.filter((item) => {

    let subjectMatch = true;

    let monthMatch = true;

    if (subjectFilter) {

      subjectMatch =
        item.course?.courseName === subjectFilter;

    }

    if (monthFilter) {

      const attendanceMonth = new Date(
        item.createdAt
      )
        .toISOString()
        .slice(0, 7);

      monthMatch = attendanceMonth === monthFilter;

    }

    return subjectMatch && monthMatch;

  });

  return (
    <div>

      <h2 className="mb-4">
        Attendance History
      </h2>

      {message && (
        <Alert variant="danger">
          {message}
        </Alert>
      )}

      <Card className="shadow mb-4">

        <Card.Body>

          <Row>

            <Col md={4}>

              <Form.Group>

                <Form.Label>
                  Select Subject
                </Form.Label>

                <Form.Select
                  value={subjectFilter}
                  onChange={(e) =>
                    setSubjectFilter(e.target.value)
                  }
                >

                  <option value="">
                    All Subjects
                  </option>

                  {[
                    ...new Set(
                      attendance.map(
                        (a) => a.course?.courseName
                      )
                    ),
                  ].map((course) => (
                    <option
                      key={course}
                      value={course}
                    >
                      {course}
                    </option>
                  ))}

                </Form.Select>

              </Form.Group>

            </Col>

            <Col md={4}>

              <Form.Group>

                <Form.Label>
                  Select Month
                </Form.Label>

                <Form.Control
                  type="month"
                  value={monthFilter}
                  onChange={(e) =>
                    setMonthFilter(e.target.value)
                  }
                />

              </Form.Group>

            </Col>

          </Row>

        </Card.Body>

      </Card>

      <Card className="shadow">

        <Card.Body>

          <Table
            striped
            bordered
            hover
            responsive
          >

            <thead className="table-primary">

              <tr>

                <th>#</th>

                <th>Date</th>

                <th>Subject</th>

                <th>Teacher</th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {filteredAttendance.length > 0 ? (

                filteredAttendance.map((item, index) => (

                  <tr key={item._id}>

                    <td>{index + 1}</td>

                    <td>

                      {new Date(
                        item.createdAt
                      ).toLocaleDateString()}

                    </td>

                    <td>

                      {item.course?.courseName}

                    </td>

                    <td>

                      {item.teacher?.name}

                    </td>

                    <td>

                      {item.status === "Present" ? (

                        <Badge bg="success">

                          Present

                        </Badge>

                      ) : (

                        <Badge bg="danger">

                          Absent

                        </Badge>

                      )}

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="5"
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

    </div>
  );
};

export default AttendanceHistory;