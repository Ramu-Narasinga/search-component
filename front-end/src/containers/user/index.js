import React, { useState } from "react";

import "./index.css";
import { Redirect } from "react-router-dom";

const User = () => {

    const [toSearch, setToSearch] = useState(false);

    const handleBackNav = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('item');
        setToSearch(true);
    }

    let user = JSON.parse(localStorage.getItem('user'));
    let item = JSON.parse(localStorage.getItem('item'))
    return (
        <>
        {
            !toSearch ? 
            <div className="user-details">
            <h1>User Details</h1>
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
                    </tr>
                    {
                        user && <tr>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.items && typeof user.items == 'object' && user.items.map(itm => <span>{itm.name},</span>)}</td>
                            <td>{user.address}</td>
                            <td>{user.pincode}</td>
                        </tr>
                    }
                    {
                        item && <tr>
                            <td>{item.user.id}</td>
                            <td>{item.user.name}</td>
                            <td>{item.name}</td>
                            <td>{item.user.address}</td>
                            <td>{item.user.pincode}</td>
                        </tr>
                    }
                </tbody>
            </table>
            <button className="bts-btn" onClick={() => handleBackNav()}>Back To Search</button>
            </div> :
            <Redirect to="/" />
        }
        </>
    )
}

export default User;