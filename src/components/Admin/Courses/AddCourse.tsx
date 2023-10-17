import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./courses.css";

const schema = z.object({
  code: z.string(),
  semester: z.string(),
  name: z.string(),
  type: z.string(),
  credit: z.string().optional(),
  section: z.string(),
  date: z.string().optional(),
  time: z.string().optional(),
  place: z.string().optional(),
  student: z.string().optional(),
  curriculum: z.string().optional(),
  level: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

const AddCourse = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const courseID = location.pathname.split("/")[4];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FieldValues) => {
    try {
      await axios.post("http://localhost:8080/courses/", {
        code: data.code,
        semester: data.semester,
        name: data.name,
        type: data.type,
        credit: data.credit,
        section: data.section,
        date: data.date,
        time: data.time,
        place: data.place,
        student: data.student,
        curriculum: data.curriculum,
        level: data.level,
      });
      navigate("/admin/courses");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container">
      <div
        className="card"
        style={{
          margin: "5% 20%",
          padding: "5% 0px",
          textAlign: "center",
        }}
      >
        <div className="center flex-column">
          <h1>Add course</h1>
          <form className="mx-5 mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div style={{ textAlign: "left" }} className="mt-3">
              <label htmlFor="code" className="form-label r">
                Code
              </label>
              <input
                {...register("code")}
                type="text"
                className="form-control"
              />
              <div className="d-flex">
                {errors.code ? (
                  <p className="text-danger my-0 blank">
                    {errors.code.message}
                  </p>
                ) : (
                  <p className="my-0 blank">&nbsp;</p>
                )}
              </div>
            </div>
            <div style={{ textAlign: "left" }} className="mt-3">
              <label htmlFor="semester" className="form-label r">
                Semester
              </label>
              <select className="form-select" {...register("semester")}>
                <option>Please Select Semester</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
              <div className="d-flex">
                {errors.semester ? (
                  <p className="text-danger my-0 blank">
                    {errors.semester.message}
                  </p>
                ) : (
                  <p className="my-0 blank">&nbsp;</p>
                )}
              </div>
            </div>
            <div style={{ textAlign: "left" }} className="mt-3">
              <label htmlFor="name" className="form-label r">
                Name
              </label>
              <input
                {...register("name")}
                type="text"
                className="form-control"
              />
              <div className="d-flex">
                {errors.name ? (
                  <p className="text-danger my-0 blank">
                    {errors.name.message}
                  </p>
                ) : (
                  <p className="my-0 blank">&nbsp;</p>
                )}
              </div>
            </div>
            <div style={{ textAlign: "left" }} className="mt-3">
              <label htmlFor="type" className="form-label r">
                Type
              </label>
              <select className="form-select" {...register("type")}>
                <option>Please Select Type</option>
                <option value="Lecture">Lecture</option>
                <option value="Laboratory">Laboratory</option>
              </select>
              <div className="d-flex">
                {errors.type ? (
                  <p className="text-danger my-0 blank">
                    {errors.type.message}
                  </p>
                ) : (
                  <p className="my-0 blank">&nbsp;</p>
                )}
              </div>
            </div>
            <div style={{ textAlign: "left" }} className="mt-3">
              <label htmlFor="credit" className="form-label">
                Credit
              </label>
              <input
                {...register("credit")}
                type="text"
                className="form-control"
              />
              <div className="d-flex">
                {errors.credit ? (
                  <p className="text-danger my-0 blank">
                    {errors.credit.message}
                  </p>
                ) : (
                  <p className="my-0 blank">&nbsp;</p>
                )}
              </div>
            </div>
            <div style={{ textAlign: "left" }} className="mt-3">
              <label htmlFor="section" className="form-label r">
                Section
              </label>
              <input
                {...register("section")}
                type="text"
                className="form-control"
              />
              <div className="d-flex">
                {errors.section ? (
                  <p className="text-danger my-0 blank">
                    {errors.section.message}
                  </p>
                ) : (
                  <p className="my-0 blank">&nbsp;</p>
                )}
              </div>
            </div>
            <div style={{ textAlign: "left" }} className="mt-3">
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <input
                {...register("date")}
                type="text"
                className="form-control"
              />
              <div className="d-flex">
                {errors.date ? (
                  <p className="text-danger my-0 blank">
                    {errors.date.message}
                  </p>
                ) : (
                  <p className="my-0 blank">&nbsp;</p>
                )}
              </div>
            </div>
            <div style={{ textAlign: "left" }} className="mt-3">
              <label htmlFor="time" className="form-label">
                Time
              </label>
              <input
                {...register("time")}
                type="text"
                className="form-control"
              />
              <div className="d-flex">
                {errors.time ? (
                  <p className="text-danger my-0 blank">
                    {errors.time.message}
                  </p>
                ) : (
                  <p className="my-0 blank">&nbsp;</p>
                )}
              </div>
            </div>
            <div style={{ textAlign: "left" }} className="mt-3">
              <label htmlFor="place" className="form-label">
                Place
              </label>
              <input
                {...register("place")}
                type="text"
                className="form-control"
              />
              <div className="d-flex">
                {errors.place ? (
                  <p className="text-danger my-0 blank">
                    {errors.place.message}
                  </p>
                ) : (
                  <p className="my-0 blank">&nbsp;</p>
                )}
              </div>
            </div>
            <div style={{ textAlign: "left" }} className="mt-3">
              <label htmlFor="student" className="form-label">
                Student
              </label>
              <input
                {...register("student")}
                type="text"
                className="form-control"
              />
              <div className="d-flex">
                {errors.student ? (
                  <p className="text-danger my-0 blank">
                    {errors.student.message}
                  </p>
                ) : (
                  <p className="my-0 blank">&nbsp;</p>
                )}
              </div>
            </div>
            <div style={{ textAlign: "left" }} className="mt-3">
              <label htmlFor="curriculum" className="form-label">
                Curriculum
              </label>
              <input
                {...register("curriculum")}
                type="text"
                className="form-control"
              />
              <div className="d-flex">
                {errors.curriculum ? (
                  <p className="text-danger my-0 blank">
                    {errors.curriculum.message}
                  </p>
                ) : (
                  <p className="my-0 blank">&nbsp;</p>
                )}
              </div>
            </div>
            <div style={{ textAlign: "left" }} className="mt-3">
              <label htmlFor="level" className="form-label">
                Level
              </label>
              <select className="form-select" {...register("level")}>
                <option>Select Level</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Graduate">Graduate</option>
                <option value="Master-Metrology">Master-Metrology</option>
              </select>
              <div className="d-flex">
                {errors.level ? (
                  <p className="text-danger my-0 blank">
                    {errors.level.message}
                  </p>
                ) : (
                  <p className="my-0 blank">&nbsp;</p>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-evenly mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
