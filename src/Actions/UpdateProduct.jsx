import axios from "../axoisConfig"; // Make sure to import the correct axios config file
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import os from "../images/1707920227078.jpg"

function UpdateProduct() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const headers = {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  };
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const getAllProducts = async () => {
    try {
      const response = await axios.get(`/api/Admin/GetAllProducts`, headers);
      setProducts(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentItem = () => {
    const product = products.find((product) => product.id.toString() === id);
    setCurrentProduct(product);
  };

  const Schema = Yup.object().shape({
    product_name: Yup.string().min(5, "Too Short").required("Required"),
    description: Yup.string().min(5, "Too Short").required("Required"),
    picture_url: Yup.string().url("Invalid URL").required("Required"),
    price: Yup.number().required("Required").typeError("Must be a number"),
    currency: Yup.string().required("Required"),
    brand_name: Yup.string().required("Required"),
    category_name: Yup.string().required("Required"),
    code: Yup.string().required("Required"),
  });
  const formik = useFormik({
    initialValues: {
      product_name: "",
      description: "",
      picture_url: "",
      price: "",
      currency: "",
      brand_name: "",
      category_name: "",
      code: "",
    },
    validationSchema: Schema,
    onSubmit: async (values) => {
      console.log(values, "values");
      const payload = {
        product_name: values.product_name,
        description: values.description,
        picture_url: values.picture_url,
        price: values.price,
        currency: values.currency,
        brand_name: values.brand_name,
        category_name: values.category_name,
        code: values.code,
      };
      console.log(payload, "payload");
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_BASE_URL}/api/Admin/Update/${id}`,
          payload,
          headers
        );
        if (response.status === 200) {
          navigate("/dashboard");
          toast.success("Item Updated Successfully");
        }
      } catch (error) {
        toast.error("Failed to Update Item");
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      }
    },
  });

  const getAllBrands = async () => {
    try {
      const response = await axios.get(`/api/Admin/GetBrands`, headers);
      setBrands(response.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  const getAllCategories = async () => {
    try {
      const response = await axios.get(`/api/Admin/GetCategories`, headers);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getAllProducts();
    getAllBrands();
    getAllCategories();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      getCurrentItem();
    }
  }, [products]);

  useEffect(() => {
    if (currentProduct) {
      formik.setValues({
        product_name: currentProduct.product_name,
        price: currentProduct.price,
        currency: currentProduct.currency,
        description: currentProduct.description,
        brand_name: currentProduct.brand_name,
        category_name: currentProduct.category_name,
        code: currentProduct.code,
        picture_url: currentProduct.picture_url,
      });
    }
  }, [currentProduct]);

  return (
    <div className="container-fluid vh-100">
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
          <main>
            <h3>Update Product</h3>
            <form id="addProductForm" onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label htmlFor="productName">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="productName"
                  {...formik.getFieldProps("product_name")}
                />
                {formik.touched.product_name && formik.errors.product_name ? (
                  <div className="text-danger">
                    {formik.errors.product_name}
                  </div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="productPrice">Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="productPrice"
                  {...formik.getFieldProps("price")}
                />
                {formik.touched.price && formik.errors.price ? (
                  <div className="text-danger">{formik.errors.price}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="productCurrency">Currency</label>
                <input
                  type="text"
                  className="form-control"
                  id="productCurrency"
                  {...formik.getFieldProps("currency")}
                />
                {formik.touched.currency && formik.errors.currency ? (
                  <div className="text-danger">{formik.errors.currency}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="productDescription">Description</label>
                <textarea
                  className="form-control"
                  id="productDescription"
                  rows="3"
                  {...formik.getFieldProps("description")}
                ></textarea>
                {formik.touched.description && formik.errors.description ? (
                  <div className="text-danger">{formik.errors.description}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="productBrand">Brand</label>
                <select
                  className="form-control"
                  id="productBrand"
                  {...formik.getFieldProps("brand_name")}
                >
                  <option value="">Select a brand</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.brand_name}>
                      {brand.brand_name}
                    </option>
                  ))}
                </select>
                {formik.touched.brand_name && formik.errors.brand_name ? (
                  <div className="text-danger">{formik.errors.brand_name}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="productCategory">Category</label>
                <select
                  className="form-control"
                  id="productCategory"
                  {...formik.getFieldProps("category_name")}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.category_name}>
                      {category.category_name}
                    </option>
                  ))}
                </select>
                {formik.touched.category_name && formik.errors.category_name ? (
                  <div className="text-danger">
                    {formik.errors.category_name}
                  </div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="productId">Code (ID)</label>
                <input
                  type="text"
                  className="form-control"
                  id="productId"
                  {...formik.getFieldProps("code")}
                />
                {formik.touched.code && formik.errors.code ? (
                  <div className="text-danger">{formik.errors.code}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="productImage">Image URL</label>
                <input
                  type="text"
                  className="form-control"
                  id="productImage"
                  {...formik.getFieldProps("picture_url")}
                />
                {formik.touched.picture_url && formik.errors.picture_url ? (
                  <div className="text-danger">{formik.errors.picture_url}</div>
                ) : null}
              </div>
              <button className="btn btn-primary" type="submit">
                Update Product
              </button>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
