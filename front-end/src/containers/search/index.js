import React, { Component } from "react";

import SuggestionsList from "../suggestions-list";

import {
    searchUsers
} from "../../services/search";
import {
    registerNavHandlers
} from "../../utils/common";

import "./index.css";
import { Redirect } from "react-router-dom";

class Search extends Component {

    state={
        search: "",
        foundUsers: {},
        toSearchList: false
    }

    // handle search input change
    // if search value exists, make a REST API call to DB,
    // response from db returns users, items array (based on match in users table column and items table column)
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        if(e.target.value) {
            searchUsers(e.target.value).then(res => {
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

    // Keyboard navigation handlers are handled via /utils/common.js functions
    // to make the code READABLE with in the component and keep it clean
    // basically register the keydown events on componentDidMount
    componentDidMount() {
        registerNavHandlers();
    }

    // redirect to results page when user clicks on enter key with out clicking suggestions
    toSearchListCB = () => {
        debugger
        const {
            foundUsers
        } = this.state;
        localStorage.setItem('users', JSON.stringify(foundUsers.users));
        localStorage.setItem('items', JSON.stringify(foundUsers.items));
        this.setState({
            toSearchList: true
        })
    }

    render() {
        const {
            search,
            foundUsers,
            toSearchList
        } = this.state;

        if (toSearchList) {
            return <Redirect to="/results" />
        }

        return(
            <div className="search-container">
                <h1 className="title">Simple Search Component Built Using ReactJs</h1>
                <div className="search-br">
                    <div className="sc">
                        <input type="text" id="search" className="search-inp"
                            name="search" placeholder="&#128269;   Search users by Id, name, address, items" 
                            value={search} onChange={this.handleChange}
                        />
                        <span id="vr" onClick={this.toSearchListCB}>View Results</span>
                    </div>
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