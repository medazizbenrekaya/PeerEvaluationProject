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
import {Button, Card, Input, Container, Row, Col, Alert} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import axios from "axios";

class ResetPw extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password1:'',pass2:'',token:'',
            visible1: false, visible2: false, visible: false};
    }
    onDismiss(){
        this.setState({visible:false})
    }
    onDismiss1(){
        this.setState({visible1:false})
    }
    onDismiss2(){
        this.setState({visible2:false})
    }
    Reset() {

        const bod = {
            token: document.getElementById('token').value,
            password : document.getElementById('password').value
        };
        this.setState({password1:bod.password,token:bod.token,pass2:document.getElementById('password2').value})


        if(this.state.token.length===0){
            this.setState({visible:true})}

        else if((this.state.password1.length === 0)&&(this.state.password1.length <= 6)){
            this.setState({visible1:true})
        }
        else if(this.state.password1!==this.state.pass2){
            this.setState({visible2:true})
        }

        else {
        axios.post("http://localhost:3000/users/reset", bod).then(res => {
        });
        alert("done!")
         this.props.history.push("/login");}
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
                                        <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss.bind(this)}>
                                            <b>Token est un champ obligatoire. </b>
                                        </Alert>
                                        <label>New Password</label>
                                        <Input placeholder="New Password !" type="password" id="password" />
                                        <Alert color="danger" isOpen={this.state.visible1} toggle={this.onDismiss1.bind(this)}>
                                            <b>champ obligatoire au moins 6 caractéres.</b>
                                        </Alert>
                                        <label>Repeat Password</label>
                                        <Input placeholder="New Password !" type="password" id="password2" />
                                        <Alert color="danger" isOpen={this.state.visible2} toggle={this.onDismiss2.bind(this)}>
                                            <b>Verfier le password. </b>
                                        </Alert>
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
