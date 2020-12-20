import React, { Component } from "react";

import { matchedString } from "../utils/common";

import "./suggestion-card.css";

class SuggestionUCard extends Component {

    render() {
        
        const {
            user, 
            search, 
            cardType
        } = this.props;

        return (
            <div className="u-card">
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