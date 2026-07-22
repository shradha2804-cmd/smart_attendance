import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaQrcode,
  FaHistory,
  FaUserCircle,
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

const StudentLayout = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const closeSidebar = () => setShowSidebar(false);

  const menuStyle = ({ isActive }) => ({
    background: isActive ? "#198754" : "#198754",
    color: "#fff",
    border: "none",
    padding: "15px 18px",
    fontWeight: isActive ? "600" : "400",
    textDecoration: "none",
  });

  const MenuItems = () => (
    <ListGroup variant="flush">

      <ListGroup.Item
        as={NavLink}
        to="/student/studentdashboard"
        style={menuStyle}
        onClick={closeSidebar}
        className="sidebar-item"
      >
        <FaTachometerAlt className="me-2" />
        Dashboard
      </ListGroup.Item>

      <ListGroup.Item
        as={NavLink}
        to="/student/scanqr"
        style={menuStyle}
        onClick={closeSidebar}
        className="sidebar-item"
      >
        <FaQrcode className="me-2" />
        Scan QR
      </ListGroup.Item>

      <ListGroup.Item
        as={NavLink}
        to="/student/attendancehistory"
        style={menuStyle}
        onClick={closeSidebar}
        className="sidebar-item"
      >
        <FaHistory className="me-2" />
        Attendance History
      </ListGroup.Item>

      <ListGroup.Item
        as={NavLink}
        to="/student/studentprofile"
        style={menuStyle}
        onClick={closeSidebar}
        className="sidebar-item"
      >
        <FaUserCircle className="me-2" />
        My Profile
      </ListGroup.Item>

    </ListGroup>
  );

  return (
    <>
      <style>{`
        .sidebar-item:hover{
          background:#157347 !important;
          color:white !important;
          padding-left:25px !important;
          transition:.3s;
        }

        @media(max-width:768px){

          .navbar-brand{
            font-size:17px;
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
            className="bg-success text-white d-none d-md-block"
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              height: "100vh",
              overflowY: "auto",
            }}
          >

            <div className="p-3">

              <h3 className="text-center fw-bold mb-4">
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
                background: "#198754",
                color: "#fff",
              }}
            >

              <Offcanvas.Title>
                SmartAtten
              </Offcanvas.Title>

            </Offcanvas.Header>

            <Offcanvas.Body
              style={{
                background: "#198754",
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
              bg="success"
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
                Student Panel
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

            {/* Page Content */}

            <div
              style={{
                minHeight: "calc(100vh - 65px)",
                background: "#f8f9fa",
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

export default StudentLayout;