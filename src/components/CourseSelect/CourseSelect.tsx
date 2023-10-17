import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FieldValues, useForm } from "react-hook-form";
import { BsCart, BsTrashFill } from "react-icons/bs";
import { json, parsePath, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import phy from "../../assets/phy.jpg";

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

interface Props {
  courses: Courses[];
  onSubmit: (data: FieldValues) => void;
}

const schema = z.object({
  code: z.string(),
  semester: z.string(),
  name: z.string(),
  type: z.string(),
  credit: z.string(),
  section: z.string(),
  date: z.string(),
  time: z.string(),
  place: z.string(),
  student: z.string(),
  curriculum: z.string(),
  level: z.string(),
});
type FormData = z.infer<typeof schema>;

const CourseSelect = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [cart, setCart] = useState<Courses[]>([]);
  const [courses, setCourses] = useState<Courses[]>([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [sure, setSure] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let id = sessionStorage.getItem("id");
    if (id === "" || id === null) {
      navigate("/login");
    }
    const fetchAllCourses = async () => {
      try {
        const res = await axios.get("http://localhost:8080/courses");
        setCourses(res.data.filter((eC: Courses) => eC.semester == "2"));
        setVisibleCourses(res.data.filter((eC: Courses) => eC.semester == "2"));
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCourses();
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
        setCart(CourseTeachByID.data);
        // setCart(CourseTeachByID.data.filter((eC: Courses) => eC.semester != "1"));
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserCourses();
  }, []);

  const [visibleCourses, setVisibleCourses] = useState<Courses[]>(courses);
  const onClear = () => {
    setVisibleCourses(courses);
  };

  const onSubmits = (data: FieldValues) => {
    setVisibleCourses(courses);
    data.code !== "" &&
      setVisibleCourses((prevCourses) =>
        prevCourses.filter(
          (e) => e.code.toLowerCase().indexOf(data.code.toLowerCase()) !== -1
        )
      );
    data.name !== "" &&
      setVisibleCourses((prevCourses) =>
        prevCourses.filter(
          (e) => e.name.toLowerCase().indexOf(data.name.toLowerCase()) !== -1
        )
      );
    data.type !== "" &&
      setVisibleCourses((prevCourses) =>
        prevCourses.filter((e) => e.type === data.type)
      );
    data.credit !== "" &&
      setVisibleCourses((prevCourses) =>
        prevCourses.filter((e) => e.credit === data.credit)
      );
    data.section !== "" &&
      setVisibleCourses((prevCourses) =>
        prevCourses.filter((e) => e.section === data.section)
      );
    data.semester !== "" &&
      setVisibleCourses((prevCourses) =>
        prevCourses.filter((e) => e.semester === data.semester)
      );
    data.level !== "" &&
      setVisibleCourses((prevCourses) =>
        prevCourses.filter((e) => e.level === data.level)
      );
    data.date !== "" &&
      setVisibleCourses((prevCourses) =>
        prevCourses.filter((e) => {
          const days = e.date?.split(" ");
          return days && days.includes(data.date);
        })
      );
  };

  const onAdd = async (id: string) => {
    const res = await axios.get("http://localhost:8080/courses/" + id);
    const ccc: Teacher1[] = res.data[0].teacher;

    if (ccc && ccc.length !== 0) {
      setShow(true);
      if (!show) {
        const courseToAdd = visibleCourses.find((course) => course.id === id);
        if (
          courseToAdd &&
          courseToAdd?.id !== cart?.find((course) => course.id === id)?.id
        ) {
          if (cart) {
            setCart([...cart, courseToAdd]);
          } else {
            setCart([courseToAdd]);
          }
        }
      }
    } else {
      const courseToAdd = visibleCourses.find((course) => course.id === id);
      if (
        courseToAdd &&
        courseToAdd?.id !== cart?.find((course) => course.id === id)?.id
      ) {
        if (cart) {
          setCart([...cart, courseToAdd]);
        } else {
          setCart([courseToAdd]);
        }
      }
    }
  };

  const onDelete = (id: string) => {
    setCart(cart.filter((e) => e.id !== id));
  };

  const onCartSelect = async (cartItem: Courses[]) => {
    const id = sessionStorage.getItem("id");
    // console.log(cartItem.length);

    try {
      const callCoursebyID = {
        getID: true,
        id: id,
      };
      const CourseTeachByID = await axios.post(
        "http://localhost:8080/courses/",
        callCoursebyID
      );
      const user = (await axios.get("http://localhost:8080/users/" + id))
        .data[0];

      if (CourseTeachByID.data || CourseTeachByID.data.length !== 0) {
        const nonMatchCourse = CourseTeachByID.data.filter(
          (c: Teacher1) => !cartItem.some((item) => parseInt(item.id) === c.id)
        );
        if (nonMatchCourse) {
          for (let i = 0; i < nonMatchCourse.length; i++) {
            const res1 = await axios.get(
              "http://localhost:8080/courses/" + nonMatchCourse[i].id
            );
            const eachCourse1: Teacher1[] = res1.data[0].teacher;
            const index = eachCourse1.findIndex(
              (element) => element.id === parseInt(id ?? "")
            );
            if (index !== -1) {
              eachCourse1.splice(index, 1);
            }
            const updatedCourses1 = {
              iscourse: true,
              teachers: eachCourse1,
            };
            axios.put(
              "http://localhost:8080/courses/" + nonMatchCourse[i].id,
              updatedCourses1
            );
          }
        }
      }

      if (!cartItem || cartItem.length === 0) {
        navigate("/profile");
      }
      for (let i = 0; i < cartItem.length; i++) {
        if (CourseTeachByID.data || CourseTeachByID.data.length !== 0) {
          const matchCourse = CourseTeachByID.data.find(
            (c: Teacher1) => c.id === parseInt(cartItem[i].id)
          );
          if (!matchCourse) {
            const res = await axios.get(
              "http://localhost:8080/courses/" + cartItem[i].id
            );
            const eachCourse: Teacher1[] = res.data[0].teacher;
            if (!eachCourse || eachCourse.length === 0) {
              const updatedCourses = {
                iscourse: true,
                teachers: [
                  {
                    id: user.id,
                    ismsg: false,
                    msgToApp: "",
                    msgToUser: "",
                    name: user.name,
                    nameEng: user.nameEng,
                    status: "pending",
                  },
                ],
              };
              axios.put(
                "http://localhost:8080/courses/" + cartItem[i].id,
                updatedCourses
              );
            } else {
              eachCourse.push({
                id: user.id,
                ismsg: false,
                msgToApp: "",
                msgToUser: "",
                name: user.name,
                nameEng: user.nameEng,
                status: "pending",
              });
              const updatedCourses = {
                iscourse: true,
                teachers: eachCourse,
              };
              axios.put(
                "http://localhost:8080/courses/" + cartItem[i].id,
                updatedCourses
              );
            }
          }
        } else {
          const res = await axios.get(
            "http://localhost:8080/courses/" + cartItem[i].id
          );
          const eachCourse: Teacher1[] = res.data[0].teacher;
          if (!eachCourse || eachCourse.length === 0) {
            const updatedCourses = {
              iscourse: true,
              teachers: [
                {
                  id: user.id,
                  ismsg: false,
                  msgToApp: "",
                  msgToUser: "",
                  name: user.name,
                  nameEng: user.nameEng,
                  status: "pending",
                },
              ],
            };
            axios.put(
              "http://localhost:8080/courses/" + cartItem[i].id,
              updatedCourses
            );
          } else {
            eachCourse.push({
              id: user.id,
              ismsg: false,
              msgToApp: "",
              msgToUser: "",
              name: user.name,
              nameEng: user.nameEng,
              status: "pending",
            });
            const updatedCourses = {
              iscourse: true,
              teachers: eachCourse,
            };
            axios.put(
              "http://localhost:8080/courses/" + cartItem[i].id,
              updatedCourses
            );
          }
        }
      }
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };
  {
    /* Filters ############################################################################################################## */
  }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>WARNING!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This course is already selected by someone. Anyway, you still can
          select this course if you prefer. Eventually, there will be a judging
          process to determine who will be able to take the course.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Acknowledge
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="d-flex">
        <div className="container" style={{ marginTop: "30px", width: "65%" }}>
          <div
            className="card"
            style={{
              margin: "0% 0 0% 0",
              padding: "5% 10px 0% 10px",
              textAlign: "center",
              backgroundColor: "#e3eee2",
            }}
          >
            <form
              onSubmit={handleSubmit(onSubmits)}
              className="form-control "
              style={{
                margin: "0 0% 25px 0%",
                width: "100%",
                height: "",
                alignItems: "center",
                backgroundColor: "white",
              }}
            >
              <div className="row d-flex justify-content-around mt-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for Course"
                  style={{ width: "45%", height: "50%", margin: "0 0 0 0" }}
                  {...register("name")}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for ID"
                  style={{ width: "45%", height: "50%", margin: "0 0 0 0" }}
                  {...register("code")}
                />
              </div>
              <div className="row d-flex justify-content-around mt-3">
                <select
                  className="form-select"
                  style={{ width: "15%", height: "50%", margin: "0 0 0 0" }}
                  {...register("semester")}
                >
                  <option value="">All Semester</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="Special (TH)">Special (TH)</option>
                  <option value="Special (EN)">Special (EN)</option>
                </select>
                <select
                  className="form-select"
                  style={{ width: "15%", height: "50%", margin: "0 0 0 0" }}
                  {...register("type")}
                >
                  <option value="">All Type</option>
                  <option value="Lecture">Lecture</option>
                  <option value="Laboratory">Laboratory</option>
                </select>
                <select
                  className="form-select"
                  style={{ width: "15%", height: "50%", margin: "0 0 0 0" }}
                  {...register("credit")}
                >
                  <option value="">All Credit</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                <select
                  className="form-select"
                  style={{ width: "15%", height: "50%" }}
                  {...register("section")}
                >
                  <option value="">All Section</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option>
                  <option value="32">32</option>
                  <option value="33">33</option>
                  <option value="34">34</option>
                  <option value="35">35</option>
                  <option value="36">36</option>
                  <option value="37">37</option>
                  <option value="38">38</option>
                  <option value="39">39</option>
                  <option value="40">40</option>
                  <option value="41">41</option>
                  <option value="42">42</option>
                  <option value="43">43</option>
                  <option value="44">44</option>
                  <option value="45">45</option>
                  <option value="46">46</option>
                  <option value="47">47</option>
                  <option value="48">48</option>
                  <option value="49">49</option>
                  <option value="40">40</option>
                  <option value="51">51</option>
                  <option value="52">52</option>
                  <option value="53">53</option>
                  <option value="54">54</option>
                  <option value="55">55</option>
                  <option value="56">56</option>
                </select>
                <select
                  className="form-select"
                  style={{ width: "15%", height: "50%" }}
                  {...register("date")}
                >
                  <option value="">Any Day</option>
                  <option value="Sun">Sunday</option>
                  <option value="Mon">Monday</option>
                  <option value="Tue">Tuesday</option>
                  <option value="Wed">Wednesday</option>
                  <option value="Thu">Thursday</option>
                  <option value="Fri">Friday</option>
                  <option value="Sat">Saturday</option>
                </select>
                <select
                  className="form-select"
                  style={{ width: "15%", height: "50%" }}
                  {...register("level")}
                >
                  <option value="">Any Level</option>
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Master-Metrology">Master-Metrology</option>
                </select>
              </div>
              <div className="row d-flex justify-content-evenly mt-3 mb-3">
                <button
                  onClick={() => navigate("/profile")}
                  style={{ width: "30%", height: "40px" }}
                  className="btn btn-outline-warning"
                >
                  Profile
                </button>
                <button
                  type="submit"
                  style={{ width: "30%", height: "40px" }}
                  className="btn btn-success"
                >
                  Filter
                </button>
                <button
                  onClick={() => location.reload()}
                  style={{ width: "30%", height: "40px" }}
                  className="btn btn-danger"
                >
                  Clear
                </button>
              </div>
            </form>

            {/* Course Charts ############################################################################################################## */}
            {visibleCourses.map((course) => (
              <table
                className="table table-bordered"
                style={{ backgroundColor: "white", fontSize: "14px" }}
                key={course.id}
              >
                <thead>
                  <tr>
                    <th colSpan={6} style={{ fontSize: "18px" }}>
                      {course.name}
                    </th>
                    <td>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => onAdd(course.id)}
                      >
                        add
                      </button>
                    </td>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  <tr>
                    <th scope="col">ID</th>
                    <td scope="col">{course.code}</td>
                    <th>Section</th>
                    <td>{course.section}</td>
                    <th>Credit</th>
                    <td colSpan={2}>{course.credit}</td>
                  </tr>
                  <tr>
                    <th scope="row">Semester</th>
                    <td>{course.semester}</td>
                    <th>Date/Time</th>
                    <td colSpan={4}>
                      {course.date} {course.time}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Type</th>
                    <td>{course.type}</td>
                    <th>Room</th>
                    <td colSpan={4}>{course.place}</td>
                  </tr>
                  <tr>
                    <th scope="row">Level</th>
                    <td>{course.level}</td>
                    <th>Selected by</th>
                    <td colSpan={4}>
                      {course.teacher &&
                        course.teacher.map((t: Teacher1) => (
                          <ul key={t.id}>
                            <li>{t.name}</li>
                          </ul>
                        ))}
                    </td>
                  </tr>
                </tbody>
              </table>
            ))}
            {/* ############################################################################################################## */}
            {/* <div className="row d-flex justify-content-evenly">
              {visibleCourses.map((course) => (
                <div
                  className="card col-12 col-md-5 col-lg-3"
                  style={{
                    alignItems: "center",
                    textAlign: "left",
                    margin: "5px 3px 5px 3px",
                  }}
                  key={course.id}
                >
                  <img
                    src={phy}
                    style={{
                      height: "200px",
                      width: "200px",
                      margin: "20px 0px",
                    }}
                    className="card-img-top"
                  />
                  <div className="card-body" style={{ width: "100%" }}>
                    <h5 className="card-title" style={{ fontSize: "18px" }}>
                      {course.name}
                    </h5>
                  </div>
                  <ul
                    className="list-group list-group-flush"
                    style={{ width: "100%" }}
                  >
                    <li className="list-group-item">
                      <strong>ID:</strong>&emsp;&emsp;&ensp;&ensp;&ensp;
                      {course.code}
                    </li>
                    <li className="list-group-item">
                      <strong>Type:</strong>&emsp;&nbsp;&ensp;&ensp;
                      {course.type}
                    </li>
                    <li className="list-group-item">
                      <strong>Semester:</strong>&emsp;&nbsp;&ensp;&ensp;
                      {course.semester}
                    </li>
                    <li className="list-group-item">
                      <strong>Credit:</strong>&ensp;&ensp;&ensp;
                      {course.credit}
                    </li>
                    <li className="list-group-item">
                      <strong>Section:</strong>&ensp;&nbsp;
                      {course.section}
                    </li>
                    <li className="list-group-item">
                      <strong>Date:</strong>&emsp;&emsp;
                      {course.date}
                      &ensp;
                      {course.time}
                    </li>

                    <li className="list-group-item">
                      <strong>Place:</strong>&emsp;&ensp;&nbsp;
                      {course.place}
                    </li>
                    <li className="list-group-item">
                      <strong>Level:</strong>&ensp;
                      {course.level}
                    </li>
                    <li className="list-group-item">
                      <strong>Selected by:</strong>
                      <br />
                      {course.teacher &&
                        JSON.parse(course.teacher).map((t: Teacher1) => (
                          <ul key={t.id}>
                            <li>{t.name}</li>
                          </ul>
                        ))}
                    </li>
                  </ul>

                  <div
                    className="card-body d-flex justify-content-evenly"
                    style={{ width: "100%" }}
                  >
                    <button
                      onClick={() => onAdd(course.id)}
                      className="btn btn-outline-success"
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div> */}
            {/* CART ############################################################################################################## */}
          </div>
        </div>

        <div
          className="container"
          style={{ marginTop: "30px", width: "35%" }}
        ></div>
        <div
          className="container d-flex justify-content-end"
          style={{ margin: "30px 0 0 60%", width: "35%", position: "fixed" }}
        >
          <div
            className="card"
            style={{
              margin: "0% 0 0% 0",
              padding: "3%",
              backgroundColor: "#fffdd0",
              maxHeight: "600px",
              width: "90%",
            }}
          >
            <div className="d-flex align-items-baseline">
              <BsCart style={{ height: "30px", width: "30px" }} />
              &ensp; <h2>Cart</h2>
            </div>
            <div className="table-responsive">
              <table
                className="table table-bordered align-middle"
                style={{ backgroundColor: "white" }}
              >
                <thead style={{ textAlign: "center" }}>
                  <tr>
                    <th style={{ width: "17%" }}>ID</th>
                    <th style={{ width: "40%" }}>NAME</th>
                    <th style={{ width: "18%" }}>SEMESTER</th>
                    <th style={{ width: "18%" }}>SECTION</th>
                    <th style={{ width: "18%" }}>TIME</th>
                    <th style={{ width: "11%" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {cart && cart?.length !== 0 ? (
                    cart
                      .filter((eC: Courses) => eC.semester == "2")
                      .map((item) => (
                        <tr key={item.id}>
                          <td style={{ textAlign: "center" }}>{item.code}</td>
                          <td>{item.name}</td>
                          <td style={{ textAlign: "center" }}>
                            {item.semester}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.section}
                          </td>
                          <td style={{ textAlign: "center" }}>{item.time}</td>
                          <td style={{ textAlign: "center" }}>
                            <button
                              onClick={() => onDelete(item.id)}
                              className="btn btn-danger"
                            >
                              <BsTrashFill />
                            </button>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan={5} style={{ textAlign: "center" }}>
                        Your cart is empty!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div style={{ textAlign: "center" }}>
                <button
                  onClick={() => onCartSelect(cart)}
                  className="btn btn-primary"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseSelect;
