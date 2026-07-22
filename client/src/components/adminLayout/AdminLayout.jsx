import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaBuilding,
  FaClipboardList,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

import {
  Container,
  Row,
  Col,
  Navbar,
  Button,
  ListGroup,
  Offcanvas,
} from "react-bootstrap";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const closeSidebar = () => setShowSidebar(false);

  const menuItemStyle = ({ isActive }) => ({
    backgroundColor: isActive ? "#0d6efd" : "#212529",
    color: "#fff",
    border: "none",
    padding: "14px 18px",
    textDecoration: "none",
    fontWeight: isActive ? "600" : "400",
    transition: "0.3s",
  });

  const MenuItems = () => (
    <ListGroup variant="flush">

      <ListGroup.Item
        as={NavLink}
        to="/admin/dashboard"
        style={menuItemStyle}
        onClick={closeSidebar}
      >
        <FaTachometerAlt className="me-2" />
        Dashboard
      </ListGroup.Item>

      <ListGroup.Item
        as={NavLink}
        to="/admin/students"
        style={menuItemStyle}
        onClick={closeSidebar}
      >
        <FaUserGraduate className="me-2" />
        Students
      </ListGroup.Item>

      <ListGroup.Item
        as={NavLink}
        to="/admin/teachers"
        style={menuItemStyle}
        onClick={closeSidebar}
      >
        <FaChalkboardTeacher className="me-2" />
        Teachers
      </ListGroup.Item>

      <ListGroup.Item
        as={NavLink}
        to="/admin/courses"
        style={menuItemStyle}
        onClick={closeSidebar}
      >
        <FaBook className="me-2" />
        Courses
      </ListGroup.Item>

      <ListGroup.Item
        as={NavLink}
        to="/admin/departments"
        style={menuItemStyle}
        onClick={closeSidebar}
      >
        <FaBuilding className="me-2" />
        Departments
      </ListGroup.Item>

      <ListGroup.Item
        as={NavLink}
        to="/admin/reports"
        style={menuItemStyle}
        onClick={closeSidebar}
      >
        <FaClipboardList className="me-2" />
        Reports
      </ListGroup.Item>

    </ListGroup>
  );

  return (
    <>
      <style>{`
        .sidebar-item:hover{
          background:#0d6efd !important;
          color:#fff !important;
          padding-left:25px !important;
          transition:.3s;
        }

        @media(max-width:768px){
          .navbar-brand{
            font-size:16px !important;
          }

          .logout-text{
            display:none;
          }
        }
      `}</style>

      <Container fluid className="p-0">

        <Row className="g-0">

          {/* Desktop Sidebar */}

          <Col
            md={2}
            className="bg-dark text-white d-none d-md-block"
            style={{
              position: "fixed",
              height: "100vh",
              overflowY: "auto",
              left: 0,
              top: 0,
            }}
          >

            <div className="p-3">

              <h3 className="text-center mb-4 fw-bold">
                SmartAtten
              </h3>

              <MenuItems />

            </div>

          </Col>

          {/* Mobile Sidebar */}

          <Offcanvas
            show={showSidebar}
            onHide={closeSidebar}
            placement="start"
          >

            <Offcanvas.Header
              closeButton
              style={{
                background: "#212529",
                color: "#fff",
              }}
            >

              <Offcanvas.Title>
                SmartAtten
              </Offcanvas.Title>

            </Offcanvas.Header>

            <Offcanvas.Body
              style={{
                background: "#212529",
                padding: 0,
              }}
            >

              <MenuItems />

            </Offcanvas.Body>

          </Offcanvas>

          {/* Main Content */}

          <Col
            xs={12}
            md={{ span: 10, offset: 2 }}
          >

            {/* Navbar */}

            <Navbar
              bg="primary"
              variant="dark"
              className="shadow-sm px-3 py-2"
            >

              <Button
                variant="outline-light"
                className="d-md-none me-3"
                onClick={() => setShowSidebar(true)}
              >
                <FaBars />
              </Button>

              <Navbar.Brand className="fw-bold">
                Smart Attendance System
              </Navbar.Brand>

              <div className="ms-auto">

                <Button
                  variant="light"
                  onClick={logout}
                >
                  <FaSignOutAlt />

                  <span className="logout-text ms-2">
                    Logout
                  </span>

                </Button>

              </div>

            </Navbar>

            {/* Pages */}

            <div
              style={{
                minHeight: "calc(100vh - 65px)",
                background: "#f4f6f9",
                padding: "25px",
              }}
            >

              <Outlet />

            </div>

          </Col>

        </Row>

      </Container>
    </>
  );
};

export default AdminLayout;