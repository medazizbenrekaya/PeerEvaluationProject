import React from "react";

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
  Col, Form
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import NavbarProfile from "../../components/Navbars/NavbarProfile";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import jwt_decode from "jwt-decode";
import axios from "axios";
import {Component} from "react"
import index from "async";



class ProfilePage extends Component {

  constructor(props){
    super(props)
    this.state = {show:false,tab1:'',tab2:'',show1:false,selectedFile: null,show2:false};

  }

     detail(id) {
       axios.get("http://localhost:3000/users/details/"+id).then(res => {
         console.log('succes')
       });
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
  see()
  {
    this.setState({show1:true})
    const micro = axios.post("http://localhost:3000/users/find/"+jwt_decode(localStorage.token).user.email).then(res => {
      this.setState({tab2:res.data})
      console.log('succes')

    });
  }
  show(){
    this.setState({show:true})
    const t = {
      nom:document.getElementById('macro').value
    }
    console.log(t.nom)

    const micro = axios.post("http://localhost:3000/ms/find/"+t.nom).then(res => {
      this.setState({tab1:res.data})
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
  const listmacro = jwt_decode(localStorage.token).user.microskills.map(
      (link) =><li key={link.nom}> <table border="3" width="500">
        <thead>
        <tr>
          <td>Macro Skills</td>
          <td>Type</td>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td ><button id="macro" value={link.nom} onClick={this.show.bind(this)}>{link.nom}</button></td>
          <td> {link.type}</td>
        </tr>
        </tbody>
      </table>
      </li>

  );
  return (
      <>
        <NavbarProfile/>
        <ProfilePageHeader/>
        <div className="section profile-content">
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


              <div className="name">
                <h4 className="title">
                  {jwt_decode(localStorage.token).user.nom} {jwt_decode(localStorage.token).user.prenom}<br/>
                </h4>
                <h6 className="description">{jwt_decode(localStorage.token).user.role}</h6>
              </div>
            </div>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="6">
                <p>
                  Current team :
                  {jwt_decode(localStorage.token).user.team  }
                </p>
                <br/>
                  <Button className="btn-round" color="default" onClick={this.editable.bind(this)} outline>
                      <i className="fa fa-cog"/> edit
                  </Button>
              <br/>
                  {this.state.show2?
                <Input placeholder="" type="text" id="id" value={jwt_decode(localStorage.token).user._id} hidden/>   :null}
                  {this.state.show2?   <label>First Name</label>  :null}
                  {this.state.show2?    <Input placeholder={jwt_decode(localStorage.token).user.nom} type="text" id="nom" onChange={this.editNom.bind(this)} />  :null}
                  {this.state.show2?     <label>Last Name</label>  :null}
                  {this.state.show2?      <Input placeholder={jwt_decode(localStorage.token).user.prenom} type="text" id="prenom" onChange={this.editPrenom.bind(this)}/>  :null}


              </Col>
            </Row>
            <br/>
            <div className="nav-tabs-navigation">
              <div className="nav-tabs-wrapper">

                <h4>My Macro skills : </h4>
                <button onClick={this.see.bind(this)}>See</button>
                {this.state.show1?
                <Input type="select" name="select" id="macro" >
                  {this.state.tab2   && this.state.tab2.map((team) =><optgroup label={team.type}> <option  onClick={this.show.bind(this)} key={team.nom} value={team.nom}  >{team.nom}</option></optgroup>  )}

                </Input> :null}

                {this.state.show? <label>micro Skills :  </label>  :null}
                {this.state.tab1 && this.state.tab1.map((detail) => <li  key={detail.nom} >
                  <table border="3" width="500">
                    <thead>
                    <tr>
                      <td>Micro Skills</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td >{detail.nom}</td>
                    </tr>
                    </tbody>
                  </table>
                </li>)}



              </div>
            </div>
            <div className="nav-tabs-navigation">
              <div className="nav-tabs-wrapper">

                <h4>My Project : </h4>
                <h6>  </h6>

              </div>
            </div>

          </Container>
        </div>
        <DemoFooter/>
      </>
  );
}

}
export default ProfilePage;
