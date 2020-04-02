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
import {Link, Redirect} from "react-router-dom";
import jwt_decode from "jwt-decode";
class Register extends Component {
    Register() {


        const bod = {
           email: document.getElementById('login').value,
            password : document.getElementById('password').value,
            nom:document.getElementById('nom').value,
            prenom:document.getElementById('prenom').value,
            role:document.getElementById('role').value
        };
        axios.post("http://localhost:3000/users/register", bod).then(res => {
            console.log('succes')
            this.props.history.push("/login");




        });

    }
    render(){

        return (
            <>
                <ExamplesNavbar />
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
                                    <h3 className="title mx-auto">Register !</h3>
                                    <div className="social-line text-center">

                                    </div>
                                    <>
                                        <label>Email</label>
                                        <Input placeholder="Email" type="text" id="login" />
                                        <label>Password</label>
                                        <Input placeholder="Password" type="password" id="password" />
                                        <label>Repeat Password</label>
                                        <Input placeholder="Password" type="password" id="password" />
                                        <label>First Name</label>
                                        <Input placeholder="Nom" type="text" id="nom" />
                                        <label>Last Name</label>
                                        <Input placeholder="Prenom" type="text" id="prenom" />
                                        <label>Role</label>
                                        <select name="role" id="role">
                                            <option>Student</option>
                                            <option>Teacher</option>
                                            <option>Stakeholder</option>
                                        </select>
                                        <Button block className="btn-round" color="danger" onClick={this.Register.bind(this)}>
                                           Register

                                        </Button>
                                    </>

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

export default Register;
