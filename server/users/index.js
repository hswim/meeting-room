var users = [];
module.exports = {
    register:function(params){
        if (users[params.username]) {
            console.log('1')
            return {status: 'error', message:'Username "' + newUser.username + '" is already taken.'};
        }
        let newUser = params;
        newUser.id = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;
        console.log('2')
        users.push(newUser);
        console.log('3')
        return {status: 'success', message: 'User was created successfully.'};
    },
    login: function(params){
        let filteredUsers = users.filter(user => {
            return user.username === params.username && user.password === params.password;
        });

        if(filteredUsers.length){
            let user = filteredUsers[0];
            return {
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'fake-jwt-token'
            };
        }
        return null;
    },
    getAll:function(){
        return users;
    },
    get:function(username){
        let matchedUsers = users.filter(user => { return user.username === username; });
        return matchedUsers.length ? matchedUsers[0] : null;
    },
    delete:function(username){
        for (let i = 0; i < users.length; i++) {
            let user = users[i];
            if (user.username === username) {
                // delete user
                users.splice(i, 1);
                break;
            }
        }
    }
}