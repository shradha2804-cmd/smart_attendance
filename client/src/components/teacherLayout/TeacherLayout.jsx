import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaQrcode,
  FaClipboardList,
  FaUsers,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import {
  Container,
  Row,
  Col,
  Navbar,
  Button,
  ListGroup,
} from "react-bootstrap";

const TeacherLayout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Container fluid className="p-0">

      <Row className="g-0">

        {/* Sidebar */}

        <Col md={2} className="bg-success text-white vh-100">

          <div className="p-3">

            <h3 className="text-center mb-4">
              SmartAtten
            </h3>

            <ListGroup variant="flush">

              <ListGroup.Item
                as={NavLink}
                to="/teacher/dashboard"
                className="bg-success text-white border-0"
              >
                <FaTachometerAlt className="me-2" />
                Dashboard
              </ListGroup.Item>

              <ListGroup.Item
                as={NavLink}
                to="/teacher/generateqr"
                className="bg-success text-white border-0"
              >
                <FaQrcode className="me-2" />
                Generate QR
              </ListGroup.Item>

              <ListGroup.Item
                as={NavLink}
                to="/teacher/attendance"
                className="bg-success text-white border-0"
              >
                <FaClipboardList className="me-2" />
                Attendance
              </ListGroup.Item>

              <ListGroup.Item
                as={NavLink}
                to="/teacher/liveattendance"
                className="bg-success text-white border-0"
              >
                <FaUsers className="me-2" />
                Live Attendance
              </ListGroup.Item>

              <ListGroup.Item
                as={NavLink}
                to="/teacher/teacherprofile"
                className="bg-success text-white border-0"
              >
                <FaUserCircle className="me-2" />
                Profile
              </ListGroup.Item>

            </ListGroup>

          </div>

        </Col>

        {/* Main Content */}

        <Col md={10}>

          {/* Navbar */}

          <Navbar
            bg="success"
            variant="dark"
            className="px-4 d-flex justify-content-between"
          >

            <Navbar.Brand>
              Teacher Panel
            </Navbar.Brand>

            <Button
              variant="light"
              onClick={logout}
            >
              <FaSignOutAlt className="me-2" />
              Logout
            </Button>

          </Navbar>

          {/* Dynamic Pages */}

          <div className="p-4">

            <Outlet />

          </div>

        </Col>

      </Row>

    </Container>
  );
};

export default TeacherLayout;