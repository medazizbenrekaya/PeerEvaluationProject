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
import {Carousel} from 'primereact/carousel';






class Peer extends  Component {
    componentDidUpdate() {

    }

    componentDidMount() {
        const t = {
            email: jwt_decode(localStorage.token).user.email }
        // test: axios.post("http://localhost:3000/users/TeamName",t).then(res => {
        //     this.setState({team : res.data})
        // })
        // const members =     axios.post("http://localhost:3000/users/TeamMembers",t).then(res => {
        //
        //     this.setState({tab:res.data})
        //     // console.log(this.state.tab)
        //
        //
        // });
        const st = {
            email: jwt_decode(localStorage.token).user.email  ,
            project :document.getElementById('project').value

        }

        test2: axios.post("http://localhost:3000/users/projects",t).then(res => {
            this.setState({project : res.data}

            )
        })

        // this.setState({data :d})
        // console.log(this.state.data)


    };

descrip(){
    this.setState({show:true})
    const n ={ nom:document.getElementById('project').value}
    test2: axios.post("http://localhost:3000/project/get",n).then(res => {
        this.setState({p : res.data})
        // this.state.p['team']['members'].map(e=>{
        //
        var x = this.state.p['team']['members']
        this.setState({team:x})
        console.log(this.state.team)

    })
    const st = {
        email: jwt_decode(localStorage.token).user.email ,
        project :document.getElementById('project').value

    }
    const s =     axios.post("http://localhost:3000/users/stats",st).then(res => {

        this.setState({stats:res.data})
        console.log(this.state.stats)

        this.state.stats.map(e=>{


            this.state.tab2.push(e.micro)
            this.state.tab3.push(e.note)

        })
        console.log(this.state.tab2)
        console.log(this.state.tab3)

        const d = {
            labels: ['Communication', 'Leadership', 'Effectiveness', 'LeaderShip','Professionalism','Managing Skills','Cognitive ability'],
            // labels: this.state.tab2 && this.state.tab2,
            datasets: [
                {
                    label: 'Your Evaluation ! ',
                    backgroundColor: 'rgba(214, 4, 0, 1)',
                    borderColor: 'rgba(179,181,198,1)',
                    pointBackgroundColor: 'rgba(0, 214, 82, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(179,181,198,1)',
                    // data:this.state.tab3 && this.state.tab3
                    data: [12,20,10,8,18,16,19]
                }
            ]
        };
        this.setState({data:d})

    });

}


    constructor(props){
        super(props)
        this.state = {team:'',tab:'',stats:'',tab2:[],tab3:[],data :{},project:'',p:'',test:'',show:false};


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
                                    src={require("assets/img/faces/adem.jpg")}
                                />
                            </div>
                            <div className="name">
                                <h4 className="title">
                                    {jwt_decode(localStorage.token).user.nom} {jwt_decode(localStorage.token).user.prenom}<br />
                                </h4>

                            </div>
                        </div>
                        <Row>
                            <Col className="ml-auto mr-auto text-center" md="6">
                                <p>
                                    Esprit Student that is trying to use PeerEvaluation
                                <br/>
                                    <Label for="exampleSelect">Select Project  !</Label>
                                    <Input type="select" name="select" id="project">
                                        {this.state.project && this.state.project.map((team) => <option id="project"
                                                                                                        onClick={this.descrip.bind(this)}
                                                                                                        key={team}
                                                                                                        value={team}>{team}</option>)}
                                    </Input>

                                    { this.state.show == true && <Label for="exampleSelect"> Description :{this.state.p && this.state.p['description']}</Label> }


                                </p>
                                <br />
                            </Col>
                        </Row>
                        <br />
                        {/*<Label for="exampleSelect">Select Project  !</Label>*/}
                       <Media>
                                <Media>
                                    {/*<Input type="select" name="select" id="project">*/}
                                    {/*    {this.state.project && this.state.project.map((team) => <option id="project"*/}
                                    {/*                                                                    onClick={this.descrip.bind(this)}*/}
                                    {/*                                                                    key={team}*/}
                                    {/*                                                                    value={team}>{team}</option>)}*/}
                                    {/*</Input>*/}
                                </Media>
                                <Media body>
                                    <Media heading>




                                        { this.state.show ==true &&

                                        <Table >
                                            <thead>
                                            <tr>
                                                <center>

                                                    Team Members !
                                                </center>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>
                                                    <div className="car-details">
                                                        <div className="p-grid p-nogutter">
                                                            <div className="p-col-12">
                                                                <img src={require("assets/img/faces/student.png")}/>
                                                            </div>
                                                            <div className="p-col-12 car-data">
                                                                <div className="car-title">Teammate</div>
                                                                <div
                                                                    className="car-subtitle">{this.state.team && this.state.team[0]['nom'] + ' ' + this.state.team[0]['prenom']} </div>
                                                                <div className="car-subtitle"><Link to={{
                                                                    pathname: '/evaluate',
                                                                    X: this.state.p,
                                                                    YO: this.state.team[0]
                                                                }}> <Button color="warning">Evaluate !</Button>
                                                                </Link></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="car-details">
                                                        <div className="p-grid p-nogutter">
                                                            <div className="p-col-12">
                                                                <img src={require("assets/img/faces/student.png")}/>
                                                            </div>
                                                            <div className="p-col-12 car-data">
                                                                <div className="car-title">Teammate</div>
                                                                <div
                                                                    className="car-subtitle">{this.state.team && this.state.team[1]['nom'] + ' ' + this.state.team[1]['prenom']} </div>
                                                                <div className="car-subtitle"><Link to={{
                                                                    pathname: '/evaluate',
                                                                    X: this.state.p,
                                                                    YO: this.state.team[1]
                                                                }}>  <Button color="warning">Evaluate !</Button>
                                                                </Link></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                {this.state.team[2] != null &&
                                                <td>
                                                    <div className="car-details">
                                                        <div className="p-grid p-nogutter">
                                                            <div className="p-col-12">
                                                                <img src={require("assets/img/faces/student.png")}/>
                                                            </div>
                                                            <div className="p-col-12 car-data">
                                                                <div className="car-title">Teammate</div>
                                                                <div
                                                                    className="car-subtitle">{this.state.team && this.state.team[2]['nom'] + ' ' + this.state.team[2]['prenom']} </div>
                                                                <div className="car-subtitle"><Link to={{
                                                                    pathname: '/evaluate',
                                                                    X: this.state.p,
                                                                    YO: this.state.team[2]
                                                                }}> <Button color="warning">Evaluate !</Button>
                                                                </Link></div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </td>
                                                }

                                            </tr>
                                            </tbody>
                                        </Table>

                                        }

                                    </Media>


                                </Media>

                            </Media>
                        {this.state.show ==true &&
                            <center>
                        <div>
                            <Card style={{width: '50rem',height:'10'} }>
                                <CardBody>
                                    <Radar  data={this.state.data} />
                                </CardBody>
                            </Card>


                        </div>  </center> }



                        {/*<ListGroup as="ul" >*/}
                        {/*    <center> <ListGroupItem as="li" active>Team {this.state.team}</ListGroupItem></center>*/}
                        {/*    <ListGroupItem as="li">{this.state.tab && this.state.tab[0]['nom'] +' '+this.state.tab[0]['prenom'] }*/}
                        {/*        <Link to={{pathname:'/evaluate', YO :this.state.tab[0]}}> <i className="nc-icon nc-layout-11" /> Evaluate ! </Link>*/}
                        {/*    </ListGroupItem>*/}
                        {/*    <ListGroupItem as="li" >{this.state.tab && this.state.tab[1]['nom'] +' '+this.state.tab[1]['prenom']}*/}
                        {/*        <Link to={{pathname:'/evaluate', YO :this.state.tab[1]}}> <i className="nc-icon nc-layout-11" /> Evaluate ! </Link>*/}
                        {/*    </ListGroupItem>*/}

                        {/*    <ListGroupItem as="li" >{ jwt_decode(localStorage.token).user.nom } { jwt_decode(localStorage.token).user.prenom}*/}
                        {/*    <Link to={{pathname:'/selfEvaluation'}}><i className="nc-icon nc-layout-11" /> Self Evaluate ! </Link>*/}
                        {/*    </ListGroupItem>*/}

                        {/*</ListGroup>*/}
                        {/* Tab panes */}


                    </Container>

                </div>

                <DemoFooter />
            </>
        );}
}

export default Peer;
