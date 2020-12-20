import React from "react";

import Suggestion from "../../components/suggestion";

import "./index.css";

const SuggestionsList = ({suggestions, search}) => {
    return (
        <div className="suggestions-ls">
            {
                suggestions && suggestions.users && suggestions.users.map((suggestion,i) => <Suggestion key={i} type="user" data={suggestion} search={search} />)
            }
            {
                suggestions && suggestions.items && suggestions.items.map((suggestion,i) => <Suggestion key={i} type="item" data={suggestion} search={search} />)
            }
        </div>
    )
}

export default SuggestionsList;