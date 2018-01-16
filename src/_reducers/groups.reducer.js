import { groupConstants } from '../_constants';

export function groups(state = {}, action) {
  switch (action.type) {
    case groupConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case groupConstants.GETALL_SUCCESS:
      return {
        items: action.groups
      };
    case groupConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case groupConstants.GET_REQUEST:
      return {
        loading: true
      };
    case groupConstants.GET_SUCCESS:
      return {
        items: [...state.items, action.group]
      };
    case groupConstants.GET_FAILURE:
      return { 
        error: action.error
      };
    case groupConstants.DELETE_REQUEST:
      // add 'deleting:true' property to group being deleted
      return {
        ...state,
        items: state.items.map(group =>
          groups.id === action.id
            ? { ...group, deleting: true }
            : group
        )
      };
    case groupConstants.DELETE_SUCCESS:
      // remove deleted group from state
      return {
        items: state.items.filter(group => group.id !== action.id)
      };
    case groupConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to group 
      return {
        ...state,
        items: state.items.map(group => {
          if (group.id === action.id) {
            // make copy of group without 'deleting:true' property
            const { deleting, ...groupCopy } = group;
            // return copy of group with 'deleteError:[error]' property
            return { ...groupCopy, deleteError: action.error };
          }

          return group;
        })
      };
    default:
      return state
  }
}