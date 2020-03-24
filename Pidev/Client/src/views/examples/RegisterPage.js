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
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import axios from "axios";
import jwt_decode from "jwt-decode";
import NavbarLogin from "../../components/Navbars/NavbarLogin";
class RegisterPage extends Component {
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
          console.log(jwt_decode(res.data).user.role,jwt_decode(res.data).user.nom,jwt_decode(res.data).user.prenom)

          if(jwt_decode(res.data).user.role === null){
            this.props.history.push({
              pathname: "/profile-page"
            })
          }
          else{
            this.props.history.push({
              pathname: "/profile-page"
            });
          }
        })
        .catch(err => {
          console.log("error");
        });
  }
  render(){
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
                <div className="social-line text-center">

                </div>
                <Form className="register-form">
                  <label>Email</label>
                  <Input placeholder="Email" type="text" id="login" />
                  <label>Password</label>
                  <Input placeholder="Password" type="password" id="password" />
                  <Button block className="btn-round" color="danger" onClick={this.login.bind(this)}>
                    Login
                  </Button>
                </Form>
                <div className="forgot">
                  <Button
                    className="btn-link"
                    color="danger"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    Forgot password?
                  </Button>
                </div>
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
