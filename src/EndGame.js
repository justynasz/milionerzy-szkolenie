import React from 'react'
import PropTypes from 'prop-types'
import {getGuaranteedReward} from './helpers'
import {
    Link 
} from 'react-router-dom';

const EndGame = props => {
    console.log(`czy wygrana: ${props.hasWon}`);
     const WonPrice = props.hasWon
     ? 1000000 
     : getGuaranteedReward(props.questionNumber);
    return (    
        <div className='l-end'>
            <p>Game over {props.username}</p>

            <p>You won {WonPrice} $</p>
            <Link to={'/'}>
                Restart
            </Link>
        </div>
    )
}

EndGame.propTypes = {
    questionNumber: PropTypes.number
}

export default EndGame