
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
    ListGroup,
    ListGroupItem, Alert, Card


} from "reactstrap";


import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import NavbarProfile from "../../components/Navbars/NavbarProfile";
import NavBarTeacher from "../../components/Navbars/NavBarTeacher";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import jwt_decode from "jwt-decode";
import axios from "axios";



class MacroSkillsPage extends  Component {
    constructor(props){
        super(props)
        this.state = {m: [],x:[],ms:'',
            activeTab:"1",tab1:'',show2:false,tab2:'',show:false,show1:false,show5:false,
            visible1: false,
            visible2: false,
            visible3: false,
            visible4: false,
            nommacr:'',descmacr:'',nom:'',desc:'',allproj:[],allms:[]

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

    componentDidMount() {
        axios.get("http://localhost:3000/ms/Afficher").then(res => {
            this.setState({tab1:res.data})
            console.log('succes')

        });

        axios.get('http://localhost:3000/project').then(res =>{
            this.setState({allproj:res.data})

        })

        axios.get('http://localhost:3000/ms').then(res =>{
            this.setState({allms:res.data})

        })
    }

    toggle  (tab) {
      if(this.state.activeTab!==tab){
          this.setState({activeTab:tab})

      }

        //this.state.activeTab=tab
}

    affect(){
        const t = {
            name:document.getElementById('affectproj').value,
            mic:document.getElementById('affectms').value
        }
        console.log(t)
        axios.post("http://localhost:3000/project/affecter",t).then(res => {
            console.log('succes')
        });
        alert('Done !')
     }


    addmacro(){
        const bod2 = {
            nom: document.getElementById('nommacro').value,
            description:document.getElementById('descmacro').value
        };
        this.state.nommacr=bod2.nom
        this.state.descmacr=bod2.description
        if (this.state.nommacr.length === 0) {
            this.setState({visible3:true})
        }
        else if(this.state.descmacr.length === 0){
            this.setState({visible4:true})
        }
        else {
        this.state.m.push(bod2)
        console.log(this.state.m)
        let x = document.getElementById('nommacro').value
        this.setState({ms : this.state.ms +  x +'  |  ',show5:true })
        document.getElementById('nommacro').value = ''
        document.getElementById('descmacro').value = ''
        }
        }


    Ajouter() {


        const bod = {
            nom: document.getElementById('nom').value,
            description:document.getElementById('desc').value,
            type:document.getElementById('type').value,
            macroskills: this.state.m
        };
        this.state.nom=bod.nom
        this.state.desc=bod.description
        if (this.state.nom.length === 0) {
            this.setState({visible1:true})
        }
        else if(this.state.desc.length === 0){
            this.setState({visible2:true})
        }
        else {
        const a = {
            emailUser: jwt_decode(localStorage.token).user.email,
            roleUser: jwt_decode(localStorage.token).user.role,
            type: "Macro skill",
            Text : jwt_decode(localStorage.token).user.role+" "+jwt_decode(localStorage.token).user.nom+" "+jwt_decode(localStorage.token).user.prenom+" added a macro skill named : "+bod.nom
        }
        console.log(a.Text)
        axios.post("http://localhost:3000/users/ajouterHistorique",a).then(res => {
            console.log(res.data)
            console.log('succes')


        });


        axios.post("http://localhost:3000/ms/ajouterMS", bod).then(res => {

            window.location.reload()
            console.log('succes')
            window.location.reload(false);



        });
        }

    }


    filter()
    {
        const t = {
            type:document.getElementById('select').value
        }
        console.log(t.role)
        axios.post("http://localhost:3000/ms/type", t ).then(res => {
            this.setState({tab1:res.data})

            console.log(res.data)
        });
    }
    delete(a)
    {

        console.log(a)


        axios.get("http://localhost:3000/ms/delete/"+a ).then(res => {
            window.location.reload()
            console.log("succes")
        });

        const b = {
            emailUser: jwt_decode(localStorage.token).user.email,
            roleUser: jwt_decode(localStorage.token).user.role,
            type: "Macro skill",
            Text : jwt_decode(localStorage.token).user.role+" "+jwt_decode(localStorage.token).user.nom+" "+jwt_decode(localStorage.token).user.prenom+" deleted a macro skill  "
        }
        console.log(a.Text)
        axios.post("http://localhost:3000/users/ajouterHistorique",b).then(res => {
            console.log(res.data)
            console.log('succes')


        });
    }
    find()
    {
        const t =
            {
                nom:document.getElementById('text').value
            }
        axios.post("http://localhost:3000/ms/nom", t ).then(res => {
            this.setState({tab1:res.data})

            console.log(res.data)
        });
    }
    showMacro(nom)
    {
        this.setState({show:true,nomMacro:nom})
        axios.post("http://localhost:3000/ms/find/"+nom).then(res => {
            this.setState({tab2:res.data,tab1:''})
            console.log('succes')

        });
    }
    back()
    {
        this.setState({show:false})
        axios.get("http://localhost:3000/ms/Afficher").then(res => {
            this.setState({tab1:res.data})
            console.log('succes')

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
                            <div className="avatar">
                                <img
                                    alt="..."
                                    className="img-circle img-no-padding img-responsive"
                                    src={require('assets/img/faces/skillss.jpg')}
                                    height={150}
                                />
                            </div>
                            <div className="name">
                                <h4 className="btn btn-secondary btn-lg btn-block">
                                  Macro Skills Management Space
                                </h4>

                            </div>
                        </div>
                        <br />
                        <br />


                                            <div className="nav-tabs-navigation">
                                                <div className="nav-tabs-wrapper">
                                                    <Nav id="tabs" role="tablist" tabs>
                                                        <NavItem>
                                                            <NavLink
                                                                className={this.state.activeTab === "1" ? "active" : ""}
                                                                onClick={() => {this.toggle("1")}}>
                                                                <strong> Add MacroSkills</strong>
                                                            </NavLink>
                                                        </NavItem>
                                                        <NavItem>
                                                            <NavLink
                                                                className={this.state.activeTab === "2" ? "active" : ""}
                                                                onClick={() => {
                                                                    this.toggle("2");
                                                                }}
                                                            >
                                                                <strong>See MacroSkills</strong>
                                                            </NavLink>
                                                        </NavItem>
                                                        <NavItem>
                                                            <NavLink
                                                                className={this.state.activeTab === "3" ? "active" : ""}
                                                                onClick={() => {this.toggle("3")}}
                                                            >
                                                                <strong>Affect MacroSkills</strong>
                                                            </NavLink>
                                                        </NavItem>
                                                    </Nav>
                                                </div>
                                            </div>
                                            <TabContent activeTab={this.state.activeTab} className="text-center">
                                                <TabPane tabId="1">
                                                    <div>
                                                        <div className="container" />
                                                        <Container>
                                                            <div className="bg-light border border-primary">
                                                            <Row>
                                                                <Col className="ml-auto mr-auto" md="8">
                                                                    <h1><strong>Add Macro Skill</strong></h1>
                                                                    <Form className="contact-form">
                                                                        <Row>
                                                                            <Col md="6">
                                                                                <label>Name</label>
                                                                                <Input placeholder="Name" type="text" id="nom" />
                                                                                <Alert color="danger" isOpen={this.state.visible1} toggle={this.onDismiss1.bind(this)}>
                                                                                    <b>C'est un champ obilgatoire</b>
                                                                                </Alert>
                                                                            </Col>

                                                                        </Row>


                                                                        <label>Description</label>
                                                                        <Input
                                                                            rows="4"
                                                                            placeholder="Description" type="textarea" id="desc"
                                                                        />
                                                                        <Alert color="danger" isOpen={this.state.visible2} toggle={this.onDismiss2.bind(this)}>
                                                                            <b>C'est un champ obilgatoire</b>
                                                                        </Alert>
                                                                        <br/>

                                                                        <Row>


                                                                            <select name="type" id="type" className="custom-select" >

                                                                                <option>Hard Skills</option>
                                                                                <option>Soft Skills</option>
                                                                            </select>

                                                                        </Row>
                                                                        <br/>

                                                                        <Row>

                                                                            <Container>
                                                                                <div className="bg-light border border-secondary">
                                                                                <Row>
                                                                                    <Col className="ml-auto mr-auto" md="8">
                                                                                        <h3 className="text-center"><strong>Add MicroSkill for This MacroSkill</strong></h3>
                                                                                        <Form className="contact-form">
                                                                                            <Row>
                                                                                                <Col md="6">
                                                                                                    <label>Name of MacroSkill  :</label>
                                                                                                    <Input placeholder="Name of macroSkill..." type="text" id="nommacro" />
                                                                                                    <Alert color="danger" isOpen={this.state.visible3} toggle={this.onDismiss3.bind(this)}>
                                                                                                        <b>C'est un champ obilgatoire</b>
                                                                                                    </Alert>
                                                                                                </Col>
                                                                                            </Row>
                                                                                            <label>Description of MacroSkill   :</label>
                                                                                            <Input
                                                                                                rows="4"
                                                                                                placeholder="Description of MacroSkill..." type="textarea" id="descmacro"/>
                                                                                            <Alert color="danger" isOpen={this.state.visible4} toggle={this.onDismiss4.bind(this)}>
                                                                                                <b>C'est un champ obilgatoire</b>
                                                                                            </Alert>
                                                                                            <Row>
                                                                                                <Col className="ml-auto mr-auto" md="4">
                                                                                                    <Button className="mr-1 btn btn-outline-danger btn-sm" color="orange" size="lg"
                                                                                                            onClick={this.addmacro.bind(this)}>
                                                                                                        ADD Micro
                                                                                                    </Button>
                                                                                                </Col>
                                                                                            </Row>
                                                                                            <br/>
                                                                                            {this.state.show5 &&
                                                                                            <Row>
                                                                                                <label> microskill already
                                                                                                    added :</label>
                                                                                                <ListGroup>
                                                                                                    <ListGroupItem
                                                                                                        className="btn-outline-primary">{this.state.ms}</ListGroupItem>
                                                                                                </ListGroup>

                                                                                            </Row>
                                                                                            }
                                                                                        </Form>
                                                                                    </Col>
                                                                                </Row>
                                                                                </div>
                                                                            </Container>
                                                                        </Row>
                                                                        <Row>
                                                                            <Col className="ml-auto mr-auto" md="4">
                                                                                <Button className="btn-success"  size="lg" onClick={this.Ajouter.bind(this)}>
                                                                                    ADD Macro
                                                                                </Button>
                                                                            </Col>
                                                                        </Row>
                                                                    </Form>
                                                                </Col>
                                                            </Row></div>
                                                        </Container>
                                                    </div>
                                                </TabPane>
                                                <TabPane tabId="2">
                                                    <Col className="ml-auto mr-auto" md="8">

                                                        <h1><strong>Macro Skills Table</strong></h1>
                                                        <br/>
                                                        <center> <table>
                                                            <tr>
                                                                <td>Filter
                                                                </td>
                                                                <td>
                                                                    <Input type="select" id="select" >
                                                                        <option onClick={this.componentDidMount.bind(this)}>
                                                                            All Macro Skills
                                                                        </option>
                                                                        <option value="Hard Skills" onClick={this.filter.bind(this)}>
                                                                            Hard Skills
                                                                        </option>
                                                                        <option value="Soft Skills" onClick={this.filter.bind(this)}>
                                                                            Soft Skills
                                                                        </option>
                                                                    </Input >
                                                                </td>
                                                            </tr>
                                                        </table></center>
                                                       <br/>

                                                        <table className="table-responsive-md">
                                                            <tr>
                                                                <td> <Input type="text" id="text" placeholder="macro or micro skill name" onChange={this.find.bind(this)}  /></td>

                                                            </tr>

                                                        </table>
                                                        <div className="table-responsive">

                                                            <table className="table">
                                                                <thead className="table table-info">
                                                                <tr>
                                                                    <th>Name</th>
                                                                    <th>Type</th>
                                                                    <th>Nombre Micro Skills</th>
                                                                    <th>Actions</th>
                                                                </tr>
                                                                </thead>
                                                                {this.state.tab1   && this.state.tab1.map((team) =>  <tbody className="table table-active" key={team._id}  >

                                                                    <tr>
                                                                        <td>{team.nom}

                                                                        </td>
                                                                        <td>{team.type}</td>

                                                                        <td>{team.macroskills.length}</td>
                                                                        <td><button className="btn-info" onClick={this.showMacro.bind(this,team.nom)} >Details</button>

                                                                            <button className="btn-danger" onClick={this.delete.bind(this , team._id)} >Delete</button>
                                                                        </td>
                                                                    </tr>
                                                                    </tbody>
                                                                )}

                                                            </table>
                                                            {this.state.show?
                                                                <table className="table">
                                                                    <thead className="table table-info">
                                                                    <tr>
                                                                        <td className="name">Micro Skills of {this.state.nomMacro}</td>
                                                                    </tr>
                                                                    </thead>
                                                                    {this.state.tab2 && this.state.tab2.map((detail) => <tbody className="table table-active"  key={detail.nom} >


                                                                        <tr>
                                                                            <td >{detail.nom}</td>
                                                                        </tr>


                                                                        </tbody>

                                                                    )}
                                                                    <tr><td colSpan="1">   <button className="btn btn-link" onClick={this.back.bind(this)}>Back</button></td></tr>
                                                                </table> :null}
                                                        </div></Col>

                                                </TabPane>
                                                <TabPane tabId="3">
                                                    <button className="btn btn-success btn-lg btn-block">In Order to affect, you need to select both the team and the macro</button>
                                                    <br/>
                                                    <br/>
                                                    <div className="row">
                                                        <div className="col">
                                                    <div className="container">

                                                        <div className="row justify-content-md-center">

                                                        <button  className="btn  btn-lg btn-block" disabled>Select Macro: </button>



                                                                <Input type="select" name="select" id="affectms">

                                                                    {this.state.allms && this.state.allms.map((ms) =>  <option id="members"

                                                                                                                                              key={ms.nom}
                                                                                                                                              value={ms.nom}>
                                                                            { ms.nom}

                                                                        </option>
                                                                    )}

                                                                </Input>






                                                        </div>

                                                        <br/>
                                                    </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="container">
                                                                <div className="row justify-content-md-center">
                                                                    <button  className="btn  btn-lg btn-block" disabled>Select Team: </button>

                                                                        <Input type="select" name="select" id="affectproj">
                                                                            {this.state.allproj && this.state.allproj.map((member) =>  <option id="members"
                                                                                                                                                      key={member.nom}
                                                                                                                                                      value={member.nom}>
                                                                                    { member.nom}

                                                                                </option>
                                                                            )}

                                                                        </Input>
                                                                <br/>


                                                                </div>

                                                                <br/>
                                                            </div>
                                                        </div>

                                                    </div>
                                                <br/>
                                                <br/>
                                                <center>
                                                    <div className="col col-lg-2">
                                                        <Button className="btn-round" color="primary" outline onClick={this.affect.bind(this)}>
                                                            Click to confirm!

                                                        </Button>

                                                    </div> </center>


                                                </TabPane>
                                            </TabContent>




                                </Container>
                            </div>




                <DemoFooter/>
            </>
        );
    }
}

export default MacroSkillsPage;
