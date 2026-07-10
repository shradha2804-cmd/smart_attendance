import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaQrcode,
  FaHistory,
  
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

const StudentLayout = () => {
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
                to="/student/studentdashboard"
                className="bg-success text-white border-0"
              >
                <FaTachometerAlt className="me-2" />
                Dashboard
              </ListGroup.Item>

              <ListGroup.Item
                as={NavLink}
                to="/student/scanqr"
                className="bg-success text-white border-0"
              >
                <FaQrcode className="me-2" />
                Scan QR
              </ListGroup.Item>

              <ListGroup.Item
                as={NavLink}
                to="/student/attendancehistory"
                className="bg-success text-white border-0"
              >
                <FaHistory className="me-2" />
                Attendance History
              </ListGroup.Item>

              

              <ListGroup.Item
                as={NavLink}
                to="/student/studentprofile"
                className="bg-success text-white border-0"
              >
                <FaUserCircle className="me-2" />
                My Profile
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
            className="px-4 d-flex justify-content-between align-items-center"
          >

            <Navbar.Brand>
              Student Panel
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

export default StudentLayout;