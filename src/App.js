import React from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
var config = {
  apiKey: "AIzaSyD0gESmgK7q-HJQ3euuQo9O5TuA6kZFz90",
  authDomain: "bloc-chat-react-9e1a8.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-9e1a8.firebaseio.com",
  projectId: "bloc-chat-react-9e1a8",
  storageBucket: "bloc-chat-react-9e1a8.appspot.com",
  messagingSenderId: "346709694585"
};
firebase.initializeApp(config);
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RoomList firebase={firebase}/>
      </header>
    </div>
  );
}

export default App;
