import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Form, Button } from "react-bootstrap";
import "./login.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const history = useHistory();

  const submit = () => {
    axios
      .post("http://localhost:3000/user/login", {
        email: email,
        password: pass,
      })
      .then(function (response) {
        console.log("no error");
        console.log(response);
        sessionStorage.setItem("token", response.data.token);
        history.push("/home")
      })
      .catch(function (error) {
        console.log("error");
        console.log(error.response);
        alert(error.response.data.message)
      });
  };

  return (
    <>
      <Navbar />
      <div className="formTable">
        <h1 className="title">Login</h1>
        <div className="form">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  console.log(e.target.value);
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={pass}
                onChange={(e) => {
                  console.log(e.target.value);
                  setPass(e.target.value);
                }}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;
