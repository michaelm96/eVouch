import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./home.css";
import axios from "axios";
import moment from "moment";

function Home() {
  const [data, setdata] = useState([]);
  const url = "http://localhost:3000";

  useEffect(async () => {
    console.log(url, "url");
    let result = await axios.get(`${url}/voucher`, {
      headers: {
        access_token: sessionStorage.getItem("token"),
      },
    });

    console.log(result, "res");
    setdata(result.data.result);
  }, []);

  console.log(data, "DATA");
  return (
    <>
      <Navbar />
      <div>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Desc.</th>
              <th>Expires</th>
              <th>Image url</th>
              <th>Amount</th>
              <th>Payment method</th>
              <th>Discount</th>
              <th>Quantity</th>
              <th>Buy type</th>
              <th>Limit</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => {
              console.log(item.title, "item");
              return (
                <>
                  <tr>
                    <td>{idx + 1}</td>
                    <td key={idx}>{item.title}</td>
                    <td key={idx}>{item.desc}</td>
                    <td key={idx}>
                      {moment(item.expiry_date).format("DD-MMM-YYYY")}
                    </td>
                    <td key={idx}>{item.image}</td>
                    <td key={idx}>{item.amount}</td>
                    <td key={idx}>{item.payment_method}</td>
                    <td key={idx}>{item.discount}</td>
                    <td key={idx}>{item.quantity}</td>
                    <td key={idx}>{item.buy_type}</td>
                    <td key={idx}>{item.limit}</td>
                    <td key={idx}>{item.status}</td>
                    <td key={idx}>
                      <Button variant="warning">
                        <Link to={`/edit/${item.id}`}>Edit</Link>
                      </Button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
        <div className="addBtn">
          <Button variant="light">
            <Link to={`/add`}>Add</Link>
          </Button>
        </div>
      </div>
    </>
  );
}

export default Home;
