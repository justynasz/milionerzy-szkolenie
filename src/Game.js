import React from 'react';
import Background from './Background';
import Questions from './Questions';
import SidePanel from './SidePanel';
import { fetchQuestions } from './helpers';
import shuffle from 'lodash/shuffle'
import EndGame from './EndGame';
import PropTypes from 'prop-types'

class Game extends React.Component {

    constructor() {
        super();
        this.state = {
            questions : [],
            currentQuestionNumber: 0
        }

        this.getQuestions = this.getQuestions.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);
    }

    get currentQuestionNumber () {
        return this.state.questions[this.state.currentQuestionNumber]
    }

    componentDidMount () {
        if(!this.props.hasStarted) {
            this.props.history.replace('/')
            return
        }
        this.getQuestions();
    }

    getQuestions () {
        fetchQuestions(this.props.difficulty).then(data => {
            this.setState({
                questions: data
            });
            console.log(data);
        })
    }
    

    checkAnswer (answer) {
        return () => {
            if(answer === this.currentQuestionNumber.correctAnswer) {
                if(this.state.currentQuestionNumber < 11) {
                    this.setState(prevState => {
                        return {
                            currentQuestionNumber : prevState.currentQuestionNumber + 1
                        }
                    })
                } else {
                    this.setState({
                        hasWon: true,
                        isFinished: true
                    })

                }
            } else {
                alert('przegrales')
                this.setState({
                    hasWon: false,
                    isFinished: true
                })
            }
        }
    }

    // if(this.state.isFinished) {
    //     return
    // }
    render() {

        const {
            correctAnswer,
            incorrectAnswers = [],
            question
        } = this.currentQuestionNumber || {}


        return this.state.isFinished
        ? <EndGame 
            questionNumber ={this.state.currentQuestionNumber}
            username={this.props.username}
            hasWon={this.state.hasWon}
            /> 
        : (
            <div className='l-game'>
                <Background>
                    <Questions 
                        answers={shuffle([correctAnswer, ...incorrectAnswers])}
                        question={question} 
                        onAnswerClick = {this.checkAnswer}
                    />
                </Background>
                <SidePanel 
                    questionNumber={this.state.currentQuestionNumber}
                />
            </div>
        )
    }
}

Game.propTypes = {
    username: PropTypes.string,
    history: PropTypes.object,
    hasStarted: PropTypes.bool,
    difficulty: PropTypes.string
}

export default Game