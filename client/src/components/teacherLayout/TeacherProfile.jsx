import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Form,
  Button,
  Image,
  Alert,
  Spinner,
} from "react-bootstrap";

import { getTeacherProfile } from "../../services/teacherProfileService";

const TeacherProfile = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  const [teacher, setTeacher] = useState(null);

  const [message, setMessage] = useState("");

  useEffect(() => {

    loadProfile();

  }, []);

  const loadProfile = async () => {

    try {

      const res = await getTeacherProfile(user.email);

      setTeacher(res.data.teacher);

    } catch (err) {

      console.log(err);

    }

  };

  const handleChange = (e) => {

    setTeacher({

      ...teacher,

      [e.target.name]: e.target.value,

    });

  };

  const updateProfile = (e) => {

    e.preventDefault();

    // Update API will be connected later

    setMessage("Profile Updated Successfully");

  };

  if (!teacher) {

    return (

      <div className="text-center mt-5">

        <Spinner animation="border" />

      </div>

    );

  }

  return (

    <div>

      <h2 className="mb-4">

        Teacher Profile

      </h2>

      {

        message &&

        <Alert variant="success">

          {message}

        </Alert>

      }

      <Card className="shadow">

        <Card.Body>

          <Row>

            <Col
              md={4}
              className="text-center"
            >

              <Image
                src={
                  teacher.photo
                    ? teacher.photo
                    : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                roundedCircle
                width={180}
                height={180}
              />

              <h4 className="mt-3">

                {teacher.name}

              </h4>

              <p>

                Teacher

              </p>

            </Col>

            <Col md={8}>

              <Form onSubmit={updateProfile}>

                <Row>

                  <Col md={6}>

                    <Form.Group className="mb-3">

                      <Form.Label>

                        Full Name

                      </Form.Label>

                      <Form.Control
                        name="name"
                        value={teacher.name}
                        onChange={handleChange}
                      />

                    </Form.Group>

                  </Col>

                  <Col md={6}>

                    <Form.Group className="mb-3">

                      <Form.Label>

                        Email

                      </Form.Label>

                      <Form.Control
                        name="email"
                        value={teacher.email}
                        readOnly
                      />

                    </Form.Group>

                  </Col>

                </Row>

                <Row>

                  <Col md={6}>

                    <Form.Group className="mb-3">

                      <Form.Label>

                        Contact

                      </Form.Label>

                      <Form.Control
                        name="contact"
                        value={teacher.contact}
                        onChange={handleChange}
                      />

                    </Form.Group>

                  </Col>

                  <Col md={6}>

                    <Form.Group className="mb-3">

                      <Form.Label>

                        Department

                      </Form.Label>

                      <Form.Control
                        value={
                          teacher.department?.departmentName || ""
                        }
                        readOnly
                      />

                    </Form.Group>

                  </Col>

                </Row>

                <Row>

                  <Col md={6}>

                    <Form.Group className="mb-3">

                      <Form.Label>

                        Qualification

                      </Form.Label>

                      <Form.Control
                        name="qualification"
                        value={teacher.qualification}
                        onChange={handleChange}
                      />

                    </Form.Group>

                  </Col>

                  <Col md={6}>

                    <Form.Group className="mb-3">

                      <Form.Label>

                        Experience

                      </Form.Label>

                      <Form.Control
                        name="experience"
                        value={teacher.experience}
                        onChange={handleChange}
                      />

                    </Form.Group>

                  </Col>

                </Row>

                <Form.Group className="mb-4">

                  <Form.Label>

                    Upload Photo

                  </Form.Label>

                  <Form.Control
                    type="file"
                  />

                </Form.Group>

                <Button
                  type="submit"
                  variant="success"
                >

                  Update Profile

                </Button>

              </Form>

            </Col>

          </Row>

        </Card.Body>

      </Card>

    </div>

  );

};

export default TeacherProfile;