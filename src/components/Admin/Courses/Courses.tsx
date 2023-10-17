import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Props {
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
}

const Courses = () => {
  let count = 1;
  const [courses1, setCourses1] = useState<Props[]>([]);
  const [courses2, setCourses2] = useState<Props[]>([]);

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const res = await axios.get("http://localhost:8080/courses");
        setCourses1(res.data);
        setCourses2(res.data);
        setCourses1((prevCourses) =>
          prevCourses.filter((e) => e.semester === "1")
        );
        setCourses2((prevCourses) =>
          prevCourses.filter((e) => e.semester === "2")
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCourses();
  }, []);

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
        <div
          className="card"
          style={{
            margin: "5px 1% 5px 1%",
            padding: "10px 0% 10px 0%",
          }}
        >
          <h3 className="m-3">Semester 1</h3>
          <hr />
          <div
            className="table-responsive"
            style={{
              textAlign: "left",
              display: "flex",
              maxHeight: "500px",
            }}
          >
            <table
              className="table table-bordered"
              style={{
                margin: "1% 3% 1% 3%",
                fontSize: "14px",
                verticalAlign: "middle",
              }}
            >
              <thead>
                <tr>
                  <th className="c">#</th>
                  <th className="c">code</th>
                  <th className="c">semester</th>
                  <th className="c">name</th>
                  <th className="c">type</th>
                  <th className="c">credit</th>
                  <th className="c">section</th>
                  <th className="c">date</th>
                  <th className="c">time</th>
                  <th className="c">place</th>
                  <th className="c">student</th>
                  <th className="c">curriculum</th>
                  <th className="c">level</th>
                  <td
                    style={{
                      textAlign: "center",
                      margin: "0 5px 0 5px",
                      padding: "3px 0 3px 0",
                      fontSize: "12px",
                    }}
                  >
                    <Link to={`/admin/courses/add/`}>
                      <button
                        style={{
                          textAlign: "center",
                          width: "85%",
                          height: "30px",
                          margin: "5px 5px 5px 5px",
                          padding: "3px 0 3px 0",
                          fontSize: "12px",
                        }}
                        className="btn btn-success"
                      >
                        Add course
                      </button>
                    </Link>
                  </td>
                </tr>
              </thead>
              <tbody>
                {courses1.map((course) => (
                  <tr key={course.id}>
                    <td className="c">{count++}</td>
                    <td>{course.code}</td>
                    <td>{course.semester}</td>
                    <td>{course.name}</td>
                    <td>{course.type}</td>
                    <td>{course.credit}</td>
                    <td>{course.section}</td>
                    <td>{course.date}</td>
                    <td>{course.time}</td>
                    <td>{course.place}</td>
                    <td>{course.student}</td>
                    <td>{course.curriculum}</td>
                    <td>{course.level}</td>
                    <td
                      className="d-flex"
                      style={{
                        textAlign: "center",
                        margin: "0 0px 0 0px",
                        padding: "3px 5px 3px 5px",
                        fontSize: "12px",
                        verticalAlign: "middle",
                      }}
                    >
                      <Link to={`/admin/courses/update/${course.id}`}>
                        <button
                          style={{
                            fontSize: "12px",
                          }}
                          className="btn btn-warning mx-1"
                        >
                          Edit
                        </button>
                      </Link>
                      <button
                        style={{
                          fontSize: "12px",
                        }}
                        className="btn btn-danger mx-1"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                <tr></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div
          className="card"
          style={{
            margin: "5px 1% 5px 1%",
            padding: "10px 0% 10px 0%",
          }}
        >
          <h3 className="m-3">Semester 2</h3>
          <hr />
          <div
            className="table-responsive"
            style={{
              textAlign: "left",
              display: "flex",
              maxHeight: "500px",
            }}
          >
            <table
              className="table table-bordered"
              style={{
                margin: "1% 3% 1% 3%",
                fontSize: "14px",
                verticalAlign: "middle",
              }}
            >
              <thead>
                <tr>
                  <th className="c">#</th>
                  <th className="c">code</th>
                  <th className="c">semester</th>
                  <th className="c">name</th>
                  <th className="c">type</th>
                  <th className="c">credit</th>
                  <th className="c">section</th>
                  <th className="c">date</th>
                  <th className="c">time</th>
                  <th className="c">place</th>
                  <th className="c">student</th>
                  <th className="c">curriculum</th>
                  <th className="c">level</th>
                  <td
                    style={{
                      textAlign: "center",
                      margin: "0 5px 0 5px",
                      padding: "3px 0 3px 0",
                      fontSize: "12px",
                    }}
                  >
                    <Link to={`/admin/courses/add/`}>
                      <button
                        style={{
                          textAlign: "center",
                          width: "85%",
                          height: "30px",
                          margin: "5px 5px 5px 5px",
                          padding: "3px 0 3px 0",
                          fontSize: "12px",
                        }}
                        className="btn btn-success"
                      >
                        Add course
                      </button>
                    </Link>
                  </td>
                </tr>
              </thead>
              <tbody>
                {courses2.map((course) => (
                  <tr key={course.id}>
                    <td className="c">{count++}</td>
                    <td>{course.code}</td>
                    <td>{course.semester}</td>
                    <td>{course.name}</td>
                    <td>{course.type}</td>
                    <td>{course.credit}</td>
                    <td>{course.section}</td>
                    <td>{course.date}</td>
                    <td>{course.time}</td>
                    <td>{course.place}</td>
                    <td>{course.student}</td>
                    <td>{course.curriculum}</td>
                    <td>{course.level}</td>
                    <td
                      className="d-flex"
                      style={{
                        textAlign: "center",
                        margin: "0 0px 0 0px",
                        padding: "3px 5px 3px 5px",
                        fontSize: "12px",
                        verticalAlign: "middle",
                      }}
                    >
                      <Link to={`/admin/courses/update/${course.id}`}>
                        <button
                          style={{
                            fontSize: "12px",
                          }}
                          className="btn btn-warning mx-1"
                        >
                          Edit
                        </button>
                      </Link>
                      <button
                        style={{
                          fontSize: "12px",
                        }}
                        className="btn btn-danger mx-1"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                <tr></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
