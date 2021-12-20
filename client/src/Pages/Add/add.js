import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./add.css";
import axios from "axios";

function Edit() {
  const url = "http://localhost:3000";
  const history = useHistory();

  const submitAdd = async (data) => {
    const {
      title,
      desc,
      expiry_date,
      image,
      amount,
      payment_method,
      discount,
      quantity,
      buy_type,
      limit,
    } = data;

    const newData = {
      title: title.value,
      desc: desc.value,
      expiry_date: expiry_date.value,
      image: image.value,
      amount: amount.value,
      payment_method: payment_method.value,
      discount: discount.value,
      quantity: quantity.value,
      buy_type: buy_type.value,
      limit: limit.value,
    };
    console.log(newData, "DATA");

    let result = await axios.post(`${url}/voucher/`, newData, {
      headers: {
        access_token: sessionStorage.getItem("token"),
      },
    });

    console.log(result, "result");
    history.push("/home");
  };
  return (
    <div>
      <Navbar />

      <h1 className="title">Add</h1>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          //   console.log(e.target.title);

          submitAdd(e.target);
        }}
      >
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Title
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              name="title"
              type="title"
              placeholder="Title of the voucher"
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalPassword"
        >
          <Form.Label column sm={2}>
            Description
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              name="desc"
              type="text"
              placeholder="Description of the voucher"
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalPassword"
        >
          <Form.Label column sm={2}>
            Expire Date
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              name="expiry_date"
              type="date"
              placeholder="Expire date of the voucher"
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalPassword"
        >
          <Form.Label column sm={2}>
            Image Url
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              name="image"
              type="text"
              placeholder="Image Url of the voucher"
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalPassword"
        >
          <Form.Label column sm={2}>
            Amount
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              name="amount"
              type="number"
              placeholder="How much the voucher worth"
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalPassword"
        >
          <Form.Label column sm={2}>
            Payment Method
          </Form.Label>
          <Col sm={10}>
            <Form.Select
              name="payment_method"
              aria-label="Default select example"
            >
              <option value="visa" selected>
                Visa
              </option>
              <option value="mastercard">Mastercard</option>
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalPassword"
        >
          <Form.Label column sm={2}>
            Discount
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              name="discount"
              type="number"
              placeholder="How much discount worth"
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalPassword"
        >
          <Form.Label column sm={2}>
            Quantity
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              name="quantity"
              type="number"
              placeholder="Total quantity of the voucher as a whole"
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalPassword"
        >
          <Form.Label column sm={2}>
            Buy Type
          </Form.Label>
          <Col sm={10}>
            <Form.Select name="buy_type" aria-label="Default select example">
              <option value="myself" selected>
                My-self
              </option>
              <option value="others">Others</option>
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalPassword"
        >
          <Form.Label column sm={2}>
            Limit
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              name="limit"
              type="number"
              placeholder="Limit voucher per user"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">Save</Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Edit;
