import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Redirect } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

import css from "./MyProducts.module.css";

const MyProducts = () => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState();
  const [filePath, setFilePath] = useState([]);
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [size, setSize] = useState("");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState("");
  const [color, setColor] = useState("");
  const [products, setProducts] = useState();
  const [product, setProduct] = useState({});

  const url = `${process.env.REACT_APP_BASEURL}/products`;
  const urlSingleProduct = `${process.env.REACT_APP_BASEURL}/product`;
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.id);
  const level = useSelector((state) => state.auth.level);

  useEffect(() => {
    axios
      .get(url + `/user/${userId}`)
      .then(({ data }) => {
        setProducts(data.data);
      })
      .catch((err) => console.log(err.response));
  }, [url, userId]);

  useEffect(() => {});

  const getSingleProduct = (itemId) => {
    axios
      .get(urlSingleProduct + `/${itemId}`)
      .then(({ data }) => {
        setProduct(data);
      })
      .catch((err) => console.log(err.response));
  };

  const handleFile = (e) => {
    let image = e.target.files;
    setFilePath(image);
  };

  const notify = () => toast("New product was added!");
  const editedProductNotify = () => toast("Product was updated!");

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  const handleSubmit = () => {
    const config = {
      headers: {
        "x-access-token": "Bearer " + token,
        "Content-type": "multipart/form-data",
      },
    };
    const data = new FormData();
    data.append("product_name", productName);
    data.append("product_brand", brand);
    data.append("category_id", category);
    data.append("product_price", price);
    data.append("product_description", desc);
    data.append("size", size);
    data.append("product_rating", getRandomInt(5));
    data.append("product_color", color);
    data.append("product_qty", quantity);
    data.append("user_id", userId);
    for (let i = 0; i < filePath.length; i++) {
      data.append("image", filePath[i]);
    }

    axios
      .post(`${process.env.REACT_APP_BASEURL}/product`, data, config)
      .then((res) => {
        notify();
        window.location.reload(false);
      })
      .catch((err) => console.log(err.response));
  };

  const editSubmit = (id) => {
    const config = {
      headers: {
        "x-access-token": "Bearer " + token,
        "Content-type": "multipart/form-data",
      },
    };
    const data = new FormData();
    data.append("product_name", productName);
    data.append("product_brand", brand);
    data.append("category_id", category);
    data.append("product_price", price);
    data.append("product_description", desc);
    data.append("size", size);
    data.append("product_rating", getRandomInt(5));
    data.append("product_color", color);
    data.append("product_qty", quantity);
    data.append("user_id", userId);
    for (let i = 0; i < filePath.length; i++) {
      data.append("image", filePath[i]);
    }

    axios
      .patch(`${process.env.REACT_APP_BASEURL}/product/${id}`, data, config)
      .then((res) => {
        editedProductNotify();
        window.location.reload(false);
      })
      .catch((err) => console.log(err.response));
  };

  const deleteProduct = (id, name) => {
    confirmAlert({
      title: "Delete product",
      message: `Are you sure to delete ${name}?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            const config = {
              headers: {
                "x-access-token": "Bearer " + token,
              },
            };
            axios
              .delete(`${process.env.REACT_APP_BASEURL}/product/${id}`, config)
              .then((res) => {
                window.location.reload(false);
              })
              .catch((err) => console.log(err.response));
          },
        },
        {
          label: "No, nevermind.",
        },
      ],
    });
  };

  if (level === "customer") {
    return <Redirect to='/' />;
  }

  return (
    <>
      <Navbar />
      <Container style={{ marginTop: "20px" }}>
        <div className='row'>
          <div className='col-lg-3 col-sm-12'>
            <Sidebar />
          </div>
          <div className='col-lg-9 col-sm-12'>
            <div className={css.Head}>
              <h1>List products</h1>
              <p className='text-muted'>Manage your products here.</p>
            </div>
            <hr />
            <div className={css.Wrapper}>
              {products
                ? products &&
                  products.map((product) => {
                    let imgSplit = product.image.split(",");
                    let img = imgSplit;
                    return (
                      <div className={css.ListWrapper} key={product.id}>
                        <img
                          src={process.env.REACT_APP_BASEURL + img[0]}
                          className={css.ListImg}
                          alt='product'
                        />
                        <div className={css.ProductInfo}>
                          <h5>{product.product_name}</h5>
                          <p className='text-wrap'>
                            {product.product_description}
                          </p>
                        </div>
                        <div
                          className={css.IconTrash}
                          onClick={() => {
                            deleteProduct(product.id, product.product_name);
                          }}
                        >
                          <i
                            className='fas fa-trash-alt'
                            style={{ color: "red" }}
                          ></i>
                        </div>
                        <div
                          className={css.IconEdit}
                          data-bs-toggle='modal'
                          data-bs-target='#editProduct'
                          onClick={() => {
                            getSingleProduct(product.id);
                          }}
                        >
                          <i
                            className='fas fa-pen'
                            style={{ color: "black" }}
                          ></i>
                        </div>
                      </div>
                    );
                  })
                : null}
              <div class='d-grid gap-2 col-6 mx-auto'>
                {/* Trigger modal */}
                <button
                  className={`btn btn-primary ${css.BtnPrimary}`}
                  type='button'
                  data-bs-toggle='modal'
                  data-bs-target='#staticBackdrop'
                >
                  Add Product
                </button>
              </div>
              {/* Modal */}
              <div
                className='modal fade'
                id='staticBackdrop'
                data-bs-backdrop='static'
                data-bs-keyboard='false'
                tabindex='-1'
                aria-labelledby='staticBackdropLabel'
                aria-hidden='true'
              >
                <div className='modal-dialog'>
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <h5 className='modal-title' id='staticBackdropLabel'>
                        Add product
                      </h5>
                      <button
                        type='button'
                        className='btn-close'
                        data-bs-dismiss='modal'
                        aria-label='Close'
                      ></button>
                    </div>
                    <div className='modal-body'>
                      <div className='mb-3'>
                        <label
                          for='exampleFormControlInput1'
                          className={`form-label ${css.Label}`}
                        >
                          Product Name
                        </label>
                        <input
                          type='text'
                          id='exampleFormControlInput1'
                          className={css.Input}
                          onChange={(val) => setProductName(val.target.value)}
                          required
                        />
                      </div>
                      <div className='mb-3'>
                        <label
                          for='exampleFormControlInput2'
                          className={`form-label ${css.Label}`}
                        >
                          Product Description
                        </label>
                        <textarea
                          className='form-control'
                          onChange={(val) => setDesc(val.target.value)}
                          id='exampleFormControlInput2'
                          rows='3'
                        ></textarea>
                      </div>
                      <div className='mb-3'>
                        <label
                          for='category'
                          className={`form-label ${css.Label}`}
                        >
                          Product Category
                        </label>
                        <select
                          className='form-select'
                          aria-label='Default select example'
                          onChange={(val) => setCategory(val.target.value)}
                        >
                          <option selected>
                            Open this select your product category
                          </option>
                          <option value={1}>Shirt</option>
                          <option value={2}>Pants</option>
                          <option value={3}>Shoes</option>
                        </select>
                      </div>
                      <div className='mb-3'>
                        <label
                          for='exampleFormControlInput3'
                          className={`form-label ${css.Label}`}
                        >
                          Product Price
                        </label>
                        <input
                          type='number'
                          id='exampleFormControlInput3'
                          className={`form-control ${css.Input}`}
                          onChange={(val) => setPrice(val.target.value)}
                          required
                        />
                      </div>
                      <div className='mb-3'>
                        <label
                          for='exampleFormControlInput4'
                          className={`form-label ${css.Label}`}
                        >
                          Product Brand
                        </label>
                        <input
                          type='text'
                          id='exampleFormControlInput4'
                          className={css.Input}
                          onChange={(val) => setBrand(val.target.value)}
                          required
                        />
                      </div>
                      <div className='mb-3'>
                        <label
                          for='exampleFormControlInput4'
                          className={`form-label ${css.Label}`}
                        >
                          Product Size
                        </label>
                        <input
                          type='number'
                          id='exampleFormControlInput4'
                          className={`form-control ${css.Input}`}
                          onChange={(val) => setSize(val.target.value)}
                          required
                        />
                      </div>
                      {/* <div className='mb-3'>
                        <label
                          for='exampleColorInput'
                          className={`form-label ${css.Label}`}
                        >
                          Product Color
                        </label>
                        <input
                          type='color'
                          id='exampleColorInput'
                          className={`${css.InputColor}`}
                          onChange={(val) => setColor(val.target.value)}
                          required
                        />
                      </div> */}
                      <div className='mb-3'>
                        <label
                          for='exampleFormControlInput4'
                          className={`form-label ${css.Label}`}
                        >
                          Product Quantity
                        </label>
                        <input
                          type='number'
                          id='exampleFormControlInput4'
                          className={`form-control ${css.Input}`}
                          onChange={(val) => setQuantity(val.target.value)}
                          required
                        />
                      </div>
                      <div className='mb-3'>
                        <label
                          for='formFileMultiple'
                          className={`form-label ${css.Label}`}
                        >
                          Product Image (Max 5 images)
                        </label>
                        <input
                          type='file'
                          id='formFileMultiple'
                          className={css.Input}
                          onChange={(val) => handleFile(val)}
                          multiple
                        />
                      </div>
                    </div>
                    <div className='modal-footer'>
                      <button
                        type='button'
                        className={`btn btn-secondary ${css.BtnSecondary}`}
                        data-bs-dismiss='modal'
                      >
                        Close
                      </button>
                      <button
                        type='button'
                        className={`btn btn-primary ${css.BtnPrimary}`}
                        data-bs-dismiss='modal'
                        onClick={handleSubmit}
                      >
                        Add now
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Edit product Modal */}
              <div
                className='modal fade'
                id='editProduct'
                data-bs-backdrop='static'
                data-bs-keyboard='false'
                tabindex='-1'
                aria-labelledby='staticBackdropLabel'
                aria-hidden='true'
              >
                <div className='modal-dialog'>
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <h5 className='modal-title' id='editProduct'>
                        Edit Product
                      </h5>
                      <button
                        type='button'
                        className='btn-close'
                        data-bs-dismiss='modal'
                        aria-label='Close'
                      ></button>
                    </div>
                    <div className='modal-body'>
                      <div className='mb-3'>
                        <label
                          for='editName1'
                          className={`form-label ${css.Label}`}
                        >
                          Product Name
                        </label>
                        <input
                          type='text'
                          id='editName1'
                          className={css.Input}
                          onChange={(val) => setProductName(val.target.value)}
                          defaultValue={product.product_name}
                          required
                        />
                      </div>
                      <div className='mb-3'>
                        <label
                          for='edit2'
                          className={`form-label ${css.Label}`}
                        >
                          Product Description
                        </label>
                        <textarea
                          className='form-control'
                          onChange={(val) => setDesc(val.target.value)}
                          id='edit2'
                          defaultValue={product.product_description}
                          rows='3'
                        ></textarea>
                      </div>
                      <div className='mb-3'>
                        <label
                          for='edit3'
                          className={`form-label ${css.Label}`}
                        >
                          Product Category
                        </label>
                        <select
                          className='form-select'
                          aria-label='Default select example'
                          onChange={(val) => setCategory(val.target.value)}
                          defaultValue={product.category_id}
                        >
                          <option selected>
                            Open this select your product category
                          </option>
                          <option value={1}>Shirt</option>
                          <option value={2}>Pants</option>
                          <option value={3}>Shoes</option>
                        </select>
                      </div>
                      <div className='mb-3'>
                        <label
                          for='edit4'
                          className={`form-label ${css.Label}`}
                        >
                          Product Price
                        </label>
                        <input
                          type='number'
                          id='edit4'
                          className={`form-control ${css.Input}`}
                          onChange={(val) => setPrice(val.target.value)}
                          defaultValue={String(product.product_price)}
                          required
                        />
                      </div>
                      <div className='mb-3'>
                        <label
                          for='edit5'
                          className={`form-label ${css.Label}`}
                        >
                          Product Brand
                        </label>
                        <input
                          type='text'
                          id='edit5'
                          className={css.Input}
                          onChange={(val) => setBrand(val.target.value)}
                          defaultValue={product.product_brand}
                          required
                        />
                      </div>
                      <div className='mb-3'>
                        <label
                          for='edit6'
                          className={`form-label ${css.Label}`}
                        >
                          Product Size
                        </label>
                        <input
                          type='number'
                          id='edit6'
                          className={`form-control ${css.Input}`}
                          onChange={(val) => setSize(val.target.value)}
                          defaultValue={String(product.size)}
                          required
                        />
                      </div>
                      <div className='mb-3'>
                        <label
                          for='edit8'
                          className={`form-label ${css.Label}`}
                        >
                          Product Color
                        </label>
                        <input
                          type='color'
                          id='edit8'
                          className={`${css.InputColor}`}
                          onChange={(val) => setColor(val.target.value)}
                          defaultValue={product.product_color}
                          required
                        />
                      </div>
                      <div className='mb-3'>
                        <label
                          for='edit9'
                          className={`form-label ${css.Label}`}
                        >
                          Product Quantity
                        </label>
                        <input
                          type='number'
                          id='edit9'
                          className={`form-control ${css.Input}`}
                          onChange={(val) => setQuantity(val.target.value)}
                          defaultValue={String(product.product_qty)}
                          required
                        />
                      </div>
                      <div className='mb-3'>
                        <label
                          for='formFileMultiple10'
                          className={`form-label ${css.Label}`}
                        >
                          Product Image (Max 5 images)
                        </label>
                        <input
                          type='file'
                          id='formFileMultiple10'
                          className={css.Input}
                          onChange={(val) => handleFile(val)}
                          multiple
                        />
                      </div>
                    </div>
                    <div className='modal-footer'>
                      <button
                        type='button'
                        className={`btn btn-secondary ${css.BtnSecondary}`}
                        data-bs-dismiss='modal'
                      >
                        Close
                      </button>
                      <button
                        type='button'
                        className={`btn btn-primary ${css.BtnPrimary}`}
                        data-bs-dismiss='modal'
                        onClick={() => {
                          editSubmit(product.id);
                        }}
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
};

export default MyProducts;
