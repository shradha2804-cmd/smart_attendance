import React, { useEffect, useState } from "react";

import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import {
  getDepartments,
  getCourses,
  getTeachers,
  generateQR,
} from "../../services/qrService";
const user = JSON.parse(localStorage.getItem("user"));
const GenerateQR = () => {

  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [qrImage, setQrImage] = useState("");
  const [expireTime, setExpireTime] = useState("");

  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
  teacher: user?._id || "",
  course: "",
  department: "",
  semester: "",
  lectureName: "",
});

  useEffect(() => {

    loadData();

  }, []);

  const loadData = async () => {

    try {

      const teacherRes = await getTeachers();

      const courseRes = await getCourses();

      const departmentRes = await getDepartments();

      setTeachers(teacherRes.data.teachers);

      setCourses(courseRes.data.courses);

      setDepartments(departmentRes.data.departments);

    } catch (err) {

      console.log(err);

    }

  };

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  const handleGenerate = async () => {

    try {

      const res = await generateQR(formData);

      setQrImage(res.data.qrImage);

      setExpireTime(res.data.expiresAt);

      setMessage("QR Generated Successfully");

    } catch (err) {

      setMessage(err.response?.data?.message || "Error");

    }

  };
const downloadQR = () => {

  const link = document.createElement("a");

  link.href = qrImage;

  link.download = `AttendanceQR_${Date.now()}.png`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

};
  return (

    <Container className="mt-4">

      <Card className="shadow p-4">

        <h2 className="text-center mb-4">
          Generate QR
        </h2>

        {message &&

          <Alert>

            {message}

          </Alert>

        }

        <Row>

          <Col md={6}>

            <Form.Group>

              <Form.Label>

                Teacher

              </Form.Label>

              <Form.Select
                name="teacher"
                onChange={handleChange}
              >

                <option>

                  Select Teacher

                </option>

                {

                  teachers.map((teacher) => (

                    <option
                      key={teacher._id}
                      value={teacher._id}
                    >

                      {teacher.name}

                    </option>

                  ))

                }

              </Form.Select>

            </Form.Group>

          </Col>

          <Col md={6}>

            <Form.Group>

              <Form.Label>

                Department

              </Form.Label>

              <Form.Select
                name="department"
                onChange={handleChange}
              >

                <option>

                  Select Department

                </option>

                {

                  departments.map((department) => (

                    <option
                      key={department._id}
                      value={department._id}
                    >

                      {department.departmentName}

                    </option>

                  ))

                }

              </Form.Select>

            </Form.Group>

          </Col>

        </Row>

        <br/>

        <Row>

          <Col md={6}>

            <Form.Group>

              <Form.Label>

                Course

              </Form.Label>

              <Form.Select
                name="course"
                onChange={handleChange}
              >

                <option>

                  Select Course

                </option>

                {

                  courses.map((course) => (

                    <option
                      key={course._id}
                      value={course._id}
                    >

                      {course.courseName}

                    </option>

                  ))

                }

              </Form.Select>

            </Form.Group>

          </Col>

          <Col md={6}>

            <Form.Group>

              <Form.Label>

                Semester

              </Form.Label>

              <Form.Select
                name="semester"
                onChange={handleChange}
              >

                <option>1</option>

                <option>2</option>

                <option>3</option>

                <option>4</option>

                <option>5</option>

                <option>6</option>

                <option>7</option>

                <option>8</option>

              </Form.Select>

            </Form.Group>

          </Col>

        </Row>

        <br/>

        <Form.Group>

          <Form.Label>

            Lecture Name

          </Form.Label>

          <Form.Control
            type="text"
            name="lectureName"
            onChange={handleChange}
          />

        </Form.Group>

        <br/>

        <Button
          onClick={handleGenerate}
        >

          Generate QR

        </Button>

       {
  qrImage && (

    <div className="text-center mt-4">

      <img
        src={qrImage}
        alt="QR"
        width={250}
      />

      <h5 className="mt-3">
        Valid Till
      </h5>

      <h6>
        {new Date(expireTime).toLocaleTimeString()}
      </h6>

      <div className="mt-3">

        <Button
          variant="success"
          onClick={downloadQR}
        >
          Download QR
        </Button>

      </div>

    </div>

  )
}

      </Card>

    </Container>

  );

};

export default GenerateQR;