

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
    Row, CardImg, CardText,
    CardTitle, CardSubtitle,
    Col, Card, CardBody,
    ListGroup, ListGroupItem, Table, Media, UncontrolledTooltip
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
import NavBarTeacher from "../../components/Navbars/NavBarTeacher";





class PeerTeacher extends  Component {
    componentDidUpdate() {

    }

    componentDidMount() {


        axios.get("http://localhost:3000/project/AllProject").then(res => {
            this.setState({project : res.data}

            )
        })

        axios.get("http://localhost:3000/users/allstudent").then(res => {
            this.setState({student : res.data}

            )
        })



    };

    findProject(a,b,c)
    {
        this.setState({comparerS1:false,comparerS2:false})
        const n ={ email:document.getElementById('student').value}
        this.setState({st:a,stt:b,sttt:c})
        axios.post("http://localhost:3000/users/projects",n).then(res => {
            this.setState({studentProject : res.data,showS:true})
            console.log(res.data)
            console.log('succes')
        });

    }

    descrip(a){

        this.setState({show:true,tab2:[],tab3:[],v:[],proj:'',comparer:false,comparer2:false})
        var T = []
        const n ={ nom:a}
        console.log(n.nom)
        test2: axios.post("http://localhost:3000/project/get",n).then(res => {
            this.setState({p : res.data,proj:n.nom})
            var x = this.state.p['team']['members']
            this.setState({team:x})
            console.log(this.state.team)


        })


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
    compaP(a)
    {
        this.setState({tabstudentm:[],tabstudentn:[],nomp:a})
        const x = {
            email: document.getElementById('student').value ,
            project : a

        }
        var notefinal2 = 0
        var nb2 = 0

        console.log(x)
        const s =   axios.post("http://localhost:3000/users/stats",x).then(res => {

        this.setState({stats3:res.data})
        console.log(this.state.stats3)

        this.state.stats3.map(e=>{
            nb2 = nb2 + 1
            notefinal2 = notefinal2 + e.note
            this.state.tabstudentm.push(e.micro)
            this.state.tabstudentn.push(e.note)

        })
            this.setState({notefinal2:Number(notefinal2/nb2).toFixed(2)})
            this.setState({pourcent2 : Number(((notefinal2/nb2)*100)/20).toFixed(2)})

        const d2 = {
            //labels: ['Communication', 'Leadership', 'Effectiveness', 'LeaderShip','Professionalism','Managing Skills','Cognitive ability'],
            labels: this.state.tabstudentm && this.state.tabstudentm,
            datasets: [
                {
                    label: a+' Evaluation ! ',
                    backgroundColor: 'rgb(0,255,0)',
                    borderColor: 'rgba(179,181,198,1)',
                    pointBackgroundColor: 'rgb(0,128,0)',
                    pointBorderColor: 'rgb(0,128,0)',
                    pointHoverBackgroundColor: 'rgb(0,128,0)',
                    pointHoverBorderColor: 'rgb(0,128,0)',
                    data:this.state.tabstudentn && this.state.tabstudentn
                    //  data: [12,20,10,8,18,16,19]
                }
            ]
        };
        this.setState({dataS:d2})
        console.log(this.state.dataS)
        this.setState({comparerS1:true,comparerS2:false})
    })

    }
    compa(email,nom,prenom){
        this.setState({tab4:[],tab5:[],a:nom,b:prenom})
        const x = {
            email: email ,
            project :document.getElementById('project').value

        }
        var notefinal4 = 0
        var nb4 = 0


        const s =     axios.post("http://localhost:3000/users/stats",x).then(res => {

            this.setState({stats2:res.data})
            console.log(this.state.stats2)

            this.state.stats2.map(e=>{

                nb4 = nb4 + 1
                notefinal4 = notefinal4 + e.note
                this.state.tab4.push(e.micro)
                this.state.tab5.push(e.note)

            })
            this.setState({notefinal4:Number(notefinal4/nb4).toFixed(2)})
            this.setState({pourcent4 : Number(((notefinal4/nb4)*100)/20).toFixed(2)})

            const d2 = {
                //labels: ['Communication', 'Leadership', 'Effectiveness', 'LeaderShip','Professionalism','Managing Skills','Cognitive ability'],
                labels: this.state.tab4 && this.state.tab4,
                datasets: [
                    {
                        label: nom+' '+prenom+' Evaluation ! ',
                        backgroundColor: 'rgb(0,255,0)',
                        borderColor: 'rgba(179,181,198,1)',
                        pointBackgroundColor: 'rgb(0,128,0)',
                        pointBorderColor: 'rgb(0,128,0)',
                        pointHoverBackgroundColor: 'rgb(0,128,0)',
                        pointHoverBorderColor: 'rgb(0,128,0)',
                        data:this.state.tab5 && this.state.tab5
                        //  data: [12,20,10,8,18,16,19]
                    }
                ]
            };
            this.setState({data2:d2})
            console.log(this.state.data2)
            this.setState({comparer:true,comparer2:false})
        })
    }
    comparP(a)
    {
        this.setState({tabSL:[],tabSN:[],nomp2:a})
        const x = {
            email: document.getElementById('student').value ,
            project :a

        }

        const np = {
            nomp : document.getElementById('proj1').value
        }
        var notefinal3 = 0
        var nb3 = 0
        const s =     axios.post("http://localhost:3000/users/stats",x).then(res => {

            this.setState({stats2:res.data})
            console.log(this.state.stats2)

            this.state.stats2.map(e=>{

                nb3 = nb3 + 1
                notefinal3 = notefinal3 + e.note
                this.state.tabSL.push(e.micro)
                this.state.tabSN.push(e.note)

            })
            this.setState({notefinal3:Number(notefinal3/nb3).toFixed(2)})
            this.setState({pourcent3 : Number(((notefinal3/nb3)*100)/20).toFixed(2)})

            const d2 = {
                //labels: ['Communication', 'Leadership', 'Effectiveness', 'LeaderShip','Professionalism','Managing Skills','Cognitive ability'],
                labels: this.state.tabSL && this.state.tabSL,
                datasets: [
                    {
                        label: np.nomp+' Evaluation !',
                        backgroundColor: '',
                        borderColor: 'rgba(179,181,198,1)',
                        pointBackgroundColor: 'rgb(0,128,0)',
                        pointBorderColor: 'rgb(0,128,0)',
                        pointHoverBackgroundColor: 'rgb(0,128,0)',
                        pointHoverBorderColor: 'rgb(0,128,0)',
                        data:this.state.tabstudentn && this.state.tabstudentn
                        //  data: [12,20,10,8,18,16,19]
                    },
                    {
                        label: a+' Evaluation ! ',
                        backgroundColor: '',
                        borderColor: 'rgba(63, 108, 150)',
                        pointBackgroundColor: 'rgb(5, 5, 10)',
                        pointBorderColor: 'rgb(63, 108, 150)',
                        pointHoverBackgroundColor: 'rgb(63, 108, 150)',
                        pointHoverBorderColor: 'rgb(63, 108, 150)',
                        data:this.state.tabSN && this.state.tabSN

                    }
                ]
            };
            this.setState({data4:d2})
            console.log(this.state.data4)
            this.setState({comparerS1:false,comparerS2:true})
        })



    }
    compar(email,nom,prenom)
    {
        this.setState({tabb:[],tabbb:[],a1:nom,b1:prenom})
        const x = {
            email: email ,
            project :document.getElementById('project').value

        }
        var notefinal5 = 0
        var nb5 = 0

        const s =     axios.post("http://localhost:3000/users/stats",x).then(res => {

            this.setState({stats2:res.data})
            console.log(this.state.stats2)

            this.state.stats2.map(e=>{
                nb5 = nb5 + 1
                notefinal5 = notefinal5 + e.note

                this.state.tabb.push(e.micro)
                this.state.tabbb.push(e.note)

            })
            this.setState({notefinal5:Number(notefinal5/nb5).toFixed(2)})
            this.setState({pourcent5 : Number(((notefinal5/nb5)*100)/20).toFixed(2)})

            const d2 = {
                //labels: ['Communication', 'Leadership', 'Effectiveness', 'LeaderShip','Professionalism','Managing Skills','Cognitive ability'],
                labels: this.state.tabb && this.state.tabb,
                datasets: [
                    {
                        label: this.state.a+' '+this.state.b+' Evaluation !',
                        backgroundColor: '',
                        borderColor: 'rgba(179,181,198,1)',
                        pointBackgroundColor: 'rgb(0,128,0)',
                        pointBorderColor: 'rgb(0,128,0)',
                        pointHoverBackgroundColor: 'rgb(0,128,0)',
                        pointHoverBorderColor: 'rgb(0,128,0)',
                        data:this.state.tab5 && this.state.tab5
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
                        data:this.state.tabbb && this.state.tabbb

                    }
                ]
            };
            this.setState({data3:d2})
            console.log(this.state.data3)
            this.setState({comparer:false,comparer2:true})
        })

    }






    constructor(props){
        super(props)
        this.state = {activeTab:"1",team:'',tab:'',stats:'',tab2:[],
            tab3:[],tabstudentm:[],tabstudentn:[],data :{},project:'',studentProject:'',
            student:'',p:'',test:'',show:false,v:[],stats2:'',tab4:[],tab5:[],data2:{},data3:{},dataS:{},comparerS1:false,comparerS2:false,data4:{},
            comparer:false,comparer2:false,a:'',b:'',showS:false,information:'',notefinal2:'',pourcent2:'',notefinal3:'',pourcent3:''};


    }

    render(){

        return (
            <>
                <NavbarProfile />
                <ProfilePageHeader />
                <div className="section profile-content">
                    <NavBarTeacher/>
                    <Container>
                        <div className="owner">

                            <div className="name">
                                <h4 className="title">
                                  Teacher Space<br />
                                </h4>
                                <h4 className="subtitle">
                                    you can see the evaluation and evolution  of students
                                </h4>

                            </div>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="nav-tabs-navigation">
                            <div className="nav-tabs-wrapper">
                        <Nav id="tabs" role="tablist" tabs>
                            <NavItem>
                                <NavLink
                                    className={this.state.activeTab === "1" ? "active" : ""}
                                    onClick={() => {this.toggle("1")}}>
                                    teammates evaluation
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={this.state.activeTab === "2 "? "active" : ""}
                                    onClick={() => {
                                        this.toggle("2");
                                    }}
                                >
                                     students evolution in different projects
                                </NavLink>
                            </NavItem>

                        </Nav>
                            </div>
                        </div>
                        <TabContent activeTab={this.state.activeTab} className="text-center">
                            <TabPane tabId="1">
                        <Row>

                            <Col className="ml-auto mr-auto text-center" md="6">
                                <p>
                                    <h2>Peer Evaluation Result</h2>
                                    <br/>
                                    <Label  className="btn-outline-info">Select Project  </Label>
                                    <table>

                                        <tr>

                                                {this.state.project && this.state.project.map((team) =><td> <button id="project"
                                                                                                                    data-toggle="button" aria-pressed="false" autocomplete="off"
                                                                                                                    className="btn btn-outline-primary btn-lg btn-block"
                                                                                                                onClick={this.descrip.bind(this,team.nom) }
                                                                                                                  key={team.nom}
                                                                                                                    value={team.nom}>{team.nom}</button></td>)}

                                        </tr>

                                    </table>

                                </p>

                            </Col>
                        </Row>
                        <br />

                        <Media >
                            <Media>
                            </Media>
                            <Media body>
                                <Media heading>
                                    {this.state.show === true &&
                                    <button  className="btn btn-success btn-lg btn-block" disabled>Selected : {this.state.proj} </button>}
                                    <Media>
                                        <Media>

                                        </Media>
                                        <Media body>
                                            <Media heading>



                                                <div className="container">
                                                    <div className="row justify-content-md-center">
                                                        <div className="col col-lg-2">
                                                            {this.state.show === true &&
                                                            <Input type="select" name="select" id="compare">

                                                                {this.state.p && this.state.p['team']['members'].map((member) =>  <option id="members"
                                                                                                                                          onClick={this.compa.bind(this,member.email,member.nom,member.prenom)}
                                                                                                                                          key={member._id}
                                                                                                                                          value={member.nom + ' ' +member.prenom}>
                                                                        { member.nom + ' ' +member.prenom }

                                                                    </option>
                                                                )}

                                                            </Input> }
                                                        </div>
                                                        <div className="col-md-auto">
                                                            {this.state.show &&   <p>  compare to : </p> }
                                                        </div>
                                                        <div className="col col-lg-2">
                                                            {this.state.show === true &&
                                                            <Input type="select" name="select" id="compare">

                                                                {this.state.p && this.state.p['team']['members'].map((member) =>  <option id="members"
                                                                                                                                          onClick={this.compar.bind(this,member.email,member.nom,member.prenom)}
                                                                                                                                          key={member._id}
                                                                                                                                          value={member.nom + ' ' +member.prenom}>
                                                                        { member.nom + ' ' +member.prenom }

                                                                    </option>
                                                                )}

                                                            </Input> }
                                                        </div>
                                                    </div>
                                                </div>



                                                {this.state.comparer === true &&
                                                <center>
                                                    <div>
                                                        <Card style={{width: '50rem',height:'10', backgroundColor:'#66CDAA'   }}>
                                                            <CardBody>
                                                                <Radar  data={this.state.data2}  />
                                                                <Button color="info" id="top1">
                                                                    {this.state.a} {this.state.b} Result !
                                                                </Button>{` `}
                                                                <UncontrolledTooltip placement="top" target="top1" delay={0}>
                                                                    <h3>Average :{this.state.notefinal4}/20  <br/>  which equals {this.state.pourcent4 } %</h3>
                                                                </UncontrolledTooltip>
                                                            </CardBody>
                                                        </Card>


                                                    </div>  </center> }
                                                {this.state.comparer2 === true &&
                                                <center>
                                                    <div>
                                                        <Card style={{width: '50rem',height:'10', backgroundColor:'#66CDAA'   }}>
                                                            <CardBody>
                                                                <Radar  data={this.state.data3}  />
                                                                <Button color="info" id="top3">
                                                                    {this.state.a} {this.state.b} Result !
                                                                </Button>{` `}
                                                                <UncontrolledTooltip placement="top" target="top3" delay={0}>
                                                                    <h3>Average :{this.state.notefinal4}/20  <br/>  which equals {this.state.pourcent4 } %</h3>
                                                                </UncontrolledTooltip>
                                                                <Button color="info" id="top4">
                                                                    {this.state.a1} {this.state.b1} Result !
                                                                </Button>{` `}
                                                                <UncontrolledTooltip placement="top" target="top4" delay={1}>
                                                                    <h3>Average :{this.state.notefinal5}/20  <br/>  which equals {this.state.pourcent5 } %</h3>
                                                                </UncontrolledTooltip>

                                                            </CardBody>
                                                        </Card>


                                                    </div>  </center> }






                                            </Media></Media></Media></Media></Media></Media>
                            </TabPane>
                            <TabPane tabId="2">
                                <row>

                                <Col className="ml-auto mr-auto text-center" md="6">
                                    <p>

                                        <h2>Peer Evaluation Result</h2>
                                        <br/>
                                            <Label className="btn-outline-info">Select student  </Label>
                                    <table>
                                        <tr>
                                            {this.state.student && this.state.student.map((team) =><td>  <button id="student"
                                                                                                                 data-toggle="button" aria-pressed="false" autocomplete="off"
                                                                                                                 className="btn btn-outline-primary btn-lg btn-block"
                                                                                                            onClick={this.findProject.bind(this,team.nom,team.prenom,team.university) }
                                                                                                            key={team.nom}
                                                                                                                 value={team.email}>{team.nom} {team.prenom} </button>
                                            </td>)}

                                        </tr>
                                    </table>
                                </p>
                                </Col>

                                    <Media >
                                        <Media>
                                        </Media>
                                        <Media body>
                                            <Media heading>

                                                {this.state.showS === true &&
                                                <button className="btn btn-success btn-lg btn-block">Selected student {this.state.st} {this.state.stt}  </button>
                                                }
                                                {this.state.showS === true &&
                                                <button className="btn btn-outline-info btn-lg btn-sm">university : {this.state.sttt} </button>
                                                }
                                                <Media>
                                                    <Media>

                                                    </Media>
                                                    <Media body>
                                                        <Media heading>
                                                            <div className="container">
                                                                <div className="row justify-content-md-center">
                                                                    <div className="col col-lg-2">
                                                                        {this.state.showS &&
                                                                        <Input type="select" name="select" id="proj1">

                                                                            {this.state.studentProject && this.state.studentProject.map((a) =>  <option id="sp"
                                                                                                                                                        onClick={this.compaP.bind(this,a)}
                                                                                                                                                        key={a._id}
                                                                                                                                                        value={a}>
                                                                                    { a  }

                                                                                </option>
                                                                            )}


                                                                        </Input> }
                                                                    </div>
                                                                    <div className="col-md-auto">
                                                                        {this.state.showS && <p>compare to :</p>}
                                                                    </div>
                                                                    <div className="col col-lg-2">
                                                                        {this.state.showS &&

                                                                        <Input type="select" name="select" id="">

                                                                            {this.state.studentProject && this.state.studentProject.map((a) =>  <option id="sp"
                                                                                                                                                        onClick={this.comparP.bind(this,a)}
                                                                                                                                                        key={a._id}
                                                                                                                                                        value={a}>
                                                                                    { a  }

                                                                                </option>
                                                                            )}


                                                                        </Input> }
                                                                    </div>
                                                                </div>
                                                            </div>




                                        {this.state.comparerS1 === true &&
                                        <center>
                                            <div>
                                                <Card style={{width: '50rem',height:'10', backgroundColor:'#66CDAA'   }}>
                                                    <CardBody>
                                                        <Radar  data={this.state.dataS}  />
                                                        <Button color="info" id="top">
                                                            {this.state.nomp} Result !
                                                        </Button>{` `}
                                                        <UncontrolledTooltip placement="top" target="top" delay={0}>
                                                            <h3>Average :{this.state.notefinal2}/20  <br/>  which equals {this.state.pourcent2 } %</h3>
                                                        </UncontrolledTooltip>

                                                    </CardBody>
                                                </Card>


                                            </div>  </center> }
                                    {this.state.comparerS2 === true &&
                                    <center>
                                        <div>
                                            <Card style={{width: '50rem',height:'10', backgroundColor:'#66CDAA'   }}>
                                                <CardBody>
                                                    <Radar  data={this.state.data4}  />
                                                    <Button color="info" id="top1">
                                                        {this.state.nomp}  Result !
                                                    </Button>{` `}
                                                    <UncontrolledTooltip placement="top" target="top1" delay={0}>
                                                        <h3>Average :{this.state.notefinal2}/20  <br/>  which equals {this.state.pourcent2 } %</h3>
                                                    </UncontrolledTooltip>
                                                    <Button color="info" id="top">
                                                        {this.state.nomp2}  Result !
                                                    </Button>{` `}
                                                    <UncontrolledTooltip placement="top" target="top" delay={1}>
                                                        <h3>Average :{this.state.notefinal3}/20  <br/>  which equals {this.state.pourcent3 } %</h3>
                                                    </UncontrolledTooltip>

                                                </CardBody>
                                            </Card>


                                        </div>  </center> }





                                   </Media></Media></Media></Media></Media></Media>
                                </row>


                            </TabPane>
                        </TabContent>
                    </Container>

                </div>

                <DemoFooter />
            </>
        );}
}

export default PeerTeacher;
