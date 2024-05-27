import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import car2 from "../images/character-2.png";
import speech from "../images/speech-bubble-2.png";
import icon from "../images/Icons.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();
  const Schema = Yup.object().shape({
    password: Yup.string().min(5, "Too Short").required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Schema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/Account/login`,
          values
        );
        console.log(response);
        if (response.status === 200) {
          toast.success(`Loggin Successful`);
          navigate("/dashboard");
        }
      } catch (error) {
        toast.error("Wrong Email Or Password");
        console.error(
          "Login Error:",
          error.response ? error.response.data : error.message
        );
      }
    },
  });

  return (
    <>
      <div className="container-fluid vh-100">
        <div className="row h-100 no-gutters">
          <div className="col-lg-6 d-flex align-items-center justify-content-center p-5">
            <div className="login-container w-100">
              <div className="logo text-center mb-4 d-flex align-items-center justify-content-center">
                <img
                  src={icon}
                  alt="Eye Icon"
                  className="img-fluid mr-2"
                  style={{ width: "40px", height: "40px" }}
                />
                <h1 className="mb-0 poppins-bold">VISIONEAR</h1>
              </div>
              <div className="mb-3">
                <h3>Log in to your Account</h3>
              </div>
              <form id="loginForm" onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.email ? (
                    <div className="text-danger">{formik.errors.email}</div>
                  ) : null}

                  {/* 
                  if(true){

                  }
                  true ? gsgsg : jdgfhdgf
                  */}
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.password ? (
                    <div className="text-danger">{formik.errors.password}</div>
                  ) : null}
                </div>
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Login
                </button>
              </form>
            </div>
          </div>
          <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center left-side">
            <div className="info-container text-center">
              <img
                src={car2}
                alt="Person with cane"
                className="img-fluid mb-4"
                style={{ maxHeight: "300px" }}
              />
              <p>Connect with every application</p>

              <img
                src={speech}
                alt="Sound icon"
                className="img-fluid"
                style={{ maxHeight: "50px" }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </>
  );
}

export default Login;
