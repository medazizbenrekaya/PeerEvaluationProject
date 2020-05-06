
import React,{Component} from "react";
import {
    Button,
    Input,
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
    Container,
    Row,
    Col,
    Form,
     Alert,
} from "reactstrap";


import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import NavbarProfile from "../../components/Navbars/NavbarProfile";
import NavBarTeacher from "../../components/Navbars/NavBarTeacher";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import jwt_decode from "jwt-decode";
import axios from "axios";

class WorkshopPage extends  Component {
    constructor(props){
        super(props)
        this.state = {m: [],x:[],ms:'',
            activeTab:"",tab1:'',show2:false,tab2:'',show:false,show1:false,
            visible1: false,
            visible2: false,
            visible3: false,
            visible4: false,
            visible5: false,
            visible6: false,
            visible7: false,
            nom1:'',desc1:'',dd1:'',df1:'',nb1:0

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
    onDismiss6(){
        this.setState({visible6:false})
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



    Ajouter() {


        const bod = {
            nom: document.getElementById('nom').value,
            description:document.getElementById('desc').value,
            datedebut:document.getElementById('dd').value,
            datefin:document.getElementById('df').value,
            nbplace: document.getElementById('nb').value
        };
        this.state.nom1=bod.nom
        this.state.desc1=bod.description
        this.state.dd1=bod.datedebut
        this.state.df1=bod.datefin
        this.state.nb1=bod.nbplace
        if (this.state.nom1.length === 0) {
            this.setState({visible1:true})
        }
        else if(this.state.desc1.length === 0){
            this.setState({visible2:true})
        }
        else if(this.state.dd1.length === 0){
            this.setState({visible3:true})
        }
        else if(this.state.df1.length === 0){
            this.setState({visible4:true})
        }
        else if(this.state.nb1.length === 0){
            this.setState({visible5:true})
        }
        else {
            axios.post("http://localhost:3000/ws/ajouter",bod).then(res => {
                if(res.data==="workshop already exist"){
                    this.setState({visible6:true})
                }else{
                console.log('succes')
                this.setState({ activeTab:"2"})
                }
            });

        }

    }
    delete(a) {
        const bod={a}
        axios.get("http://localhost:3000/ws/delete" ,bod).then(res => {
            window.location.reload()
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
                                <div className="title"><center><h2>Worshop management</h2></center></div>
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
                                                                See All workshop
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
                                                                    <h2 className="text-center">ADD Workshop</h2>
                                                                    <Form className="contact-form">
                                                                        <Row>
                                                                                <label>Name</label>
                                                                                <Input placeholder="Name" type="text" id="nom" />
                                                                                <Alert color="danger" isOpen={this.state.visible1} toggle={this.onDismiss1.bind(this)}>
                                                                                    <b>C'est un champ obilgatoire</b>
                                                                                </Alert>
                                                                        </Row>
                                                                        <Row>

                                                                        <label>Description</label>
                                                                        <Input
                                                                            rows="2"
                                                                            placeholder="Description" type="textarea" id="desc"
                                                                        />
                                                                        <Alert color="danger" isOpen={this.state.visible2} toggle={this.onDismiss2.bind(this)}>
                                                                            <b>C'est un champ obilgatoire</b>
                                                                        </Alert>
                                                                        </Row>
                                                                        <Row>
                                                                        <label>start-date</label>
                                                                        <Input type="date" id="dd" md="6"/>
                                                                            <Alert color="danger" isOpen={this.state.visible3} toggle={this.onDismiss3.bind(this)}>
                                                                                <b>C'est un champ obilgatoire</b>
                                                                            </Alert>
                                                                    </Row>
                                                                        <Row>
                                                                            <label>end-date</label>
                                                                            <Input type="date" id="df"/>
                                                                            <Alert color="danger" isOpen={this.state.visible4} toggle={this.onDismiss4.bind(this)}>
                                                                                <b>C'est un champ obilgatoire</b>
                                                                            </Alert>
                                                                        </Row>
                                                                        <Row>
                                                                            <label>number of places</label>
                                                                            <Input type="number" id="nb"/>
                                                                            <Alert color="danger" isOpen={this.state.visible5} toggle={this.onDismiss5.bind(this)}>
                                                                                <b>C'est un champ obilgatoire</b>
                                                                            </Alert>
                                                                        </Row>
                                                                        <Row>
                                                                            <Col className="ml-auto mr-auto" md="4">
                                                                                <Button className="btn-fill" color="danger" size="lg" onClick={this.Ajouter.bind(this)}>
                                                                                    ADD
                                                                                </Button>
                                                                                <Alert color="danger" isOpen={this.state.visible6} toggle={this.onDismiss6.bind(this)}>
                                                                                    <b>workshop already exist</b>
                                                                                </Alert>
                                                                            </Col>
                                                                        </Row>
                                                                    </Form>
                                                                </Col>
                                                            </Row>
                                                        </Container>
                                                    </div>
                                                </TabPane>
                                                <TabPane tabId="2">
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
                                                                        <Button className="btn-danger" onClick={this.delete.bind(this , work._id)} >Delete</Button>
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

export default WorkshopPage;
