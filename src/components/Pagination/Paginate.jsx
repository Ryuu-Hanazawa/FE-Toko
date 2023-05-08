import React, { Component } from "react";
import { Pagination } from "react-bootstrap";

class Paginate extends Component {
  render() {
    const { totalPage, currentPage } = this.props;
    let active = currentPage;
    let items = [];
    for (let number = 1; number <= totalPage; number++) {
      items.push(
        <Pagination.Item key={number} active={number === active}>
          {number}
        </Pagination.Item>
      );
    }
    return (
      <div>
        <Pagination>
          <Pagination.Prev />
          {items}
          <Pagination.Next />
        </Pagination>
      </div>
    );
  }
}

export default Paginate;