import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";
import { Accordion } from "react-bootstrap";
import { BsCartFill, BsTrash3Fill } from "react-icons/bs";
import axios from "axios";
import { date, optional, z } from "zod";
import { FieldValues, useForm } from "react-hook-form";

interface Props {
  id: string;
  code: string;
  name: string;
  section: string;
  semester: string;
  status: string;
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

const schema = z.object({
  Msg: z.string(),
});
type FormData = z.infer<typeof schema>;

const Profile = () => {
  const { register, handleSubmit } = useForm<FormData>();
  let name = sessionStorage.getItem("name");
  const navigate = useNavigate();
  const [teachCourses, setTeachCourses] = useState<Props[]>([]);
  let count1 = 1;
  let count2 = 1;
  let count3 = 1;
  let count4 = 1;

  useEffect(() => {
    let id = sessionStorage.getItem("id");
    if (id === "" || id === null) {
      navigate("/login");
    }
    if (id) {
      const fetchUserCourses = async () => {
        try {
          const callCoursebyID = {
            getID: true,
            id: id,
          };
          const CourseTeachByID = await axios.post(
            "http://localhost:8080/courses/",
            callCoursebyID
          );
          if (CourseTeachByID.data) {
            setTeachCourses(CourseTeachByID.data);
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchUserCourses();
    }
  }, []);

  const showMsg = async (id: string) => {
    const UserId = sessionStorage.getItem("id");
    try {
      const user = (await axios.get("http://localhost:8080/users/" + UserId))
        .data[0];
      const callCoursebyID = {
        getID: true,
        id: UserId,
      };
      const CourseTeachByID = await axios.post(
        "http://localhost:8080/courses/",
        callCoursebyID
      );
      const MatchCourse: Props[] = CourseTeachByID.data.filter(
        (c: Teacher1) => parseInt(id) === c.id
      );
      const ShowIsMsg = MatchCourse[0].teacher.filter(
        (t: Teacher1) => t.id === parseInt(sessionStorage.getItem("id") || "0")
      )[0]?.ismsg;

      const res = await axios.get("http://localhost:8080/courses/" + id);
      const eachCourse: Teacher1[] = res.data[0].teacher;
      const eachCourse1: Teacher1[] = eachCourse.filter(
        (t: Teacher1) => t.id.toString() !== UserId
      );

      eachCourse1.push({
        id: eachCourse.filter((t: Teacher1) => t.id.toString() == UserId)[0].id,
        ismsg: !eachCourse.filter((t: Teacher1) => t.id.toString() == UserId)[0]
          .ismsg,
        msgToApp: eachCourse.filter(
          (t: Teacher1) => t.id.toString() == UserId
        )[0].msgToApp,
        msgToUser: eachCourse.filter(
          (t: Teacher1) => t.id.toString() == UserId
        )[0].msgToUser,
        name: eachCourse.filter((t: Teacher1) => t.id.toString() == UserId)[0]
          .name,
        nameEng: eachCourse.filter(
          (t: Teacher1) => t.id.toString() == UserId
        )[0].nameEng,
        status: eachCourse.filter((t: Teacher1) => t.id.toString() == UserId)[0]
          .status,
      });
      console.log(eachCourse1);
      const updatedCourses = {
        iscourse: true,
        teachers: eachCourse1,
      };
      axios.put("http://localhost:8080/courses/" + id, updatedCourses);
      location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  const onMsg = async (data: FieldValues, id: string) => {
    const UserId = sessionStorage.getItem("id");
    console.log(data.Msg);
    console.log(id);

    try {
      const user = (await axios.get("http://localhost:8080/users/" + UserId))
        .data[0];
      const callCoursebyID = {
        getID: true,
        id: UserId,
      };
      const CourseTeachByID = await axios.post(
        "http://localhost:8080/courses/",
        callCoursebyID
      );
      const MatchCourse: Props[] = CourseTeachByID.data.filter(
        (c: Teacher1) => parseInt(id) === c.id
      );

      const res = await axios.get("http://localhost:8080/courses/" + id);
      const eachCourse: Teacher1[] = res.data[0].teacher;
      const eachCourse1: Teacher1[] = eachCourse.filter(
        (t: Teacher1) => t.id.toString() !== UserId
      );

      eachCourse1.push({
        id: eachCourse.filter((t: Teacher1) => t.id.toString() == UserId)[0].id,
        ismsg: !eachCourse.filter((t: Teacher1) => t.id.toString() == UserId)[0]
          .ismsg,
        msgToApp: data.Msg,
        msgToUser: eachCourse.filter(
          (t: Teacher1) => t.id.toString() == UserId
        )[0].msgToUser,
        name: eachCourse.filter((t: Teacher1) => t.id.toString() == UserId)[0]
          .name,
        nameEng: eachCourse.filter(
          (t: Teacher1) => t.id.toString() == UserId
        )[0].nameEng,
        status: eachCourse.filter((t: Teacher1) => t.id.toString() == UserId)[0]
          .status,
      });
      console.log(eachCourse1);
      const updatedCourses = {
        iscourse: true,
        teachers: eachCourse1,
      };
      axios.put("http://localhost:8080/courses/" + id, updatedCourses);
      location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const onLogout = () => {
    sessionStorage.clear();
    window.location.reload();
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
        <div className="">
          <h1
            style={{
              margin: "0 0 30px 1%",
              textAlign: "left",
              fontFamily: "Noto Sans Thai",
            }}
          >
            {name}
          </h1>
          <div className="d-flex">
            <div className="" style={{ width: "100%" }}>
              {/* 1stSemester *************************************************************************************************************** */}
              <Accordion
                style={{
                  margin: "1% 3% 1% 3%",
                  textAlign: "center",
                }}
                defaultActiveKey="0"
              >
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    <b>Courses</b>: 1st Semester
                  </Accordion.Header>
                  <Accordion.Body>
                    <p style={{ textAlign: "left", fontSize: "20px" }}>
                      <b>SEMESTER 1</b>
                    </p>
                    <div
                      className="table-responsive"
                      style={{ textAlign: "left", display: "flex" }}
                    >
                      <table
                        className="table table-bordered"
                        style={{
                          margin: "0% 0% 0% 0%",
                          fontSize: "14px",
                          verticalAlign: "middle",
                        }}
                      >
                        <thead>
                          <tr>
                            <th className="c">#</th>
                            <th className="c">ID</th>
                            <th className="c">Courses</th>
                            <th className="c">Section</th>
                            <th className="c">Status</th>
                          </tr>
                        </thead>
                        {teachCourses &&
                        teachCourses?.length !== 0 &&
                        teachCourses.filter((c) => c.semester === "1")
                          .length !== 0 ? (
                          teachCourses
                            .filter((c) => c.semester === "1")
                            .map((c) => (
                              <tbody key={c.id}>
                                <tr>
                                  <td
                                    rowSpan={3}
                                    className="c"
                                    style={{ width: "2.5%" }}
                                  >
                                    {count1++}
                                  </td>
                                  <td className="c" style={{ width: "25%" }}>
                                    {c.code}
                                  </td>
                                  <td className="" style={{ width: "auto" }}>
                                    {c.name}
                                  </td>
                                  <td className="c" style={{ width: "6%" }}>
                                    {c.section}
                                  </td>
                                  <td className="c" style={{ width: "10%" }}>
                                    {c.teacher &&
                                    c.teacher.filter(
                                      (t: Teacher1) =>
                                        t.id ===
                                        parseInt(
                                          sessionStorage.getItem("id") || "0"
                                        )
                                    )[0]?.status == "approved" ? (
                                      <b style={{ color: "green" }}>
                                        {
                                          c.teacher.filter(
                                            (t: Teacher1) =>
                                              t.id ===
                                              parseInt(
                                                sessionStorage.getItem("id") ||
                                                  "0"
                                              )
                                          )[0]?.status
                                        }
                                      </b>
                                    ) : c.teacher.filter(
                                        (t: Teacher1) =>
                                          t.id ===
                                          parseInt(
                                            sessionStorage.getItem("id") || "0"
                                          )
                                      )[0]?.status == "pending" ? (
                                      <b style={{ color: "orange" }}>
                                        {
                                          c.teacher.filter(
                                            (t: Teacher1) =>
                                              t.id ===
                                              parseInt(
                                                sessionStorage.getItem("id") ||
                                                  "0"
                                              )
                                          )[0]?.status
                                        }
                                      </b>
                                    ) : (
                                      <b style={{ color: "red" }}>
                                        {
                                          c.teacher.filter(
                                            (t: Teacher1) =>
                                              t.id ===
                                              parseInt(
                                                sessionStorage.getItem("id") ||
                                                  "0"
                                              )
                                          )[0]?.status
                                        }
                                      </b>
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="" style={{ width: "26%" }}>
                                    <b>Message to approver</b>
                                    &ensp;&ensp;&ensp;
                                    <button
                                      onClick={() => showMsg(c.id)}
                                      className="btn btn-outline-warning"
                                      style={{
                                        fontSize: "12px",
                                        padding: "1px 5px 1px 5px",
                                      }}
                                    >
                                      ADD/EDIT
                                    </button>
                                  </td>
                                  <td
                                    colSpan={3}
                                    className=""
                                    style={{ width: "auto" }}
                                  >
                                    {c.teacher &&
                                    c.teacher.filter(
                                      (t: Teacher1) =>
                                        t.id ===
                                        parseInt(
                                          sessionStorage.getItem("id") || "0"
                                        )
                                    )[0]?.ismsg == true ? (
                                      <form
                                        onSubmit={handleSubmit((data) =>
                                          onMsg(data, c.id)
                                        )}
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
                                            c.teacher.filter(
                                              (t: Teacher1) =>
                                                t.id ===
                                                parseInt(
                                                  sessionStorage.getItem(
                                                    "id"
                                                  ) || "0"
                                                )
                                            )[0]?.msgToApp
                                          }
                                          className="form-control"
                                          style={{
                                            width: "80%",
                                            height: "50%",
                                            margin: "0 0 0 0",
                                          }}
                                          {...register("Msg")}
                                        />
                                        <button
                                          className="btn btn btn-success"
                                          type="submit"
                                          style={{
                                            width: "10%",
                                            height: "50%",
                                            margin: "0 0 0 0",
                                          }}
                                        >
                                          ✓
                                        </button>
                                      </form>
                                    ) : (
                                      <p style={{ margin: "0 0 0 0" }}>
                                        {
                                          c.teacher.filter(
                                            (t: Teacher1) =>
                                              t.id ===
                                              parseInt(
                                                sessionStorage.getItem("id") ||
                                                  "0"
                                              )
                                          )[0]?.msgToApp
                                        }
                                      </p>
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="" style={{ width: "26%" }}>
                                    <b>Comments from Approvers</b>
                                  </td>
                                  <td
                                    colSpan={3}
                                    className=""
                                    style={{ width: "auto" }}
                                  >
                                    <p style={{ margin: "0 0 0 0" }}>
                                      {
                                        c.teacher.filter(
                                          (t: Teacher1) =>
                                            t.id ===
                                            parseInt(
                                              sessionStorage.getItem("id") ||
                                                "0"
                                            )
                                        )[0]?.msgToUser
                                      }
                                    </p>
                                  </td>
                                </tr>
                              </tbody>
                            ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="c">
                              No courses to teach!
                            </td>
                          </tr>
                        )}
                      </table>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                {/* 2ndSemester *************************************************************************************************************** */}
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <b>Courses</b>: 2nd Semester
                  </Accordion.Header>
                  <Accordion.Body>
                    <p style={{ textAlign: "left", fontSize: "20px" }}>
                      <b>SEMESTER 2</b>
                    </p>
                    <div
                      className="table-responsive"
                      style={{ textAlign: "left", display: "flex" }}
                    >
                      <table
                        className="table table-bordered"
                        style={{
                          margin: "0% 0% 0% 0%",
                          fontSize: "14px",
                          verticalAlign: "middle",
                        }}
                      >
                        <thead>
                          <tr>
                            <th className="c">#</th>
                            <th className="c">ID</th>
                            <th className="c">Courses</th>
                            <th className="c">Section</th>
                            <th className="c">Status</th>
                          </tr>
                        </thead>
                        {teachCourses &&
                        teachCourses?.length !== 0 &&
                        teachCourses.filter((c) => c.semester === "2")
                          .length !== 0 ? (
                          teachCourses
                            .filter((c) => c.semester === "2")
                            .map((c) => (
                              <tbody key={c.id}>
                                <tr>
                                  <td
                                    rowSpan={3}
                                    className="c"
                                    style={{ width: "2.5%" }}
                                  >
                                    {count2++}
                                  </td>
                                  <td className="c" style={{ width: "25%" }}>
                                    {c.code}
                                  </td>
                                  <td className="" style={{ width: "auto" }}>
                                    {c.name}
                                  </td>
                                  <td className="c" style={{ width: "6%" }}>
                                    {c.section}
                                  </td>
                                  <td className="c" style={{ width: "10%" }}>
                                    {c.teacher &&
                                    c.teacher.filter(
                                      (t: Teacher1) =>
                                        t.id ===
                                        parseInt(
                                          sessionStorage.getItem("id") || "0"
                                        )
                                    )[0]?.status == "approved" ? (
                                      <b style={{ color: "green" }}>
                                        {
                                          c.teacher.filter(
                                            (t: Teacher1) =>
                                              t.id ===
                                              parseInt(
                                                sessionStorage.getItem("id") ||
                                                  "0"
                                              )
                                          )[0]?.status
                                        }
                                      </b>
                                    ) : c.teacher.filter(
                                        (t: Teacher1) =>
                                          t.id ===
                                          parseInt(
                                            sessionStorage.getItem("id") || "0"
                                          )
                                      )[0]?.status == "pending" ? (
                                      <b style={{ color: "orange" }}>
                                        {
                                          c.teacher.filter(
                                            (t: Teacher1) =>
                                              t.id ===
                                              parseInt(
                                                sessionStorage.getItem("id") ||
                                                  "0"
                                              )
                                          )[0]?.status
                                        }
                                      </b>
                                    ) : (
                                      <b style={{ color: "red" }}>
                                        {
                                          c.teacher.filter(
                                            (t: Teacher1) =>
                                              t.id ===
                                              parseInt(
                                                sessionStorage.getItem("id") ||
                                                  "0"
                                              )
                                          )[0]?.status
                                        }
                                      </b>
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="" style={{ width: "26%" }}>
                                    <b>Message to approver</b>
                                    &ensp;&ensp;&ensp;
                                    <button
                                      onClick={() => showMsg(c.id)}
                                      className="btn btn-outline-warning"
                                      style={{
                                        fontSize: "12px",
                                        padding: "1px 5px 1px 5px",
                                      }}
                                    >
                                      ADD/EDIT
                                    </button>
                                  </td>
                                  <td
                                    colSpan={3}
                                    className=""
                                    style={{ width: "auto" }}
                                  >
                                    {c.teacher &&
                                    c.teacher.filter(
                                      (t: Teacher1) =>
                                        t.id ===
                                        parseInt(
                                          sessionStorage.getItem("id") || "0"
                                        )
                                    )[0]?.ismsg == true ? (
                                      <form
                                        onSubmit={handleSubmit((data) =>
                                          onMsg(data, c.id)
                                        )}
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
                                            c.teacher.filter(
                                              (t: Teacher1) =>
                                                t.id ===
                                                parseInt(
                                                  sessionStorage.getItem(
                                                    "id"
                                                  ) || "0"
                                                )
                                            )[0]?.msgToApp
                                          }
                                          className="form-control"
                                          // value={c.teacher.filter((t: Teacher1) =>t.id ===parseInt(sessionStorage.getItem("id") || "0"))[0]?.msgToApp}
                                          style={{
                                            width: "80%",
                                            height: "50%",
                                            margin: "0 0 0 0",
                                          }}
                                          {...register("Msg")}
                                        />
                                        <button
                                          className="btn btn btn-success"
                                          type="submit"
                                          style={{
                                            width: "10%",
                                            height: "50%",
                                            margin: "0 0 0 0",
                                          }}
                                        >
                                          ✓
                                        </button>
                                      </form>
                                    ) : (
                                      <p style={{ margin: "0 0 0 0" }}>
                                        {
                                          c.teacher.filter(
                                            (t: Teacher1) =>
                                              t.id ===
                                              parseInt(
                                                sessionStorage.getItem("id") ||
                                                  "0"
                                              )
                                          )[0]?.msgToApp
                                        }
                                      </p>
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="" style={{ width: "26%" }}>
                                    <b>Comments from Approvers</b>
                                  </td>
                                  <td
                                    colSpan={3}
                                    className=""
                                    style={{ width: "auto" }}
                                  >
                                    <p style={{ margin: "0 0 0 0" }}>
                                      {
                                        c.teacher.filter(
                                          (t: Teacher1) =>
                                            t.id ===
                                            parseInt(
                                              sessionStorage.getItem("id") ||
                                                "0"
                                            )
                                        )[0]?.msgToUser
                                      }
                                    </p>
                                  </td>
                                </tr>
                              </tbody>
                            ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="c">
                              No courses to teach!
                            </td>
                          </tr>
                        )}
                      </table>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                {/* Special (TH) *************************************************************************************************************** */}
                <Accordion.Item eventKey="3">
                  <Accordion.Header>
                    <b>Courses</b>: Special (TH)
                  </Accordion.Header>
                  <Accordion.Body>
                    <p style={{ textAlign: "left", fontSize: "20px" }}>
                      <b>SPECIAL (TH)</b>
                    </p>
                    <div
                      className="table-responsive"
                      style={{ textAlign: "left", display: "flex" }}
                    >
                      <table
                        className="table table-bordered"
                        style={{
                          margin: "0% 0% 0% 0%",
                          fontSize: "14px",
                          verticalAlign: "middle",
                        }}
                      >
                        <thead>
                          <tr>
                            <th className="c">#</th>
                            <th className="c">ID</th>
                            <th className="c">Courses</th>
                            <th className="c">Section</th>
                            <th className="c">Status</th>
                          </tr>
                        </thead>
                        {teachCourses &&
                        teachCourses?.length !== 0 &&
                        teachCourses.filter(
                          (c) => c.semester === "Special (TH)"
                        ).length !== 0 ? (
                          teachCourses
                            .filter((c) => c.semester === "Special (TH)")
                            .map((c) => (
                              <tbody key={c.id}>
                                <tr>
                                  <td
                                    rowSpan={3}
                                    className="c"
                                    style={{ width: "2.5%" }}
                                  >
                                    {count3++}
                                  </td>
                                  <td className="c" style={{ width: "25%" }}>
                                    {c.code}
                                  </td>
                                  <td className="" style={{ width: "auto" }}>
                                    {c.name}
                                  </td>
                                  <td className="c" style={{ width: "6%" }}>
                                    {c.section}
                                  </td>
                                  <td className="c" style={{ width: "10%" }}>
                                    {c.teacher &&
                                    c.teacher.filter(
                                      (t: Teacher1) =>
                                        t.id ===
                                        parseInt(
                                          sessionStorage.getItem("id") || "0"
                                        )
                                    )[0]?.status == "approved" ? (
                                      <b style={{ color: "green" }}>
                                        {
                                          c.teacher.filter(
                                            (t: Teacher1) =>
                                              t.id ===
                                              parseInt(
                                                sessionStorage.getItem("id") ||
                                                  "0"
                                              )
                                          )[0]?.status
                                        }
                                      </b>
                                    ) : c.teacher.filter(
                                        (t: Teacher1) =>
                                          t.id ===
                                          parseInt(
                                            sessionStorage.getItem("id") || "0"
                                          )
                                      )[0]?.status == "pending" ? (
                                      <b style={{ color: "orange" }}>
                                        {
                                          c.teacher.filter(
                                            (t: Teacher1) =>
                                              t.id ===
                                              parseInt(
                                                sessionStorage.getItem("id") ||
                                                  "0"
                                              )
                                          )[0]?.status
                                        }
                                      </b>
                                    ) : (
                                      <b style={{ color: "red" }}>
                                        {
                                          c.teacher.filter(
                                            (t: Teacher1) =>
                                              t.id ===
                                              parseInt(
                                                sessionStorage.getItem("id") ||
                                                  "0"
                                              )
                                          )[0]?.status
                                        }
                                      </b>
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="" style={{ width: "26%" }}>
                                    <b>Message to approver</b>
                                    &ensp;&ensp;&ensp;
                                    <button
                                      onClick={() => showMsg(c.id)}
                                      className="btn btn-outline-warning"
                                      style={{
                                        fontSize: "12px",
                                        padding: "1px 5px 1px 5px",
                                      }}
                                    >
                                      ADD/EDIT
                                    </button>
                                  </td>
                                  <td
                                    colSpan={3}
                                    className=""
                                    style={{ width: "auto" }}
                                  >
                                    {c.teacher &&
                                    c.teacher.filter(
                                      (t: Teacher1) =>
                                        t.id ===
                                        parseInt(
                                          sessionStorage.getItem("id") || "0"
                                        )
                                    )[0]?.ismsg == true ? (
                                      <form
                                        onSubmit={handleSubmit((data) =>
                                          onMsg(data, c.id)
                                        )}
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
                                            c.teacher.filter(
                                              (t: Teacher1) =>
                                                t.id ===
                                                parseInt(
                                                  sessionStorage.getItem(
                                                    "id"
                                                  ) || "0"
                                                )
                                            )[0]?.msgToApp
                                          }
                                          className="form-control"
                                          style={{
                                            width: "80%",
                                            height: "50%",
                                            margin: "0 0 0 0",
                                          }}
                                          {...register("Msg")}
                                        />
                                        <button
                                          className="btn btn btn-success"
                                          type="submit"
                                          style={{
                                            width: "10%",
                                            height: "50%",
                                            margin: "0 0 0 0",
                                          }}
                                        >
                                          ✓
                                        </button>
                                      </form>
                                    ) : (
                                      <p style={{ margin: "0 0 0 0" }}>
                                        {
                                          c.teacher.filter(
                                            (t: Teacher1) =>
                                              t.id ===
                                              parseInt(
                                                sessionStorage.getItem("id") ||
                                                  "0"
                                              )
                                          )[0]?.msgToApp
                                        }
                                      </p>
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="" style={{ width: "26%" }}>
                                    <b>Comments from Approvers</b>
                                  </td>
                                  <td
                                    colSpan={3}
                                    className=""
                                    style={{ width: "auto" }}
                                  >
                                    <p style={{ margin: "0 0 0 0" }}>
                                      {
                                        c.teacher.filter(
                                          (t: Teacher1) =>
                                            t.id ===
                                            parseInt(
                                              sessionStorage.getItem("id") ||
                                                "0"
                                            )
                                        )[0]?.msgToUser
                                      }
                                    </p>
                                  </td>
                                </tr>
                              </tbody>
                            ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="c">
                              No courses to teach!
                            </td>
                          </tr>
                        )}
                      </table>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                {/* Special (TH) *************************************************************************************************************** */}
                <Accordion.Item eventKey="4">
                  <Accordion.Header>
                    <b>Courses</b>: Special (EN)
                  </Accordion.Header>
                  <Accordion.Body>
                    <p style={{ textAlign: "left", fontSize: "20px" }}>
                      <b>SPECIAL (EN)</b>
                    </p>
                    <div
                      className="table-responsive"
                      style={{ textAlign: "left", display: "flex" }}
                    >
                      <table
                        className="table table-bordered"
                        style={{
                          margin: "0% 0% 0% 0%",
                          fontSize: "14px",
                          verticalAlign: "middle",
                        }}
                      >
                        <thead>
                          <tr>
                            <th className="c">#</th>
                            <th className="c">ID</th>
                            <th className="c">Courses</th>
                            <th className="c">Section</th>
                            <th className="c">Status</th>
                          </tr>
                        </thead>
                        {teachCourses &&
                        teachCourses?.length !== 0 &&
                        teachCourses.filter(
                          (c) => c.semester === "Special (EN)"
                        ).length !== 0 ? (
                          teachCourses
                            .filter((c) => c.semester === "Special (EN)")
                            .map((c) => (
                              <tbody key={c.id}>
                                <tr>
                                  <td
                                    rowSpan={3}
                                    className="c"
                                    style={{ width: "2.5%" }}
                                  >
                                    {count4++}
                                  </td>
                                  <td className="c" style={{ width: "25%" }}>
                                    {c.code}
                                  </td>
                                  <td className="" style={{ width: "auto" }}>
                                    {c.name}
                                  </td>
                                  <td className="c" style={{ width: "6%" }}>
                                    {c.section}
                                  </td>
                                  <td className="c" style={{ width: "10%" }}>
                                    {c.teacher &&
                                    c.teacher.filter(
                                      (t: Teacher1) =>
                                        t.id ===
                                        parseInt(
                                          sessionStorage.getItem("id") || "0"
                                        )
                                    )[0]?.status == "approved" ? (
                                      <b style={{ color: "green" }}>
                                        {
                                          c.teacher.filter(
                                            (t: Teacher1) =>
                                              t.id ===
                                              parseInt(
                                                sessionStorage.getItem("id") ||
                                                  "0"
                                              )
                                          )[0]?.status
                                        }
                                      </b>
                                    ) : c.teacher.filter(
                                        (t: Teacher1) =>
                                          t.id ===
                                          parseInt(
                                            sessionStorage.getItem("id") || "0"
                                          )
                                      )[0]?.status == "pending" ? (
                                      <b style={{ color: "orange" }}>
                                        {
                                          c.teacher.filter(
                                            (t: Teacher1) =>
                                              t.id ===
                                              parseInt(
                                                sessionStorage.getItem("id") ||
                                                  "0"
                                              )
                                          )[0]?.status
                                        }
                                      </b>
                                    ) : (
                                      <b style={{ color: "red" }}>
                                        {
                                          c.teacher.filter(
                                            (t: Teacher1) =>
                                              t.id ===
                                              parseInt(
                                                sessionStorage.getItem("id") ||
                                                  "0"
                                              )
                                          )[0]?.status
                                        }
                                      </b>
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="" style={{ width: "26%" }}>
                                    <b>Message to approver</b>
                                    &ensp;&ensp;&ensp;
                                    <button
                                      onClick={() => showMsg(c.id)}
                                      className="btn btn-outline-warning"
                                      style={{
                                        fontSize: "12px",
                                        padding: "1px 5px 1px 5px",
                                      }}
                                    >
                                      ADD/EDIT
                                    </button>
                                  </td>
                                  <td
                                    colSpan={3}
                                    className=""
                                    style={{ width: "auto" }}
                                  >
                                    {c.teacher &&
                                    c.teacher.filter(
                                      (t: Teacher1) =>
                                        t.id ===
                                        parseInt(
                                          sessionStorage.getItem("id") || "0"
                                        )
                                    )[0]?.ismsg == true ? (
                                      <form
                                        onSubmit={handleSubmit((data) =>
                                          onMsg(data, c.id)
                                        )}
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
                                            c.teacher.filter(
                                              (t: Teacher1) =>
                                                t.id ===
                                                parseInt(
                                                  sessionStorage.getItem(
                                                    "id"
                                                  ) || "0"
                                                )
                                            )[0]?.msgToApp
                                          }
                                          className="form-control"
                                          style={{
                                            width: "80%",
                                            height: "50%",
                                            margin: "0 0 0 0",
                                          }}
                                          {...register("Msg")}
                                        />
                                        <button
                                          className="btn btn btn-success"
                                          type="submit"
                                          style={{
                                            width: "10%",
                                            height: "50%",
                                            margin: "0 0 0 0",
                                          }}
                                        >
                                          ✓
                                        </button>
                                      </form>
                                    ) : (
                                      <p style={{ margin: "0 0 0 0" }}>
                                        {
                                          c.teacher.filter(
                                            (t: Teacher1) =>
                                              t.id ===
                                              parseInt(
                                                sessionStorage.getItem("id") ||
                                                  "0"
                                              )
                                          )[0]?.msgToApp
                                        }
                                      </p>
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="" style={{ width: "26%" }}>
                                    <b>Comments from Approvers</b>
                                  </td>
                                  <td
                                    colSpan={3}
                                    className=""
                                    style={{ width: "auto" }}
                                  >
                                    <p style={{ margin: "0 0 0 0" }}>
                                      {
                                        c.teacher.filter(
                                          (t: Teacher1) =>
                                            t.id ===
                                            parseInt(
                                              sessionStorage.getItem("id") ||
                                                "0"
                                            )
                                        )[0]?.msgToUser
                                      }
                                    </p>
                                  </td>
                                </tr>
                              </tbody>
                            ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="c">
                              No courses to teach!
                            </td>
                          </tr>
                        )}
                      </table>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
          {/* Buttons *************************************************************************************************************** */}

          <div style={{ margin: "5% 0 5% 0" }}>
            <Link to="/courseSelect">
              <button
                className="btn btn-outline-success mx-5"
                onClick={() => {}}
              >
                <BsCartFill style={{ height: "20px", width: "20px" }} />
                &ensp;Course shopping / Edit your courses
              </button>
            </Link>
            <Link to={`/`}>
              <button
                onClick={() => {}}
                className="btn btn-outline-success mx-5"
              >
                Add course
              </button>
            </Link>
            <Link to={`/changepassword`}>
              <button
                onClick={() => {}}
                className="btn btn-outline-primary mx-5"
              >
                Change password
              </button>
            </Link>
            <button
              onClick={() => onLogout()}
              className="btn btn-outline-danger mx-5"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
