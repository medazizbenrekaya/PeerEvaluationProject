
import React from "react";

// reactstrap components
import {
    Input,

    Row,
    Col,

} from "reactstrap";


// core components

import NavbarProfile from "../../components/Navbars/NavbarProfile";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

import axios from "axios";
import {Component} from "react"

import NavBarAdmin from "../../components/Navbars/NavBarAdmin";




class Historique extends Component {

    constructor(props){
        super(props)
        this.state = {tab1:'',tab2:'',tab3:'',tab4:'',tab5:'',show:false,af:false,tabh:''};
        this.state = {m: [],x:[],ms:'',
            activeTab:"1",
            loginModal:false,
            data:{},
            nbU:0,
            nbA:0,
            nbN:0,

        };

    }



    componentDidMount() {
        this.setState({af:true})
        axios.get("http://localhost:3000/users/allHistorique").then(res => {
            this.setState({tabh: res.data})
        });

    }



    filterH()
    {
        const t = {
            type:document.getElementById('selectH').value
        }
        console.log(t.type)
        axios.post("http://localhost:3000/users/typeHistorique", t ).then(res => {
            this.setState({tabh:res.data})

            console.log(res.data)
        });
    }





    deleteHistorique(a)
    {
        axios.get("http://localhost:3000/users/delete/"+a ).then(res => {
            window.location.reload()
        });


    }
    afficherH()
    {
        this.setState({af:true})
        axios.get("http://localhost:3000/users/allHistorique").then(res => {
            this.setState({tabh: res.data})
        });
    }





    render()
    {
        return (
            <>
                <NavbarProfile/>
                <ProfilePageHeader/>
                <div className="section profile-content">
                    <NavBarAdmin/>
                    <container>

                    <div className="owner">
                        <div className="avatar">
                            <img
                                alt="..."
                                className="img-circle img-no-padding img-responsive"

                                src={require("assets/img/faces/historique.png")}
                                width={150}

                            />

                        </div>
                    </div>
                    <div className="name">
                        <h4 className="btn btn-secondary btn-lg  btn-block">
                            Historique Space
                        </h4>
                    </div>

                    <br/>



<div>
                    <div className="filter" />


                   <container>
                       <Row>
                           <Col >
                               <div className="container">
                                   <center>
                                       <h1><strong>Historique Data</strong></h1></center>
<br/>
                                   <center> <table>
                                       <tr>
                                           <td>Filter
                                           </td>
                                           <td>
                                               <Input type="select" id="selectH" >
                                                   <option onClick={this.afficherH.bind(this)}>
                                                       All Historique
                                                   </option>
                                                   <option value="Self Evaluation" onClick={this.filterH.bind(this)}>
                                                       Self Evaluation
                                                   </option>
                                                   <option value="Evaluation"  onClick={this.filterH.bind(this)}>
                                                       Evaluation
                                                   </option>
                                                   <option value="Macro skill"  onClick={this.filterH.bind(this)}>
                                                       Macro skill
                                                   </option>
                                               </Input >
                                           </td>
                                       </tr>
                                   </table></center>


                            <table className="table">
                                <thead className="table table-info">
                                <tr>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Text</th>
                                    <th>Action</th>

                                </tr>
                                </thead>


                                {this.state.tabh   && this.state.tabh.map((team) =>  <tbody className="table table-active" key={team._id}  >


                                    <tr>
                                        <td>{team.emailUser}</td>
                                        <td>{team.roleUser}</td>
                                        <td>{team.Text}</td>
                                        <td>   <button className="btn-danger" onClick={this.deleteHistorique.bind(this , team._id)} >Delete</button></td>

                                    </tr>
                                    </tbody>
                                )}
                                <tfoot className="table table-info">
                                <tr>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Text</th>
                                    <th>Action</th>

                                </tr>
                                </tfoot>

                            </table></div></Col></Row>
                   </container></div></container>




                </div>


                <DemoFooter/>
            </>
        );
    }
}

export default Historique;





