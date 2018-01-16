import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions, groupActions } from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        console.log('componentDidMount') 
        console.log(this.props)
        this.props.dispatch(userActions.getAll());
        this.props.dispatch(groupActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    handleAddGroup(){
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
        console.log(this.props)
        const { user, users, groups } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.firstName}!</h1>
                <p>You're logged in with React!!</p>
                <h3>All registered users:</h3>
                {users.loading && <em>Loading users...</em>}
                {console.log('error:' + users.error)}
                {users.error && <span className="text-danger">ERROR: {users.error.toString()}</span>}
                {users.items &&
                    <ul>
                        {users.items.map((user, index) =>
                            <li key={user.id}>
                                {user.firstName + ' ' + user.lastName}
                                {
                                    user.deleting ? <em> - Deleting...</em>
                                    : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                    : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                                }
                            </li>
                        )}
                    </ul>
                }
                {console.log('1')}
                <h3>All groups:</h3>
                {console.log('2')}
                {groups.loading && <em>Loading groups...</em>}
                {console.log('3')}
                {groups.error && <p className="text-danger">ERROR: {groups.error.toString()}</p>}
                {console.log('4')}
                {groups.items &&
                    
                    <ul>
                        {console.log('6')}
                        {groups.items.map((group, index) =>
                            <li key={group.id}>
                                {console.log('7')}
                                {group.name}
                                {
                                    group.deleting ? <em> - Deleting...</em>
                                    : group.deleteError ? <p className="text-danger"> - ERROR: {group.deleteError}</p>
                                    : <p> - <a onClick={this.handleDeleteGroup(group.id)}>Delete</a></p>
                                }
                            </li>
                        )}
                    </ul>
                }
                {console.log('5')}
                <a onClick={this.handleAddGroup()}>Add</a>
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log("mapStateToProps in HomePage")
    console.log(state)
    const { users, authentication, groups } = state;
    const { user } = authentication;
    return {
        user,
        users,
        groups
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };