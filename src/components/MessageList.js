import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props){
        super(props)

        this.state = {
            messages: [],
            newMessage: '',
        }

        this.messagesRef = this.props.firebase.database().ref('messages'); 
        this.handleRoom = this.handleRoom.bind(this); 
        this.createMessage = this.createMessage.bind(this);
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = {
                val: snapshot.val(), //Value of all messages 
                key: snapshot.key, //Value of all message keys
            }
            this.setState({ messages: this.state.messages.concat( message ) });
        });
    }

    handleMessageChange(e) {
        this.setState({newMessage: e.target.value}); 
        console.log("message changed to : " + this.state.newMessage);
    }

    handleRoomClick() {
        let array = []
        if (this.props.activeRoom()) { 
          array = this.state.messages.filter(message => { 
            return message.val.roomId === this.props.activeRoom()
          })
        }else {
            //console.log("error with getting activeRoom: " + this.props.activeRoom());
        }
        if (!array) array = [] 
        return array 
    }

    handleRoom(e) { //Create new message
        e.preventDefault();
        if (!this.props.activeRoom()) return;  //If no active room then exit
        const message = this.createMessage();
        if(!message){
            console.log("cannot post as guest")
        }
        console.log(message);
        this.messagesRef.push(message); //Push to firebase
        this.setState({newMessage: ''}); //Reset
    }

    createMessage() {
        console.log("Creating new message: " + this.state.newMessage + "With username: " + this.props.setUser());
        if(!this.props.setUser()) return;
        const message = { //Message Object
            content: this.state.newMessage,
            roomId: this.props.activeRoom(),
            sentAt: this.getTime(),
            username: this.props.setUser(),
        }
        return message;
    }

    doubleDigit(number) {
        return (number < 10) ? "0" + number : number; // so minutes are 4:01 instead of 4:1
    }

    getTime() {
        const date = new Date(); 
        let hrs = date.getHours();
        let time = hrs >= 12 ? "PM" : "AM"; 
        hrs = hrs > 12 ? hrs - 12 : hrs; 
        return (hrs + ":" + this.doubleDigit(date.getMinutes()) + " " + time);
      }

      placeholder() {
          if(!this.props.setUser()){
              return "Must be signed in";
          } else {
              return "Type Message Here";
          }
        }

      Sender() {
          return (
            <div>
                <input
                type="text" className="input-field-message" value={this.state.newMessage} placeholder={this.placeholder()}
                onChange={(e) => this.handleMessageChange(e)}/>
                <button
                className="send-message"
                onClick={(e) => this.handleRoom(e)}>
                Send
                </button>
            </div>)
      } 

    render() {
        return (
            <section>
                <h1 className="room-name-label">{this.props.RoomName}</h1>
                <div>
                    {this.handleRoomClick().map((message) => {
                            return (
                            <div key={message.key} className="message-item">
                                <h2 className="message-username">{message.val.username ? message.val.username : "Guest" }</h2>
                                <span className="message-element">{message.val.sentAt}</span>
                                <span className="message-element">-  {message.val.content}</span>
                            </div>   
                            )}
                        )}
                    <div className="message-sender">
                        {this.props.activeRoom() && this.Sender()}
                    </div>
                </div>
            </section>
        )
    }
}

export default MessageList;