import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const Register = () => {
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <div className="card">
        <div className="center flex-column">
          <h1 className="m-3">Contact US</h1>
          <form className="mx-5">
            <div style={{ textAlign: "left" }} className="mt-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input id="name" type="text" className="form-control" />
              <p className="my-0">&nbsp;</p>
            </div>
            <div style={{ textAlign: "left" }} className="">
              <label htmlFor="surname" className="form-label">
                Surname
              </label>
              <input id="surname" type="text" className="form-control" />
              <p className="my-0">&nbsp;</p>
            </div>
            <div style={{ textAlign: "left" }} className="">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input id="username" type="text" className="form-control" />
              <p className="my-0">&nbsp;</p>
            </div>
            <div style={{ textAlign: "left" }} className="">
              <label htmlFor="pw" className="form-label">
                Password
              </label>
              <input id="pw" type="text" className="form-control" />
              <p className="my-0">&nbsp;</p>
            </div>
            <div className="" style={{ textAlign: "left", fontSize: "12px" }}>
              Already have an account? &nbsp;
              <Link to="/login" style={{ color: "black" }}>
                Login!
              </Link>
            </div>
            <div className="d-flex justify-content-evenly mt-3">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
