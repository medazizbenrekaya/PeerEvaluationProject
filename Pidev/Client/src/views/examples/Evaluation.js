

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
    Col,Form,FormText,
    ListGroup, ListGroupItem,Table
} from "reactstrap";


// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import NavbarProfile from "../../components/Navbars/NavbarProfile";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import jwt_decode from "jwt-decode";
import axios from "axios";
import  "../../assets/css/colors.css";





class Evaluation extends  Component {
    componentDidMount() {
        const t = {
            email: jwt_decode(localStorage.token).user.email }
        test: axios.post("http://localhost:3000/users/TeamName",t).then(res => {
            this.setState({team : res.data})
        })
        const members =     axios.post("http://localhost:3000/users/TeamMembers",t).then(res => {

            this.setState({tab:res.data})



        });
        const TEST = this.props.location.YO
        const TEST2 = this.props.location.X['nom']
        this.setState({teamname:this.props.location.X['nom']})
        console.log(this.state.teamname)
   console.log(TEST)

        this.setState({TEST: TEST})
        console.log(this.state.TEST)

    };



    constructor(props){
        super(props)
        this.state = {team:'',tab:'',TEST:'',tab2:'',show:false,teamname:''};

    }
    note(){
        const n ={
            project:this.props.location.X['nom'],
            email:this.state.TEST['email'],voteur:jwt_decode(localStorage.token).user._id,
            nom:document.getElementById('exampleSelect2').value,
            note:document.getElementById('n').value,
            M:document.getElementById('exampleSelect1').value
        }
        axios.post("http://localhost:3000/users/note",n).then(res => {

            console.log("succes")



        });

    }


    find(){
        const t = {
            nom:document.getElementById('exampleSelect1').value
        }
        console.log(t)
        const members =     axios.post("http://localhost:3000/ms/find",t).then(res => {

                this.setState({tab2:res.data})
            console.log(t)

            console.log("succes")



            });
    }
    show(){
        this.setState({show:true})
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
                                    You will evaluate {this.state.TEST && this.state.TEST['nom'] + ' '+ this.state.TEST['prenom']} <br />
                                </h4>
                                <h6 className="description">{jwt_decode(localStorage.token).user.role}</h6>
                            </div>
                        </div>
                        <Row>
                            <Col className="ml-auto mr-auto text-center" md="6">
                                <p>
                                    Evaluation Feature !


                                </p>
                                <br />



                            </Col>
                        </Row>
                        <br />
                        <div>
                            <Form>
                                <FormGroup>
                                    <Label for="exampleEmail">Evaluator : {jwt_decode(localStorage.token).user.nom }  {jwt_decode(localStorage.token).user.prenom}</Label>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleSelect">Select Macro !</Label>
                                    <Input type="select" name="select" id="exampleSelect1">
                                        {this.state.TEST && this.state.TEST['microskills'].map((team) =><optgroup key={team.nom} label={team.type}><option onClick={this.find.bind(this)}   key={team.nom} value={team.nom}  >{team.nom}</option> </optgroup> )}
                                    </Input>

                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleSelect">Select Micro !</Label>
                                    <Input type="select" name="select" id="exampleSelect2" >
                                        {this.state.tab2 && this.state.tab2.map((team) => <option onClick={this.show.bind(this)} key={team.nom} value={team.nom}  >{team.nom}</option>)}

                                    </Input>
                                </FormGroup>
                                {this.state.show? <Label for="exampleSelect2">Notez :<select id="n" className="select" ><option className="red">1</option><option className="orange">2</option><option className="jaune">3</option><option className="blue">4</option><option className="vert">5</option></select></Label> :null} <br/>


                                <Button onClick={this.note.bind(this)}>Noter!</Button>
                            </Form>
                        </div>


                        {/* Tab panes */}

                    </Container>
                </div>

                <DemoFooter />
            </>
        );}
}

export default Evaluation;
