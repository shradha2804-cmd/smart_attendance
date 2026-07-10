import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Table,
  Spinner,
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import {
  FaClipboardCheck,
  FaBook,
  FaQrcode,
  FaCalendarCheck,
} from "react-icons/fa";

import { getDashboard } from "../../services/dashboardService";

const StudentDashboard = () => {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard = async () => {

    try {

      const res = await getDashboard(user.email);

      setDashboard(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  if (!dashboard) {

    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );

  }

  return (

    <div>

      <h2 className="mb-4">

        Welcome {dashboard.student} 👋

      </h2>

      <Row>

        <Col md={3} className="mb-4">

          <Card className="shadow border-0">

            <Card.Body className="text-center">

              <FaClipboardCheck
                size={45}
                className="text-success mb-3"
              />

              <h5>Today's Status</h5>

              <h3 className="text-success">

                {dashboard.todayStatus}

              </h3>

            </Card.Body>

          </Card>

        </Col>

        <Col md={3} className="mb-4">

          <Card className="shadow border-0">

            <Card.Body className="text-center">

              <FaCalendarCheck
                size={45}
                className="text-primary mb-3"
              />

              <h5>Attendance</h5>

              <h3>

                {dashboard.attendancePercentage}%

              </h3>

            </Card.Body>

          </Card>

        </Col>

        <Col md={3} className="mb-4">

          <Card className="shadow border-0">

            <Card.Body className="text-center">

              <FaBook
                size={45}
                className="text-warning mb-3"
              />

              <h5>Subjects</h5>

              <h3>

                {dashboard.totalSubjects}

              </h3>

            </Card.Body>

          </Card>

        </Col>

        <Col md={3} className="mb-4">

          <Card className="shadow border-0">

            <Card.Body className="text-center">

              <FaQrcode
                size={45}
                className="text-danger mb-3"
              />

              <Button
                variant="primary"
                onClick={() =>
                  navigate("/student/scanqr")
                }
              >
                Scan QR
              </Button>

            </Card.Body>

          </Card>

        </Col>

      </Row>

      <Card className="shadow border-0">

        <Card.Body>

          <h4 className="mb-3">

            Recent Attendance

          </h4>

          <Table bordered hover>

            <thead className="table-primary">

              <tr>

                <th>Date</th>

                <th>Subject</th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {dashboard.recentAttendance.length > 0 ? (

                dashboard.recentAttendance.map((item) => (

                  <tr key={item._id}>

                    <td>

                      {new Date(
                        item.createdAt
                      ).toLocaleDateString()}

                    </td>

                    <td>

                      {item.course?.courseName}

                    </td>

                    <td
                      className={
                        item.status === "Present"
                          ? "text-success"
                          : "text-danger"
                      }
                    >

                      {item.status}

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="3"
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

export default StudentDashboard;