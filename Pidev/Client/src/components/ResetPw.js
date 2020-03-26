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
class ResetPw extends Component {
    Reset() {


        const bod = {
            token: document.getElementById('token').value,
            password : document.getElementById('password').value
        };
        axios.post("http://localhost:3000/users/reset", bod).then(res => {
            console.log('succes')
        });
        alert("done!")
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
                                    <h3 className="title mx-auto">ResetPassword  !</h3>
                                    <div className="social-line text-center">

                                    </div>
                                    <>
                                        <label>Token</label>
                                        <Input placeholder="Token !" type="text" id="token" />
                                        <label>New Password</label>
                                        <Input placeholder="New Password !" type="password" id="password" />
                                        <label>Repeat Password</label>
                                        <Input placeholder="New Password !" type="password" id="password" />
                                        <Button block className="btn-round" color="danger" onClick={this.Reset.bind(this)}>
                                            Confirm !
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

export default ResetPw;
