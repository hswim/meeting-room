import { authHeader } from '../_helpers';

export const groupService = {
    getAll,
    getById,
    update,
    delete: _delete
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/groups', requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/groups/' + _id, requestOptions).then(handleResponse);
}

function update(group) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(group)
    };

    return fetch('/groups/' + group.id, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('/groups/' + id, requestOptions).then(handleResponse);;
}

function handleResponse(response) {
    console.log('handleResponse:' + response )
    if (!response.ok) { 
        return Promise.reject(response.statusText);
    }

    return response.json();
}