import React, {Component} from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
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
      RoomName: ''
    }
    this.activeRoom = this.activeRoom.bind(this);
  }
  activeRoom(Room, RoomName) {
    if (Room) {
      this.setState({Room: Room, RoomName: RoomName}); 
      //console.log("state of room is: " + this.state.Room);
    } else {
      return this.state.Room; 
    }
  }
  render(){
  return (
    <div className="App">
      <header className="App-header">
        <RoomList firebase={firebase} activeRoom={this.activeRoom} Room={this.state.RoomName}/>
        <MessageList firebase={firebase} activeRoom={this.activeRoom} Room={this.state.RoomName}/>
      </header>
    </div>
  )};
}

export default App;
