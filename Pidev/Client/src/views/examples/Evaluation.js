

import React,{Component} from "react";

// reactstrap components
import {
    Button,
    Label,
    FormGroup,
    Container,
    Row,
    Col,Form,
} from "reactstrap";


// core components

import NavbarProfile from "../../components/Navbars/NavbarProfile";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import jwt_decode from "jwt-decode";
import axios from "axios";
import  "../../assets/css/colors.css";
import NavBarStudent from "../../components/Navbars/NavBarStudent";







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
    // note2(k,p,x){
    //     this.setState({val:this.input.current.value})
    //     console.log(this.state.value)
    //     const n ={
    //         project:this.props.location.X['nom'],
    //         email:this.state.TEST['email'],
    //         voteur:jwt_decode(localStorage.token).user._id,
    //
    //         nom:k,
    //         note:this.state.val,
    //         M:p
    //
    //         nom:this.state.nom,
    //         note:document.getElementById('n').value,
    //         M:this.state.nom2
    //
    //     }
    //     console.log(n)
    //     axios.post("http://localhost:3000/users/note",n).then(res => {
    //
    //         console.log("succes")
    //         alert("vous avez noter votre camarade")
    //
    //
    //
    //
    //     });
    //
    // }

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







    }


    find(a){

              axios.post("http://localhost:3000/ms/find/"+a).then(res => {
            this.setState({tab2:res.data,show1:true})
                this.setState({tab2:res.data,show1:true})
            console.log("succes")
        });
    }
    show(b,a){

        this.setState({show:true,nom:b,nom2:a})
    }
    historique()
    {
        const a = {
            emailUser: jwt_decode(localStorage.token).user.email,
            roleUser: jwt_decode(localStorage.token).user.role,
            type: "Evaluation",
            Text : jwt_decode(localStorage.token).user.role+" "+jwt_decode(localStorage.token).user.nom+" "+jwt_decode(localStorage.token).user.prenom+" evaluated  : "+this.state.TEST['nom'] + ' '+ this.state.TEST['prenom']
        }
        console.log(a.Text)
        axios.post("http://localhost:3000/users/ajouterHistorique",a).then(res => {
            console.log(res.data)
            console.log('succes')


        });
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
                                    src={require("assets/img/faces/eval.jpg")}
                                    height={150}
                                />
                            </div>
                            <div className="name">
                                <h4 className="btn btn-secondary btn-lg btn-block">
                                Peer Evaluation Form
                                </h4>

                            </div>
                        </div>

                        <Row>

                            <Col className="ml-auto mr-auto text-center" md="6">
                                <button className="btn btn-outline-primary btn-lg btn-block" >

                                    You will evaluate {this.state.TEST && this.state.TEST['nom'] + ' '+ this.state.TEST['prenom']}

                                        <Label for="exampleEmail">Evaluator : {jwt_decode(localStorage.token).user.nom }  {jwt_decode(localStorage.token).user.prenom}</Label>


                                </button>
                                <br />



                            </Col>
                        </Row>
                        <br />
                        <div>
                            <Form>

                                <FormGroup>

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
                                </FormGroup>

                                <center> <Button onClick={this.historique.bind(this)} >Valider!</Button></center>

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
