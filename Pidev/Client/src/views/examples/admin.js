import React,{Component} from "react";
import {
    Button,
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
    Container,
    Row,
    Col,
    Form, Modal,
}
    from "reactstrap";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import NavbarProfile from "../../components/Navbars/NavbarProfile";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import jwt_decode from "jwt-decode";
import axios from "axios";


class admin extends  Component {
    constructor(props){
        super(props)
        this.state = {
            listTeacher:[],
            listStudent:[],
            email:"",
            activeTab:"",
            loginModal:false,
        };

    }
    mod(etat){
        this.setState({loginModal:etat});
    }
    toggle  (tab) {
        if(this.state.activeTab!==tab){
            this.setState({activeTab:tab})
        }
    }

    componentWillMount() {
            axios.get("http://localhost:3000/users/allteacher").then(res => {

                this.setState({
                    listTeacher: res.data
                });
            });
            axios.get("http://localhost:3000/users/allstudent").then(res => {

                this.setState({
                    listStudent: res.data
                });
            });

    }
    accepter(email){
        const a = {email:email}
        axios.post("http://localhost:3000/users/accepter",a).then(res => {
            console.log('succes');
            window.location.reload(false);

        });
    }
    refuser(email){
        const a = {email:email}
        axios.post("http://localhost:3000/users/refuser",a).then(res => {
            console.log('succes');
            window.location.reload(false);

        });
    }

    render() {
        return (
            <>

                <ProfilePageHeader/>
                <NavbarProfile/>
                <div className="section profile-content">
                    <Container>
                        <div className="owner">
                            <div className="avatar">
                                <img
                                    alt="..."
                                    className="img-circle img-no-padding img-responsive"
                                    src={require("assets/img/faces/admin.jpg")}
                                />
                            </div>
                            <div className="name">
                                <h4 className="title">
                                    {jwt_decode(localStorage.token).user.nom} {jwt_decode(localStorage.token).user.prenom}<br/>
                                </h4>
                                <h6 className="description">{jwt_decode(localStorage.token).user.role}</h6>
                            </div>
                        </div>
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
                                        <Col>
                                            <div className="nav-tabs-navigation">
                                                <div className="nav-tabs-wrapper">
                                                    <Nav id="tabs" role="tablist" tabs>
                                                        <NavItem>
                                                            <NavLink
                                                                className={this.state.activeTab === "1" ? "active" : ""}
                                                                onClick={() => {this.toggle("1")}}>
                                                                Teacher
                                                            </NavLink>
                                                        </NavItem>
                                                        <NavItem>
                                                            <NavLink
                                                                className={this.state.activeTab === "2 "? "active" : ""}
                                                                onClick={() => {
                                                                    this.toggle("2");
                                                                }}
                                                            >
                                                                Student
                                                            </NavLink>
                                                        </NavItem>
                                                        <NavItem>
                                                            <NavLink
                                                                className={this.state.activeTab === "3" ? "active" : ""}
                                                                onClick={() => {this.toggle("3")}}
                                                            >
                                                                Messages
                                                            </NavLink>
                                                        </NavItem>
                                                    </Nav>
                                                </div>
                                            </div>
                                            <TabContent activeTab={this.state.activeTab} className="text-center">
                                                <TabPane tabId="1">
                                                    <div>
                                                        <div className="filter" />
                                                        <Container>
                                                            <Row>
                                                                <Col className="ml-auto mr-auto">
                                                                    <h2 className="text-center">List Of Teacher</h2>
                                                                    <Form className="contact-form">
                                                                        <table className="table table-condensed">
                                                                            <thead>
                                                                            <tr>
                                                                                <th>Name</th>
                                                                                <th>LastName</th>
                                                                                <th>Email</th>
                                                                                <th>Actions</th>
                                                                            </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                            {this.state.listTeacher.map((teacher, index) => {
                                                                                return (
                                                                                    <tr key= {index}>
                                                                                        <th> {teacher.nom}</th>
                                                                                        <th>{teacher.prenom} </th>
                                                                                        <th> {teacher.email} </th>
                                                                                        <th><i className="btn-link" color="primary"
                                                                                        onClick={() => {this.accepter(teacher.email)}}>
                                                                                            accepter
                                                                                        </i>
                                                                                            <i className="btn-link" color="danger"
                                                                                               onClick={() => {this.refuser(teacher.email)}}>
                                                                                                refuser
                                                                                            </i></th>
                                                                                    </tr>
                                                                                );
                                                                            })}
                                                                            </tbody>
                                                                        </table>
                                                                    </Form>
                                                                </Col>
                                                            </Row>
                                                        </Container>
                                                    </div>
                                                </TabPane>
                                                <TabPane tabId="2">
                                                    <div>
                                                        <div className="filter" />
                                                        <Container>
                                                            <Row>
                                                                <Col className="ml-auto mr-auto" >
                                                                    <h2 className="text-center">List Of Students</h2>
                                                                    <Form className="contact-form">
                                                                        <table className="table table-condensed">
                                                                            <thead>
                                                                            <tr>
                                                                                <th>Name</th>
                                                                                <th>LastName</th>
                                                                                <th>Email</th>
                                                                                <th>Actions</th>
                                                                            </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                            {this.state.listStudent.map((student, index) => {
                                                                                return (
                                                                                    <tr key= {index}>
                                                                                        <th> {student.nom}</th>
                                                                                        <th>{student.prenom} </th>
                                                                                        <th> {student.email} </th>
                                                                                        <th><i className="btn-link" color="primary"
                                                                                               onClick={() => {this.accepter(student.email)}}>
                                                                                            accepter
                                                                                        </i>
                                                                                            <i className="btn-link" color="danger"
                                                                                               onClick={() => {this.refuser(student.email)}}>
                                                                                                refuser
                                                                                            </i></th>
                                                                                    </tr>
                                                                                );
                                                                            })}
                                                                            </tbody>
                                                                        </table>
                                                                    </Form>
                                                                </Col>
                                                            </Row>
                                                        </Container>
                                                    </div>
                                                    <Button color="primary" size="lg"
                                                    onClick={() => {
                                                        this.mod(true);}}>
                                                        statstique</Button>
                                                    <Modal
                                                        isOpen={this.state.loginModal}
                                                        toggle={() => {
                                                            this.mod(true);
                                                        }}
                                                        modalClassName="modal-register"
                                                    >
                                                        <div className="modal-header no-border-header text-center">
                                                            <button
                                                                aria-label="Close"
                                                                className="close"
                                                                data-dismiss="modal"
                                                                type="button"
                                                                onClick={this.state.loginModal}
                                                            >
                                                                <span aria-hidden={true}>×</span>
                                                            </button>
                                                            <p>Voici quelques stat</p>
                                                        </div>
                                                    </Modal>
                                                </TabPane>
                                                <TabPane tabId="3">
                                                    <p>Here are your messages.</p>
                                                </TabPane>
                                            </TabContent>
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

export default admin;
