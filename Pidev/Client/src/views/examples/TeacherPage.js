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
    Col, Card,
    InputGroupAddon,
    InputGroupText,
    Form,
    ListGroup,
    ListGroupItem


} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import NavbarProfile from "../../components/Navbars/NavbarProfile";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import jwt_decode from "jwt-decode";
import axios from "axios";
import SectionNavigation from "../index-sections/SectionNavigation";
import NucleoIcons from "../NucleoIcons";
import SectionProgress from "../index-sections/SectionProgress";

class TeacherPage extends  Component {
    constructor(props){
        super(props)
        this.state = {m: [],x:[],ms:'',
            activeTab:"1",tab1:''

        };



    }
    componentDidMount() {
        axios.get("http://localhost:3000/ms/Afficher").then(res => {
            this.setState({tab1:res.data})
            console.log('succes')

        });
    }
    toggle  (tab) {
        if(this.state.activeTab!==tab){
            this.setState({activeTab:tab})
            console.log(this.state.activeTab);
        }

        //this.state.activeTab=tab

    }
    toggle  (tab) {
      if(this.state.activeTab!==tab){
          this.setState({activeTab:tab})

      }

        //this.state.activeTab=tab
}


    addmacro(){
        const bod2 = {
            nom: document.getElementById('nommacro').value,
            description:document.getElementById('descmacro').value

        };
        this.state.m.push(bod2)
        console.log(this.state.m)
        let x = document.getElementById('nommacro').value
        this.setState({ms : this.state.ms +  x +'  |  ' })
        document.getElementById('nommacro').value = ''
        document.getElementById('descmacro').value = ''

    }


    Ajouter() {


        const bod = {
            nom: document.getElementById('nom').value,
            description:document.getElementById('desc').value,
            type:document.getElementById('type').value,
            macroskills: this.state.m


        };


        axios.post("http://localhost:3000/ms/ajouterMS", bod).then(res => {

            window.location.reload()
            console.log('succes')



        });
    }
    edit(){
        const bod = {
            _id:document.getElementById('id').value,
            nom:document.getElementById('nomU').value,
            prenom:document.getElementById('prenomU').value,

        };
        axios.post("http://localhost:3000/users/update", bod).then(res => {
            console.log('succes')


        });
    }

    filter()
    {
        const t = {
            type:document.getElementById('select').value
        }
        console.log(t.role)
        axios.post("http://localhost:3000/ms/type", t ).then(res => {
            this.setState({tab1:res.data})

            console.log(res.data)
        });
    }
    delete(a)
    {

        console.log(a)


        axios.get("http://localhost:3000/ms/delete/"+a ).then(res => {
            window.location.reload()
            console.log("succes")
        });
    }
    find()
    {
        const t =
            {
                nom:document.getElementById('text').value
            }
        axios.post("http://localhost:3000/ms/nom", t ).then(res => {
            this.setState({tab1:res.data})

            console.log(res.data)
        });
    }
    fileSelectedHandler = event =>
    { this.setState({
        selectedFile: event.target.files[0]
    })
    }

    fileUploadHandler = () => {
        const fd = FormData();
        fd.append('image',this.state.selectedFile,this.state.selectedFile.name)
        fd.append('_id',jwt_decode(localStorage.token).user._id)
        axios.post("http://localhost:3000/users/user-profile",fd).then(res => {

            console.log(res)

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

                                    src={require("assets/img/faces/"+jwt_decode(localStorage.token).user.image)}

                                />

                            </div>

                            <div className="section profile-content">
                                <input type="file" onChange={this.fileSelectedHandler} />
                                <button onClick={this.fileUploadHandler}>upload</button>
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
                                    Current team :
                                    {jwt_decode(localStorage.token).user.team  }
                                </p>
                                <br/>
                                <label>Edit Profile</label>
                                <br/>
                                <Input placeholder="" type="text" id="id" value={jwt_decode(localStorage.token).user._id} hidden/>
                                <label>First Name</label>
                                <Input placeholder={jwt_decode(localStorage.token).user.nom} type="text" id="nomU" />
                                <label>Last Name</label>
                                <Input placeholder={jwt_decode(localStorage.token).user.prenom} type="text" id="prenomU"/>
                                <br/>
                                <Button className="btn-round" color="default" onClick={this.edit.bind(this)} outline>
                                    <i className="fa fa-cog"/> edit
                                </Button>
                            </Col>
                        </Row>
                        <br/>
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
                                                                Add MacroSkills
                                                            </NavLink>
                                                        </NavItem>
                                                        <NavItem>
                                                            <NavLink
                                                                className={this.state.activeTab === "2 "? "active" : ""}
                                                                onClick={() => {
                                                                    this.toggle("2");
                                                                }}
                                                            >
                                                                See MacroSkills
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
                                                                <Col className="ml-auto mr-auto" md="8">
                                                                    <h2 className="text-center">ADD MacroSkill</h2>
                                                                    <Form className="contact-form">
                                                                        <Row>
                                                                            <Col md="6">
                                                                                <label>Name</label>
                                                                                <Input placeholder="Name" type="text" id="nom" />
                                                                            </Col>

                                                                        </Row>

                                                                        <label>Description</label>
                                                                        <Input
                                                                            rows="4"
                                                                            placeholder="Description" type="textarea" id="desc"
                                                                        />
                                                                        <Row>
                                                                            <label>Type</label>
                                                                            <select name="type" id="type">
                                                                                <option>Hard Skill</option>
                                                                                <option>Soft Skill</option>
                                                                            </select>
                                                                        </Row>

                                                                        <Row>

                                                                            <Container>
                                                                                <Row>
                                                                                    <Col className="ml-auto mr-auto" md="8">
                                                                                        <h2 className="text-center">Add MicroSkill for This MacroSkill</h2>
                                                                                        <Form className="contact-form">
                                                                                            <Row>
                                                                                                <Col md="6">
                                                                                                    <label>Name of MacroSkill  :</label>
                                                                                                    <Input placeholder="Name of macroSkill..." type="text" id="nommacro" />
                                                                                                </Col>
                                                                                            </Row>
                                                                                            <label>Description of MacroSkill   :</label>
                                                                                            <Input
                                                                                                rows="4"
                                                                                                placeholder="Description of MacroSkill..." type="textarea" id="descmacro"/>
                                                                                            <Row>
                                                                                                <Col className="ml-auto mr-auto" md="4">
                                                                                                    <Button className="mr-1 btn btn-outline-danger btn-sm" color="orange" size="lg"
                                                                                                            onClick={this.addmacro.bind(this)}>
                                                                                                        ADD Macro
                                                                                                    </Button>
                                                                                                </Col>
                                                                                            </Row>
                                                                                            <Row>
                                                                                                <label>names of microskill already added     :</label>
                                                                                                <ListGroup>
                                                                                                    <ListGroupItem color="success">{this.state.ms}</ListGroupItem>
                                                                                                </ListGroup>

                                                                                            </Row>
                                                                                        </Form>
                                                                                    </Col>
                                                                                </Row>
                                                                            </Container>
                                                                        </Row>
                                                                        <Row>
                                                                            <Col className="ml-auto mr-auto" md="4">
                                                                                <Button className="btn-fill" color="danger" size="lg" onClick={this.Ajouter.bind(this)}>
                                                                                    ADD
                                                                                </Button>
                                                                            </Col>
                                                                        </Row>
                                                                    </Form>
                                                                </Col>
                                                            </Row>
                                                        </Container>
                                                    </div>
                                                </TabPane>
                                                <TabPane tabId="2">
                                                    <Col className="ml-auto mr-auto" md="8">

                                                        <h1>Macro Skills Table</h1>
                                                        <center> <table>
                                                            <tr>
                                                                <td>Filter
                                                                </td>
                                                                <td>
                                                                    <Input type="select" id="select" >
                                                                        <option onClick={this.componentDidMount.bind(this)}>
                                                                            All Macro Skills
                                                                        </option>
                                                                        <option value="Hard Skill" onClick={this.filter.bind(this)}>
                                                                            Hard Skills
                                                                        </option>
                                                                        <option value="Soft Skill" onClick={this.filter.bind(this)}>
                                                                            Soft Skills
                                                                        </option>
                                                                    </Input >
                                                                </td>
                                                            </tr>
                                                        </table></center>
                                                        <br/>   <br/>   <br/>

                                                        <table className="table-responsive-md">
                                                            <tr>
                                                                <td> <Input type="text" id="text"  /></td>
                                                                <td>         <button onClick={this.find.bind(this)}>Search</button></td>
                                                            </tr>

                                                        </table>
                                                        <div className="table-responsive">

                                                            <table className="table">
                                                                <thead className="table table-info">
                                                                <tr>
                                                                    <th>Name</th>
                                                                    <th>Description</th>
                                                                    <th>Type</th>
                                                                    <th>Nombre Micro Skills</th>
                                                                    <th>Actions</th>
                                                                </tr>
                                                                </thead>
                                                                {this.state.tab1   && this.state.tab1.map((team) =>  <tbody className="table table-active" key={team._id}  >

                                                                    <tr>
                                                                        <td>{team.nom}
                                                                        </td>
                                                                        <td>{team.description}</td>
                                                                        <td>{team.type}</td>
                                                                        <td>{team.macroskills.length}</td>
                                                                        <td><button className="btn-danger" onClick={this.delete.bind(this , team._id)} >Delete</button></td>
                                                                    </tr>
                                                                    </tbody>
                                                                )}

                                                            </table>
                                                        </div></Col>




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

export default TeacherPage;
