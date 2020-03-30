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
    Col, Card
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import NavbarProfile from "../../components/Navbars/NavbarProfile";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import jwt_decode from "jwt-decode";
import axios from "axios";

class TeacherPage extends  Component {
    Ajouter() {


        const bod = {
            nom: document.getElementById('nom').value,
            description:document.getElementById('desc').value,
        };
        axios.post("localhost:3000/ms/ajouterMS", bod).then(res => {
            console.log('succes')

        });
    }
    render() {
        return (
            <>
                <NavbarProfile/>
                <ProfilePageHeader/>
                <div className="section profile-content">
                    <Container>
                        <div className="owner">
                            <div className="avatar">
                                <img
                                    alt="..."
                                    className="img-circle img-no-padding img-responsive"
                                    src={require("assets/img/faces/Teacher.jpg")}
                                />
                            </div>
                            <div className="name">
                                <h4 className="title">
                                    {jwt_decode(localStorage.token).user.nom} {jwt_decode(localStorage.token).user.prenom}<br/>
                                </h4>
                                <h6 className="description">{jwt_decode(localStorage.token).user.role}</h6>
                            </div>
                        </div>
                        <Row>
                            <Col className="ml-auto mr-auto text-center" md="6">
                                <p>
                                    An artist of considerable range, Jane Faker — the name taken by
                                    Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
                                    and records all of his own music, giving it a warm, intimate
                                    feel with a solid groove structure.
                                </p>
                                <br/>
                                <Button className="btn-round" color="default" outline>
                                    <i className="fa fa-cog"/> Settings
                                </Button>
                            </Col>
                        </Row>
                        <br/>
                        <div className="nav-tabs-navigation">
                            <div className="nav-tabs-wrapper">
                            </div>
                        </div>
                        <>
                            <ExamplesNavbar />
                            <div>
                                <div className="filter" />
                                <Container>
                                    <Row>
                                        <Col className="ml-auto mr-auto" lg="4">
                                            <Card className="card-register ml-auto mr-auto">
                                                <h3 className="title mx-auto">Add Micro !</h3>
                                                <div className="social-line text-center">

                                                </div>
                                                <>
                                                    <label>Nom Micro</label>
                                                    <Input placeholder="Nom" type="text" id="nom" />
                                                    <label>Description MicroSkill</label>
                                                    <Input placeholder="Description" type="textarea" id="desc" />

                                                    <Button block className="btn-round" color="danger" onClick={this.Ajouter.bind(this)}>
                                                        ADD
                                                    </Button>
                                                </>

                                            </Card>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </>

                    </Container>
                </div>
                <DemoFooter/>
            </>
        );
    }
}

export default TeacherPage;
