import React,{Component} from "react";



import {QC} from "../../assets/QuizData";
import  "../../assets/css/colors.css";
import NavbarProfile from "../../components/Navbars/NavbarProfile";
import ProfilePageHeader from "../../components/Headers/ProfilePageHeader";
import DemoFooter from "../../components/Footers/DemoFooter";

class QuizCommunication extends  Component {
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
                questions: QC[currentQuestion].question,
                options: QC[currentQuestion].options,
                answers: QC[currentQuestion].answer
            }
        })
    }
    componentDidMount() {
      this.loadQuiz();
    }
    nextQuestionHandler = () => {
        const {score , userAwnser , answers } = this.state
        this.setState({
            currentQuestion: this.state.currentQuestion + 1
        })
        console.log(this.state.currentQuestion)
        if(userAwnser === answers){
            this.setState({
                score: score + 2
            })
        }
    }
    finishHandler = () =>{
        const {score , userAwnser , answers } = this.state
        if(userAwnser === answers){
            this.setState({
                score: score + 2
            })
            if (score >= 7){
                this.setState({
                    result: 'you validated this macro, well done '
                    //function update
                    //function historique prend score
                }) }
                else{
                    this.setState({
                        result: 'you have to work on your communication skill'
                        //function update
                        //function historique prend score
                    })
                }


        }
        if (this.state.currentQuestion === QC.length - 1 )
        {
            this.setState(
                {
                    quizEnd: true
                }
            )
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {currentQuestion} = this.state;
        if (this.state.currentQuestion !== prevState.currentQuestion){
            this.setState(() =>{
                return{
                    disabled: true,
                    questions: QC[currentQuestion].question,
                    options: QC[currentQuestion].options,
                    answers: QC[currentQuestion].answer
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

                <div className="app">

                    <h2>final score is {this.state.score} points of {QC.length * 2}</h2>
                    <h3>{this.state.result}</h3>
                    <p>the correct answers for questions was : </p>
                    <ul>
                        {QC.map((item,index) => (
                            <li key={index} className="options">
                                Q: {item.question}
                                R: {item.answer}
                            </li>
                            )
                        )}
                    </ul>
                </div>
                    <DemoFooter/>
                    </>
            )
        }
        return(
            <>
                <NavbarProfile/>
                <ProfilePageHeader/>


            <div className="app">
                <p className="titre" >Validate macro skill : COMMUNICATION</p>
                <h2 >  {questions}</h2>
                <span > Question {currentQuestion}  out of  {QC.length - 1 }  </span>
                 {options.map(option =>(
                     <p className="options">
                    <option key={option.id}
                       onClick={() => this.checkAnwser(option)}
                      className={ userAwnser === option ? "Selected" :null}

                    >
                        {option}</option></p>
                ))}
                {currentQuestion < QC.length - 1 &&  <button disabled={this.state.disabled} onClick={this.nextQuestionHandler}>Next</button> }
                {currentQuestion === QC.length - 1 &&  <button onClick={this.finishHandler}>Finish</button> }

            </div>
                <DemoFooter/>
                </>
        );
    }


}
export default QuizCommunication;
