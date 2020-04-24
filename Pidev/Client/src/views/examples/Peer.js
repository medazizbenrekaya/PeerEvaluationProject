

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

    this.setState({show:true,tab2:[],tab3:[],v:[]})
    var T = []
    const n ={ nom:document.getElementById('project').value}
    test2: axios.post("http://localhost:3000/project/get",n).then(res => {
        this.setState({p : res.data})
        var x = this.state.p['team']['members']
        this.setState({team:x})
        console.log(this.state.team)
        this.state.p['team']['members'].map(t=>{ //chouf mlih


            var v = {
                project :document.getElementById('project').value,
                voteur : jwt_decode(localStorage.token).user._id,
                email: t.email
            }
            axios.post("http://localhost:3000/project/verifvoteur",v).then(res => {

                if ( this.state.v) {
                    T = [...this.state.v,res.data]
                } else {
                    T.push(res.data)
                }
                 this.setState({v : T}, () => console.log(this.state.v)) //test chay
            })

        })

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
                //labels: ['Communication', 'Leadership', 'Effectiveness', 'LeaderShip','Professionalism','Managing Skills','Cognitive ability'],
                 labels: this.state.tab2 && this.state.tab2,
                datasets: [
                    {
                        label: 'Your Evaluation ! ',
                        backgroundColor: 'rgb(0,255,0)',
                        borderColor: 'rgba(179,181,198,1)',
                        pointBackgroundColor: 'rgb(0,128,0)',
                        pointBorderColor: 'rgb(0,128,0)',
                        pointHoverBackgroundColor: 'rgb(0,128,0)',
                        pointHoverBorderColor: 'rgb(0,128,0)',
                        data:this.state.tab3 && this.state.tab3
                      //  data: [12,20,10,8,18,16,19]
                    }
                ]
            };
            this.setState({data:d})

        });

    }




    constructor(props){
        super(props)
        this.state = {team:'',tab:'',stats:'',tab2:[],tab3:[],data :{},project:'',p:'',test:'',show:false,v:[]};


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
                                    src={require('assets/img/faces/student.png')}
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
                                    {jwt_decode(localStorage.token).user.university} Student that is trying to use PeerEvaluation
                                    <br/>
                                    <Label for="exampleSelect">Select Project  !</Label>
                                    <Input type="select" name="select" id="project">
                                        {this.state.project && this.state.project.map((team) => <option id="project"
                                                                                                        onClick={this.descrip.bind(this) }
                                                                                                        key={team}
                                                                                                        value={team}>{team}</option>)}
                                    </Input>

                                    { this.state.show == true && <Label for="exampleSelect"> Description :{this.state.p && this.state.p['description']}</Label> }


                                </p>
                                <br />
                            </Col>
                        </Row>
                        <br />

                       <Media >
                                <Media>
                                </Media>
                                <Media body>
                                    <Media heading>

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
                                    {this.state.show == true &&

                                    <Table>
                                        <thead>
                                        <tr>
                                            <center>

                                                Team Members !
                                            </center>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            {this.state.p && this.state.p['team']['members'].map((member, index) =>
                                                <td>
                                                    <div className="car-details">
                                                        <div className="p-grid p-nogutter">
                                                            <div className="p-col-12">
                                                                <img src={require("assets/img/faces/student.png")}/>
                                                            </div>
                                                            <div className="p-col-12 car-data">
                                                                <div className="car-title">Teammate</div>
                                                                <div
                                                                    className="car-subtitle">{this.state.team && member.nom + ' ' + member.prenom} </div>
                                                                {this.state.v.length &&
                                                                this.state.v[index] == true ?
                                                                    <div className="car-subtitle"><Link to={{
                                                                        pathname: '/evaluate',
                                                                        X: this.state.p,
                                                                        YO: member
                                                                    }}> <Button color="warning">Evaluate
                                                                        !</Button></Link></div>
                                                                    :
                                                                    < label className="label label-success mr-1">Evaluation
                                                                        Done!</label>
                                                                }

                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>)}

                                        </tr>
                                        </tbody>
                                    </Table>
                                    }


                        {this.state.show ==true &&
                        <center>
                            <div>
                                <Card style={{width: '50rem',height:'10', backgroundColor:'#66CDAA'   }}>
                                    <CardBody>
                                        <Radar  data={this.state.data}  />

                                    </CardBody>
                                </Card>


                            </div>  </center> }






</Media></Media></Media></Media></Media></Media>
                    </Container>

                </div>

                <DemoFooter />
            </>
        );}
}

export default Peer;
