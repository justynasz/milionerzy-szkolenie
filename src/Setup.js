import React from 'react';
import PropTypes from 'prop-types';


class Setup extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            difficulty: this.options[0].value
        }
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.redirect = this.redirect.bind(this)
    }


    get options () {
        return [
            {
                value: 'easy',
                label: 'Easy'
            },
            {
                value: 'medium',
                label: 'Medium'
            },
            {
                value: 'hard',
                label: 'Hard'
            }
        ]
    }

    onSubmitHandler (event) {
        event.preventDefault();

        const {
            name,
            difficulty
        } = this.state

        if(!name.trim().length) {
            alert('Name jest wymagane')
            return
        }
        this.props.onSubmit(name, difficulty, this.redirect)
        // alert(`${this.state.name} ${this.state.difficulty}`) 

    } 

    redirect () {
        this.props.history.push('/game')
    }

    onChangeHandler (event) {
        const {
            name,
            value
        } = event.target

        this.setState({
            [name] : value
        })
    }


    renderOption(item) {
        return (
            <option key={item.value} value={item.value}>
                {item.label}
            </option>
        )
    }

    render() {
        return (
            <div className='l-centered'>
                <form className='f-start' onSubmit={this.onSubmitHandler}>
                    <label htmlFor='name' className='f-start__label'>Name</label>
                    <input name='name' id='name' className='f-start__control' value={this.state.name} onChange={this.onChangeHandler}/>
                   
                   <label htmlFor='difficulty' className='f-start__label'>Difficulty</label>
                   <select className='f-start__control' name='difficulty' id='difficulty' value={this.state.difficulty} onChange={this.onChangeHandler}>
                        {this.options.map(this.renderOption)}
                   </select>
                    <button className='f-start__action'>Submit</button>
                </form>
            </div>   
        )
    }
}


Setup.propTypes = {
    onSubmit: PropTypes.func.isRequired
}
export default Setup