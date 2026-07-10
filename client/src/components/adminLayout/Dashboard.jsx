import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaBuilding,
  FaClipboardList,
  FaQrcode,
  FaChartBar,
} from "react-icons/fa";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  getStudentCount,
  getTeacherCount,
  getCourseCount,
  getDepartmentCount,
  getAttendance,
  getQRCount,
} from "../../services/adminDashboardService";

const Dashboard = () => {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState({
    students: 0,
    teachers: 0,
    courses: 0,
    departments: 0,
    attendance: 0,
    qrSessions: 0,
    recentAttendance: [],
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
  try {
    const studentRes = await getStudentCount();
    console.log("Student API:", studentRes.data);

    const teacherRes = await getTeacherCount();
    console.log("Teacher API:", teacherRes.data);

    const courseRes = await getCourseCount();
    console.log("Course API:", courseRes.data);

    const departmentRes = await getDepartmentCount();
    console.log("Department API:", departmentRes.data);

    const attendanceRes = await getAttendance();
    console.log("Attendance API:", attendanceRes.data);

    const qrRes = await getQRCount();
    console.log("QR API:", qrRes.data);

    setDashboardData({
      students:
        Number(studentRes.data.count ?? studentRes.data.total) || 0,

      teachers:
        Number(teacherRes.data.count ?? teacherRes.data.total) || 0,

      courses:
        Number(courseRes.data.count ?? courseRes.data.total) || 0,

      departments:
        Number(departmentRes.data.count ?? departmentRes.data.total) || 0,

      attendance:
        Number(attendanceRes.data.total ?? attendanceRes.data.count) || 0,

      qrSessions:
        Number(qrRes.data.count ?? qrRes.data.total) || 0,

      recentAttendance: attendanceRes.data.attendance || [],
    });
  } catch (err) {
    console.log(err);
  }
};
const graphData = [
  {
    name: "Students",
    value: dashboardData.students,
  },
  {
    name: "Teachers",
    value: dashboardData.teachers,
  },
  {
    name: "Courses",
    value: dashboardData.courses,
  },
  {
    name: "Departments",
    value: dashboardData.departments,
  },
  {
    name: "Attendance",
    value: dashboardData.attendance,
  },
  {
    name: "QR Sessions",
    value: dashboardData.qrSessions,
  },
];
  return (
    <Container fluid>

      <h2 className="fw-bold mb-4">
        Welcome Admin 👋
      </h2>

      <Row>

        <Col md={4} className="mb-4">
          <Card
            className="shadow h-100 text-center"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/admin/students")}
          >
            <Card.Body>
              <FaUserGraduate size={45} className="text-primary mb-3" />
              <h4>Students</h4>
              <h2>{dashboardData.students}</h2>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card
            className="shadow h-100 text-center"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/admin/teachers")}
          >
            <Card.Body>
              <FaChalkboardTeacher size={45} className="text-success mb-3" />
              <h4>Teachers</h4>
              <h2>{dashboardData.teachers}</h2>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card
            className="shadow h-100 text-center"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/admin/courses")}
          >
            <Card.Body>
              <FaBook size={45} className="text-warning mb-3" />
              <h4>Courses</h4>
              <h2>{dashboardData.courses}</h2>
            </Card.Body>
          </Card>
        </Col>

      </Row>

      <Row>

        <Col md={4} className="mb-4">
          <Card
            className="shadow h-100 text-center"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/admin/departments")}
          >
            <Card.Body>
              <FaBuilding size={45} className="text-danger mb-3" />
              <h4>Departments</h4>
              <h2>{dashboardData.departments}</h2>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card
            className="shadow h-100 text-center"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/admin/reports")}
          >
            <Card.Body>
              <FaClipboardList size={45} className="text-info mb-3" />
              <h4>Attendance</h4>
              <h2>{dashboardData.attendance}</h2>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card
            className="shadow h-100 text-center"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/admin/reports")}
          >
            <Card.Body>
              <FaQrcode size={45} className="text-secondary mb-3" />
              <h4>QR Sessions</h4>
              <h2>{dashboardData.qrSessions}</h2>
            </Card.Body>
          </Card>
        </Col>

      </Row>

     <Card className="shadow mb-4">

  <Card.Header className="fw-bold fs-5">

    <FaChartBar className="me-2" />

    Attendance Analytics

  </Card.Header>

  <Card.Body>

    <ResponsiveContainer width="100%" height={350}>

      <BarChart
        data={graphData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          dataKey="name"
        />

        <YAxis
          allowDecimals={false}
        />

        <Tooltip />

        <Bar
          dataKey="value"
          fill="#198754"
          radius={[8, 8, 0, 0]}
        />

      </BarChart>

    </ResponsiveContainer>

  </Card.Body>

</Card>

      <Card className="shadow">

        <Card.Header className="fw-bold fs-5">
          Recent Attendance
        </Card.Header>

        <Card.Body>

          <Table striped bordered hover responsive>

            <thead>
              <tr>
                <th>Student</th>
                <th>Department</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>

            <tbody>

              {dashboardData.recentAttendance?.length > 0 ? (

                dashboardData.recentAttendance
                  .slice(0, 5)
                  .map((item) => (

                    <tr key={item._id}>

                      <td>{item.student?.name || "-"}</td>

                      <td>{item.department?.departmentName || "-"}</td>

                      <td
                        className={
                          item.status === "Present"
                            ? "text-success fw-bold"
                            : "text-danger fw-bold"
                        }
                      >
                        {item.status}
                      </td>

                      <td>
                        {item.scanTime
                          ? new Date(item.scanTime).toLocaleTimeString()
                          : "-"}
                      </td>

                    </tr>

                  ))

              ) : (

                <tr>

                  <td colSpan="4" className="text-center">
                    No Attendance Found
                  </td>

                </tr>

              )}

            </tbody>

          </Table>

        </Card.Body>

      </Card>

    </Container>
  );
};

export default Dashboard;