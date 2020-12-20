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