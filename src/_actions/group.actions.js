import { groupConstants } from '../_constants';
import { groupService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const groupActions = {
    getAll,
    getById,
    delete: _delete
};

function getAll() {
    return dispatch => {
        dispatch(request());

        groupService.getAll()
            .then(
                groups => dispatch(success(groups)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: groupConstants.GETALL_REQUEST } }
    function success(groups) { return { type: groupConstants.GETALL_SUCCESS, groups } }
    function failure(error) { return { type: groupConstants.GETALL_FAILURE, error } }
}

function getById() {
    return dispatch => {
        dispatch(request(id));

        groupService.getById()
            .then(
                group => dispatch(success(group)),
                error => dispatch(failure(error))
            );
    };

    function request(id) { return { type: groupConstants.GET_REQUEST, id } }
    function success(group) { return { type: groupConstants.GET_SUCCESS, group } }
    function failure(error) { return { type: groupConstants.GET_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        groupService.delete(id)
            .then(
                group => { 
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) { return { type: groupConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: groupConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: groupConstants.DELETE_FAILURE, id, error } }
}