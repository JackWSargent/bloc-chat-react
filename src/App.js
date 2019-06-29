import React, {Component} from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
var config = {
  apiKey: "AIzaSyD0gESmgK7q-HJQ3euuQo9O5TuA6kZFz90",
  authDomain: "bloc-chat-react-9e1a8.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-9e1a8.firebaseio.com",
  projectId: "bloc-chat-react-9e1a8",
  storageBucket: "bloc-chat-react-9e1a8.appspot.com",
  messagingSenderId: "346709694585"
};
firebase.initializeApp(config);
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      Room: '',
      RoomName: '',
      username: '',
    }
    this.activeRoom = this.activeRoom.bind(this);
    this.setUser = this.setUser.bind(this);
  }
  activeRoom(Room, RoomName) {
    if (Room) {
      this.setState({Room: Room, RoomName: RoomName}); 
      //console.log("state of room is: " + this.state.Room);
    } else {
      //console.log("returning state of room: " + this.state.Room);
      return this.state.Room; 
    }
  }
  setUser(user) {
    // this.setState({Username: user});
    // return this.state.Username;
    if (user || user === null) { //if username is either there or not 
      this.setState({username: user});//set to the username state
      if(user.length >= 1){
        console.log("user is online");
        return;
      }
    }
    else {
      return this.state.username; //otherwise return the state of username
    }
  }
  render(){
  return (
    <div className="App">
      <header className="App-header">
        <RoomList firebase={firebase} activeRoom={this.activeRoom} RoomName={this.state.RoomName}/>
        <MessageList firebase={firebase} activeRoom={this.activeRoom} RoomName={this.state.RoomName} setUser={this.setUser}/>
        <User firebase={firebase} setUser={this.setUser}/>
      </header>
    </div>
  )};
}

export default App;
