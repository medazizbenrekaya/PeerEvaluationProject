

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
    Col,Card,CardBody, UncontrolledTooltip,
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
import NavBarStudent from "../../components/Navbars/NavBarStudent";





class Peer extends  Component {
    componentDidUpdate() {

    }

    componentDidMount() {
        const t = {
            email: jwt_decode(localStorage.token).user.email }



        test2: axios.post("http://localhost:3000/users/projects",t).then(res => {
            this.setState({project : res.data}

            )
        })

        // this.setState({data :d})
        // console.log(this.state.data)


    };


descrip(a){

    this.setState({show:true,tab2:[],tab3:[],v:[]})
    var T = []
    const n ={ nom:a}
    test2: axios.post("http://localhost:3000/project/get",n).then(res => {
        this.setState({p : res.data})
        var x = this.state.p['team']['members']
        this.setState({team:x})
        console.log(this.state.team)
        this.state.p['team']['members'].map(t=>{ //chouf mlih


            var v = {
                project :a,
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
        project :a

    }
    var notef = 0
    var nb = 0
    const s =     axios.post("http://localhost:3000/users/stats",st).then(res => {

            this.setState({stats:res.data})
            console.log(this.state.stats)

            this.state.stats.map(e=>{
                nb = nb + 1
                notef = notef + e.note
                this.state.tab2.push(e.micro)
                this.state.tab3.push(e.note)

            })

        this.setState({notefinal:Number(notef/nb).toFixed(2)})
        this.setState({pourcent : Number(((notef/nb)*100)/20).toFixed(2)})

            console.log(this.state.notefinal)
        console.log(this.state.pourcent)


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
    compa(email,nom,prenom){
        this.setState({tab4:[],tab5:[],nomc:nom,prenomc:prenom,myself:false})
        const x = {
            email: email ,
            project :document.getElementById('project').value

        }
        var notefinal2 = 0
        var nb2 = 0

        const s =     axios.post("http://localhost:3000/users/stats",x).then(res => {

            this.setState({stats2:res.data})
            console.log(this.state.stats2)

            this.state.stats2.map(e=>{
                nb2 = nb2 + 1
                notefinal2 = notefinal2 + e.note
                this.state.tab4.push(e.micro)
                this.state.tab5.push(e.note)

            })
            console.log(notefinal2)
            console.log(nb2)
            this.setState({notefinal2:Number(notefinal2/nb2).toFixed(2)})
            this.setState({pourcent2 : Number(((notefinal2/nb2)*100)/20).toFixed(2)})

            const d2 = {
                //labels: ['Communication', 'Leadership', 'Effectiveness', 'LeaderShip','Professionalism','Managing Skills','Cognitive ability'],
                labels: this.state.tab4 && this.state.tab4,
                datasets: [
                    {
                        label: 'Your Evaluation ! ',
                        backgroundColor: '',
                        borderColor: 'rgba(179,181,198,1)',
                        pointBackgroundColor: 'rgb(0,128,0)',
                        pointBorderColor: 'rgb(0,128,0)',
                        pointHoverBackgroundColor: 'rgb(0,128,0)',
                        pointHoverBorderColor: 'rgb(0,128,0)',
                        data:this.state.tab3 && this.state.tab3
                        //  data: [12,20,10,8,18,16,19]
                    },
                    {
                        label: nom+' '+prenom+' Evaluation ! ',
                        backgroundColor: '',
                        borderColor: 'rgba(63, 108, 150)',
                        pointBackgroundColor: 'rgb(5, 5, 10)',
                        pointBorderColor: 'rgb(63, 108, 150)',
                        pointHoverBackgroundColor: 'rgb(63, 108, 150)',
                        pointHoverBorderColor: 'rgb(63, 108, 150)',
                        data:this.state.tab5 && this.state.tab5

                    }
                ]
            };
            this.setState({data2:d2})
            console.log(this.state.data2)
            this.setState({comparer:true})
    })
    }

    mySelfEval(){
        this.setState({tab4:[],tab5:[],nomc:'my',prenomc:'self evaluation',comparer:false,myself:true})
        const x = {
            email: jwt_decode(localStorage.token).user.email
        }
        var notefinal5 = 0
        var nb5 = 0

        const s =     axios.post("http://localhost:3000/users/statsSelfNote",x).then(res => {

            this.setState({stats:res.data})
            console.log(this.state.stats)

            this.state.stats.map(e=>{
                nb5 = nb5 + 1
                notefinal5 = notefinal5 + e.note

                this.state.tab4.push(e.micro)
                this.state.tab5.push(e.note)

            })
            this.setState({notefinal5:Number(notefinal5/nb5).toFixed(2)})
            this.setState({pourcent5 : Number(((notefinal5/nb5)*100)/20).toFixed(2)})
            console.log(this.state.tab4)
            console.log(this.state.tab5)

            const d2 = {
                labels: ['Communication', 'Leadership', 'Effectiveness', 'LeaderShip','Professionalism','Managing Skills','Cognitive ability'],

                datasets: [
                    {
                        label: 'Your peer Evaluation score ! ',
                        backgroundColor: '',
                        borderColor: 'rgba(179,181,198,1)',
                        pointBackgroundColor: 'rgb(0,128,0)',
                        pointBorderColor: 'rgb(0,128,0)',
                        pointHoverBackgroundColor: 'rgb(0,128,0)',
                        pointHoverBorderColor: 'rgb(0,128,0)',
                        data:this.state.tab3 && this.state.tab3
                        //  data: [12,20,10,8,18,16,19]
                    },
                    {
                        label: 'your self Evaluation score ! ',
                        backgroundColor: '',
                        borderColor: 'rgba(63, 108, 150)',
                        pointBackgroundColor: 'rgb(5, 5, 10)',
                        pointBorderColor: 'rgb(63, 108, 150)',
                        pointHoverBackgroundColor: 'rgb(63, 108, 150)',
                        pointHoverBorderColor: 'rgb(63, 108, 150)',
                        data:this.state.tab5 && this.state.tab5

                    }
                ]
            };
            this.setState({data2:d2})
            console.log(this.state.data2)
            this.setState({comparer:false})
        })
    }




    constructor(props){
        super(props)
        this.state = {team:'',tab:'',stats:'',tab2:[],tab3:[],data :{},project:'',p:'',test:'',show:false,v:[],stats2:'',tab4:[],tab5:[],data2:{},comparer:false,notefinal:'',pourcent:'',notefinal2:'',pourcent2:''};


    }

    render(){

        return (
            <>
                <NavbarProfile />
                <ProfilePageHeader />
                <div className="section profile-content">
                    <NavBarStudent/>
                    <Container>
                        <div className="owner">
                            <div className="avatar">
                                <img
                                    alt="..."
                                    className="img-circle img-no-padding img-responsive"
                                    src={require('assets/img/faces/peer.png')}
                                />
                            </div>
                            <div className="name">
                                <h4 className="btn btn-secondary btn-lg btn-block">
                               Welcome {jwt_decode(localStorage.token).user.nom.toUpperCase()} {jwt_decode(localStorage.token).user.prenom.toUpperCase()} to Peer Evaluation form
                                </h4>

                            </div>
                        </div>
                        <br/>
                        <Row>
                            <Col className="ml-auto mr-auto text-center" md="6">
                                <p >
                                    <button className="btn btn-outline-info btn-lg btn-block"> {jwt_decode(localStorage.token).user.university} Student </button>
                                    <br/>

                                    <Label for="exampleSelect" className="btn-outline-info">Select Project  !</Label>
                             <table>
                                 <tr>
                                        {this.state.project && this.state.project.map((team) =><td> <button id="project"
                                                                                                            data-toggle="button" aria-pressed="false" autocomplete="off"
                                                                                                            className="btn btn-outline-primary btn-lg btn-block"
                                                                                                        onClick={this.descrip.bind(this,team) }
                                                                                                        key={team}
                                                                                                        value={team}>{team}</button></td>)}



                                 </tr>
                             </table>
                                    { this.state.show === true && <Label className="btn btn-outline-info btn-lg btn-sm"> Description :{this.state.p && this.state.p['description']}</Label> }

                                </p>
                                <br />
                            </Col>
                        </Row>


                       <Media >
                                <Media>
                                </Media>
                                <Media body>
                                    <Media heading>
                        <Media>
                            <Media>

                            </Media>
                            <Media body>
                                <Media heading>
                                    {this.state.show === true &&

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
                                                                    className="car-subtitle">{this.state.team &&  member.nom + ' ' + member.prenom} </div>
                                                                {this.state.v.length && member.email !== jwt_decode(localStorage.token).user.email &&
                                                                this.state.v[index] === true ?
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


                        {this.state.show ===true &&
                        <center>
                            <div>
                                <Card style={{width: '50rem',height:'10', backgroundColor:'#66CDAA'   }}>
                                    <CardBody>
                                        <Radar  data={this.state.data}  />
                                        <Button color="danger" id="top2">
                                            Final Result !
                                        </Button>{` `}
                                        <UncontrolledTooltip placement="top" target="top2" delay={0}>
                                            <h3>Average :{this.state.notefinal}/20  <br/>  which equals {this.state.pourcent } %</h3>
                                        </UncontrolledTooltip>

                                    </CardBody>
                                </Card>


                            </div>  </center> }
                                    <Col className="ml-auto mr-auto text-center" md="6">
                                    {this.state.show === true &&
                                    <Label className="btn btn-success btn-lg btn-block">Compare your result !</Label>}
<table>
    <tr>

                                    {this.state.show === true &&

                                    <td><button     data-toggle="button" aria-pressed="false" autocomplete="off"
                                                    className="btn btn-outline-primary btn-lg btn-block" onClick={this.mySelfEval.bind(this)}>My Self Evaluation</button> </td>}
                                    {this.state.show === true &&
                                        this.state.p && this.state.p['team']['members'].map((member) =><td>  <button id="members"
                                                                                                                     data-toggle="button" aria-pressed="false" autocomplete="off"
                                                                                                                     className="btn btn-outline-primary btn-lg btn-block"
                                                                                                                 onClick={this.compa.bind(this,member.email,member.nom,member.prenom)}
                                                                                                        key={member._id}
                                                                                                        value={member.nom + ' ' +member.prenom}>
                                                {  member.nom + ' ' +member.prenom }

                                        </button></td>
                                        )}

    </tr>
</table>

                                    </Col>

                                    {this.state.comparer === true &&
                                    <center>
                                        <div>
                                            <Card style={{width: '50rem',height:'10'   }}>
                                                <CardBody>
                                                    <Radar  data={this.state.data2}  />
                                                    <Button color="danger" id="top7">
                                                        My Result !
                                                    </Button>{` `}
                                                    <UncontrolledTooltip placement="top" target="top7" delay={0}>
                                                        <h3>Average :{this.state.notefinal}/20  <br/>  which equals {this.state.pourcent } %</h3>
                                                    </UncontrolledTooltip>
                                                    <Button color="info" id="top">
                                                        {this.state.nomc} {this.state.prenomc} Result !
                                                    </Button>{` `}
                                                    <UncontrolledTooltip placement="top" target="top" delay={0}>
                                                        <h3>Average :{this.state.notefinal2}/20  <br/>  which equals {this.state.pourcent2 } %</h3>
                                                    </UncontrolledTooltip>
                                                </CardBody>
                                            </Card>


                                        </div>  </center> }
                                    {this.state.myself === true &&
                                    <center>
                                        <div>
                                            <Card style={{width: '50rem',height:'10'   }}>
                                                <CardBody>
                                                    <Radar  data={this.state.data2}  />
                                                    <Button color="danger" id="top8">
                                                        My Result !
                                                    </Button>{` `}
                                                    <UncontrolledTooltip placement="top" target="top8" delay={0}>
                                                        <h3>Average :{this.state.notefinal}/20  <br/>  which equals {this.state.pourcent } %</h3>
                                                    </UncontrolledTooltip>
                                                    <Button color="info" id="top">
                                                        {this.state.nomc} {this.state.prenomc} Result !
                                                    </Button>{` `}
                                                    <UncontrolledTooltip placement="top" target="top" delay={0}>
                                                        <h3>Average :{this.state.notefinal5}/20  <br/>  which equals {this.state.pourcent5 } %</h3>
                                                    </UncontrolledTooltip>
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
