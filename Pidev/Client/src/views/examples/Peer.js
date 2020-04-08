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
    Col,
    ListGroup, ListGroupItem,Table
} from "reactstrap";


// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import NavbarProfile from "../../components/Navbars/NavbarProfile";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import jwt_decode from "jwt-decode";
import axios from "axios";
import {Link} from "react-router-dom";





class Peer extends  Component {
    componentDidMount() {
        const t = {
            email: jwt_decode(localStorage.token).user.email }
        test: axios.post("http://localhost:3000/users/TeamName",t).then(res => {
            this.setState({team : res.data})
        })
        const members =     axios.post("http://localhost:3000/users/TeamMembers",t).then(res => {

            this.setState({tab:res.data})
            console.log(this.state.tab)


        });

    };



    constructor(props){
        super(props)
        this.state = {team:'',tab:''};

        //     var Te
        //   this.state = {team: axios.post("http://localhost:3000/users/TeamName",t).then(res => {
        //       Te = res.data
        //
        //     }) };
        //
        // const team =     axios.post("http://localhost:3000/users/TeamName",t).then(res => {
        //     console.log(res.data)
        //
        // });
        // const members =     axios.post("http://localhost:3000/users/TeamMembers",t).then(res => {
        //
        //
        //   });
        //   console.log({members})
    }

    render(){

        const {tab}  = this.state
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
                                    {jwt_decode(localStorage.token).user.nom} {jwt_decode(localStorage.token).user.prenom}<br />
                                </h4>
                                <h6 className="description">{jwt_decode(localStorage.token).user.role}</h6>
                            </div>
                        </div>
                        <Row>
                            <Col className="ml-auto mr-auto text-center" md="6">
                                <p>
                                    Esprit Student that is trying to use PeerEvaluation


                                </p>
                                <br />



                            </Col>
                        </Row>
                        <br />


                        <ListGroup as="ul" >
                            <center> <ListGroupItem as="li" active>Team {this.state.team}</ListGroupItem></center>
                            <ListGroupItem as="li">{this.state.tab && this.state.tab[0]['nom'] +' '+this.state.tab[0]['prenom'] }
                                <Link to={{pathname:'/evaluate', YO :this.state.tab[0]}}> <i className="nc-icon nc-layout-11" /> Evaluate ! </Link>
                            </ListGroupItem>
                            <ListGroupItem as="li" >{this.state.tab && this.state.tab[1]['nom'] +' '+this.state.tab[1]['prenom']}
                                <Link to={{pathname:'/evaluate', YO :this.state.tab[1]}}> <i className="nc-icon nc-layout-11" /> Evaluate ! </Link>
                            </ListGroupItem>

                            <ListGroupItem as="li" >{ jwt_decode(localStorage.token).user.nom } { jwt_decode(localStorage.token).user.prenom}
                            <Link to={{pathname:'/selfEvaluation'}}><i className="nc-icon nc-layout-11" /> Self Evaluate ! </Link>
                            </ListGroupItem>

                        </ListGroup>
                        {/* Tab panes */}

                    </Container>
                </div>

                <DemoFooter />
            </>
        );}
}

export default Peer;
