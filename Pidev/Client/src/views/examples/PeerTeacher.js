

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

    findProject(a,b)
    {
        this.setState({comparerS1:false,comparerS2:false})
        const n ={ email:document.getElementById('student').value}
        this.setState({st:a,stt:b})
        axios.post("http://localhost:3000/users/findS",n).then(res => {
            this.setState({information : res.data})
            console.log(res.data)
            console.log('succes')
        });
        axios.post("http://localhost:3000/users/projects",n).then(res => {
            this.setState({studentProject : res.data,showS:true})
            console.log(res.data)
            console.log('succes')
        });

    }

    descrip(){

        this.setState({show:true,tab2:[],tab3:[],v:[],proj:'',comparer:false,comparer2:false})
        var T = []
        const n ={ nom:document.getElementById('project').value}
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
        this.setState({tabstudentm:[],tabstudentn:[]})
        const x = {
            email: document.getElementById('student').value ,
            project : a

        }
        console.log(x)
        const s =   axios.post("http://localhost:3000/users/stats",x).then(res => {

        this.setState({stats3:res.data})
        console.log(this.state.stats3)

        this.state.stats3.map(e=>{


            this.state.tabstudentm.push(e.micro)
            this.state.tabstudentn.push(e.note)

        })

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

        const s =     axios.post("http://localhost:3000/users/stats",x).then(res => {

            this.setState({stats2:res.data})
            console.log(this.state.stats2)

            this.state.stats2.map(e=>{


                this.state.tab4.push(e.micro)
                this.state.tab5.push(e.note)

            })

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
        this.setState({tabSL:[],tabSN:[]})
        const x = {
            email: document.getElementById('student').value ,
            project :a

        }
        const np = {
            nomp : document.getElementById('proj1').value
        }
        const s =     axios.post("http://localhost:3000/users/stats",x).then(res => {

            this.setState({stats2:res.data})
            console.log(this.state.stats2)

            this.state.stats2.map(e=>{


                this.state.tabSL.push(e.micro)
                this.state.tabSN.push(e.note)

            })

            const d2 = {
                //labels: ['Communication', 'Leadership', 'Effectiveness', 'LeaderShip','Professionalism','Managing Skills','Cognitive ability'],
                labels: this.state.tabSL && this.state.tabSL,
                datasets: [
                    {
                        label: np.nomp+' Evaluation !',
                        backgroundColor: 'rgb(0,255,0)',
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
                        backgroundColor: 'rgb(63, 108, 150)',
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
        this.setState({tabb:[],tabbb:[]})
        const x = {
            email: email ,
            project :document.getElementById('project').value

        }

        const s =     axios.post("http://localhost:3000/users/stats",x).then(res => {

            this.setState({stats2:res.data})
            console.log(this.state.stats2)

            this.state.stats2.map(e=>{


                this.state.tabb.push(e.micro)
                this.state.tabbb.push(e.note)

            })

            const d2 = {
                //labels: ['Communication', 'Leadership', 'Effectiveness', 'LeaderShip','Professionalism','Managing Skills','Cognitive ability'],
                labels: this.state.tabb && this.state.tabb,
                datasets: [
                    {
                        label: this.state.a+' '+this.state.b+' Evaluation !',
                        backgroundColor: 'rgb(0,255,0)',
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
                        backgroundColor: 'rgb(63, 108, 150)',
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
            comparer:false,comparer2:false,a:'',b:'',showS:false,information:''};


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
                                    <Label for="exampleSelect">Select Project  !</Label>
                                    <Input type="select" name="select" id="project">
                                        {this.state.project && this.state.project.map((team) => <option id="project"
                                                                                                        onClick={this.descrip.bind(this) }
                                                                                                        key={team.nom}
                                                                                                        value={team.nom}>{team.nom}</option>)}
                                    </Input>
                                      <div className="card">
                                          {this.state.show && <div className="card-title">Description project</div>}
                                          <div className="card-subtitle">
                                    { this.state.show === true && <h4  for="exampleSelect"> {this.state.p && this.state.p['description']}</h4> }
                                          </div>
                                      </div>
                                </p>

                            </Col>
                        </Row>
                        <br />

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
                                                <Label for="exampleSelect">Compare result different students in : {this.state.proj} !</Label>}
                                                <table>
                                                    <tr> <td>
                                                {this.state.show === true &&
                                                <Input type="select" name="select" id="compare">

                                                    {this.state.p && this.state.p['team']['members'].map((member) =>  <option id="members"
                                                                                                                              onClick={this.compa.bind(this,member.email,member.nom,member.prenom)}
                                                                                                                              key={member._id}
                                                                                                                              value={member.nom + ' ' +member.prenom}>
                                                            { member.nom + ' ' +member.prenom }

                                                        </option>
                                                    )}

                                                </Input> } </td> <td>      </td> <td>
                                                {this.state.show === true &&
                                                <Input type="select" name="select" id="compare">

                                                    {this.state.p && this.state.p['team']['members'].map((member) =>  <option id="members"
                                                                                                                              onClick={this.compar.bind(this,member.email,member.nom,member.prenom)}
                                                                                                                              key={member._id}
                                                                                                                              value={member.nom + ' ' +member.prenom}>
                                                            { member.nom + ' ' +member.prenom }

                                                        </option>
                                                    )}

                                                </Input> } </td></tr></table>

                                                {this.state.comparer === true &&
                                                <center>
                                                    <div>
                                                        <Card style={{width: '50rem',height:'10', backgroundColor:'#66CDAA'   }}>
                                                            <CardBody>
                                                                <Radar  data={this.state.data2}  />

                                                            </CardBody>
                                                        </Card>


                                                    </div>  </center> }
                                                {this.state.comparer2 === true &&
                                                <center>
                                                    <div>
                                                        <Card style={{width: '50rem',height:'10', backgroundColor:'#66CDAA'   }}>
                                                            <CardBody>
                                                                <Radar  data={this.state.data3}  />

                                                            </CardBody>
                                                        </Card>


                                                    </div>  </center> }






                                            </Media></Media></Media></Media></Media></Media>
                            </TabPane>
                            <TabPane tabId="2">

                                <Col className="ml-auto mr-auto text-center" md="6">

                                        <h2>Peer Evaluation Result</h2>
                                        <br/>
                                            <Label for="exampleSelect">Select student  !</Label>
                                        <Input type="select" name="select" id="student">
                                            {this.state.student && this.state.student.map((team) => <option id="student"
                                                                                                            onClick={this.findProject.bind(this,team.nom,team.prenom) }
                                                                                                            key={team.nom}
                                                                                                            value={team.email}>{team.nom} {team.prenom}</option>)}
                                        </Input>

                                    <div className="card">
                                        {this.state.information &&
                                        <div className="card-title">Info Student </div> }
                                        <div className="card-subtitle">

                                    {this.state.information && <h4>Student in : {this.state.information.university}</h4>

                                    }
                                    </div>
                                    </div>
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
                                    {this.state.showS === true &&
                                    <label for="exampleSelect">Compare result Student {this.state.st} {this.state.stt}  in different project !</label>}
                                    <table><tr><td>
                                    {this.state.showS &&
                                        <Input type="select" name="select" id="proj1">

                                            {this.state.studentProject && this.state.studentProject.map((a) =>  <option id="sp"
                                                                                                                        onClick={this.compaP.bind(this,a)}
                                                                                                                      key={a._id}
                                                                                                                      value={a}>
                                                    { a  }

                                                </option>
                                            )}


                                        </Input> }</td><td>
                                    {this.state.showS &&
                                        
                                    <Input type="select" name="select" id="">

                                        {this.state.studentProject && this.state.studentProject.map((a) =>  <option id="sp"
                                                                                                                    onClick={this.comparP.bind(this,a)}
                                                                                                                    key={a._id}
                                                                                                                    value={a}>
                                                { a  }

                                            </option>
                                        )}


                                    </Input> } </td></tr></table>
                                        {this.state.comparerS1 === true &&
                                        <center>
                                            <div>
                                                <Card style={{width: '50rem',height:'10', backgroundColor:'#66CDAA'   }}>
                                                    <CardBody>
                                                        <Radar  data={this.state.dataS}  />

                                                    </CardBody>
                                                </Card>


                                            </div>  </center> }
                                    {this.state.comparerS2 === true &&
                                    <center>
                                        <div>
                                            <Card style={{width: '50rem',height:'10', backgroundColor:'#66CDAA'   }}>
                                                <CardBody>
                                                    <Radar  data={this.state.data4}  />

                                                </CardBody>
                                            </Card>


                                        </div>  </center> }





                                   </Media></Media></Media></Media></Media></Media>
                                </Col>


                            </TabPane>
                        </TabContent>
                    </Container>

                </div>

                <DemoFooter />
            </>
        );}
}

export default PeerTeacher;
