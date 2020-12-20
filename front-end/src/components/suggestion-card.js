import React from "react";

import "./suggestion-card.css";

const SuggestionUCard = ({user, search, cardType}) => {
    return (
        <div className="u-card">
            <div className="uid">{user.id}</div>
            <div className="uname">{user.name}</div>
            {
                cardType == 'item' && <div className="uitems">
                    <ul>
                        <li>"{search}" found in items</li>
                    </ul>
                </div>
            }
            <div className="uaddr">{user.address}, {user.pincode}</div>
        </div>
        )
}

export default SuggestionUCard;