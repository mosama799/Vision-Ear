import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import os from "../images/1707920227078.jpg"

function AddCat() {
  const navigate = useNavigate();

  const headers = {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  };
  const Schema = Yup.object().shape({
    category_name: Yup.string().min(5, "Too Short").required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      category_name: "",
    },
    validationSchema: Schema,
    onSubmit: async (values) => {
      const payload = {
        category_name: values.category_name,
      };

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/Admin/AddCategory`,
          payload,
          headers
        );
        if (response.status === 200) {
          navigate("/dashboard");
          toast.success("category Added Successfully");
        }
      } catch (error) {
        toast.error("Failed to Add category");
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      }
    },
  });
  return (
    <>
      <div className="row h-100 no-gutters">
        <div className="col-lg-2 col-md-3 sidebar p-4 d-flex flex-column">
          <div className="logo mb-4">
            <h2>Vision Ear</h2>
          </div>
          <nav className="nav flex-column">
            <Link className="nav-link" to={"/dashboard"}>
              Profile
            </Link>
            <Link className="nav-link active" to={"/addProduct"}>
              Add Product
            </Link>
            <Link className="nav-link active" to={"/addbrand"}>
              Add Brand
            </Link>
            <Link className="nav-link active" to={"/addcat"}>
              Add Category
            </Link>
          </nav>
        </div>

        <div className="col-lg-10 col-md-9 content p-4">
          <header className="d-flex justify-content-between align-items-center mb-4">
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search"
            />
            <div className="d-flex align-items-center">
              <i className="fas fa-bell mr-4"></i>
              <div className="user-info d-flex align-items-center">
                <img
                  src={os}
                  alt="User"
                  className="rounded-circle"
                  width="40"
                  height="40"
                />
                <span className="ml-2">Mohamed Osama</span>
              </div>
            </div>
          </header>

          <form id="addProductForm" onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="categoryName">Name</label>
              <input
                type="text"
                className="form-control"
                id="categoryName"
                {...formik.getFieldProps("category_name")}
              />
              {formik.touched.category_name && formik.errors.category_name ? (
                <div className="text-danger">{formik.errors.category_name}</div>
              ) : null}
            </div>
            <button className="btn btn-primary my-3" type="submit">
              Add category
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddCat;
