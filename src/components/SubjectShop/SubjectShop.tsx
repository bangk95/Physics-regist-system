import { useState } from "react";
import { BsPlusCircle, BsPlusCircleFill, BsTrash3Fill } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./SubjectShop.css";

interface Courses {
  id: string;
  name: string;
  type: string;
  credit: number;
}

interface Props {
  courses: Courses[];
}

const SubjectShop = ({ courses }: Props) => {
  const [selectedCourses, setSelectedCourses] = useState<Courses[]>([]);

  const onAdd = (id: string) => {
    const courseToAdd = courses.find((course) => course.id === id) || null;
    if (
      courseToAdd &&
      courseToAdd.id !== selectedCourses.find((course) => course.id === id)?.id
    ) {
      setSelectedCourses([...selectedCourses, courseToAdd]);
    }
  };

  const onDelete = (id: string) => {
    setSelectedCourses(selectedCourses.filter((e) => e.id !== id));
  };

  return (
    <div className="container">
      <div
        className="card"
        style={{
          marginLeft: "0px",
          marginRight: "0px",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
      >
        <div className="center">
          <h1 style={{ marginBottom: "30px" }}>Courses Shopping List</h1>
          <div className="d-flex">
            <div className="" style={{ width: "50%" }}>
              <div
                className="card"
                style={{
                  margin: "5px 1% 5px 1%",
                  padding: "10px 0% 10px 0%",
                }}
              >
                <h3 className="m-3">Courses List</h3>
                <hr />
                <div
                  style={{
                    textAlign: "left",
                    maxHeight: "1200px",
                    overflowY: "scroll",
                  }}
                >
                  <div
                    className="table-responsive"
                    style={{ textAlign: "left", display: "flex" }}
                  >
                    <table
                      className="table table-bordered align-middle"
                      style={{ margin: "1% 3% 1% 3%", fontSize: "14px" }}
                    >
                      <thead>
                        <tr>
                          <th className="r1 c">ID</th>
                          <th className="r2 c">Name</th>
                          <th className="r3"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {courses.map((course) => (
                          <tr key={course.id}>
                            <td className="c">{course.id}</td>
                            <td className="">{course.name}</td>
                            <td className="text-center">
                              <button
                                className="btn btn-outline-primary"
                                style={{
                                  width: "100%",
                                  padding: "1% 1% 1% 1%",
                                  // fontSize: "15px",
                                  textAlign: "center",
                                }}
                                onClick={() => onAdd(course.id)}
                              >
                                <BsPlusCircle />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="" style={{ width: "50%" }}>
              <div
                className="card"
                style={{
                  margin: "5px 1% 5px 1%",
                  padding: "10px 0% 10px 0%",
                }}
              >
                <h3 className="m-3">Cart</h3>
                <hr />
                <div
                  className="table-responsive"
                  style={{ textAlign: "left", display: "flex" }}
                >
                  <table
                    className="table table-bordered"
                    style={{ margin: "1% 3% 1% 3%", fontSize: "14px" }}
                  >
                    <thead>
                      <tr>
                        <th className="r1 c">ID</th>
                        <th className="r2 c">Name</th>
                        <th className="r3 c"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedCourses.length !== 0 ? (
                        selectedCourses.map((course) => (
                          <tr key={course.id}>
                            <td className="c">{course.id}</td>
                            <td className="">{course.name}</td>
                            <td className="c">
                              <button
                                className="btn btn-outline-danger"
                                style={{
                                  display: "flex",
                                  margin: "0% 0% 0% 0%",
                                  fontSize: "15px",
                                }}
                                onClick={() => onDelete(course.id)}
                              >
                                <BsTrash3Fill />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3} style={{ textAlign: "center" }}>
                            Your cart is empty!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/subjectshop">
              <button className="btn btn-success mx-5">Subjects</button>
            </Link>
            <Link to="/">
              <button className="btn btn-outline-secondary mx-5">Logout</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectShop;
