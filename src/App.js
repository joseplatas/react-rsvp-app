import React, { Component } from 'react';
import './App.css';
import GuestList from './GuestList';
import Counter from './Counter';
import Header from './Header';

//class component
class App extends Component {
  state = {
    isFiltered: false,
    pendingGuest: "",
    guests: [
      {
        name: "Treasure",
        isConfirmed: true,
        isEditing: false
      },
      {
        name: "Nic",
        isConfirmed: false,
        isEditing: false
      },
      {
        name: "Jose",
        isConfirmed: false,
        isEditing: true
      }
    ]
  }

  //generic handler for all properties of the Guest State
  toggleGuestPropertyAt = (property, indexToChange) =>{
    this.setState({
      guests: this.state.guests.map((guest, index) => {
        if(index === indexToChange){
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
  toggleConfirmationAt = (index) =>{
    this.toggleGuestPropertyAt('isConfirmed',index);
  }
  toggleEditingAt = (index) =>{
    this.toggleGuestPropertyAt('isEditing',index);
  }
  //remove guest from array
  removeGuestAt = (index) =>{
    //Get first half of the array, not include the index value, add the second array values to the guests array
    this.setState({
      guests: [
        ...this.state.guests.slice(0, index),
        ...this.state.guests.slice(index + 1)
      ]
    });
  }

  //update the state of input
  setNameAt = (name, indexToChange) =>{
    this.setState({
      guests: this.state.guests.map((guest, index) => {
        if(index === indexToChange){
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
    this.setState({
      guests: [
        {
          name: this.state.pendingGuest,
          isConfirmed: false,
          isEditing: false
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
        <div className="main">
          <div>
            <h2>Invitees</h2>
            <label>
              <input type="checkbox" onChange={this.toggleFilter} checked={this.state.isFiltered}/>
              Hide those who haven't responded
            </label>
          </div>
          <Counter
            totalInvited ={totalInvited}
            numberAttending ={numberAttending}
            numberUnconfirmed = {numberUnconfirmed}
          />

          <GuestList guests= {this.state.guests}
            toggleConfirmationAt={this.toggleConfirmationAt}
            toggleEditingAt={this.toggleEditingAt}
            setNameAt ={this.setNameAt}
            isFiltered={this.state.isFiltered}
            removeGuestAt={this.removeGuestAt}
            pendingGuest={this.state.pendingGuest}
          />
        </div>
      </div>
    );
  }
}

export default App;
