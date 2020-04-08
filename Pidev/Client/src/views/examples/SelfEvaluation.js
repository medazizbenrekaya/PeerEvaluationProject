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

import React,{Component} from "react";

// reactstrap components
import {
    Button,
    Label,
    FormGroup,
    Input,
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
    Container,
    Row,
    Col,Form,FormText,
    ListGroup, ListGroupItem,Table
} from "reactstrap";


// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import NavbarProfile from "../../components/Navbars/NavbarProfile";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import jwt_decode from "jwt-decode";
import axios from "axios";





class SelfEvaluation extends  Component {
    componentDidMount() {

    };



    constructor(props){
        super(props)
        this.state = {team:'',tab:'',TEST:'',tab2:'',show:false,show1:true};

    }
    note(){
        const n ={
            email:jwt_decode(localStorage.token).user.email,
            voteur:jwt_decode(localStorage.token).user._id,
            nom:document.getElementById('exampleSelect2').value,
            note:document.getElementById('n').value,
            M:document.getElementById('exampleSelect1').value
        }
        axios.post("http://localhost:3000/users/Selfnote",n).then(res => {

         window.alert("ok")
            console.log("succes")



        });

    }



    showN()
    {
        this.setState({show:true})
    }

    see()
    {
        this.setState({show1:true})
        const micro = axios.post("http://localhost:3000/users/find/"+jwt_decode(localStorage.token).user.email).then(res => {
            this.setState({tab2:res.data})
            console.log('succes')

        });
    }
    show(){

        const t = {
            nom:document.getElementById('exampleSelect1').value
        }
        console.log(t.nom)

        const micro = axios.post("http://localhost:3000/ms/find/"+t.nom).then(res => {
            this.setState({tab1:res.data})
            console.log('succes')

        });
    }

    render(){



        return (
            <>
                <NavbarProfile />
                <ProfilePageHeader />
                <div className="section profile-content">
                    <Container>
                        <div className="owner">
                            <div className="avatar">
                                <img
                                    alt="..."
                                    className="img-circle img-no-padding img-responsive"
                                    src={require("assets/img/faces/student.png")}
                                />
                            </div>
                            <div className="name">
                                <h4 className="title">
                                    You will evaluate Yourself <br />
                                </h4>
                                <h6 className="description">{jwt_decode(localStorage.token).user.role}</h6>
                            </div>
                        </div>
                        <Row>
                            <Col className="ml-auto mr-auto text-center" md="6">
                                <p>
                                    Evaluation Feature !


                                </p>
                                <br />



                            </Col>
                        </Row>
                        <br />
                        <div>
                            <button onClick={this.see.bind(this)}>Start</button>
                            <Form>
                                <FormGroup>
                                    <Label for="exampleEmail">Evaluator : {jwt_decode(localStorage.token).user.nom }  {jwt_decode(localStorage.token).user.prenom}</Label>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleSelect">Select Macro !</Label>
                                    <Input type="select" name="select" id="exampleSelect1">
                                        {this.state.tab2   && this.state.tab2.map((team) =><optgroup label={team.type}> <option  onClick={this.show.bind(this)} key={team.nom} value={team.nom}  >{team.nom}</option></optgroup>  )}

                                    </Input>

                                </FormGroup>

                                <FormGroup>
                                    <Label for="exampleSelect">Select Micro !</Label>
                                    <Input type="select" name="select" id="exampleSelect2" >
                                        {this.state.tab1 && this.state.tab1.map((detail) => <option onClick={this.showN.bind(this)}  key={detail.nom} value={detail.nom} > {detail.nom} </option>)}
                                    </Input>

                                </FormGroup>
                                {this.state.show? <Label for="exampleSelect2">Notez :<select id="n"><option color="green">1</option><option >2</option><option color="green">3</option><option color="green">4</option><option color="green">5</option></select></Label> :null} <br/>




                                <Button onClick={this.note.bind(this)}>Noter!</Button>
                            </Form>
                        </div>


                        {/* Tab panes */}

                    </Container>
                </div>

                <DemoFooter />
            </>
        );}
}

export default SelfEvaluation;
