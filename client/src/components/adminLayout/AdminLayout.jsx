import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaBuilding,
  FaClipboardList,
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

const AdminLayout = () => {
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

        <Col
          md={2}
          className="bg-dark text-white vh-100"
        >

          <div className="p-3">

            <h3 className="text-center mb-4">
              SmartAtten
            </h3>

            <ListGroup variant="flush">

              <ListGroup.Item
                as={NavLink}
                to="/admin/dashboard"
                className="bg-dark text-white border-0"
              >
                <FaTachometerAlt className="me-2" />
                Dashboard
              </ListGroup.Item>

              <ListGroup.Item
                as={NavLink}
                to="/admin/students"
                className="bg-dark text-white border-0"
              >
                <FaUserGraduate className="me-2" />
                Students
              </ListGroup.Item>

              <ListGroup.Item
                as={NavLink}
                to="/admin/teachers"
                className="bg-dark text-white border-0"
              >
                <FaChalkboardTeacher className="me-2" />
                Teachers
              </ListGroup.Item>

              <ListGroup.Item
                as={NavLink}
                to="/admin/courses"
                className="bg-dark text-white border-0"
              >
                <FaBook className="me-2" />
                Courses
              </ListGroup.Item>

              <ListGroup.Item
                as={NavLink}
                to="/admin/departments"
                className="bg-dark text-white border-0"
              >
                <FaBuilding className="me-2" />
                Departments
              </ListGroup.Item>

              <ListGroup.Item
                as={NavLink}
                to="/admin/reports"
                className="bg-dark text-white border-0"
              >
                <FaClipboardList className="me-2" />
                Reports
              </ListGroup.Item>

            </ListGroup>

          </div>

        </Col>

        {/* Main Content */}

        <Col md={10}>

          {/* Navbar */}

          <Navbar
            bg="primary"
            variant="dark"
            className="px-4 d-flex justify-content-between align-items-center"
          >

            <Navbar.Brand>
              Smart Attendance System
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

export default AdminLayout;