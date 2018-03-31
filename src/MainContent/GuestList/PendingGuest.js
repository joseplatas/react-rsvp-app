import React from 'react';
import PropTypes from 'prop-types';


//functional component
const PendingGuest = (props) => {
  if(props.name){
    return(
      <li>
        <span className="pending">
          {props.name}
        </span>

      </li>
    );
  }
  return null;
}

//type checking for variables
PendingGuest.propTypes = {
  name: PropTypes.string.isRequired,
};


export default PendingGuest;
