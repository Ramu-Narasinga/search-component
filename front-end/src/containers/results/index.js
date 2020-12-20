import React, { useState } from "react";

import "./index.css";
import { Redirect } from "react-router-dom";

const Results = () => {

    const [toSearch, setToSearch] = useState(false);
    const [toUserView, setToUserView] = useState(false);

    const handleBackNav = () => {
        localStorage.removeItem('users');
        localStorage.removeItem('items');
        setToSearch(true);
    }

    const navToUser = (e, type, data) => {
        if (type == 'user') {
            localStorage.setItem('user', JSON.stringify(data));
        } else if (type == 'item') {
            localStorage.setItem('item', JSON.stringify(data));
        }
        setToUserView(true)
    }

    let usersData = JSON.parse(localStorage.getItem('users'));
    let itemsData = JSON.parse(localStorage.getItem('items'))
    return (
        <>
        {
            !toSearch && !toUserView ? 
            <div className="user-results">
            <h1>Search Results</h1>
            <table>
                <tbody>
                    <tr>
                        <td>
                            Id
                        </td>
                        <td>
                            Name
                        </td>
                        <td>
                            Items
                        </td>
                        <td>
                            Address
                        </td>
                        <td>
                            Pincode
                        </td>
                        <td>
                            View
                        </td>
                    </tr>
                    {
                        usersData.map(user => <tr>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.items.map(itm => <span>{itm.name},</span>)}</td>
                            <td>{user.address}</td>
                            <td>{user.pincode}</td>
                            <td><button className="view-btn"onClick={(e) => navToUser(e, 'user', user)}>View</button></td>
                        </tr>
                        )
                    }
                    {
                        itemsData.map(item => <tr>
                            <td>{item.user.id}</td>
                            <td>{item.user.name}</td>
                            <td>{item.name}</td>
                            <td>{item.user.address}</td>
                            <td>{item.user.pincode}</td>
                            <td><button className="view-btn" onClick={(e) => navToUser(e, 'item', item)}>View</button></td>
                        </tr>
                        )
                    }
                </tbody>
            </table>
            <button className="bts-btn" onClick={() => handleBackNav()}>Back To Search</button>
            </div> :
            <>
                {
                    toSearch ? <Redirect to="/" /> : <Redirect to="/user" />
                }
            </>
        }
        </>
    )
}

export default Results;