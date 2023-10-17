import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import bcrypt from "bcryptjs";

const schema = z.object({
  username: z.string(),
  password: z.string(),
  name: z.string(),
  nameEng: z.string(),
});
type FormData = z.infer<typeof schema>;

const UpdateUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userID = location.pathname.split("/")[4];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FieldValues) => {
    const saltRounds = 10;
    bcrypt.hash(data.password, saltRounds, async (err, hash) => {
      if (err) {
        console.log(err);
      }

      try {
        await axios.put("http://localhost:8080/users/" + userID, {
          username: data.username,
          password: hash,
          name: data.name,
          nameEng: data.nameEng,
          teach: null,
        });
        navigate("/admin/users");
      } catch (err) {
        console.log(err);
      }
    });
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
          <h1>Update user</h1>
          <form className="mx-5 mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div style={{ textAlign: "left" }} className="mt-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                {...register("username")}
                type="text"
                className="form-control"
              />
              <div className="d-flex">
                {errors.username ? (
                  <p className="text-danger my-0 blank">
                    {errors.username.message}
                  </p>
                ) : (
                  <p className="my-0 blank">&nbsp;</p>
                )}
              </div>
            </div>
            <div style={{ textAlign: "left" }} className="mt-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                {...register("password")}
                type="text"
                className="form-control"
              />
              <div className="d-flex">
                {errors.password ? (
                  <p className="text-danger my-0 blank">
                    {errors.password.message}
                  </p>
                ) : (
                  <p className="my-0 blank">&nbsp;</p>
                )}
              </div>
            </div>
            <div style={{ textAlign: "left" }} className="mt-3">
              <label htmlFor="name" className="form-label">
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
              <label htmlFor="nameEng" className="form-label">
                NameEng
              </label>
              <input
                {...register("nameEng")}
                type="text"
                className="form-control"
              />
              <div className="d-flex">
                {errors.nameEng ? (
                  <p className="text-danger my-0 blank">
                    {errors.nameEng.message}
                  </p>
                ) : (
                  <p className="my-0 blank">&nbsp;</p>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-evenly mt-3">
              <button type="submit" className="btn btn-primary">
                Submit change
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
