import React, { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";
import { Container, Card, Alert } from "react-bootstrap";

const ScanQR = () => {
  const [message, setMessage] = useState("");
  const [isScanning, setIsScanning] = useState(true);

  const scannerRef = useRef(null);

  // Logged in student
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const timer = setTimeout(() => {
      startScanner();
    }, 300);

    return () => {
      stopScanner();
      clearTimeout(timer);
    };
  }, []);

  // =======================
  // START QR SCANNER
  // =======================
  const startScanner = () => {
    if (scannerRef.current) return;

    scannerRef.current = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: {
          width: 250,
          height: 250,
        },
        aspectRatio: 1,
      },
      false
    );

    scannerRef.current.render(
      async (decodedText) => {
        // Prevent multiple scans
        if (!isScanning) return;

        setIsScanning(false);

        // Debug: Check what is actually scanned
        console.log("QR SCANNED VALUE:", decodedText);

        try {
          // Stop camera immediately after scan
          await stopScanner();

          const res = await axios.post(
  "http://localhost:8000/api/attendance/mark",
  {
    email: user?.email,
    qrToken: decodedText,
  }
);

          console.log("Attendance Response:", res.data);

          setMessage(res.data.message);

        } catch (err) {
          console.log("Attendance Error:", err.response?.data);

          setMessage(
            err.response?.data?.message || "Attendance Failed"
          );
        }
      },
      (error) => {
        // Ignore scanning errors
      }
    );
  };

  // =======================
  // STOP CAMERA
  // =======================
  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.clear();
      } catch (err) {
        console.log("Scanner Stop Error:", err);
      }

      scannerRef.current = null;
    }
  };

  return (
    <Container className="mt-4">
      <Card className="shadow p-4">

        <h2 className="text-center mb-4">
          Scan Attendance QR
        </h2>

        {/* Camera */}
        <div
          id="reader"
          style={{
            width: "100%",
            maxWidth: "400px",
            margin: "auto",
          }}
        ></div>

        {/* Message */}
        {message && (
          <Alert variant="info" className="mt-3">
            {message}
          </Alert>
        )}

      </Card>
    </Container>
  );
};

export default ScanQR;