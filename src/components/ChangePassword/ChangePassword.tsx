import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { toast } from "react-toastify";
import { z } from "zod";
import bcrypt from "bcryptjs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const schemas = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters." }),
  newUsername: z.string().optional(),
  oldPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
  newPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
  conPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});
type FormData = z.infer<typeof schemas>;

const ChangePassword = () => {
  useEffect(() => {
    let username = sessionStorage.getItem("username");
    if (username === "" || username === null) {
      navigate("/login");
    }
  }, []);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schemas) });

  const [checked, setChecked] = useState(false);
  const handleCheck = () => {
    setChecked(!checked);
  };

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const handlePassword1 = (e: FormEvent) => {
    e.preventDefault();
    setShowPassword1(!showPassword1);
  };
  const handlePassword2 = (e: FormEvent) => {
    e.preventDefault();
    setShowPassword2(!showPassword2);
  };
  const handlePassword3 = (e: FormEvent) => {
    e.preventDefault();
    setShowPassword3(!showPassword3);
  };

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await axios.post("http://localhost:8080/users/", data);
      if (res.data.length === 1) {
        bcrypt
          .compare(data.oldPassword, res.data[0].password)
          .then((result) => {
            if (result) {
              if (data.newPassword === data.conPassword) {
                const userID = res.data[0].id;
                const saltRounds = 10;
                if (data.newUsername) {
                  bcrypt.hash(
                    data.newPassword,
                    saltRounds,
                    async (err, hash) => {
                      if (err) {
                        console.log(err);
                      }
                      try {
                        await axios.put(
                          "http://localhost:8080/users/" + userID,
                          {
                            username: data.newUsername,
                            password: hash,
                            name: res.data[0].name,
                            nameEng: res.data[0].nameEng,
                            teach: res.data[0].teach,
                          }
                        );
                      } catch (err) {
                        console.log(err);
                      }
                    }
                  );
                  navigate("/profile");
                } else {
                  bcrypt.hash(
                    data.newPassword,
                    saltRounds,
                    async (err, hash) => {
                      if (err) {
                        console.log(err);
                      }
                      try {
                        await axios.put(
                          "http://localhost:8080/users/" + userID,
                          {
                            username: data.username,
                            password: hash,
                            name: res.data[0].name,
                            nameEng: res.data[0].nameEng,
                            teach: res.data[0].teach,
                          }
                        );
                      } catch (err) {
                        console.log(err);
                      }
                    }
                  );
                  navigate("/profile");
                }
              } else {
                toast.error("New and confirm password are not the same!");
              }
            } else {
              toast.error("Your old password is incorect!");
            }
          });
      } else {
        toast.error("Username is invalid!");
      }
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
          <h1>Change Password</h1>
          <form className="mx-5" onSubmit={handleSubmit(onSubmit)}>
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
            <div style={{ textAlign: "left" }} className="">
              <label htmlFor="newUsername" className="form-label">
                New username (optional)
              </label>
              <div className="input-group">
                <span className="input-group-text eye" id="basic-addon1">
                  <div>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={checked}
                      onChange={handleCheck}
                    />
                  </div>
                </span>
                {checked ? (
                  <input
                    {...register("newUsername")}
                    type="text"
                    className="form-control"
                  />
                ) : (
                  <input type="text" className="form-control" disabled />
                )}
              </div>
              <div className="d-flex">
                {errors.newUsername ? (
                  <p className="text-danger my-0 blank">
                    {errors.newUsername.message}
                  </p>
                ) : (
                  <p className="my-0 blank">&nbsp;</p>
                )}
              </div>
            </div>
            <div style={{ textAlign: "left" }} className="">
              <label htmlFor="oldPassword" className="form-label">
                Old password
              </label>
              <div className="input-group">
                {showPassword1 ? (
                  <input
                    {...register("oldPassword")}
                    type="text"
                    className="form-control"
                  />
                ) : (
                  <input
                    {...register("oldPassword")}
                    type="password"
                    className="form-control"
                  />
                )}
                <span
                  className="input-group-text eye"
                  id="basic-addon1"
                  onClick={handlePassword1}
                >
                  {showPassword1 ? <BsEyeSlash /> : <BsEye />}
                </span>
              </div>
              {errors.oldPassword ? (
                <p className="text-danger mb-3 blank">
                  {errors.oldPassword.message}
                </p>
              ) : (
                <p className="mb-3 blank">&nbsp;</p>
              )}
            </div>
            <div style={{ textAlign: "left" }} className="">
              <label htmlFor="newPassword" className="form-label">
                New password
              </label>
              <div className="input-group">
                {showPassword2 ? (
                  <input
                    {...register("newPassword")}
                    type="text"
                    className="form-control"
                  />
                ) : (
                  <input
                    {...register("newPassword")}
                    type="password"
                    className="form-control"
                  />
                )}
                <span
                  className="input-group-text eye"
                  id="basic-addon1"
                  onClick={handlePassword2}
                >
                  {showPassword2 ? <BsEyeSlash /> : <BsEye />}
                </span>
              </div>
              {errors.newPassword ? (
                <p className="text-danger mb-3 blank">
                  {errors.newPassword.message}
                </p>
              ) : (
                <p className="mb-3 blank">&nbsp;</p>
              )}
            </div>
            <div style={{ textAlign: "left" }} className="">
              <label htmlFor="conPassword" className="form-label">
                Confirm new password
              </label>
              <div className="input-group">
                {showPassword3 ? (
                  <input
                    {...register("conPassword")}
                    type="text"
                    className="form-control"
                  />
                ) : (
                  <input
                    {...register("conPassword")}
                    type="password"
                    className="form-control"
                  />
                )}
                <span
                  className="input-group-text eye"
                  id="basic-addon1"
                  onClick={handlePassword3}
                >
                  {showPassword3 ? <BsEyeSlash /> : <BsEye />}
                </span>
              </div>
              {errors.conPassword ? (
                <p className="text-danger mb-3 blank">
                  {errors.conPassword.message}
                </p>
              ) : (
                <p className="mb-3 blank">&nbsp;</p>
              )}
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

export default ChangePassword;
