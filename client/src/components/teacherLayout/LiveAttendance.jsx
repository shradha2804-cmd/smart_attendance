import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Button,
  Badge,
  Row,
  Col,
} from "react-bootstrap";

import { getAllAttendance } from "../../services/attendanceService";

const LiveAttendance = () => {

  const [session, setSession] = useState(false);

  const [students, setStudents] = useState([]);

  useEffect(() => {

    loadAttendance();

    const interval = setInterval(() => {
      loadAttendance();
    }, 3000);

    return () => clearInterval(interval);

  }, []);

  const loadAttendance = async () => {

    try {

      const res = await getAllAttendance();

      setStudents(res.data.attendance);

    } catch (err) {

      console.log(err);

    }

  };

  const startSession = () => {
    setSession(true);
  };

  const endSession = () => {
    setSession(false);
  };

  return (
    <div>

      <h2 className="mb-4">
        Live Attendance
      </h2>

      <Row className="mb-4">

        <Col md={8}>

          <Card className="shadow">

            <Card.Body>

              <h4>QR Session Status</h4>

              <h5 className="mt-3">

                {session ? (

                  <Badge bg="success">
                    Live Session Running
                  </Badge>

                ) : (

                  <Badge bg="danger">
                    No Active Session
                  </Badge>

                )}

              </h5>

              <div className="mt-4">

                <Button
                  variant="success"
                  className="me-3"
                  onClick={startSession}
                >
                  Start Session
                </Button>

                <Button
                  variant="danger"
                  onClick={endSession}
                >
                  End Session
                </Button>

              </div>

            </Card.Body>

          </Card>

        </Col>

        <Col md={4}>

          <Card className="shadow">

            <Card.Body className="text-center">

              <h4>Total Present</h4>

              <h1 className="text-success">
                {students.length}
              </h1>

            </Card.Body>

          </Card>

        </Col>

      </Row>

      <Card className="shadow">

        <Card.Body>

          <h4 className="mb-3">
            Live Student Attendance
          </h4>

          <Table bordered hover responsive>

            <thead className="table-success">

              <tr>

                <th>Roll No</th>

                <th>Student Name</th>

                <th>Course</th>

                <th>Scan Time</th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {students.length > 0 ? (

                students.map((student) => (

                  <tr key={student._id}>

                    <td>{student.student?.rollNo}</td>

                    <td>{student.student?.name}</td>

                    <td>{student.course?.courseName}</td>

                    <td>
                      {new Date(student.scanTime).toLocaleTimeString()}
                    </td>

                    <td>

                      <Badge bg="success">
                        {student.status}
                      </Badge>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td colSpan="5" className="text-center">

                    No Attendance Yet

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

export default LiveAttendance;