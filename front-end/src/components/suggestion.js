import React from "react";

import SuggesionUCard from "./suggestion-card";

import "./suggestion.css";

const Suggestion = ({type, data, search}) => {
    return (
        // use id in scrollIntoView func
        // data.user is found in case of items array,
        // db returns uers array and items array based on search keyword match
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