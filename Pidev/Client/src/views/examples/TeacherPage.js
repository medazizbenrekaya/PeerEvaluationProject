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
    Row,
    Col, Card,
    InputGroupAddon,
    InputGroupText,
    Form,
    ListGroup,
    ListGroupItem


} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import NavbarProfile from "../../components/Navbars/NavbarProfile";
import NavBarTeacher from "../../components/Navbars/NavBarTeacher";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import jwt_decode from "jwt-decode";
import axios from "axios";
import SectionNavigation from "../index-sections/SectionNavigation";
import NucleoIcons from "../NucleoIcons";
import SectionProgress from "../index-sections/SectionProgress";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import {c} from '../../assets/countries.js';
import {University} from "../../assets/University";


function countryToFlag(isoCode) {
    return typeof String.fromCodePoint !== 'undefined'
        ? isoCode
            .toUpperCase()
            .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
        : isoCode;
}

const useStyles = makeStyles({
    option: {
        fontSize: 15,
        '& > span': {
            marginRight: 10,
            fontSize: 18,
        },
    },
});

class TeacherPage extends  Component {
    constructor(props){
        super(props)
        this.state = {m: [],x:[],ms:'',
            activeTab:"1",tab1:'',show2:false,tab2:'',show:false,show1:false

        };



    }
    editable()
    {
        this.setState({show2:true})
    }

    componentDidMount() {
        axios.get("http://localhost:3000/ms/Afficher").then(res => {
            this.setState({tab1:res.data})
            console.log('succes')

        });
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
    editPays()
    {
        const t = {
            _id:document.getElementById('id').value,
            pays:document.getElementById('country-select-demo').value
        }
        console.log(t.pays)
        axios.post("http://localhost:3000/users/update", t).then(res => {
            console.log('succes')
            this.setState({paysE : t.pays})



        });
    }
    editUniversity()
    {
        const t = {
            _id:document.getElementById('id').value,
            university:document.getElementById('combo-box-demo').value
        }
        console.log(t.university)
        axios.post("http://localhost:3000/users/update", t).then(res => {
            console.log('succes')



        });
    }





    editNom(){
        const bod = {
            _id:document.getElementById('id').value,
            nom:document.getElementById('nomU').value,

        };
        axios.post("http://localhost:3000/users/update", bod).then(res => {
            console.log('succes')


        });
    }
    editPrenom(){
        const bod = {
            _id:document.getElementById('id').value,
            prenom:document.getElementById('prenomU').value,

        };
        axios.post("http://localhost:3000/users/update", bod).then(res => {
            console.log('succes')


        });
    }




    fileSelectedHandler = event =>
    { this.setState({
        selectedFile: event.target.files[0]
    })
    }

    fileUploadHandler = () => {
        const fd = FormData();
        fd.append('image',this.state.selectedFile,this.state.selectedFile.name)
        fd.append('_id',jwt_decode(localStorage.token).user._id)
        axios.post("http://localhost:3000/users/user-profile",fd).then(res => {

            console.log(res)

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

                                src={require("assets/img/faces/"+jwt_decode(localStorage.token).user.image)}

                                />

                            </div>

                            <div className="section profile-content">
                                <input type="file" onChange={this.fileSelectedHandler} />
                                <button onClick={this.fileUploadHandler}>upload</button>
                            </div>


                            <div className="card">
                                <h4 className="card-title">
                                    {jwt_decode(localStorage.token).user.nom} {jwt_decode(localStorage.token).user.prenom}<br/>
                                </h4>
                                <h6 className="card-subtitle">{jwt_decode(localStorage.token).user.role}</h6>
                                {jwt_decode(localStorage.token).user.university == null &&
                                <h6><option className="card-text" onClick={this.editable.bind(this)}>Set your University</option></h6>
                                }
                                {jwt_decode(localStorage.token).user.university != null &&
                                <h6 className="card-description">University : {jwt_decode(localStorage.token).user.university}</h6>
                                }
                                {jwt_decode(localStorage.token).user.pays == null &&
                                <h6><option className="card-text" onClick={this.editable.bind(this)}>Set your pays</option></h6>
                                }
                                {jwt_decode(localStorage.token).user.pays != null &&
                                <h6 className="card-description">From : {jwt_decode(localStorage.token).user.pays}</h6>
                                }
                            </div>
                        </div>
                        <Row>
                            <Col className="ml-auto mr-auto text-center" md="6">

                                <br/>
                                <Button className="btn-round" color="default" onClick={this.editable.bind(this)} outline>
                                    <i className="fa fa-cog"/> edit
                                </Button>
                                <br/>
                                {this.state.show2?
                                    <Input placeholder="" type="text" id="id" value={jwt_decode(localStorage.token).user._id} hidden/>   :null}
                                {this.state.show2?   <label>First Name</label>  :null}
                                {this.state.show2?    <Input placeholder={jwt_decode(localStorage.token).user.nom} type="text" id="nomU" onChange={this.editNom.bind(this)} />  :null}
                                {this.state.show2?     <label>Last Name</label>  :null}
                                {this.state.show2?      <Input placeholder={jwt_decode(localStorage.token).user.prenom} type="text" id="prenomU" onChange={this.editPrenom.bind(this)}/>  :null}
                                {this.state.show2?     <label>Pays</label>  :null}
                                {this.state.show2? <Autocomplete onChange={this.editPays.bind(this)}
                                                                 id="country-select-demo"
                                                                 style={{ width: 300 }}
                                                                 options={c}
                                                                 classes={{
                                                                     option: useStyles.option,
                                                                 }}
                                                                 autoHighlight
                                                                 getOptionLabel={(option) => option.label}
                                                                 renderOption={(option) => (
                                                                     <React.Fragment>
                                                                         <span>{countryToFlag(option.code)}</span>
                                                                         {option.label}  +{option.phone}
                                                                     </React.Fragment>
                                                                 )}
                                                                 renderInput={(params) => (
                                                                     <TextField
                                                                         {...params}
                                                                         label="Choose a country"
                                                                         variant="outlined"

                                                                     />)}
                                /> :null}
                                {this.state.show2?     <label>University</label>  :null}
                                {this.state.show2?
                                    <Autocomplete
                                        id="combo-box-demo"
                                        options={University}
                                        getOptionDisabled={(option) => option.pays !== this.state.paysE }
                                        classes={{
                                            option: useStyles.option,
                                        }}
                                        getOptionLabel={(option) => option.title+','+option.pays }
                                        style={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="Choose an University" variant="outlined" />}
                                        onChange={this.editUniversity.bind(this)}
                                    />
                                    :null}



                            </Col>
                        </Row>
                        <br/>
                        <br/>
                        <div className="nav-tabs-navigation">
                            <div className="nav-tabs-wrapper">
                            </div>
                        </div>
                        <>
                            <ExamplesNavbar />

                        </>

                    </Container>
                </div>
                <DemoFooter/>
            </>
        );
    }
}

export default TeacherPage;
