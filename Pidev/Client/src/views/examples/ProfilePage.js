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
    Col, Form, Card, CardBody
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import NavbarProfile from "../../components/Navbars/NavbarProfile";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import NavBarStudent from "../../components/Navbars/NavBarStudent";
import jwt_decode from "jwt-decode";
import axios from "axios";
import {Component} from "react"
import index from "async";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import {c} from '../../assets/countries.js';
import {University} from "../../assets/University";
import {Radar} from "react-chartjs-2";

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
        this.setState({show1:true})
        const micro = axios.post("http://localhost:3000/users/find/"+jwt_decode(localStorage.token).user.email).then(res => {
            this.setState({tab2:res.data})
            console.log('succes')

        });
        const t = {
            email: jwt_decode(localStorage.token).user.email }

        axios.post("http://localhost:3000/users/projects",t).then(res => {
            this.setState({tab6 : res.data})
            console.log(res.data)
            console.log('succes')


        });

        const st = {
            email: jwt_decode(localStorage.token).user.email ,

        }
        const s =     axios.post("http://localhost:3000/users/statsSelfNote",st).then(res => {

            this.setState({stats:res.data})
            console.log(this.state.stats)

            this.state.stats.map(e=>{


                this.state.tab7.push(e.micro)
                this.state.tab8.push(e.note)

            })
            console.log(this.state.tab7)
            console.log(this.state.tab8)

            const d = {
                labels: ['Communication', 'Leadership', 'Effectiveness','Professionalism','Managing Skills','Cognitive ability'],

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
    back()
    {
        this.setState({show1:true,show:false})
        const micro = axios.post("http://localhost:3000/users/find/"+jwt_decode(localStorage.token).user.email).then(res => {
            this.setState({tab2:res.data})
            console.log('succes')

        });
    }


  show(a){
    this.setState({show:true})



    const micro = axios.post("http://localhost:3000/ms/find/"+a).then(res => {
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
            <div className="nav-tabs-navigation">
              <div className="nav-tabs-wrapper">

                <h4>My Macro skills : </h4>
                  <table className="table">
                      <thead className="table table-info">
                      <tr>
                          <th>Name</th>
                          <th>Type</th>
                          <th>Number of Micro Skills</th>
                          <th>Actions</th>
                      </tr>
                      </thead>


                  {this.state.tab2   && this.state.tab2.map((t) =>
                      <tbody className="table table-active" key={t._id}  >

                      <tr>
                          <td>{t.nom}
                          </td>

                          <td>{t.type}</td>
                          <td>{t.macroskills.length}</td>
                          <td><button className="btn-info" onClick={this.show.bind(this,t.nom)} >Details</button>
                              {!t.etat  && <button className="btn-link" onClick={this.improve.bind(this,t.nom)} >Self Evaluation</button>}

                          </td>
                      </tr>

                      </tbody>
                      )}
                 </table>




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
                      <tr><td colSpan="1">   <button className="btn btn-link" onClick={this.back.bind(this)}>Back</button></td></tr>
                  </table> :null}


                  <div>
                      <Card style={{width: '50rem',height:'10', backgroundColor:'#66CDAA'   }}>
                          <CardBody>
                              <Radar  data={this.state.data}  />

                          </CardBody>
                      </Card>


                  </div>



              </div>
            </div>
            <div className="nav-tabs-navigation">
              <div className="nav-tabs-wrapper">

                <h4>My Project : </h4>
                  <table className="table">
                      <thead className="table table-info">
                      <tr>
                          <th>Name</th>
                          <th>Actions</th>
                      </tr>
                      </thead>


                      {this.state.tab6   && this.state.tab6.map((t) =>
                          <tbody className="table table-active" key={t}  >

                          <tr>
                              <td>{t}</td>
                              <td><button className="btn-info" >Details</button></td>
                          </tr>
                          </tbody>
                      )}
                  </table>
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
