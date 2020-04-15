/*!

=========================================================
* Paper Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";


// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col,Alert } from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import axios from "axios";
import jwt_decode from "jwt-decode";
import NavbarLogin from "../../components/Navbars/NavbarLogin";
import {timeout, times} from "async";
class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            visible2: false
        };
    }

  login() {
    const authentication = {
      email: document.getElementById('login').value,
      password: document.getElementById('password').value
    };

    axios
        .post("http://localhost:3000/users/login", authentication)
        .then(res => {
                localStorage.setItem('token', res.data);

                console.log(jwt_decode(res.data).user.role)
                    if (jwt_decode(res.data).user.etat === true) {
                        if (jwt_decode(res.data).user.role === "Teacher") {
                            this.props.history.push({
                                pathname: "/teacher-page"
                            })
                        } else if (jwt_decode(res.data).user.role === "Student") {
                            this.props.history.push({
                                pathname: "/profile-page"
                            });
                        } else if (jwt_decode(res.data).user.role === "Admin") {
                            this.props.history.push({
                                pathname: "/admin"
                            });
                        }
                    } else {

                        this.setState({visible: true});
                        localStorage.clear()
                    }

            }
        )

  }
    forgot() {
        const authentication = {
            email: document.getElementById('login').value
        };
        axios
            .post("http://localhost:3000/users/forgot", authentication)
            .then(res => {

                localStorage.setItem('token', res.data);
                alert("An e-mail has been sent to "+authentication.email+" with further instructions" )
            })
            .catch(err => {
                console.log("error")

            });
    }
  render()
  {
  return (
    <>
      <NavbarLogin />
      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")"
        }}
      >
        <div className="filter" />
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="4">

              <Card className="card-register ml-auto mr-auto">
                <h3 className="title mx-auto">Welcome</h3>
                  <Alert color="danger" isOpen={this.state.visible} >
                      <b>votre compte n'est pas activer</b>
                      <br/><b>Vous allez recvoir un email d'acceptation ou refuse </b>
                  </Alert>
                  <Alert color="danger" isOpen={this.state.visible2} >
                      <b>Verifier vos paramétres </b>
                  </Alert>
                <div className="social-line text-center">

                </div>
                <Form className="register-form">
                  <label>Email</label>
                  <Input placeholder="email" type="text" id="login" />
                  <label>Password</label>
                  <Input placeholder="Password" type="password" id="password" />
                  <Button block className="btn-round" color="danger" onClick={this.login.bind(this)}>
                    Login
                  </Button>
                    <div className="forgot">
                    <Button
                        className="btn-round" color="danger" onClick={this.forgot.bind(this)}>
                        Forgot password?
                    </Button>
                    </div>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
        <div className="footer register-footer text-center">

        </div>
      </div>
    </>
  );
  }

}

export default RegisterPage;
