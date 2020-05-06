
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
} from "reactstrap";


import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import NavbarProfile from "../../components/Navbars/NavbarProfile";
import NavBarTeacher from "../../components/Navbars/NavBarTeacher";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import jwt_decode from "jwt-decode";
import axios from "axios";

class Workshopstudent extends  Component {
    constructor(props){
        super(props)
        this.state = {m: [],x:[],ms:'',
            activeTab:"1",tab1:'',show2:false,tab2:'',show:false,show1:false,
        };
    }

    toggle  (tab) {
        if(this.state.activeTab!==tab){
            this.setState({activeTab:tab})
        }
    }
    componentDidMount() {
        axios.get("http://localhost:3000/WS/allworkshop").then(res => {
            this.setState({tab1:res.data})
            console.log('succes')

        });
    }


    delete(a) {
        const bod={idws:a,
            id:jwt_decode(localStorage.token).user._id}
            console.log(bod)
        axios.post("http://localhost:3000/ws/reserver",bod).then(res => {
            window.location.reload()
            alert(res.data)
            console.log("succes")
        });
    }



    render() {
        return (
            <>

                <ProfilePageHeader/>
                <NavbarProfile/>


                <div className="section profile-content">
                    <NavBarTeacher/>
                    <Container>

                        <div className="owner">

                            <div className="card">
                                <h4 className="card-title">
                                    {jwt_decode(localStorage.token).user.nom} {jwt_decode(localStorage.token).user.prenom}<br/>
                                </h4>
                                <h6 className="card-subtitle">{jwt_decode(localStorage.token).user.role}</h6>
                            </div>
                        </div>
                        <Row>
                            <Col className="ml-auto mr-auto text-center" md="6">

                                <br/>
                                <br/>


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
                                                               Workshop
                                                            </NavLink>
                                                        </NavItem>

                                                    </Nav>
                                                </div>
                                            </div>
                                            <TabContent activeTab={this.state.activeTab} className="text-center">
                                                <TabPane tabId="1">
                                                    <Col className="ml-auto mr-auto">

                                                        <h1>Workshops Table</h1>
                                                        <br/>   <br/>   <br/>
                                                        <div className="table-responsive">

                                                            <center><table >
                                                                <thead >
                                                                <tr>
                                                                    <th>Name</th>
                                                                    <th>description</th>
                                                                    <th>Start-date</th>
                                                                    <th>End-date</th>
                                                                    <th>Places number</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                                </thead>
                                                                {this.state.tab1   && this.state.tab1.map((work) =>  <tbody className="table table-active" key={work._id}  >

                                                                    <tr>
                                                                        <td>{work.nom}

                                                                        </td>
                                                                        <td>{work.description}</td>
                                                                        <td>{work.datedebut}</td>
                                                                        <td>{work.datefin}</td>
                                                                        <td>{work.nbplace}</td>
                                                                        <td>
                                                                            <Button className="btn-info" onClick={this.delete.bind(this , work._id)} >Reserver</Button>
                                                                        </td>
                                                                    </tr>
                                                                    </tbody>
                                                                )}

                                                            </table>
                                                            </center>

                                                        </div></Col>

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

export default Workshopstudent;
