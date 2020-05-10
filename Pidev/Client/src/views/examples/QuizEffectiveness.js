import React,{Component} from "react";



import {QE} from "../../assets/QuizData";
import  "../../assets/css/colors.css";
import NavbarProfile from "../../components/Navbars/NavbarProfile";
import ProfilePageHeader from "../../components/Headers/ProfilePageHeader";
import DemoFooter from "../../components/Footers/DemoFooter";
import jwt_decode from "jwt-decode";
import axios from "axios";
import NavBarStudent from "../../components/Navbars/NavBarStudent";

class QuizEffectiveness extends  Component {
    state = {
        userAwnser : null,
        currentQuestion: 0,
        options: [],
        quizEnd: false,
        score: 0,
        disabled : false,
        result:''
    }
    loadQuiz = () =>{
        const {currentQuestion} = this.state;
        this.setState(()=> {
            return {
                questions: QE[currentQuestion].question,
                options: QE[currentQuestion].options,
                answers: QE[currentQuestion].answer
            }
        })
    }
    componentDidMount() {
      this.loadQuiz();
    }
    nextQuestionHandler = () => {
        const {score , userAwnser , answers } = this.state
        if (userAwnser === null)
        {
            alert('You have to choose a response')
        }
        else {
            this.setState({
                currentQuestion: this.state.currentQuestion + 1
            })
            console.log(this.state.currentQuestion)
            if (userAwnser === answers) {
                this.setState({
                    score: score + 2
                })
            }
        }
    }
    finishHandler = () =>{
        const {score , userAwnser , answers } = this.state
        if(userAwnser === answers){
            this.setState({
                score: score + 2
            })
            if (score >= 16){
                this.setState({
                    result: 'you validated this macro, well done '
                }) }
                else{
                    this.setState({
                        result: 'you have to work on your Effectiveness skill'

                    })
                }


        }
        if (this.state.currentQuestion === QE.length - 1 )
        {
            this.setState(
                {
                    quizEnd: true
                }
            )
        }
        const t = {
            email: jwt_decode(localStorage.token).user.email,
            nom: 'Effectiveness',
            note : this.state.score + 2
        }
        console.log(t.nom)

        axios.post("http://localhost:3000/ms/etat",t).then(res => {
            console.log(res.data)
            console.log('succes')


        });
        const a = {
            emailUser: jwt_decode(localStorage.token).user.email,
            roleUser: jwt_decode(localStorage.token).user.role,
            type: "Self Evaluation",
            Text : jwt_decode(localStorage.token).user.role+" "+jwt_decode(localStorage.token).user.nom+" "+jwt_decode(localStorage.token).user.prenom+" has a score :"+t.note+" in self evaluation : "+t.nom
        }
        console.log(a.Text)
        axios.post("http://localhost:3000/users/ajouterHistorique",a).then(res => {
            console.log(res.data)
            console.log('succes')


        });

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {currentQuestion} = this.state;
        if (this.state.currentQuestion !== prevState.currentQuestion){
            this.setState(() =>{
                return{
                    disabled: true,
                    questions: QE[currentQuestion].question,
                    options: QE[currentQuestion].options,
                    answers: QE[currentQuestion].answer
                };
            })
        }
    }
    checkAnwser = answer => {
        this.setState({
            userAwnser: answer,
            disabled:false
        })

    }

    render() {
        const {questions , options , currentQuestion , userAwnser , quizEnd} = this.state;
        if ( quizEnd) {
            return (
                <>
                    <NavbarProfile/>
                    <ProfilePageHeader/>

                    <div className="section profile-content">
                        <div className="app">
                            <NavBarStudent/>
                            <div className="owner">
                                <div className="avatar">
                                    <img
                                        alt="..."
                                        className="img-circle img-no-padding img-responsive"
                                        src={require('assets/img/faces/e.jpg')}
                                        width={150}
                                    />
                                </div>

                            </div>
                            <div className="container"><div className="bg-light border border-primary">

                                <h2>final score is <strong>{this.state.score}</strong> points of {QE.length * 2}</h2>
                    <h3>{this.state.result}</h3>
                    <p>the correct answers for questions was : </p>
                    <ul>
                        {QE.map((item,index) => (
                            <li key={index} className="options">
                                Q: {item.question} <br/>
                                R: {item.answer}
                            </li>
                            )
                        )}
                    </ul>
                            </div></div></div></div>
                    <DemoFooter/>
                    </>
            )
        }
        return(
            <>
                <NavbarProfile/>
                <ProfilePageHeader/>


                <div className="section profile-content">
                    <div className="app">
                        <NavBarStudent/>
                        <div className="owner">
                            <div className="avatar">
                                <img
                                    alt="..."
                                    className="img-circle img-no-padding img-responsive"
                                    src={require('assets/img/faces/e.jpg')}
                                    width={150}
                                />
                            </div>

                        </div>
                        <div className="container"><div className="bg-light border border-primary">
                <button className="btn btn-outline-info" >Validate macro skill : Effectiveness</button>
                <h3 className="title">  {questions}</h3>
                <span > Question {currentQuestion + 1}  out of  {QE.length  }  </span>
                 {options.map(option =>(
                     <p className="options">
                    <option key={option.id}
                       onClick={() => this.checkAnwser(option)}
                      className={ userAwnser === option ? "Selected" :null}

                    >
                        {option}</option></p>
                ))}
                {currentQuestion < QE.length - 1 &&  <button disabled={this.state.disabled}  className="btn btn-success" onClick={this.nextQuestionHandler}>Next</button> }
                {currentQuestion === QE.length - 1 &&  <button className="btn btn-success" onClick={this.finishHandler}>Finish</button> }

                        </div></div></div></div>
                <DemoFooter/>
                </>
        );
    }


}
export default QuizEffectiveness;
