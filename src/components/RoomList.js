import React, {Component} from 'react';

class RoomList extends Component {
    constructor(props){
        super(props);

        this.state = {
            rooms: [],
            name: '',
            activatedRoom: '',
        }
        this.roomsRef = this.props.firebase.database().ref('rooms');  
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) });
        });
    }

    createNewRoom(e) {
        e.preventDefault(); //Prevent new tab opening
        if(!this.state.name) return; //If no name,exit
        const newRoom = this.state.name; //Set new room to the incoming value
        // console.log("new room " + newRoom);
        this.roomsRef.push({name: newRoom}); //Push to firebase rooms object 
        this.setState({name: ''});
    }

    handleNewNameChange(e) {
        this.setState({name: e.target.value});
    }

    handleRoomListClick(index) {
        const room = this.state.rooms[index];
        this.setState({activatedRoom: room.name});
        this.props.activeRoom(room.key, room.name);
        // console.log(this.state.activatedRoom + " is the name of the room");
        // console.log(index);
    }

    render () {
        return (
            <div>
                <section className="room-list">
                    <div className="room-controls">
                        <form className="new-room" onSubmit={this.createNewRoom.bind(this)}>
                            <input
                            id="submitRoomForm"
                            type="text"
                            name="name"
                            placeholder="Add a new room"
                            ref={nroom => this.name = nroom}
                            value={this.state.name}
                            onChange={this.handleNewNameChange.bind(this)}/>
                            <button id="submitRoomButton">Submit</button>
                        </form>
                    </div>
                    <div className="room-list-names">
                        
                        {
                            this.state.rooms.map( (room, index) => {
                                return (<div>
                                    <span
                                    key={room.key} 
                                    onClick={() => this.handleRoomListClick(index)} 
                                    className='room-name'
                                    >
                                    {room.name}
                                    </span>
                                    <br/>
                                    </div>
                                )})}
                    </div>
                </section>
            </div>
        );
    }

}

export default RoomList;