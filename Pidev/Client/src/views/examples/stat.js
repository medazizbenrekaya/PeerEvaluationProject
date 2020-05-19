
import React from "react";

// reactstrap components
import {
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
    Container,
    Row,
    Col,
    Button,
    Modal
} from "reactstrap";
import Pie from 'react-chartjs-2';


import NavbarProfile from "../../components/Navbars/NavbarProfile";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

import axios from "axios";
import {Component} from "react"

import NavBarAdmin from "../../components/Navbars/NavBarAdmin";




class Stat extends Component {

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
            activePage: 1

        };

    }
    onDismiss1(){
        this.setState({loginModal:true})
        console.log(this.state.loginModal)
    }


    componentDidMount() {
            axios.get("http://localhost:3000/users/nbuser").then(res => {
                this.setState({nbU: res.data})
            });
            axios.get("http://localhost:3000/users/nbuserA").then(res => {
                this.setState({nbA: res.data})
            });
            axios.get("http://localhost:3000/users/nbuserN").then(res => {
                this.setState({nbN: res.data})
            });
        console.log(this.state.nbU);
        console.log(this.state.nbN);
        console.log(this.state.nbA);

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

                                                                <h1><strong>Users Stat</strong></h1>
                                                                <br/>

                                                                <br/>
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
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                </div>

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

export default Stat;





