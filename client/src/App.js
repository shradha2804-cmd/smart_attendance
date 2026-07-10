import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import GuestLayout from './components/guestLayout/GuestLayout';
import Home from './components/guestLayout/Home';
import About from './components/guestLayout/About';
import Services from './components/guestLayout/Services';
import Contact from './components/guestLayout/Contact';
import Register from './components/guestLayout/Register';
import Login from './components/guestLayout/Login';
import ForgotPassword from './components/guestLayout/ForgotPassword';
import ChangePassword from './components/guestLayout/ChangePassword';
import AdminLayout from './components/adminLayout/AdminLayout';
import Dashboard from './components/adminLayout/Dashboard';
import Courses from './components/adminLayout/Courses';
import Departments from './components/adminLayout/Department';
import Reports from './components/adminLayout/Reports';
import Students from './components/adminLayout/Students';
import Teachers from './components/adminLayout/Teachers';
import TeacherLayout from './components/teacherLayout/TeacherLayout';
import TeacherDashboard from './components/teacherLayout/TeacherDashboard';
import GenerateQR from './components/teacherLayout/GenerateQR';
import Attendance from './components/teacherLayout/Attendance';
import LiveAttendance from './components/teacherLayout/LiveAttendance';
import TeacherProfile from './components/teacherLayout/TeacherProfile';
import StudentLayout from './components/studentLayout/StudentLayout';
import AttendanceHistory from './components/studentLayout/AttendanceHistory';
import ScanQR from './components/studentLayout/ScanQR';
import StudentDashboard from './components/studentLayout/StudentDashboard';
import StudentProfile from './components/studentLayout/StudentProfile';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<GuestLayout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/services" element={<Services />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/changepassword" element={<ChangePassword />} />

          </Route>
  {/* -------------------admin-------------------         */}
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="courses" element={<Courses />} />
          <Route path="departments" element={<Departments />} />
          <Route path="reports" element={<Reports />}/>
          <Route path="students" element={<Students />} />
          <Route path="teachers" element={<Teachers />} />
        </Route>


{/* -------------------Teacher-------------------         */}
        <Route path='/teacher' element={<TeacherLayout />}>
          <Route index element={<TeacherDashboard />} />
          <Route path="dashboard" element={<TeacherDashboard />} />
          <Route path="generateqr" element={<GenerateQR />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="liveattendance" element={<LiveAttendance />}/>
          <Route path="teacherprofile" element={<TeacherProfile />} />
        </Route>    


{/* -------------------student-------------------         */}
        <Route path='/student' element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="studentdashboard" element={<StudentDashboard />} />
          <Route path="attendancehistory" element={<AttendanceHistory />} />
          <Route path="scanqr" element={<ScanQR />} />
          <Route path="studentprofile" element={<StudentProfile />} />
          
        </Route>  

      </Routes>
    </div>
  );
}

export default App;