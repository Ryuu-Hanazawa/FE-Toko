import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

import css from "./Order.module.css";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const userId = useSelector((state) => state.auth.id);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/history/${userId}`)
      .then(({data}) => {
        setOrders(data.data);
      })
      .catch((err) => console.log(err.message));
  }, [userId]);

  const toPrice = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

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
              <h1>My order</h1>
              <p className='text-muted'>Your order histories.</p>
            </div>
            {orders
              ? orders &&
                orders.map((order) => (
                  <div className={css.CardWrapper} key={order.id}>
                    <div className={css.OrderHead}>
                      <h5>Order {order.invoice_id.slice(12)}</h5>
                      <p>12-04-2023</p>
                    </div>
                    <p>Tracking number: {order.invoice_id}</p>
                    <p>Quantity: {order.qty}</p>
                    <p>Payment method: {order.payment}</p>
                    <div className={css.OrderFooter}>
                      <p>Total Price: Rp. {toPrice(order.price)}</p>
                      <p>Delivered</p>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Order;
