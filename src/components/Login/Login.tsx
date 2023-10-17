import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FormEvent, useState } from "react";
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import bcrypt from "bcryptjs";
import axios from "axios";

interface User {
  Code: string;
  id: number;
  name: string;
  nameEng: string;
  password: string;
  teach?: JSON;
  username: string;
}

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const [showPassword, setShowPassword] = useState(false);
  const handlePassword = (e: FormEvent) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await axios.post("http://localhost:8080/users/", data);
      if (res.data.length === 1) {
        bcrypt.compare(data.password, res.data[0].password).then((result) => {
          if (result) {
            toast.success("Success", {
              position: "top-center",
              autoClose: false,
            });
            sessionStorage.setItem("id", res.data[0].id);
            sessionStorage.setItem("username", data.username);
            sessionStorage.setItem("name", res.data[0].name);
            console.log(data.username);
            if (
              data.username == "approver01" ||
              data.username == "approver02" ||
              data.username == "approver03" ||
              data.username == "approver04"
            ) {
              navigate("/approver");
            } else {
              navigate("/profile");
            }
          } else {
            toast.error("Your password is incorect!", {
              position: "top-center",
              autoClose: false,
            });
          }
        });
      } else {
        toast.error("Username is invalid!", {
          position: "top-center",
          autoClose: false,
        });
      }
    } catch (err) {
      console.log("err");
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
          <h1>Login</h1>
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
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-group">
                {showPassword ? (
                  <input
                    {...register("password")}
                    type="text"
                    className="form-control"
                  />
                ) : (
                  <input
                    {...register("password")}
                    type="password"
                    className="form-control"
                  />
                )}
                <span
                  className="input-group-text eye"
                  id="basic-addon1"
                  onClick={handlePassword}
                >
                  {showPassword ? <BsEyeSlash /> : <BsEye />}
                </span>
              </div>
              {errors.password ? (
                <p className="text-danger mb-3 blank">
                  {errors.password.message}
                </p>
              ) : (
                <p className="mb-3  blank">&nbsp;</p>
              )}
            </div>
            <div
              className="d-flex"
              style={{ textAlign: "left", fontSize: "12px" }}
            >
              Don't have an account? &nbsp;
              <p>
                <a
                  href="mailto:Thanapon.Aiamsai@unh.edu"
                  onClick={() =>
                    toast.info("Please email to Thanapon.Aiamsai@unh.edu", {
                      position: "top-center",
                      autoClose: false,
                    })
                  }
                  className="link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                >
                  Contact Us!
                </a>
              </p>
            </div>
            <div className="d-flex justify-content-evenly mt-3">
              <button type="submit" className="btn btn-primary">
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
