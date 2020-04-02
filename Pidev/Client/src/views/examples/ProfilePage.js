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
  Col
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import NavbarProfile from "../../components/Navbars/NavbarProfile";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import jwt_decode from "jwt-decode";
import axios from "axios";
import {Component} from "react"



class ProfilePage extends Component {

     detail(id) {
       axios.get("http://localhost:3000/users/details/"+id).then(res => {
         console.log('succes')
       });
     }
     edit(){
    const bod = {
      _id:document.getElementById('id').value,
      nom:document.getElementById('nom').value,
      prenom:document.getElementById('prenom').value,

    };
    axios.post("http://localhost:3000/users/update", bod).then(res => {
      console.log('succes')

    });
  }


  render()
{
  const listmacro = jwt_decode(localStorage.token).user.microskills.map(
      (link) => <li key={link.nom} > {link.nom}   {link.description}   </li>
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
                    src={require("assets/img/faces/student.png")}
                />
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
                  {jwt_decode(localStorage.token).user.team}
                </p>
                <br/>
                <label>Edit Profile</label>
              <br/>
                <Input placeholder="" type="text" id="id" value={jwt_decode(localStorage.token).user._id} hidden/>
                <label>First Name</label>
                <Input placeholder={jwt_decode(localStorage.token).user.nom} type="text" id="nom" />
                <label>Last Name</label>
                  <Input placeholder={jwt_decode(localStorage.token).user.prenom} type="text" id="prenom"/>
                <br/>
                <Button className="btn-round" color="default" onClick={this.edit.bind(this)} outline>
                  <i className="fa fa-cog"/> edit
                </Button>
              </Col>
            </Row>
            <br/>
            <div className="nav-tabs-navigation">
              <div className="nav-tabs-wrapper">

                <h4>My Macro skills : </h4>
                <h6> {listmacro} </h6>

              </div>
            </div>
            <div className="nav-tabs-navigation">
              <div className="nav-tabs-wrapper">

                <h4>My Projects : </h4>
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
