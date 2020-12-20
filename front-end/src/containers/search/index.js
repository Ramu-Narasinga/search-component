import React, { Component } from "react";

import SuggestionsList from "../suggestions-list";

import {
    searchUsers
} from "../../services/search";
import {
    registerNavHandlers
} from "../../utils/common";

import "./index.css";

class Search extends Component {

    state={
        search: "",
        foundUsers: {}
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        if(e.target.value) {
            searchUsers(e.target.value).then(res => {
                console.log("found data from search api:", res);
                this.setState({
                    foundUsers: res
                })
            });
        }

        if (e.target.value === '') {
            this.setState({
                foundUsers: {}
            })
        }
    }

    componentDidMount() {
        registerNavHandlers();
    }

    render() {
        const {
            search,
            foundUsers
        } = this.state;
        return(
            <div className="search-container">
                <h1 className="title">Simple Search Component Built Using ReactJs</h1>
                <div className="search-br">
                    <input type="text" id="search" className="search-inp"
                        name="search" placeholder="&#128269;   Search users by Id, name, address, items" 
                        value={search} onChange={this.handleChange}
                    />
                    <SuggestionsList 
                        suggestions={foundUsers}
                        search={search}
                    />
                </div>
            </div>
        )
    }
}

export default Search;