import axios from "axios";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";

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
  teacher: Teacher1[];
}

interface Teacher1 {
  id: number;
  ismsg: boolean;
  msgToApp: string;
  msgToUser: string;
  name: string;
  nameEng: string;
  status: string;
}

const Approval = () => {
  let count = [1, 2, 3, 4, 5];
  const navigate = useNavigate();
  const location = useLocation();
  const courseID: string = location.pathname.split("/").slice(-1)[0];
  const [course, setCourses] = useState<Courses>();

  useEffect(() => {
    let id = sessionStorage.getItem("id");
    if (id === "" || id === null) {
      navigate("/login");
    }
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/courses/" + courseID
        );
        setCourses(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCourses();
  }, []);

  const onMsgUsr = async (event: any, UsId: number) => {
    event.preventDefault();
    const target = event.target.MsgUsr.value;
    const UsrId = UsId.toString();
    const CourseId = courseID;
    try {
      const user = (await axios.get("http://localhost:8080/users/" + UsrId))
        .data[0];
      const callCoursebyID = {
        getID: true,
        id: UsrId,
      };
      const CourseTeachByID = await axios.post(
        "http://localhost:8080/courses/",
        callCoursebyID
      );
      const res = await axios.get("http://localhost:8080/courses/" + CourseId);
      const eachCourse: Teacher1[] = res.data[0].teacher;
      const eachCourse1: Teacher1[] = eachCourse.filter(
        (t: Teacher1) => t.id.toString() !== UsrId
      );
      eachCourse1.push({
        id: eachCourse.filter((t: Teacher1) => t.id.toString() == UsrId)[0].id,
        ismsg: eachCourse.filter((t: Teacher1) => t.id.toString() == UsrId)[0]
          .ismsg,
        msgToApp: eachCourse.filter(
          (t: Teacher1) => t.id.toString() == UsrId
        )[0].msgToApp,
        msgToUser: target,
        name: eachCourse.filter((t: Teacher1) => t.id.toString() == UsrId)[0]
          .name,
        nameEng: eachCourse.filter((t: Teacher1) => t.id.toString() == UsrId)[0]
          .nameEng,
        status: eachCourse.filter((t: Teacher1) => t.id.toString() == UsrId)[0]
          .status,
      });
      console.log(eachCourse1);
      const updatedCourses = {
        iscourse: true,
        teachers: eachCourse1,
      };
      axios.put("http://localhost:8080/courses/" + CourseId, updatedCourses);
      refreshPage();
    } catch (err) {
      console.log(err);
    }
  };

  const refreshPage = () => {
    navigate(0);
  };

  const onApprove = async (UsId: number) => {
    const UsrId = UsId.toString();
    const CourseId = courseID;
    try {
      const user = (await axios.get("http://localhost:8080/users/" + UsrId))
        .data[0];
      const callCoursebyID = {
        getID: true,
        id: UsrId,
      };
      const CourseTeachByID = await axios.post(
        "http://localhost:8080/courses/",
        callCoursebyID
      );
      const res = await axios.get("http://localhost:8080/courses/" + CourseId);
      const eachCourse: Teacher1[] = res.data[0].teacher;
      const eachCourse1: Teacher1[] = eachCourse.filter(
        (t: Teacher1) => t.id.toString() !== UsrId
      );
      eachCourse1.push({
        id: eachCourse.filter((t: Teacher1) => t.id.toString() == UsrId)[0].id,
        ismsg: eachCourse.filter((t: Teacher1) => t.id.toString() == UsrId)[0]
          .ismsg,
        msgToApp: eachCourse.filter(
          (t: Teacher1) => t.id.toString() == UsrId
        )[0].msgToApp,
        msgToUser: eachCourse.filter(
          (t: Teacher1) => t.id.toString() == UsrId
        )[0].msgToUser,
        name: eachCourse.filter((t: Teacher1) => t.id.toString() == UsrId)[0]
          .name,
        nameEng: eachCourse.filter((t: Teacher1) => t.id.toString() == UsrId)[0]
          .nameEng,
        status: "approved",
      });
      console.log(eachCourse1);
      const updatedCourses = {
        iscourse: true,
        teachers: eachCourse1,
      };
      axios.put("http://localhost:8080/courses/" + CourseId, updatedCourses);
      refreshPage();
    } catch (err) {
      console.log(err);
    }
  };

  const onReject = async (UsId: number) => {
    const UsrId = UsId.toString();
    const CourseId = courseID;
    try {
      const user = (await axios.get("http://localhost:8080/users/" + UsrId))
        .data[0];
      const callCoursebyID = {
        getID: true,
        id: UsrId,
      };
      const CourseTeachByID = await axios.post(
        "http://localhost:8080/courses/",
        callCoursebyID
      );
      const res = await axios.get("http://localhost:8080/courses/" + CourseId);
      const eachCourse: Teacher1[] = res.data[0].teacher;
      const eachCourse1: Teacher1[] = eachCourse.filter(
        (t: Teacher1) => t.id.toString() !== UsrId
      );
      eachCourse1.push({
        id: eachCourse.filter((t: Teacher1) => t.id.toString() == UsrId)[0].id,
        ismsg: eachCourse.filter((t: Teacher1) => t.id.toString() == UsrId)[0]
          .ismsg,
        msgToApp: eachCourse.filter(
          (t: Teacher1) => t.id.toString() == UsrId
        )[0].msgToApp,
        msgToUser: eachCourse.filter(
          (t: Teacher1) => t.id.toString() == UsrId
        )[0].msgToUser,
        name: eachCourse.filter((t: Teacher1) => t.id.toString() == UsrId)[0]
          .name,
        nameEng: eachCourse.filter((t: Teacher1) => t.id.toString() == UsrId)[0]
          .nameEng,
        status: "rejected",
      });
      console.log(eachCourse1);
      const updatedCourses = {
        iscourse: true,
        teachers: eachCourse1,
      };
      axios.put("http://localhost:8080/courses/" + CourseId, updatedCourses);
      refreshPage();
    } catch (err) {
      console.log(err);
    }
  };

  const onWaiting = async (UsId: number) => {
    const UsrId = UsId.toString();
    const CourseId = courseID;
    try {
      const user = (await axios.get("http://localhost:8080/users/" + UsrId))
        .data[0];
      const callCoursebyID = {
        getID: true,
        id: UsrId,
      };
      const CourseTeachByID = await axios.post(
        "http://localhost:8080/courses/",
        callCoursebyID
      );
      const res = await axios.get("http://localhost:8080/courses/" + CourseId);
      const eachCourse: Teacher1[] = res.data[0].teacher;
      const eachCourse1: Teacher1[] = eachCourse.filter(
        (t: Teacher1) => t.id.toString() !== UsrId
      );
      eachCourse1.push({
        id: eachCourse.filter((t: Teacher1) => t.id.toString() == UsrId)[0].id,
        ismsg: eachCourse.filter((t: Teacher1) => t.id.toString() == UsrId)[0]
          .ismsg,
        msgToApp: eachCourse.filter(
          (t: Teacher1) => t.id.toString() == UsrId
        )[0].msgToApp,
        msgToUser: eachCourse.filter(
          (t: Teacher1) => t.id.toString() == UsrId
        )[0].msgToUser,
        name: eachCourse.filter((t: Teacher1) => t.id.toString() == UsrId)[0]
          .name,
        nameEng: eachCourse.filter((t: Teacher1) => t.id.toString() == UsrId)[0]
          .nameEng,
        status: "pending",
      });
      console.log(eachCourse1);
      const updatedCourses = {
        iscourse: true,
        teachers: eachCourse1,
      };
      axios.put("http://localhost:8080/courses/" + CourseId, updatedCourses);
      refreshPage();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div
        className="card"
        style={{
          margin: "5% 0% 0% 0%",
          padding: "5% 10px 0% 10px",
          textAlign: "center",
        }}
      >
        <div className="" style={{ fontSize: "30px" }}>
          APPROVAL
        </div>
        <table
          className="table table-bordered"
          style={{ backgroundColor: "white", fontSize: "14px" }}
        >
          <thead>
            <tr>
              <th scope="col">Sem</th>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Sect</th>
              <td scope="col">Status</td>
            </tr>
          </thead>
          {course && (
            <tbody className="table-group-divider" key={course.id}>
              <tr>
                <td scope="col">{course.semester}</td>
                <td scope="col">{course.code}</td>
                <td scope="col">{course.name}</td>
                <td scope="col">{course.section}</td>
                <td>
                  {course.teacher ? (
                    course.teacher.length != 0 ? (
                      course.teacher
                        .map(function (tt) {
                          return tt.status;
                        })
                        .includes("pending") ? (
                        <p style={{ color: "orange" }}>pending</p>
                      ) : (
                        <p style={{ color: "green" }}>complete</p>
                      )
                    ) : (
                      <p style={{ color: "black" }}>no registration</p>
                    )
                  ) : (
                    <p style={{ color: "black" }}>no registration</p>
                  )}
                </td>
              </tr>
              <tr>
                <th colSpan={5}>CANDIDATE TEACHERS</th>
              </tr>
              {course.teacher.map((t: Teacher1, index) => (
                <>
                  <tr>
                    <td colSpan={3}>{t.name}</td>
                    <td className="d-flex justify-content-evenly">
                      <button
                        className="btn btn btn-success"
                        onClick={() => onApprove(t.id)}
                        style={{
                          width: "25%",
                          height: "50%",
                          margin: "0 0 0 0",
                        }}
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => onReject(t.id)}
                        className="btn btn btn-danger"
                        style={{
                          width: "25%",
                          height: "50%",
                          margin: "0 0 0 0",
                        }}
                      >
                        X
                      </button>
                      <button
                        onClick={() => onWaiting(t.id)}
                        className="btn btn btn-warning"
                        style={{
                          width: "25%",
                          height: "50%",
                          margin: "0 0 0 0",
                        }}
                      >
                        ⌛
                      </button>
                    </td>
                    <td>
                      {t.status == "pending" ? (
                        <p style={{ color: "orange" }}>{t.status}</p>
                      ) : t.status == "approved" ? (
                        <p style={{ color: "green" }}>{t.status}</p>
                      ) : (
                        <p style={{ color: "black" }}>{t.status}</p>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={1}>
                      <b>Message to Approver</b>
                    </td>
                    <td colSpan={4} style={{ color: "blue" }}>
                      {t.msgToApp}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={5}>
                      {t.msgToUser ? (
                        t.msgToUser != "" ? (
                          <div style={{ color: "blue" }}>"{t.msgToUser}"</div>
                        ) : (
                          <div style={{ color: "blue" }}>
                            "No message to this teacher"
                          </div>
                        )
                      ) : (
                        <div style={{ color: "blue" }}>
                          "No message to this teacher"
                        </div>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={1}>
                      <b>Message to Teacher</b>
                    </td>
                    <td colSpan={4}>
                      <form
                        onSubmit={(event) => onMsgUsr(event, t.id)}
                        className="form-control d-flex justify-content-around"
                        style={{
                          margin: "0 0% 0 0%",
                          width: "100%",
                          height: "80%",
                          alignItems: "center",
                          backgroundColor: "white",
                        }}
                      >
                        <input
                          type="text"
                          defaultValue={
                            course.teacher.filter(
                              (t: Teacher1) =>
                                t.id ===
                                parseInt(sessionStorage.getItem("id") || "0")
                            )[0]?.msgToUser
                              ? course.teacher.filter(
                                  (t: Teacher1) =>
                                    t.id ===
                                    parseInt(
                                      sessionStorage.getItem("id") || "0"
                                    )
                                )[0]?.msgToUser
                              : ""
                          }
                          className="form-control"
                          style={{
                            width: "80%",
                            height: "50%",
                            margin: "0 0 0 0",
                          }}
                          id="MsgUsr"
                        />
                        <button
                          className="btn btn btn-secondary"
                          type="submit"
                          style={{
                            maxWidth: "25%",
                            height: "50%",
                            margin: "0 0 0 1%",
                            fontSize: "10px",
                          }}
                        >
                          submit
                        </button>
                      </form>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          )}
        </table>
        <button
          className="btn btn-outline-danger my-3 mx-5"
          onClick={() => navigate("/approver")}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Approval;
