import React, { Component } from 'react';
import './App.css';

import MainContent from './MainContent';
import Header from './Header';

//class component
class App extends Component {
  state = {
    isFiltered: false,
    pendingGuest: "",
    guests: []
  }
  //tracking guest id
  lastGuestId = 0;

  //create an new id per guest
  newGuestId = ()=>{
    const id = this.lastGuestId;
    this.lastGuestId += 1;
    return id;
  }

  //generic handler for all properties of the Guest State
  toggleGuestProperty = (property, id) =>{
    this.setState({
      guests: this.state.guests.map((guest) => {
        if(id === guest.id){
          return {
            ...guest,
            [property]: !guest[property]
          };
        }
        return guest;
      })
    })
  }
  //short methods to update single property
  toggleConfirmation = (id) =>{
    this.toggleGuestProperty('isConfirmed',id);
  }
  toggleEditing = (id) =>{
    this.toggleGuestProperty('isEditing',id);
  }
  //remove guest from array
  removeGuest = (id) =>{
    this.setState({
      guests: this.state.guests.filter(guest => id !== guest.id)
    });
  }

  //update the state of input
  setName = (name, id) =>{
    this.setState({
      guests: this.state.guests.map((guest) => {
        if(id === guest.id){
          return {
            ...guest,
            name
          };
        }
        return guest;
      })
    })
  }
  //toggle the filter guests
  toggleFilter = () => {
    this.setState({isFiltered: !this.state.isFiltered})
  }
  //handle the update value from input text
  handleNameInput = (e) =>{
    this.setState({
      pendingGuest: e.target.value
    });
  }
  //add a new guest into the state guest array
  newGuestSubmitHandler = (e) =>{
    e.preventDefault();
    const id = this.newGuestId();
    this.setState({
      guests: [
        {
          name: this.state.pendingGuest,
          isConfirmed: false,
          isEditing: false,
          id: id
        },
        ...this.state.guests
      ],
      pendingGuest: ""
    });
  }
  //get counter values
  getTotalInvided = () => this.state.guests.length;
  getAttendingGuest = () =>{
    return(
      this.state.guests.reduce(
        (total, guest) => guest.isConfirmed ? total + 1 : total,
        0
      )
    );
  }

  render() {
    const totalInvited = this.getTotalInvided();
    const numberAttending = this.getAttendingGuest();
    const numberUnconfirmed = totalInvited - numberAttending;

    return (
      <div className="App">
        <Header
          newGuestSubmitHandler = {this.newGuestSubmitHandler}
          pendingGuest = {this.state.pendingGuest}
          handleNameInput = {this.handleNameInput}
        />
      <MainContent
        toggleFilter={this.toggleFilter}
        isFiltered={this.state.isFiltered}
        totalInvited={totalInvited}
        numberAttending={numberAttending}
        numberUnconfirmed={numberUnconfirmed}
        guests={this.state.guests}
        toggleConfirmation={this.toggleConfirmation}
        toggleEditing={this.toggleEditing}
        setName={this.setName}
        removeGuest={this.removeGuest}
        pendingGuest={this.state.pendingGuest}
      />


      </div>
    );
  }
}

export default App;
