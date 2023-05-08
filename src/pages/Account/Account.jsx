import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";

import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

import css from "./Account.module.css";

const Account = () => {
  const [user, setUser] = useState({});
  const url = process.env.REACT_APP_BASEURL;
  const userId = useSelector((state) => state.auth.id);
  const level = useSelector((state) => state.auth.level);

  useEffect(() => {
    axios
      .get(url + `/user/${userId}`)
      .then(({data}) => {
        setUser(data);
      })
      .catch((err) => {
        console.log(err.respones)
      });
  }, [url, userId]);

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
              <h1>My Profile</h1>
              <p className='text-muted'>Manage your profile information</p>
            </div>
            <hr />
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
                value={user.name}
                className={css.Input}
              />
            </div>
            <div className='mb-3'>
              <label
                for='exampleFormControlInput2'
                className={`form-label ${css.Label}`}
              >
                Email
              </label>
              <input
                type='email'
                id='exampleFormControlInput2'
                value={user.email}
                className={css.Input}
              />
            </div>
            <button
              type='button'
              className={`btn btn-primary ${css.BtnPrimary}`}
            >
              Save
            </button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Account;
