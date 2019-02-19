import React from 'react'
import PropTypes from 'prop-types'

const Background = props => {

    return (
        <div className='c-background'>
            {props.children}
        </div>
    )
}

Background.propTypes = {
    children: PropTypes.node.isRequired
}

export default Background