import React, { Component } from "react";



import {Button, Card, Input, Container, Row, Col, Alert} from "reactstrap";


import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import axios from "axios";
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email1:'',password1:'',pass2:'',nom1:'',prenom1:'',role1:'',
            visible1: false, visible2: false, visible3: false, visible4: false, visible5: false, visible6: false,visible7:false,visible8:false
        };
    }
    onDismiss1(){
        this.setState({visible1:false})
    }
    onDismiss2(){
        this.setState({visible2:false})
    }
    onDismiss3(){
        this.setState({visible3:false})
    }
    onDismiss4(){
        this.setState({visible4:false})
    }
    onDismiss5(){
        this.setState({visible5:false})
    }
    onDismiss7(){
        this.setState({visible7:false})
    }
    onDismiss8(){
        this.setState({visible8:false})
    }
    Register() {
        const bod = {
           email: document.getElementById('login').value,
            password : document.getElementById('password').value,
            nom:document.getElementById('nom').value,
            prenom:document.getElementById('prenom').value,
            role:document.getElementById('role').value,
            image: document.getElementById('image').value
        };
        this.state.email1=bod.email
        this.state.nom1=bod.nom
        this.state.password1=bod.password
        this.state.prenom1=bod.prenom
        this.state.role1=bod.role
        this.state.pass2=document.getElementById('password2').value
         if (this.state.email1.length === 0) {
             this.setState({visible1:true})
         }
         else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email1)){
             this.setState({visible7:true})
         }
         else if(this.state.nom1.length === 0){
            this.setState({visible2:true})
        }
        else if(this.state.prenom1.length === 0){
            this.setState({visible3:true})
        }
        else if((this.state.password1.length === 0)&&(this.state.password1.length <= 6)){
            this.setState({visible4:true})
        }
        else if(this.state.password1!==this.state.pass2){
            this.setState({visible5:true})
        }
        else if(this.state.role1===0){
            this.setState({visible6:true})
        }
            else {
        axios.post("http://localhost:3000/users/register", bod).then(res => {
            if(res.data==="User already exist"){
                this.setState({visible8:true})
            }
            else console.log(res.data)
            //this.props.history.push("/login");
        });}

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
                                    <Alert color="danger" isOpen={this.state.visible8} toggle={this.onDismiss8.bind(this)}>
                                        <b>Email already exist</b>
                                    </Alert>
                                    <div className="social-line text-center">

                                    </div>
                                    <>
                                        <label>Email</label>
                                        <Input placeholder="Email" type="text" id="login"
                                                />
                                        <Alert color="danger" isOpen={this.state.visible1} toggle={this.onDismiss1.bind(this)}>
                                            <b>Email est un champ obligatoire. </b>
                                        </Alert>
                                        <Alert color="danger" isOpen={this.state.visible7}toggle={this.onDismiss7.bind(this)} >
                                            <b>e-mail n'est pas valide. </b>
                                        </Alert>
                                        <label>First Name</label>
                                        <Input placeholder="Nom" type="text" id="nom" />
                                        <Alert color="danger" isOpen={this.state.visible2} toggle={this.onDismiss2.bind(this)}>
                                            <b>nom est un champ obligatoire. </b>
                                        </Alert>
                                        <label>Last Name</label>
                                        <Input placeholder="Prenom" type="text" id="prenom" />
                                        <Alert color="danger" isOpen={this.state.visible3} toggle={this.onDismiss3.bind(this)}>
                                            <b>Prenom est un champ obligatoire. </b>
                                        </Alert>
                                        <label>Password</label>
                                        <Input placeholder="Password" type="password" id="password" />
                                        <Alert color="danger" isOpen={this.state.visible4} toggle={this.onDismiss4.bind(this)}>
                                            <b>champ obligatoire au moins 6 caractéres.</b>
                                        </Alert>
                                        <label>Repeat Password</label>
                                        <Input placeholder="Password" type="password" id="password2" />
                                        <Alert color="danger" isOpen={this.state.visible5} toggle={this.onDismiss5.bind(this)}>
                                            <b>Verfier le password. </b>
                                        </Alert>
                                        <label>Role</label>
                                        <select name="role" id="role">
                                            <option>Student</option>
                                            <option>Teacher</option>
                                        </select>
                                        <Alert color="danger" isOpen={this.state.visible6} >
                                            <b>Role est un champ obligatoire. </b>
                                        </Alert>
                                        <Input value="student.png" type="text" id="image"  hidden/>
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
