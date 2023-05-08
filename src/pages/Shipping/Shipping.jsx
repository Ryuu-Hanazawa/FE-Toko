import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

import css from "./Shipping.module.css";

const Shipping = () => {
  const userId = useSelector((state) => state.auth.id);
  const level = useSelector((state) => state.auth.level);
  const [address, setAddress] = useState();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postal, setPostal] = useState("");
  const [country, setCountry] = useState("");
  const [street, setStreet] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/address/${userId}`)
      .then(({ data }) => {
        setAddress(data.data);
      })
      .catch((err) => console.log(err.message));
  }, [userId]);

  const handleSubmit = () => {
    const data = {
      name: name,
      city: city,
      province: province,
      postal_codes: postal,
      country: country,
      user_id: userId,
      street: street,
    };
    axios
      .post(`${process.env.REACT_APP_BASEURL}/address`, data)
      .then((data) => {
        window.location.reload(false);
      })
      .catch((err) => console.log(err.message));
  };

  if (level === "seller") {
    return <Redirect to="/" />
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
              <h1>Choose another address</h1>
              <p className='text-muted'>Manage your shipping address</p>
            </div>
            <hr />
            {/* Modal trigger */}
            <div
              className={css.AddAddress}
              data-bs-toggle='modal'
              data-bs-target='#staticBackdrop'
            >
              <p
                className='text-muted text-center'
                style={{ marginTop: "25px" }}
              >
                Add new address
              </p>
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
                      Add new address
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
                        Name
                      </label>
                      <input
                        type='text'
                        id='exampleFormControlInput1'
                        onChange={(val) => setName(val.target.value)}
                        className={css.Input}
                        required
                      />
                    </div>
                    <div className='mb-3'>
                      <label
                        for='exampleFormControlInput2'
                        className={`form-label ${css.Label}`}
                      >
                        Street
                      </label>
                      <input
                        type='text'
                        id='exampleFormControlInput2'
                        onChange={(val) => setStreet(val.target.value)}
                        className={css.Input}
                        required
                      />
                    </div>
                    <div className='mb-3'>
                      <label
                        for='exampleFormControlInput3'
                        className={`form-label ${css.Label}`}
                      >
                        City
                      </label>
                      <input
                        type='text'
                        id='exampleFormControlInput3'
                        onChange={(val) => setCity(val.target.value)}
                        className={css.Input}
                        required
                      />
                    </div>
                    <div className='mb-3'>
                      <label
                        for='exampleFormControlInput4'
                        className={`form-label ${css.Label}`}
                      >
                        Province
                      </label>
                      <input
                        type='text'
                        id='exampleFormControlInput4'
                        onChange={(val) => setProvince(val.target.value)}
                        className={css.Input}
                        required
                      />
                    </div>
                    <div className='mb-3'>
                      <label
                        for='exampleFormControlInput5'
                        className={`form-label ${css.Label}`}
                      >
                        Postal Codes
                      </label>
                      <input
                        type='text'
                        id='exampleFormControlInput5'
                        onChange={(val) => setPostal(val.target.value)}
                        className={css.Input}
                        required
                      />
                    </div>
                    <div className='mb-3'>
                      <label
                        for='exampleFormControlInput6'
                        className={`form-label ${css.Label}`}
                      >
                        Country
                      </label>
                      <input
                        type='text'
                        id='exampleFormControlInput6'
                        onChange={(val) => setCountry(val.target.value)}
                        className={css.Input}
                        required
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
                      type='submit'
                      className={`btn btn-primary ${css.BtnPrimary}`}
                      data-bs-dismiss='modal'
                      onClick={handleSubmit}
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {address
              ? address &&
                address.map((data) => (
                  <div className={css.AddressWrapper} key={data.id}>
                    <h5>{data.name}</h5>
                    <p>
                      {data.street}, {data.city}, {data.province},{" "}
                      {data.postal_codes}, {data.country}
                    </p>
                  </div>
                ))
              : null}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Shipping;
