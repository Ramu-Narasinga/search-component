import React, { Component } from "react";
import { Redirect } from "react-router-dom"

import { matchedString } from "../utils/common";

import "./suggestion-card.css";

class SuggestionUCard extends Component {

    state = {
        toUserView: false
    }

    // navigate to user page view
    // localstorage is used to populate data
    // to keep things simple, had it been complex, redux store would have been sensible
    navToUser = () => {
        localStorage.setItem('user', JSON.stringify(this.props.user));
        if (this.props.data) {
            // item data
            localStorage.setItem('item', JSON.stringify(this.props.data));
        }
        this.setState({
            toUserView: true
        })
    }

    render() {
        
        const {
            user, 
            search, 
            cardType
        } = this.props;

        const {
            toUserView
        } = this.state;

        if (toUserView === true) {
            return <Redirect to='/user' />
          }

        return (
            <div className="u-card" onClick={this.navToUser}>
                <div className="uid em">{matchedString(user.id, search)}</div>
                <div className="uname em">{matchedString(user.name, search)}</div>
                {
                    cardType == 'item' && <div className="uitems em">
                        <ul>
                            <li>"{search}" found in items</li>
                        </ul>
                    </div>
                }
                <div className="uaddr em">{matchedString(user.address, search)}, {matchedString(user.pincode, search)}</div>
            </div>
            )
    }
}

export default SuggestionUCard;