import axios from "axios";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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

const Approver = () => {
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
        <div className="" style={{ fontSize: "30px" }}>
          APPROVAL
        </div>
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
            <button
              onClick={() => onLogout()}
              style={{ width: "30%", height: "40px" }}
              className="btn btn-outline-warning"
            >
              Logout
            </button>
          </div>
        </form>
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
              <td colSpan={2}>Status</td>
            </tr>
          </thead>

          <tbody className="table-group-divider">
            {visibleCourses.map((course) => (
              <tr key={course.id}>
                <td scope="col">{course.semester}</td>
                <td scope="col">{course.code}</td>
                <td scope="col">{course.name}</td>
                <td scope="col">{course.section}</td>
                <td scope="col">
                  <button
                    className="btn btn-outline-warning btn-sm"
                    onClick={() => navigate("/approver/" + course.id)}
                  >
                    Edit
                  </button>
                </td>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Approver;
