const knex = require('../knex/knex');

const getUser = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await knex('user')
            .where({username})
            .first();

        if (!user) {
            return res.status(401).json({message: 'Invalid username or Password'});
        }

        if (user['password_hash'].trim() !== password) {
            return res.status(401).json({message: 'Invalid username or Password'})
        }

        const {password_hash, ...userInfo} = user;
        console.log(userInfo);
        return res.status(200).json(userInfo);

    } catch (err) {
        console.error('Error: ', err);
        console.log('error occurred');
        res.status(500).json({error: 'Issue logging in.'});
    }

}

module.exports = {
    getUser
}
