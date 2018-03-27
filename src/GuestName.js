import React from 'react';
import PropTypes from 'prop-types';

//functional component
const GuestName = (props) => {
  if(props.isEditing){
    return(
      <input
        type="text"
        value={props.children}
        onChange={props.handleNameEdits}
      />
    );
  }

  return(
    <span>{props.children}</span>
  )

}

//type checking for variables
GuestName.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  handleNameEdits: PropTypes.func.isRequired
}


export default GuestName;
