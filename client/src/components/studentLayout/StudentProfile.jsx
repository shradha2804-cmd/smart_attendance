import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Image,
  Spinner,
} from "react-bootstrap";

import {
  FaUserGraduate,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaBook,
  FaIdBadge,
  FaEdit,
  FaLock,
} from "react-icons/fa";

import { getStudentProfile } from "../../services/studentService";

const StudentProfile = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  const [student, setStudent] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {

    try {

      const res = await getStudentProfile(user.email);

      setStudent(res.data.student);

    } catch (err) {

      console.log(err);

    }

    setLoading(false);

  };

  if (loading) {

    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );

  }

  if (!student) {

    return (
      <h4 className="text-center mt-5">
        Student Profile Not Found
      </h4>
    );

  }

  return (
    <div>

      <h2 className="mb-4">
        My Profile
      </h2>

      <Card className="shadow border-0">

        <Card.Body>

          <Row>

            <Col
              md={4}
              className="text-center"
            >

              <Image
                src={
                  student.photo ||
                  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                roundedCircle
                width={180}
                height={180}
                className="mb-3 border border-3 border-primary"
              />

              <h4>{student.name}</h4>

              <p className="text-muted">
                Student
              </p>

            </Col>

            <Col md={8}>

              <Row>

                <Col md={6} className="mb-4">

                  <h6>
                    <FaIdBadge className="me-2 text-primary" />
                    Roll Number
                  </h6>

                  <p>{student.rollNo}</p>

                </Col>

                <Col md={6} className="mb-4">

                  <h6>
                    <FaEnvelope className="me-2 text-primary" />
                    Email
                  </h6>

                  <p>{student.email}</p>

                </Col>

                <Col md={6} className="mb-4">

                  <h6>
                    <FaPhone className="me-2 text-primary" />
                    Contact
                  </h6>

                  <p>{student.contact}</p>

                </Col>

                <Col md={6} className="mb-4">

                  <h6>
                    <FaBuilding className="me-2 text-primary" />
                    Department
                  </h6>

                  <p>{student.department?.departmentName}</p>

                </Col>

                <Col md={6} className="mb-4">

                  <h6>
                    <FaBook className="me-2 text-primary" />
                    Course
                  </h6>

                  <p>{student.course?.courseName}</p>

                </Col>

                <Col md={6} className="mb-4">

                  <h6>
                    <FaUserGraduate className="me-2 text-primary" />
                    Semester
                  </h6>

                  <p>Semester {student.semester}</p>

                </Col>

              </Row>

              <div className="mt-4">

                <Button
                  variant="primary"
                  className="me-3"
                >
                  <FaEdit className="me-2" />
                  Edit Profile
                </Button>

                <Button variant="warning">

                  <FaLock className="me-2" />

                  Change Password

                </Button>

              </div>

            </Col>

          </Row>

        </Card.Body>

      </Card>

    </div>
  );
};

export default StudentProfile;