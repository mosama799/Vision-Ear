import axios from "../axoisConfig";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import os from "../images/1707920227078.jpg"

function Home() {
  const [show, setShow] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setSelectedProductId(id);
    setShow(true);
  };

  const [products, setProducts] = useState([]);

  console.log("ay haga");
  const getAllProducts = async () => {
    try {
      const response = await axios.get(`/api/Admin/GetAllProducts`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      });

      setProducts(response?.data);
      console.log(response?.data, "respone");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    // Uncomment and use the line below to actually delete the product from your backend
    await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/api/Admin/Delete/${id}`,
      {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      }
    );
    toast.success(`Item ${id} deleted`);
    handleClose();
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
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
                  <h5 className="ml-2">Mohamed Osama</h5>
                </div>
              </div>
            </header>
            <main>
              <h3>Admin</h3>
              <div className="product-list">
                {products.map((product) => (
                  // higher order function

                  <div
                    key={product.id}
                    className="product-item d-flex justify-content-between align-items-center p-3 mb-3"
                  >
                    <img
                      src={product.picture_url}
                      alt={product.product_name}
                      className="product-img"
                    />
                    <div className="product-info">
                      <h5>{product.product_name}</h5>
                      <p>
                        ${product.price} | {product.description} |
                        {product?.brands?.brand_name}
                      </p>
                    </div>
                    <div className="action-links">
                      <Link
                        to={`/updateProduct/${product.id}`}
                        className="btn btn-warning mx-1"
                      >
                        update
                      </Link>
                      <Button
                        className="btn btn-danger"
                        onClick={() => handleShow(product.id)}
                      >
                        delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure?</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            No
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteProduct(selectedProductId)}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Home;
