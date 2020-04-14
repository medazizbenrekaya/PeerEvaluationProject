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
  Col, Form, ListGroup, ListGroupItem
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



class Admin extends Component {

  componentDidMount() {
    axios.get("http://localhost:3000/users/allUser").then(res => {
      this.setState({tab1:res.data})

      console.log('succes')
    });
  }
  constructor(props){
    super(props)
    this.state = {tab1:'',tab2:''};
    this.state = {m: [],x:[],ms:'',
      activeTab:"1"

    };

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
      console.log(this.state.activeTab);
    }

    //this.state.activeTab=tab
  }
  filter()
  {
    const t = {
      role:document.getElementById('select').value
    }
    console.log(t.role)
    axios.post("http://localhost:3000/users/role", t ).then(res => {
      this.setState({tab1:res.data})

      console.log(res.data)
    });
  }
  delete(a)
  {

    console.log(a)


    axios.get("http://localhost:3000/users/delete/"+a ).then(res => {

      console.log("succes")
    });
  }
  find()
  {
    const t =
        {
          email:document.getElementById('text').value
        }
    axios.post("http://localhost:3000/users/email", t ).then(res => {
      this.setState({tab1:res.data})

      console.log(res.data)
    });
  }



  render()
{


  return (
      <>
        <NavbarProfile/>
        <ProfilePageHeader/>
        <div className="section profile-content">

        </div>

        <div>
          <div className="filter" />
          <Container>
            <Row>
              <Col>
                <div className="nav-tabs-navigation">
                  <div className="nav-tabs-wrapper">
                    <Nav id="tabs" role="tablist" tabs>
                      <NavItem>
                        <NavLink
                            className={this.state.activeTab === "1" ? "active" : ""}
                            onClick={() => {this.toggle("1")}}>
                          Users List
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                            className={this.state.activeTab === "2 "? "active" : ""}
                            onClick={() => {
                              this.toggle("2");
                            }}
                        >
                          Project List
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                            className={this.state.activeTab === "3" ? "active" : ""}
                            onClick={() => {this.toggle("3")}}
                        >
                          Teams List
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </div>
                <TabContent activeTab={this.state.activeTab} className="text-center">
                  <TabPane tabId="1">
                    <div>
                      <div className="filter" />
                      <Container>
                        <Row>
                          <Col className="ml-auto mr-auto" md="8">

                              <h1>Users Table</h1>
                           <center> <table>
                              <tr>
                                <td>Filter
                                </td>
                                <td>
                                  <Input type="select" id="select" >
                                    <option onClick={this.componentDidMount.bind(this)}>
                                      All Users
                                    </option>
                                    <option value="Teacher" onClick={this.filter.bind(this)}>
                                      Teacher
                                    </option>
                                    <option value="Student" onClick={this.filter.bind(this)}>
                                      Student
                                    </option>
                                  </Input >
                                </td>
                              </tr>
                           </table></center>
                            <br/>   <br/>   <br/>

                           <table className="table-responsive-md">
                             <tr>
                               <td> <Input type="text" id="text"  /></td>
                               <td>         <button onClick={this.find.bind(this)}>Search</button></td>
                             </tr>

                           </table>
                              <div className="table-responsive">

                                <table className="table">
                                  <thead className="table table-info">
                                  <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                  </tr>
                                  </thead>
                                  {this.state.tab1   && this.state.tab1.map((team) =>  <tbody className="table table-active" key={team._id}  >

                                      <tr>
                                        <td>{team.nom}</td>
                                        <td>{team.prenom}</td>
                                        <td>{team.email}</td>
                                        <td>{team.role}</td>
                                        <td><button className="btn-danger" onClick={this.delete.bind(this , team.email)}>Delete</button></td>
                                      </tr>
                                      </tbody>
                                  )}

                                </table>
                              </div>






                          </Col>
                        </Row>
                      </Container>
                    </div>
                  </TabPane>
                </TabContent>
              </Col>

            </Row>

          </Container>
        </div>


        <DemoFooter/>
      </>
  );
}
}

export default Admin;
