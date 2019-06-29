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
        //console.log("clicked on room");
        
        const room = this.state.rooms[index];
        this.setState({activatedRoom: room.name});
        this.props.activeRoom(room.key, room.name);
    }

    render () {
        return (
            <div>
                <section className="room-list">
                    <div className="room-controls">
                        <form className="new-room" onSubmit={this.createNewRoom.bind(this)}>
                            <input
                            className="input-field"
                            id="submitNewRoomForm"
                            type="text"
                            name="name"
                            placeholder="Add a new room"
                            ref={newroom => this.name = newroom}
                            value={this.state.name}
                            onChange={this.handleNewNameChange.bind(this)}/>
                            <button id="submitRoomButton" className="button">Submit</button>
                        </form>
                    </div>
                    <div className="room-list-names">
                        {
                            this.state.rooms.map( (room, index) => {
                                return (<div key={room.key} >
                                    <span
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