
import React from "react";

// reactstrap components
import {
    Input,
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
    Container,
    Row,
    Col,
    Button,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Modal, Form
} from "reactstrap";
import Pie from 'react-chartjs-2';

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import NavbarProfile from "../../components/Navbars/NavbarProfile";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import jwt_decode from "jwt-decode";
import axios from "axios";
import {Component} from "react"
import index from "async";
import NavBarAdmin from "../../components/Navbars/NavBarAdmin";


import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';


class Admin extends Component {

    constructor(props){
        super(props)
        this.state = {tab1:'',tab2:'',tab3:'',tab4:'',tab5:'',show:false,af:false,tabh:''};
        this.state = {m: [],x:[],ms:'',
            activeTab:"1",
            loginModal:false,
            data:{},
            nbU:0,
            nbA:0,
            nbN:0,

        };

    }
    onDismiss1(){
        this.setState({loginModal:false})
    }


    componentDidMount() {
        axios.get("http://localhost:3000/users/allUser").then(res => {
            this.setState({tab1:res.data})

            console.log('succes')
        });


        axios.get("http://localhost:3000/project/allProject").then(res => {
            this.setState({tab3:res.data})

            console.log('succes')
        });
        axios.get("http://localhost:3000/team/allTeam").then(res => {
            this.setState({tab4:res.data})
            console.log('succes')

            axios.get("http://localhost:3000/users/nbuser").then(res => {
                this.setState({nbU: res.data})
            });
            axios.get("http://localhost:3000/users/nbuserA").then(res => {
                this.setState({nbA: res.data})
            });
            axios.get("http://localhost:3000/users/nbuserN").then(res => {
                this.setState({nbN: res.data})
            });
        });
        console.log(this.state.nbU);
        console.log(this.state.nbN);
        console.log(this.state.nbA);

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
    mod(etat){
        this.setState({loginModal:etat});
        const d = {
            labels: [
                'Users',
                'Accepted',
                'waiting'
            ],
            datasets: [{
                data: [this.state.nbU, this.state.nbA, this.state.nbN],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ]
            }]
        };
        this.setState({data:d})
    }

    toggle  (tab) {
        if(this.state.activeTab!==tab){
            this.setState({activeTab:tab})
            console.log(this.state.activeTab);
        }

        //this.state.activeTab=tab
    }
    filter()
    {
        const t = {
            role:document.getElementById('select').value
        }
        console.log(t.role)
        axios.post("http://localhost:3000/users/role", t ).then(res => {
            this.setState({tab1:res.data})

            console.log(res.data)
        });
    }
   

    delete(a)
    {

        console.log(a)


        axios.get("http://localhost:3000/users/delete/"+a ).then(res => {

            console.log("succes")
        });
    }
    find()
    {
        const t =
            {
                email:document.getElementById('text').value
            }
        axios.post("http://localhost:3000/users/email", t ).then(res => {
            this.setState({tab1:res.data})

            console.log(res.data)
        });
    }
    findTeam()
    {
        const t =
            {
                name:document.getElementById('textTeam').value
            }
        axios.post("http://localhost:3000/team/name", t ).then(res => {
            this.setState({tab4:res.data})

            console.log(res.data)
        });
    }

    findProject()
    {
        const t =
            {
                nom:document.getElementById('textProject').value
            }
        axios.post("http://localhost:3000/project/nom", t ).then(res => {
            this.setState({tab3:res.data})

            console.log(res.data)
        });
    }
    findMembers(id,a)
    {
        axios.get("http://localhost:3000/team/getMembers/"+id ).then(res => {
            this.setState({tab5:res.data,tab4:'',show:true,nom:a,nomT:null})


            console.log(res.data)
        });
    }
    back()
    {
        axios.get("http://localhost:3000/team/allTeam").then(res => {
            this.setState({tab4:res.data,tab5:'',show:false})

            console.log('succes')
        });
    }
    findt(nom)
    {
        this.setState({nomT:nom,activeTab:"3"})

    }
    mailing(){
        const a = {email: document.getElementById('email1').value,
            subject: document.getElementById('subject1').value,
            text: document.getElementById('text1').value,
        }
        axios.post("http://localhost:3000/users/mailing", a ).then(res => {
            console.log(res.data)
            alert("your email was send")
        });

    }




    render()
    {
        return (
            <>
                <NavbarProfile/>
                <ProfilePageHeader/>
                <div className="section profile-content">
                    <NavBarAdmin/>
                    <container>

                    <div className="owner">
                        <div className="avatar">
                            <img
                                alt="..."
                                className="img-circle img-no-padding img-responsive"

                                src={require("assets/img/faces/admin.jpg")}

                            />

                        </div>
                    </div>
                    <div className="name">
                        <h4 className="btn btn-secondary btn-lg  btn-block">
                            Admin Dashboard
                        </h4>
                    </div>

                    <br/>


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
                                                    <strong>Users List</strong>
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={this.state.activeTab === "2" ? "active" : ""}
                                                    onClick={() => {
                                                        this.toggle("2");
                                                    }}
                                                >
                                                    <strong>Project List</strong>
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={this.state.activeTab === "3" ? "active" : ""}
                                                    onClick={() => {this.toggle("3")}}
                                                >
                                                    <strong>Teams List</strong>
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={this.state.activeTab === "4" ? "active" : ""}
                                                    onClick={() => {this.toggle("4")}}
                                                >
                                                    <strong>Sending Mail</strong>
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
                                                    <Col className="ml-auto mr-auto" >

                                                        <h1><strong>Users Table</strong></h1>
                                                        <br/>
                                                        <center> <table>
                                                            <tr>
                                                                <td>Filter
                                                                </td>
                                                                <td>
                                                                    <Input type="select" id="select" >
                                                                        <option onClick={this.componentDidMount.bind(this)}>
                                                                            All Users
                                                                        </option>
                                                                        <option value="Teacher" onClick={this.filter.bind(this)}>
                                                                            Teacher
                                                                        </option>
                                                                        <option value="Student"  onClick={this.filter.bind(this)}>
                                                                            Student
                                                                        </option>
                                                                    </Input >
                                                                </td>
                                                            </tr>
                                                        </table></center>
                                                        <br/>

                                                        <table className="table-responsive-md">
                                                            <tr>
                                                                <td> <Input type="text" id="text" placeholder="User email/country/university" onChange={this.find.bind(this)}  /></td>

                                                            </tr>

                                                        </table>
                                                        <div className="">

                                                            <table className="table">
                                                                <thead className="table table-info">
                                                                <tr>
                                                                    <th>First Name</th>
                                                                    <th>Last Name</th>
                                                                    <th>Email</th>
                                                                    <th>Role</th>
                                                                    <th>University</th>
                                                                    <th>Country</th>
                                                                    <th>Etat</th>
                                                                    <th>Actions</th>
                                                                </tr>
                                                                </thead>
                                                                {this.state.tab1   && this.state.tab1.map((team) =>  <tbody className="table table-active" key={team._id}  >

                                                                    <tr>
                                                                        <td>{team.nom}</td>
                                                                        <td>{team.prenom}</td>
                                                                        <td>{team.email}</td>
                                                                        <td>{team.role}</td>
                                                                        <td>{team.university}</td>
                                                                        <td>{team.pays}</td>
                                                                        <td>{team.etat}</td>
                                                                        <td><button className="btn-danger" onClick={this.refuser.bind(this , team.email)}>to reject</button>
                                                                            <button className="btn-primary" onClick={this.accepter.bind(this , team.email)}>Accept</button>
                                                                        </td>
                                                                    </tr>
                                                                    </tbody>
                                                                )}

                                                            </table>



                                                        </div>






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
                                                    <button onClick={this.onDismiss1.bind(this)}>×</button>
                                                </button>
                                                <div>
                                                    <h2>Pie Example</h2>
                                                    <Pie data={this.state.data } />
                                                </div>
                                            </div>
                                        </Modal>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <Col className="ml-auto mr-auto" >

                                            <h1><strong>Projects List</strong></h1>

                                            <table className="table-responsive-md">
                                                <tr>
                                                    <td> <Input type="text" id="textProject" placeholder="Project/Team name" onChange={this.findProject.bind(this)} /></td>
                                                </tr>

                                            </table>
                                            <div className="table-responsive">

                                                <table className="table">
                                                    <thead className="table table-info">
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Description</th>
                                                        <th>Team</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                    </thead>
                                                    {this.state.tab3   && this.state.tab3.map((t) =>  <tbody className="table table-active" key={t._id}  >

                                                        <tr>
                                                            <td>{t.nom}
                                                            </td>
                                                            <td>{t.description}</td>
                                                            <td>{t.team['name']}</td>
                                                            <td><button className="btn-info" onClick={this.findt.bind(this,t.team['name'])} >Details</button></td>
                                                        </tr>
                                                        </tbody>
                                                    )}

                                                </table>
                                            </div></Col>

                                    </TabPane>
                                    <TabPane tabId="3">
                                        <Col className="ml-auto mr-auto">

                                            <h1><strong>Teams List</strong></h1>

                                            <table className="table-responsive-md">
                                                <tr>
                                                    {this.state.nomT? <td>Search for : <p> {this.state.nomT} </p></td>  :null}
                                                    <td> <Input  type="text" id="textTeam" placeholder={this.state.nomT}   onChange={this.findTeam.bind(this)}  /></td>

                                                </tr>


                                            </table>
                                            <div className="table-responsive">

                                                <table className="table">
                                                    <thead className="table table-info">
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Description</th>
                                                        <th>Members number</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                    </thead>

                                                    {this.state.tab4   && this.state.tab4.map((team) =>  <tbody className="table table-active" key={team._id}  >

                                                        <tr>
                                                            <td>{team.name}
                                                            </td>
                                                            <td>{team.bio}</td>
                                                            <td>{team.members.length}</td>
                                                            <td><button className="btn-info" onClick={this.findMembers.bind(this,team._id,team.name)} >Details</button></td>
                                                        </tr>
                                                        </tbody>
                                                    )}

                                                </table>
                                                {this.state.show? <table className="table">
                                                    <thead className="table table-info">
                                                    <tr className="table table-active" > <th colSpan="3">Members List of Team :  {this.state.nom} </th></tr>
                                                    <tr>

                                                        <th>First Name </th>
                                                        <th>Last Name</th>
                                                        <th>Email</th>
                                                    </tr>
                                                    </thead>
                                                    {this.state.tab5 && this.state.tab5.map((t) =>  <tbody className="table table-active" key={t._id}  >

                                                        <tr>
                                                            <td>{t.nom}
                                                            </td>
                                                            <td>{t.prenom}</td>
                                                            <td>{t.email}</td>

                                                        </tr>

                                                        </tbody>
                                                    ) }
                                                    <tr><td colSpan="3">   <button className="btn btn-link" onClick={this.back.bind(this)}>Back</button></td></tr>
                                                </table> :null}

                                            </div></Col>
                                    </TabPane>
                                    <TabPane tabId="4">
                                        <Col className="ml-auto mr-auto" md="8">
                                            <h1><strong>Send Mail To different User</strong></h1>
                                            <div className="table-responsive">
                                                <div className="section landing-section">
                                                    <Container>
                                                        <Row>
                                                            <Col md="6">
                                                                <label>Email</label>
                                                                <InputGroup>
                                                                    <InputGroupAddon addonType="prepend">
                                                                        <InputGroupText>
                                                                            <i className="nc-icon nc-email-85" />
                                                                        </InputGroupText>
                                                                    </InputGroupAddon>
                                                                    <Input placeholder="Email" type="text" id="email1" />
                                                                </InputGroup>
                                                            </Col>
                                                            <Col className="ml-auto mr-auto" md="8">
                                                                <Form className="contact-form">
                                                                    <Row>
                                                                        <Col md="6">
                                                                            <label>Subject</label>
                                                                            <InputGroup>
                                                                                <InputGroupAddon addonType="prepend">
                                                                                    <InputGroupText>
                                                                                    </InputGroupText>
                                                                                </InputGroupAddon>
                                                                                <Input placeholder="Subject" type="text" id="subject1"/>
                                                                            </InputGroup>
                                                                        </Col>

                                                                    </Row>
                                                                    <label>Message</label>
                                                                    <Input
                                                                        placeholder="write your email..."
                                                                        type="textarea"
                                                                        rows="4"
                                                                        id="text1"
                                                                    />
                                                                    <Row>
                                                                        <Col className="ml-auto mr-auto" md="4">
                                                                            <Button className="btn-fill" color="danger" size="lg"
                                                                            onClick={this.mailing.bind(this)}>
                                                                                Send Mail
                                                                            </Button>
                                                                        </Col>
                                                                    </Row>
                                                                </Form>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                </div>

                                            </div></Col>
                                    </TabPane>
                                </TabContent>
                            </Col>

                        </Row>

                    </Container>
                </div>   </container>
                </div>

                <DemoFooter/>
            </>
        );
    }
}

export default Admin;





