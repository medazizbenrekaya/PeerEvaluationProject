import React from "react";

// reactstrap components
import {
    Button,

    Input,

    Container,
    Row,
    Col
} from "reactstrap";

// core components

import NavbarProfile from "../../components/Navbars/NavbarProfile";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import NavBarStudent from "../../components/Navbars/NavBarStudent";
import jwt_decode from "jwt-decode";
import axios from "axios";
import {Component} from "react"


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




class ProfilePage extends Component {

    componentDidMount() {


    }

    constructor(props){
    super(props)
    this.state = {show:false,tab1:'',tab2:'',show1:false,selectedFile: null,show2:false,tab3:'',show3:false,tab6:'',stats:'',tab7:[],tab8:[],data:{}};

  }



     editNom(){
    const bod = {
      _id:document.getElementById('id').value,
      nom:document.getElementById('nom').value

    };
    axios.post("http://localhost:3000/users/update", bod).then(res => {
      console.log('succes')



    });
  }
    editPrenom(){
        const bod = {
            _id:document.getElementById('id').value,
            prenom:document.getElementById('prenom').value

        };
        axios.post("http://localhost:3000/users/update", bod).then(res => {
            console.log('succes')



        });
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



  show(a){
    this.setState({show:true})



     axios.post("http://localhost:3000/ms/find/"+a).then(res => {
      this.setState({tab1:res.data,tab2:'',nomMicro:a})
      console.log('succes')

    });
  }

  fileSelectedHandler = event =>
  { this.setState({
    selectedFile: event.target.files[0]
  })
  }

  fileUploadHandler = () => {
    const fd = new FormData();
    fd.append('image',this.state.selectedFile,this.state.selectedFile.name)
    fd.append('_id',jwt_decode(localStorage.token).user._id)
    axios.post("http://localhost:3000/users/user-profile",fd).then(res => {

      console.log(res)

    });
  }
  editable()
{
    this.setState({show2:true})
}



  render()
{



  return (
      <>
        <NavbarProfile/>
        <ProfilePageHeader/>
        <div className="section profile-content">
            <NavBarStudent/>
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

              <div className="card" style={{backgroundColor:"#EFF6F4"}}>
                <h4 className="card-title" >
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
                  <div   className="bg-light border border-secondary">
                  {this.state.show2?
                <Input placeholder="" type="text" id="id" value={jwt_decode(localStorage.token).user._id} hidden/>   :null}
                  {this.state.show2?   <label>First Name</label>  :null}
                  {this.state.show2?    <Input placeholder={jwt_decode(localStorage.token).user.nom} type="text" id="nom" onChange={this.editNom.bind(this)} />  :null}
                  {this.state.show2?     <label>Last Name</label>  :null}
                  {this.state.show2?      <Input placeholder={jwt_decode(localStorage.token).user.prenom} type="text" id="prenom" onChange={this.editPrenom.bind(this)}/>  :null}
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
                          renderInput={(params) => <TextField {...params} label="Choose an University" variant="outlined" margin="normal" />}
                          onChange={this.editUniversity.bind(this)}
                      />
                      :null}</div>



              </Col>
            </Row>
            <br/>

          </Container>
        </div>
        <DemoFooter/>
      </>
  );
}

}
export default ProfilePage;
