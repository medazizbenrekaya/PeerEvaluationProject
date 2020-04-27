
import React, { Component } from "react";

import { Button, Card, Form, Input, Container, Row, Col,Alert } from "reactstrap";

import axios from "axios";
import jwt_decode from "jwt-decode";
import NavbarLogin from "../../components/Navbars/NavbarLogin";
class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            visible2: false,
            visible3: false,

        };
    }
    onDismiss(){
        this.setState({visible:false})
    }
    onDismiss2(){
        this.setState({visible2:false})
    }
    onDismiss3(){
        this.setState({visible3:false})
    }

  login() {
    const authentication = {
      email: document.getElementById('login').value,
      password: document.getElementById('password').value
    };

    axios
        .post("http://localhost:3000/users/login", authentication)
        .then(res => {
                console.log(res.data)
            if(res.data==='verifier vos paramétres'){
                this.setState({visible2: true})}
                else if(res.data==='Mot de passe incorrecte'){
                this.setState({visible3: true})
            }
            else{
                localStorage.setItem('token', res.data);
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

            }}
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
                  <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss.bind(this)}>
                      <b>votre compte n'est pas activer</b>
                      <br/><b>Vous allez recvoir un email d'acceptation ou refuse </b>
                  </Alert>
                  <Alert color="danger" isOpen={this.state.visible2} toggle={this.onDismiss2.bind(this)}>
                      <b>Verifier vos paramétres </b>
                  </Alert>
                  <Alert color="danger" isOpen={this.state.visible3} toggle={this.onDismiss3.bind(this)}>
                      <b>Mot de passe incorrecte</b>
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
