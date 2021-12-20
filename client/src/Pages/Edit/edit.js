import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom"
import "./edit.css";
import axios from "axios";
import moment from "moment";

function Edit(props) {
  const [data, setdata] = useState([]);
  const { id } = props.match.params;
  const url = "http://localhost:3000";
  const history = useHistory()

  useEffect(async () => {
    let result = await axios.get(`${url}/voucher/${id}`, {
      headers: {
        access_token: sessionStorage.getItem("token"),
      },
    });

    console.log(result.data.result[0], "RES19");
    setdata(result.data.result[0]);
  }, []);

  const submitEdit = async (data) => {
    console.log(data);
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
      status,
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
      status: status.value,
    };

    let result = await axios.put(
      `${url}/voucher/${id}`,
      newData,
      {
        headers: {
          access_token: sessionStorage.getItem("token"),
        },
      }
    );

    console.log(result, "result");
    history.push('/home')
  };
  return (
    <div>
      <Navbar />

      <h1 className="title">Edit</h1>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          //   console.log(e.target.title);

          submitEdit(e.target);
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
              defaultValue={data.title}
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
              defaultValue={data.desc}
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
              defaultValue={moment(data.expiry_date).format("yyyy-MM-DD")}
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
              defaultValue={data.image}
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
              defaultValue={data.amount}
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
              defaultValue={data.payment_method}
            >
              <option>Payment Method</option>
              <option value="visa" selected={data.payment_method === "visa" ? "true" : "false"}>Visa</option>
              <option value="mastercard" selected={data.payment_method === "mastercard" ? "true" : "false"}>Mastercard</option>
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
              defaultValue={data.discount}
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
              defaultValue={data.quantity}
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
            <Form.Select
              name="buy_type"
              aria-label="Default select example"
              defaultValue={data.buy_type}
            >
              <option>Buy type</option>
              <option
                value="myself"
                selected={data.buy_type === "mySelf" ? "true" : "false"}
              >
                My-self
              </option>
              <option
                value="others"
                selected={data.buy_type === "others" ? "true" : "false"}
              >
                Others
              </option>
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
              defaultValue={data.limit}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalPassword"
        >
          <Form.Label column sm={2}>
            Status
          </Form.Label>
          <Col sm={10}>
            <Form.Select
              name="status"
              aria-label="Default select example"
              defaultValue={data.status}
            >
              <option>change voucher status</option>
              <option
                value="Active"
                selected={data.status === "Active" ? "true" : "false"}
              >
                Active
              </option>
              <option
                value="Inactive"
                selected={data.status === "Inactive" ? "true" : "false"}
              >
                Inactive
              </option>
            </Form.Select>
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
