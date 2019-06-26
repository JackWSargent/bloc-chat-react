import React, {Component} from 'react';

class RoomList extends Component {
    constructor(props){
        super(props);

        this.state = {
            rooms: [],
            name: '',
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
        e.PreventDefault(); //Prevent new tab opening
        if(!this.state.name) return; //If no name,exit
        const newRoom = e.target.value; //Set new room to the incoming value
        this.roomsRef.push({newRoom}); //Push to firebase rooms object 
        this.state.name = '';
    }

    render () {
        return (
            <div>
                <section className="room-list">
                    <div className="room-controls">
                        <form className="new-room" onSubmit={this.createNewRoom(bind)}>
                            <input
                            id="room-name"
                            type="text"
                            name="name"
                            placeholder="Add a new room"
                            ref={newroom => this.name = newroom}
                            value={this.state.name}
                            onChange={this.handleNameChange.bind(this)}/>
                            <button id="submitRoomButton">Submit</button>
                        </form>
                    </div>
                    <tbody className="rows">
                    {
                        this.state.rooms.map( (room, index) => 
                        <tr className='room-name'>{room.name}</tr>
                    )}
                    </tbody>
                </section>
            </div>
        );
    }

}

export default RoomList;