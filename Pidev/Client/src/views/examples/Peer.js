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
    Row,CardImg, CardText,
    CardTitle, CardSubtitle,
    Col,Card,CardBody,
    ListGroup, ListGroupItem,Table,Media
} from "reactstrap";


// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import NavbarProfile from "../../components/Navbars/NavbarProfile";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import jwt_decode from "jwt-decode";
import axios from "axios";
import {Link} from "react-router-dom";
import {Radar} from 'react-chartjs-2';





class Peer extends  Component {
    componentDidUpdate() {

    }

    componentDidMount() {
        const t = {
            email: jwt_decode(localStorage.token).user.email }
        test: axios.post("http://localhost:3000/users/TeamName",t).then(res => {
            this.setState({team : res.data})
        })
        const members =     axios.post("http://localhost:3000/users/TeamMembers",t).then(res => {

            this.setState({tab:res.data})
            // console.log(this.state.tab)


        });
        const s =     axios.post("http://localhost:3000/users/stats",t).then(res => {

            this.setState({stats:res.data})
            console.log(this.state.stats)

            this.state.stats.map(e=>{


                this.state.tab2.push(e.micro)
                this.state.tab3.push(e.note)

            })
            console.log(this.state.tab2)
            console.log(this.state.tab3)
            const d = {
                labels: ['Communication', 'JavaScript', 'DataScience', 'LeaderShip','Confidence'],
                // labels: this.state.tab2 && this.state.tab2,
                datasets: [
                    {
                        label: 'Your Evaluation ! ',
                        backgroundColor: 'rgba(179,181,198,0.2)',
                        borderColor: 'rgba(179,181,198,1)',
                        pointBackgroundColor: 'rgba(179,181,198,1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(179,181,198,1)',
                        // data:this.state.tab3 && this.state.tab3
                        data: [12,20,10,8,18]
                    }
                ]
            };
            this.setState({data:d})

        });
        test2: axios.post("http://localhost:3000/users/projects",t).then(res => {
            this.setState({project : res.data}

            )
        })

        // this.setState({data :d})
        // console.log(this.state.data)


    };

descrip(){
    const n ={ nom:document.getElementById('project').value}
    test2: axios.post("http://localhost:3000/project/get",n).then(res => {
        this.setState({p : res.data})
        // this.state.p['team']['members'].map(e=>{
        //
        var x = this.state.p['team']['members']
        this.setState({team:x})
        console.log(this.state.team)

    })

}


    constructor(props){
        super(props)
        this.state = {team:'',tab:'',stats:'',tab2:[],tab3:[],data :{},project:'',p:'',test:''};


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
                                    {jwt_decode(localStorage.token).user.nom} {jwt_decode(localStorage.token).user.prenom}<br />
                                </h4>
                                <h6 className="description">{jwt_decode(localStorage.token).user.role}</h6>
                            </div>
                        </div>
                        <Row>
                            <Col className="ml-auto mr-auto text-center" md="6">
                                <p>
                                    Esprit Student that is trying to use PeerEvaluation
                                <br/> <br/> <br/> <br/>


                                </p>
                                <br />

                                <div>
                                    <Card style={{width: '50rem',height:'10'} }>
                                        <CardBody>
                                            <Radar  data={this.state.data} />
                                        </CardBody>
                                    </Card>

                                </div>



                            </Col>
                        </Row>
                        <br /><br /><br /><br />
                        <Label for="exampleSelect">Select Project  !</Label>
                        <Media>
                            <Media >
                                <Input type="select" name="select" id="project">
                                    {this.state.project && this.state.project.map((team) => <option  onClick={this.descrip.bind(this)} key={team} value={team}  >{team}</option>)}
                                </Input>
                            </Media>
                                <Media body>
                                    <Media heading>

                                        <h7> Description:</h7>
                                        <h6> {this.state.p && this.state.p['description']}</h6>

                                        <Table bordered>
                                            <thead>
                                            <tr>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Evaluation !</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>{this.state.team && this.state.team[0]['nom']}</td>
                                                <td>{this.state.team && this.state.team[0]['prenom']}</td>
                                                <td><Link to={{pathname: '/evaluate', X:this.state.p, YO: this.state.team[0]}}> <i
                                                    className="nc-icon nc-layout-11"/> Evaluate ! </Link></td>
                                            </tr>

                                            <tr>
                                                <td>{this.state.team && this.state.team[1]['nom']}</td>
                                                <td>{this.state.team && this.state.team[1]['prenom']}</td>
                                                <td><Link to={{pathname: '/evaluate', X:this.state.p, YO: this.state.team[1]}}> <i
                                                    className="nc-icon nc-layout-11"/> Evaluate ! </Link></td>
                                            </tr>
                                            {this.state.team[2] != null &&
                                            <tr>
                                                <td>{this.state.team && this.state.team[2]['nom']}</td>
                                                <td>{this.state.team && this.state.team[2]['prenom']}</td>
                                                <td><Link to={{pathname: '/evaluate', X:this.state.p,YO: this.state.team[2]}}> <i
                                                    className="nc-icon nc-layout-11"/> Evaluate ! </Link></td>
                                            </tr>
                                            }
                                            </tbody>
                                        </Table>

                                    </Media>


                                </Media>

                        </Media>



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
