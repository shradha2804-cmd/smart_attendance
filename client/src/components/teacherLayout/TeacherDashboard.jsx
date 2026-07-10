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
  FaQrcode,
  FaClipboardList,
  FaUsers,
  FaBook,
} from "react-icons/fa";

import { getTeacherDashboard } from "../../services/teacherDashboardService";

const TeacherDashboard = () => {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [dashboard, setDashboard] = useState(null);

 useEffect(() => {
  loadDashboard();

  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const loadDashboard = async () => {

    try {

      const res = await getTeacherDashboard(user.email);

      setDashboard(res.data);

    }

    catch(err){

      console.log(err);

    }

  };

  if(!dashboard){

    return(

      <div className="text-center mt-5">

        <Spinner animation="border"/>

      </div>

    )

  }

  return (

    <div>

      <h2 className="mb-4">

        Welcome {dashboard.teacherName} 👋

      </h2>

      <Row>

        <Col md={3} className="mb-4">

          <Card className="shadow border-0">

            <Card.Body className="text-center">

              <FaBook
                size={45}
                className="text-primary mb-3"
              />

              <h5>Total Classes</h5>

              <h2>

                {dashboard.totalClasses}

              </h2>

            </Card.Body>

          </Card>

        </Col>

        <Col md={3} className="mb-4">

          <Card className="shadow border-0">

            <Card.Body className="text-center">

              <FaClipboardList
                size={45}
                className="text-success mb-3"
              />

              <h5>Today's Attendance</h5>

              <h2>

                {dashboard.todayAttendance}

              </h2>

            </Card.Body>

          </Card>

        </Col>

        <Col md={3} className="mb-4">

          <Card className="shadow border-0">

            <Card.Body className="text-center">

              <FaQrcode
                size={45}
                className="text-warning mb-3"
              />

              <h5>QR Status</h5>

              <h4 className={
                dashboard.qrStatus==="Active"
                ?"text-success"
                :"text-danger"
              }>

                {dashboard.qrStatus}

              </h4>

            </Card.Body>

          </Card>

        </Col>

        <Col md={3} className="mb-4">

          <Card className="shadow border-0">

            <Card.Body className="text-center">

              <FaUsers
                size={45}
                className="text-danger mb-3"
              />

              <h5>Total Students</h5>

              <h2>

                {dashboard.totalStudents}

              </h2>

            </Card.Body>

          </Card>

        </Col>

      </Row>

      <Card className="shadow border-0 mb-4">

        <Card.Body>

          <h4 className="mb-4">

            Quick Actions

          </h4>

          <Button
            variant="success"
            className="me-3"
            onClick={() =>
              navigate("/teacher/generateqr")
            }
          >

            Generate QR

          </Button>

          <Button
            variant="primary"
            className="me-3"
            onClick={() =>
              navigate("/teacher/attendance")
            }
          >

            View Attendance

          </Button>

          <Button
            variant="warning"
            onClick={() =>
              navigate("/teacher/liveattendance")
            }
          >

            Live Attendance

          </Button>

        </Card.Body>

      </Card>

      <Card className="shadow border-0">

        <Card.Body>

          <h4 className="mb-3">

            Recent Attendance

          </h4>

          <Table bordered hover responsive>

            <thead className="table-success">

              <tr>

                <th>Student</th>

                <th>Subject</th>

                <th>Time</th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {

                dashboard.recentAttendance.length>0 ?

                dashboard.recentAttendance.map((item)=>(

                  <tr key={item._id}>

                    <td>

                      {item.student?.name}

                    </td>

                    <td>

                      {item.course?.courseName}

                    </td>

                    <td>

                      {new Date(item.createdAt).toLocaleTimeString()}

                    </td>

                    <td className="text-success">

                      {item.status}

                    </td>

                  </tr>

                ))

                :

                <tr>

                  <td
                    colSpan="4"
                    className="text-center"
                  >

                    No Attendance Yet

                  </td>

                </tr>

              }

            </tbody>

          </Table>

        </Card.Body>

      </Card>

    </div>

  );

};

export default TeacherDashboard;