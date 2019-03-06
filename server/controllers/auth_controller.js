const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
    // console.log(req.body)
    const { username, password, email } = req.body;
    const { session } = req;
    const db = req.app.get('db');
    let takenUsername = await db.auth.check_username({ username });
    takenUsername = +takenUsername[0].count;
    if(takenUsername !== 0) {
        return res.sendStatus(409)
    }
    
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    let user = await db.auth.register({ username, password: hash, email });
    user = user[0];
    // console.log({before: session})
    session.user = user;
    // console.log({after: session})
    res.status(200).send(session.user)
    },

    login: async (req, res) => {
        // console.log(req.body)
        const { username, password } = req.body;
        const { session } = req;
        const db = req.app.get('db');
        // console.log({username, password, session})
        let user = await db.auth.login({ username });
        user = user[0];
        if(!user){
            return res.sendStatus(404);
        }
        let authenticated = bcrypt.compareSync(password, user.password);
        if (authenticated){
            delete user.password;
            session.user = user;
            // console.log({session})
            res.status(200).send(session.user);
        } else {
            res.sendStatus(401);
        }
    },

    getUser: (req, res) => {
        const { user } = req.session;
        if(user){
            res.status(200).send(user)
        } else {
            res.sendStatus(401)
        }
    },

    logout: async (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
}
