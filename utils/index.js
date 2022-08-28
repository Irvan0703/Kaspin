const { AbilityBuilder, Ability } = require("@casl/ability");

function getToken(req) {
    let token =
        req.headers.authorization
        ? req.headers.authorization.split(' ')[1]
        : null;

        return token && token.length ? token : null
}

const policies = {
    guest(user, {can}){
        can('read', 'id');
    },
    user(user, {can}){
        can('view', 'city');
    },
    admin(user, {can}){
        can('manage', 'all');
    }
}

const policyFor = user => {
    let builder = new AbilityBuilder();
    if( user && typeof policies[user.role] === 'function'){
        policies[user.role](user, builder);
    } else {
        policies['guest'](user, builder);
    }

    return new Ability(builder.rules)
}

module.exports = {
    getToken,
    policyFor
}