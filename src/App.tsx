import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import CourseSelect from "./components/CourseSelect/CourseSelect";
import Users from "./components/Admin/Users/Users";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Register from "./components/Register/Register";
import "react-toastify/dist/ReactToastify.css";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import axios from "axios";
import UpdateUser from "./components/Admin/Users/UpdateUser";
import Courses from "./components/Admin/Courses/Courses";
import UpdateCourse from "./components/Admin/Courses/UpdateCourse";
import AddCourse from "./components/Admin/Courses/AddCourse";
import Approver from "./components/Approver/Approver";
import Approval from "./components/Approver/Approval";

interface Courses {
  id: string;
  code: string;
  semester: string;
  name: string;
  type: string;
  credit: string;
  section: string;
  date: string;
  time: string;
  place: string;
  student: string;
  curriculum: string;
  level: string;
  teacher: string;
}

function App() {
  return (
    <div className="wrapper">
      <ToastContainer></ToastContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Profile />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/approver" element={<Approver />}></Route>
          <Route path="/approver/:id" element={<Approval />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/changePassword" element={<ChangePassword />}></Route>
          <Route path="/courseSelect" element={<CourseSelect />}></Route>
          <Route path="/admin/users/" element={<Users />}></Route>
          <Route
            path="/admin/users/update/:id"
            element={<UpdateUser />}
          ></Route>
          <Route path="/admin/courses/" element={<Courses />}></Route>
          <Route
            path="/admin/courses/update/:id"
            element={<UpdateCourse />}
          ></Route>
          <Route path="/admin/courses/add/" element={<AddCourse />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
