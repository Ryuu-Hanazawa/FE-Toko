import React from "react";
import { withRouter } from "react-router-dom";
import { Dropdown, Accordion, Card, ListGroup } from "react-bootstrap";

import Navbar from "../../components/Navbar/Navbar";

import Avatar from "../../assets/images/profile.png";
import Package from "../../assets/icons/Package.svg";

class Profile extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <main>
          <div className='container-fluid d-flex flex-wrap p-0 position-relative justify-content-end'>
            <div
              className='col-4 ps-md-0 ps-sm-0 d-none d-sm-flex flex-column align-items-end'
              style={{
                boxShadow: "6px 0px 40px #97979746",
                minHeight: "100vh",
                position: "fixed",
                zIndex: 2,
                left: 0,
              }}
            >
              {/* Profile Section */}
              <div className='col-xxl-8 col-xl-10 col-lg-12 pt-5 pe-0 ps-md-0 ps-sm-0'>
                <div className='container justify-content-end ps-3 ps-xl-5 pe-0 pe-xl-3'>
                  <div className='d-flex flex-wrap container row justify-content-lg-end justify-content-md-center align-items-center p-0 m-0'>
                    <div className='d-flex align-items-center col-xl-4 col-lg-3 p-0 justify-content-center'>
                      <img
                        src={Avatar}
                        className='rounded-circle border border-2 w-100 h-100'
                        style={{
                          maxWidth: "75px",
                          maxHeight: "75px",
                          minHeight: "75px",
                        }}
                        alt='profile'
                      />
                    </div>
                    <div className='col-sm-12 col-lg-9 col-xl-8 pr-0 flex-column d-flex justify-content-center p-0 mt-sm-2 mt-md-2'>
                      <h5 className='text-truncate'>Sean Lennon</h5>
                      <span>
                        <i
                          class='fas fa-pen'
                          style={{ marginRight: "10px" }}
                        ></i>
                        Change Profile
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product section */}
              <div className='col-xxl-8 col-xl-10 col-lg-12 pt-5 pe-0 ps-md-0 ps-sm-0'>
                <h4 className='pe-0 pe-xl-3 ps-3 ps-xl-5'>Menu</h4>
                <div className='d-flex justify-content-end pe-0 pe-xl-3 ps-3 ps-xl-5'>
                  <Accordion className='w-100' style={{ display: "initial" }}>
                    <Card>
                      <Accordion.Toggle
                        as={Card.Header}
                        variant='link'
                        eventKey='0'
                      >
                        <img
                          src={Package}
                          alt='icon'
                          className='rounded-circle me-2'
                          style={{
                            width: "20px",
                            height: "20px",
                            backgroundColor: "#F36F45",
                          }}
                        />
                        <span className='mr-2'>Products</span>
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey='0'>
                        <Card.Body className='p-0'>
                          <ListGroup>
                            <ListGroup.Item action href='#/myproducts'>
                              My Products
                            </ListGroup.Item>
                            <ListGroup.Item onClick={() => this.props.history.push('/post')}>
                              Sell Product
                            </ListGroup.Item>
                          </ListGroup>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </div>
              </div>
            </div>

            {/* Dropdown */}
            <div
              className='d-flex d-sm-none col-12 align-items-end'
              style={{ minHeight: "50px" }}
            >
              <Dropdown style={{ display: "initial" }}>
                <Dropdown.Toggle variant='light' id='dropdown-basic'>
                  <img
                    src={Package}
                    alt='icon'
                    className='rounded-circle me-2'
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: "#F36F45",
                    }}
                  />
                  <span className='me-2'>Products</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href='#/myproducts'>My Product</Dropdown.Item>
                  <Dropdown.Item href='#/sellproduct'>
                    Selling Products
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default withRouter(Profile);