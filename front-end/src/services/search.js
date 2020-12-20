import {
    serverBaseUrl,
    searchAPIUrl
} from "../utils/common"

export function searchUsers(value) {
    let query = `?value=${value}`
    return new Promise((resolve, reject) => {
        fetch(
            serverBaseUrl+searchAPIUrl+query
        )
        .then(response => {
            if (!response.ok) {
                throw new Error("error in fetching search results response");
            }
            return response.json();
        })
        .then(data => {
            resolve(data);
        })
        .catch(e => {
            console.log("caught error:", e);
            reject(e);
        });
    });
}