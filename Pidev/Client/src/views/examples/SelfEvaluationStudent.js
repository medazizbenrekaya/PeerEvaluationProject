import React from "react";

// reactstrap components
import {
    Button,

    Container,
   Card, CardBody, UncontrolledTooltip
} from "reactstrap";

// core components

import NavbarProfile from "../../components/Navbars/NavbarProfile";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import NavBarStudent from "../../components/Navbars/NavBarStudent";
import jwt_decode from "jwt-decode";
import axios from "axios";
import {Component} from "react"



import {Radar} from "react-chartjs-2";






class SelfEvaluationStudent extends Component {

    componentDidMount() {
        this.setState({show1:true})
      axios.post("http://localhost:3000/users/find/"+jwt_decode(localStorage.token).user.email).then(res => {
            this.setState({tab2:res.data})
            console.log('succes')

        });

        var notefinal5 = 0
        var nb5 = 0

        const st = {
            email: jwt_decode(localStorage.token).user.email ,

        }
         axios.post("http://localhost:3000/users/statsSelfNote",st).then(res => {

            this.setState({stats:res.data})
            console.log(this.state.stats)


            this.state.stats.map(e=>{
                nb5 = nb5 + 1
                notefinal5 = notefinal5 + e.note

                this.state.tab7.push(e.macro)
                this.state.tab8.push(e.note)

            })
            this.setState({notefinal5:Number(notefinal5/nb5).toFixed(2)})
            this.setState({pourcent5 : Number(((notefinal5/nb5)*100)/20).toFixed(2)})
            console.log(this.state.tab7)
            console.log(this.state.tab8)

            const d = {
                labels: this.state.tab7 && this.state.tab7,

                datasets: [
                    {
                        label: 'My Self Evaluation ! ',
                        backgroundColor: 'rgb(0,255,0)',
                        borderColor: 'rgba(179,181,198,1)',
                        pointBackgroundColor: 'rgb(0,128,0)',
                        pointBorderColor: 'rgb(0,128,0)',
                        pointHoverBackgroundColor: 'rgb(0,128,0)',
                        pointHoverBorderColor: 'rgb(0,128,0)',
                        data:this.state.tab8 && this.state.tab8
                        //  data: [12,20,10,8,18,16,19]
                    }
                ]
            };
            this.setState({data:d})

        });
    }

    constructor(props){
    super(props)
    this.state = {show:false,tab1:'',tab2:'',show1:false,selectedFile: null,show2:false,tab3:'',show3:false,tab6:'',stats:'',tab7:[],tab8:[],data:{}};

  }
  improve(nom)
  {
      if (nom === 'Leadership')
      {
          this.props.history.push("/selfEvaluation");
      }
      else if (nom === 'Communication')
      {
          this.props.history.push("/QuizCommunication");
      }
      else if (nom === 'Effectiveness' ){

          this.props.history.push("/QuizEffectivness");

      }
      else if (nom === 'Professionalism')
      {
          this.props.history.push("/QuizProfessionalism");
      }
      else if (nom === 'Managing Skils')
      {
          this.props.history.push("/QuizManaging");
      }
      else if (nom === 'Cognitive Ability')
      {
          this.props.history.push("/QuizCognitiveAbility");
      }



  }

     detail(id) {
       axios.get("http://localhost:3000/users/details/"+id).then(res => {
         console.log('succes')
       });
     }


    back()
    {
        this.setState({show1:true,show:false})
         axios.post("http://localhost:3000/users/find/"+jwt_decode(localStorage.token).user.email).then(res => {
            this.setState({tab2:res.data})
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
                    src={require("assets/img/faces/sellf.jpg")}
                    width={200}
                />
              </div>


            </div>
              <div className="name">
                  <h4 className="btn btn-secondary btn-lg btn-block">
                      Self Evaluation Space
                  </h4>

              </div>

            <br/>
            <div className="container">
                <div className="row">
                    <div className="col"><center> <h4 className="btn btn-info btn-lg btn-sm">My Macro skills : </h4></center>
                        <br/>
                        <div className="table-responsive">
                        <table className="table" >
                            <thead className="table table-info">
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Actions</th>
                            </tr>
                            </thead>


                            {this.state.tab2   && this.state.tab2.map((t) =>
                                <tbody className="table table-active" key={t._id}   >

                                <tr >
                                    <td >{t.nom}</td>
                                    <td >{t.type}</td>

                                    <td  ><button className="btn-info" onClick={this.show.bind(this,t.nom)} >Details</button>
                                        {!t.etat  && <button className="btn-link" onClick={this.improve.bind(this,t.nom)} >Self Evaluation</button>}

                                    </td>
                                </tr>

                                </tbody>
                            )}
                        </table></div>




                        {this.state.show?
                            <table className="table">
                                <thead className="table table-info">
                                <tr>
                                    <td>Micro Skills of {this.state.nomMicro}</td>
                                </tr>
                                </thead>
                                {this.state.tab1 && this.state.tab1.map((detail) => <tbody className="table table-active"  key={detail.nom} >


                                    <tr>
                                        <td >{detail.nom}</td>
                                    </tr>


                                    </tbody>

                                )}
                                <tr><td colSpan="1"> <center>  <button className="btn btn-link btn-lg " onClick={this.back.bind(this)}>Back</button></center></td></tr>
                            </table> :null}
                        <br/>
                    </div>
                    <div className="col">    <center><h4 className="btn btn-info btn-lg btn-sm">My Self Evaluation Result : </h4></center>
                        <br/>
                        <div className="bg-light border border-primary">
                            <Card style={{width: 'responsive',height:'10', backgroundColor:''   }}>
                                <CardBody>
                                    <Radar  data={this.state.data}  />
                                   <center> <Button  color="info" id="top4">
                                        self Evaluation Result !
                                   </Button>{` `}</center>
                                    <UncontrolledTooltip placement="top" target="top4" delay={1}>
                                        <h3>Average :{this.state.notefinal5}/20  <br/>  which equals {this.state.pourcent5 } %</h3>
                                    </UncontrolledTooltip>

                                </CardBody>
                            </Card>


                        </div></div>

                </div>
            </div>

          </Container>
        </div>
        <DemoFooter/>
      </>
  );
}

}
export default SelfEvaluationStudent;
