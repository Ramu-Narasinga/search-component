import React from "react";

import Suggestion from "../../components/suggestion";

import "./index.css";

const SuggestionsList = ({suggestions, search}) => {
    debugger
    return (
        <div className="suggestions-ls">
            {
                search && suggestions && suggestions.users && suggestions.items && suggestions.users.length == 0 && suggestions.items.length == 0 &&
                <div className="u-card">No user found</div>
            }
            {
                suggestions && suggestions.users && suggestions.users.length > 0 && 
                    suggestions.users.map((suggestion,i) => <Suggestion key={i} type="user" data={suggestion} search={search} index={i} />)
            }
            {
                suggestions && suggestions.items && suggestions.items.length > 0 && 
                    suggestions.items.map((suggestion,i) => <Suggestion key={i} type="item" data={suggestion} search={search} index={i} />)
            }
        </div>
    )
}

export default SuggestionsList;