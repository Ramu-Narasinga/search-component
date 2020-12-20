import React from "react";

import SuggesionUCard from "./suggestion-card";

import "./suggestion.css";

const Suggestion = ({type, data, search}) => {
    return (
        <div className="suggestion" id={data.user ? data.user.id : data.id}>
            {
                type == 'user' && <SuggesionUCard user={data} search={search} cardType="user" />
            }
            {
                type == 'item' && <SuggesionUCard user={data.user} search={search} cardType="item" data={data} />
            }
        </div>
    )
}

export default Suggestion;