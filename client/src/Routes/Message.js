import React from 'react';
import PropTypes from 'prop-types';

const Message = ({msg}) => {
    return(
        <div id = "message" className="alert alert-info alert-dismissible show alert-margin" role="alert">
            {msg}
        </div>
    );
};

MessageEvent.propTypes = {
    msg: PropTypes.string.isRequired
}

export default Message