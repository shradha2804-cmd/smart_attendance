import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Form,
  Row,
  Col,
  Badge,
} from "react-bootstrap";

import { getAttendance } from "../../services/attendanceService";

const Attendance = () => {

  const [attendance, setAttendance] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      const res = await getAttendance();

      console.log(res.data);

      setAttendance(res.data.attendance);

    } catch (err) {
      console.log(err);
    }
  };

  const filteredData = attendance.filter((item) =>
    item.student?.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>

      <h2 className="mb-4">
        Student Attendance
      </h2>

      <Card className="shadow">

        <Card.Body>

          <Row className="mb-4">

            <Col md={4}>

              <Form.Control
                type="text"
                placeholder="Search Student"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </Col>

          </Row>

          <Table bordered hover responsive>

            <thead className="table-success">

              <tr>

                <th>Roll No</th>
                <th>Student</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {filteredData.length > 0 ? (

                filteredData.map((item) => (

                  <tr key={item._id}>

                    <td>{item.student?.rollNo}</td>

                    <td>{item.student?.name}</td>

                    <td>{item.course?.courseName}</td>

                    <td>
                      {new Date(
                        item.attendanceDate
                      ).toLocaleDateString()}
                    </td>

                    <td>
                      {new Date(
                        item.scanTime
                      ).toLocaleTimeString()}
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
                    colSpan="6"
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

export default Attendance;