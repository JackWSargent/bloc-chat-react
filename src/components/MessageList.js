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
    }

    handleRoomClick() {
        let array = []
        if (this.props.activeRoom()) { 
          array = this.state.messages.filter(message => { 
            return message.val.roomId === this.props.activeRoom()
          })
        }else {
            console.log("error with getting activeRoom: " + this.props.activeRoom());
        }
        if (!array) array = [] 
        return array 
    }

    handleRoom() { //Create new message
        if (!this.state.activeRoom) return;  //If no active room then exit

        const message = this.createMessage();
        this.messagesRef.push(message); //Push to firebase
        this.setState({newMessage: ''}); //Reset
    }

    createMessage() {
        const message = { //Message Object
            content: this.state.newMessage,
            roomId: this.props.activeRoom(),
            sentAt: this.getTime(),
            username: this.props.username(),
        }
        return message;
    }

    render() {
        return (
            <section>
                <h1 className="room-name-label">{this.props.Room}</h1>
                <div>
                    {this.handleRoomClick().map((message) => {
                            return (
                                <div key={message.key} className="message-item">
                                <h2 className="message-username">{message.val.username ? message.val.username : "Guest" }</h2>
                                <span className="message-element">{message.val.sentAt}
                                </span>
                                
                                <span className="message-element">-  {message.val.content}</span>
                            </div>
                            )}
                        )}
                </div>
            </section>
        )
    }
}

export default MessageList;