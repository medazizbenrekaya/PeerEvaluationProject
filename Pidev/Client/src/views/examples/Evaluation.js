

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

        const TEST = this.props.location.YO





        this.setState({TEST: TEST})



    };



    constructor(props){
        super(props)

        this.state = {team:'',tab:'',TEST:'',tab2:'',show:false,teamname:'',show1:false,nom:'',nom2:'',val:'',success:''};
        this.input = React.createRef()

        this.state = {team:'',tab:'',TEST:'',tab2:'',show:false,teamname:'',show1:false,nom:'',nom2:''};


    }
    note2(k,p,x){
        this.setState({val:this.input.current.value})
        console.log(this.state.value)
        const n ={
            project:this.props.location.X['nom'],
            email:this.state.TEST['email'],
            voteur:jwt_decode(localStorage.token).user._id,

            nom:k,
            note:this.state.val,
            M:p

            nom:this.state.nom,
            note:document.getElementById('n').value,
            M:this.state.nom2

        }
        console.log(n)
        axios.post("http://localhost:3000/users/note",n).then(res => {

            console.log("succes")
            alert("vous avez noter votre camarade")




        });

    }

    note(e, nom, nomteam, _id){
        const n ={
            project:this.props.location.X['nom'],
            email:this.state.TEST['email'], voteur:jwt_decode(localStorage.token).user._id, nom:nom, note:e, M:nomteam}
            console.log(n)
        axios.post("http://localhost:3000/users/note",n).then(res => {
            this.setState({success: _id})
            setTimeout(() =>{
                this.setState({
                    success: ''
                })
            },2000)
        });


        alert("You just evaluated your mate in" +' ' +'Macro :  ' +this.state.nom2)


    }


    find(a){

        const members =     axios.post("http://localhost:3000/ms/find/"+a).then(res => {


            this.setState({tab2:res.data,show1:true})

                this.setState({tab2:res.data,show1:true})



            console.log("succes")



        });
    }
    show(b,a){

        this.setState({show:true,nom:b,nom2:a})
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

                                    {this.state.TEST && this.state.TEST['microskills'].map((team) => <table key={team.nom} className="table" border="3">
                                            <thead className="table table-info">
                                            <th>macro skills</th>
                                            <th>micro skills</th>
                                            </thead>
                                            <tbody className="table table-active">
                                            <tr><td rowSpan="6"><option id="exampleSelect1">{team.nom}</option></td></tr>
                                            {team.macroskills.map((t,index) => <tr border="2"  key={t.nom}><option id="exempleselected" onClick={this.show.bind(this,t.nom,team.nom)}> {t.nom}</option>
                                                <select id="n"  ref={this.input} className="select"  onChange={(e) => {
                                                        this.note(e.target.value, t.nom ,team.nom, t._id)
                                                   ;}}>
                                                    <option >Note !</option>
                                                    <option className="red" >1</option>
                                                    <option className="orange">2</option>
                                                    <option className="jaune">3</option>
                                                    <option className="blue">4</option>
                                                    <option className="vert">5</option></select>
                                                { this.state.success === t._id && < label className="label label-success mr-1">Note Added !</label>  }
                                            </tr>  )

                                            }
                                            <tr>



                                            </tr>


                                            </tbody>

                                        </table>
                                    )}





                                    {this.state.show? <h3 >Evaluate  {this.state.nom} of {this.state.nom2} :<select id="n"  className="select" ><option className="red" >1</option><option className="orange">2</option><option className="jaune">3</option><option className="blue">4</option><option className="vert">5</option></select></h3> :null}


                                </FormGroup>


                                <Button >Valider !</Button>


                                            {this.state.TEST && this.state.TEST['microskills'].map((team) => <table key={team.nom} className="table" border="3">
                                                <thead className="table table-info">
                                                <th>macro skills</th>
                                                <th>micro skills</th>

                                                </thead>
                                            <tbody className="table table-active">

                                            <tr>
                                                <td rowSpan="6"><option id="exampleSelect1">{team.nom}</option></td>
                                            </tr>



                                            {team.macroskills.map((t) => <tr border="2"  key={t.nom}><option id="exempleselected" onClick={this.show.bind(this,t.nom,team.nom)}> {t.nom}</option></tr>  )}
                                            <tr>


                                            </tr>


                                            </tbody>

                                                </table>
                                            )}





                                    {this.state.show? <h3 >Evaluate  {this.state.nom} of {this.state.nom2} :<select id="n"  className="select" ><option className="red" >1</option><option className="orange">2</option><option className="jaune">3</option><option className="blue">4</option><option className="vert">5</option></select></h3> :null}


                                </FormGroup>

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
