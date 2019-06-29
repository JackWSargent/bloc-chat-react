import React, {Component} from 'react';


class User extends Component {
    constructor(props){
        super(props)

        this.state = {
            user: '',
            signedIn: false,
        }
        this.signOut = this.signOut.bind(this);
    }

    signInWithPopUp() {
        //console.log("signing in");
        if(!this.state.signedIn){
            const provider = new this.props.firebase.auth.GoogleAuthProvider();
            this.props.firebase.auth().signInWithPopup( provider )
            .then(googleAcc => {
                this.props.setUser(googleAcc.user.displayName);
                this.setState({user: googleAcc.user.displayName, signedIn: true});
            })
        } else {
            this.signOut();
            this.setState({user: 'Guest', signedIn: false});
            this.props.setUser("Guest");
        }
    }

    signOut() {
        this.props.firebase.auth().signOut();
    }

    render () {
        return (
        <div className="user-component">
            <h1 className="user-label">{this.state.user ? this.state.user : "Guest"}</h1>
            <span className="user-sign-in">
                <p onClick={() => this.signInWithPopUp()} className="button-sign-in">{this.state.user ? "Sign Out" : "Sign In"}</p>
            </span>
        </div>
        )
    }
}

export default User;